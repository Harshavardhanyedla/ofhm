import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
    title: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    scripture?: {
        text: string;
        reference: string;
    };
    images: string[];
    impactSummary: string;
    currentNeeds: string;
    isFeatured: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const ActivitySchema: Schema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String },
    scripture: {
        text: { type: String },
        reference: { type: String }
    },
    images: { type: [String], default: [] },
    impactSummary: { type: String },
    currentNeeds: { type: String },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema);
