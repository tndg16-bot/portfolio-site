/**
 * Image optimization script
 * Converts large PNG images to WebP format with desktop and mobile variants.
 */
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";

const IMAGES_DIR = new URL("../public/images/", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");
const TARGET_IMAGES = ["sea.png", "back.png", "overlay.png", "indoor.png", "middle.png"];

const VARIANTS = [
    { suffix: "",        maxWidth: 1200, quality: 80 },
    { suffix: "-mobile", maxWidth: 750,  quality: 75 },
];

function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(2)} MB`;
}

async function optimizeImage(filename) {
    const inputPath = join(IMAGES_DIR, filename);
    const { name } = parse(filename);

    let inputStat;
    try {
        inputStat = await stat(inputPath);
    } catch {
        console.log(`  SKIP: ${filename} (not found)`);
        return [];
    }

    const originalSize = inputStat.size;
    console.log(`\n${filename} (original: ${formatBytes(originalSize)})`);

    const outputs = [];
    for (const variant of VARIANTS) {
        const outputName = `${name}${variant.suffix}.webp`;
        const outputPath = join(IMAGES_DIR, outputName);

        await sharp(inputPath)
            .resize({ width: variant.maxWidth, withoutEnlargement: true })
            .webp({ quality: variant.quality })
            .toFile(outputPath);

        const outputStat = await stat(outputPath);
        const ratio = ((1 - outputStat.size / originalSize) * 100).toFixed(1);
        console.log(`  -> ${outputName}: ${formatBytes(outputStat.size)} (${ratio}% smaller)`);
        outputs.push(outputPath);
    }

    return outputs;
}

async function main() {
    console.log("=== Image Optimization ===");
    console.log(`Directory: ${IMAGES_DIR}\n`);

    const allOutputs = [];
    for (const file of TARGET_IMAGES) {
        const outputs = await optimizeImage(file);
        allOutputs.push(...outputs);
    }

    console.log(`\nDone! Generated ${allOutputs.length} optimized images.`);
}

main().catch(console.error);
