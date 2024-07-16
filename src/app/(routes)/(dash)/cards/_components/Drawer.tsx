import { cn } from '@/lib/utils';
import React from 'react';

interface DrawerProps {
     open: boolean;
     onClose: () => void;
     children?: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ open, onClose, children }) => {
     return (
          <>
               <div
                    className={cn(
                         "w-full fixed top-0 left-0 right-0 bottom-0 bg-primary/5 backdrop-blur-sm transition-opacity duration-700 ease-in-out",
                         open ? "opacity-100 z-0 visible" : "opacity-0 z--1 invisible"
                    )}
                    onClick={onClose}
                    aria-hidden="true"
               />
               <div
                    tabIndex={-1}
                    className={cn(
                         "fixed bottom-0 left-0 right-0 h-min w-full flex flex-col transform transition-transform duration-300 ease-in-out",
                         open
                              ? "visible translate-y-0"
                              : "invisible translate-y-full"
                    )}>
                    <div className="mx-[20px] mb-[20px] bg-primary/5 rounded-[30px] backdrop-blur-xl px-[25px] py-[25px]">
                         {children}
                    </div>
               </div>
          </>
     );
};
