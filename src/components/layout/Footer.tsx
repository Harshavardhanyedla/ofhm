import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-muted pt-16 pb-8 border-t">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* About OFHM */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-serif font-bold text-primary">OFHM</h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                            Our Father Home Ministries is dedicated to serving the spiritual and humanitarian needs of orphans, widows, and the poor, following the footsteps of Christ.
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
                            {['Home', 'About', 'Ministries', 'Sermons', 'Blog', 'Donate'].map((link) => (
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
                                    <Link href="/ministries" className="text-sm text-foreground/70 hover:text-primary transition-colors">
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
                                <span>123 Ministry Lane, Faith City,<br />Zion State, 560001</span>
                            </li>
                            <li className="flex items-center text-sm text-foreground/70">
                                <Phone className="h-4 w-4 mr-3 text-primary shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center text-sm text-foreground/70">
                                <Mail className="h-4 w-4 mr-3 text-primary shrink-0" />
                                <span>info@ofhm.org</span>
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
