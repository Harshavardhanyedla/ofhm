import dbConnect from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import Impact from "@/models/Impact";
import Hero from "@/components/home/Hero";
import ImpactSection from "@/components/home/ImpactSection";
import MinistriesPreview from "@/components/home/MinistriesPreview";
import DonationAppeal from "@/components/home/DonationAppeal";

export default async function Home() {
  await dbConnect();

  const settings = await SiteSettings.findOne({});
  const impactData = await Impact.findOne({});

  // Fallback data if DB is not seeded yet
  const heroStatements = settings?.heroStatements || ["There is no other way except God."];
  const stats = impactData || {
    orphans: 0,
    churches: 0,
    medicalCamps: 0,
    bibles: 0
  };

  return (
    <div className="w-full">
      <Hero statements={heroStatements} />
      <ImpactSection stats={stats} />
      <MinistriesPreview />
      <DonationAppeal />
    </div>
  );
}
