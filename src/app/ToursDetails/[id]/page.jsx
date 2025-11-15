"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useState, useEffect } from "react";

export default function TourDetails({ params }) {
    const resolvedParams = use(params);
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTour = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/tours/${resolvedParams.id}`);
                const data = await res.json();
                
                if (data.success) {
                    setTour(data.data);
                } else {
                    setError(data.error || 'Tour not found');
                }
            } catch (err) {
                console.error('Error fetching tour:', err);
                setError('Failed to load tour');
            } finally {
                setLoading(false);
            }
        };

        if (resolvedParams.id) {
            fetchTour();
        }
    }, [resolvedParams.id]);

    if (loading) {
        return (
            <main className="min-h-screen pt-[100px] pb-16 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#193555] mx-auto mb-4"></div>
                    <p className="text-[#697e8a]">Loading tour...</p>
                </div>
            </main>
        );
    }

    if (error || !tour) {
        return (
            <main className="min-h-screen pt-[100px] pb-16 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-[#193555] mb-4">Tour Not Found</h1>
                    <p className="text-[#697e8a] mb-6">
                        {error || "The tour you're looking for doesn't exist."}
                    </p>
                    <Link
                        href="/Tours"
                        className="inline-block bg-[#193555] hover:bg-[#1a3f66] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                    >
                        Back to Tours
                    </Link>
                </div>
            </main>
        );
    }

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
            {/* Hero Image Section */}
            <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden mb-12">
                {tour.photo && tour.photo.trim() ? (
                    <Image
                        src={tour.photo}
                        alt={tour.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <i className="ri-image-line text-6xl text-gray-400"></i>
                    </div>
                )}
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 flex items-end h-full px-4 sm:px-8 lg:px-[10%] pb-8">
                    <div className="text-white">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 unbounded-font">
                            {tour.title}
                        </h1>
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2">
                                <i className="ri-map-pin-fill"></i>
                                <span>{tour.city}</span>
                            </div>
                            {tour.distance && (
                                <div className="flex items-center gap-2">
                                    <i className="ri-road-map-line"></i>
                                    <span>{typeof tour.distance === 'number' ? `${tour.distance} km` : tour.distance}</span>
                                </div>
                            )}
                            {tour.avgRating > 0 && (
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center">
                                        {renderStars(tour.avgRating)}
                                    </div>
                                    <span>({tour.avgRating})</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content - Brief Layout */}
            <section className="px-4 sm:px-8 lg:px-[10%]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2">
                            {/* Combined Overview and Description */}
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <h2 className="text-xl font-semibold text-[#193555] mb-3 unbounded-font">
                                    About This Tour
                                </h2>
                                <p className="text-[#697e8a] text-base leading-relaxed mb-4">
                                    {tour.shortDesc}
                                </p>
                                <p className="text-[#697e8a] leading-relaxed">
                                    {tour.desc}
                                </p>
                            </div>

                            {/* Brief Reviews Section */}
                            {tour.reviews && Array.isArray(tour.reviews) && tour.reviews.length > 0 && (
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-xl font-semibold text-[#193555] mb-4 unbounded-font">
                                        Reviews ({tour.reviews.length})
                                    </h2>
                                    <div className="space-y-4">
                                        {tour.reviews.map((review, index) => (
                                            <div key={index} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold text-[#193555] text-sm">
                                                        {review?.name || 'Anonymous'}
                                                    </h3>
                                                    <div className="flex items-center gap-1">
                                                        {renderStars(review?.rating || 0)}
                                                        <span className="text-xs text-[#697e8a] ml-1">
                                                            {review?.rating || 0}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Brief Booking Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-lg p-5 sticky top-24">
                                {/* Price */}
                                <div className="text-center mb-5 pb-5 border-b border-gray-200">
                                    <div className="text-3xl font-bold text-[#193555] mb-1">
                                        ${tour.price}
                                    </div>
                                    <p className="text-sm text-[#697e8a]">per person</p>
                                </div>

                                {/* Brief Tour Info */}
                                <div className="space-y-3 mb-5">
                                    {tour.avgRating > 0 && (
                                        <div className="flex items-center justify-between py-2">
                                            <span className="text-sm text-[#697e8a]">Rating</span>
                                            <div className="flex items-center gap-1">
                                                {renderStars(tour.avgRating)}
                                                <span className="text-sm font-semibold text-[#193555]">
                                                    {tour.avgRating}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="flex items-center justify-between py-2 border-t border-gray-100">
                                        <span className="text-sm text-[#697e8a]">Location</span>
                                        <span className="text-sm font-semibold text-[#193555]">{tour.city}</span>
                                    </div>

                                    {tour.distance && (
                                        <div className="flex items-center justify-between py-2 border-t border-gray-100">
                                            <span className="text-sm text-[#697e8a]">Distance</span>
                                            <span className="text-sm font-semibold text-[#193555]">
                                                {typeof tour.distance === 'number' ? `${tour.distance} km` : tour.distance}
                                            </span>
                                        </div>
                                    )}

                                    {tour.maxGroupSize && (
                                        <div className="flex items-center justify-between py-2 border-t border-gray-100">
                                            <span className="text-sm text-[#697e8a]">Group Size</span>
                                            <span className="text-sm font-semibold text-[#193555]">
                                                {tour.maxGroupSize} people
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Book Button */}
                                <button className="w-full bg-[#193555] hover:bg-[#1a3f66] text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 mb-4">
                                    Book Now
                                </button>

                                <Link
                                    href="/Tours"
                                    className="block text-center text-[#193555] hover:text-[#1a3f66] font-medium transition-colors"
                                >
                                    <i className="ri-arrow-left-line mr-2"></i>
                                    Back to Tours
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

