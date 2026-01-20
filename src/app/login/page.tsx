"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  LogIn,
  Package,
} from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role_name: string;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

//   const { data: session, status } = useSession();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError("Email dan password harus diisi!");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Format email tidak valid!");
      return;
    }

    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Email atau password salah!");
      return;
    }

    // Redirect setelah login sukses
    router.push("/");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  // Login Form
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row"
      >
        {/* Left Side - Illustration */}
        <div className="bg-linear-to-br from-blue-600 to-purple-600 p-8 md:p-12 flex flex-col justify-center items-center text-white md:w-1/2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <Package className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Inventory System</h2>
            <p className="text-blue-100 mb-8">
              Sistem Manajemen Inventaris & User Management
            </p>

            {/* Demo Credentials */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-left text-sm">
              <p className="font-semibold mb-2">🔑 Demo Accounts:</p>
              <div className="space-y-1 text-blue-100">
                <p>👤 Admin: admin@example.com / admin123</p>
                <p>👤 Seller: seller@example.com / seller123</p>
                <p>👤 Customer: customer@example.com / customer123</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 md:p-12 md:w-1/2">
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Welcome Back!
            </h2>
            <p className="text-slate-600 mb-8">
              Silakan login untuk melanjutkan
            </p>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-red-700 text-sm">{error}</span>
              </motion.div>
            )}

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-slate-700 font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="your.email@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-slate-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-slate-600 text-sm">Remember me</span>
              </label>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </>
              )}
            </button>

            {/* Register Link */}
            <p className="text-center text-slate-600 mt-6 text-sm">
              Belum punya akun?{" "}
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                Daftar sekarang
              </button>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
