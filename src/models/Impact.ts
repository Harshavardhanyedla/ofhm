import mongoose, { Schema, Document } from 'mongoose';

export interface IImpact extends Document {
    orphans: number;
    churches: number;
    medicalCamps: number;
    bibles: number;
    updatedAt: Date;
}

const ImpactSchema: Schema = new Schema({
    orphans: { type: Number, default: 0 },
    churches: { type: Number, default: 0 },
    medicalCamps: { type: Number, default: 0 },
    bibles: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Impact || mongoose.model<IImpact>('Impact', ImpactSchema);
