import { cn } from "@/lib/utils";

const IconButton = ({
     icon: Icon,
     className
}: {
     icon: React.ElementType<any, keyof React.JSX.IntrinsicElements>,
     className?: string
}) => {
     return (
          <div className={cn(
               "flex p-2 h-[45px] w-[45px] backdrop-blur-xl items-center justify-center rounded-full border-[3px] border-border/10 cursor-pointer hover:bg-primary/5 text-text right-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none",
               className,
          )}>
               <Icon className="h-6 w-6" />
          </div>
     );
}

export default IconButton;