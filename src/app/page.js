"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
    const [featuredTours, setFeaturedTours] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch featured tours from MongoDB
    useEffect(() => {
        const fetchFeaturedTours = async () => {
            try {
                const res = await fetch("/api/tours");
                const data = await res.json();
                if (data.success) {
                    // Filter for featured tours and limit to 6
                    const featured = data.data
                        .filter((tour) => tour.featured === true)
                        .slice(0, 6);
                    setFeaturedTours(featured);
                } else {
                    console.error("Error fetching tours:", data.error);
                }
            } catch (error) {
                console.error("Error fetching tours:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedTours();
    }, []);



  return (
        <main className="min-h-screen pt-[50px] md:pt-[100px]">
            {/* Hero Section */}
            <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/galle.jpg"
                        alt="Galle - Beautiful Sri Lanka"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="relative z-10 flex items-center justify-center h-full px-4">
                    <div className="text-center text-white max-w-4xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 unbounded-font">
                            Discover Amazing Destinations
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-gray-200">
                            Explore the world with us and create memories that last a lifetime
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/Tours"
                                className="bg-[#193555] hover:bg-[#1a3f66] text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                            >
                                Explore Tours
                            </Link>
                            <Link
                                href="/Contact"
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Tours Section */}
            {!loading && featuredTours.length > 0 && (
                <section className="py-16 px-4 sm:px-8 lg:px-[10%] bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#193555] mb-4 unbounded-font">
                                Featured Tours
                            </h2>
                            <p className="text-lg text-[#697e8a]">
                                Discover our most popular and recommended tours
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredTours.map((tour) => (
                                <Link
                                    key={tour._id || tour.id}
                                    href={`/ToursDetails/${tour._id || tour.id}`}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                                >
                                    <div className="relative h-64 overflow-hidden">
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
                                        <div className="absolute top-4 right-4 bg-yellow-400 text-[#193555] px-3 py-1 rounded-full text-sm font-bold">
                                            Featured
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
                                        <div className="flex items-center justify-between">
                                            <div className="text-2xl font-bold text-[#193555]">
                                                ${tour.price}
                                            </div>
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
                    </div>
                </section>
            )}

            {/* Why Travel With Us Section */}
            <section className="py-16 px-4 sm:px-8 lg:px-[10%] bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#193555] mb-4 unbounded-font">
                            Why Travel With Us?
                        </h2>
                        <p className="text-lg text-[#697e8a]">
                            Travel designed by locals who know every hidden gem
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Local Experts */}
                        <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                            <div className="bg-[#193555] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="ri-map-pin-2-fill text-white text-3xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-[#193555] mb-3">
                                Local Expertise
                            </h3>
                            <p className="text-[#697e8a]">
                                Handcrafted itineraries by Sri Lankan specialists who live the culture every day.
                            </p>
                        </div>

                        {/* Flexible Planning */}
                        <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                            <div className="bg-[#193555] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="ri-calendar-check-fill text-white text-3xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-[#193555] mb-3">
                                Flexible Planning
                            </h3>
                            <p className="text-[#697e8a]">
                                Adjust dates, pace, and activities with ease—your trip stays as unique as you are.
                            </p>
                        </div>

                        {/* Transparent Pricing */}
                        <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                            <div className="bg-[#193555] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="ri-price-tag-3-fill text-white text-3xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-[#193555] mb-3">
                                Transparent Pricing
                            </h3>
                            <p className="text-[#697e8a]">
                                Clear quotes with no hidden fees, plus live updates on availability and inclusions.
                            </p>
                        </div>

                        {/* Guest-First Support */}
                        <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                            <div className="bg-[#193555] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="ri-chat-smile-3-fill text-white text-3xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-[#193555] mb-3">
                                Guest-First Support
                            </h3>
                            <p className="text-[#697e8a]">
                                Dedicated coordinators are available 24/7 for real-time help while you travel.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </main>
  );
}
