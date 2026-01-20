/**
 * @swagger
 * /products/{id}/sell:
 *   post:
 *     summary: Sell product (reduce stock)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantity]
 *             properties:
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product sold successfully
 *       400:
 *         description: Invalid quantity or insufficient stock
 *       404:
 *         description: Product not found
 */

import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { quantity } = await req.json();
  const { id } = await context.params;

  if (!quantity || quantity <= 0) {
    return NextResponse.json(
      { error: "Quantity must be greater than 0" },
      { status: 400 }
    );
  }

  try {
    const [products]: any = await pool.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (products.length === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const product = products[0];

    if (product.stock < quantity) {
      return NextResponse.json(
        {
          error: `Insufficient stock. Available: ${product.stock}`,
          available_stock: product.stock,
        },
        { status: 400 }
      );
    }

    const newStock = product.stock - quantity;

    await pool.query(
      "UPDATE products SET stock = ? WHERE id = ?",
      [newStock, id]
    );

    const [updated]: any = await pool.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    return NextResponse.json({
      message: "Product sold successfully",
      product: updated[0],
      quantity_sold: quantity,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to sell product" },
      { status: 500 }
    );
  }
}
