"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import Hero from "./_components/Hero";

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
      <Hero />
    </>
  );
}

export default Page;
