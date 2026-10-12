'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import galleryImageUrls from '@/lib/gallery-manifest.json';

export default function GalleryPage() {
  // The manifest contains full URLs (e.g. "/assets/images/gallery/foo.jpg")
  const images = galleryImageUrls as string[];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && selectedImage) {
                closeImage();
            }
        };

        if (selectedImage) {
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [selectedImage]);


  const openImage = (image: string) => {
    setSelectedImage(image);
    setImageLoaded(false);
  };
  const closeImage = () => setSelectedImage(null);

  return (
    <main className="flex flex-col items-center min-h-[632px] max-h-[632px] px-8 relative">
      {/* Main gallery */}
      <div
        className="w-full max-w-[612px] max-h-[610px] overflow-y-auto
                [&::-webkit-scrollbar]:w-2.5
                [&::-webkit-scrollbar-track]:bg-[var(--color-airbus-gray)]
                [&::-webkit-scrollbar-thumb]:bg-[var(--color-airbus-light-gray)] [&::-webkit-scrollbar-thumb]:rounded-sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full">
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square cursor-pointer"
                onClick={() => openImage(image)}
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))
          ) : (
            <p className="text-white">Loading images...</p>
          )}
        </div>
      </div>

      {/* Selected image modal. Portaled to <body> so the site's scale
          transform does not trap, clip or shrink it. */}
      {selectedImage &&
        createPortal(
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/70"
            style={{ zIndex: 9998 }}
            onClick={closeImage}
          >
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              {/* Loading overlay */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg">LOADING...</span>
                </div>
              )}

              {/* Image itself */}
              <Image
                src={selectedImage}
                alt="Selected image"
                width={1200}
                height={800}
                className="max-h-[90vh] max-w-[90vw] object-contain shadow-xl transition-opacity"
                style={{ width: 'auto', height: 'auto' }}
                onLoadingComplete={() => setImageLoaded(true)}
              />

              {/* Close button, inside the image's top-right corner */}
              {imageLoaded && (
                <button
                  type="button"
                  className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center bg-black/70 hover:bg-black/90 text-white text-lg leading-none"
                  onClick={closeImage}
                  aria-label="Close image"
                >
                  ✕
                </button>
              )}
            </div>
          </div>,
          document.body,
        )}
    </main>
  );
}
