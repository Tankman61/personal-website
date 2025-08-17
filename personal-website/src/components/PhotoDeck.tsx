    "use client";
    import React, { useState, useCallback } from "react";
    import { Button } from "./Button";

    interface PhotoDeckProps {
        images: { src: string }[];
    }

    const PhotoDeck: React.FC<PhotoDeckProps> = ({ images }) => {
        const [currentIndex, setCurrentIndex] = useState(0);
        const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

        const nextPhoto = () => setCurrentIndex((p) => (p + 1) % images.length);
        const prevPhoto = () => setCurrentIndex((p) => (p - 1 + images.length) % images.length);

        // Track when each individual image loads
        const handleImageLoad = useCallback((index: number) => {
            setLoadedImages(prev => new Set(prev).add(index));
        }, []);

        const CARD_W = 285;
        const CARD_H = 190;

        // Check if all images are actually loaded
        const allImagesLoaded = loadedImages.size === images.length;

        return (
            <div className="w-full overflow-hidden">
                <div className="flex flex-col items-center">
                    <div
                        className="relative flex items-center justify-center"
                        style={{
                            width: CARD_W + 120,
                            height: CARD_H + 60,
                            margin: '0 auto',
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
                                <div className="text-airbus-green text-sm mb-2 animate-pulse">
                                    LOADING PHOTOS
                                </div>
                                <div className="text-airbus-green text-xs">
                                    {loadedImages.size}/5
                                </div>
                            </div>
                        )}

                        {images.map((img, index) => {
                            const offset = index - currentIndex;
                            const isLoaded = loadedImages.has(index);

                            return (
                                <div
                                    key={index}
                                    className="absolute bg-black border-2 border-white shadow-lg"
                                    style={{
                                        width: `${CARD_W}px`,
                                        height: `${CARD_H}px`,
                                        transform: `
                                            translateX(${offset * 48}px)
                                            translateY(${Math.abs(offset) * 6}px)
                                            rotate(${offset * 2.5}deg)
                                        `,
                                        zIndex: 100 - Math.abs(offset),
                                        opacity: allImagesLoaded && Math.abs(offset) > 2 ? 0 : 1,
                                        pointerEvents: Math.abs(offset) > 2 ? "none" : "auto",
                                        left: "50%",
                                        top: "50%",
                                        transformOrigin: "center center",
                                        translate: "-50% -50%",
                                        transition: allImagesLoaded ? 'transform 500ms ease-out, opacity 500ms ease-out' : 'none',
                                    }}
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
                        <Button
                            width={32}
                            height={32}
                            fontSize={14}
                            onClick={prevPhoto}
                        >
                            ←
                        </Button>
                        <Button
                            width={32}
                            height={32}
                            fontSize={14}
                            onClick={nextPhoto}
                        >
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