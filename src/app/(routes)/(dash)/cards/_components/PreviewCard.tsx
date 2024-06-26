import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Delete, EditSquare } from "react-iconly";
import CardDialog from "@/components/CardDialog";
import { cards } from "@/config/cards";

const PreviewCard = ({ content }: { content: string }) => {
  if (content) {
    return (
      <ContextMenu>
        <ContextMenuTrigger>
          {/* <CardDialog index={cards.length - 1} cards={cards}> */}
          <div className="bg-primary/5 border-[2px] border-primary/10 rounded-[15px] px-[20px] py-[15px] text-start hover:bg-primary/10 transition-all duration-500 cursor-pointer text-[18px] font-medium text-text">
            {content}
          </div>
          {/* </CardDialog> */}
        </ContextMenuTrigger>
        <ContextMenuContent className="w-auto font-medium">
          <ContextMenuItem
            onClick={() => { }}
            className="flex gap-x-2 text-slate-800">
            <EditSquare
              style={{ width: "16px", height: "16px" }}
              stroke="bold"
            />
            Edit Card
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => null}
            className="flex gap-x-2 text-text">
            <Delete
              style={{ width: "16px", height: "16px" }}
              stroke="bold"
            />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  } else {
    return null;
  }
};

export default PreviewCard;
