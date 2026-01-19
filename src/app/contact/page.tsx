"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormValues) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(data);
        alert("Thank you for your message! We will get back to you soon.");
    };

    return (
        <div className="w-full">
            {/* Header */}
            <section className="bg-muted py-24">
                <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl mx-auto space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Get In Touch</h2>
                    <h1 className="text-4xl md:text-6xl font-serif text-foreground">Contact Us</h1>
                    <p className="text-lg text-foreground/70 font-light leading-relaxed">
                        Have a question, prayer request, or want to partner with us? We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h3 className="text-3xl font-serif">Reach Out Directly</h3>
                                <p className="text-foreground/60 leading-relaxed">
                                    Our ministry office is open Monday through Friday, 9:00 AM to 5:00 PM. Feel free to stop by or call us anytime.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { icon: MapPin, title: "Our Location", content: "123 Ministry Lane, Faith City, Zion State, 560001" },
                                    { icon: Phone, title: "Phone Number", content: "+91 98765 43210" },
                                    { icon: Mail, title: "Email Address", content: "info@ofhm.org" },
                                ].map((item) => (
                                    <div key={item.title} className="flex items-start gap-6 group">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                            <item.icon className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-secondary uppercase tracking-wider text-xs">{item.title}</h4>
                                            <p className="text-foreground/70 text-lg">{item.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8">
                                <div className="bg-muted rounded-[2rem] p-8 space-y-4">
                                    <div className="flex items-center gap-3 text-primary font-bold">
                                        <MessageSquare className="h-5 w-5" />
                                        Prayer Requests
                                    </div>
                                    <p className="text-sm text-foreground/70 italic">
                                        "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." — Philippians 4:6
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-primary/5 border border-border/50"
                        >
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-2">Full Name</label>
                                        <input
                                            {...register("name")}
                                            className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
                                            placeholder="John Doe"
                                        />
                                        {errors.name && <p className="text-xs text-red-500 px-2">{errors.name.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-2">Email Address</label>
                                        <input
                                            {...register("email")}
                                            className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && <p className="text-xs text-red-500 px-2">{errors.email.message}</p>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-2">Subject</label>
                                    <input
                                        {...register("subject")}
                                        className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
                                        placeholder="How can we help you?"
                                    />
                                    {errors.subject && <p className="text-xs text-red-500 px-2">{errors.subject.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-2">Message</label>
                                    <textarea
                                        {...register("message")}
                                        rows={5}
                                        className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all resize-none"
                                        placeholder="Write your message here..."
                                    />
                                    {errors.message && <p className="text-xs text-red-500 px-2">{errors.message.message}</p>}
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center gap-3 py-5 bg-primary text-primary-foreground rounded-full text-lg font-medium hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 shadow-xl shadow-primary/20"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                    <Send className="h-5 w-5" />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Placeholder */}
            <section className="h-[400px] w-full bg-muted mt-24 flex items-center justify-center border-t">
                <div className="text-center space-y-4">
                    <MapPin className="h-12 w-12 text-primary mx-auto" />
                    <p className="text-foreground/40 font-mono text-sm tracking-widest uppercase">Interactive Map Integration Here</p>
                </div>
            </section>
        </div>
    );
}
