"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is already logged in
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth === "true") {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple authentication (you can enhance this later with proper auth)
    // For now, using environment variables for admin credentials
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@travel.com";
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    router.push("/admin");
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#193555] to-[#1a3f66] px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#193555] mb-2 unbounded-font">
            Admin Login
          </h1>
          <p className="text-gray-600">Travel Tourism Admin Dashboard</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#193555] focus:border-transparent outline-none"
              placeholder="admin@travel.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#193555] focus:border-transparent outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#193555] text-white py-3 rounded-lg font-semibold hover:bg-[#1a3f66] transition-colors duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Default credentials:</p>
          <p className="font-mono text-xs mt-1">Email: admin@travel.com</p>
          <p className="font-mono text-xs">Password: admin123</p>
        </div>
      </div>
    </main>
  );
}

