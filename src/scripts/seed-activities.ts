import dbConnect from "../lib/mongodb";
import Activity from "../models/Activity";

const activities = [
    {
        title: "Orphan Care",
        slug: "orphan-care",
        images: ["/images/orphan-care.png"]
    },
    {
        title: "Old Age & Homeless Widows Care",
        slug: "widow-care",
        images: ["/images/widow-care.png"]
    },
    {
        title: "Discipleship Training Programs",
        slug: "discipleship-training",
        images: ["/images/discipleship.png"]
    },
    {
        title: "Outreach to Unreached Tribal Villages",
        slug: "tribal-outreach",
        images: ["/images/tribal-outreach.png"]
    },
    {
        title: "Eye Medical Care",
        slug: "eye-medical-care",
        images: ["/images/eye-care.png"]
    },
    { title: "Free Bible Distributions", slug: "bible-distribution" },
    { title: "Borewell Projects", slug: "borewell-projects" },
    { title: "Church Plantation", slug: "church-plantation", images: ["/images/church.jpg"] },
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
                    shortDescription: `Providing a loving home, education, and spiritual guidance to children since 1994.`,
                    fullDescription: `Full details about our ${act.title} program will be updated shortly by our team.`,
                    isFeatured: true,
                    order: activities.indexOf(act),
                });
                console.log(`Created activity: ${act.title}`);
            } else {
                // Update existing activity with new images if provided
                if (act.images) {
                    existing.images = act.images;
                    await existing.save();
                    console.log(`Updated image for activity: ${act.title}`);
                }
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
