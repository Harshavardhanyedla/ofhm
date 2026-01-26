import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import ContactForm from "@/components/contact/ContactForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with OFHM. Reach out for prayer requests, partnership inquiries, or to learn more about our ministries in India.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
    let settings = null;
    try {
        await dbConnect();
        settings = await SiteSettings.findOne({});
    } catch (error) {
        console.error("Database connection error on Contact page:", error);
    }

    const contact = settings?.contact || {
        address: {
            line1: "Dr. Gandham Buli Veerraju",
            line2: "K-Nayakampalli (PO), Via Peddapuram",
            city: "Kakinada District",
            pin: "533437",
            state: "Andhra Pradesh",
            country: "India"
        },
        phone: "+91 9949430413",
        email: "contact@ofhm.org"
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: "Our Location",
            content: `${contact.address.city}, ${contact.address.state}, ${contact.address.country}`,
            href: `https://www.google.com/maps/search/?api=1&query=Our+Father%27s+Home+Ministries+K+Nayakampalli+Andhra+Pradesh`
        },
        {
            icon: Phone,
            title: "Phone Number",
            content: contact.phone,
            href: `tel:${contact.phone.replace(/\s+/g, '')}`
        },
        {
            icon: Mail,
            title: "Email Address",
            content: contact.email,
            href: `mailto:${contact.email}`
        },
    ];

    return (
        <div className="w-full">
            {/* Header */}
            <section className="bg-muted py-24">
                <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl mx-auto space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Get In Touch</h2>
                    <h1 className="text-4xl md:text-6xl font-serif text-foreground">Contact Us</h1>
                    <p className="text-lg text-foreground/70 font-light leading-relaxed">
                        Have a question, prayer request, or want to partner with us? We&apos;d love to hear from you.
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
                                {contactInfo.map((item) => (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        className="flex items-start gap-6 group hover:translate-x-2 transition-transform duration-300"
                                        target={item.icon === MapPin ? "_blank" : undefined}
                                        rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                            <item.icon className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-secondary uppercase tracking-wider text-xs">{item.title}</h4>
                                            <p className="text-foreground/70 text-lg">{item.content}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="pt-8">
                                <div className="bg-muted rounded-[2rem] p-8 space-y-4">
                                    <div className="flex items-center gap-3 text-primary font-bold">
                                        <MessageSquare className="h-5 w-5" />
                                        Prayer Requests
                                    </div>
                                    <p className="text-sm text-foreground/70 italic">
                                        &quot;Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.&quot; — Philippians 4:6
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <ContactForm />
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
