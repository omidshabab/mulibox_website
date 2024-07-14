import GetStartedButton from "./GetStartedButton";

const CTA = () => {
     return (
          <div className="flex w-full items-center justify-center">
               <div className="flex flex-col items-center justify-center h-full mx-auto max-w-5xl w-full px-[30px] lg:px-0 z-50">
                    <div className="flex flex-col gap-y-[30px] md:gap-y-[50px] py-[50px] md:py-[100px]">
                         <div className="flex flex-col h-min gap-y-[15px]">
                              <div className="leading-[3rem] text-[35px] md:text-[50px] font-bold md:leading-[5rem]">
                                   Revolutionize Your Study Habits, Today
                              </div>

                              <div className="text-[20px] md:text-[30px] leading-[2.2rem] md:leading-[3rem] font-extralight text-slate-600">
                                   Don't miss out on the opportunity to transform the way you learn. Click below to register Mulibox and start mastering your memory.
                              </div>
                         </div>
                         <div className="flex gap-x-10">
                              <div className="flex flex-col gap-y-[10px]">
                                   <GetStartedButton>
                                        Sign up for Free
                                   </GetStartedButton>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default CTA;
