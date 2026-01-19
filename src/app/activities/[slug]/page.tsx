import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, ShieldCheck, MapPin, Target, Quote } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Activity from "@/models/Activity";

export const dynamic = "force-dynamic";

async function getActivity(slug: string) {
    try {
        await dbConnect();
        const activity = await Activity.findOne({ slug });
        if (!activity) return null;
        return JSON.parse(JSON.stringify(activity));
    } catch (error) {
        console.error("Error fetching activity:", error);
        return null;
    }
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const activity = await getActivity(slug);

    if (!activity) {
        // Simple fallback for the 3 main activities if DB is not seeded
        if (slug === "orphan-care") {
            return <ActivityContent activity={{
                title: "Orphan Care",
                fullDescription: "Since 1994, OFHM has been a sanctuary for children who have lost their parents. We provide more than just a roof; we provide a family, quality education, and spiritual grounding to help these children grow into purpose-filled adults.",
                scripture: { text: "Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress.", reference: "James 1:27" },
                impactSummary: "Over 1500 children supported since inception.",
                currentNeeds: "New school supplies, monthly food rations, and renovation of the dormitory.",
                images: ["/images/orphanage.jpg"]
            }} />;
        }
        return notFound();
    }

    return <ActivityContent activity={activity} />;
}

function ActivityContent({ activity }: { activity: any }) {
    return (
        <div className="w-full">
            {/* Header / Hero */}
            <section className="bg-muted py-24 pb-12">
                <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl mx-auto space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Activity Profile</h2>
                    <h1 className="text-4xl md:text-6xl font-serif text-foreground">{activity.title}</h1>
                    {activity.scripture?.text && (
                        <div className="pt-8 flex flex-col items-center space-y-4">
                            <Quote className="h-8 w-8 text-primary/30" />
                            <p className="text-xl font-serif italic text-foreground/70 max-w-xl">
                                &quot;{activity.scripture.text}&quot;
                            </p>
                            <span className="text-xs font-bold uppercase tracking-widest text-primary">
                                — {activity.scripture.reference}
                            </span>
                        </div>
                    )}
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 pt-12">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Left: Content */}
                        <div className="lg:col-span-2 space-y-12">
                            <div className="aspect-[16/9] rounded-[3rem] overflow-hidden bg-muted border-8 border-white shadow-2xl">
                                {activity.images && activity.images[0] ? (
                                    <img
                                        src={activity.images[0]}
                                        alt={activity.title}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-foreground/20 italic">No image provided</div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-3xl font-serif text-secondary">About This Program</h3>
                                <p className="text-foreground/70 leading-relaxed text-lg whitespace-pre-line">
                                    {activity.fullDescription}
                                </p>
                            </div>

                            {/* Gallery if more images exist */}
                            {activity.images && activity.images.length > 1 && (
                                <div className="grid grid-cols-2 gap-4">
                                    {activity.images.slice(1).map((img: string, i: number) => (
                                        <div key={i} className="aspect-square rounded-3xl overflow-hidden shadow-lg">
                                            <img src={img} alt={`${activity.title} ${i + 2}`} className="object-cover w-full h-full hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right: Sidebar Info */}
                        <div className="space-y-8">
                            <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-primary/10 border border-border/50 sticky top-32">
                                <h4 className="text-xl font-serif text-secondary mb-6 flex items-center gap-2">
                                    <Target className="h-5 w-5 text-primary" /> Current Status
                                </h4>

                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Impact So Far</label>
                                        <p className="text-foreground/70 font-medium">{activity.impactSummary || "Supporting countless lives across the region."}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Urgent Needs</label>
                                        <p className="text-foreground/70 font-medium">{activity.currentNeeds || "Your prayers and financial support enable this mission."}</p>
                                    </div>

                                    <div className="pt-8 border-t border-muted space-y-4">
                                        <Link
                                            href={`/donate?fund=${activity.slug}`}
                                            className="w-full py-5 bg-primary text-white rounded-full flex items-center justify-center gap-2 text-lg font-medium shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                                        >
                                            <Heart className="h-5 w-5" /> Support This Activity
                                        </Link>
                                        <p className="text-center text-[10px] text-foreground/40 flex items-center justify-center gap-1">
                                            <ShieldCheck className="h-3 w-3" /> Secure SSL Encrypted Donation
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-secondary p-8 rounded-[3rem] text-white space-y-6">
                                <h4 className="text-xl font-serif flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-primary" /> Location
                                </h4>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    This program is primarily active in the rural and tribal regions of Andhra Pradesh, India.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
