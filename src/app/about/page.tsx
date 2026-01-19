import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="bg-muted py-24 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl space-y-6">
                        <h1 className="text-4xl md:text-6xl font-serif text-foreground">Our Story & Mission</h1>
                        <p className="text-xl text-foreground/70 leading-relaxed font-light">
                            Founded on the principles of faith, hope, and love, OFHM has been serving the marginalized communities for over two decades.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Our Mission</h2>
                                <h3 className="text-3xl font-serif">To be the hands and feet of Jesus.</h3>
                                <p className="text-foreground/70 leading-relaxed">
                                    Our mission is to provide holistic support to orphans, widows, and the poor, addressing their physical, emotional, and spiritual needs through Christ-centered care and community empowerment.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-secondary">Our Vision</h2>
                                <h3 className="text-3xl font-serif">A world where every soul feels the love of the Father.</h3>
                                <p className="text-foreground/70 leading-relaxed">
                                    We envision a community where the marginalized are uplifted, children are educated, and every person has the opportunity to hear and experience the life-changing message of the Gospel.
                                </p>
                            </div>
                        </div>
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop"
                                alt="Ministry Work"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Scripture Section */}
            <section className="py-24 bg-primary text-primary-foreground text-center italic">
                <div className="container mx-auto px-4 md:px-6">
                    <blockquote className="max-w-3xl mx-auto space-y-6">
                        <p className="text-2xl md:text-3xl font-serif leading-relaxed">
                            "Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress and to keep oneself from being polluted by the world."
                        </p>
                        <cite className="block text-lg font-medium not-italic opacity-80">— James 1:27</cite>
                    </blockquote>
                </div>
            </section>

            {/* Founder/Father Profile */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                        <div className="md:col-span-1">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                                alt="Founder"
                                className="rounded-full aspect-square object-cover border-4 border-muted p-2"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-6">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">From the Founder</h2>
                            <h3 className="text-3xl font-serif italic">"Faith is not just what we believe, but what we do for the least of these."</h3>
                            <p className="text-foreground/70 leading-relaxed">
                                Rev. John Doe founded OFHM with a simple call to serve. What started as a small local gathering has grown into a global ministry supporting hundreds of families and children. His heart for the poor continues to drive our daily operations and spiritual direction.
                            </p>
                            <div>
                                <p className="font-bold text-lg">Rev. John Doe</p>
                                <p className="text-primary font-medium">Founder & Spiritual Lead</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
