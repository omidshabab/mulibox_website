"use client"

import { Container } from "@/components/craft";
import { Squircle } from "corner-smoothing"
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { defaultRoutes } from "@/config/routes";

const Page = () => {
     const router = useRouter();

     return (
          <>
               <Container>
                    <div className="flex flex-col gap-y-[45px] py-[80px]">
                         <div className="flex gap-x-[5px]">
                              <motion.div
                                   initial={{
                                        opacity: 0
                                   }}
                                   whileInView={{
                                        opacity: 1
                                   }}
                                   viewport={{
                                        once: false,
                                        amount: 0.5,
                                   }}
                                   transition={{
                                        ease: "easeInOut",
                                        duration: 0.8,
                                   }}
                                   className="text-[85px] bg-gradient-to-b from-orange-400 to-orange-600 inline-block text-transparent bg-clip-text font-medium tracking-tighter transition-all duration-500">
                                   community
                              </motion.div>
                         </div>
                    </div>
               </Container>

               <Container>
                    <div className="w-full grid grid-cols-3 gap-y-[45px] gap-x-[35px] pb-[50px]">
                         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
                              <motion.div key={index}
                                   initial={{ translateY: 15 * index }}
                                   animate={{ translateY: 0 }}
                                   transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        delay: index * 0.1
                                   }}
                                   onClick={() => router.push(defaultRoutes.community + "/english-cards")}
                                   className="flex flex-col gap-y-[10px] cursor-pointer select-none">
                                   <Squircle cornerRadius={35} borderWidth={1}>
                                        <div className="ugly-child-wrapper relative group flex flex-col justify-center items-center text-start aspect-square w-full border-[1px] border-primary/5 bg-gradient-to-b from-transparent to-primary/5 px-[15px] py-[10px] bg-primary/[3%] hover:bg-primary/5 transition-all duration-500">
                                             <div className="absolute w-full top-[10px] text-[25px] px-[45px] py-[25px] bg-gradient-to-b from-slate-600 to-slate-800 inline-block text-transparent bg-clip-text">
                                                  community
                                             </div>

                                             <div className="flex w-full justify-center items-center">
                                                  <Squircle cornerRadius={20} className="absolute scale-90 w-[280px] h-[150px] bottom-[-35px] bg-primary/[3%] rounded-[20px] backdrop-blur-[2px] group-hover:scale-95 transition-all duration-500">
                                                       <div className="ugly-child-wrapper w-full h-full border-[1px] border-primary/5">

                                                       </div>
                                                  </Squircle>

                                                  <Squircle cornerRadius={20} className="absolute scale-95 w-[280px] h-[150px] bottom-[-45px] bg-primary/[3%] rounded-[20px] backdrop-blur-[2px] group-hover:scale-100 transition-all duration-500">
                                                       <div className="ugly-child-wrapper w-full h-full border-[1px] border-primary/5">

                                                       </div>
                                                  </Squircle>

                                                  <Squircle cornerRadius={20} className="absolute w-[280px] h-[150px] bottom-[-60px] bg-primary/[3%] rounded-[20px] backdrop-blur-[2px] group-hover:scale-105 transition-all duration-500">
                                                       <div className="ugly-child-wrapper w-full h-full border-[1px] border-primary/5">
                                                            <div className="px-[25px] py-[20px] bg-gradient-to-b from-orange-400 to-orange-800 inline-block text-transparent bg-clip-text">
                                                                 community
                                                            </div>
                                                       </div>
                                                  </Squircle>
                                             </div>
                                        </div>
                                   </Squircle>
                              </motion.div>
                         ))}
                    </div>
               </Container>
          </>
     );
}

export default Page;