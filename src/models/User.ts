import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    role: 'admin' | 'editor';
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['admin', 'editor'], default: 'admin' },
}, { timestamps: true });

// Pre-save hook to hash password if wanted, but often done in the route
// UserSchema.pre('save', async function(next) { ... })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
