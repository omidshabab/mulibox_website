import React from "react";
import { BoxSectionType } from "./Box";
import { CardProps } from "@/types";
import PreviewCard from "./PreviewCard";

const BoxSection = ({
     type,
     cards
}: {
     type: BoxSectionType,
     cards: Array<CardProps>
}) => {
     return (
          <div className="col-span-4 md:col-span-2 h-min flex flex-col gap-y-[15px] font-medium text-[15px] text-slate-800">
               {type}
               {cards.map((card, index) => (
                    <PreviewCard
                         key={index}
                         content={card.front} />
               ))}
          </div>
     );
}

export default BoxSection;