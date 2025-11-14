"use client";

import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#193555] text-white mt-auto">
            <div className="px-4 sm:px-8 lg:px-[10%] py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4 unbounded-font">
                                Ceylon<span className="text-gray-300">Travels</span>
                            </h3>
                            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                Discover the beauty of Sri Lanka with our curated tours and authentic experiences. Your journey to paradise starts here.
                            </p>
                            <div className="flex gap-4">
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                                    aria-label="Facebook"
                                >
                                    <i className="ri-facebook-fill text-lg"></i>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                                    aria-label="Twitter"
                                >
                                    <i className="ri-twitter-x-fill text-lg"></i>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                                    aria-label="Instagram"
                                >
                                    <i className="ri-instagram-fill text-lg"></i>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                                    aria-label="Flickr"
                                >
                                    <i className="ri-flickr-fill text-lg"></i>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4 unbounded-font">Quick Links</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/"
                                        className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
                                    >
                                        <i className="ri-arrow-right-s-line"></i>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/About"
                                        className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
                                    >
                                        <i className="ri-arrow-right-s-line"></i>
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/Tours"
                                        className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
                                    >
                                        <i className="ri-arrow-right-s-line"></i>
                                        Tours
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/Gallery"
                                        className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
                                    >
                                        <i className="ri-arrow-right-s-line"></i>
                                        Gallery
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4 unbounded-font">Contact Us</h4>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <i className="ri-phone-fill text-gray-300 mt-1"></i>
                                    <div>
                                        <p className="text-gray-300 text-sm">Phone</p>
                                        <a
                                            href="tel:0787962180"
                                            className="text-white hover:text-gray-300 transition-colors text-sm"
                                        >
                                            0787962180
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <i className="ri-mail-fill text-gray-300 mt-1"></i>
                                    <div>
                                        <p className="text-gray-300 text-sm">Email</p>
                                        <a
                                            href="mailto:Ceylonetravels@gmail.com"
                                            className="text-white hover:text-gray-300 transition-colors text-sm"
                                        >
                                            Ceylonetravels@gmail.com
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <i className="ri-map-pin-fill text-gray-300 mt-1"></i>
                                    <div>
                                        <p className="text-gray-300 text-sm">Location</p>
                                        <p className="text-white text-sm">
                                            Sri Lanka
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4 unbounded-font">Newsletter</h4>
                            <p className="text-gray-300 text-sm mb-4">
                                Subscribe to get special offers and travel updates.
                            </p>
                            <form className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-sm"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-white text-[#193555] py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 px-4 sm:px-8 lg:px-[10%] py-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-300 text-sm text-center md:text-left">
                            © {currentYear} Ceylon Travels. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link
                                href="/Contact"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

