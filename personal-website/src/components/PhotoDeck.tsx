// components/PhotoDeck.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./Button";

interface PhotoDeckProps {
    images: { src: string }[];
}

const PhotoDeck: React.FC<PhotoDeckProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextPhoto = () => setCurrentIndex((p) => (p + 1) % images.length);
    const prevPhoto = () => setCurrentIndex((p) => (p - 1 + images.length) % images.length);

    // Preload all images to prevent flicker
    useEffect(() => {
        images.forEach((img) => {
            const preload = new Image();
            preload.src = img.src;
        });
    }, [images]);

    const CARD_W = 300;
    const CARD_H = 200;

    return (
        <div className="w-full overflow-hidden">
            <div className="flex flex-col items-center">
                {/* Stack Container - sized to contain all rotated cards */}
                <div
                    className="relative flex items-center justify-center"
                    style={{
                        width: CARD_W + 120, // extra space for rotated cards
                        height: CARD_H + 60, // extra space for vertical offset
                        margin: '0 auto',
                    }}
                >
                    {images.map((img, index) => {
                        const offset = index - currentIndex;
                        return (
                            <div
                                key={index}
                                className="absolute bg-black border-2 border-white shadow-lg transition-[transform,opacity] duration-500 will-change-transform"
                                style={{
                                    width: `${CARD_W}px`,
                                    height: `${CARD_H}px`,
                                    transform: `
                                        translateX(${offset * 48}px)
                                        translateY(${Math.abs(offset) * 6}px)
                                        rotate(${offset * 2.5}deg)
                                    `,
                                    zIndex: 100 - Math.abs(offset),
                                    opacity: Math.abs(offset) > 2 ? 0 : 1,
                                    pointerEvents: Math.abs(offset) > 2 ? "none" : "auto",
                                    left: "50%",
                                    top: "50%",
                                    transformOrigin: "center center",
                                    translate: "-50% -50%",
                                }}
                            >
                                <img
                                    src={img.src}
                                    alt={`Cockpit photo ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                    <Button width={32} height={32} fontSize={14} onClick={prevPhoto}>
                        ←
                    </Button>
                    <Button width={32} height={32} fontSize={14} onClick={nextPhoto}>
                        →
                    </Button>
                </div>

                {/* Indicators */}
                <div className="flex items-center justify-center gap-1 mt-3">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-transform duration-200 ${
                                index === currentIndex
                                    ? "bg-cyan-300 scale-125"
                                    : "bg-gray-500 hover:bg-gray-400"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PhotoDeck;