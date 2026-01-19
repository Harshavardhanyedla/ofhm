import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        await dbConnect();

        // Check if an admin already exists to prevent multiple setups
        const adminExists = await User.findOne({ role: "admin" });
        if (adminExists) {
            return NextResponse.json({ message: "Admin already exists. Setup disabled." }, { status: 403 });
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        await User.create({
            name: "OFHM Admin",
            email: "admin@ofhm.org",
            password: hashedPassword,
            role: "admin",
        });

        return NextResponse.json({
            message: "Initial Admin created successfully!",
            credentials: {
                email: "admin@ofhm.org",
                password: "admin1123 (Please change this in settings after login)"
            }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
