import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Activity from "@/models/Activity";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const featured = searchParams.get("featured") === "true";

        const query = featured ? { isFeatured: true } : {};
        const activities = await Activity.find(query).sort({ order: 1 });

        return NextResponse.json(activities);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        // Simple auth check could go here if using NextAuth session
        const data = await req.json();

        // Generate slug from title if not provided
        if (!data.slug && data.title) {
            data.slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }

        const activity = await Activity.create(data);
        return NextResponse.json(activity, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : "Failed to create activity"
        }, { status: 500 });
    }
}
