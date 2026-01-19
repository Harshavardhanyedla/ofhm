"use client";

import { useState } from "react";
import { Search, Play, Calendar, User, Tag } from "lucide-react";
import { motion } from "framer-motion";

const categories = ["All", "Grace", "Faith", "Healing", "Evangelism", "Hope"];

const sermons = [
    {
        id: 1,
        title: "Walking in Divine Purpose",
        speaker: "Rev. John Doe",
        date: "May 12, 2024",
        category: "Faith",
        thumbnail: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop",
        duration: "45:20",
    },
    {
        id: 2,
        title: "The Power of Forgiveness",
        speaker: "Assoc. Pastor Sarah King",
        date: "May 05, 2024",
        category: "Grace",
        thumbnail: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070&auto=format&fit=crop",
        duration: "38:15",
    },
    {
        id: 3,
        title: "Rising Above Circumstances",
        speaker: "Rev. John Doe",
        date: "April 28, 2024",
        category: "Hope",
        thumbnail: "https://images.unsplash.com/photo-1518005020455-1f6300188975?q=80&w=2070&auto=format&fit=crop",
        duration: "52:10",
    },
    {
        id: 4,
        title: "Modern Day Apostles",
        speaker: "Evang. Mark Silas",
        date: "April 21, 2024",
        category: "Evangelism",
        thumbnail: "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2070&auto=format&fit=crop",
        duration: "41:45",
    },
];

export default function SermonsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredSermons = sermons.filter(sermon => {
        const matchesCategory = activeCategory === "All" || sermon.category === activeCategory;
        const matchesSearch = sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="w-full">
            {/* Header */}
            <section className="bg-muted py-24 pb-12">
                <div className="container mx-auto px-4 md:px-6 space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Audio & Video</h2>
                        <h1 className="text-4xl md:text-6xl font-serif text-foreground">Sermon Archive</h1>
                        <p className="text-lg text-foreground/70 font-light leading-relaxed">
                            Listen to message series from our pastor and guest speakers. Grow in your faith anywhere, anytime.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto bg-white p-4 rounded-3xl border border-border/50 shadow-sm flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search by title or speaker..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                        <div className="flex bg-muted/50 rounded-2xl p-1 overflow-x-auto">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat ? "bg-white text-primary shadow-sm" : "text-foreground/60 hover:text-foreground"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Sermons List */}
            <section className="py-24 pt-12">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredSermons.map((sermon, index) => (
                            <motion.div
                                key={sermon.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-xl">
                                    <img src={sermon.thumbnail} alt={sermon.title} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center text-primary shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                                            <Play className="h-8 w-8 fill-current translate-x-1" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-white">
                                        {sermon.duration}
                                    </div>
                                </div>
                                <div className="space-y-3 px-2">
                                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary/70">
                                        <span className="flex items-center"><Tag className="h-3 w-3 mr-1" /> {sermon.category}</span>
                                        <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" /> {sermon.date}</span>
                                    </div>
                                    <h3 className="text-2xl font-serif text-foreground group-hover:text-primary transition-colors">{sermon.title}</h3>
                                    <p className="flex items-center text-sm text-foreground/60">
                                        <User className="h-4 w-4 mr-2" />
                                        {sermon.speaker}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredSermons.length === 0 && (
                        <div className="text-center py-24 space-y-4">
                            <div className="text-secondary/20 inline-block">
                                <Search className="h-16 w-16" />
                            </div>
                            <p className="text-lg text-foreground/60 italic">No sermons found matching your criteria.</p>
                            <button
                                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                                className="text-primary font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
