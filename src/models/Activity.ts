export interface IActivity {
    _id?: string;
    title: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    scripture?: {
        text: string;
        reference: string;
    };
    images: string[];
    impactSummary: string;
    currentNeeds: string;
    isFeatured: boolean;
    order: number;
    createdAt?: Date;
    updatedAt?: Date;
}
