import DayChip from "@modules/components/chips/DayChip";
import FlexBox from "@modules/layout/FlexBox";
import { useEffect, useState } from "react";

type DayName = "월" | "화" | "수" | "목" | "금" | "토" | "일";
type DayType = "workday" | "inputing" | "inputed" | "inactive";
interface WeekButtonsProps {
  value: string | string[];
  setValue: React.Dispatch<React.SetStateAction<string | string[]>>;
  multiselect: boolean;
}

export default function WeekButtons({
  value,
  setValue,
  multiselect,
}: WeekButtonsProps) {
  interface DayInfo {
    dayName: DayName;
    type: DayType;
  }
  const [dayList, setDayList] = useState<DayInfo[]>([
    {
      dayName: "월",
      type: "inactive",
    },
    {
      dayName: "화",
      type: "inactive",
    },
    {
      dayName: "수",
      type: "inactive",
    },
    {
      dayName: "목",
      type: "inactive",
    },
    {
      dayName: "금",
      type: "inactive",
    },
    {
      dayName: "토",
      type: "inactive",
    },
    {
      dayName: "일",
      type: "inactive",
    },
  ]);

  // DayChip 상태 workday <> inactive Toggle
  const toggleDayType = (i: number) => {
    const tempDayList = [...dayList];
    if (multiselect) {
      tempDayList[i].type =
        dayList[i].type === "workday" ? "inactive" : "workday";
    } else {
      tempDayList.forEach(dayInfo => (dayInfo.type = "inactive"));
      tempDayList[i].type = "workday";
    }
    setDayList(tempDayList);
  };

  useEffect(() => {
    if (multiselect) {
      const activeDayList = dayList
        .filter(dayInfo => dayInfo.type === "workday")
        .map(dayInfo => dayInfo.dayName);
      setValue(activeDayList);
    } else {
      const isWorkDayExists = dayList.find(
        dayInfo => dayInfo.type === "workday",
      );

      if (isWorkDayExists) setValue(isWorkDayExists.dayName);
      else setValue("");
    }
  }, [dayList]);

  return (
    <FlexBox className="justify-between w-full">
      {dayList.map((dayInfo, i) => (
        <DayChip
          day={dayInfo.dayName}
          type={dayInfo.type}
          onChipClick={() => toggleDayType(i)}
        />
      ))}
    </FlexBox>
  );
}
