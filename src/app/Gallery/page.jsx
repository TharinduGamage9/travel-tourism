"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null);

    // Gallery images - using all available gallery images
    const galleryImages = [
        { id: 1, src: "/images/gallery-01.jpg", alt: "Gallery Image 1" },
        { id: 2, src: "/images/gallery-02.jpg", alt: "Gallery Image 2" },
        { id: 3, src: "/images/gallery-03.jpg", alt: "Gallery Image 3" },
        { id: 4, src: "/images/gallery-04.jpg", alt: "Gallery Image 4" },
        { id: 5, src: "/images/gallery-05.jpg", alt: "Gallery Image 5" },
        { id: 6, src: "/images/gallery-06.jpg", alt: "Gallery Image 6" },
        { id: 7, src: "/images/gallery-07.jpg", alt: "Gallery Image 7" },
        { id: 8, src: "/images/gallery-08.jpg", alt: "Gallery Image 8" },
        { id: 9, src: "/images/gallery-09.jpg", alt: "Gallery Image 9" },
        { id: 10, src: "/images/gallery-10.jpg", alt: "Gallery Image 10" },
        { id: 11, src: "/images/gallery-11.jpg", alt: "Gallery Image 11" },
        { id: 12, src: "/images/gallery-12.jpg", alt: "Gallery Image 12" },
        { id: 13, src: "/images/gallery-13.jpg", alt: "Gallery Image 13" },
        { id: 14, src: "/images/gallery-14.jpeg", alt: "Gallery Image 14" },
        { id: 15, src: "/images/beach.jpg", alt: "Beautiful Beach in Sri Lanka" },
    ];

    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const navigateImage = (direction) => {
        if (!selectedImage) return;
        const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
        let newIndex;
        
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % galleryImages.length;
        } else {
            newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        }
        
        setSelectedImage(galleryImages[newIndex]);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;
            
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowRight') {
                navigateImage('next');
            } else if (e.key === 'ArrowLeft') {
                navigateImage('prev');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage]);

    return (
        <main className="min-h-screen pt-24 pb-16">
            {/* Hero Section */}
            <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden mb-16">
                <div className="absolute inset-0">
                    <Image
                        src="/images/galle.jpg"
                        alt="Gallery"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>
                <div className="relative z-10 flex items-center justify-center h-full px-4">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 unbounded-font">
                            Our Gallery
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200">
                            Explore the beauty of Sri Lanka through our photo collection
                        </p>
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="px-4 sm:px-8 lg:px-[10%]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {galleryImages.map((image, index) => (
                            <div
                                key={image.id}
                                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                                onClick={() => openModal(image)}
                            >
                                <div className="relative aspect-square">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                        <i className="ri-zoom-in-line text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                >
                    <div className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center">
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
                            aria-label="Close"
                        >
                            <i className="ri-close-line text-3xl"></i>
                        </button>

                        {/* Previous Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateImage('prev');
                            }}
                            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
                            aria-label="Previous"
                        >
                            <i className="ri-arrow-left-line text-3xl"></i>
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateImage('next');
                            }}
                            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
                            aria-label="Next"
                        >
                            <i className="ri-arrow-right-line text-3xl"></i>
                        </button>

                        {/* Image */}
                        <div
                            className="relative w-full max-h-[90vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-[80vh] max-w-5xl">
                                <Image
                                    src={selectedImage.src}
                                    alt={selectedImage.alt}
                                    fill
                                    className="object-contain rounded-lg"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                                />
                            </div>
                        </div>

                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
                            <span className="text-sm">
                                {galleryImages.findIndex(img => img.id === selectedImage.id) + 1} / {galleryImages.length}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

