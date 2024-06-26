import { Mdx } from "@/components/MDXCompnents";
import { allGuides } from "contentlayer/generated";
import { compareDesc } from "date-fns"

const Page = () => {
     const guides = allGuides
          .filter((guide) => guide.published)
          .sort((a, b) => {
               return compareDesc(new Date(a.date), new Date(b.date))
          })


     return (
          <div>
               Guide
               <Mdx code={guides[1].body.code} />
          </div>
     );
}

export default Page;