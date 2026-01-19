import dbConnect from "../lib/mongodb";
import Activity from "../models/Activity";

const activities = [
    { title: "Orphan Care", slug: "orphan-care" },
    { title: "Old Age & Homeless Widows Care", slug: "widow-care" },
    { title: "Discipleship Training Programs", slug: "discipleship-training" },
    { title: "Outreach to Unreached Tribal Villages", slug: "tribal-outreach" },
    { title: "Eye Medical Care", slug: "eye-medical-care" },
    { title: "Free Bible Distributions", slug: "bible-distribution" },
    { title: "Borewell Projects", slug: "borewell-projects" },
    { title: "Church Plantation", slug: "church-plantation" },
    { title: "Food & Clothes Distribution", slug: "food-clothes-distribution" },
    { title: "Self-Sustainable Projects", slug: "self-sustainable-projects" },
];

async function seedActivities() {
    try {
        await dbConnect();
        console.log("Connected to MongoDB for seeding activities...");

        for (const act of activities) {
            const existing = await Activity.findOne({ slug: act.slug });
            if (!existing) {
                await Activity.create({
                    ...act,
                    shortDescription: `Dedicated program for ${act.title}. Detailed information coming soon.`,
                    fullDescription: `Full details about our ${act.title} program will be updated shortly by our team.`,
                    isFeatured: true,
                    order: activities.indexOf(act),
                });
                console.log(`Created activity: ${act.title}`);
            } else {
                console.log(`Activity already exists: ${act.title}`);
            }
        }

        console.log("Activity seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding activities:", error);
        process.exit(1);
    }
}

seedActivities();
