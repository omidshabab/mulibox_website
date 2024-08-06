import { CircleDotDashedIcon } from "lucide-react";

const Notification = () => {
     return (
          <div className="flex justify-center items-center gap-x-[15px] px-[15px] py-[15px] bg-primary/[3%] hover:bg-primary/5 rounded-[20px] border-[1px] border-primary/5 transition-all duration-500 cursor-pointer">
               <div className="flex items-center justify-center max-w-max w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] aspect-square text-text rounded-full bg-primary/5 p-[10px]">
                    <CircleDotDashedIcon />
               </div>

               <div className="flex flex-grow">
                    <div className="font-extralight text-[13px] sm:text-[15px] text-slate-600">
                         <span className="font-normal">Steven Paul Jobs</span> invited you to <span className="font-normal">English Flashcards Collection</span>
                    </div>
               </div>
          </div>
     );
}

export default Notification;