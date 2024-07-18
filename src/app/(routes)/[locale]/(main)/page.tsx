"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import Hero from "./_components/Hero";
import CreateSection from "./_components/CreateSection";
import ManageSection from "./_components/ManageSection";
import AutomateSection from "./_components/AutomateSection";
import FAQ from "./_components/FAQs";
import Footer from "@/components/Footer";
import CTA from "./_components/CTA";
import Features from "./_components/Features";

const Page = () => {

  return (
    <ScrollArea className="w-full h-screen">
      <Hero />

      {/* <Features /> */}

      <CreateSection />
      <ManageSection />
      <AutomateSection />

      <FAQ />

      <CTA />

      <Footer />
    </ScrollArea>
  );
}

export default Page;
