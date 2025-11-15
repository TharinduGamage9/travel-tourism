"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userAuth = localStorage.getItem("userAuth");
    const userDataStr = localStorage.getItem("userData");
    
    if (userAuth !== "true" || !userDataStr) {
      router.push("/login");
      return;
    }

    try {
      setUserData(JSON.parse(userDataStr));
    } catch (e) {
      console.error("Error parsing user data:", e);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userAuth");
    localStorage.removeItem("userData");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <main className="min-h-screen pt-[100px] pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#193555] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <main className="min-h-screen pt-[100px] pb-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#193555] unbounded-font">
              My Profile
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <i className="ri-logout-box-line mr-2"></i>Logout
            </button>
          </div>

          <div className="space-y-6">
            {/* Profile Avatar */}
            <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
              <div className="w-20 h-20 rounded-full bg-[#193555] flex items-center justify-center text-white text-3xl font-bold">
                {userData.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#193555]">{userData.name}</h2>
                <p className="text-gray-600">{userData.email}</p>
              </div>
            </div>

            {/* User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  {userData.name || "N/A"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  {userData.email || "N/A"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  {userData.phone || "Not provided"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type
                </label>
                <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 capitalize">
                  {userData.role || "user"}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-gray-200">
              <Link
                href="/Tours"
                className="inline-block px-6 py-3 bg-[#193555] text-white rounded-lg hover:bg-[#1a3f66] transition-colors font-semibold"
              >
                <i className="ri-map-pin-line mr-2"></i>Browse Tours
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

