"use client"

import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import ReactCardFlip from "react-card-flip";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, CheckIcon, FlipHorizontalIcon, HistoryIcon, PlusIcon, X } from "lucide-react";
import IconButton from "@/components/IconButton";
import { EditSquare } from "react-iconly";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { CardListFilter, CardType } from "@/lib/cards";
import CardItem from "@/components/CardItem";
import { Card } from "@/lib/db/schema/cards";
import { DialogOverlay } from "../ui/dialog";

const CardDialogContent = ({
     cards = [],
     index,
     type,
}: {
     cards?: Card[],
     index?: number,
     type?: CardListFilter
}) => {
     const [front, setFront] = useState<string>(
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque ad voluptates nemo ab illo impedit sit ipsa molestias. Doloremque fugit veniam",
     );
     const [back, setBack] = useState<string>("back");
     const [checked, setChecked] = useState<boolean | null>();
     const [editMode, setEditMode] = useState<boolean>(false);
     const [isFlipped, setIsFlipped] = useState<boolean>(false);
     const [showHistory, setShowHistory] = useState(false);
     const [activeIndex, setActiveIndex] = useState(0);

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

     // const addCard = useCardStore((state) => state.addCard);

     const handleAddCard = () => {
          // const newCard: CardProps = {
          //      id: cards.length + 1,
          //      front: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          //      back: "back",
          //      history: [],
          //      createdAt: new Date(),
          //      updatedAt: new Date(),
          // };

          // addCard(newCard);

          // setActiveIndex(cards.length)
     };

     useEffect(() => {
          if (index && index > 0) setActiveIndex(index)

          if (index === 0) setActiveIndex(0)
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

     return (
          <>
               {cards.length > 0 && (
                    <>
                         <DialogOverlay />
                         <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full h-full translate-x-[-50%] translate-y-[-50%] duration-200">
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
                                                       onClick={handleAddCard}
                                                       className="group/new-button flex flex-col justify-center items-center gap-y-[10px] text-center">
                                                       <IconButton icon={PlusIcon} />
                                                       <p className="w-full text-[15px] text-text font-semibold opacity-30 group-hover/new-button:opacity-100 transition-all duration-500 leading-[1.0rem]">
                                                            New
                                                       </p>
                                                  </div>
                                             )}
                                        </div>

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
                                                                                     {index === (activeIndex + 1) && (
                                                                                          <div className="flex gap-x-[5px] items-end">
                                                                                               {showHistory !== null && showHistory !== undefined && (
                                                                                                    <div
                                                                                                         onClick={() => handleShowHistory()}
                                                                                                         className={cn(
                                                                                                              "flex gap-x-[8px] items-center text-text font-medium cursor-pointer hover:opacity-80 bg-primary/5 px-[5px] py-[5px] rounded-full border-[2px] border-primary/10 transition-all duration-500 hover:bg-primary/10 hover:border-primary/20",
                                                                                                              showHistory && "bg-primary/15 border-primary/20 hover:bg-primary/20 hover:border-primary/25",
                                                                                                         )}
                                                                                                    >
                                                                                                         <HistoryIcon className="h-[15px] w-[15px]" />
                                                                                                    </div>
                                                                                               )}

                                                                                               {checked !== null && checked !== undefined && (
                                                                                                    <div
                                                                                                         onClick={() => handleFlip()}
                                                                                                         className={cn(
                                                                                                              "flex gap-x-[8px] items-center text-text font-medium cursor-pointer hover:opacity-80 bg-primary/5 px-[5px] py-[5px] rounded-full border-[2px] border-primary/10 transition-all duration-500 hover:bg-primary/10 hover:border-primary/20",
                                                                                                              isFlipped && "bg-primary/15 border-primary/20 hover:bg-primary/20 hover:border-primary/25",
                                                                                                         )}
                                                                                                    >
                                                                                                         <FlipHorizontalIcon className="h-[15px] w-[15px]" />
                                                                                                    </div>
                                                                                               )}

                                                                                               {!editMode && (
                                                                                                    <div
                                                                                                         onClick={() => setEditMode(true)}
                                                                                                         className="flex gap-x-[8px] items-center text-[15px] text-text font-medium cursor-pointer hover:opacity-80 bg-primary/5 px-[10px] py-[5px] rounded-full border-[2px] border-primary/10 transition-all duration-500 hover:bg-primary/10 hover:border-primary/20"
                                                                                                    >
                                                                                                         <EditSquare style={{ width: "20px", height: "20px" }} />
                                                                                                         editing mode
                                                                                                    </div>
                                                                                               )}
                                                                                          </div>
                                                                                     )}

                                                                                     {index === (activeIndex + 1) ? (
                                                                                          <ReactCardFlip
                                                                                               flipDirection="horizontal"
                                                                                               isFlipped={isFlipped}>

                                                                                               <CardItem
                                                                                                    value={card.front}
                                                                                                    type={CardType.front}
                                                                                                    readOnly={!editMode}
                                                                                                    onChange={(value: any) => setFront(value.currentTarget.value)} />

                                                                                               <CardItem
                                                                                                    value={card.back}
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
                                                            onClick={() => setEditMode(false)}
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
                                                                 setIsFlipped(true);
                                                            }}
                                                            disabled={checked === null && checked === undefined}
                                                            className={cn(
                                                                 checked === false && "bg-red-800 bg-opacity-10 border-red-900 border-opacity-15 text-red-800 hover:bg-red-800 hover:bg-opacity-15 hover:border-red-900 hover:border-opacity-20"
                                                            )} />

                                                       <IconButton
                                                            icon={CheckIcon}
                                                            onClick={() => {
                                                                 setChecked(true);
                                                                 setIsFlipped(true);
                                                            }}
                                                            disabled={(!checked === null && !checked === undefined) ? true : false}
                                                            className={cn(
                                                                 checked === true && "bg-green-800 bg-opacity-10 border-green-900 border-opacity-15 text-green-800 hover:bg-green-800 hover:bg-opacity-15 hover:border-green-900 hover:border-opacity-20"
                                                            )} />

                                                       <IconButton disabled={!canScrollNext} onClick={scrollNext} icon={ArrowRight} />
                                                  </>
                                             )}
                                        </div>
                                   </div>

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

                                        {[1, 2, 3].map((history, index) => (
                                             <div
                                                  key={index}
                                                  className="text-slate-800 text-[15px] font-normal bg-primary/5 rounded-[10px] px-[15px] py-[10px] cursor-pointer border-[2px] border-text/5 hover:bg-primary/10 transition-all duration-500 hover:border-text/10">
                                                  Reviewed at 25 September 2024 - <span className="font-semibold">Checked</span>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         </DialogPrimitive.Content>
                    </>
               )}
          </>
     );
}

export default CardDialogContent;