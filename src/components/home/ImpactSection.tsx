"use client";

import { Users, GraduationCap, Heart, Home } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
    { label: "Orphans Supported", value: "250+", icon: Heart },
    { label: "Widows Helped", value: "120+", icon: Users },
    { label: "Children Educated", value: "400+", icon: GraduationCap },
    { label: "Families Served", value: "1500+", icon: Home },
];

export default function ImpactSection() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Our Impact</h2>
                    <p className="text-3xl md:text-4xl font-serif text-foreground">Transforming Lives Through Grace</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center space-y-4"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted text-primary mb-2">
                                <stat.icon className="h-8 w-8" />
                            </div>
                            <div className="text-4xl md:text-5xl font-serif font-bold text-secondary">{stat.value}</div>
                            <div className="text-sm text-foreground/60 font-medium uppercase tracking-wide">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
