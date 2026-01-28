import { NextResponse } from "next/server";
import crypto from "crypto";
import { getDocumentByField, updateDocument } from "@/lib/firestore";
import { IDonation } from "@/models/Donation";

export async function POST(req: Request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            const donation = await getDocumentByField<IDonation>("donations", "orderId", razorpay_order_id);

            if (donation && donation._id) {
                await updateDocument<IDonation>("donations", donation._id, {
                    status: "completed",
                    paymentId: razorpay_payment_id,
                });
            } else {
                console.error("Donation not found for orderId:", razorpay_order_id);
            }
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
        }
    } catch (error) {
        console.error("Razorpay Verification Error:", error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : "Internal Server Error"
        }, { status: 500 });
    }
}
