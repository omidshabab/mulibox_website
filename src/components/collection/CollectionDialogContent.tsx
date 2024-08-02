"use client"

import React, { forwardRef } from "react";
import { Collection } from "@/lib/db/schema/collections";

const CollectionDialogContent = forwardRef(({
     collections = [],
}: {
     collections?: Collection[],
}, ref) => {
     return (
          <div>
               collection dialog content
          </div>
     );
})

export default CollectionDialogContent;