"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroProps {
    statements: string[];
}

export default function Hero({ statements }: HeroProps) {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background with dynamic overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-secondary/40 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop"
                    alt="Ministry background"
                    className="w-full h-full object-cover scale-105"
                />
            </div>

            <div className="container mx-auto px-4 relative z-20 text-center text-white space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="space-y-8"
                >
                    <Image
                        src="/branding/ofhm-logo-full.png"
                        alt="Our Father's Home Ministries Logo"
                        width={400}
                        height={120}
                        className="mx-auto h-24 md:h-32 w-auto object-contain mb-8 filter brightness-0 invert"
                        priority
                    />
                    <div className="flex flex-col gap-4">
                        {statements.map((statement, idx) => (
                            <h1 key={idx} className="text-4xl md:text-7xl font-serif font-bold italic opacity-90 first:not-italic first:opacity-100">
                                &quot;{statement}&quot;
                            </h1>
                        ))}
                    </div>
                    <p className="max-w-xl mx-auto text-lg md:text-xl font-light text-white/80">
                        Our Father Home Ministries - Standing as a beacon of hope and a testament to God&apos;s love since 2010.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col md:flex-row gap-6 justify-center"
                >
                    <Link
                        href="/donate"
                        className="px-10 py-5 bg-white text-secondary rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-all shadow-2xl flex items-center justify-center"
                    >
                        Support Our Mission
                    </Link>
                    <Link
                        href="/ministries"
                        className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center"
                    >
                        View Our Work
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
