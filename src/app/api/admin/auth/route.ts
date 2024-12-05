import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse("Missing email or password", { status: 400 });
    }

    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    return NextResponse.json({ 
      id: admin.id,
      email: admin.email,
      name: admin.name
    });

  } catch (error) {
    console.error("[ADMIN_AUTH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
