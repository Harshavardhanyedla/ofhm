import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Activity from "@/models/Activity";

export const dynamic = "force-dynamic";

async function getActivities() {
    try {
        await dbConnect();
        const activities = await Activity.find({}).sort({ order: 1 });
        return JSON.parse(JSON.stringify(activities));
    } catch (error) {
        console.error("Error fetching activities:", error);
        return [];
    }
}

const fallbackActivities = [
    {
        title: "Orphan Care",
        slug: "orphan-care",
        images: ["/images/orphan-care.png"],
        shortDescription: "Providing a loving home, education, and spiritual guidance to children in need since 1994.",
    },
    {
        title: "Old Age & Homeless Widows Care",
        slug: "widow-care",
        images: ["/images/widow-care.png"],
        shortDescription: "Restoring dignity and providing shelter, food, and medical care to elderly widows.",
    },
    {
        title: "Discipleship Training Programs",
        slug: "discipleship-training",
        shortDescription: "Equipping leaders and believers through intensive biblical training and spiritual mentorship.",
    },
    {
        title: "Outreach to Unreached Tribal Villages",
        slug: "tribal-outreach",
        shortDescription: "Taking the message of hope to the most remote and marginalized tribal communities.",
    },
    {
        title: "Eye Medical Care",
        slug: "eye-medical-care",
        shortDescription: "Providing free eye checkups, surgeries, and treatments to prevent avoidable blindness.",
    },
    {
        title: "Free Bible Distributions",
        slug: "bible-distribution",
        shortDescription: "Placing the Word of God in the hands of those who have never owned a Bible.",
    },
    {
        title: "Borewell Projects",
        slug: "borewell-projects",
        shortDescription: "Bringing clean drinking water to remote villages through sustainable borewells.",
    },
    {
        title: "Church Plantation",
        slug: "church-plantation",
        shortDescription: "Establishing vibrant spiritual communities in areas with no gospel presence.",
    },
    {
        title: "Food & Clothes Distribution",
        slug: "food-clothes-distribution",
        shortDescription: "Meeting immediate physical needs of the poor with regular food and clothing drives.",
    },
    {
        title: "Self-Sustainable Projects",
        slug: "self-sustainable-projects",
        shortDescription: "Empowering families through vocational training and small-scale business support.",
    }
];

export default async function ActivitiesPage() {
    const dbActivities = await getActivities();

    // Merge logic: Use DB activity if it exists, otherwise use fallback
    const activities = fallbackActivities.map(fallback => {
        const dbVersion = dbActivities.find((db: any) => db.slug === fallback.slug);
        return dbVersion || fallback;
    });

    // Also include any extra activities from DB that aren't in fallback list
    const extraActivities = dbActivities.filter((db: any) =>
        !fallbackActivities.some(fb => fb.slug === db.slug)
    );

    const finalActivities = [...activities, ...extraActivities];

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="bg-muted py-24 pb-12">
                <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl mx-auto space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Our Programs</h2>
                    <h1 className="text-4xl md:text-6xl font-serif text-foreground leading-tight">
                        Transforming Lives Through <br />
                        <span className="italic font-light">Faith and Compassion</span>
                    </h1>
                    <p className="text-lg text-foreground/70 font-light leading-relaxed max-w-2xl mx-auto">
                        Explore our humanitarian and spiritual activities dedicated to serving the vulnerable and spreading the message of love across India.
                    </p>
                </div>
            </section>

            {/* Activities Grid */}
            <section className="py-24 pt-12">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {finalActivities.map((activity: any) => (
                            <div key={activity.slug} className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-muted shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                    {activity.images && activity.images[0] ? (
                                        <img
                                            src={activity.images[0]}
                                            alt={activity.title}
                                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-muted flex items-center justify-center">
                                            <span className="text-foreground/20 italic">No image available</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-8 flex flex-col flex-1 space-y-4">
                                    <h3 className="text-2xl font-serif text-secondary group-hover:text-primary transition-colors">{activity.title}</h3>
                                    <p className="text-foreground/60 leading-relaxed line-clamp-3">
                                        {activity.shortDescription}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-secondary text-white">
                <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
                    <h2 className="text-3xl md:text-5xl font-serif mb-8">Want to Get Involved?</h2>
                    <p className="text-white/70 text-lg mb-12 font-light leading-relaxed">
                        Whether through prayer, sponsorship, or volunteering, you can be part of this transformative mission.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/donate"
                            className="bg-primary text-white px-10 py-5 rounded-full text-lg font-medium hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                        >
                            Support Our Work
                        </Link>
                        <Link
                            href="/contact"
                            className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-10 py-5 rounded-full text-lg font-medium hover:bg-white hover:text-secondary transition-all"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
