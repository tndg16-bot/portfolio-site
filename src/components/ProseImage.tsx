"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ProseImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function ProseImage({ src, alt, caption }: ProseImageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  // Convert relative paths to absolute if needed
  const imageSrc = src.startsWith('http') ? src : src;

  return (
    <figure className="prose-image-figure">
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src={imageSrc}
          alt={alt}
          width={800}
          height={450}
          className="w-full h-auto object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>
      {caption && (
        <figcaption className="prose-image-caption">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
