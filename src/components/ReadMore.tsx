"use client"

import {useState} from "react";

const ReadMore = ({
    text
                  }: {
    text: string
}) => {
    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <p className="inline w-[90%] text-zinc-600 font-light leading-[1.8rem]">
            {isReadMore ? text.slice(0, 150) : text}
            <span
                onClick={toggleReadMore}
            className="cursor-pointer font-normal hover:opacity-80 transition-all duration-500">
                {isReadMore ? " ... read more" : " show less"}
            </span>
        </p>
    )
}

export default ReadMore