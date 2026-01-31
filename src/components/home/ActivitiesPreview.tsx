"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

const fallbackFeatured = [
    {
        title: "Orphan Care",
        slug: "orphan-care",
        images: ["/images/orphan-care.jpg"],
        shortDescription: "Providing a loving home, education, and spiritual guidance to children in need since 1994.",
    },
    {
        title: "Old Age & Homeless Widows Care",
        slug: "widow-care",
        images: ["/images/widow-care-v2.jpg"],
        shortDescription: "Restoring dignity and providing shelter, food, and medical care to elderly widows.",
    },
    {
        title: "Discipleship Training Programs",
        slug: "discipleship-training",
        images: ["/images/discipleship-training.jpg"],
        shortDescription: "Equipping leaders and believers through intensive biblical training and spiritual mentorship.",
    },
    {
        title: "Outreach to Unreached Tribal Villages",
        slug: "tribal-outreach",
        images: ["/images/tribal-outreach-v4.jpg"],
        shortDescription: "Taking the message of hope to the most remote and marginalized tribal communities.",
    },
    {
        title: "Eye Medical Care",
        slug: "eye-medical-care",
        images: ["/images/eye-medical-care-v3.png"],
        shortDescription: "Providing free eye checkups, surgeries, and treatments to prevent avoidable blindness.",
    },
    {
        title: "Free Bible Distributions",
        slug: "bible-distribution",
        images: ["/images/bible-distribution.png"],
        shortDescription: "Placing the Word of God in the hands of those who have never owned a Bible.",
    },
    {
        title: "Borewell Projects",
        slug: "borewell-projects",
        images: ["/images/borewell-projects.png"],
        shortDescription: "Bringing clean drinking water to remote villages through sustainable borewells.",
    },
    {
        title: "Church Plantation",
        slug: "church-plantation",
        images: ["/images/church-plantation.png"],
        shortDescription: "Establishing vibrant spiritual communities in areas with no gospel presence.",
    },
    {
        title: "Food & Clothes Distribution",
        slug: "food-clothes-distribution",
        images: ["/images/food-distribution.png"],
        shortDescription: "Meeting immediate physical needs of the poor with regular food and clothing drives.",
    },
    {
        title: "Self-Sustainable Projects",
        slug: "self-sustainable-projects",
        images: ["/images/self-sustainable-v2.png"],
        shortDescription: "Empowering families through vocational training and small-scale business support.",
    }
];

export default function ActivitiesPreview() {
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await fetch("/api/activities");
                const data = await res.json();

                if (data && data.length > 0) {
                    // Merge logic: Prioritize code-defined images and info for fallbacks
                    const merged = fallbackFeatured.map(fallback => {
                        const dbVersion = data.find((db: any) => db.slug === fallback.slug);
                        if (dbVersion) {
                            return {
                                ...dbVersion,
                                images: fallback.images,
                                title: fallback.title
                            };
                        }
                        return fallback;
                    });
                    setActivities(merged);
                } else {
                    setActivities(fallbackFeatured);
                }
            } catch (error) {
                console.error("Error fetching activities for preview:", error);
                setActivities(fallbackFeatured);
            } finally {
                setLoading(false);
            }
        };
        fetchActivities();
    }, []);

    if (loading) return (
        <div className="py-24 text-center">
            <p className="text-foreground/30 animate-pulse">Loading amazing activities...</p>
        </div>
    );

    if (!activities || activities.length === 0) return null;

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Our Programs</h2>
                        <h3 className="text-4xl md:text-5xl font-serif text-secondary leading-tight">
                            Impact in <br /> <span className="italic font-light">Every Action</span>
                        </h3>
                    </div>
                    <Link
                        href="/activities"
                        className="inline-flex items-center text-sm font-bold text-primary group"
                    >
                        VIEW ALL ACTIVITIES
                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activities.map((activity: any) => (
                        <div key={activity.slug} className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-muted shadow-sm hover:shadow-xl transition-all duration-500">
                            <div className="aspect-[16/10] overflow-hidden">
                                {activity.images && activity.images[0] ? (
                                    <img
                                        src={activity.images[0]}
                                        alt={activity.title}
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-muted flex items-center justify-center text-foreground/20 italic">No image</div>
                                )}
                            </div>
                            <div className="p-8 space-y-4">
                                <h4 className="text-2xl font-serif text-secondary">{activity.title}</h4>
                                <p className="text-foreground/60 text-sm leading-relaxed line-clamp-2">
                                    {activity.shortDescription}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
