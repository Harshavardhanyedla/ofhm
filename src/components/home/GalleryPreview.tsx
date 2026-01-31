"use client";

import Link from "next/link";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

const previewImages = [
    { src: '/images/orphan-shoe-distribution.jpg', title: 'Orphan Care' },
    { src: '/images/tribal-outreach-v5.jpg', title: 'Tribal Outreach' },
    { src: '/images/widow-care-v3.jpg', title: 'Widow Care' },
];

export default function GalleryPreview() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Moments of Faith</h2>
                        <h3 className="text-4xl md:text-5xl font-serif text-secondary leading-tight">
                            Captured in <br /> <span className="italic font-light">The Gallery</span>
                        </h3>
                    </div>
                    <Link
                        href="/gallery"
                        className="inline-flex items-center text-sm font-bold text-primary group"
                    >
                        VIEW ALL PHOTOS
                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {previewImages.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl"
                        >
                            <img
                                src={image.src}
                                alt={image.title}
                                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
