import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createDocument } from "@/lib/firestore";

export async function POST(req: Request) {
    try {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return NextResponse.json({ error: "Razorpay credentials not configured" }, { status: 500 });
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const { amount, fund, donorInfo } = await req.json();

        const options = {
            amount: Number(amount) * 100, // amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        // Save pending donation to DB
        await createDocument("donations", {
            donorName: donorInfo.name,
            email: donorInfo.email,
            amount: amount,
            currency: "INR",
            fund: fund,
            status: "pending",
            paymentProvider: "razorpay",
            orderId: order.id,
            date: new Date(),
        });

        return NextResponse.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
        });
    } catch (error) {
        console.error("Razorpay Order Error:", error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : "Internal Server Error"
        }, { status: 500 });
    }
}
