import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, subject, message, _honeypot } = body;

        // Honeypot check: If the hidden field is filled, it's a bot
        if (_honeypot) {
            console.log("Spam detected via honeypot field");
            return NextResponse.json({ success: true, message: "Email sent successfully" }); // Return success to fool the bot
        }

        // Validate basic fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Capture metadata
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "Unknown";
        const userAgent = req.headers.get("user-agent") || "Unknown";
        const country = req.headers.get("x-vercel-ip-country") || "Unknown";
        const city = req.headers.get("x-vercel-ip-city") || "Unknown";
        const region = req.headers.get("x-vercel-ip-region") || "Unknown";

        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || "587"),
            secure: process.env.EMAIL_SECURE === "true",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: "contact@ofhm.org",
            replyTo: email,
            subject: `Contact Form: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nMetadata:\nIP: ${ip}\nLocation: ${city}, ${region}, ${country}\nUser-Agent: ${userAgent}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px; margin: auto;">
                    <h2 style="color: #333;">New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="white-space: pre-wrap; color: #444; line-height: 1.6;">${message}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <div style="font-size: 12px; color: #888; background: #f9f9f9; padding: 10px; border-radius: 5px;">
                        <p style="margin: 0;"><strong>Sender Metadata:</strong></p>
                        <p style="margin: 5px 0 0;">IP Address: ${ip}</p>
                        <p style="margin: 2px 0 0;">Location: ${city}, ${region}, ${country}</p>
                        <p style="margin: 2px 0 0;">User-Agent: ${userAgent}</p>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "Email sent successfully" });
    } catch (error: any) {
        console.error("Error sending contact email:", error);
        return NextResponse.json(
            { error: "Failed to send email. Please try again later." },
            { status: 500 }
        );
    }
}

