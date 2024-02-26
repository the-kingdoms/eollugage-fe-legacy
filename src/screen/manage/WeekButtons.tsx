import DayChip from "@modules/components/chips/DayChip";
import FlexBox from "@modules/layout/FlexBox";

export default function WeekButtons() {
  type DayType = "월" | "화" | "수" | "목" | "금" | "토" | "일";
  const dayList: DayType[] = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <FlexBox className="justify-between w-full">
      {dayList.map((day, i) => (
        <DayChip day={day} type="inactive" />
      ))}
    </FlexBox>
  );
}
