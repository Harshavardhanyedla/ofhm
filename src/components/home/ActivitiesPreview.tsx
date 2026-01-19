"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

const fallbackFeatured = [
    {
        title: "Orphan Care",
        slug: "orphan-care",
        shortDescription: "Providing a loving home, education, and spiritual guidance to children since 1994.",
    },
    {
        title: "Old Age & Homeless Widows Care",
        slug: "widow-care",
        shortDescription: "Restoring dignity and providing shelter, food, and medical care to elderly widows.",
    },
    {
        title: "Borewell Projects",
        slug: "borewell-projects",
        shortDescription: "Bringing clean drinking water to remote villages through sustainable borewells.",
    }
];

export default function ActivitiesPreview() {
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await fetch("/api/activities?featured=true");
                const data = await res.json();

                if (data && data.length > 0) {
                    // Merge logic for preview: Use data if featured, otherwise cap it
                    setActivities(data.slice(0, 6));
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
                                <div className="pt-4 flex items-center justify-between">
                                    <Link
                                        href={`/activities/${activity.slug}`}
                                        className="text-xs font-bold uppercase tracking-widest text-primary hover:opacity-70 transition-opacity"
                                    >
                                        Learn More
                                    </Link>
                                    <Link
                                        href={`/donate?fund=${activity.slug}`}
                                        className="p-3 bg-primary/5 hover:bg-primary text-primary hover:text-white rounded-full transition-all"
                                    >
                                        <Heart className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
