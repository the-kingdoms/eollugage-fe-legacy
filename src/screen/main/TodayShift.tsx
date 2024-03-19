import { myAtom, myMemberIdAtom } from "@/data/global";
import { useGetHistoryList } from "@/hooks/query/history";
import WorkInfo from "@/screen/main/WorkInfo";
import FlexBox from "@modules/layout/FlexBox";
import { useAtom } from "jotai";

export default function TodayShift() {
  const [my] = useAtom(myAtom);
  const [myMemberId] = useAtom(myMemberIdAtom);
  const { data: historyList } = useGetHistoryList(myMemberId);

  return (
    <FlexBox direction="col" className="w-full gap-4 items-start">
      <div className="H5-bold">금일의 근무</div>
      {historyList?.map(historyInfo => (
        <WorkInfo
          key={historyInfo.id}
          name={String(my?.name)} // 임시
          position={String(my?.relationList[0].position)} // 임시
          time={`${historyInfo.startTime.slice(0, 5)} ~ ${historyInfo.endTime.slice(0, 5)}`}
        />
      ))}
    </FlexBox>
  );
}
