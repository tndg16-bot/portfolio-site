"use client";

import Image from "next/image";
import { useState } from "react";

interface ArticleImageProps {
    src: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
    className?: string;
}

export default function ArticleImage({
    src,
    alt,
    caption,
    width = 800,
    height = 450,
    className,
}: ArticleImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <figure className={`my-8 group ${className || ""}`}>
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 shadow-lg">
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className={`w-full h-auto transition-all duration-700 ${isLoading ? "scale-105 blur-lg" : "scale-100 blur-0"}`}
                    onLoadingComplete={() => setIsLoading(false)}
                />
            </div>
            {(caption || alt) && (
                <figcaption className="mt-3 text-center text-sm text-zinc-400">
                    {caption || alt}
                </figcaption>
            )}
        </figure>
    );
}
