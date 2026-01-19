import { Mail } from 'lucide-react';
import dbConnect from "@/lib/mongodb";
import Founder from "@/models/Founder";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Our Story & Heritage",
    description: "Learn about the history of OFHM, the vision of Pastor Gandham Buli Veerraju, and our decades-long commitment to serving the marginalized communities in India.",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
    let founderData = null;
    try {
        await dbConnect();
        founderData = await Founder.findOne({});
    } catch (error) {
        console.error("Database connection error on About page:", error);
    }

    const founder = founderData || {
        title: "PRESIDENT'S FAMILY",
        name: "Gandham B. V Raju",
        role: "President",
        familyHistory: "In 2010, OUR FATHER'S HOME MINISTRIES was founded by Gandham B. V Raju, who currently holds the position of President. Following the completion of his theological studies and Seminary graduation, Raju cultivated a fervent commitment to reaching out to those who had not yet been reached and providing training for laymen in evangelization. Additionally, he carried a profound sense of responsibility to support the underprivileged and those in need within the community.",
        fullTestimony: "I am Pastor Gandham B. V Raju, founder of OFHM India, and I am privileged to share my testimony of God's transforming grace.\n\nBorn into a Hindu family, my early life was centered around idol worship as encouraged by my father. Yet, in the quietness of our home, my mother secretly prayed for our family’s salvation. Her faith was tested when a pastor visiting our home was met with my father's anger and threats. However, she persevered in prayer.\n\nYears later, when my father fell gravely ill and faced the fear of death, my mother's faith became our beacon. She prayed for his healing, promising God that if He restored my father, my father would accept Jesus as his Savior. God, in His mercy, answered. My father was healed, accepted Christ, and dedicated my life to His service.\n\nThough I initially resisted this calling, seeking a secular career and even being selected for the police service, the reminders of my parents and the promptings of the Holy Spirit led me to theological college. There, God confirmed His purpose for my life.\n\nToday, I serve as a pastor, blessed with a wonderful family—my wife and our two sons, Joy Lazarus and Vinod. I invite you to partner with OFHM as we spread God’s Kingdom across India. Your support helps us reach the unreached and serve the marginalized in His name.",
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
                                <p className="text-3xl font-serif font-bold text-secondary">Pastor {founder.name}</p>
                                <p className="text-primary font-bold uppercase tracking-widest text-xs">{founder.role} of OFHM India</p>
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
                                    <p className="text-2xl font-serif font-bold text-secondary">Pastor {founder.name}</p>
                                    <p className="text-primary font-bold uppercase tracking-widest text-xs">Founder of OFHM India</p>
                                </div>
                                <div className="flex gap-4">
                                    <a href="mailto:ofhmindia@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-full text-sm font-bold shadow-lg hover:bg-primary transition-colors">
                                        <Mail className="h-4 w-4" />
                                        Inquiries
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
