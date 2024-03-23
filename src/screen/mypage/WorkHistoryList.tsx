import { useGetHistoryList } from "@/hooks/query/history";
import { historyToWorkHistory, WorkHistory } from "@/libs/historyToWorkHistory";
import WorkInfoCard from "@modules/components/card/WorkInfoCard";
import FlexBox from "@modules/layout/FlexBox";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface WorkHistoryListProps {
  memberId: string;
}

export default function WorkHistoryList({ memberId }: WorkHistoryListProps) {
  const { push } = useRouter();
  const { data: historys, refetch } = useGetHistoryList(memberId);
  const [workHistoryList, setWorkHistoryList] = useState<WorkHistory[]>([]);

  useEffect(() => {
    refetch();
  }, [memberId]);

  useEffect(() => {
    if (historys) {
      const newWorkHistoryList: WorkHistory[] = historyToWorkHistory(historys);
      setWorkHistoryList(newWorkHistoryList);
    }
  }, [historys]);

  return (
    <FlexBox direction="col" className="w-full px-4 gap-4">
      <FlexBox className="w-full justify-start B3-medium">근무 일지</FlexBox>
      <FlexBox direction="col" className="w-full gap-5">
        {workHistoryList.reverse().map((workHistory, index) => (
          <WorkInfoCard
            key={index}
            startDate={workHistory.startDate}
            endDate={workHistory.endDate}
            workingDays={workHistory.workingDays}
            workingMinutes={workHistory.workingMinutes}
            overtimeMinutes={workHistory.overtimeMinutes}
            onClick={() => {
              push("/mypage/detail");
            }}
          />
        ))}
      </FlexBox>
    </FlexBox>
  );
}
