// React and Next.js
import React from "react";

// Layout Components
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";

// Icons
import { Coins } from "lucide-react";

type FeatureText = {
     icon: JSX.Element;
     title: string;
     description: string;
};

const featureText: FeatureText[] = [
     {
          icon: <Coins className="h-6 w-6" />,
          title: "Progress Tracking",
          description:
               "Visualize your advancement through detailed analytics.",
     },
     {
          icon: <Coins className="h-6 w-6" />,
          title: "Smart Scheduling",
          description:
               "Automated reminders based on your learning patterns.",
     },
     {
          icon: <Coins className="h-6 w-6" />,
          title: "Sync Across Devices",
          description:
               "Access your flashcards anytime, anywhere.",
     },
];

const ManageSection = () => {
     return (
          <Section>
               <Container className="not-prose">
                    <div className="flex flex-col gap-y-[10px]">
                         <h3 className="text-[30px] md:text-[35px] font-medium text-slate-800">
                              <Balancer>
                                   Manage
                              </Balancer>
                         </h3>
                         <h4 className="text-[20px] md:text-[25px] leading-[2.2rem] md:leading-[2.5rem] font-extralight text-slate-600">
                              <Balancer>
                                   Keep all your flashcards organized and track your progress with our powerful management tools. Never lose track of what you've learned and what needs more practice.
                              </Balancer>
                         </h4>

                         <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-3">
                              {featureText.map(({ icon, title, description }, index) => (
                                   <div className="flex flex-col h-min gap-y-[10px] bg-primary/5 justify-center px-[25px] py-[20px] text-start rounded-[20px] border-[2px] border-primary/10" key={index}>
                                        {icon}
                                        <h4 className="text-[22px] md:text-[28px] text-text font-normal">{title}</h4>
                                        <p className="text-[18px] md:text-[22px] text-slate-600 font-extralight">{description}</p>
                                   </div>
                              ))}
                         </div>
                    </div>
               </Container>
          </Section>
     );
};

export default ManageSection;
