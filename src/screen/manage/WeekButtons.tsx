import DayChip from "@modules/components/chips/DayChip";
import FlexBox from "@modules/layout/FlexBox";
import { useEffect, useState } from "react";

export type DayName = "월" | "화" | "수" | "목" | "금" | "토" | "일";
type DayType = "workday" | "inputing" | "inputed" | "inactive";
interface WeekButtonsProps {
  activeDays: string | string[];
  setActiveDays: React.Dispatch<React.SetStateAction<string | string[]>>;
  dayChipClick: (dayInfo: DayInfo) => DayInfo;
  multiselect?: boolean;
  weekStartDay?: DayName;
}

export interface DayInfo {
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

/**
 * WeekButtons 컴포넌트는 월-일 DayChip을 모두 보여주는 컴포넌트입니다.
 * @param value 선택된 요일 정보. 
 * multiselect=true인 경우 string[]으로/false인 경우 string으로 반환됩니다.
 * @param setValue 선택된 요일에 따라 value를 변경해주는 함수
 * @param dayChipClick DayChip을 클릭했을 때 실행되는 함수
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
  dayChipClick,
  multiselect = true,
  weekStartDay = "일",
}: WeekButtonsProps) {
  const [dayList, setDayList] = useState<DayInfo[]>(defaultDayList);

  const chipClick = (i: number) => {
    const updatedDayList = [...dayList];
    if (!multiselect && activeDays.includes(updatedDayList[i].dayName)) {
      updatedDayList.forEach((day, index) => {
        if (activeDays.includes(day.dayName)) {
          updatedDayList[index].type = "inputed";
        } else {
          updatedDayList[index].type = "inactive";
        }
      });
    }
    const toggleDayInfo = dayChipClick(updatedDayList[i]);
    updatedDayList[i] = toggleDayInfo;
    setDayList(updatedDayList);
  };

  useEffect(() => {
    if (typeof activeDays === "string") {
      setDayList(prev => {
        return prev.map(day => {
          if (activeDays === day.dayName) {
            return { ...day, type: "inputed" };
          }
          return { ...day, type: "inactive" };
        });
      });
    } else {
      setDayList(prev => {
        return prev.map(day => {
          if (activeDays.includes(day.dayName)) {
            return { ...day, type: "inputed" };
          }
          return { ...day, type: "inactive" };
        });
      });
    }
  }, [activeDays]);

  useEffect(() => {
    const dayIndex = dayList.findIndex(
      dayInfo => dayInfo.dayName === weekStartDay,
    );
    const newDayList = dayList
      .slice(dayIndex)
      .concat(dayList.slice(0, dayIndex));
    setDayList(newDayList);
  }, [weekStartDay]);

  useEffect(() => {
    const activeDayList = dayList
      .filter(dayInfo => dayInfo.type === "inputed")
      .map(dayInfo => dayInfo.dayName);
    setActiveDays(activeDayList);
  }, []);

  return (
    <FlexBox className="justify-between w-full">
      {dayList.map((dayInfo, i) => (
        <DayChip
          key={i}
          day={dayInfo.dayName}
          type={dayInfo.type}
          onChipClick={() => chipClick(i)}
        />
      ))}
    </FlexBox>
  );
}
