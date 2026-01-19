import Hero from "@/components/home/Hero";
import ImpactSection from "@/components/home/ImpactSection";
import MinistriesPreview from "@/components/home/MinistriesPreview";
import DonationAppeal from "@/components/home/DonationAppeal";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <ImpactSection />
      <MinistriesPreview />
      <DonationAppeal />
    </div>
  );
}
