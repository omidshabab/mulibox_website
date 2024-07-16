"use client"

import React, { useRef, useState, useEffect, forwardRef } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import ReactCardFlip from "react-card-flip";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, CheckIcon, FlipHorizontalIcon, HistoryIcon, PlusIcon, X } from "lucide-react";
import IconButton from "@/components/IconButton";
import { Delete, EditSquare } from "react-iconly";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { CardListFilter, CardType } from "@/lib/cards";
import CardItem from "@/components/CardItem";
import { Card, NewCardParams } from "@/lib/db/schema/cards";
import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { getCardHistory } from '../../lib/api/cards/queries';

const CardDialogContent = forwardRef(({
     cards = [],
     index,
     type,
}: {
     cards?: Card[],
     index?: number,
     type?: CardListFilter
}, ref) => {
     const [activeIndex, setActiveIndex] = useState(cards.length);

     const [front, setFront] = useState<string>(cards[index ?? activeIndex]?.front);
     const [back, setBack] = useState<string>(cards[index ?? activeIndex]?.back);
     const [checked, setChecked] = useState<boolean | null>();
     const [editMode, setEditMode] = useState<boolean>(false);
     const [isFlipped, setIsFlipped] = useState<boolean>(false);
     const [showHistory, setShowHistory] = useState(false);
     const [activeCardHistory, setActiveCardHistory] = useState<undefined | null>();

     const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
     const containerRef = useRef<HTMLDivElement | null>(null);

     const cardWidth = 250;
     const activeCardWidth = 270;
     const cardXMargin = 5;
     const activeCardXMargin = 25;

     const initOffset = ((activeCardWidth + (cardWidth * (cards.length - 1))) / 2) - (activeCardWidth / 2)
     const offsetX = useMotionValue(initOffset);

     const animatedX = useSpring(offsetX, {
          damping: 20,
          stiffness: 50,
     });

     const canScrollNext = activeIndex > 0;
     const canScrollPrev = activeIndex < cards.length - 1;

     function scrollPrev() {
          if (!canScrollPrev) return;

          if (isFlipped) handleFlip()
          if (editMode) handleEditMode()
          setChecked(null)

          setActiveIndex((prev: number) => prev + 1);
     }

     function scrollNext() {
          if (!canScrollNext) return;

          if (isFlipped) handleFlip()
          if (editMode) handleEditMode()
          setChecked(null)

          setActiveIndex((prev: number) => prev - 1);
     }

     const handleFlip = () => setIsFlipped(!isFlipped);
     const handleEditMode = () => setEditMode(!editMode);
     const handleShowHistory = () => setShowHistory(!showHistory);

     const collection = trpc.collections.getDefaultCollection.useQuery().data?.collection;

     const utils = trpc.useUtils();

     const onSuccess = async (action: "create" | "update" | "delete", data?: { error?: string, card: Card }) => {
          if (data?.error) {
               toast.error(data.error);
               return;
          }

          await utils.cards.getCards.invalidate();
          await utils.cards.getCardHistory.invalidate()

          action === "create" && setActiveIndex(cards.length)
     };

     const onError = async (action: "create" | "update" | "delete", data?: { error?: string }) => {
          if (data?.error) {
               toast.error(data.error);
               return;
          }

          toast.error(`Card ${action} failed!`);
     };

     const { mutate: createCard, isLoading: isCreating } = trpc.cards.createCard.useMutation({
          onSuccess: (data) => onSuccess("create", data),
          onError: (err) => onError("create", { error: err.message }),
     });

     const { mutate: updateCard, isLoading: isUpdating } = trpc.cards.updateCard.useMutation({
          onSuccess: () => onSuccess("update"),
          onError: (err) => onError("update", { error: err.message }),
     });

     const { mutate: deleteCard, isLoading: isDeleting } = trpc.cards.deleteCard.useMutation({
          onSuccess: () => onSuccess("delete"),
          onError: (err) => onError("delete", { error: err.message }),
     });

     const { mutate: updateCardHistory, isLoading: isHistoryUpdating } = trpc.cards.updateCardHistory.useMutation({
          onSuccess: () => onSuccess("update"),
          onError: (err) => onError("update", { error: err.message }),
     });

     const handleAddCard = () => {
          if (collection) {
               const newCardParams: NewCardParams = { front: "front", back: "back", collectionId: collection.id }

               createCard(newCardParams);
          }
     };

     const handleDeleteCard = (cardId: string) => {
          deleteCard({ id: cardId })

          setActiveIndex(cards.length - 1)
     }

     const handleWrapperClick = (onClick: VoidFunction) => {
          !(isCreating || isUpdating || isHistoryUpdating || isDeleting) && onClick()
     };

     useEffect(() => {
          if (index && index > 0) setActiveIndex(index)

          if (index === 0) setActiveIndex(0)

          if (!(cards.length > 0)) {
               setShowHistory(false)
          }
     }, [index])

     useEffect(() => {
          const activeCard = itemsRef.current[activeIndex];
          const container = containerRef.current;

          if (activeCard && container) {
               const { width: cardWidth } = activeCard.getBoundingClientRect();
               const { width: containerWidth } = container.getBoundingClientRect();
               const offset = initOffset - ((cardWidth + activeCardXMargin) * activeIndex);

               offsetX.set(-offset);
          }
     }, [activeIndex, initOffset, offsetX]);

     const cardHistory = trpc.cards.getCardHistory.useQuery({ id: cards[activeIndex]?.id }).data?.history

     const now = new Date();

     const daysSinceLastReview = (cardHistory && cardHistory[cardHistory.length - 1]) && Math.floor(
          (now.getTime() - new Date(cardHistory[cardHistory.length - 1].date).getTime()) /
          (1000 * 60 * 60 * 24)
     );

     return (
          <div
               className="relative flex flex-col sm:flex-grow w-full h-full overflow-hidden">
               <div className={cn(
                    "pl-0 flex flex-col flex-grow w-full",
                    showHistory && "pl-[350px]"
               )}>
                    <div className="flex justify-between md:justify-center items-center px-[25px] py-[25px] gap-x-[20px]">
                         <div className="group/close-button flex flex-col justify-center items-center gap-y-[10px] text-center">
                              <DialogPrimitive.Close className="focus:outline-none">
                                   <IconButton icon={X} />
                              </DialogPrimitive.Close>
                              <p className="w-full text-[15px] text-text font-semibold opacity-30 group-hover/close-button:opacity-100 transition-all duration-500 leading-[1.0rem]">
                                   Close
                              </p>
                         </div>

                         {type === CardListFilter.all && (
                              <div
                                   onClick={() => handleWrapperClick(() => handleAddCard())}
                                   className={cn(
                                        "group/new-button flex flex-col justify-center items-center gap-y-[10px] text-center",
                                        (isCreating || isUpdating) ? "group-hover/new-button:opacity-50 group-hover/new-button:cursor-not-allowed" : ""
                                   )}>
                                   <IconButton
                                        disabled={isCreating || isUpdating}
                                        icon={PlusIcon}
                                        className={cn(
                                             (isCreating || isUpdating) ? "group-hover/new-button:cursor-not-allowed" : ""
                                        )} />
                                   <p className={cn(
                                        "w-full text-[15px] text-text font-semibold opacity-30 group-hover/new-button:opacity-100 transition-all duration-500 leading-[1.0rem]",
                                        (isCreating || isUpdating) ? "group-hover/new-button:opacity-30 group-hover/new-button:cursor-not-allowed" : ""
                                   )}>
                                        New
                                   </p>
                              </div>
                         )}
                    </div>

                    {cards.length > 0 ? (
                         <>
                              <AnimatePresence>
                                   <div className="flex flex-grow items-center">
                                        <div className="flex flex-col w-full gap-y-[30px] items-center">
                                             <motion.div
                                                  ref={containerRef}
                                                  style={{
                                                       x: animatedX,
                                                  }}
                                                  className="flex w-max items-end justify-center">
                                                  {cards.map((card, index) => {
                                                       const active = index === activeIndex;

                                                       return (
                                                            <React.Fragment key={index}>
                                                                 <motion.div
                                                                      key={index}
                                                                      initial={{
                                                                           scale: 0.9,
                                                                      }}
                                                                      animate={{
                                                                           scale: active ? 1.0 : 0.9,
                                                                      }}
                                                                      ref={(element) => {
                                                                           itemsRef.current[index] = element;
                                                                      }}
                                                                      className={cn(
                                                                           "mx-0",
                                                                           active && "mx-[10px] sm:mx-[25px]"
                                                                      )}>

                                                                      <div
                                                                           key={index}
                                                                           className="flex flex-col items-end justify-end gap-y-[10px]">
                                                                           {active && (
                                                                                <div className="flex gap-x-[5px] items-end">
                                                                                     {(cardHistory && cardHistory.length > 0) && (
                                                                                          <div onClick={() => handleShowHistory()}
                                                                                               className={cn(
                                                                                                    "flex gap-x-[8px] items-center text-text font-medium cursor-pointer hover:opacity-80 bg-primary/5 px-[5px] py-[5px] rounded-full border-[2px] border-primary/10 transition-all duration-500 hover:bg-primary/10 hover:border-primary/20",
                                                                                                    showHistory && "bg-primary/15 border-primary/20 hover:bg-primary/20 hover:border-primary/25",
                                                                                               )}>
                                                                                               <HistoryIcon className="h-[15px] w-[15px]" />
                                                                                          </div>
                                                                                     )}

                                                                                     {((cardHistory && cardHistory.length === 0) || (daysSinceLastReview && daysSinceLastReview < 1)) ? (
                                                                                          <div
                                                                                               onClick={() => handleFlip()}
                                                                                               className={cn(
                                                                                                    "flex gap-x-[8px] items-center text-text font-medium cursor-pointer hover:opacity-80 bg-primary/5 px-[5px] py-[5px] rounded-full border-[2px] border-primary/10 transition-all duration-500 hover:bg-primary/10 hover:border-primary/20",
                                                                                                    isFlipped && "bg-primary/15 border-primary/20 hover:bg-primary/20 hover:border-primary/25",
                                                                                               )}
                                                                                          >
                                                                                               <FlipHorizontalIcon className="h-[15px] w-[15px]" />
                                                                                          </div>
                                                                                     ) : (<></>)}

                                                                                     {!editMode && (
                                                                                          <div
                                                                                               onClick={() => {
                                                                                                    setFront(card.front)
                                                                                                    setBack(card.back)

                                                                                                    setEditMode(true)
                                                                                               }}
                                                                                               className="flex gap-x-[8px] items-center text-[15px] text-text font-medium cursor-pointer hover:opacity-80 bg-primary/5 px-[10px] py-[5px] rounded-full border-[2px] border-primary/10 transition-all duration-500 hover:bg-primary/10 hover:border-primary/20">
                                                                                               <EditSquare style={{ width: "20px", height: "20px" }} />
                                                                                               editing mode
                                                                                          </div>
                                                                                     )}
                                                                                </div>
                                                                           )}

                                                                           <ContextMenu>
                                                                                <ContextMenuTrigger>
                                                                                     {active ? (
                                                                                          <ReactCardFlip
                                                                                               flipDirection="horizontal"
                                                                                               isFlipped={isFlipped}>

                                                                                               <CardItem
                                                                                                    value={editMode ? front : card.front}
                                                                                                    type={CardType.front}
                                                                                                    readOnly={!editMode}
                                                                                                    onChange={(value: any) => setFront(value.currentTarget.value)} />

                                                                                               <CardItem
                                                                                                    value={editMode ? back : card.back}
                                                                                                    type={CardType.back}
                                                                                                    readOnly={!editMode}
                                                                                                    onChange={(value: any) => setBack(value.currentTarget.value)} />
                                                                                          </ReactCardFlip>
                                                                                     ) : (
                                                                                          <div onClick={() => {
                                                                                               if (isFlipped) handleFlip()
                                                                                               if (editMode) handleEditMode()
                                                                                               setChecked(null)

                                                                                               setActiveIndex(index)
                                                                                          }}>
                                                                                               <CardItem
                                                                                                    value={card.front}
                                                                                                    type={CardType.front}
                                                                                                    readOnly={!editMode}
                                                                                                    onChange={(value: any) => setFront(value.currentTarget.value)} />
                                                                                          </div>
                                                                                     )}

                                                                                </ContextMenuTrigger>
                                                                                <ContextMenuContent className="w-auto font-medium">
                                                                                     <ContextMenuItem
                                                                                          onClick={() => handleWrapperClick(() => handleDeleteCard(card.id))}
                                                                                          className="flex gap-x-2 text-text">
                                                                                          <Delete
                                                                                               style={{ width: "16px", height: "16px" }}
                                                                                               stroke="bold" />
                                                                                          Delete
                                                                                     </ContextMenuItem>
                                                                                </ContextMenuContent>
                                                                           </ContextMenu>


                                                                      </div>
                                                                 </motion.div>
                                                            </React.Fragment>
                                                       );
                                                  }).reverse()}
                                             </motion.div>

                                             <div className="text-text font-medium">
                                                  dolor sit amet consectetur
                                             </div>
                                        </div>
                                   </div>
                              </AnimatePresence>

                              <div className="flex justify-center px-[25px] py-[25px] gap-x-[10px]">
                                   {editMode && (
                                        <>
                                             <IconButton
                                                  onClick={() => setEditMode(false)}
                                                  icon={X} />

                                             <IconButton
                                                  onClick={() => {
                                                       if (collection) {
                                                            updateCard({
                                                                 id: cards[activeIndex].id,
                                                                 front: front,
                                                                 back: back,
                                                                 collectionId: cards[activeIndex].collectionId,
                                                            })

                                                            setEditMode(false)
                                                       }
                                                  }}
                                                  icon={CheckIcon} />
                                        </>
                                   )}

                                   {!editMode && (
                                        <>
                                             <IconButton disabled={!canScrollPrev} onClick={scrollPrev} icon={ArrowLeft} />

                                             <IconButton
                                                  icon={X}
                                                  onClick={() => {
                                                       setChecked(false);

                                                       updateCardHistory({ cardId: cards[activeIndex].id, status: false });

                                                       setIsFlipped(true);
                                                  }}
                                                  disabled={isHistoryUpdating ? true : false}
                                                  className={cn(
                                                       (cardHistory && cardHistory[cardHistory.length - 1]?.status === false) && "bg-red-800 bg-opacity-10 border-red-900 border-opacity-15 text-red-800 hover:bg-red-800 hover:bg-opacity-15 hover:border-red-900 hover:border-opacity-20"
                                                  )} />

                                             <IconButton
                                                  icon={CheckIcon}
                                                  onClick={() => {
                                                       setChecked(true);

                                                       updateCardHistory({ cardId: cards[activeIndex].id, status: true });

                                                       setIsFlipped(true);
                                                  }}
                                                  disabled={isHistoryUpdating ? true : false}
                                                  className={cn(
                                                       (cardHistory && cardHistory[cardHistory.length - 1]?.status === true) && "bg-green-800 bg-opacity-10 border-green-900 border-opacity-15 text-green-800 hover:bg-green-800 hover:bg-opacity-15 hover:border-green-900 hover:border-opacity-20"
                                                  )} />

                                             <IconButton disabled={!canScrollNext} onClick={scrollNext} icon={ArrowRight} />
                                        </>
                                   )}
                              </div>
                         </>
                    ) : (
                         <div className="flex w-full h-full justify-center items-center">
                              There is no card
                         </div>
                    )}
               </div>

               {(cards.length > 0) && (
                    <div className={cn(
                         "absolute flex flex-grow flex-col gap-y-[10px] bg-primary/5 max-w-[350px] w-full h-full px-[25px] py-[20px] font-medium text-text backdrop-blur-md -translate-x-full ease-in-out duration-300 z-30",
                         showHistory && "translate-x-0"
                    )}>
                         <div className="flex justify-between items-center">
                              History of this Card
                              <X
                                   onClick={() => setShowHistory(false)}
                                   className="w-[15px] cursor-pointer hover:opacity-50 transition-all duration-500" />
                         </div>

                         {(cardHistory && cardHistory.length > 0) ? cardHistory.map((history, index) => (
                              <div
                                   key={index}
                                   className="text-slate-800 text-[15px] font-normal bg-primary/5 rounded-[10px] px-[15px] py-[10px] cursor-pointer border-[2px] border-text/5 hover:bg-primary/10 transition-all duration-500 hover:border-text/10">
                                   Reviewed at {`${history.date.toLocaleDateString()}`} - <span className="font-semibold">{history.status ? `Checked` : `Wrong`}</span>
                              </div>
                         )) : (
                              <div>
                                   Empty
                              </div>
                         )}
                    </div>
               )}
          </div>
     );
})

export default CardDialogContent;