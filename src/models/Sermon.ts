export interface ISermon {
    _id?: string;
    title: string;
    description: string;
    videoUrl?: string;
    audioUrl?: string;
    speaker: string;
    date: Date;
    category: string;
    thumbnail?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
