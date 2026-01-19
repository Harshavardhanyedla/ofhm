import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Activity from "@/models/Activity";
import mongoose from "mongoose";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const { id } = params;

        let activity;
        if (mongoose.Types.ObjectId.isValid(id)) {
            activity = await Activity.findById(id);
        } else {
            activity = await Activity.findOne({ slug: id });
        }

        if (!activity) {
            return NextResponse.json({ error: "Activity not found" }, { status: 404 });
        }

        return NextResponse.json(activity);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch activity" }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const { id } = params;
        const data = await req.json();

        const activity = await Activity.findByIdAndUpdate(id, data, { new: true });

        if (!activity) {
            return NextResponse.json({ error: "Activity not found" }, { status: 404 });
        }

        return NextResponse.json(activity);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update activity" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const { id } = params;

        const activity = await Activity.findByIdAndDelete(id);

        if (!activity) {
            return NextResponse.json({ error: "Activity not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Activity deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete activity" }, { status: 500 });
    }
}
