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
            line1: "Pastor Gandham B. V Raju",
            line2: "Nayakampalli Post",
            city: "Peddapuram",
            pin: "533 457",
            state: "Andhra Pradesh",
            country: "INDIA"
        },
        phone: "+91 99494 30413",
        email: "ofhmindia@gmail.com"
    },
    impact: {
        orphans: 1500,
        churches: 150,
        medicalCamps: 750,
        bibles: 12000
    },
    founder: {
        title: "PRESIDENT'S FAMILY",
        name: "Gandham B. V Raju",
        role: "President",
        familyHistory: "In 2010, OUR FATHER'S HOME MINISTRIES was founded by Gandham B. V Raju, who currently holds the position of President. Following the completion of his theological studies and Seminary graduation, Raju cultivated a fervent commitment to reaching out to those who had not yet been reached and providing training for laymen in evangelization. Additionally, he carried a profound sense of responsibility to support the underprivileged and those in need within the community. Raju had been actively engaged various capacities since 1994, even before the official establishment of OUR FATHER'S HOME MINISTRIES.",
        fullTestimony: "I am Pastor Gandham B. V Raju, founder of OFHM India, and I am privileged to share my testimony of God's transforming grace.\n\nBorn into a Hindu family, my early life was centered around idol worship as encouraged by my father. Yet, in the quietness of our home, my mother secretly prayed for our family’s salvation. Her faith was tested when a pastor visiting our home was met with my father's anger and threats. However, she persevered in prayer.\n\nYears later, when my father fell gravely ill and faced the fear of death, my mother's faith became our beacon. She prayed for his healing, promising God that if He restored my father, my father would accept Jesus as his Savior. God, in His mercy, answered. My father was healed, accepted Christ, and dedicated my life to His service.\n\nThough I initially resisted this calling, seeking a secular career and even being selected for the police service, the reminders of my parents and the promptings of the Holy Spirit led me to theological college. There, God confirmed His purpose for my life.\n\nToday, I serve as a pastor, blessed with a wonderful family—my wife and our two sons, Joy Lazarus and Vinod. I invite you to partner with OFHM as we spread God’s Kingdom across India. Your support helps us reach the unreached and serve the marginalized in His name.",
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
