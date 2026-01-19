"use client";

import { Heart, Home, Cross, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface ImpactProps {
    stats: {
        orphans: number;
        churches: number;
        medicalCamps: number;
        bibles: number;
    }
}

export default function ImpactSection({ stats }: ImpactProps) {
    const displayStats = [
        { label: "ORPHAN CHILDREN", value: `${stats.orphans}+`, icon: Heart, sub: "Thousands of Children we Fed" },
        { label: "CHURCH PLANTING", value: `${stats.churches}+`, icon: Cross, sub: "Hundreds of Churches we Planted" },
        { label: "MEDICAL CAMPS", value: `${stats.medicalCamps}+`, icon: Home, sub: "Thousands- Medical Camps we conducted" },
        { label: "BIBLE TO A NEW SOULS", value: `${stats.bibles}+`, icon: BookOpen, sub: "Thousands of Perishing souls we saved" },
    ];
    return (
        <section id="impact" className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Our Impact</h2>
                    <p className="text-3xl md:text-4xl font-serif text-foreground">Transforming Lives Through Grace</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {displayStats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center space-y-4 group"
                        >
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-muted text-primary mb-2 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                <stat.icon className="h-10 w-10" />
                            </div>
                            <div className="space-y-1">
                                <div className="text-4xl md:text-5xl font-serif font-bold text-secondary">{stat.value}</div>
                                <div className="text-xs text-primary font-bold uppercase tracking-[0.2em]">{stat.label}</div>
                            </div>
                            <div className="text-sm text-foreground/40 italic font-light max-w-[200px] mx-auto leading-tight">{stat.sub}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
