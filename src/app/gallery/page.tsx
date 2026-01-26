"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const galleryImages = [
    { src: '/images/orphan-care.png', title: 'Orphan Care Mission' },
    { src: '/images/widow-care.png', title: 'Widow Support' },
    { src: '/images/discipleship-v2.png', title: 'Discipleship Training' },
    { src: '/images/tribal-outreach-v3.png', title: 'Tribal Outreach' },
    { src: '/images/eye-medical-care-v3.png', title: 'Eye Medical Camp' },
    { src: '/images/bible-distribution.png', title: 'Bible Distribution' },
    { src: '/images/borewell-projects.png', title: 'Borewell Projects' },
    { src: '/images/church-plantation.png', title: 'Church Plantation' },
    { src: '/images/food-distribution.png', title: 'Food Distribution' },
    { src: '/images/self-sustainable-v2.png', title: 'Self-Sustainable Projects' },
];

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="bg-muted py-24 pb-12">
                <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl mx-auto space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Photos</h2>
                    <h1 className="text-4xl md:text-6xl font-serif text-foreground leading-tight">
                        Our <span className="italic font-light">Gallery</span>
                    </h1>
                    <p className="text-lg text-foreground/70 font-light leading-relaxed max-w-2xl mx-auto">
                        Capturing moments of transformation and faith across our various ministries and activities.
                    </p>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-24 pt-12">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {galleryImages.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="group relative break-inside-avoid rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-7xl w-full max-h-[90vh] flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                            />
                            <button
                                className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X className="h-8 w-8" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
