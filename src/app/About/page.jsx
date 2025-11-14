"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-24 pb-16">
            {/* Hero Section */}
            <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden mb-12">
                <div className="absolute inset-0">
                    <Image
                        src="/images/galle.jpg"
                        alt="About Ceylon Travels"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>
                <div className="relative z-10 flex items-center justify-center h-full px-4">
                    <div className="text-center text-white max-w-4xl">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 unbounded-font">
                            Explore Sri Lanka with Ceylon Travels
                        </h1>
                        <p className="text-lg md:text-xl mb-6 text-gray-200">
                            Authentic Journeys, Hidden Treasures & Lasting Memories!
                        </p>
                        <Link
                            href="/Contact"
                            className="inline-block bg-[#193555] hover:bg-[#1a3f66] text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                        >
                            Contact Now !
                        </Link>
                    </div>
                </div>
            </section>

            {/* Main Tagline Section */}
            <section className="px-4 sm:px-8 lg:px-[10%] mb-16">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#193555] mb-4 unbounded-font">
                        Ceylon Travels, Your Journey
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-semibold text-[#697e8a] mb-8">
                        Freedom to Explore, Your Way !
                    </h3>
                </div>
            </section>

            {/* About Company Section */}
            <section className="px-4 sm:px-8 lg:px-[10%] mb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                        <div className="text-center mb-8">
                            <div className="text-4xl md:text-5xl font-bold text-[#193555] mb-4 unbounded-font">
                                Ceylon Travels
                            </div>
                            <div className="w-24 h-1 bg-[#193555] mx-auto mb-6"></div>
                        </div>
                        
                        <div className="max-w-3xl mx-auto space-y-6 text-center">
                            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                <h3 className="text-2xl font-semibold text-[#193555] mb-3 unbounded-font">
                                    Ceylon Travels
                                </h3>
                                <p className="text-lg text-[#697e8a]">
                                    Choose Ceylon Travels for reliable, 24/7 transportation
                                </p>
                            </div>

                            <div className="prose prose-lg max-w-none">
                                <p className="text-[#697e8a] leading-relaxed mb-4">
                                    Welcome to Ceylon Travels, your trusted partner for discovering the beautiful island of Sri Lanka. We specialize in creating authentic journeys that reveal hidden treasures and create lasting memories.
                                </p>
                                <p className="text-[#697e8a] leading-relaxed mb-4">
                                    With years of experience in the tourism industry, the Ceylon Travels team provides reliable, professional, and personalized services. We give you the freedom to explore Sri Lanka your way, ensuring every moment of your journey is unforgettable.
                                </p>
                                <p className="text-[#697e8a] leading-relaxed">
                                    Whether you're seeking cultural experiences, scenic adventures, or luxury tours, Ceylon Travels is here to make your travel dreams come true. We offer 24/7 transportation services and round-the-clock support to ensure your comfort and safety throughout your journey.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Information Section */}
            <section className="px-4 sm:px-8 lg:px-[10%] mb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact Details */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h3 className="text-2xl font-semibold text-[#193555] mb-6 unbounded-font">
                                Ceylon Travels
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <i className="ri-map-pin-fill text-[#193555] text-xl mt-1"></i>
                                    <div>
                                        <p className="text-[#697e8a] text-sm mb-1">Address</p>
                                        <p className="text-[#193555] font-medium">
                                            52, uduwelawaththa janapadaya,<br />
                                            uduwela, Kandy,<br />
                                            Sri Lanka
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <i className="ri-time-line text-[#193555] text-xl mt-1"></i>
                                    <div>
                                        <p className="text-[#697e8a] text-sm mb-1">Hours</p>
                                        <p className="text-[#193555] font-medium">
                                            8:00 - 17:00, Mon - Sat
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <i className="ri-mail-fill text-[#193555] text-xl mt-1"></i>
                                    <div>
                                        <p className="text-[#697e8a] text-sm mb-1">Email</p>
                                        <a
                                            href="mailto:Ceylonetravels@gmail.com"
                                            className="text-[#193555] font-medium hover:text-[#1a3f66] transition-colors"
                                        >
                                            Ceylonetravels@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Services & Quick Links */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h3 className="text-2xl font-semibold text-[#193555] mb-6 unbounded-font">
                                Services
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="/Tours"
                                        className="text-[#697e8a] hover:text-[#193555] transition-colors flex items-center gap-2"
                                    >
                                        <i className="ri-arrow-right-s-line"></i>
                                        Tour Packages
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/Tours"
                                        className="text-[#697e8a] hover:text-[#193555] transition-colors flex items-center gap-2"
                                    >
                                        <i className="ri-arrow-right-s-line"></i>
                                        Destinations
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/Contact"
                                        className="text-[#697e8a] hover:text-[#193555] transition-colors flex items-center gap-2"
                                    >
                                        <i className="ri-arrow-right-s-line"></i>
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/Gallery"
                                        className="text-[#697e8a] hover:text-[#193555] transition-colors flex items-center gap-2"
                                    >
                                        <i className="ri-arrow-right-s-line"></i>
                                        Gallery
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/About"
                                        className="text-[#697e8a] hover:text-[#193555] transition-colors flex items-center gap-2"
                                    >
                                        <i className="ri-arrow-right-s-line"></i>
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* WhatsApp & Contact Section */}
            <section className="px-4 sm:px-8 lg:px-[10%] mb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* WhatsApp Contact */}
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-8 text-white">
                            <h3 className="text-2xl font-semibold mb-4 unbounded-font">
                                Ask in Whatsapp
                            </h3>
                            <p className="mb-6 text-green-100">
                                Message here<br />
                                Feel Free to ask anything without hesitation
                            </p>
                            <a
                                href="https://wa.me/94768813371"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                            >
                                <i className="ri-whatsapp-fill text-2xl"></i>
                                Message on WhatsApp
                            </a>
                        </div>

                        {/* Follow Us & Phone */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h3 className="text-2xl font-semibold text-[#193555] mb-6 unbounded-font">
                                Follow us
                            </h3>
                            <div className="flex gap-4 mb-6">
                                <a
                                    href="#"
                                    className="w-12 h-12 bg-[#193555] hover:bg-[#1a3f66] rounded-full flex items-center justify-center transition-colors text-white"
                                    aria-label="Facebook"
                                >
                                    <i className="ri-facebook-fill text-xl"></i>
                                </a>
                                <a
                                    href="#"
                                    className="w-12 h-12 bg-[#193555] hover:bg-[#1a3f66] rounded-full flex items-center justify-center transition-colors text-white"
                                    aria-label="Twitter"
                                >
                                    <i className="ri-twitter-x-fill text-xl"></i>
                                </a>
                                <a
                                    href="#"
                                    className="w-12 h-12 bg-[#193555] hover:bg-[#1a3f66] rounded-full flex items-center justify-center transition-colors text-white"
                                    aria-label="Instagram"
                                >
                                    <i className="ri-instagram-fill text-xl"></i>
                                </a>
                                <a
                                    href="#"
                                    className="w-12 h-12 bg-[#193555] hover:bg-[#1a3f66] rounded-full flex items-center justify-center transition-colors text-white"
                                    aria-label="Flickr"
                                >
                                    <i className="ri-flickr-fill text-xl"></i>
                                </a>
                            </div>
                            <div className="border-t border-gray-200 pt-6">
                                <p className="text-[#697e8a] text-sm mb-2">Need help? Call us</p>
                                <a
                                    href="tel:+94768813371"
                                    className="text-2xl font-bold text-[#193555] hover:text-[#1a3f66] transition-colors"
                                >
                                    +94 76 881 3371
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

