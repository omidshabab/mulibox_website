import { everyDayCards, everyOtherDayCards, everyOtherWeekCards, onceMonthCards, onceWeekCards } from "@/config/cards";
import BoxSection from "./BoxSection";

export enum BoxSectionType {
     one = "EVERY DAY",
     two = "EVERY OTHER DAY",
     three = "ONCE A WEEK",
     four = "EVERY OTHER WEEK",
     five = "ONCE A MONTH",
}

const Box = () => {
     return (
          <div className="grid grid-cols-4 md:grid-cols-10 gap-x-5 gap-y-10">
               {/*
                    -- 1: EVERY DAY --
               */}
               <BoxSection
                    type={BoxSectionType.one}
                    cards={everyDayCards} />

               {/*
                    -- 2: EVERY OTHER DAY --
               */}
               <BoxSection
                    type={BoxSectionType.two}
                    cards={everyOtherDayCards} />

               {/*
                    -- 3: ONCE A WEEK --
               */}
               <BoxSection
                    type={BoxSectionType.three}
                    cards={onceWeekCards} />

               {/*
                    -- 4: EVERY OTHER WEEK --
               */}
               <BoxSection
                    type={BoxSectionType.four}
                    cards={everyOtherWeekCards} />

               {/*
                    -- 5: ONCE A MONTH --
               */}
               <BoxSection
                    type={BoxSectionType.five}
                    cards={onceMonthCards} />
          </div>
     );
}

export default Box;