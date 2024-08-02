"use client"

import React, { forwardRef } from "react";
import { Box } from "@/lib/db/schema/boxes";

const BoxDialogContent = forwardRef(({
     boxes = [],
}: {
     boxes?: Box[],
}, ref) => {
     return (
          <div>
               box dialog content
          </div>
     );
})

export default BoxDialogContent;