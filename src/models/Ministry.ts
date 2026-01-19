import mongoose, { Schema, Document } from 'mongoose';

export interface IMinistry extends Document {
    title: string;
    description: string;
    image: string;
    impactSummary: string;
    scriptureText?: string;
    scriptureRef?: string;
    order: number;
}

const MinistrySchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    impactSummary: { type: String },
    scriptureText: { type: String },
    scriptureRef: { type: String },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Ministry || mongoose.model<IMinistry>('Ministry', MinistrySchema);
