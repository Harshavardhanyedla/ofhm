import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Donation from "@/models/Donation";

export async function POST(req: Request) {
    try {
        const { orderId, details, fund } = await req.json();

        await dbConnect();

        // PayPal payment is already captured on client in this simple flow
        // We just save the details
        await Donation.create({
            donorName: `${details.payer.name.given_name} ${details.payer.name.surname}`,
            email: details.payer.email_address,
            amount: details.purchase_units[0].amount.value,
            currency: details.purchase_units[0].amount.currency_code,
            fund: fund,
            status: "completed",
            paymentProvider: "paypal",
            paymentId: orderId,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("PayPal Save Error:", error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : "Internal Server Error"
        }, { status: 500 });
    }
}
