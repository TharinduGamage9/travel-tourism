"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function AdminTours() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState(() => ({
    title: "",
    city: "",
    distance: "",
    maxGroupSize: "",
    shortDesc: "",
    desc: "",
    price: "",
    featured: false,
    photo: "",
    avgRating: "",
  }));

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth !== "true") {
      router.push("/admin");
      return;
    }
    setIsAuthenticated(true);
    fetchTours();

    // Check if add action is in URL
    if (searchParams.get("action") === "add") {
      setShowForm(true);
    }
  }, [router, searchParams]);

  const fetchTours = async () => {
    try {
      const res = await fetch("/api/tours");
      const data = await res.json();
      if (data.success) {
        setTours(data.data);
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, photo: data.url || "" }));
      } else {
        alert("Error uploading image: " + data.error);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.title || !formData.title.trim()) {
      alert("Please enter a title");
      return;
    }
    if (!formData.city || !formData.city.trim()) {
      alert("Please enter a city");
      return;
    }
    if (!formData.shortDesc || !formData.shortDesc.trim()) {
      alert("Please enter a short description");
      return;
    }
    if (!formData.desc || !formData.desc.trim()) {
      alert("Please enter a full description");
      return;
    }
    if (!formData.price || !formData.price.trim()) {
      alert("Please enter a price");
      return;
    }
    if (!formData.photo || !formData.photo.trim()) {
      alert("Please upload a tour image first");
      return;
    }
    
    try {
      const submitData = {
        title: formData.title.trim(),
        city: formData.city.trim(),
        shortDesc: formData.shortDesc.trim(),
        desc: formData.desc.trim(),
        price: formData.price.trim(),
        photo: formData.photo.trim(),
        featured: formData.featured,
        avgRating: formData.avgRating ? Number(formData.avgRating) : 0,
      };

      // Add optional fields only if they have values
      if (formData.distance && formData.distance.trim()) {
        submitData.distance = isNaN(formData.distance) ? formData.distance.trim() : Number(formData.distance);
      }
      if (formData.maxGroupSize && formData.maxGroupSize.trim()) {
        submitData.maxGroupSize = Number(formData.maxGroupSize);
      }
      
      console.log('Submitting tour data:', submitData);

      const url = editingTour ? `/api/tours/${editingTour._id}` : "/api/tours";
      const method = editingTour ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const data = await res.json();
      console.log('Tour submission response:', data);
      
      if (data.success) {
        setShowForm(false);
        setEditingTour(null);
        setFormData({
          title: "",
          city: "",
          distance: "",
          maxGroupSize: "",
          shortDesc: "",
          desc: "",
          price: "",
          featured: false,
          photo: "",
          avgRating: "",
        });
        fetchTours();
        alert(editingTour ? "Tour updated successfully!" : "Tour added successfully!");
      } else {
        console.error('Tour submission error:', data);
        alert("Error: " + data.error + (data.details ? "\nDetails: " + JSON.stringify(data.details) : ""));
      }
    } catch (error) {
      console.error("Error saving tour:", error);
      alert("Error saving tour: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this tour?")) return;

    try {
      const res = await fetch(`/api/tours/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        fetchTours();
        alert("Tour deleted successfully!");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error deleting tour:", error);
      alert("Error deleting tour");
    }
  };

  const handleEdit = (tour) => {
    setEditingTour(tour);
    setFormData({
      title: String(tour.title || ""),
      city: String(tour.city || ""),
      distance: tour.distance != null ? String(tour.distance) : "",
      maxGroupSize: tour.maxGroupSize != null ? String(tour.maxGroupSize) : "",
      shortDesc: String(tour.shortDesc || ""),
      desc: String(tour.desc || ""),
      price: String(tour.price || ""),
      featured: Boolean(tour.featured),
      photo: String(tour.photo || ""),
      avgRating: tour.avgRating != null ? String(tour.avgRating) : "",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#193555] unbounded-font mb-2">
              Manage Tours
            </h1>
            {/* <p className="text-gray-600">Add, edit, or delete tours</p> */}
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) {
                setEditingTour(null);
                setFormData({
                  title: "",
                  city: "",
                  distance: "",
                  maxGroupSize: "",
                  shortDesc: "",
                  desc: "",
                  price: "",
                  featured: false,
                  photo: "",
                  avgRating: "",
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
                <i className="ri-add-line mr-2"></i>Add New Tour
              </>
            )}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-[#193555] mb-4">
              {editingTour ? "Edit Tour" : "Add New Tour"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#193555] focus:border-transparent outline-none"
                    placeholder="Sigiriya Rock Fortress"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city || ""}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#193555] focus:border-transparent outline-none"
                    placeholder="Sigiriya"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distance (km or text)
                  </label>
                  <input
                    type="text"
                    value={formData.distance || ""}
                    onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#193555] focus:border-transparent outline-none"
                    placeholder="180 or 180 km"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Group Size
                  </label>
                  <input
                    type="number"
                    value={formData.maxGroupSize || ""}
                    onChange={(e) => setFormData({ ...formData, maxGroupSize: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#193555] focus:border-transparent outline-none"
                    placeholder="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price || ""}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#193555] focus:border-transparent outline-none"
                    placeholder="15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average Rating
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.avgRating || ""}
                    onChange={(e) => setFormData({ ...formData, avgRating: e.target.value || "" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#193555] focus:border-transparent outline-none"
                    placeholder="4.8"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <textarea
                  required
                  value={formData.shortDesc || ""}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#193555] focus:border-transparent outline-none"
                  placeholder="A brief description of the tour"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Description *
                </label>
                <textarea
                  required
                  value={formData.desc || ""}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#193555] focus:border-transparent outline-none"
                  placeholder="Detailed description of the tour"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Add *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    required
                    className="hidden"
                    id="tour-image-upload"
                  />
                  <label
                    htmlFor="tour-image-upload"
                    className="flex items-center justify-center px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#193555] hover:bg-gray-50 transition-colors"
                  >
                    <i className="ri-upload-cloud-line text-xl text-gray-500 mr-2"></i>
                    <span className="text-sm font-medium text-gray-700">
                      {uploading ? 'Uploading...' : 'Choose Image File'}
                    </span>
                  </label>
                </div>
                {uploading && <p className="text-sm text-gray-600 mt-2">Uploading to Cloudinary...</p>}
                {formData.photo && formData.photo.trim() && (
                  <div className="mt-4 relative w-full h-64 rounded-lg overflow-hidden border">
                    <Image
                      src={formData.photo}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-[#193555] border-gray-300 rounded focus:ring-[#193555]"
                />
                <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">
                  Featured Tour
                </label>
              </div>
              <button
                type="submit"
                disabled={uploading}
                className="w-full md:w-auto px-8 py-3 bg-[#193555] text-white rounded-lg font-semibold hover:bg-[#1a3f66] transition-colors disabled:opacity-50"
              >
                {editingTour ? "Update Tour" : "Add Tour"}
              </button>
            </form>
          </div>
        )}

        {/* Tours List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-[#193555]">All Tours ({tours.length})</h2>
          </div>
          {tours.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <i className="ri-inbox-line text-5xl mb-4"></i>
              <p>No tours found. Add your first tour!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {tours.map((tour) => (
                <div key={tour._id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                      {tour.photo && tour.photo.trim() ? (
                        <Image
                          src={tour.photo}
                          alt={tour.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <i className="ri-image-line text-4xl text-gray-400"></i>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-[#193555] mb-1">{tour.title}</h3>
                          <p className="text-gray-600 mb-2">{tour.city}</p>
                        </div>
                        {tour.featured && (
                          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-3 line-clamp-2">{tour.shortDesc}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <span><i className="ri-price-tag-3-line mr-1"></i>${tour.price}</span>
                        {tour.distance && <span><i className="ri-road-map-line mr-1"></i>{typeof tour.distance === 'number' ? `${tour.distance} km` : tour.distance}</span>}
                        {tour.avgRating > 0 && <span><i className="ri-star-fill text-yellow-400 mr-1"></i>{tour.avgRating}</span>}
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(tour)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <i className="ri-edit-line mr-2"></i>Edit
                        </button>
                        <button
                          onClick={() => handleDelete(tour._id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <i className="ri-delete-bin-line mr-2"></i>Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

