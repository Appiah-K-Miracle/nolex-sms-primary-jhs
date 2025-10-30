
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Lock, 
  Mail, 
  School, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Shield,
  Users,
  BookOpen,
  GraduationCap,
  Sparkles,
  Award
} from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));

    // --- Mock Authentication Logic ---
    if (email && password) {
      console.log("User authenticated (mock)");
      router.push(redirectUrl);
    } else {
      setError("Please enter both email and password.");
    }
    setIsLoading(false);
    // --- End of Mock Logic ---
  };

  const features = [
    {
      icon: Shield,
      title: "Secure Management",
      description: "Bank-level security for all school data"
    },
    {
      icon: Users,
      title: "Multi-Role Access", 
      description: "Dedicated dashboards for all stakeholders"
    },
    {
      icon: BookOpen,
      title: "Academic Excellence",
      description: "Comprehensive academic management tools"
    },
    {
      icon: Award,
      title: "Performance Tracking",
      description: "Real-time analytics and reporting"
    }
  ];

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Pane - Enhanced */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-green-600 via-green-700 to-blue-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-300 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-green-300 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-8 w-full">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4 inline-block">
              <School className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
              Nolex SMS
            </h1>
            <p className="text-lg text-green-100 mb-6 max-w-sm">
              Seamless Management for Primary and J.H.S
            </p>
            <div className="flex items-center justify-center gap-2 text-green-200">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Trusted by 500+ Schools</span>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 max-w-md mb-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-green-200 mb-2" />
                <h3 className="font-semibold text-white text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-green-100">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-center">
            <div>
              <div className="text-xl font-bold text-white">500+</div>
              <div className="text-xs text-green-200">Schools</div>
            </div>
            <div className="w-px h-6 bg-green-300/30"></div>
            <div>
              <div className="text-xl font-bold text-white">50K+</div>
              <div className="text-xs text-green-200">Students</div>
            </div>
            <div className="w-px h-6 bg-green-300/30"></div>
            <div>
              <div className="text-xl font-bold text-white">99.9%</div>
              <div className="text-xs text-green-200">Uptime</div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 right-10 w-16 h-16 border border-white/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-10 left-10 w-12 h-12 border border-white/20 rounded-full animate-bounce"></div>
      </div>

      {/* Right Pane - Enhanced */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white relative">
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-6 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-full">
              <School className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-xl font-bold text-green-700">Nolex SMS</h1>
          </div>
        </div>

        <div className="w-full max-w-sm space-y-6 px-6 mt-12 lg:mt-0">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute w-5 h-5 text-gray-400 top-1/2 left-3 transform -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-green-300"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute w-5 h-5 text-gray-400 top-1/2 left-3 transform -translate-y-1/2" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-green-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 text-gray-700">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-green-600 hover:text-green-500 font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Access Links */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
            <h3 className="text-xs font-semibold text-gray-700 mb-2 text-center">Quick Access Demo</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link href="/login?redirect=/headmaster" className="bg-white/80 backdrop-blur-sm hover:bg-white text-center py-2 px-2 rounded border border-gray-200 hover:border-green-300 transition-all duration-300 text-gray-700 hover:text-green-700">
                <Shield className="w-3 h-3 mx-auto mb-1" />
                Headmaster
              </Link>
              <Link href="/login?redirect=/teacher" className="bg-white/80 backdrop-blur-sm hover:bg-white text-center py-2 px-2 rounded border border-gray-200 hover:border-blue-300 transition-all duration-300 text-gray-700 hover:text-blue-700">
                <GraduationCap className="w-3 h-3 mx-auto mb-1" />
                Teacher
              </Link>
              <Link href="/login?redirect=/student" className="bg-white/80 backdrop-blur-sm hover:bg-white text-center py-2 px-2 rounded border border-gray-200 hover:border-yellow-300 transition-all duration-300 text-gray-700 hover:text-yellow-700">
                <BookOpen className="w-3 h-3 mx-auto mb-1" />
                Student
              </Link>
              <Link href="/login?redirect=/parent" className="bg-white/80 backdrop-blur-sm hover:bg-white text-center py-2 px-2 rounded border border-gray-200 hover:border-purple-300 transition-all duration-300 text-gray-700 hover:text-purple-700">
                <Users className="w-3 h-3 mx-auto mb-1" />
                Parent
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            <p>
              Don't have an account?{" "}
              <Link href="/contact" className="text-green-600 hover:text-green-500 font-medium">
                Contact Administrator
              </Link>
            </p>
            <p className="mt-1">
              © 2025 Nolex SMS. All rights reserved.
            </p>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-green-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}
