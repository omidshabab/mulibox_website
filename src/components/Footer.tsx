import { useTranslations } from "next-intl";
import { Container, Section } from "./craft";

const Footer = ({
     className
}: {
     className?: string
}) => {
     const tGeneral = useTranslations("general");

     const year = () => new Date().getFullYear()

     return (
          <Section className="py-0 md:py-0">
               <Container className={className}>
                    <div className="flex w-full items-center justify-between gap-x-5 py-[30px]">
                         <div className="flex gap-x-[5px] font-light text-slate-600">{year()} / {tGeneral("muliboxcom")} <span className="hidden sm:block"> - {tGeneral("copyright")}</span></div>
                    </div>
               </Container>
          </Section>
     );
}

export default Footer;