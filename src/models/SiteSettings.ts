export interface ISiteSettings {
    _id?: string;
    heroStatements: string[];
    footerSummary: string;
    contact: {
        address: {
            line1: string;
            line2: string;
            city: string;
            pin: string;
            state: string;
            country: string;
            geo?: { lat: number, lng: number }; // Future proofing
        };
        phone: string;
        email: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}
