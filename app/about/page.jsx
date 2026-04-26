import WhoWeAre from "@/components/sections/WhoWeAre";
import ScrollingMarquee from "@/components/sections/ScrollingMarquee";
import AboutHeader from "@/components/sections/AboutHeader";
import AboutContent from "@/components/sections/AboutContent";

export default function AboutPage() {
  const values = [
    "Teaching",
    "Raising",
    "Innovating",
    "Enriching",
    "Empowering",
  ];

  return (
    <main className="min-h-screen bg-background pt-20">
      <AboutHeader />
      <AboutContent />
      <WhoWeAre />{" "}
      {/* This works perfectly here as the 'Meet the Minister' section */}
      <ScrollingMarquee data={values} />
    </main>
  );
}
