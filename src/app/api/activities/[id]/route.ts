import { NextResponse } from "next/server";
import { getDocumentById, getDocumentByField, updateDocument, deleteDocument } from "@/lib/firestore";
import { IActivity } from "@/models/Activity";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        let activity = await getDocumentById<IActivity>("activities", id);

        if (!activity) {
            activity = await getDocumentByField<IActivity>("activities", "slug", id);
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
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await req.json();

        // Check if id is a slug or real ID.
        // If it's a slug, we need to find the real ID first.
        let docId = id;
        let activity = await getDocumentById<IActivity>("activities", id);
        if (!activity) {
            activity = await getDocumentByField<IActivity>("activities", "slug", id);
            if (activity && activity._id) docId = activity._id;
            else if (!activity) return NextResponse.json({ error: "Activity not found" }, { status: 404 });
        }

        await updateDocument<IActivity>("activities", docId, data);

        // Return updated document
        const updatedActivity = await getDocumentById<IActivity>("activities", docId);

        return NextResponse.json(updatedActivity);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update activity" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        let docId = id;
        let activity = await getDocumentById<IActivity>("activities", id);
        if (!activity) {
            activity = await getDocumentByField<IActivity>("activities", "slug", id);
            if (activity && activity._id) docId = activity._id;
            else if (!activity) return NextResponse.json({ error: "Activity not found" }, { status: 404 });
        }

        await deleteDocument("activities", docId);

        return NextResponse.json({ message: "Activity deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete activity" }, { status: 500 });
    }
}
