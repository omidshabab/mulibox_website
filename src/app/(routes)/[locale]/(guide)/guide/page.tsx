import { Container } from "@/components/craft";
import { Input } from "@/components/ui/input";

const Page = () => {
     return (
          <>
               <Container>
                    <div className="flex flex-col gap-y-[45px] py-[50px]">
                         <div className="flex flex-col gap-y-[10px] max-w-[500px]">
                              {/* <div className="text-[22px] text-slate-800">
                                   Guide that provided for how to use leitner box
                              </div> */}
                              {/* <div className="text-[18px] text-slate-600 font-extralight leading-[2rem]">
                                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed commodi nostrum sunt sequi odio consequatur dolor, perspiciatis excepturi dolore dignissimos, fugit, aspernatur.
                              </div> */}
                         </div>
                    </div>

                    <div className="w-full grid grid-cols-3 gap-[15px]">
                         {[1, 2, 3, 4, 5, 6].map((index) => (
                              <div className="w-full border-[1px] border-primary/10 px-[15px] py-[10px] rounded-[15px]">
                                   {index}
                              </div>
                         ))}
                    </div>
               </Container>
          </>
     );
}

export default Page;