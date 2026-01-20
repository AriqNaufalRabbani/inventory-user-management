/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, stock]
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created
 */

import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET /products
export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /products
export async function POST(req: Request) {
  const { name, price, stock } = await req.json();

  if (!name || price == null || stock == null) {
    return NextResponse.json(
      { error: "Name, price, and stock are required" },
      { status: 400 }
    );
  }

  if (price < 0 || stock < 0) {
    return NextResponse.json(
      { error: "Price and stock must be positive numbers" },
      { status: 400 }
    );
  }

  try {
    const [result]: any = await pool.query(
      "INSERT INTO products (name, price, stock, created_at) VALUES (?, ?, ?, NOW())",
      [name, price, stock]
    );

    const [rows]: any = await pool.query(
      "SELECT * FROM products WHERE id = ?",
      [result.insertId]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
