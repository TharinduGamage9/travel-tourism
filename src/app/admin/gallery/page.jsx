"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SearchParamsEffect from "./SearchParamsEffect";  // ✅ FIXED

export default function AdminGallery() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    imageUrl: "",
    alt: "",
    title: "",
    category: "",
  });

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth !== "true") {
      router.push("/admin");
      return;
    }
    setIsAuthenticated(true);
    fetchGallery();
  }, [router]);

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success) {
        setGallery(data.data);
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };


  if (!isAuthenticated || loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#193555] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={null}>
        <SearchParamsEffect setShowForm={setShowForm} />
      </Suspense>
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#193555] unbounded-font mb-2">
              Manage Gallery
            </h1>
            <p className="text-gray-600">Upload and manage gallery images</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) {
                setFormData({
                  imageUrl: "",
                  imageUrl2: "",
                  alt: "",
                  title: "",
                  category: "",
                });
              }
            }}
            className="px-6 py-2 bg-[#193555] text-white rounded-lg hover:bg-[#1a3f66] transition-colors"
          >
            {showForm ? (
              <>
                <i className="ri-close-line mr-2"></i>Cancel
              </>
            ) : (
              <>
                <i className="ri-upload-cloud-line mr-2"></i>Upload Image
              </>
            )}
          </button>
        </div>

        {/* Upload Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-[#193555] mb-4">Upload New Image</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image File *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    required
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#193555] hover:bg-gray-50 transition-colors"
                  >
                    <i className="ri-upload-cloud-line text-xl text-gray-500 mr-2"></i>
                    <span className="text-sm font-medium text-gray-700">
                      {uploading ? 'Uploading...' : 'Choose Image File'}
                    </span>
                  </label>
                </div>
                {uploading && <p className="text-sm text-gray-600 mt-2">Uploading to Cloudinary...</p>}
                {formData.imageUrl && (
                  <div className="mt-4 relative w-full h-64 rounded-lg overflow-hidden border">
                    <Image
                      src={formData.imageUrl}
                      alt="Preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt Text *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.alt}
                    onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#193555] focus:border-transparent outline-none"
                    placeholder="Beautiful landscape"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#193555] focus:border-transparent outline-none"
                    placeholder="Image title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#193555] focus:border-transparent outline-none"
                    placeholder="Nature, Beach, etc."
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={uploading || !formData.imageUrl}
                className="w-full md:w-auto px-8 py-3 bg-[#193555] text-white rounded-lg font-semibold hover:bg-[#1a3f66] transition-colors disabled:opacity-50"
              >
                Add to Gallery
              </button>
            </form>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#193555]">Gallery Images ({gallery.length})</h2>
            {gallery.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
              >
                <i className="ri-delete-bin-line mr-2"></i>Delete All
              </button>
            )}
          </div>
          {gallery.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <i className="ri-image-line text-5xl mb-4"></i>
              <p>No images in gallery. Upload your first image!</p>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {gallery.map((item) => (
                  <div key={item._id} className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    <div className="relative aspect-square">
                      <Image
                        src={item.imageUrl}
                        alt={item.alt}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <i className="ri-delete-bin-line mr-2"></i>Delete
                        </button>
                      </div>
                    </div>
                    <div className="p-3 bg-white">
                      <p className="text-sm font-semibold text-gray-800 truncate">{item.title || item.alt}</p>
                      {item.category && (
                        <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

