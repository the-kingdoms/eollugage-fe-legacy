import { useGetHistoryList } from "@/hooks/query/history";
import { calculateWorkMinutes } from "@/libs/historyToWorkHistory";
import WorkInfoBanner from "@modules/components/banner/WorkInfoBanner";
import FlexBox from "@modules/layout/FlexBox";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface WorkHourProps {
  memberId: string | null;
}

export default function WorkHour({ memberId }: WorkHourProps) {
  const [workingMinutes, setWorkingMinutes] = useState(0);
  const { data: historys, refetch } = useGetHistoryList(memberId);
  const currentDate = dayjs();

  useEffect(() => {
    refetch();
  }, [memberId]);

  useEffect(() => {
    if (historys) {
      const newWorkingMinutes = calculateWorkMinutes(
        historys.filter(
          item => dayjs(item.date).month() === currentDate.month(),
        ),
      );
      setWorkingMinutes(newWorkingMinutes);
    }
  }, [historys]);

  return (
    <FlexBox direction="col" className="w-full">
      <FlexBox className="w-full justify-between">
        <WorkInfoBanner
          direction="left"
          size="L"
          type="regular"
          workingMinutes={workingMinutes}
        />
      </FlexBox>
      <FlexBox className="w-full justify-end B4-medium text-Gray5 pr-4 mt-2">
        {currentDate.format("MM/DD")} 기준
      </FlexBox>
    </FlexBox>
  );
}
