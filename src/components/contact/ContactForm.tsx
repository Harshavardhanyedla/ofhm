"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Thank you for your message! It has been sent to our team.");
            } else {
                throw new Error(result.error || "Failed to send message");
            }
        } catch (error: any) {
            console.error("Submission error:", error);
            alert(error.message || "An unexpected error occurred. Please try again later.");
        }
    };

    return (
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
    );
}
