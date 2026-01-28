export interface IUser {
    _id?: string;
    email: string;
    password: string;
    name: string;
    role: 'admin' | 'editor';
    createdAt?: Date; // Firestore Timestamp converted to Date
    updatedAt?: Date;
}
