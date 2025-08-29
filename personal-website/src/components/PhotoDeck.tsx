//todo: optimize the file size because i got lazy :sob:
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
    const [imageDimensions, setImageDimensions] = useState<Map<number, { width: number; height: number }>>(new Map());
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [initialized, setInitialized] = useState(false);

    const activeImageDimensionsRef = useRef<{ width: number; height: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [showLoading, setShowLoading] = useState(true);
    const [showDeck, setShowDeck] = useState(false);

    const nextPhoto = useCallback(() => {
        if (images.length <= 1 || isTransitioning) return;

        const currentDims = imageDimensions.get(currentIndex);
        if (currentDims) activeImageDimensionsRef.current = currentDims;

        setIsTransitioning(true);
        requestAnimationFrame(() => {
            setCurrentIndex((p) => (p + 1) % images.length);
            requestAnimationFrame(() => {
                setTimeout(() => setIsTransitioning(false), 50);
            });
        });
    }, [currentIndex, imageDimensions, images.length, isTransitioning]);

    const prevPhoto = useCallback(() => {
        if (images.length <= 1 || isTransitioning) return;

        const currentDims = imageDimensions.get(currentIndex);
        if (currentDims) activeImageDimensionsRef.current = currentDims;

        setIsTransitioning(true);
        requestAnimationFrame(() => {
            setCurrentIndex((p) => (p - 1 + images.length) % images.length);
            requestAnimationFrame(() => {
                setTimeout(() => setIsTransitioning(false), 50);
            });
        });
    }, [currentIndex, imageDimensions, images.length, isTransitioning]);

    const handleImageLoad = useCallback(
        (index: number, e: React.SyntheticEvent<HTMLImageElement>) => {
            const img = e.target as HTMLImageElement;
            setLoadedImages((prev) => new Set(prev).add(index));

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

            setImageDimensions((prev) => {
                const newMap = new Map(prev);
                newMap.set(index, { width: scaledW, height: scaledH });
                return newMap;
            });
        },
        [cardWidth, cardHeight, singlePhotoView]
    );

    useEffect(() => {
        setInitialized(true);
        setLoadedImages(new Set());
        setIsTransitioning(false);
        setCurrentIndex(0);

        // Preserve dimensions during image changes
        if (activeImageDimensionsRef.current) {
            setImageDimensions(new Map([[0, activeImageDimensionsRef.current]]));
        }
    }, [images]);

    // Update ref when current image changes
    useEffect(() => {
        const dims = imageDimensions.get(currentIndex);
        if (dims) {
            activeImageDimensionsRef.current = dims;
        } else if (activeImageDimensionsRef.current) {
            // Keep previous dimensions while loading new images
            setImageDimensions((prev) => {
                const newMap = new Map(prev);
                newMap.set(currentIndex, activeImageDimensionsRef.current!);
                return newMap;
            });
        }
    }, [currentIndex, imageDimensions]);

    useEffect(() => {
        images.forEach((img, index) => {
            const image = new Image();
            image.src = img.src;

            if (image.complete) {
                handleImageLoad(
                    index,
                    { target: image } as unknown as React.SyntheticEvent<HTMLImageElement>
                );
            } else {
                image.onload = (e: Event) =>
                    handleImageLoad(
                        index,
                        e as unknown as React.SyntheticEvent<HTMLImageElement>
                    );
                image.onerror = () => {
                    setLoadedImages((prev) => new Set(prev).add(index));
                };
            }
        });
    }, [images, handleImageLoad]);


    const allImagesLoaded = loadedImages.size === images.length;
    const CARD_W = cardWidth;
    const CARD_H = cardHeight;
    const imgDimensions = imageDimensions.get(currentIndex);

    const containerStyle: React.CSSProperties = {
        width: imgDimensions?.width || CARD_W,
        height: (imgDimensions?.height || CARD_H) + 50,
        margin: "0 auto",
        transition: "width 300ms ease-out, height 300ms ease-out",
    };

    useEffect(() => {
        if (singlePhotoView) {
            if (allImagesLoaded) {
                // fade out loader, then fade in deck (match timings to your transitions)
                setShowLoading(false);
                setTimeout(() => setShowDeck(true), 300); // 300ms matches your CSS transition
            } else {
                setShowDeck(false);
                setShowLoading(true);
            }
        }
    }, [allImagesLoaded, singlePhotoView]);

    // Conditional rendering based on singlePhotoView
    if (!singlePhotoView) {
        // Original version for NOT singlePhotoView mode
        return (
            <div className="w-full overflow-hidden">
                <div className="flex flex-col items-center">
                    <div ref={containerRef} className="relative flex items-center justify-center" style={containerStyle}>
                        {/* Loading overlay */}
                        {!allImagesLoaded && (
                            <div
                                className="absolute border-2 border-white bg-black flex flex-col items-center justify-center"
                                style={{
                                    width: 285,
                                    height: CARD_H,
                                    left: "50%",
                                    top: "50%",
                                    transform: "translate(-50%, -50%)",
                                    zIndex: 1000,
                                    opacity: 1,
                                    transition: "opacity 300ms ease-in",
                                }}
                            >
                                <div className="text-airbus-green text-sm mb-2">LOADING PHOTOS</div>
                                <div className="text-airbus-green text-xs">
                                    {loadedImages.size}/{images.length}
                                </div>
                            </div>
                        )}

                        {/* Visible deck */}
                        {images.map((img, index) => {
                            const offset = index - currentIndex;
                            const isLoaded = loadedImages.has(index);
                            const isSingleImage = images.length === 1;
                            const isCurrent = index === currentIndex;

                            const isVisible =
                                initialized && (isSingleImage || isCurrent || (!singlePhotoView && Math.abs(offset) <= 2));

                            if (!isVisible && !isSingleImage) return null;

                            const imgDimensions = imageDimensions.get(index);

                            const style: React.CSSProperties = singlePhotoView
                                ? {
                                    width: imgDimensions?.width || CARD_W,
                                    height: imgDimensions?.height || CARD_H,
                                    left: "50%",
                                    top: "50%",
                                    transform: "translate(-50%, -50%)",
                                    zIndex: 100,
                                    opacity: isTransitioning ? 0 : 1,
                                    pointerEvents: "auto",
                                    transition: "opacity 300ms ease-out",
                                    position: "absolute",
                                }
                                : {
                                    width: `${CARD_W}px`,
                                    height: `${CARD_H}px`,
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    transform: `translate(-50%, -50%) translateX(${offset * 48}px) translateY(${
                                        Math.abs(offset) * 6
                                    }px) rotate(${offset * 2.5}deg)`,
                                    zIndex: 100 - Math.abs(offset),
                                    opacity: isSingleImage ? 1 : Math.abs(offset) <= 2 ? 1 : 0,
                                    pointerEvents: Math.abs(offset) > 2 ? "none" : "auto",
                                    transformOrigin: "center center",
                                    transition: "transform 300ms ease-out, opacity 300ms ease-out",
                                };

                            return (
                                <div
                                    key={index}
                                    className="absolute bg-black border-2 border-white shadow-lg overflow-hidden"
                                    style={style}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={img.src}
                                        alt={`Cockpit photo ${index + 1}`}
                                        className={`w-full h-full ${singlePhotoView ? "object-contain" : "object-cover"}`}
                                        style={{
                                            opacity: isLoaded ? 1 : 0,
                                            transition: "opacity 300ms ease-in",
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

                    {/* Dots */}
                    <div className="flex items-center justify-center gap-1 mt-3">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (!isTransitioning && index !== currentIndex && images.length > 1) {
                                        const currentDims = imageDimensions.get(currentIndex);
                                        if (currentDims) activeImageDimensionsRef.current = currentDims;

                                        setIsTransitioning(true);
                                        setCurrentIndex(index);
                                        setTimeout(() => setIsTransitioning(false), 300);
                                    }
                                }}
                                disabled={!allImagesLoaded || isTransitioning}
                                className={`w-2 h-2 rounded-full transition-transform duration-200 ${
                                    index === currentIndex ? "bg-cyan-300" : "bg-gray-500 hover:bg-gray-400"
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Hidden preloader ensures all images load immediately */}
                <div className="hidden">
                    {images.map((img, index) => (
                        <img key={`preload-${index}`} src={img.src} alt="" onLoad={(e) => handleImageLoad(index, e)} />
                    ))}
                </div>
            </div>
        );
    }

    // Optimized version FOR singlePhotoView mode
    return (
        <div className="w-full overflow-hidden">
            <div className="flex flex-col items-center">
                <div
                    ref={containerRef}
                    className="relative flex items-center justify-center"
                    style={containerStyle}
                >
                    {/* Loading overlay: always rendered, fades out */}
                    <div
                        className="absolute bg-black flex flex-col items-center justify-center"
                        style={{
                            width: CARD_W,
                            height: CARD_H,
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 1000,
                            opacity: showLoading ? 1 : 0,
                            pointerEvents: showLoading ? "auto" : "none",
                        }}
                    >
                        <div className="text-airbus-green text-sm mb-2">LOADING PHOTOS</div>
                        <div className="text-airbus-green text-xs">
                            {loadedImages.size}/{images.length}
                        </div>
                    </div>

                    {/* Visible deck: always rendered, fades in */}
                    <div
                        style={{
                            opacity: showDeck ? 1 : 0,
                            transition: "opacity 300ms ease-in",
                            pointerEvents: showDeck ? "auto" : "none",
                            width: "100%",
                            height: "100%",
                            position: "relative",
                        }}
                    >
                        {images.map((img, index) => {
                            const offset = index - currentIndex;
                            const isLoaded = loadedImages.has(index);
                            const isSingleImage = images.length === 1;
                            const isCurrent = index === currentIndex;
                            const isVisible =
                                initialized &&
                                allImagesLoaded &&
                                (isSingleImage ||
                                    isCurrent ||
                                    (!singlePhotoView && Math.abs(offset) <= 2));
                            if (!isVisible && !isSingleImage) return null;
                            const imgDimensions = imageDimensions.get(index);
                            const style: React.CSSProperties = singlePhotoView
                                ? {
                                    width: imgDimensions?.width || CARD_W,
                                    height: imgDimensions?.height || CARD_H,
                                    left: "50%",
                                    top: "50%",
                                    transform: "translate(-50%, -50%)",
                                    zIndex: 100,
                                    opacity: isTransitioning ? 0 : 1,
                                    pointerEvents: "auto",
                                    transition: "opacity 300ms ease-out",
                                    position: "absolute",
                                }
                                : {
                                    width: `${CARD_W}px`,
                                    height: `${CARD_H}px`,
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    transform: `translate(-50%, -50%) translateX(${
                                        offset * 48
                                    }px) translateY(${
                                        Math.abs(offset) * 6
                                    }px) rotate(${offset * 2.5}deg)`,
                                    zIndex: 100 - Math.abs(offset),
                                    opacity: isSingleImage
                                        ? 1
                                        : Math.abs(offset) <= 2
                                            ? 1
                                            : 0,
                                    pointerEvents: Math.abs(offset) > 2 ? "none" : "auto",
                                    transformOrigin: "center center",
                                    transition:
                                        "transform 300ms ease-out, opacity 300ms ease-out",
                                };
                            return (
                                <div
                                    key={index}
                                    className="absolute bg-black border-2 border-white shadow-lg overflow-hidden"
                                    style={style}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={img.src}
                                        alt={`Cockpit photo ${index + 1}`}
                                        className={`w-full h-full ${
                                            singlePhotoView
                                                ? "object-contain"
                                                : "object-cover"
                                        }`}
                                        style={{
                                            opacity: isLoaded && allImagesLoaded ? 1 : 0,
                                            transition: "opacity 300ms ease-in",
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
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

                {/* Dots */}
                <div className="flex items-center justify-center gap-1 mt-3">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (
                                    !isTransitioning &&
                                    index !== currentIndex &&
                                    images.length > 1
                                ) {
                                    const currentDims = imageDimensions.get(currentIndex);
                                    if (currentDims)
                                        activeImageDimensionsRef.current = currentDims;
                                    setIsTransitioning(true);
                                    setCurrentIndex(index);
                                    setTimeout(() => setIsTransitioning(false), 300);
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

            {/* Hidden preloader ensures all images load immediately */}
            <div className="hidden">
                {images.map((img, index) => (
                    <img key={`preload-${index}`} src={img.src} alt="" onLoad={(e) => handleImageLoad(index, e)} />
                ))}
            </div>
        </div>
    );
};

export default PhotoDeck;
