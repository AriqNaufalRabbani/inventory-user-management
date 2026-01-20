/**
 * @swagger
 * /users/{id}/change-role:
 *   put:
 *     summary: Change user role
 *     tags: [Users]
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
 *             required: [role_id]
 *             properties:
 *               role_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Invalid role or bad request
 *       404:
 *         description: User not found
 */

import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { role_id } = await req.json();
  const { id } = await context.params;

  if (!role_id) {
    return NextResponse.json(
      { error: "role_id is required" },
      { status: 400 }
    );
  }

  try {
    const [roles]: any = await pool.query(
      "SELECT * FROM roles WHERE id = ?",
      [role_id]
    );

    if (roles.length === 0) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    const [users]: any = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    await pool.query(
      "UPDATE users SET role_id = ? WHERE id = ?",
      [role_id, id]
    );

    const [updated]: any = await pool.query(`
      SELECT u.id, u.name, u.email, u.role_id, r.name as role_name
      FROM users u
      INNER JOIN roles r ON u.role_id = r.id
      WHERE u.id = ?
    `, [id]);

    return NextResponse.json({
      message: "User role updated successfully",
      user: updated[0],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 }
    );
  }
}
