"use client"

import { cn } from "@/lib/utils";
import { dirByValue, fontByValue } from "@/lib/fonts";

const TextWidget = ({
    text
}: {
    text: string;
}) => {
    return (
        <div
            dir={dirByValue(text)}
            className={cn(
                "flex flex-wrap",
                fontByValue(text)
            )}>
            {text}
        </div>
    )
}

export default TextWidget