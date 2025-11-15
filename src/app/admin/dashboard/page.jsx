"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toursCount, setToursCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth !== "true") {
      router.push("/admin");
      return;
    }
    setIsAuthenticated(true);

    // Fetch counts
    fetchCounts();
  }, [router]);

  const fetchCounts = async () => {
    try {
      const [toursRes, galleryRes] = await Promise.all([
        fetch("/api/tours"),
        fetch("/api/gallery"),
      ]);

      const toursData = await toursRes.json();
      const galleryData = await galleryRes.json();

      if (toursData.success) setToursCount(toursData.data.length);
      if (galleryData.success) setGalleryCount(galleryData.data.length);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#193555] unbounded-font mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage your tours and gallery</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <i className="ri-logout-box-line mr-2"></i>
            Logout
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-[#193555] mb-4">Quick Navigation</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/tours"
              className="px-6 py-3 bg-[#193555] text-white rounded-lg hover:bg-[#1a3f66] transition-colors flex items-center gap-2"
            >
              <i className="ri-map-pin-line"></i>
              Manage Tours (Add, Edit, Delete)
            </Link>
            <Link
              href="/admin/gallery"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <i className="ri-image-line"></i>
              Manage Gallery
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/admin/tours"
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Tours</p>
                <p className="text-3xl font-bold text-[#193555]">{toursCount}</p>
                <p className="text-xs text-gray-500 mt-2">Click to add, edit, or delete tours</p>
              </div>
              <div className="bg-[#193555] bg-opacity-10 rounded-full p-4">
                <i className="ri-map-pin-line text-3xl text-[#193555]"></i>
              </div>
            </div>
            <div className="mt-4 text-[#193555] font-semibold">
              Manage Tours <i className="ri-arrow-right-line"></i>
            </div>
          </Link>

          <Link
            href="/admin/gallery"
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Gallery Images</p>
                <p className="text-3xl font-bold text-[#193555]">{galleryCount}</p>
              </div>
              <div className="bg-[#193555] bg-opacity-10 rounded-full p-4">
                <i className="ri-image-line text-3xl text-[#193555]"></i>
              </div>
            </div>
            <div className="mt-4 text-[#193555] font-semibold">
              Manage Gallery <i className="ri-arrow-right-line"></i>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/tours?action=add"
            className="bg-gradient-to-r from-[#193555] to-[#1a3f66] text-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <i className="ri-add-circle-line text-4xl mb-4"></i>
            <h3 className="text-2xl font-bold mb-2">Add New Tour</h3>
            <p className="text-gray-200">Create a new tour package</p>
          </Link>

          <Link
            href="/admin/gallery?action=add"
            className="bg-gradient-to-r from-[#1a3f66] to-[#193555] text-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <i className="ri-upload-cloud-line text-4xl mb-4"></i>
            <h3 className="text-2xl font-bold mb-2">Upload Gallery Image</h3>
            <p className="text-gray-200">Add new images to the gallery</p>
          </Link>
        </div>
      </div>
    </main>
  );
}

