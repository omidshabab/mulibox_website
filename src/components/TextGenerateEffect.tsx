"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const TextGenerateEffect = ({
     words,
     bolds,
     className
}: {
     words: string
     bolds: string[]
     className?: string
}) => {
     const [scope, animate] = useAnimate()
     let wordsArray = words.split(' ')

     const tGeneral = useTranslations('general')

     useEffect(() => {
          animate(
               "span",
               {
                    opacity: 1
               },
               {
                    duration: 2,
                    delay: stagger(0.2)
               }
          )
     }, [animate])

     const renderWords = () => {
          return (
               <motion.div ref={scope}>
                    {wordsArray.map((word, idx) => {
                         return (
                              <motion.span
                                   key={word + idx}
                                   className={cn(
                                        bolds.some(index => word === tGeneral(index))
                                             ? "text-black md:opacity-0 inline-flex h-[50px] md:h-[80px] bg-highlight px-[8px] md:px-[10px] -z-1 -rotate-2 transform hover:-translate-y-4 transition duration-400 cursor-pointer"
                                             : "font-bold text-slate-800 md:opacity-0"
                                   )}>
                                   {word}{" "}
                              </motion.span>
                         )
                    })}
               </motion.div>
          )
     }

     return (
          <div className={className}>
               <div className="text-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text leading-[3.8rem] text-[50px] md:text-[80px] font-bold md:leading-[5.5rem] text-transparent cursor-text">
                    {renderWords()}
               </div>
          </div>
     )
}

export default TextGenerateEffect