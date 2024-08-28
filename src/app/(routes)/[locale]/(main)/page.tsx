"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import Hero from "./_components/Hero";
import CreateSection from "./_components/CreateSection";
import ManageSection from "./_components/ManageSection";
import AutomateSection from "./_components/AutomateSection";
import FAQ from "./_components/FAQs";
import CTA from "./_components/CTA";
import { Container } from "@/components/craft";
import { BoxIcon, SquareIcon } from "lucide-react";

import gsap from "gsap"
import { useGSAP } from "@gsap/react"

const Page = () => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
    }
  });

  useGSAP(() => {
    gsap.timeline({

    });
  });

  return (
    <>
      {/* <Hero /> */}

      {/* <CreateSection /> */}
      {/* <ManageSection /> */}
      {/* <AutomateSection /> */}

      {/* <FAQ /> */}

      {/* <CTA /> */}
    </>
  );
}

export default Page;
