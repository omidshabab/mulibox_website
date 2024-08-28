import * as React from "react";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs));
}

type LayoutProps = {
     children: React.ReactNode;
     className?: string;
};

const Layout = ({ children, className }: LayoutProps) => {
     return (
          <html
               lang="en"
               suppressHydrationWarning
               className={cn("scroll-smooth antialiased focus:scroll-auto", className)}>
               {children}
          </html>
     );
};

type MainProps = {
     children: React.ReactNode;
     className?: string;
     id?: string;
};

const Main = ({ children, className, id }: MainProps) => {
     return (
          <main
               className={cn(
                    // `Main` Specific Styles
                    "max-w-none prose-p:m-0",
                    // General Prose
                    "prose:font-sans prose prose-neutral dark:prose-invert xl:prose-lg",
                    // Prose Headings
                    "prose-headings:font-normal",
                    // Prose Strong
                    "prose-strong:font-semibold",
                    // Inline Links
                    "prose-a:text-foreground/75 prose-a:underline prose-a:decoration-primary/50 prose-a:underline-offset-2 prose-a:transition-all",
                    // Inline Link Hover
                    "hover:prose-a:text-foreground hover:prose-a:decoration-primary",
                    // Blockquotes
                    "prose-blockquote:not-italic",
                    // Pre and Code Blocks
                    "prose-pre:border prose-pre:bg-muted/25 prose-pre:text-foreground",
                    className,
               )}
               id={id}>
               {children}
          </main>
     );
};

// Section Component
type SectionProps = {
     children: React.ReactNode;
     className?: string;
     id?: string;
};

const Section = ({ children, className, id }: SectionProps) => {
     return (
          <section className={cn("py-8 md:py-12", className)} id={id}>
               {children}
          </section>
     );
};

// Container Component
type ContainerProps = {
     children: React.ReactNode;
     className?: string;
     id?: string;
};

const Container = ({ children, className, id }: ContainerProps) => {
     return (
          <div className={cn("mx-auto max-w-6xl", "px-[30px] lg:px-0 z-50", className)} id={id}>
               {children}
          </div>
     );
};

export { Layout, Main, Section, Container };