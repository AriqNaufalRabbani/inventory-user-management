# Inventory Management System

Aplikasi **Inventory Management System** berbasis **Next.js (App Router)** dengan **MySQL** dan **NextAuth (Credentials)** sebagai sistem autentikasi dan role-based access control.

Project ini dibuat sebagai **technical test**.

---
## ⚙️ Cara Instalasi & Setup Lokal

### 1️⃣ Clone Repository
```bash
git clone https://github.com/AriqNaufalRabbani/inventory-user-management
cd inventory-user-management

2️⃣ Install Dependency
npm install

3️⃣ Import Database

Buka phpMyAdmin
Buat database baru: inventory_db
Import file SQL yang tersedia di folder:
/database/inventory_db.sql

4️⃣ Setup Environment Variable
Buat file .env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=inventory_db

NEXTAUTH_SECRET=super-secret-key
NEXTAUTH_URL=http://localhost:3000

5️⃣ Jalankan Aplikasi
npm run dev

Akses aplikasi di:
http://localhost:3000

Show Documentation API
http://localhost:3000/swagger

🔑 Akun Demo
(tersedia di database SQL)

Admin
admin@example.com
 / admin123

Seller
seller@example.com
 / seller123

Pelanggan
customer@example.com
 / customer123

---

## 🚀 Tech Stack

- Next.js 14 (App Router)
- React
- Tailwind CSS & Framer Motion
- MySQL
- NextAuth (Credentials Provider)
- mysql2
- bcrypt
- Swagger (OpenAPI)

---

## 📌 Fitur yang Sudah Dikerjakan

### 🔐 Authentication
- Login menggunakan email & password
- Password di-hash menggunakan bcrypt
- Session management menggunakan NextAuth (JWT)
- Role user: **Admin**, **Seller**, **Pelanggan**

### 📦 Inventory
- Menampilkan daftar produk
- Menambah produk (Admin & Seller)
- Menjual produk (mengurangi stok)
- Validasi stok agar tidak minus

### 👤 User Management
- Menampilkan daftar user (Admin only)
- Mengubah role user (Admin only)

### 📄 API Documentation
- Dokumentasi API menggunakan **Swagger UI**
