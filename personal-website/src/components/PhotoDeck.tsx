"use client";
import React, { useState, useCallback } from "react";
import { Button } from "./Button";

interface PhotoDeckProps {
    images: { src: string }[];
    singlePhotoView?: boolean;
    cardWidth?: number;
    cardHeight?: number;
}

const PhotoDeck: React.FC<PhotoDeckProps> = ({
                                                 images,
                                                 singlePhotoView = false,
                                                 cardWidth = 285,
                                                 cardHeight = 190,
                                             }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

    const nextPhoto = () => setCurrentIndex((p) => (p + 1) % images.length);
    const prevPhoto = () => setCurrentIndex((p) => (p - 1 + images.length) % images.length);

    const handleImageLoad = useCallback((index: number) => {
        setLoadedImages(prev => new Set(prev).add(index));
    }, []);

    const allImagesLoaded = loadedImages.size === images.length;

    const CARD_W = cardWidth;
    const CARD_H = cardHeight;

    return (
        // hide overflow later
        <div className="w-full">
            <div className="flex flex-col items-center">
                <div
                    className="relative flex items-center justify-center"
                    style={{
                        width: CARD_W,
                        height: CARD_H+50,
                        margin: "0 auto",
                    }}
                >
                    {/* loading overlay */}
                    {!allImagesLoaded && (
                        <div
                            className="absolute border-2 border-white flex flex-col items-center justify-center"
                            style={{
                                width: CARD_W,
                                height: CARD_H,
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                zIndex: 1000,
                            }}
                        >
                            <div className="text-airbus-green text-sm mb-2">
                                LOADING PHOTOS
                            </div>
                            <div className="text-airbus-green text-xs">
                                {loadedImages.size}/{images.length}
                            </div>
                        </div>
                    )}

                    {images.map((img, index) => {

                        const offset = index - currentIndex;
                        const isLoaded = loadedImages.has(index);
                        const isVisible = allImagesLoaded || index < 3;

                        const style: React.CSSProperties = singlePhotoView
                            ? {
                                width: CARD_W,
                                height: CARD_H,
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                zIndex: index === currentIndex ? 100 : 0,
                                opacity: index === currentIndex ? 1 : 0,
                                pointerEvents: index === currentIndex ? "auto" : "none",
                                transition: "opacity 400ms ease-out",
                                display: isVisible ? "block" : "none"
                            }
                            : {
                                width: `${CARD_W}px`,
                                height: `${CARD_H}px`,
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: `translate(-50%, -50%) translateX(${offset * 48}px) translateY(${Math.abs(offset) * 6}px) rotate(${offset * 2.5}deg)`,
                                zIndex: 100 - Math.abs(offset),
                                opacity: allImagesLoaded && Math.abs(offset) > 2 ? 0 : 1,
                                pointerEvents: Math.abs(offset) > 2 ? "none" : "auto",
                                transformOrigin: "center center",
                                transition: allImagesLoaded ? 'transform 500ms ease-out, opacity 500ms ease-out' : 'none',
                                display: isVisible ? "block" : "none"
                            };

                        return (
                            <div
                                key={index}
                                className="absolute bg-black border-2 border-white shadow-lg"
                                style={style}
                            >
                                <img
                                    src={img.src}
                                    alt={`Cockpit photo ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    onLoad={() => handleImageLoad(index)}
                                    style={{
                                        opacity: isLoaded ? 1 : 0,
                                        transition: 'opacity 200ms ease-in',
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 -mt-3">
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
                            disabled={!allImagesLoaded}
                            className={`w-2 h-2 rounded-full transition-transform duration-200 ${
                                index === currentIndex
                                    ? "bg-cyan-300"
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
