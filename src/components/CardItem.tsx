import { CardType } from "@/lib/cards";
import { dirByValue, englishBricolageGrotesqueFont, fontByValue, isRTL, persianEstedadFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Input } from "antd";
import { ChangeEventHandler } from "react";

const { TextArea } = Input

const CardItem = ({
  value,
  onChange,
  className,
  readOnly = true,
  type = CardType.front
}: {
  value: string,
  onChange: ChangeEventHandler<HTMLTextAreaElement>,
  className?: string,
  readOnly?: boolean,
  type?: CardType
}) => {
  return (
    <div className={cn(
      "w-[250px] h-[350px] border-[2px] border-primary/5 px-[20px] py-[20px] flex justify-center items-center bg-primary/5 rounded-[20px] backdrop-blur-md hover:bg-primary/10 transition-all duration-500 cursor-pointer ease-in-out transform backface-hidden",
      className,
    )}>
      <div className="absolute flex w-full h-full justify-start items-start text-[12px] text-text opacity-50 font-normal px-[10px] py-[10px]">
        <p className="bg-primary/20 px-[8px] py-[2px] rounded-full">
          {type}
        </p>
      </div>

      <TextArea
        dir={dirByValue(value)}
        value={value}
        readOnly={readOnly}
        placeholder={`type ${type} of the card here ...`}
        variant="borderless"
        autoSize={{ maxRows: 10 }}
        maxLength={150}
        onChange={onChange}
        className={cn(
          "text-center text-[18px] leading-[2.0rem] text-ellipsis text-text none-scroll-bar overflow-y-hidden",
          fontByValue(value),
        )}
      />
    </div>
  );
};

export default CardItem;
