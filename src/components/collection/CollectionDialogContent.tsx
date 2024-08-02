"use client"

import React, { forwardRef } from "react";
import { Collection } from "@/lib/db/schema/collections";
import ContentWrapper from "../ContentWrapper";

const CollectionDialogContent = forwardRef(({
     collections = [],
}: {
     collections?: Collection[],
}, ref) => {
     return (
          <div className="flex w-full justify-center">
               <ContentWrapper>
                    <div className="w-full bg-primary/5">
                         collection dialog content
                    </div>
               </ContentWrapper>
          </div>
     );
})

export default CollectionDialogContent;