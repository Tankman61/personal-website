"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
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
    const [imageDimensions, setImageDimensions] = useState<Map<number, { width: number, height: number }>>(new Map());
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [prevLoadedImages, setPrevLoadedImages] = useState<Set<number>>(new Set());
    const [prevImagesMap, setPrevImagesMap] = useState<string[]>([]);
    const [activeImageDimensions, setActiveImageDimensions] = useState<{width: number, height: number} | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const nextPhoto = () => {
        if (images.length <= 1 || isTransitioning) return;

        // Store current dimensions before transition starts
        const currentDims = imageDimensions.get(currentIndex);
        if (currentDims) {
            setActiveImageDimensions(currentDims);
        }

        setIsTransitioning(true);

        // Wait for opacity transition to finish before changing image
        setTimeout(() => {
            setCurrentIndex((p) => (p + 1) % images.length);

            // Keep transitioning flag for a bit longer to ensure smooth handoff
            setTimeout(() => {
                setIsTransitioning(false);
            }, 50);
        }, 0); // Half the opacity transition time
    };

    const prevPhoto = () => {
        if (images.length <= 1 || isTransitioning) return;

        // Store current dimensions before transition starts
        const currentDims = imageDimensions.get(currentIndex);
        if (currentDims) {
            setActiveImageDimensions(currentDims);
        }

        setIsTransitioning(true);

        // Wait for opacity transition to finish before changing image
        setTimeout(() => {
            setCurrentIndex((p) => (p - 1 + images.length) % images.length);

            // Keep transitioning flag for a bit longer to ensure smooth handoff
            setTimeout(() => {
                setIsTransitioning(false);
            }, 50);
        }, 150); // Half the opacity transition time
    };

    const handleImageLoad = useCallback(
        (index: number, e: React.SyntheticEvent<HTMLImageElement>) => {
            const img = e.target as HTMLImageElement;
            setLoadedImages(prev => new Set(prev).add(index));

            // Store *scaled dimensions* that respect CARD_W / CARD_H limits
            const aspect = img.naturalWidth / img.naturalHeight;
            let scaledW = cardWidth!;
            let scaledH = cardHeight!;

            if (singlePhotoView) {
                scaledH = cardHeight!;
                scaledW = cardHeight! * aspect;

                if (scaledW > cardWidth!) {
                    scaledW = cardWidth!;
                    scaledH = cardWidth! / aspect;
                }
            }

            setImageDimensions(prev => {
                const newMap = new Map(prev);
                newMap.set(index, { width: scaledW, height: scaledH });
                return newMap;
            });
        },
        [cardWidth, cardHeight, singlePhotoView]
    );

    // Reset state when images change
    useEffect(() => {
        // Save previous loaded state before resetting
        setPrevLoadedImages(loadedImages);
        setPrevImagesMap(images.map(img => img.src));

        setLoadedImages(new Set());

        // Don't reset image dimensions to prevent flickering between projects
        setIsTransitioning(false);
    }, [images]);

    // Update active dimensions when current image changes or when dimensions are updated
    useEffect(() => {
        const dims = imageDimensions.get(currentIndex);
        if (dims && !isTransitioning) {
            setActiveImageDimensions(dims);
        }
    }, [currentIndex, imageDimensions, isTransitioning]);

    const allImagesLoaded = loadedImages.size === images.length;

    const CARD_W = cardWidth;
    const CARD_H = cardHeight;

    // Use previous dimensions during loading to prevent size flashing
    const containerStyle = {
        width: CARD_W,
        height: CARD_H + 50,
        margin: "0 auto",
        transition: "width 300ms ease-out, height 300ms ease-out"
    };

    return (
        <div className="w-full overflow-hidden">
            <div className="flex flex-col items-center">
                <div
                    ref={containerRef}
                    className="relative flex items-center justify-center"
                    style={containerStyle}
                >
                    {/* loading overlay - only show if no previous images are available */}
                    {!allImagesLoaded && prevLoadedImages.size === 0 && (
                        <div
                            className="absolute border-2 border-white bg-black flex flex-col items-center justify-center"
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

                    {/* Show a black placeholder with proper dimensions when transitioning between tabs */}
                    {!allImagesLoaded && prevLoadedImages.size === 0 && images.length > 0 && (
                        <div
                            className="absolute bg-black border-2 border-white shadow-lg overflow-hidden"
                            style={{
                                width: CARD_W,
                                height: CARD_H,
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                opacity: 0.5,
                                zIndex: 50
                            }}
                        />
                    )}

                    {images.map((img, index) => {
                        const offset = index - currentIndex;
                        const isLoaded = loadedImages.has(index);
                        const isPrevLoaded = prevImagesMap.includes(img.src) && prevLoadedImages.size > 0;
                        const isVisible = allImagesLoaded || isPrevLoaded || index < 3;
                        const isCurrent = index === currentIndex;

                        const imgDimensions = imageDimensions.get(index);

                        // We'll use the natural dimensions for better fitting if we have them
                        let calculatedWidth = CARD_W;
                        let calculatedHeight = CARD_H;
                        let frameWidth = CARD_W;

                        if (singlePhotoView && imgDimensions) {
                            const imageAspect = imgDimensions.width / imgDimensions.height;

                            // Calculate dimensions that maintain aspect ratio within container height
                            calculatedHeight = CARD_H;
                            calculatedWidth = CARD_H * imageAspect;

                            // For slideshow mode, set frame width to match calculated image width
                            frameWidth = calculatedWidth;

                            // Don't exceed container max width
                            if (calculatedWidth > CARD_W) {
                                calculatedWidth = CARD_W;
                                calculatedHeight = CARD_W / imageAspect;
                                frameWidth = CARD_W;
                            }
                        }

                        const style: React.CSSProperties = singlePhotoView
                            ? {

                                width: isCurrent ? imgDimensions?.width || CARD_W : imgDimensions?.width || CARD_W,
                                height: isCurrent ? imgDimensions?.height || CARD_H : imgDimensions?.height || CARD_H,
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                zIndex: isCurrent ? 100 : 0,
                                opacity: isCurrent ? (isTransitioning ? 0 : 1) : 0,
                                pointerEvents: isCurrent ? "auto" : "none",
                                transition: "opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)",
                                position: "absolute",
                                display: isVisible ? "block" : "none",
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
                                transition: allImagesLoaded ? 'transform 300ms ease-out, opacity 300ms ease-out' : 'none',
                                display: isVisible ? "block" : "none"
                            };

                        return (
                            <div
                                key={index}
                                className="absolute bg-black border-2 border-white shadow-lg overflow-hidden"
                                style={style}
                            >
                                <img
                                    src={img.src}
                                    alt={`Cockpit photo ${index + 1}`}
                                    className={`w-full h-full ${singlePhotoView ? 'object-contain' : 'object-cover'}`}
                                    onLoad={(e) => handleImageLoad(index, e)}
                                    style={{
                                        opacity: isLoaded || isPrevLoaded ? 1 : 0,
                                        transition: 'opacity 300ms ease-in',
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Controls - show for all cases but they do nothing for single image */}
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

                {/* Indicators - only show if multiple images */}
                <div className="flex items-center justify-center gap-1 mt-3">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (!isTransitioning && index !== currentIndex && images.length > 1) {
                                    // Store current dimensions before transition
                                    const currentDims = imageDimensions.get(currentIndex);
                                    if (currentDims) {
                                        setActiveImageDimensions(currentDims);
                                    }

                                    setIsTransitioning(true);

                                    setTimeout(() => {
                                        setCurrentIndex(index);

                                        setTimeout(() => {
                                            setIsTransitioning(false);
                                        }, 50);
                                    }, 150);
                                }
                            }}
                            disabled={!allImagesLoaded || isTransitioning}
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
