"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setScrolled] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScrolled = () => {
            setScrolled(window.scrollY > 80);
        };

        window.addEventListener("scroll", handleScrolled);
        return () => window.removeEventListener("scroll", handleScrolled);
    }, []);

    useEffect(() => {
        // Check if user is logged in
        const checkUserAuth = () => {
            const userAuth = localStorage.getItem("userAuth");
            const userDataStr = localStorage.getItem("userData");
            
            setIsUserLoggedIn(userAuth === "true");
            if (userDataStr) {
                try {
                    setUserData(JSON.parse(userDataStr));
                } catch (e) {
                    console.error("Error parsing user data:", e);
                }
            }
        };
        
        checkUserAuth();
        window.addEventListener('storage', checkUserAuth);
        const interval = setInterval(checkUserAuth, 1000);
        
        return () => {
            window.removeEventListener('storage', checkUserAuth);
            clearInterval(interval);
        };
    }, []);

    // Close mobile menu when a link is clicked
    const handleLinkClick = () => {
        setIsOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("userAuth");
        localStorage.removeItem("userData");
        setIsUserLoggedIn(false);
        setUserData(null);
        setShowUserMenu(false);
        router.push("/");
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showUserMenu) {
                const userMenuElement = event.target.closest('[data-user-menu]');
                const userMenuButton = event.target.closest('[data-user-menu-button]');
                if (!userMenuElement && !userMenuButton) {
                    setShowUserMenu(false);
                }
            }
        };

        if (showUserMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserMenu]);

    return (
        <>
            {/* TOP BAR */}
            <div className={`hidden md:flex fixed top-0 left-0 w-full h-9 items-center bg-[#193555] text-white px-4 z-[60] text-center text-sm md:transition-transform md:duration-300 ${isScrolled ? "md:-translate-y-full" : "md:translate-y-0"}`}>
                <p className="flex items-center justify-center gap-2 w-full">
                    <span>Discover Sri Lanka's Beauty with Ceylon Travels – Unique Trips Made Just for You!</span>
                    <span className="hidden sm:inline">|</span>
                    <Link href="/Contact" className="hover:underline font-semibold">Contact Us Today</Link>
                </p>
            </div>

            <nav
                className={`navbar fixed left-0 w-full z-50 transition-all duration-500 ease-in-out top-0 ${isScrolled ? "md:top-0" : "md:top-9"}
            ${isScrolled ? "shadow-lg" : ""}
          `}
            >
            {/* MAIN NAV MENU */}
            <div
                className={`w-full px-[2%] sm:px-[8%] lg:px-[10%]
          flex justify-between lg:justify-center items-center
          transition-all duration-500 ease-in-out 
          bg-white relative
          ${isScrolled ? "py-1 md:py-2 shadow-md" : "py-2 md:py-3"}
        `}
            >
                {/* MOBILE LOGO */}
                <div className="lg:hidden flex text-xl uppercase font-semibold text-[#193555]">
                    <Link href="/" onClick={handleLinkClick}>Ceylon <span className="text-[#697e8a]">Travels</span></Link>
                </div>

                {/* DESKTOP MENU */}
                <ul className="nav-menu hidden lg:flex w-full justify-center items-center gap-10 py-2 relative">
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
                    <div className="logo text-2xl uppercase font-semibold text-[#193555]">
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

                {/* USER ACCOUNT SECTION - DESKTOP */}
                <div className="hidden lg:flex items-center gap-2">
                    {isUserLoggedIn ? (
                        <div className="relative" data-user-menu>
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                                data-user-menu-button
                            >
                                <div className="w-7 h-7 rounded-full bg-[#193555] flex items-center justify-center text-white text-xs font-semibold">
                                    {userData?.name 
                                        ? userData.name.split(' ').slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('').slice(0, 2)
                                        : "U"}
                                </div>
                                <i className={`ri-arrow-${showUserMenu ? 'up' : 'down'}-s-line text-[#193555] text-sm`}></i>
                            </button>

                            {/* User Dropdown Menu */}
                            {showUserMenu && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50" data-user-menu>
                                    <div className="px-4 py-2 border-b border-gray-200">
                                        <p className="text-sm font-semibold text-[#193555]">{userData?.name || "User"}</p>
                                        <p className="text-xs text-gray-500 truncate">{userData?.email || ""}</p>
                                    </div>
                                    <Link
                                        href="/profile"
                                        onClick={() => setShowUserMenu(false)}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        <i className="ri-user-line mr-2"></i>My Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <i className="ri-logout-box-line mr-2"></i>Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="relative" data-user-menu>
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-[#193555] transition-all duration-300 group"
                                title="Account"
                                data-user-menu-button
                            >
                                <i className={`ri-user-${showUserMenu ? 'fill' : 'line'} text-lg text-[#193555] group-hover:text-white transition-colors`}></i>
                            </button>

                            {/* Account Dropdown Menu - Not Logged In */}
                            {showUserMenu && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50" data-user-menu>
                                    <Link
                                        href="/login"
                                        onClick={() => setShowUserMenu(false)}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        <i className="ri-login-box-line mr-2"></i>Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setShowUserMenu(false)}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        <i className="ri-user-add-line mr-2"></i>Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* MOBILE toggle */}

                <div className="flex justify-center items-center gap-3">
                    {/* USER ACCOUNT - MOBILE */}
                    {isUserLoggedIn ? (
                        <div className="lg:hidden relative" data-user-menu>
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="w-7 h-7 rounded-full bg-[#193555] flex items-center justify-center text-white text-xs font-semibold"
                                data-user-menu-button
                            >
                                {userData?.name 
                                    ? userData.name.split(' ').slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('').slice(0, 2)
                                    : "U"}
                            </button>
                            {showUserMenu && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50" data-user-menu>
                                    <div className="px-4 py-2 border-b border-gray-200">
                                        <p className="text-sm font-semibold text-[#193555]">{userData?.name || "User"}</p>
                                        <p className="text-xs text-gray-500 truncate">{userData?.email || ""}</p>
                                    </div>
                                    <Link
                                        href="/profile"
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            handleLinkClick();
                                        }}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        <i className="ri-user-line mr-2"></i>My Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            handleLinkClick();
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <i className="ri-logout-box-line mr-2"></i>Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="lg:hidden relative" data-user-menu>
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#193555] transition-all duration-300 flex items-center justify-center"
                                title="Account"
                                data-user-menu-button
                            >
                                <i className={`ri-user-${showUserMenu ? 'fill' : 'line'} text-base text-[#193555] hover:text-white transition-colors`}></i>
                            </button>
                            {showUserMenu && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                    <Link
                                        href="/login"
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            handleLinkClick();
                                        }}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        <i className="ri-login-box-line mr-2"></i>Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            handleLinkClick();
                                        }}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        <i className="ri-user-add-line mr-2"></i>Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="toggle-btn lg:hidden cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <i className={`ri-${isOpen ? 'close' : 'menu'}-line text-[#193555] text-lg`}></i>
                    </div>
                    {/* {Mobile Menu Dropdown} */}
                    <ul
                        className={`lg:hidden flex flex-col items-center gap-6 bg-white shadow-lg absolute left-0 w-full border-t border-gray-200 z-[55]
  overflow-hidden transition-all duration-500 ease-in-out
  ${isOpen ? "max-h-[500px] top-full opacity-100 py-6" : "max-h-0 top-full opacity-0 py-0"}`}
                    >
                        <li><Link href="/" onClick={handleLinkClick} className="font-[500] text-[#697e8a] hover:text-[#193555]">Home</Link></li>
                        <li><Link href="/About" onClick={handleLinkClick} className="font-[500] text-[#697e8a] hover:text-[#193555]">About</Link></li>
                        <li><Link href="/Tours" onClick={handleLinkClick} className="font-[500] text-[#697e8a] hover:text-[#193555]">Tours</Link></li>
                        <li><Link href="/Gallery" onClick={handleLinkClick} className="font-[500] text-[#697e8a] hover:text-[#193555]">Gallery</Link></li>
                        <li><Link href="/Contact" onClick={handleLinkClick} className="font-[500] text-[#697e8a] hover:text-[#193555]">Contact</Link></li>
                        {!isUserLoggedIn && (
                            <>
                                <li><Link href="/login" onClick={handleLinkClick} className="font-[500] text-[#697e8a] hover:text-[#193555]">Login</Link></li>
                                <li><Link href="/register" onClick={handleLinkClick} className="font-[500] text-[#697e8a] hover:text-[#193555]">Sign Up</Link></li>
                            </>
                        )}
                    </ul>

                </div>
            </div>
        </nav>
        </>
    );
}
