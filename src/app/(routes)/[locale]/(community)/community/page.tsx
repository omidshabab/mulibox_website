import { Container } from "@/components/craft";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const Page = () => {
     return (
          <>
               <Container className="max-w-6xl">
                    <div className="flex flex-col gap-y-[45px] py-[50px]">
                         <div className="flex flex-col gap-y-[10px] max-w-[500px]">
                              <div className="text-[22px] text-slate-800">
                                   Dicover Community-Made Collections
                              </div>
                              <div className="text-[18px] text-slate-600 font-extralight leading-[2rem]">
                                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed commodi nostrum sunt sequi odio consequatur dolor, perspiciatis excepturi dolore dignissimos, fugit, aspernatur.
                              </div>
                         </div>

                         <Input
                              placeholder={`search for resources like "english flashcards"`}
                              className="relative bg-primary/5 rounded-full font-extralight text-[18px] text-text px-[25px] py-[15px] max-w-[550px]" />
                    </div>

                    <div className="w-full">
                         <ScrollArea className="w-full">
                              <div className="w-full grid grid-cols-4 gap-y-[25px] gap-x-[15px]">
                                   {[1, 2, 3, 4, 5, 6].map((index) => (
                                        <div key={index} className="flex flex-col gap-y-[10px] cursor-pointer select-none">
                                             <div className="flex justify-center items-center aspect-square w-full border-[1px] border-primary/10 px-[15px] py-[10px] rounded-[15px]">

                                             </div>

                                             {index}
                                        </div>
                                   ))}
                              </div>
                         </ScrollArea>
                    </div>
               </Container>
          </>
     );
}

export default Page;