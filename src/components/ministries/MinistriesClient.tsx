"use client";

import { motion } from "framer-motion";
import { LucideIcon, Heart, Users, Cross } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, LucideIcon> = {
    "ORPHAN HOME": Heart,
    "WIDOW MINISTRY": Users,
    "CHURCH PLANTING": Cross,
};

interface Ministry {
    id: string;
    title: string;
    description: string;
    impactSummary: string;
    scriptureText?: string;
    scriptureRef?: string;
    image: string;
}

export default function MinistriesClient({ ministries }: { ministries: Ministry[] }) {
    return (
        <section className="py-24">
            <div className="container mx-auto px-4 md:px-6 space-y-32">
                {ministries.map((ministry, index) => {
                    const Icon = iconMap[ministry.title] || Heart;
                    return (
                        <motion.div
                            key={ministry.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 items-center`}
                        >
                            <div className="flex-1 space-y-8">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-[2rem] bg-primary/10 text-primary">
                                        <Icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-serif text-secondary">{ministry.title}</h3>
                                </div>

                                <p className="text-lg text-foreground/70 leading-relaxed whitespace-pre-line font-light">
                                    {ministry.description}
                                </p>

                                {ministry.scriptureText && (
                                    <div className="p-8 bg-muted/50 rounded-[2.5rem] border-l-4 border-primary italic space-y-3">
                                        <p className="text-xl font-serif text-foreground/80 leading-relaxed">
                                            &quot;{ministry.scriptureText}&quot;
                                        </p>
                                        <cite className="block text-sm font-bold uppercase tracking-widest text-primary not-italic">
                                            — {ministry.scriptureRef}
                                        </cite>
                                    </div>
                                )}

                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="bg-white px-8 py-4 rounded-2xl border border-border/50 shadow-sm">
                                        <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em] mb-1">Impact</p>
                                        <p className="text-xl font-serif text-secondary font-bold">{ministry.impactSummary}</p>
                                    </div>
                                    <Link
                                        href={`/donate?fund=${ministry.id}`}
                                        className="inline-flex items-center justify-center rounded-full bg-secondary px-10 py-5 text-base font-bold text-white transition-all hover:bg-primary hover:scale-105 shadow-xl shadow-secondary/20"
                                    >
                                        Support this Ministry
                                    </Link>
                                </div>
                            </div>
                            <div className="flex-1 w-full">
                                <div className="relative aspect-[4/5] md:aspect-square rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white">
                                    <img
                                        src={ministry.image}
                                        alt={ministry.title}
                                        className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-[2s]"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
