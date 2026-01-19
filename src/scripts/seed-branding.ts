import mongoose from "mongoose";
import dbConnect from "../lib/mongodb";
import Branding from "../models/Branding";

async function seedBranding() {
    try {
        await dbConnect();

        await Branding.deleteMany({});

        await Branding.create({
            siteName: "Our Father's Home Ministries",
            logoFull: "/branding/ofhm-logo-full.png",
            logoMark: "/branding/ofhm-logo-mark.png"
        });

        console.log("Branding seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding branding:", error);
        process.exit(1);
    }
}

seedBranding();
