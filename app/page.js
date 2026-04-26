import ContactDispatch from "@/components/sections/ContactDispatch";
import HeroSection from "@/components/sections/Herosection";
import Programs from "@/components/sections/Programs";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import WhatWeDo from "@/components/sections/WhatWeDo";
import WhoWeAre from "@/components/sections/WhoWeAre";
import React from "react";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhoWeAre />
      <WhatWeDo />
      <ProjectShowcase />
      <Programs />
      <ContactDispatch />
    </>
  );
}
