"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

const latestSermons = [
    { title: "Family Christmas 20-12-2025", id: "bwx2mpX48Vw" },
    { title: "Handing Out New Blankets", id: "BoeOL8OvI40" },
    { title: "Pastors & Leaders Conference", id: "6ZaSerPo1Lo" },
];

export default function SermonsPreview() {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Audio & Video</h2>
                        <h3 className="text-4xl md:text-5xl font-serif text-secondary leading-tight">
                            Latest <br /> <span className="italic font-light">Messages</span>
                        </h3>
                    </div>
                    <Link
                        href="/sermons"
                        className="inline-flex items-center text-sm font-bold text-primary group"
                    >
                        WATCH ALL SERMONS
                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {latestSermons.map((sermon, index) => (
                        <motion.div
                            key={sermon.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <Link href="/sermons">
                                <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-6 shadow-lg border border-muted/50">
                                    <img
                                        src={`https://i.ytimg.com/vi/${sermon.id}/hqdefault.jpg`}
                                        alt={sermon.title}
                                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-primary shadow-2xl scale-90 group-hover:scale-110 transition-transform duration-300">
                                            <Play className="h-6 w-6 fill-current translate-x-0.5" />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="text-lg font-serif text-secondary group-hover:text-primary transition-colors leading-snug line-clamp-2 px-2 text-center">
                                    {sermon.title}
                                </h4>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
