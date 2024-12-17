"use client"

import { useTranslations } from "next-intl";
import { Container } from "./craft";
import {useRouter} from "next/navigation";

type FooterLink = {
    title: string,
    href: string
}

const links: FooterLink[] = [
    {
        title: "sitemap",
        href: "/sitemap"
    },
    {
        title: "community guidelines",
        href: "/guidelines"
    },
    {
        title: "terms of service",
        href: "/terms"
    }
]

const Footer = () => {
    const router = useRouter()

     const tGeneral = useTranslations("general");

     const year = () => new Date().getFullYear()

     return (
               <Container className="w-full">
                    <div className="flex w-full items-center justify-between gap-x-5 py-[30px]">
                         <div className="flex gap-x-[5px] font-light text-slate-600">{year()} / {tGeneral("mulibox_com")} <span className="hidden sm:block"> - {links.map((link: FooterLink, index)=>(
                             <>
                             <span
                                 key={index}
                                 onClick={()=>router.push(link.href)}
                                 className="cursor-pointer hover:opacity-80 transition-all duration-500"
                             >{link.title}</span>
                                 {index !== links.length - 1 && " · "}
                             </>
                         ))}</span></div>
                    </div>
               </Container>
     );
}

export default Footer;