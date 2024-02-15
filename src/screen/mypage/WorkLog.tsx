import WorkInfoCard from "@modules/components/card/WorkInfoCard";
import FlexBox from "@modules/layout/FlexBox";
import dayjs from "dayjs";

export default function WorkLog() {
  const startDate = dayjs().startOf("week");
  const endDate = dayjs().endOf("week");
  return (
    <FlexBox direction="col" className="w-full px-4 gap-4">
      <FlexBox className="w-full justify-start B3-medium">근무 일지</FlexBox>
      <FlexBox direction="col" className="w-full gap-5">
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
    </FlexBox>
  );
}
