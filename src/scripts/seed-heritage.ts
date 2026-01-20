import dbConnect from "../lib/mongodb";
import Ministry from "../models/Ministry";
import Impact from "../models/Impact";
import SiteSettings from "../models/SiteSettings";
import Founder from "../models/Founder";

const legacyContent = {
    heroStatements: [
        "There is no other way except God.",
        "We love God.",
        "We believe in God."
    ],
    footerSummary: "OUR FATHER'S HOME MINISTRIES, was established in July 2010. The visionary behind this initiative was Gandham Buli Veerraju, who currently serves as its President. Following his graduation from a Theological Seminary, Veeraju was driven by a passionate desire to reach the unreached and to provide training for laymen, dedicating himself to the discipline of in society through the platform of Our Father's Home Ministries.",
    contact: {
        address: {
            line1: "Dr. Gandham Buli Veerraju",
            line2: "K-Nayakampalli (PO), Via Peddapuram",
            city: "Kakinada District",
            pin: "533437",
            state: "Andhra Pradesh",
            country: "India"
        },
        phone: "+91 9949430413",
        email: "gandhamforchrist@gmail.com"
    },
    impact: {
        orphans: 1500,
        churches: 150,
        medicalCamps: 750,
        bibles: 12000
    },
    founder: {
        title: "PRESIDENT'S FAMILY",
        name: "Dr. Gandham Buli Veerraju",
        role: "President",
        familyHistory: "In 2010, OUR FATHER'S HOME MINISTRIES was founded by Dr. Gandham Buli Veerraju, who currently holds the position of President. Following the completion of his theological studies and Seminary graduation, Dr. Gandham cultivated a fervent commitment to reaching out to those who had not yet been reached and providing training for laymen in evangelization. Additionally, he carried a profound sense of responsibility to support the underprivileged and those in need within the community. Dr. Gandham had been actively engaged in various capacities since 1994, even before the official establishment of OUR FATHER'S HOME MINISTRIES.",
        fullTestimony: "I was born into a Hindu family deeply rooted in idol worship. My mother, however, secretly prayed for the salvation of our family. My father opposed Christianity strongly and once even threatened a pastor who came to share the Gospel at our home. After that incident, my mother lost all fellowship with the church but continued praying faithfully at home for many years.\n\nOne day, my father became critically ill and lost all hope of survival. In his helplessness, my mother asked him to pray and made a vow to God: “If You heal my husband, we will accept You as our Lord and Savior.” God answered that prayer. My father was completely healed and accepted Jesus Christ as his personal Savior. He also dedicated me, his only son, to God’s service.\n\nSoon after, a pastor came to our home, just as God had revealed in a dream to my father. My father was baptized, and through his testimony, our entire family and many in our village came to know Christ.\n\nAs I grew older, I pursued higher studies and even cleared police selection. But God called me into full-time ministry. After fasting and prayer, God confirmed His purpose for my life through His Word (Isaiah 61:1–3; James 1:27). I surrendered my life to His service.\n\nToday, through Our Father’s Home Ministries, we serve people in need and share the love of Christ. We are seeking partners to help advance God’s kingdom.",
        image: "/images/founder.jpg"
    },
    ministries: [
        {
            title: "ORPHAN HOME",
            description: "We are supporting the poor and needy children those who are street, orphan, semi orphan and destitute children by providing them proper food, shelter and Education to lead them to Christ in the fear of the Lord from their childhood in order to be witnessed to our Lord Jesus Christ",
            scriptureText: "Whoever is kind to the poor lends to the LORD and he will reward them for what they have done.",
            scriptureRef: "Proverbs 19:17",
            image: "/images/orphan.jpg",
            impactSummary: "Thousands of Children we Fed",
            order: 1
        },
        {
            title: "CHURCH PLANTING",
            description: "We are proclaiming the Gospel of Jesus Christ among the Hindu people since 14 years, many were saved by accepting Jesus Christ as their personal Saviour.\n\nTherefore, our Primary goal is to focus on preaching the Gospel of Jesus Christ to reach to unreached souls as we are living in the last days. We are preaching Him in the nook and corner villages, mountain villages and where there is no church not been constructed yet to save the perishing souls for Christ. Because is Harvest plenteous but the Laborers are few. We have to finish His task before the Second coming of Jesus Christ.",
            scriptureText: "…. my ambition to preach the gospel where Christ was not known…",
            scriptureRef: "Romans 15:20",
            image: "/images/church.jpg",
            impactSummary: "Hundreds of Churches we Planted",
            order: 2
        },
        {
            title: "WIDOW MINISTRY",
            description: "We always taking care to give the food and shelter for the poor and needy widows and elderly aged people those who doesn't care by someone. We are protecting the hundreds of widows and leading them to Christ in their last days of their lives to make them happy.",
            scriptureText: "…. to look after orphans and widows in their distress and to keep oneself from being polluted by the world.",
            scriptureRef: "James 1:27",
            image: "/images/widow.jpg",
            impactSummary: "Hundreds of Widows care",
            order: 3
        }
    ]
};

async function seed() {
    await dbConnect();

    // Clear existing
    await SiteSettings.deleteMany({});
    await Impact.deleteMany({});
    await Founder.deleteMany({});
    await Ministry.deleteMany({});

    // Seed
    await SiteSettings.create({
        heroStatements: legacyContent.heroStatements,
        footerSummary: legacyContent.footerSummary,
        contact: legacyContent.contact
    });

    await Impact.create(legacyContent.impact);
    await Founder.create(legacyContent.founder);
    await Ministry.insertMany(legacyContent.ministries);

    console.log("Seeding complete!");
    process.exit(0);
}

seed();
