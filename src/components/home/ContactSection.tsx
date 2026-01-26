"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function ContactSection() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="bg-secondary rounded-[4rem] p-10 md:p-20 text-white overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary/80">Get In Touch</h2>
                                <h3 className="text-4xl md:text-5xl font-serif leading-tight">
                                    Reach Out to <br /> <span className="italic font-light">Join the Mission</span>
                                </h3>
                            </div>
                            <p className="text-white/70 text-lg font-light leading-relaxed max-w-md">
                                Have a prayer request or want to learn how you can partner with us? Our team is here to connect with you.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center px-10 py-5 bg-primary text-white rounded-full text-lg font-bold hover:scale-105 transition-all shadow-xl shadow-primary/20"
                            >
                                CONTACT US
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-12">
                            {[
                                {
                                    icon: MapPin,
                                    title: "Our Location",
                                    content: "Kakinada District, Andhra Pradesh, India",
                                    href: "https://www.google.com/maps/search/?api=1&query=Our+Father%27s+Home+Ministries+K+Nayakampalli+Andhra+Pradesh"
                                },
                                {
                                    icon: Phone,
                                    title: "Call Us",
                                    content: "+91 9949430413",
                                    href: "tel:+919949430413"
                                },
                                {
                                    icon: Mail,
                                    title: "Email Us",
                                    content: "contact@ofhm.org",
                                    href: "mailto:contact@ofhm.org"
                                },
                            ].map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.href}
                                    className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300"
                                    target={item.icon === MapPin ? "_blank" : undefined}
                                    rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <item.icon className="h-7 w-7" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary/60">{item.title}</h4>
                                        <p className="text-xl font-medium">{item.content}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
