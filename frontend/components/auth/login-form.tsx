"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, School } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // --- Mock Authentication Logic ---
    if (email && password) {
      console.log("User authenticated (mock)");
      router.push(redirectUrl);
    } else {
      setError("Please enter both email and password.");
    }
    // --- End of Mock Logic ---
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-cyan-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl border border-green-100">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <School className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-700">Welcome Back</h1>
          <p className="text-gray-500">Please sign in to access your dashboard.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute w-5 h-5 text-green-700 top-3 left-3" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300"
            />
          </div>
          <div className="relative">
            <Lock className="absolute w-5 h-5 text-green-700 top-3 left-3" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300"
            />
          </div>
          {error && <p className="text-sm text-center text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform transition-transform hover:scale-105"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}