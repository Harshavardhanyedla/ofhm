import { NextResponse } from "next/server";
import { createDocument, getDocumentByField } from "@/lib/firestore";
import { IUser } from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        // Check if an admin already exists to prevent multiple setups
        const adminExists = await getDocumentByField<IUser>("users", "role", "admin");
        if (adminExists) {
            return NextResponse.json({ message: "Admin already exists. Setup disabled." }, { status: 403 });
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        await createDocument("users", {
            name: "OFHM Admin",
            email: "admin@ofhm.org",
            password: hashedPassword,
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return NextResponse.json({
            message: "Initial Admin created successfully!",
            credentials: {
                email: "admin@ofhm.org",
                password: "admin1123 (Please change this in settings after login)"
            }
        });
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : "Internal Server Error"
        }, { status: 500 });
    }
}
