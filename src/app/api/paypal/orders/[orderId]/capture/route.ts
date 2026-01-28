import { NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";
import { createDocument } from "@/lib/firestore";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ orderId: string }> }
) {
    try {
        const { orderId } = await params;
        const { fund } = await req.json();

        const captureData = await capturePayPalOrder(orderId);

        // Save to DB
        await createDocument("donations", {
            donorName: `${captureData.payer.name.given_name} ${captureData.payer.name.surname}`,
            email: captureData.payer.email_address,
            amount: captureData.purchase_units[0].payments.captures[0]?.amount?.value,
            currency: captureData.purchase_units[0].payments.captures[0]?.amount?.currency_code,
            fund: fund || "General",
            status: "completed",
            paymentProvider: "paypal",
            paymentId: orderId,
            date: new Date(),
        });

        return NextResponse.json(captureData);
    } catch (error: any) {
        console.error("PayPal Capture Error Details:", JSON.stringify(error, null, 2));
        console.error("PayPal Capture Error Message:", error.message);
        return NextResponse.json(
            { error: error.message || "Failed to capture order" },
            { status: 500 }
        );
    }
}
