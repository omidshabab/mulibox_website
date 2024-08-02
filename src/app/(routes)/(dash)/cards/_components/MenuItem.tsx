"use client"

import IconButton from "@/components/IconButton";

const MenuItem = ({
     icon,
     text,
     onClick,
}: {
     icon: React.ElementType<any, keyof React.JSX.IntrinsicElements>,
     text: string,
     onClick: () => VoidFunction | void,
}) => {
     return (
          <div
               onClick={onClick}
               className="group/close-button w-full flex flex-grow justify-center items-center text-start gap-x-[10px] bg-primary/5 hover:bg-primary/10 px-[10px] py-[10px] rounded-[15px] select-none cursor-pointer">
               <IconButton icon={icon} group="close-button" />
               <p className="w-full text-[15px] text-text font-semibold opacity-50 group-hover/close-button:opacity-100 transition-all duration-500 leading-[1.25rem] line-clamp-2 text-ellipsis">
                    {text}
               </p>
          </div>
     );
}

export default MenuItem;