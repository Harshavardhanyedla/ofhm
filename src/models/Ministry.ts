export interface IMinistry {
    _id?: string;
    title: string;
    description: string;
    image: string;
    impactSummary: string;
    scriptureText?: string;
    scriptureRef?: string;
    order: number;
    createdAt?: Date;
    updatedAt?: Date;
}
