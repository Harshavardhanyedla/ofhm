import mongoose, { Schema, Document } from "mongoose";

export interface IBranding extends Document {
    siteName: string;
    logoFull: string;
    logoMark: string;
    updatedAt: Date;
}

const BrandingSchema: Schema = new Schema({
    siteName: { type: String, default: "Our Father's Home Ministries" },
    logoFull: { type: String, default: "/branding/ofhm-logo-full.png" },
    logoMark: { type: String, default: "/branding/ofhm-logo-mark.png" },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Branding || mongoose.model<IBranding>("Branding", BrandingSchema);
