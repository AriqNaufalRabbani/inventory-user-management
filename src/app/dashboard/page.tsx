"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  ShoppingCart,
  Users,
  Package,
  ChevronDown,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  created_at: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
  role_name: string;
}

interface Role {
  id: number;
  name: string;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

const InventoryApp = () => {
  const [activeTab, setActiveTab] = useState<"inventory" | "users">(
    "inventory",
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [roles] = useState<Role[]>([
    { id: 1, name: "Admin" },
    { id: 2, name: "Seller" },
    { id: 3, name: "Pelanggan" },
  ]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });

  // Sell product state
  const [sellQuantity, setSellQuantity] = useState<{ [key: number]: string }>(
    {},
  );

  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      redirect: false, // biar kita kontrol redirect sendiri
    });

    router.push("/login");
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  // Toast notification system
  const showToast = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  // Add new product
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      showToast("Semua field harus diisi!", "error");
      return;
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      showToast(err.error || "Gagal menambah produk", "error");
      return;
    }

    const product = await res.json();
    setProducts((prev) => [product, ...prev]);

    setNewProduct({ name: "", price: "", stock: "" });
    showToast("Produk berhasil ditambahkan!", "success");
  };

  // Sell product (reduce stock)
  const handleSellProduct = async (productId: number) => {
    const quantity = Number(sellQuantity[productId]);

    if (!quantity || quantity <= 0) {
      showToast("Jumlah harus lebih dari 0!", "error");
      return;
    }

    const res = await fetch(`/api/products/${productId}/sell`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });

    const data = await res.json();

    if (!res.ok) {
      showToast(data.error, "error");
      return;
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? data.product : p)),
    );

    setSellQuantity((prev) => ({ ...prev, [productId]: "" }));
    showToast("Produk berhasil dijual!", "success");
  };

  // Change user role
  const handleChangeRole = async (userId: number, newRoleId: number) => {
    const res = await fetch(`/api/users/${userId}/change-role`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role_id: newRoleId }),
    });

    const data = await res.json();

    if (!res.ok) {
      showToast(data.error || "Gagal update role", "error");
      return;
    }

    setUsers((prev) => prev.map((u) => (u.id === userId ? data.user : u)));

    showToast("Role berhasil diubah!", "success");
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, x: 100 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
                toast.type === "success"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span className="font-medium">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-4">
          <div className="max-w-7xl px-6 py-4">
            <h1 className="text-2xl font-bold text-slate-800">
              Sistem Inventaris & User Management
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Technical Test - Junior Fullstack Developer
            </p>
          </div>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={handleLogout}
            className="p-4 bg-linear-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
          >
            Logout
          </motion.button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("inventory")}
            className={`cursor-pointer flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
              activeTab === "inventory"
                ? "bg-blue-500 text-white shadow-md"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Package className="w-5 h-5" />
            Inventaris
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`cursor-pointer flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
              activeTab === "users"
                ? "bg-blue-500 text-white shadow-md"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Users className="w-5 h-5" />
            Manajemen User
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <AnimatePresence mode="wait">
          {activeTab === "inventory" ? (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Add Product Form */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Tambah Produk Baru
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    placeholder="Nama Produk"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Harga"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Stok"
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, stock: e.target.value })
                    }
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button
                    onClick={handleAddProduct}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                  >
                    Tambah Produk
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-blue-400">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                          Nama Produk
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                          Harga
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                          Sisa Stok
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {products.map((product) => (
                        <motion.tr
                          key={product.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-slate-800">
                            {product.name}
                          </td>
                          <td className="px-6 py-4 text-slate-800">
                            {formatCurrency(product.price)}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                product.stock > 10
                                  ? "bg-green-100 text-green-700"
                                  : product.stock > 5
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {product.stock} unit
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min="1"
                                placeholder="Qty"
                                value={sellQuantity[product.id] || ""}
                                onChange={(e) =>
                                  setSellQuantity({
                                    ...sellQuantity,
                                    [product.id]: e.target.value,
                                  })
                                }
                                className="w-20 px-3 py-1 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              />
                              <button
                                onClick={() => handleSellProduct(product.id)}
                                className="flex items-center gap-1 bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                              >
                                <ShoppingCart className="w-4 h-4" />
                                Jual
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Users Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                          Nama
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                          Role Saat Ini
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                          Ubah Role
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {users.map((user) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-slate-800 font-medium">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {user.email}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                user.role_name === "Admin"
                                  ? "bg-purple-100 text-purple-700"
                                  : user.role_name === "Seller"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {user.role_name}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="relative">
                                <select
                                  value={user.role_id}
                                  onChange={(e) =>
                                    handleChangeRole(
                                      user.id,
                                      parseInt(e.target.value),
                                    )
                                  }
                                  className="appearance-none px-4 py-2 pr-10 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer"
                                >
                                  {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                      {role.name}
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InventoryApp;
