import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

interface FooterProps {
    settings?: {
        heroStatements: string[];
        footerSummary: string;
        contact: {
            address: {
                line1: string;
                line2: string;
                city: string;
                pin: string;
                state: string;
                country: string;
            };
            phone: string;
            email: string;
        };
    };
}

export default function Footer({ settings }: FooterProps) {
    const summary = settings?.footerSummary || "OUR FATHER'S HOME MINISTRIES, established in July 2010. Led by Dr. Gandham Buli Veerraju, we are dedicated to reaching the unreached and serving the marginalized communities in India.";
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

    return (
        <footer className="bg-muted pt-16 pb-8 border-t">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* About OFHM */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <Image
                                src="/branding/ofhm-logo-mark.png"
                                alt="OFHM Emblem"
                                width={60}
                                height={60}
                                className="h-14 w-auto object-contain"
                            />
                            <Image
                                src="/branding/ofhm-logo-full.png"
                                alt="OFHM Full Logo"
                                width={180}
                                height={54}
                                className="h-10 w-auto object-contain opacity-80"
                            />
                        </div>
                        <p className="text-sm text-foreground/70 leading-relaxed italic">
                            {summary}
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-foreground/50 hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-foreground/50 hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-foreground/50 hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-foreground/50 hover:text-primary transition-colors">
                                <Youtube className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-secondary">Quick Links</h4>
                        <ul className="space-y-2">
                            {['Home', 'About', 'Gallery', 'Sermons', 'Contact', 'Donate'].map((link) => (
                                <li key={link}>
                                    <Link href={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase()}`} className="text-sm text-foreground/70 hover:text-primary transition-colors">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Our Work */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-secondary">Our Work</h4>
                        <ul className="space-y-2">
                            {['Orphan Care', 'Widow Support', 'Education', 'Evangelism', 'Food Relief'].map((item) => (
                                <li key={item}>
                                    <Link href="/gallery" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-secondary">Get In Touch</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start text-sm text-foreground/70">
                                <MapPin className="h-4 w-4 mr-3 mt-1 text-primary shrink-0" />
                                <span>
                                    {contact.address.line1}<br />
                                    {contact.address.line2}<br />
                                    {contact.address.city}-{contact.address.pin}<br />
                                    {contact.address.state}, {contact.address.country}
                                </span>
                            </li>
                            <li className="flex items-center text-sm text-foreground/70">
                                <Phone className="h-4 w-4 mr-3 text-primary shrink-0" />
                                <div className="flex flex-col">
                                    <span>{contact.phone}</span>
                                    <a href="https://wa.me/919949430413" target="_blank" rel="noopener noreferrer" className="text-xs text-[#25D366] font-bold hover:underline">
                                        Chat on WhatsApp
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-center text-sm text-foreground/70">
                                <Mail className="h-4 w-4 mr-3 text-primary shrink-0" />
                                <span className="break-all">{contact.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-foreground/50">
                    <p>© {new Date().getFullYear()} Our Father Home Ministries. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
