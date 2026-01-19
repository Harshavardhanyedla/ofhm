"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, GraduationCap, Users, Church, Utensils } from "lucide-react";

const ministries = [
    {
        title: "Orphan Care",
        description: "Providing a loving home, food, and clothing for children who have lost their parents.",
        icon: Heart,
        color: "bg-primary/10 text-primary",
    },
    {
        title: "Widow Support",
        description: "Empowering and supporting widows through community, relief, and vocational training.",
        icon: Users,
        color: "bg-secondary/10 text-secondary",
    },
    {
        title: "Education",
        description: "Ensuring every child in our care has access to quality education and spiritual growth.",
        icon: GraduationCap,
        color: "bg-accent/10 text-accent",
    },
    {
        title: "Evangelism",
        description: "Spreading the message of hope and the love of Christ to local communities.",
        icon: Church,
        color: "bg-primary/10 text-primary",
    },
];

export default function MinistriesPreview() {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Our Ministries</h2>
                        <h3 className="text-3xl md:text-4xl font-serif text-foreground">How We Serve Our Community</h3>
                        <p className="text-foreground/70">
                            Through various specialized ministries, we address both the physical and spiritual needs of those in our care.
                        </p>
                    </div>
                    <Link
                        href="/ministries"
                        className="group flex items-center text-primary font-medium hover:underline decoration-2 underline-offset-4"
                    >
                        View All Ministries
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="ml-2"
                        >
                            →
                        </motion.span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ministries.map((ministry, index) => (
                        <motion.div
                            key={ministry.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl border border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all group"
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${ministry.color}`}>
                                <ministry.icon className="h-7 w-7" />
                            </div>
                            <h4 className="text-xl font-serif font-bold mb-4">{ministry.title}</h4>
                            <p className="text-foreground/60 text-sm leading-relaxed mb-6">
                                {ministry.description}
                            </p>
                            <Link
                                href="/ministries"
                                className="text-xs font-bold uppercase tracking-widest text-primary/70 hover:text-primary transition-colors"
                            >
                                Learn More
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
