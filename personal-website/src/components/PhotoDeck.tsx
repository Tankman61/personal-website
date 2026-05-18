'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { Button } from './Button';

/**
 * Single-photo viewer. Switching is instant (no animation, no transition lock).
 *
 * Loading strategy ("paint one, then warm the rest"):
 *  - Only the current image is mounted at first, with `priority` and a blur
 *    placeholder, so first paint is immediate and nothing competes for
 *    bandwidth.
 *  - Once that image has loaded, every other image is mounted hidden and
 *    eagerly fetched in the background using the SAME sizes/quality, so the
 *    optimized bytes are byte-identical to what navigation will request.
 *  - Mounted images stay mounted, so every later switch is a pure visibility
 *    toggle: zero network, zero decode, genuinely instant.
 *
 * There is intentionally no up-front blocking preloader (that is what made
 * production slow) and `next/image` does all WebP/AVIF optimization.
 */

type ImageInput = StaticImageData | { src: string; width?: number; height?: number };

interface PhotoDeckProps {
  images: ImageInput[];
  /** Kept for call-site compatibility; the viewer is always single-photo now. */
  singlePhotoView?: boolean;
  cardWidth?: number;
  cardHeight?: number;
}

function hasBlur(img: ImageInput): img is StaticImageData {
  return typeof (img as StaticImageData).blurDataURL === 'string';
}

const PhotoDeck: React.FC<PhotoDeckProps> = ({
  images,
  cardWidth = 285,
  cardHeight = 190,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstLoaded, setFirstLoaded] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [enlargedImageLoaded, setEnlargedImageLoaded] = useState(false);

  const CARD_W = cardWidth;
  const CARD_H = cardHeight;
  const count = images.length;

  // Reset when the image set changes (e.g. switching projects).
  useEffect(() => {
    setCurrentIndex(0);
    setFirstLoaded(false);
    setEnlargedImage(null);
  }, [images]);

  const changePhoto = useCallback(
    (delta: number) => {
      if (count <= 1) return;
      setCurrentIndex((i) => (i + delta + count) % count);
    },
    [count],
  );

  const nextPhoto = useCallback(() => changePhoto(1), [changePhoto]);
  const prevPhoto = useCallback(() => changePhoto(-1), [changePhoto]);

  const closeModal = useCallback(() => setEnlargedImage(null), []);

  // Escape closes the enlarge modal.
  useEffect(() => {
    if (!enlargedImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [enlargedImage, closeModal]);

  const onAnyLoad = useCallback(() => {
    setFirstLoaded((done) => done || true);
  }, []);

  if (count === 0) return null;

  const current = images[currentIndex];
  const currentSrc = current.src;
  const sizes = `${CARD_W}px`;

  return (
    <>
      <div className="w-full overflow-hidden">
        <div className="flex flex-col items-center">
          <div
            className="relative flex items-center justify-center"
            style={{ width: CARD_W, height: CARD_H + 50, margin: '0 auto' }}
          >
            <div
              className="absolute bg-black border-2 border-white shadow-lg overflow-hidden"
              style={{
                width: CARD_W,
                height: CARD_H,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => setEnlargedImage(currentSrc)}
            >
              {images.map((img, index) => {
                const isCurrent = index === currentIndex;
                // Mount the current image immediately; mount the rest only
                // after the first one has loaded (background warm-up).
                if (!isCurrent && !firstLoaded) return null;

                const blur = hasBlur(img);
                return (
                  <Image
                    key={img.src}
                    src={blur ? img : img.src}
                    alt={`Photo ${index + 1} of ${count}`}
                    fill
                    sizes={sizes}
                    quality={72}
                    priority={isCurrent && !firstLoaded}
                    loading={isCurrent && !firstLoaded ? undefined : 'eager'}
                    placeholder={blur ? 'blur' : 'empty'}
                    onLoad={onAnyLoad}
                    className="object-cover cursor-pointer"
                    style={{ visibility: isCurrent ? 'visible' : 'hidden' }}
                  />
                );
              })}
            </div>
          </div>

          {count > 1 && (
            <>
              <div className="flex items-center justify-center gap-4 -mt-3">
                <Button width={32} height={32} fontSize={14} onClick={prevPhoto}>
                  ←
                </Button>
                <Button width={32} height={32} fontSize={14} onClick={nextPhoto}>
                  →
                </Button>
              </div>

              <div className="flex items-center justify-center gap-1 mt-3">
                {images.map((img, index) => (
                  <button
                    key={img.src}
                    type="button"
                    aria-label={`Show image ${index + 1}`}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentIndex
                        ? 'bg-cyan-300'
                        : 'bg-gray-500 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
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
              {!enlargedImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg">LOADING...</span>
                </div>
              )}

              <Image
                src={enlargedImage}
                alt="Selected image"
                width={1200}
                height={800}
                sizes="90vw"
                quality={80}
                className="object-contain shadow-xl max-h-[100vh] max-w-[150vw]"
                onLoad={() => setEnlargedImageLoaded(true)}
              />

              {enlargedImageLoaded && (
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-black bg-opacity-70 text-white w-10 h-10 rounded-full flex items-center justify-center z-30 hover:bg-opacity-90 text-lg"
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
