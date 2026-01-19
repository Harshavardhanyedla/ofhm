"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";

const blogPosts = [
    {
        id: 1,
        title: "10 Ways to Serve Your Community This Season",
        excerpt: "Discover simple yet impactful ways to be a blessing to those around you through acts of service and kindness.",
        author: "OFHM Admin",
        date: "May 15, 2024",
        category: "Community",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Annual Charity Drive: A Record Breaking Success",
        excerpt: "Thanks to your generous support, we were able to provide relief kits to over 500 families this month.",
        author: "Sarah Jane",
        date: "May 10, 2024",
        category: "Updates",
        image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "The Importance of Education for Orphans",
        excerpt: "Why education is the most powerful tool in our mission to break the generational cycle of poverty.",
        author: "Rev. John Doe",
        date: "May 02, 2024",
        category: "Education",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
    },
];

export default function BlogPage() {
    return (
        <div className="w-full">
            {/* Header */}
            <section className="bg-muted py-24">
                <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl mx-auto space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-primary">News & Updates</h2>
                    <h1 className="text-4xl md:text-6xl font-serif text-foreground">Our Blog</h1>
                    <p className="text-lg text-foreground/70 font-light leading-relaxed">
                        Stories of transformation, ministry news, and biblical insights from the OFHM community.
                    </p>
                </div>
            </section>

            {/* Blog List */}
            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Featured Post */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2 group"
                        >
                            <Link href={`/blog/${blogPosts[0].id}`} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl">
                                    <img src={blogPosts[0].image} alt={blogPosts[0].title} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000" />
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary">
                                        <span className="bg-primary/10 px-3 py-1 rounded-full">{blogPosts[0].category}</span>
                                        <span className="text-foreground/40">{blogPosts[0].date}</span>
                                    </div>
                                    <h2 className="text-4xl font-serif text-foreground group-hover:text-primary transition-colors leading-tight">
                                        {blogPosts[0].title}
                                    </h2>
                                    <p className="text-lg text-foreground/60 leading-relaxed font-light line-clamp-3">
                                        {blogPosts[0].excerpt}
                                    </p>
                                    <div className="flex items-center text-primary font-bold group-hover:translate-x-2 transition-transform">
                                        Read Story
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Other Posts */}
                        {blogPosts.slice(1).map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <Link href={`/blog/${post.id}`} className="space-y-6 block">
                                    <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-lg border border-border/50">
                                        <img src={post.image} alt={post.title} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary/70">
                                            <span>{post.category}</span>
                                            <span className="text-foreground/30">•</span>
                                            <span>{post.date}</span>
                                        </div>
                                        <h3 className="text-2xl font-serif text-foreground group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-foreground/60 leading-relaxed line-clamp-2 italic font-light">
                                            "{post.excerpt}"
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
