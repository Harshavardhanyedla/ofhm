import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs, addDoc } from "firebase/firestore";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const featured = searchParams.get("featured") === "true";

        const activitiesRef = collection(db, "activities");
        let q;

        // Note: Composite index may be required for where() + orderBy() on different fields
        if (featured) {
            q = query(activitiesRef, where("isFeatured", "==", true), orderBy("order", "asc"));
        } else {
            q = query(activitiesRef, orderBy("order", "asc"));
        }

        const snapshot = await getDocs(q);
        const activities = snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));

        return NextResponse.json(activities);
    } catch (error) {
        console.error("Error fetching activities:", error);
        return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // Generate slug from title if not provided
        if (!data.slug && data.title) {
            data.slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }

        const docRef = await addDoc(collection(db, "activities"), data);
        return NextResponse.json({ _id: docRef.id, ...data }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : "Failed to create activity"
        }, { status: 500 });
    }
}
