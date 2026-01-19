import mongoose, { Schema, Document } from 'mongoose';

export interface IDonation extends Document {
    donorName: string;
    email: string;
    amount: number;
    currency: string;
    fund: string; // General, Orphans, Widows, etc.
    status: 'pending' | 'completed' | 'failed';
    paymentProvider: 'razorpay' | 'paypal';
    paymentId: string;
    orderId?: string;
    date: Date;
}

const DonationSchema: Schema = new Schema({
    donorName: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    fund: { type: String, default: 'General' },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    paymentProvider: { type: String, enum: ['razorpay', 'paypal'], required: true },
    paymentId: { type: String },
    orderId: { type: String },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema);
