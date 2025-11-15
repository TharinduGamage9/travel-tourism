"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const userAuth = localStorage.getItem("userAuth");
    if (userAuth === "true") {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please enter email and password");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Store user info in localStorage
        localStorage.setItem("userAuth", "true");
        localStorage.setItem("userData", JSON.stringify(data.data));
        
        // Redirect to home page
        router.push("/");
        alert("Login successful! Welcome back!");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-[100px] pb-16 flex items-center justify-center bg-gradient-to-br from-[#193555] to-[#1a3f66] px-4">
      <div className="max-w-sm w-full bg-white rounded-lg shadow-2xl p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#193555] mb-1 unbounded-font">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600">Login to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-2 text-sm bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#193555] focus:border-transparent outline-none"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#193555] focus:border-transparent outline-none"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-[#193555] border-gray-300 rounded focus:ring-[#193555]"
              />
              <label htmlFor="remember" className="ml-2 text-xs text-gray-700">
                Remember me
              </label>
            </div>
            <Link href="#" className="text-xs text-[#193555] hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#193555] text-white py-2.5 text-sm rounded-lg font-semibold hover:bg-[#1a3f66] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center text-sm">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#193555] font-semibold hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

