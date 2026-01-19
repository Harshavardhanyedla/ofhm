import mongoose, { Schema, Document } from 'mongoose';

export interface ISermon extends Document {
    title: string;
    description: string;
    videoUrl?: string;
    audioUrl?: string;
    speaker: string;
    date: Date;
    category: string;
    thumbnail?: string;
}

const SermonSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String },
    audioUrl: { type: String },
    speaker: { type: String, required: true },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true },
    thumbnail: { type: String },
}, { timestamps: true });

export default mongoose.models.Sermon || mongoose.model<ISermon>('Sermon', SermonSchema);
