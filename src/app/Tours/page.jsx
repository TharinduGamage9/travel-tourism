"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ToursPage() {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const filteredTours = tours || [];
    
    // Video carousel state
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videos = [
        { src: "/images/hero-video.mp4", alt: "Sri Lanka Tour Video 1" },
        { src: "/images/hero-video1.mp4", alt: "Sri Lanka Tour Video 2" },
        { src: "/images/hero-video2.mp4", alt: "Sri Lanka Tour Video 2" },
        
    ];

    // Fetch tours from API
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await fetch("/api/tours");
                const data = await res.json();
                if (data.success) {
                    setTours(data.data);
                } else {
                    console.error("Error fetching tours:", data.error);
                }
            } catch (error) {
                console.error("Error fetching tours:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchTours();
    }, []);

    // Auto-play next video
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
        }, 8000); // Change video every 8 seconds

        return () => clearInterval(interval);
    }, [videos.length]);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={i} className="ri-star-fill text-yellow-400"></i>);
        }
        if (hasHalfStar) {
            stars.push(<i key="half" className="ri-star-half-fill text-yellow-400"></i>);
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={`empty-${i}`} className="ri-star-line text-yellow-400"></i>);
        }
        return stars;
    };

    return (
        <main className="min-h-screen pt-[100px] pb-16">
            {/* Hero Video Section */}
            <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden mb-12">
                <div className="absolute inset-0">
                    {videos.map((video, index) => (
                        <video
                            key={index}
                            src={video.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                                index === currentVideoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                        />
                    ))}
                    <div className="absolute inset-0 bg-black/40 z-20"></div>
                </div>
                
                {/* Content Overlay */}
                <div className="relative z-30 flex items-center justify-center h-full px-4">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 unbounded-font">
                            Explore Our Tours
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200">
                            Discover amazing destinations in Sri Lanka
                        </p>
                    </div>
                </div>

                {/* Video Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
                    {videos.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentVideoIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentVideoIndex
                                    ? 'bg-white w-8'
                                    : 'bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Go to video ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={() => setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 text-white hover:text-gray-300 transition-colors bg-black/30 hover:bg-black/50 rounded-full p-3"
                    aria-label="Previous video"
                >
                    <i className="ri-arrow-left-line text-2xl"></i>
                </button>
                <button
                    onClick={() => setCurrentVideoIndex((prev) => (prev + 1) % videos.length)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 text-white hover:text-gray-300 transition-colors bg-black/30 hover:bg-black/50 rounded-full p-3"
                    aria-label="Next video"
                >
                    <i className="ri-arrow-right-line text-2xl"></i>
                </button>
            </section>


            {/* Tours Grid */}
            <section className="px-4 sm:px-8 lg:px-[10%]">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="text-center py-16">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#193555] mx-auto mb-4"></div>
                            <p className="text-[#697e8a]">Loading tours...</p>
                        </div>
                    ) : !tours || tours.length === 0 ? (
                        <div className="text-center py-16">
                            <i className="ri-error-warning-line text-6xl text-[#697e8a] mb-4"></i>
                            <h3 className="text-2xl font-semibold text-[#193555] mb-2">
                                No Tours Available
                            </h3>
                            <p className="text-[#697e8a]">
                                Tours data could not be loaded. Please refresh the page.
                            </p>
                        </div>
                    ) : filteredTours.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTours.map((tour) => (
                                <Link
                                    key={tour._id || tour.id}
                                    href={`/ToursDetails/${tour._id || tour.id}`}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                                >
                                    {/* Tour Image */}
                                    <div className="relative h-64 overflow-hidden bg-gray-200">
                                        {tour.photo && tour.photo.trim() ? (
                                            <Image
                                                src={tour.photo}
                                                alt={tour.title}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                <i className="ri-image-line text-5xl text-gray-400"></i>
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                            <span className="text-sm font-semibold text-[#193555]">
                                                ${tour.price}
                                            </span>
                                        </div>
                                        {tour.avgRating > 0 && (
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                                                <i className="ri-star-fill text-yellow-400 text-sm"></i>
                                                <span className="text-sm font-semibold text-[#193555]">
                                                    {tour.avgRating}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Tour Info */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <i className="ri-map-pin-fill text-[#193555]"></i>
                                            <span className="text-sm text-[#697e8a]">{tour.city}</span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-[#193555] mb-2 group-hover:text-[#1a3f66] transition-colors">
                                            {tour.title}
                                        </h3>
                                        <p className="text-[#697e8a] text-sm mb-4 line-clamp-2">
                                            {tour.shortDesc}
                                        </p>

                                        {/* Rating and Distance */}
                                        <div className="flex items-center justify-between">
                                            {tour.avgRating > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center">
                                                        {renderStars(tour.avgRating)}
                                                    </div>
                                                    <span className="text-sm text-[#697e8a]">
                                                        ({tour.reviews?.length || 0})
                                                    </span>
                                                </div>
                                            )}
                                            {tour.distance && (
                                                <div className="flex items-center gap-2 text-sm text-[#697e8a]">
                                                    <i className="ri-road-map-line"></i>
                                                    <span>
                                                        {typeof tour.distance === 'number' 
                                                            ? `${tour.distance} km` 
                                                            : tour.distance}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <i className="ri-search-line text-6xl text-[#697e8a] mb-4"></i>
                            <h3 className="text-2xl font-semibold text-[#193555] mb-2">
                                No tours found
                            </h3>
                            <p className="text-[#697e8a]">
                                Try adjusting your search or filter criteria
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

