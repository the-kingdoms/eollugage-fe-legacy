import { useGetAllMemberHistoryByDate } from "@/hooks/query/history";
import { getTimeString } from "@/libs/timeValidation";
import WorkInfo from "@/screen/main/WorkInfo";
import FlexBox from "@modules/layout/FlexBox";
import dayjs from "dayjs";

export default function TodayShift() {
  const { data: historyList } = useGetAllMemberHistoryByDate(
    dayjs().format("YYYY-MM-DD"),
  );

  return (
    <FlexBox direction="col" className="w-full gap-4 items-start">
      <div className="H5-bold">금일의 근무</div>
      {historyList?.map(historyInfo => (
        <WorkInfo
          key={historyInfo.id}
          name={historyInfo.relation.member.name}
          position={historyInfo.relation.position}
          time={getTimeString(historyInfo.startTime, historyInfo.endTime)}
          role={historyInfo.relation.role}
        />
      ))}
    </FlexBox>
  );
}
