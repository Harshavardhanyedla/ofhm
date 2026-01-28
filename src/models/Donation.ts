export interface IDonation {
    _id?: string;
    donorName: string;
    email: string;
    amount: number;
    currency: string;
    fund: string; // General, Orphans, Widows, etc.
    status: 'pending' | 'completed' | 'failed';
    paymentProvider: 'paypal';
    paymentId: string;
    orderId?: string;
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
