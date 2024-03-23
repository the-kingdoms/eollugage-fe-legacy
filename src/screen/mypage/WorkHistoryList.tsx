import { useGetHistoryList } from "@/hooks/query/history";
import WorkInfoCard from "@modules/components/card/WorkInfoCard";
import FlexBox from "@modules/layout/FlexBox";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { historyToWorkHistory } from "@/libs/historyToWorkHistory";

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
  const { push } = useRouter();
  const { data: historys, isLoading } = useGetHistoryList(memberId);
  const [workHistoryList, setWorkHistoryList] = useState<WorkHistory[]>([]);

  useEffect(() => {
    if (historys && !isLoading) {
      const newWorkHistoryList: WorkHistory[] = historyToWorkHistory(historys);
      setWorkHistoryList(newWorkHistoryList);
    }
  }, [historys]);

  const reversedWorkHistoryList = [...workHistoryList].reverse(); // 최신날짜기준으로 랜더링되도록 넣어놨습니다

  return (
    <FlexBox direction="col" className="w-full px-4 gap-4">
      <FlexBox className="w-full justify-start B3-medium">근무 일지</FlexBox>
      <FlexBox direction="col" className="w-full gap-5">
        {reversedWorkHistoryList.map((workHistory, index) => (
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
