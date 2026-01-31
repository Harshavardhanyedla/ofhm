"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPreview() {
    return (
        <section className="py-24 bg-muted/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border border-muted bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-[4rem] shadow-sm">
                    <div className="relative group">
                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-700">
                            <img
                                src="/images/founder-home.png"
                                alt="Dr. Gandham Buli Veerraju"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-primary text-white p-8 rounded-3xl shadow-2xl hidden md:block transform rotate-3">
                            <p className="text-3xl font-serif font-bold">30+</p>
                            <p className="text-xs uppercase tracking-widest font-bold opacity-80">Years of Service</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Founder & President</h2>
                            <h3 className="text-4xl md:text-5xl font-serif text-secondary leading-tight">
                                A Visionary <br /><span className="italic font-light">Journey of Faith</span>
                            </h3>
                        </div>

                        <p className="text-foreground/70 leading-relaxed text-lg font-light">
                            Founded in 1994 by Dr. Gandham Buli Veerraju, Our Father&apos;s Home Ministries has been dedicated to reaching the unreached and serving the underprivileged across India with the love of Christ.
                        </p>

                        <div className="pt-8 border-t border-muted flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className="space-y-1">
                                <p className="text-2xl font-serif font-bold text-secondary">Dr. Gandham Buli Veerraju</p>
                                <p className="text-primary font-bold uppercase tracking-widest text-[10px]">Founder & President</p>
                            </div>
                            <Link
                                href="/about"
                                className="inline-flex items-center text-sm font-bold text-secondary group px-6 py-3 bg-muted rounded-full hover:bg-secondary hover:text-white transition-all ml-auto"
                            >
                                OUR STORY
                                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
