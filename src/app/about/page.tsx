import { Mail } from 'lucide-react';
import { getDocuments } from "@/lib/firestore";
import { IFounder } from "@/models/Founder";
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: "Our Story & Heritage",
    description: "Learn about the history of OFHM, the vision of Pastor Gandham Buli Veerraju, and our decades-long commitment to serving the marginalized communities in India.",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
    let founderData = null;
    try {
        const docs = await getDocuments<IFounder>("founders");
        if (docs.length > 0) founderData = docs[0];
    } catch (error) {
        console.error("Database connection error on About page:", error);
    }

    const founder = founderData || {
        title: "PRESIDENT'S FAMILY",
        name: "Dr. Gandham Buli Veerraju",
        role: "Founder & President",
        familyHistory: "In 2010, OUR FATHER'S HOME MINISTRIES was founded by Dr. Gandham Buli Veerraju, who currently holds the position of President. Following the completion of his theological studies and Seminary graduation, Dr. Gandham cultivated a fervent commitment to reaching out to those who had not yet been reached and providing training for laymen in evangelization. Additionally, he carried a profound sense of responsibility to support the underprivileged and those in need within the community.",
        fullTestimony: "I was born into a Hindu family deeply rooted in idol worship. My mother, however, secretly prayed for the salvation of our family. My father opposed Christianity strongly and once even threatened a pastor who came to share the Gospel at our home. After that incident, my mother lost all fellowship with the church but continued praying faithfully at home for many years.\n\nOne day, my father became critically ill and lost all hope of survival. In his helplessness, my mother asked him to pray and made a vow to God: “If You heal my husband, we will accept You as our Lord and Savior.” God answered that prayer. My father was completely healed and accepted Jesus Christ as his personal Savior. He also dedicated me, his only son, to God’s service.\n\nSoon after, a pastor came to our home, just as God had revealed in a dream to my father. My father was baptized, and through his testimony, our entire family and many in our village came to know Christ.\n\nAs I grew older, I pursued higher studies and even cleared police selection. But God called me into full-time ministry. After fasting and prayer, God confirmed His purpose for my life through His Word (Isaiah 61:1–3; James 1:27). I surrendered my life to His service.\n\nToday, through Our Father’s Home Ministries, we serve people in need and share the love of Christ. We are seeking partners to help advance God’s kingdom.",
        image: "/images/founder.jpg"
    };

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="bg-muted py-24 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl space-y-6">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Heritage & History</h2>
                        <h1 className="text-4xl md:text-6xl font-serif text-foreground">Our Story & Mission</h1>
                        <p className="text-xl text-foreground/70 leading-relaxed font-light">
                            OFHM was founded on the principles of faith and a deep commitment to the unreached.
                        </p>
                    </div>
                </div>
            </section>

            {/* President's Family / History */}
            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-12">
                        <Image
                            src="/branding/ofhm-logo-full.png"
                            alt="Our Father's Home Ministries"
                            width={300}
                            height={90}
                            className="h-20 w-auto object-contain"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">{founder.title}</h2>
                                <h3 className="text-4xl font-serif leading-tight">A Visionary Journey <br /><span className="italic font-light">Since 1994</span></h3>
                                <p className="text-foreground/70 leading-relaxed text-lg whitespace-pre-line">
                                    {founder.familyHistory}
                                </p>
                            </div>

                            <div className="pt-8 border-t border-muted/50 space-y-1">
                                <p className="text-3xl font-serif font-bold text-secondary">{founder.name}</p>
                                <p className="text-primary font-bold uppercase tracking-widest text-xs">{founder.role}</p>
                            </div>
                        </div>
                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-muted p-4 bg-white shadow-2xl">
                            <img
                                src={founder.image}
                                alt={founder.name}
                                className="object-cover w-full h-full rounded-[2rem]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Full Testimony Section */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Personal Testimony</h2>
                            <h3 className="text-4xl font-serif">Journey of Faith</h3>
                        </div>
                        <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-xl space-y-8 border border-border/50">
                            <div className="prose prose-lg max-w-none text-foreground/70 leading-relaxed whitespace-pre-line font-light italic">
                                &quot;{founder.fullTestimony}&quot;
                            </div>
                            <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="space-y-1">
                                    <p className="text-2xl font-serif font-bold text-secondary">{founder.name}</p>
                                    <p className="text-primary font-bold uppercase tracking-widest text-xs">Founder & President</p>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <a href="mailto:contact@ofhm.org" className="flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-full text-sm font-bold shadow-lg hover:bg-primary transition-all">
                                        <Mail className="h-4 w-4" />
                                        Inquiries
                                    </a>
                                    <a href="https://wa.me/919949430413" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full text-sm font-bold shadow-lg hover:opacity-90 transition-all">
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.351c1.554.921 3.447 1.407 5.378 1.408 5.729 0 10.39-4.661 10.393-10.391 0-2.777-1.081-5.388-3.045-7.354-1.964-1.964-4.576-3.045-7.353-3.045-5.73 0-10.391 4.661-10.393 10.391 0 2.016.528 3.987 1.527 5.717l-1.011 3.693 3.784-.992zm11.458-7.733c-.302-.151-1.789-.882-2.066-.982-.277-.1-.478-.151-.68.151-.202.302-.782.982-.958 1.182-.176.201-.352.226-.655.076-.302-.151-1.275-.47-2.428-1.498-.897-.8-1.502-1.788-1.678-2.09-.176-.302-.019-.465.132-.614.135-.135.302-.352.453-.528.151-.176.201-.302.302-.503.1-.201.05-.378-.025-.528-.076-.151-.68-1.636-.932-2.24-.246-.588-.497-.508-.68-.517-.176-.008-.378-.01-.58-.01-.202 0-.528.077-.804.378-.277.302-1.058 1.033-1.058 2.518 0 1.486 1.082 2.921 1.232 3.122.151.201 2.129 3.251 5.158 4.556.72.311 1.282.497 1.722.637.722.23 1.38.197 1.9.12.58-.087 1.789-.731 2.041-1.437.252-.707.252-1.31.176-1.437-.076-.127-.277-.202-.579-.353z" />
                                        </svg>
                                        WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision (Static but refined) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="bg-muted/50 p-12 rounded-[3.5rem] space-y-6">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Our Mission</h2>
                            <h3 className="text-3xl font-serif">To be the hands and feet of Jesus.</h3>
                            <p className="text-foreground/70 font-light leading-relaxed">
                                Our mission is to provide holistic support to orphans, widows, and the poor, addressing their physical, emotional, and spiritual needs through Christ-centered care and community empowerment.
                            </p>
                        </div>
                        <div className="border border-border p-12 rounded-[3.5rem] space-y-6">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-secondary">Our Vision</h2>
                            <h3 className="text-3xl font-serif">A world where every soul feels the love of the Father.</h3>
                            <p className="text-foreground/70 font-light leading-relaxed">
                                We envision a community where the marginalized are uplifted, children are educated, and every person has the opportunity to hear and experience the life-changing message of the Gospel.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
