"use client";

import { useState } from "react";
import { Search, Play, Calendar, User, Tag } from "lucide-react";
import { motion } from "framer-motion";

const sermons: any[] = [];

export default function SermonsPage() {
    return (
        <div className="w-full">
            {/* Header */}
            <section className="bg-muted py-24 pb-12">
                <div className="container mx-auto px-4 md:px-6 space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Audio & Video</h2>
                        <h1 className="text-4xl md:text-6xl font-serif text-foreground">Sermon Archive</h1>
                        <p className="text-lg text-foreground/70 font-light leading-relaxed">
                            Watch our latest sermons and messages. Grow in your faith anywhere, anytime.
                        </p>
                    </div>
                </div>
            </section>

            {/* Sermons List */}
            <section className="py-24 pt-12 min-h-[400px]">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sermons.map((sermon, index) => (
                            <div key={index} className="aspect-video rounded-3xl overflow-hidden bg-muted animate-pulse" />
                        ))}
                    </div>

                    {sermons.length === 0 && (
                        <div className="text-center py-24 space-y-4">
                            <div className="text-secondary/20 inline-block italic">
                                Videos coming soon...
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
