"use client"

import CardDialog from "@/components/CardDialog";

const CardDialogProvider = ({
     children
}: {
     children: React.ReactNode
}) => {
     return (
          <CardDialog>
               {children}
          </CardDialog>
     );
}

export default CardDialogProvider;