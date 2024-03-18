import { useGetHistoryList } from "@/hooks/query/history";
import WorkInfoBanner from "@modules/components/banner/WorkInfoBanner";
import FlexBox from "@modules/layout/FlexBox";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface WorkHourProps {
  memberId: string;
}

export default function WorkHour({ memberId }: WorkHourProps) {
  const [workingMinutes, setWorkingMinutes] = useState(0);
  const { data: historys } = useGetHistoryList(memberId);
  const currentDate = dayjs().format("MM/DD");
  useEffect(() => {
    if (historys) {
      let newWorkingMinutes = 0;
      historys.forEach(item => {
        const startDate = dayjs(`${item.date}T${item.startTime}`);
        const endDate = dayjs(`${item.date}T${item.endTime}`);
        const diffMinutes = endDate.diff(startDate, "minute");
        newWorkingMinutes += diffMinutes;
      });
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
        {currentDate} 기준
      </FlexBox>
    </FlexBox>
  );
}
