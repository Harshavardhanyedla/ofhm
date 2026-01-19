"use client";

import { motion } from "framer-motion";
import { Heart, Users, GraduationCap, Church, Utensils, HeartHandshake } from "lucide-react";
import Link from "next/link";

const ministries = [
    {
        id: "orphan-care",
        title: "Orphan Care",
        description: "Our orphanage provides a safe haven for over 100 children. We offer nutritious meals, medical care, and a loving family environment where they can grow and thrive as children of God.",
        impact: "100+ Children in full-time care",
        icon: Heart,
        image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: "widow-support",
        title: "Widow Support",
        description: "We believe in empowering widows to lead dignified lives. Our program provides monthly financial aid, community support groups, and vocational training in tailoring and crafts.",
        impact: "80+ Widows supported monthly",
        icon: Users,
        image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: "education",
        title: "Education Mission",
        description: "Education is the key to breaking the cycle of poverty. We run a primary school and provide scholarships for higher education to ensure every child has a bright future.",
        impact: "300+ Students enrolled",
        icon: GraduationCap,
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
    },
    {
        id: "evangelism",
        title: "Spiritual Growth",
        description: "At our core, we are a spiritual ministry. We hold weekly sermons, community prayer meetings, and outreach programs to share the transformative love of Christ.",
        impact: "15+ Communities reached",
        icon: Church,
        image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop",
    },
    {
        id: "food-relief",
        title: "Food & Relief",
        description: "Emergency relief for families facing hunger or natural disasters. We distribute food kits and essential supplies to the most vulnerable members of our society.",
        impact: "5000+ Meals distributed annually",
        icon: Utensils,
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    },
];

export default function MinistriesPage() {
    return (
        <div className="w-full">
            {/* Header */}
            <section className="bg-muted py-24">
                <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl mx-auto space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-primary">What We Do</h2>
                    <h1 className="text-4xl md:text-6xl font-serif text-foreground">Our Ministries</h1>
                    <p className="text-lg text-foreground/70 font-light leading-relaxed">
                        OFHM is committed to serving the least, the last, and the lost. Explore our core initiatives and see how we are making an impact.
                    </p>
                </div>
            </section>

            {/* Ministries List */}
            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6 space-y-24">
                    {ministries.map((ministry, index) => (
                        <motion.div
                            key={ministry.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
                        >
                            <div className="flex-1 space-y-6">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                                    <ministry.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-serif">{ministry.title}</h3>
                                <p className="text-lg text-foreground/70 leading-relaxed">
                                    {ministry.description}
                                </p>
                                <div className="bg-muted p-6 rounded-2xl border border-border/50 inline-block">
                                    <p className="text-sm font-bold text-secondary uppercase tracking-wider mb-1">Impact</p>
                                    <p className="text-xl font-serif text-primary">{ministry.impact}</p>
                                </div>
                                <div className="pt-4">
                                    <Link
                                        href={`/donate?fund=${ministry.id}`}
                                        className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105"
                                    >
                                        Support this Ministry
                                    </Link>
                                </div>
                            </div>
                            <div className="flex-1 w-full">
                                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
                                    <img
                                        src={ministry.image}
                                        alt={ministry.title}
                                        className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-1000"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
