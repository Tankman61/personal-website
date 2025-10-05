'use client';
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { Button } from './Button';

// Create proper interface for PhotoCard props
interface PhotoCardProps {
    img: { src: string; width?: number; height?: number };
    index: number;
    currentIndex: number;
    isLoaded: boolean;
    dimensions: { width: number; height: number } | null;
    cardWidth: number;
    cardHeight: number;
    isTransitioning: boolean;
    transitionDelay: number;
    handleImageLoad: (index: number, e: React.SyntheticEvent<HTMLImageElement>) => void;
    isSingleView: boolean;
    onClick?: () => void;
    isFadingOut?: boolean;
    totalImages?: number;
}

// Photo card component (memoized)
const PhotoCard = React.memo<PhotoCardProps>(({
                                                  img,
                                                  index,
                                                  currentIndex,
                                                  dimensions,
                                                  cardWidth,
                                                  cardHeight,
                                                  isTransitioning,
                                                  transitionDelay,
                                                  handleImageLoad,
                                                  isSingleView,
                                                  onClick,
                                                  isFadingOut = false,
                                                  totalImages = 0
                                              }) => {
    const isCurrent = index === currentIndex;

    // Calculate offset with wrapping for smoother transitions
    let offset = index - currentIndex;
    // For non-single view, use circular offset to take shorter path (prevents jumping from last to first)
    if (!isSingleView && totalImages > 0) {
        // Normalize offset to range [-totalImages/2, totalImages/2] for shortest path
        if (offset > totalImages / 2) {
            offset = offset - totalImages;
        } else if (offset < -totalImages / 2) {
            offset = offset + totalImages;
        }
    }

    const style = useMemo((): React.CSSProperties => {
        if (isSingleView) {
            const dims = dimensions || { width: cardWidth, height: cardHeight };

            // Crossfade logic for single view
            let opacity = 1;
            let zIndex = 100;

            if (isFadingOut && isTransitioning) {
                // Old image fades out on top
                opacity = 0;
                zIndex = 101;
            } else if (isCurrent && !isFadingOut) {
                // New image visible below
                opacity = 1;
                zIndex = 100;
            }

            return {
                width: dims.width,
                height: dims.height,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: opacity,
                zIndex: zIndex,
                transition: `opacity ${transitionDelay}ms ease-in-out`,
            };
        } else {
            return {
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translateX(${offset * 48}px) translateY(${
                    Math.abs(offset) * 6
                }px) rotate(${offset * 2.5}deg)`,
                zIndex: 100 - Math.abs(offset),
                opacity: Math.abs(offset) <= 2 ? 1 : 0,
                pointerEvents: Math.abs(offset) > 2 ? 'none' : 'auto',
                transformOrigin: 'center center',
                transition: `transform ${transitionDelay}ms ease-out, opacity ${transitionDelay}ms ease-out`,
            };
        }
    }, [isSingleView, dimensions, offset, isTransitioning, cardWidth, cardHeight, transitionDelay, isFadingOut, isCurrent]);

    return (
        <div
            className="absolute bg-black border-2 border-white shadow-lg overflow-hidden"
            style={style}
            onClick={onClick}
        >
            <Image
                src={img.src}
                alt={`Photo ${index + 1}`}
                fill
                sizes={isSingleView ? `${dimensions?.width || cardWidth}px` : "(max-width: 768px) 100vw, 285px"}
                className={isSingleView ? "object-contain" : "object-cover"}
                onLoad={(e) => handleImageLoad(index, e)}
                priority={isCurrent || Math.abs(offset) <= 1}
                loading={Math.abs(offset) <= 1 ? "eager" : "lazy"}
            />
        </div>
    );
});

// Set display name correctly (outside component definition)
PhotoCard.displayName = 'PhotoCard';

interface PhotoDeckProps {
    images: { src: string; width?: number; height?: number }[];
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
    const [imageDimensions, setImageDimensions] = useState<
        Map<number, { width: number; height: number }>
    >(new Map());
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const [showDeck, setShowDeck] = useState(false);
    const [connectionSpeed, setConnectionSpeed] = useState('fast');
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
    const [enlargedImageLoaded, setEnlargedImageLoaded] = useState(false);

    const activeImageRef = useRef<{ width: number; height: number } | null>(null);
    // Track if currently visible images are loaded
    const visibleImagesLoaded = useMemo(() => {
        if (images.length === 0) return true;
        // In non-single view, we care most about the current image being loaded
        return loadedImages.has(currentIndex);
    }, [currentIndex, images.length, loadedImages]);
    const preloadedIndexesRef = useRef<Set<number>>(new Set());
    const imageCache = useRef(new Map());
    const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const CARD_W = cardWidth;
    const CARD_H = cardHeight;

    // Handle image click to enlarge
    const handleImageClick = useCallback((src: string) => {
        setEnlargedImage(src);
        setEnlargedImageLoaded(false);
    }, []);

    // Close modal handler
    const closeModal = useCallback(() => {
        setEnlargedImage(null);
    }, []);

    // Adaptive transition delay based on view mode
    const TRANSITION_DELAY = useMemo(() => {
        // No transitions for single photo view (instant switching)
        if (singlePhotoView) return 0;
        // Smooth transitions for card deck view
        return connectionSpeed === 'slow' ? 300 : 250;
    }, [connectionSpeed, singlePhotoView]);

    // Detect network connection speed
    useEffect(() => {
        // Define NetworkInformation interface
        interface NetworkInformation {
            effectiveType: string;
            addEventListener: (type: string, listener: EventListener) => void;
            removeEventListener: (type: string, listener: EventListener) => void;
        }

// Use type assertion with specific interface
        const connection = (navigator as unknown as {connection: NetworkInformation}).connection;
        if (connection) {
            setConnectionSpeed(connection.effectiveType);
            const updateConnectionStatus = () => {
                setConnectionSpeed(connection.effectiveType);
            };
            connection.addEventListener('change', updateConnectionStatus);
            return () => connection.removeEventListener('change', updateConnectionStatus);
        }
    }, []);

    // Calculate visible range (virtualization)
    const visibleRange = useMemo(() => {
        const buffer = 2;
        return {
            start: Math.max(0, currentIndex - buffer),
            end: Math.min(images.length - 1, currentIndex + buffer)
        };
    }, [currentIndex, images.length]);

    // Reset when images change
    useEffect(() => {
        setShowLoading(true);
        setShowDeck(false);
        setLoadedImages(new Set());
        setIsTransitioning(false);
        setCurrentIndex(0);
        preloadedIndexesRef.current = new Set();

        // Pre-calculate dimensions for first image if metadata is available
        const firstImage = images[0];
        if (firstImage?.width && firstImage?.height && singlePhotoView) {
            const aspect = firstImage.width / firstImage.height;
            let scaledW = CARD_H * aspect;
            let scaledH = CARD_H;
            if (scaledW > CARD_W) {
                scaledW = CARD_W;
                scaledH = CARD_W / aspect;
            }
            setImageDimensions(new Map([[0, { width: scaledW, height: scaledH }]]));
        } else if (activeImageRef.current) {
            setImageDimensions(new Map([[0, activeImageRef.current]]));
        } else {
            setImageDimensions(new Map());
        }
    }, [images, singlePhotoView, CARD_W, CARD_H]);

    // Setup intersection observer
    useEffect(() => {
        if (!containerRef.current) return;

        intersectionObserverRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const priorityIndexes = [
                            currentIndex,
                            (currentIndex + 1) % images.length,
                            (currentIndex - 1 + images.length) % images.length,
                        ];

                        priorityIndexes.forEach(index => {
                            if (!preloadedIndexesRef.current.has(index)) {
                                preloadImage(index);
                            }
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        intersectionObserverRef.current.observe(containerRef.current);

        return () => {
            if (intersectionObserverRef.current) {
                intersectionObserverRef.current.disconnect();
            }
        };
    }, [currentIndex, images.length]);

    // escape key to close modal
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && enlargedImage) {
                closeModal();
            }
        };

        if (enlargedImage) {
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [enlargedImage, closeModal]);

    // Get cached image
    const getCachedImage = useCallback((src: string) => {
        if (imageCache.current.has(src)) {

            return imageCache.current.get(src);
        }

        const img = new window.Image();
        img.src = src;
        imageCache.current.set(src, img);
        return img;
    }, []);

    // Navigation
    const changePhoto = useCallback(
        (delta: number) => {
            if (images.length <= 1 || isTransitioning) return;

            const currentDims = imageDimensions.get(currentIndex);
            if (currentDims) activeImageRef.current = currentDims;

            const nextIndex = (currentIndex + delta + images.length) % images.length;

            if (singlePhotoView) {
                // Instant switch for single view
                setCurrentIndex(nextIndex);
                setIsTransitioning(true);
                setTimeout(() => setIsTransitioning(false), 50);
            } else {
                // Smooth transition for deck view
                setIsTransitioning(true);
                setTimeout(() => {
                    setCurrentIndex(nextIndex);
                    setTimeout(() => setIsTransitioning(false), TRANSITION_DELAY);
                }, TRANSITION_DELAY);
            }
        },
        [currentIndex, imageDimensions, images.length, isTransitioning, singlePhotoView, TRANSITION_DELAY],
    );

    const nextPhoto = useCallback(() => changePhoto(1), [changePhoto]);
    const prevPhoto = useCallback(() => changePhoto(-1), [changePhoto]);

    // Handle image load with memoized function
    const handleImageLoad = useCallback(
        (index: number, e: React.SyntheticEvent<HTMLImageElement>) => {
            const img = e.target as HTMLImageElement;

            setLoadedImages((prev) => {
                if (prev.has(index)) return prev;
                const newSet = new Set(prev);
                newSet.add(index);
                return newSet;
            });

            const aspect = img.naturalWidth / img.naturalHeight;
            let scaledW = CARD_W;
            let scaledH = CARD_H;

            if (singlePhotoView) {
                scaledW = CARD_H * aspect;
                scaledH = CARD_H;
                if (scaledW > CARD_W) {
                    scaledW = CARD_W;
                    scaledH = CARD_W / aspect;
                }
            }

            setImageDimensions((prev) => {
                if (prev.has(index) &&
                    prev.get(index)?.width === scaledW &&
                    prev.get(index)?.height === scaledH) {
                    return prev;
                }
                const newMap = new Map(prev);
                newMap.set(index, { width: scaledW, height: scaledH });
                return newMap;
            });
        },
        [CARD_W, CARD_H, singlePhotoView],
    );

    // Preload function for individual images
    const preloadImage = useCallback((index: number) => {
        if (preloadedIndexesRef.current.has(index) || index >= images.length) {
            return Promise.resolve();
        }

        return new Promise<void>((resolve) => {
            const img = getCachedImage(images[index].src);

            if (img.complete) {
                handleImageLoad(index, {
                    target: img,
                } as unknown as React.SyntheticEvent<HTMLImageElement>);
                preloadedIndexesRef.current.add(index);
                resolve();
            } else {
                img.onload = () => {
                    handleImageLoad(index, {
                        target: img,
                    } as unknown as React.SyntheticEvent<HTMLImageElement>);
                    preloadedIndexesRef.current.add(index);
                    resolve();
                };
            }
        });
    }, [images, handleImageLoad, getCachedImage]);

    // Optimized batch loading strategy
    useEffect(() => {
        // Clear batched loading timeouts on unmount
        const timeouts: NodeJS.Timeout[] = [];

        const priorityIndexes = [
            currentIndex,
            (currentIndex + 1) % images.length,
            (currentIndex - 1 + images.length) % images.length,
        ];

        // Immediately load the current image if not loaded
        Promise.all(priorityIndexes.map(index => preloadImage(index)))
            .then(() => {
                // Then load remaining images
                const remainingIndexes = Array.from(
                    { length: images.length },
                    (_, i) => i
                ).filter(i => !priorityIndexes.includes(i));

                // Load remaining images in smaller batches with increasing delays
                const loadBatch = (indexes: number[], batchSize = 2, delay = 100) => {
                    if (indexes.length === 0) return;

                    const batch = indexes.slice(0, batchSize);
                    const remaining = indexes.slice(batchSize);

                    const timeout = setTimeout(() => {
                        Promise.all(batch.map(index => preloadImage(index)))
                            .then(() => loadBatch(remaining, batchSize, delay * 1.5));
                    }, delay);

                    timeouts.push(timeout);
                };

                loadBatch(remainingIndexes);
            });

        return () => timeouts.forEach(clearTimeout);
    }, [images, currentIndex, preloadImage]);

    // Loading to deck transition
    useEffect(() => {
        if (singlePhotoView && loadedImages.has(currentIndex)) {
            setShowLoading(false);
            setShowDeck(true);
        }
    }, [loadedImages, currentIndex, singlePhotoView]);

    // Memoize dimensions to prevent unnecessary recalculations
    const imgDimensions = useMemo(() => {
        // First, check if we have calculated dimensions from loaded image
        const calculatedDims = imageDimensions.get(currentIndex);
        if (calculatedDims) return calculatedDims;

        // If not loaded yet, try to estimate from image metadata
        const currentImage = images[currentIndex];
        if (currentImage?.width && currentImage?.height && singlePhotoView) {
            const aspect = currentImage.width / currentImage.height;
            let scaledW = CARD_H * aspect;
            let scaledH = CARD_H;
            if (scaledW > CARD_W) {
                scaledW = CARD_W;
                scaledH = CARD_W / aspect;
            }
            return { width: scaledW, height: scaledH };
        }

        // Fallback to card dimensions
        return { width: CARD_W, height: CARD_H };
    }, [imageDimensions, currentIndex, CARD_W, CARD_H, images, singlePhotoView]);

    const containerStyle: React.CSSProperties = useMemo(() => ({
        width: imgDimensions.width,
        height: imgDimensions.height + 50,
        margin: '0 auto',
        // No container transitions in single view to prevent flickering
        transition: singlePhotoView ? 'none' : `width ${TRANSITION_DELAY}ms ease-out, height ${TRANSITION_DELAY}ms ease-out`,
    }), [imgDimensions.width, imgDimensions.height, TRANSITION_DELAY, singlePhotoView]);

    // Render dots
    const renderDots = useCallback(() =>
            images.map((_, index) => (
                <button
                    key={index}
                    onClick={() => {
                        if (!isTransitioning && index !== currentIndex && images.length > 1) {
                            const currentDims = imageDimensions.get(currentIndex);
                            if (currentDims) activeImageRef.current = currentDims;

                            setIsTransitioning(true);

                            if (preloadedIndexesRef.current.has(index)) {
                                setTimeout(() => {
                                    setCurrentIndex(index);
                                    setTimeout(() => setIsTransitioning(false), TRANSITION_DELAY);
                                }, TRANSITION_DELAY);
                            } else {
                                preloadImage(index).then(() => {
                                    setTimeout(() => {
                                        setCurrentIndex(index);
                                        setTimeout(() => setIsTransitioning(false), TRANSITION_DELAY);
                                    }, TRANSITION_DELAY);
                                });
                            }
                        }
                    }}
                    disabled={!loadedImages.has(currentIndex) || isTransitioning}
                    className={`w-2 h-2 rounded-full transition-transform duration-200 ${
                        index === currentIndex ? 'bg-cyan-300' : 'bg-gray-500 hover:bg-gray-400'
                    }`}
                />
            )),
        [currentIndex, imageDimensions, images.length, isTransitioning, loadedImages, preloadImage, TRANSITION_DELAY]
    );

    // Render controls
    const renderControls = useCallback(() => (
        <div className="flex items-center justify-center gap-4 -mt-3">
            <Button width={32} height={32} fontSize={14} onClick={prevPhoto}>
                ←
            </Button>
            <Button width={32} height={32} fontSize={14} onClick={nextPhoto}>
                →
            </Button>
        </div>
    ), [nextPhoto, prevPhoto]);

    if (!singlePhotoView) {
        return (
            <div className="w-full overflow-hidden">
                <div className="flex flex-col items-center">
                    <div
                        ref={containerRef}
                        className="relative flex items-center justify-center"
                        style={containerStyle}
                    >
                        {!visibleImagesLoaded && (
                            <div
                                className="absolute border-2 border-white bg-black flex flex-col items-center justify-center"
                                style={{
                                    width: 285,
                                    height: CARD_H,
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 1000,
                                }}
                            >
                                <div className="text-airbus-green text-sm mb-2">LOADING PHOTOS</div>
                                <div className="text-airbus-green text-xs">
                                    {loadedImages.size}/{images.length}
                                </div>
                            </div>
                        )}

                        {images.map((img, index) => {
                            // Only render visible images (virtualization)
                            if (index < visibleRange.start || index > visibleRange.end) return null;

                            const offset = index - currentIndex;
                            const isLoaded = loadedImages.has(index);
                            const isSingleImage = images.length === 1;
                            const isCurrent = index === currentIndex;
                            const isVisible = isSingleImage || isCurrent || Math.abs(offset) <= 2;

                            if (!isVisible) return null;

                            return (
                                <PhotoCard
                                    key={index}
                                    img={img}
                                    index={index}
                                    currentIndex={currentIndex}
                                    isLoaded={isLoaded}
                                    dimensions={null}
                                    cardWidth={CARD_W}
                                    cardHeight={CARD_H}
                                    isTransitioning={isTransitioning}
                                    transitionDelay={TRANSITION_DELAY}
                                    handleImageLoad={handleImageLoad}
                                    isSingleView={false}
                                    totalImages={images.length}
                                />
                            );
                        })}
                    </div>

                    {renderControls()}
                    <div className="flex items-center justify-center gap-1 mt-3">{renderDots()}</div>
                </div>
            </div>
        );
    }

    // Single photo view
    return (
        <>
            <div className="w-full overflow-hidden">
                <div className="flex flex-col items-center">
                    <div
                        ref={containerRef}
                        className="relative flex items-center justify-center"
                        style={containerStyle}
                    >
                        {showLoading && (
                            <div
                                className="absolute border-2 border-white bg-black flex flex-col items-center justify-center"
                                style={{
                                    width: CARD_W - 50,
                                    height: CARD_H,
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 1000,
                                }}
                            >
                                <div className="text-airbus-green text-sm mb-2">LOADING PHOTOS</div>
                                <div className="text-airbus-green text-xs">
                                    {loadedImages.size}/{images.length}
                                </div>
                            </div>
                        )}

                        {showDeck && (
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                }}
                            >
                            {images
                                .filter((_, index) => index === currentIndex)
                                .map((img) => {
                                    const imgIndex = images.indexOf(img);
                                    const isLoaded = loadedImages.has(imgIndex);
                                    const dims = imageDimensions.get(imgIndex);

                                    return (
                                        <PhotoCard
                                            key={imgIndex}
                                            img={img}
                                            index={imgIndex}
                                            currentIndex={currentIndex}
                                            isLoaded={isLoaded}
                                            dimensions={dims ?? null}
                                            cardWidth={CARD_W}
                                            cardHeight={CARD_H}
                                            isTransitioning={isTransitioning}
                                            transitionDelay={TRANSITION_DELAY}
                                            handleImageLoad={handleImageLoad}
                                            isSingleView={true}
                                            onClick={() => handleImageClick(img.src)}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {renderControls()}
                    <div className="flex items-center justify-center gap-1 mt-3">{renderDots()}</div>
                </div>
            </div>

            {/* Enlarged image modal */}
            {enlargedImage && (
                <div
                    className="fixed -inset-20 flex items-center justify-center bg-black/50"
                    style={{ zIndex: 9999 }}
                    onClick={closeModal}
                >
                    <div className="relative z-10" onClick={(e) => e.stopPropagation()}>
                        <div className="relative flex items-center justify-center">
                            {/* Loading overlay */}
                            {!enlargedImageLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white text-lg">LOADING...</span>
                                </div>
                            )}

                            {/* Image itself */}
                            <Image
                                src={enlargedImage}
                                alt="Selected image"
                                width={1200}
                                height={800}
                                className="object-contain shadow-xl transition-opacity"
                                onLoadingComplete={() => setEnlargedImageLoaded(true)}
                            />

                            {/* Close button */}
                            {enlargedImageLoaded && (
                                <button
                                    className="absolute top-2 right-2 bg-black bg-opacity-70 text-white w-8 h-8 rounded-full flex items-center justify-center z-30 hover:bg-opacity-90"
                                    onClick={closeModal}
                                    aria-label="Close image"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PhotoDeck;
