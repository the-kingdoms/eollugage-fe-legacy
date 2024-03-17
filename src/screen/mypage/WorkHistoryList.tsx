import { useGetHistory } from "@/hooks/query/history";
import WorkInfoCard from "@modules/components/card/WorkInfoCard";
import FlexBox from "@modules/layout/FlexBox";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface WorkHistoryListProps {
  memberId: string;
}

interface WorkHistory {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  workingDays: number;
  workingMinutes: number;
  overtimeMinutes: number;
}

export default function WorkHistoryList({ memberId }: WorkHistoryListProps) {
  const { historys } = useGetHistory(memberId);
  const [workHistoryList, setWorkHistoryList] = useState<WorkHistory[]>([]);
  useEffect(() => {
    if (historys) {
      const newWorkHistoryList: WorkHistory[] = [];
      // historys를 1주일 단위로 묶어서 리스트에 추가
      setWorkHistoryList(newWorkHistoryList);
    }
  }, [historys]);
  return (
    <FlexBox direction="col" className="w-full px-4 gap-4">
      <FlexBox className="w-full justify-start B3-medium">근무 일지</FlexBox>
      <FlexBox direction="col" className="w-full gap-5">
        {workHistoryList.map((workHistory, index) => (
          <WorkInfoCard
            key={index}
            startDate={workHistory.startDate}
            endDate={workHistory.endDate}
            workingDays={workHistory.workingDays}
            workingMinutes={workHistory.workingMinutes}
            overtimeMinutes={workHistory.overtimeMinutes}
          />
        ))}
      </FlexBox>
    </FlexBox>
  );
}
