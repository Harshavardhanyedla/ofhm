export interface IPost {
    _id?: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage: string;
    author: string;
    category: string;
    date: Date;
    isPublished: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
