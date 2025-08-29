"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function GalleryPage() {
    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        async function loadImages() {
            try {
                const response = await fetch('/api/gallery-images');
                const data = await response.json();
                setImages(data.images);
            } catch (error) {
                console.error('Error loading gallery images:', error);
            }
        }

        loadImages();
    }, []);

    const openImage = (image: string) => setSelectedImage(image);
    const closeImage = () => setSelectedImage(null);

    return (
        <main className="flex flex-col items-center min-h-[632px] max-h-[632px] px-8 relative">
            {/* Main gallery */}
            <div className="w-full max-w-[612px] max-h-[610px] overflow-y-auto
                [&::-webkit-scrollbar]:w-2.5
                [&::-webkit-scrollbar-track]:bg-[var(--color-airbus-gray)]
                [&::-webkit-scrollbar-thumb]:bg-[var(--color-airbus-light-gray)] [&::-webkit-scrollbar-thumb]:rounded-sm">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full">
                    {images.length > 0 ? (
                        images.map((image, index) => (
                            <div
                                key={index}
                                className="relative aspect-square cursor-pointer"
                                onClick={() => openImage(image)}
                            >
                                <Image
                                    src={`/assets/images/gallery/${image}`}
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

            {/* Selected image modal with overlay only */}
            {selectedImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
                    onClick={closeImage}
                >
                    <div
                        className="relative z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 bg-black bg-opacity-70 text-white w-8 h-8 rounded-full flex items-center justify-center z-10 hover:bg-opacity-90"
                            onClick={closeImage}
                            aria-label="Close image"
                        >
                            ✕
                        </button>
                        <Image
                            src={`/assets/images/gallery/${selectedImage}`}
                            alt="Selected image"
                            width={1200}
                            height={800}
                            className="max-h-[80vh] w-auto object-contain shadow-xl"
                        />
                    </div>
                </div>
            )}
        </main>
    );
}
