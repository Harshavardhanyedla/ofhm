import dbConnect from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import Impact from "@/models/Impact";
import Hero from "@/components/home/Hero";
import ImpactSection from "@/components/home/ImpactSection";
import ActivitiesPreview from "@/components/home/ActivitiesPreview";
import AboutPreview from "@/components/home/AboutPreview";
import GalleryPreview from "@/components/home/GalleryPreview";
import SermonsPreview from "@/components/home/SermonsPreview";
import ContactSection from "@/components/home/ContactSection";
import DonationAppeal from "@/components/home/DonationAppeal";

export const dynamic = "force-dynamic";

export default async function Home() {
  let settings = null;
  let impactData = null;

  try {
    await dbConnect();
    settings = await SiteSettings.findOne({});
    impactData = await Impact.findOne({});
  } catch (error) {
    console.error("Database connection error on Home page:", error);
  }

  // Fallback data if DB is not seeded yet or connection fails
  const heroStatements = settings?.heroStatements || ["There is no other way except God."];
  const stats = impactData || {
    orphans: 1500,
    churches: 150,
    medicalCamps: 750,
    bibles: 12000
  };

  return (
    <div className="w-full">
      <Hero statements={heroStatements} />
      <ImpactSection stats={stats} />
      <ActivitiesPreview />
      <AboutPreview />
      <GalleryPreview />
      <SermonsPreview />
      <ContactSection />
      <DonationAppeal />
    </div>
  );
}
