import mongoose, { Schema, Document } from 'mongoose';

export interface IFounder extends Document {
    title: string;
    familyHistory: string;
    fullTestimony: string;
    name: string;
    role: string;
    image: string;
}

const FounderSchema: Schema = new Schema({
    title: { type: String },
    familyHistory: { type: String },
    fullTestimony: { type: String },
    name: { type: String },
    role: { type: String },
    image: { type: String },
}, { timestamps: true });

export default mongoose.models.Founder || mongoose.model<IFounder>('Founder', FounderSchema);
