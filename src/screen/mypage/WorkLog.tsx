import WorkInfoCard from "@modules/components/card/WorkInfoCard";
import FlexBox from "@modules/layout/FlexBox";
import dayjs from "dayjs";

export default function WorkLog() {
  const startDate = dayjs().startOf("week");
  const endDate = dayjs().endOf("week");
  return (
    <FlexBox direction="col" className="w-full px-4 gap-5">
      <FlexBox className="w-full justify-start B3-medium">근무 일지</FlexBox>
      <WorkInfoCard
        startDate={startDate}
        endDate={endDate}
        workingDays={3}
        workingMinutes={20}
        overtimeMinutes={0}
      />
      <WorkInfoCard
        startDate={startDate}
        endDate={endDate}
        workingDays={3}
        workingMinutes={20}
        overtimeMinutes={0}
      />
    </FlexBox>
  );
}
