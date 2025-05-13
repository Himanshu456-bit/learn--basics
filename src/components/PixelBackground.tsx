
"use client";

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

interface PixelObject {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  style: CSSProperties;
  hint: string;
}

// Helper to generate a random number within a range
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const generatePixelObjects = (count: number): PixelObject[] => {
  const objects: PixelObject[] = [];
  const seeds = ['planet', 'star', 'block', 'crystal', 'cloud', 'moon', 'artifact', 'comet', 'ship', 'station'];
  const hints = ['abstract shape', 'geometric element', 'space object', 'pixel art', 'retro item', 'tech piece', 'celestial body', 'sky element', 'digital artifact', 'cosmic dust'];

  for (let i = 0; i < count; i++) {
    const size = Math.floor(getRandom(40, 120)); // Adjusted size range
    const seed = seeds[i % seeds.length] + (i + 1); // Ensure unique seeds
    const selectedHint = hints[i % hints.length];
    // Ensure hint is max two words
    const hintWords = selectedHint.split(' ');
    const finalHint = hintWords.slice(0, 2).join(' ');


    objects.push({
      id: i,
      src: `https://picsum.photos/seed/${seed}/${size}/${size}?grayscale`, // Removed blur for crisp pixels
      alt: `Pixel background object ${i + 1}`,
      width: size,
      height: size,
      style: {
        position: 'absolute',
        top: `${getRandom(5, 95)}%`,
        left: `${getRandom(5, 95)}%`,
        transform: `translate(-50%, -50%) rotate(${getRandom(-45, 45)}deg)`,
        opacity: getRandom(0.03, 0.12), // Adjusted opacity range
        imageRendering: 'pixelated', // Explicitly set for safety, though global CSS should cover it
        filter: 'brightness(0.8)', // Slightly darken to blend better with dark themes
      },
      hint: finalHint,
    });
  }
  return objects;
};


export function PixelBackground() {
  const [objects, setObjects] = useState<PixelObject[]>([]);

  useEffect(() => {
    // Generate objects only on the client-side to avoid hydration mismatch with random values
    setObjects(generatePixelObjects(8)); // Generate 8 objects
  }, []);

  // Render null on server or if objects haven't been generated yet client-side.
  if (objects.length === 0) {
    return null; 
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {objects.map((obj) => (
        <Image
          key={obj.id}
          src={obj.src}
          alt={obj.alt}
          width={obj.width}
          height={obj.height}
          style={obj.style}
          // The global img style in globals.css handles pixelation.
          // className="pixelated" // This class is not defined, relying on global style or inline style
          data-ai-hint={obj.hint}
          priority={false} // These are background images, not critical
        />
      ))}
    </div>
  );
}
