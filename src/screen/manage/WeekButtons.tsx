import DayChip from "@modules/components/chips/DayChip";
import FlexBox from "@modules/layout/FlexBox";
import { useEffect, useState } from "react";

export type DayName = "월" | "화" | "수" | "목" | "금" | "토" | "일";
type DayType = "workday" | "inputing" | "inputed" | "inactive";
interface WeekButtonsProps {
  activeDays: string | string[];
  setActiveDays: React.Dispatch<React.SetStateAction<string | string[]>>;
  multiselect: boolean;
  weekStartDay: DayName;
}

/**
 * WeekButtons 컴포넌트는 월-일 DayChip을 모두 보여주는 컴포넌트입니다.
 * @param value 선택된 요일 정보. 
 * multiselect=true인 경우 string[]으로/false인 경우 string으로 반환됩니다.
 * @param setValue 선택된 요일에 따라 value를 변경해주는 함수
 * @param multiselect DayChip이 여러 개 선택되는지 여부를 저장. 가능한 경우 true
 * @param weekStartDay 일주일의 시작요일
 * @returns
 * @example 
 * const [activeDays, setActiveDays] = useState<string | string[]>("")
 * <WeekButtons activeDays={activeDays} activeDays={setActiveDays} multiselect weekStartDay="일"
/>
 */

export default function WeekButtons({
  activeDays,
  setActiveDays,
  multiselect,
  weekStartDay,
}: WeekButtonsProps) {
  interface DayInfo {
    dayName: DayName;
    type: DayType;
  }
  const defaultDayList: DayInfo[] = [
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
  ];
  const [dayList, setDayList] = useState<DayInfo[]>(defaultDayList);

  useEffect(() => {
    const dayIndex = dayList.findIndex(
      dayList => dayList.dayName === weekStartDay,
    );
    const newDayList = dayList
      .slice(dayIndex)
      .concat(dayList.slice(0, dayIndex));
    setDayList(newDayList);
  }, [weekStartDay]);

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
      setActiveDays(activeDayList);
    } else {
      const isWorkDayExists = dayList.find(
        dayInfo => dayInfo.type === "workday",
      );

      if (isWorkDayExists) setActiveDays(isWorkDayExists.dayName);
      else setActiveDays("");
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
