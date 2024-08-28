"use client"

import {cn} from "@/lib/utils";
import {isRTL} from "@/lib/fonts";

interface TextWidgetProps {
    text: string;
    rtlFontClass: string;
    ltrFontClass: string;
}

const TextWidget = ({
    text,
    rtlFontClass,
    ltrFontClass,
}: TextWidgetProps) => {
    return (
        <div className="flex flex-wrap">
            {Array.from(text).map((char, index) => {
                const isCharRTL = isRTL(char);
                const fontClass = isCharRTL ? rtlFontClass : ltrFontClass;

                return (
                    <span
                        key={index}
                        className={cn('m-1', fontClass)}
                    >
            {char}
          </span>
                );
            })}
        </div>
    )
}

export default TextWidget