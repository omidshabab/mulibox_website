import * as React from "react";
import { SVGProps } from "react";

const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
     <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
     >
          <title>{"ionicons-v5-p"}</title>
          <line
               x1={118}
               y1={304}
               x2={394}
               y2={304}
               style={{
                    fill: "none",
                    stroke: "#000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 44,
               }}
          />
          <line
               x1={118}
               y1={208}
               x2={394}
               y2={208}
               style={{
                    fill: "none",
                    stroke: "#000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 44,
               }}
          />
     </svg>
);
export default MenuIcon;
