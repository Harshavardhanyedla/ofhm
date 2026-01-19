import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import dbConnect from "@/lib/mongodb";
import Donation from "@/models/Donation";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
    try {
        const { amount, fund, donorInfo } = await req.json();

        await dbConnect();

        const options = {
            amount: Number(amount) * 100, // amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        // Save pending donation to DB
        await Donation.create({
            donorName: donorInfo.name,
            email: donorInfo.email,
            amount: amount,
            currency: "INR",
            fund: fund,
            status: "pending",
            paymentProvider: "razorpay",
            orderId: order.id,
        });

        return NextResponse.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
        });
    } catch (error: any) {
        console.error("Razorpay Order Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
