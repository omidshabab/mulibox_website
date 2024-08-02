"use client"

import CardDialog from "@/components/CardDialog";
import BoxDialog from "@/components/BoxDialog";
import CollectionDialog from "@/components/CollectionDialog";
import StatusDialog from "@/components/StatusDialog";

const Providers = ({
     children
}: {
     children: React.ReactNode
}) => {
     return (
          <BoxDialog>
               <CollectionDialog>
                    <StatusDialog>
                         <CardDialog>
                              {children}
                         </CardDialog>
                    </StatusDialog>
               </CollectionDialog>
          </BoxDialog>
     );
}

export default Providers;