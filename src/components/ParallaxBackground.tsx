"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

/**
 * Returns the WebP image path, choosing a mobile-optimised variant
 * when the viewport is narrow.
 */
function bgUrl(name: string, mobile: boolean): string {
    const suffix = mobile ? "-mobile" : "";
    return `url("/images/${name}${suffix}.webp")`;
}

export const ParallaxBackground = () => {
    const { scrollYProgress } = useScroll();
    const isMobile = useIsMobile();

    // 各レイヤーの動くスピード（割合）を定義
    const yBack = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const yFore = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Layer 1: 遠景の森（実写アセット） */}
            <motion.div
                style={{ y: yBack }}
                className="absolute inset-0 opacity-80"
            >
                <div
                    className="h-[120vh] w-full bg-cover bg-center"
                    style={{ backgroundImage: bgUrl("back", isMobile) }}
                />
            </motion.div>

            {/* Layer 2: 中景の葉（実写アセット） */}
            <motion.div
                style={{ y: yMid }}
                className="absolute inset-0 opacity-60"
            >
                <div
                    className="h-[150vh] w-full bg-cover bg-center"
                    style={{ backgroundImage: bgUrl("middle", isMobile) }}
                />
            </motion.div>

            {/* Layer 3: 近景（建築・オーバーレイ） */}
            <motion.div
                style={{ y: yFore }}
                className="absolute inset-0 z-10 opacity-40"
            >
                <div
                    className="h-[200vh] w-full bg-cover bg-center"
                    style={{ backgroundImage: bgUrl("overlay", isMobile) }}
                />
            </motion.div>
        </div>
    );
};
