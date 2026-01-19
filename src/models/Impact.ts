import mongoose, { Schema, Document } from 'mongoose';

export interface IImpact extends Document {
    orphans: number;
    widows: number;
    families: number;
    education: number;
    updatedAt: Date;
}

const ImpactSchema: Schema = new Schema({
    orphans: { type: Number, default: 0 },
    widows: { type: Number, default: 0 },
    families: { type: Number, default: 0 },
    education: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Impact || mongoose.model<IImpact>('Impact', ImpactSchema);
