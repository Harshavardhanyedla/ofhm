import { NextResponse } from "next/server";
import { generateClientToken } from "@/lib/paypal";

export async function POST() {
    try {
        const clientToken = await generateClientToken();
        return NextResponse.json({ client_token: clientToken });
    } catch (error) {
        console.error("PayPal Token Error:", error);
        return NextResponse.json({ error: "Failed to generate client token" }, { status: 500 });
    }
}
