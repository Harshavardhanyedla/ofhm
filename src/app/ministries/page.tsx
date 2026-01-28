import { getDocuments } from "@/lib/firestore";
import { IMinistry } from "@/models/Ministry";
import MinistriesClient from "@/components/ministries/MinistriesClient";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Our Ministries",
    description: "Explore the core initiatives of OFHM including Orphan Care, Widow Support, and Church Planting. See how we proclaim the Gospel through dedicated service.",
};

export const dynamic = "force-dynamic";

export default async function MinistriesPage() {
    let ministriesData: (IMinistry & { _id: string })[] = [];
    try {
        ministriesData = await getDocuments<IMinistry>("ministries");
        ministriesData.sort((a, b) => (a.order || 0) - (b.order || 0));
    } catch (error) {
        console.error("Database connection error on Ministries page:", error);
    }

    interface MinistryDoc {
        _id: string;
        title: string;
        description: string;
        impactSummary: string;
        scriptureText?: string;
        scriptureRef?: string;
        image: string;
    }

    const fallbackMinistries = [
        {
            id: "orphan-home",
            title: "ORPHAN HOME",
            description: "We are supporting the poor and needy children those who are street, orphan, semi orphan and destitute children by providing them proper food, shelter and Education to lead them to Christ in the fear of the Lord from their childhood in order to be witnessed to our Lord Jesus Christ",
            impactSummary: "Thousands of Children we Fed",
            scriptureText: "Whoever is kind to the poor lends to the LORD and he will reward them for what they have done.",
            scriptureRef: "Proverbs 19:17",
            image: "/images/orphan.jpg",
        },
        {
            id: "church-planting",
            title: "CHURCH PLANTING",
            description: "We are proclaiming the Gospel of Jesus Christ among the Hindu people since 14 years, many were saved by accepting Jesus Christ as their personal Saviour.\n\nTherefore, our Primary goal is to focus on preaching the Gospel of Jesus Christ to reach to unreached souls as we are living in the last days. We are preaching Him in the nook and corner villages, mountain villages and where there is no church not been constructed yet to save the perishing souls for Christ. Because is Harvest plenteous but the Laborers are few. We have to finish His task before the Second coming of Jesus Christ.",
            impactSummary: "Hundreds of Churches we Planted",
            scriptureText: "…. my ambition to preach the gospel where Christ was not known…",
            scriptureRef: "Romans 15:20",
            image: "/images/church.jpg",
        },
        {
            id: "widow-ministry",
            title: "WIDOW MINISTRY",
            description: "We always taking care to give the food and shelter for the poor and needy widows and elderly aged people those who doesn't care by someone. We are protecting the hundreds of widows and leading them to Christ in their last days of their lives to make them happy.",
            impactSummary: "Hundreds of Widows care",
            scriptureText: "…. to look after orphans and widows in their distress and to keep oneself from being polluted by the world.",
            scriptureRef: "James 1:27",
            image: "/images/widow.jpg",
        }
    ];

    const ministries = ministriesData.length > 0
        ? (ministriesData as unknown as MinistryDoc[]).map((m) => ({
            id: m._id.toString(),
            title: m.title,
            description: m.description,
            impactSummary: m.impactSummary,
            scriptureText: m.scriptureText,
            scriptureRef: m.scriptureRef,
            image: m.image,
        }))
        : fallbackMinistries;

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
