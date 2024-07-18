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
          title: "Adaptive Learning",
          description:
               "Adjusts to your performance, focusing on areas that need improvement.",
     },
     {
          icon: <Coins className="h-6 w-6" />,
          title: "Time Efficiency",
          description:
               "Spend less time organizing and more time learning.",
     },
     {
          icon: <Coins className="h-6 w-6" />,
          title: "Consistency",
          description:
               "Maintain a regular study routine with minimal effort.",
     },
];

const AutomateSection = () => {
     return (
          <Section>
               <Container className="not-prose">
                    <div className="flex flex-col gap-y-[10px]">
                         <h3 className="text-[30px] md:text-[35px] font-medium text-slate-800">
                              <Balancer>
                                   Automate
                              </Balancer>
                         </h3>
                         <h4 className="text-[20px] md:text-[25px] leading-[2.2rem] md:leading-[2.5rem] font-extralight text-slate-600">
                              <Balancer>
                                   Harness the power of automation to optimize your learning schedule. Mulibox uses smart algorithms to ensure you review the right cards at the right time, maximizing your retention and minimizing your study time.
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

export default AutomateSection;
