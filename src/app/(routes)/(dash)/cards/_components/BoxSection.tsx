"use client"

import React from "react";
import PreviewCard from "./PreviewCard";
import { BoxSectionType, CardProps } from "@/lib/cards";
import { CompletePart } from "@/lib/db/schema/parts";

const BoxSection = ({
     type,
     parts
}: {
     type: BoxSectionType,
     parts?: Array<CompletePart>
}) => {
     return (
          <div className="col-span-4 md:col-span-2 h-min flex flex-col gap-y-[15px] font-medium text-[15px] text-slate-800">
               {type}
               {parts && parts.length > 0 ? (
                    <>
                         {parts.map((part, index) => (
                              <>
                                   {part && part.cards.map((card, index) => (
                                        <PreviewCard
                                             key={index}
                                             content={card.front} />
                                   ))}

                                   <div key={index} className="w-full h-[15px] rounded-full bg-primary/50" />
                              </>
                         ))}
                    </>
               ) : (
                    <div className="flex justify-center items-center w-full bg-primary/[3%] rounded-[15px] px-[20px] py-[15px] text-center border-[3px] border-primary/10 border-dashed text-text">
                         {type === BoxSectionType.one && (
                              <div className="flex flex-col gap-y-[10px]">
                                   <p className="text-[25px] font-bold opacity-20">
                                        day 1
                                   </p>
                                   <p>
                                        As soon as you review a card, it will appear here.
                                   </p>
                              </div>
                         )}

                         {type === BoxSectionType.two && (
                              <div className="flex flex-col gap-y-[10px]">
                                   <p className="text-[25px] font-bold opacity-20">
                                        day 3
                                   </p>
                                   <p>
                                        Please wait about three days for your Day One cards to appear here.
                                   </p>
                              </div>
                         )}

                         {type === BoxSectionType.three && (
                              <div className="flex flex-col gap-y-[10px]">
                                   <p className="text-[25px] font-bold opacity-20">
                                        day 7
                                   </p>
                                   <p>
                                        Your Day One cards will appear here in approximately seven days.
                                   </p>
                              </div>
                         )}

                         {type === BoxSectionType.four && (
                              <div className="flex flex-col gap-y-[10px]">
                                   <p className="text-[25px] font-bold opacity-20">
                                        day 14
                                   </p>
                                   <p>
                                        Allow around 14 days for your Day One cards to show up here.
                                   </p>
                              </div>
                         )}

                         {type === BoxSectionType.five && (
                              <div className="flex flex-col gap-y-[10px]">
                                   <p className="text-[25px] font-bold opacity-20">
                                        day 30
                                   </p>
                                   <p>
                                        Your Day One cards should be visible here in about 30 days.
                                   </p>
                              </div>
                         )}
                    </div>
               )}
          </div>
     );
}

export default BoxSection;