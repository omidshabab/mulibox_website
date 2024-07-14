import { Section, Container } from "@/components/craft";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import {
     Accordion,
     AccordionContent,
     AccordionItem,
     AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { authRoutes } from "@/config/routes";

type FAQItem = {
     question: string;
     answer: string;
     link?: string;
};

const content: FAQItem[] = [
     {
          question: "What is a Leitner Box?",
          answer:
               "A Leitner Box is a simple and effective learning system that uses spaced repetition to help you remember information more effectively. It involves sorting flashcards into different boxes based on how well you know each one.",
     },
     {
          question: "How does Mulibox improve my learning?",
          answer:
               "Mulibox enhances the traditional Leitner Box method by offering features such as progress tracking, smart scheduling, and adaptive learning algorithms. This ensures you review cards at optimal intervals, improving retention and reducing study time.",
     },
     {
          question: "Can I customize my flashcards in Mulibox?",
          answer:
               "Absolutely! Mulibox allows you to create fully customizable flashcards. You can add text, images, and audio to suit your learning style and needs.",
     },
     {
          question: "Is Mulibox available on multiple devices?",
          answer:
               "Yes, Mulibox syncs across all your devices, allowing you to access your flashcards and study progress anytime, anywhere.",
     },
     {
          question: "How does the smart scheduling feature work?",
          answer:
               "Smart scheduling in Mulibox uses intelligent algorithms to analyze your performance and automatically schedule reviews for your cards. This ensures you study efficiently and focus on areas that need the most attention.",
     },
     {
          question: "Is there a cost to use Mulibox?",
          answer:
               "We offer various pricing plans, including a free version with essential features and premium versions with advanced functionalities. Explore our plans to find the one that best suits your needs.",
     },
     {
          question: "How can I get started with Mulibox?",
          answer:
               `Click the "Sign up for Free" button above to register the app and begin your journey to better learning today!`,
     },
];

const FAQ = () => {
     return (
          <Section>
               <Container className="flex flex-col md:flex-row gap-y-[50px] gap-x-[30px]">
                    <div className="flex flex-col max-w-[350px] gap-y-[20px]">
                         <h3 className="!mt-0 text-[30px] md:text-[35px] font-medium text-slate-800 leading-[2.5rem] md:leading-[3rem]">Frequently asked questions</h3>
                         <h4 className="text-slate-600 font-extralight text-[20px] md:text-[22px]">
                              Can&apos;t find the answer you&apos;re looking for? Reach out to our
                              customer support team.
                         </h4>

                         <Link
                              href={authRoutes.default}
                              className="flex gap-x-[5px]">
                              Sign up for Free <ArrowRight className="w-[15px]" />
                         </Link>
                    </div>
                    <div className="not-prose flex flex-col flex-grow w-full gap-4">
                         {content.map((item, index) => (
                              <Accordion key={index} type="single" collapsible>
                                   <AccordionItem value={item.question}>
                                        <AccordionTrigger className="text-left text-[20px] md:text-[25px] font-light text-text">
                                             {item.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-base md:w-3/4 text-[18px] md:text-[22px] font-extralight leading-[1.8rem] md:leading-[2rem] text-slate-600">
                                             {item.answer}
                                             {item.link && (
                                                  <a
                                                       href={item.link}
                                                       className="mt-2 flex w-full items-center opacity-60 transition-all hover:opacity-100"
                                                  >
                                                       Learn more <ArrowUpRight className="ml-1" size="16" />
                                                  </a>
                                             )}
                                        </AccordionContent>
                                   </AccordionItem>
                              </Accordion>
                         ))}
                    </div>
               </Container>
          </Section>
     );
};

export default FAQ;
