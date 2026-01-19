import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
    heroStatements: string[];
    footerSummary: string;
    contact: {
        address: {
            line1: string;
            line2: string;
            city: string;
            pin: string;
            state: string;
            country: string;
        };
        phone: string;
        email: string;
    };
}

const SiteSettingsSchema: Schema = new Schema({
    heroStatements: [{ type: String }],
    footerSummary: { type: String },
    contact: {
        address: {
            line1: { type: String },
            line2: { type: String },
            city: { type: String },
            pin: { type: String },
            state: { type: String },
            country: { type: String },
        },
        phone: { type: String },
        email: { type: String },
    },
}, { timestamps: true });

export default mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
