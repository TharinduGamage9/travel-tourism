"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// FontAwesome correct imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhone,
    faEnvelope,
    faUser,
    faBars,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";

import {
    faFacebook,
    faFlickr,
    faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScrolled = () => {
            setScrolled(window.scrollY > 80);
        };

        window.addEventListener("scroll", handleScrolled);
        return () => window.removeEventListener("scroll", handleScrolled);
    }, []);

    return (
        <nav
            className={`navbar fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out 
        ${isScrolled ? "shadow-lg" : ""}
      `}
        >
            {/* TOP BAR */}
            <div
                className={`w-full bg-[#193555] border-b border-white/10
          px-[2%] sm:px-[8%] lg:px-[10%]
          flex justify-center items-center
          transition-all duration-500 ease-in-out
          ${isScrolled ? "max-h-0 opacity-0 py-0 overflow-hidden" : "max-h-[50px] opacity-100 py-2"}
        `}
            >
                {/* PROMOTIONAL TEXT */}
                <div className="text-white text-xs sm:text-sm text-center">
                    <span>Discover Sri Lanka's Beauty with SriLankaParadiseTours – Unique Trips Made Just for You! | </span>
                    <Link href="/Contact" className="underline hover:text-gray-300 transition-colors">
                        Contact Us Today
                    </Link>
                </div>
            </div>

            {/* MAIN NAV MENU */}
            <div
                className={`w-full px-[2%] sm:px-[8%] lg:px-[10%]
          flex justify-between lg:justify-center items-center
          transition-all duration-500 ease-in-out 
          bg-white
          ${isScrolled ? "py-3 shadow-md" : "py-5"}
        `}
            >
                {/* MOBILE LOGO */}
                <div className="lg:hidden flex text-2xl uppercase font-semibold text-[#193555]">
                    <Link href="/">Ceylon <span className="text-[#697e8a]">Travels</span></Link>
                </div>

                {/* DESKTOP MENU */}
                <ul className="nav-menu hidden lg:flex w-full justify-center items-center gap-14 py-5 relative">
                    <li>
                        <Link href="/" className="font-[500] text-[#697e8a] hover:text-[#193555] transition">Home</Link>
                    </li>

                    <li>
                        <Link href="/About" className="font-[500] text-[#697e8a] hover:text-[#193555] transition">
                            About
                        </Link>
                    </li>

                    <li>
                        <Link href="/Tours" className="font-[500] text-[#697e8a] hover:text-[#193555] transition">
                            Tours
                        </Link>
                    </li>

                    {/* CENTER LOGO */}
                    <div className="logo text-3xl uppercase font-semibold text-[#193555]">
                        <Link href="/">Ceylon <span className="text-[#697e8a]">Travels</span></Link>
                    </div>

                    <li>
                        <Link href="/Gallery" className="font-[500] text-[#697e8a] hover:text-[#193555] transition">
                            Gallery
                        </Link>
                    </li>

                    <li>
                        <Link href="/Contact" className="font-[500] text-[#697e8a] hover:text-[#193555] transition">
                            Contact
                        </Link>
                    </li>
                </ul>

                {/* MOBILE toggle */}

                <div className="flex justify-center items-center">
                    <div className="toggle-btn lg:hidden cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <FontAwesomeIcon
                            icon={isOpen ? faTimes : faBars}
                            className="text-[#193555] text-xl" />

                    </div>
                    {/* {Mobile Menu Dropdown} */}
                    <ul
                        className={`lg:hidden flex flex-col items-center gap-6 bg-white shadow-lg absolute left-0 w-full border-t border-gray-200
  overflow-hidden transition-all duration-500 ease-in-out
  ${isOpen ? "max-h-[500px] top-0 opacity-100 py-6" : "max-h-0 top-full opacity-0 py-0"}`}
                    >
                        <li><Link href="/" className="font-[500] text-[#697e8a] hover:text-[#193555]">Home</Link></li>
                        <li><Link href="/About" className="font-[500] text-[#697e8a] hover:text-[#193555]">About</Link></li>
                        <li><Link href="/Tours" className="font-[500] text-[#697e8a] hover:text-[#193555]">Tours</Link></li>
                        <li><Link href="/Gallery" className="font-[500] text-[#697e8a] hover:text-[#193555]">Gallery</Link></li>
                        <li><Link href="/Contact" className="font-[500] text-[#697e8a] hover:text-[#193555]">Contact</Link></li>

                    </ul>

                </div>
            </div>
        </nav>
    );
}
