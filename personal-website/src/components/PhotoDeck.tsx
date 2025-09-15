'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from './Button';

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

  const activeImageRef = useRef<{ width: number; height: number } | null>(null);
  const allImagesLoaded = loadedImages.size === images.length;

  const CARD_W = cardWidth;
  const CARD_H = cardHeight;

  // Reset when images change
  useEffect(() => {
    setShowLoading(true);
    setShowDeck(false);
    setLoadedImages(new Set());
    setIsTransitioning(false);
    setCurrentIndex(0);

    if (activeImageRef.current) {
      setImageDimensions(new Map([[0, activeImageRef.current]]));
    }
  }, [images]);

  // Navigation
  const changePhoto = useCallback(
    (delta: number) => {
      if (images.length <= 1 || isTransitioning) return;

      const currentDims = imageDimensions.get(currentIndex);
      if (currentDims) activeImageRef.current = currentDims;

      setIsTransitioning(true);
      setTimeout(() => {
          setCurrentIndex((p) => (p + delta + images.length) % images.length);
          setTimeout(() => setIsTransitioning(false), 100);
      }, 100);
    },
    [currentIndex, imageDimensions, images.length, isTransitioning],
  );

  const nextPhoto = () => changePhoto(1);
  const prevPhoto = () => changePhoto(-1);

  // Handle image load
  const handleImageLoad = useCallback(
    (index: number, e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.target as HTMLImageElement;
      setLoadedImages((prev) => new Set(prev).add(index));

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
        const newMap = new Map(prev);
        newMap.set(index, { width: scaledW, height: scaledH });
        return newMap;
      });
    },
    [CARD_W, CARD_H, singlePhotoView],
  );

  // Sync ref with current image
  useEffect(() => {
    const dims = imageDimensions.get(currentIndex);
    if (dims) activeImageRef.current = dims;
    else if (activeImageRef.current) {
      setImageDimensions((prev) => {
        const newMap = new Map(prev);
        newMap.set(currentIndex, activeImageRef.current!);
        return newMap;
      });
    }
  }, [currentIndex, imageDimensions]);

  // Preload all images
  useEffect(() => {
    images.forEach((img, index) => {
      const image = new window.Image();
      image.src = img.src;

      if (image.complete) {
        handleImageLoad(index, {
          target: image,
        } as unknown as React.SyntheticEvent<HTMLImageElement>);
      } else {
        image.onload = () =>
          handleImageLoad(index, {
            target: image,
          } as unknown as React.SyntheticEvent<HTMLImageElement>);
      }
    });
  }, [images, handleImageLoad]);

  // Loading to deck transition
  useEffect(() => {
    if (singlePhotoView && allImagesLoaded) {
      const timeout = setTimeout(() => {
        setShowLoading(false);
        setTimeout(() => setShowDeck(true), 300);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [allImagesLoaded, singlePhotoView]);

  const imgDimensions = imageDimensions.get(currentIndex);
  const containerStyle: React.CSSProperties = {
    width: imgDimensions?.width || CARD_W,
    height: (imgDimensions?.height || CARD_H) + 50,
    margin: '0 auto',
    transition: 'width 300ms ease-out, height 300ms ease-out',
  };

  // Render dots
  const renderDots = () =>
    images.map((_, index) => (
      <button
        key={index}
        onClick={() => {
          if (!isTransitioning && index !== currentIndex && images.length > 1) {
            const currentDims = imageDimensions.get(currentIndex);
            if (currentDims) activeImageRef.current = currentDims;

              setIsTransitioning(true);
              setTimeout(() => {
                  setCurrentIndex(index);
                  setTimeout(() => setIsTransitioning(false), 300);
              }, 300);
          }
        }}
        disabled={!allImagesLoaded || isTransitioning}
        className={`w-2 h-2 rounded-full transition-transform duration-200 ${
          index === currentIndex ? 'bg-cyan-300' : 'bg-gray-500 hover:bg-gray-400'
        }`}
      />
    ));

  // Render controls
  const renderControls = () => (
    <div className="flex items-center justify-center gap-4 -mt-3">
      <Button width={32} height={32} fontSize={14} onClick={prevPhoto}>
        ←
      </Button>
      <Button width={32} height={32} fontSize={14} onClick={nextPhoto}>
        →
      </Button>
    </div>
  );

  if (!singlePhotoView) {
    return (
      <div className="w-full overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="relative flex items-center justify-center" style={containerStyle}>
            {!allImagesLoaded && (
              <div
                className="absolute border-2 border-white bg-black flex flex-col items-center justify-center"
                style={{
                  width: 285,
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

            {images.map((img, index) => {
              const offset = index - currentIndex;
              const isLoaded = loadedImages.has(index);
              const isSingleImage = images.length === 1;
              const isCurrent = index === currentIndex;
              const isVisible = isSingleImage || isCurrent || Math.abs(offset) <= 2;
              if (!isVisible) return null;

              const style: React.CSSProperties = {
                width: `${CARD_W}px`,
                height: `${CARD_H}px`,
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
                transition: 'transform 300ms ease-out, opacity 300ms ease-out',
              };

              return (
                <div
                  key={index}
                  className="absolute bg-black border-2 border-white shadow-lg overflow-hidden"
                  style={style}
                >
                  <Image
                    src={img.src}
                    alt={`Photo ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 285px"
                    className="object-cover"
                    style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 300ms ease-in' }}
                    onLoad={(e) => handleImageLoad(index, e)}
                    priority={index === currentIndex}
                  />
                </div>
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
    <div className="w-full overflow-hidden">
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center" style={containerStyle}>
          <div
            //  transition-opacity duration-300 could be added to make it more smooth but im not sure which one im feeling right now
            className="absolute border-2 border-white bg-black flex flex-col items-center justify-center transition-opacity duration-150"
            style={{
              width: CARD_W - 50,
              height: CARD_H,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              opacity: showLoading ? 1 : 0,
              pointerEvents: showLoading ? 'auto' : 'none',
            }}
          >
            <div className="text-airbus-green text-sm mb-2">LOADING PHOTOS</div>
            <div className="text-airbus-green text-xs">
              {loadedImages.size}/{images.length}
            </div>
          </div>

          <div
            className="transition-opacity duration-100"
            style={{
              opacity: showDeck ? 1 : 0,
              pointerEvents: showDeck ? 'auto' : 'none',
              width: '100%',
              height: '100%',
              position: 'relative',
              visibility: showDeck ? 'visible' : 'hidden',
            }}
          >
            {images
              .filter((_, index) => index === currentIndex)
              .map((img, index) => {
                const isLoaded = loadedImages.has(index);
                const dims = imageDimensions.get(index);
                return (
                  <div
                    key={index}
                    className="absolute bg-black border-2 border-white shadow-lg overflow-hidden"
                    style={{
                      width: dims?.width || CARD_W,
                      height: dims?.height || CARD_H,
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      opacity: isTransitioning ? 0 : 1,
                      transition: 'opacity 100ms ease-in',
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={`Photo ${index + 1}`}
                      fill
                      sizes={`${dims?.width || CARD_W}px`}
                      className="object-contain"
                      style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 100ms ease-in' }}
                      onLoad={(e) => handleImageLoad(index, e)}
                      priority={true}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        {renderControls()}
        <div className="flex items-center justify-center gap-1 mt-3">{renderDots()}</div>
      </div>

      <div className="hidden">
        {images.map((img, index) => (
          <div
            key={`preload-${index}`}
            className="hidden"
            style={{ position: 'relative', width: '1px', height: '1px' }}
          >
            <Image
              src={img.src}
              alt=""
              fill
              onLoad={(e) => handleImageLoad(index, e)}
              priority={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoDeck;
