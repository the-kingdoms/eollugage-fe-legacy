import { useGetHistoryList } from "@/hooks/query/history";
import WorkInfo from "@/screen/main/WorkInfo";
import FlexBox from "@modules/layout/FlexBox";

export default function TodayShift() {
  const { data: historyList } = useGetHistoryList();

  return (
    <FlexBox direction="col" className="w-full gap-4 items-start">
      <div className="H5-bold">금일의 근무</div>
      {historyList?.map(historyInfo => (
        <WorkInfo
          name="이름없음"
          position="직책없음"
          time={`${historyInfo.startTime.slice(0, 5)} ~ ${historyInfo.endTime.slice(0, 5)}`}
        />
      ))}
    </FlexBox>
  );
}
