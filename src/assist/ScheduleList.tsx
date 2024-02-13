import FlexBox from "@modules/layout/FlexBox";
import Icon from "@modules/layout/Icon";
import { useState } from "react";

interface ScheduleListProps {
  name: string;
  position: "manager" | "parttime" | "etc";
  time: string;
}

const style = {
  manager: "red-600",
  parttime: "orange-500",
  etc: "zinc-800",
};

export default function scheduleList({
  name,
  position,
  time,
}: ScheduleListProps) {
  const [selectList, setSelectList] = useState(false);

  const clickList = () => {
    setSelectList(!selectList);
  };

  return (
    <FlexBox
      direction="row"
      className={`w-full h-14 ${selectList ? "" : "pl-12"}`}
    >
      <div
        className={`w-[280px] h-full bg-zinc-800
            items-start gap-1 px-3 py-2.5 flex-col
            ${selectList ? "rounded-l-xl" : "rounded-xl"}`}
        onClick={clickList}
      >
        <div className="B5-regular text-white">{time}</div>
        <div className="B4-regular text-white">{name}</div>
      </div>
      {selectList && (
        <div className="w-12 h-full bg-neutral-600 rounded-r-xl">
          <Icon src={""} sz={24} className="px-3 py-4" />
        </div>
      )}
    </FlexBox>
  );
}

//ICON onClick 추가
