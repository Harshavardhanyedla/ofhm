import dbConnect from "@/lib/mongodb";
import Ministry from "@/models/Ministry";
import MinistriesClient from "@/components/ministries/MinistriesClient";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Our Ministries",
    description: "Explore the core initiatives of OFHM including Orphan Care, Widow Support, and Church Planting. See how we proclaim the Gospel through dedicated service.",
};

export default async function MinistriesPage() {
    await dbConnect();
    const ministriesData = await Ministry.find({}).sort({ order: 1 });

    interface MinistryDoc {
        _id: { toString: () => string };
        title: string;
        description: string;
        impactSummary: string;
        scriptureText?: string;
        scriptureRef?: string;
        image: string;
    }

    const ministries = (ministriesData as unknown as MinistryDoc[]).map((m) => ({
        id: m._id.toString(),
        title: m.title,
        description: m.description,
        impactSummary: m.impactSummary,
        scriptureText: m.scriptureText,
        scriptureRef: m.scriptureRef,
        image: m.image,
    }));

    return (
        <div className="w-full">
            {/* Header */}
            <section className="bg-muted py-24 border-b border-border/50">
                <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl mx-auto space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Service to God</h2>
                    <h1 className="text-5xl md:text-7xl font-serif text-foreground">Our Ministries</h1>
                    <p className="text-xl text-foreground/60 font-light leading-relaxed">
                        Proclaiming the Gospel and serving the underprivileged through dedicated Christ-centered initiatives.
                    </p>
                </div>
            </section>

            {/* Content handled by client component for animations */}
            <MinistriesClient ministries={ministries} />
        </div>
    );
}
