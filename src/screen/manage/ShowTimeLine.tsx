import { AllHistory } from "@/apis/history";
import { useDeleteHistory } from "@/hooks/query/history";
import { getTimeString } from "@/libs/timeValidation";
import ScheduleList from "@modules/components/list/ScheduleList";
import useDialog from "@modules/hooks/useDialog";
import FlexBox from "@modules/layout/FlexBox";

interface ShowTimeLineProps {
  historyList: AllHistory[] | undefined;
}

export default function ShowTimeLine({ historyList }: ShowTimeLineProps) {
  const { mutate: deleteHistoryMutate } = useDeleteHistory();
  const { openDialog } = useDialog();
  const onClickDeleteBtn = (historyId: string) => {
    openDialog({
      title: "근무 삭제하기",
      discription: "근무를 삭제하시나요?",
      type: "confirm",
      onAction: () => deleteHistoryMutate(historyId),
    });
  };

  const timeSet = new Set(
    historyList?.map(historyInfo => historyInfo.startTime),
  );
  const timeLine = Array.from(timeSet);

  return timeLine.map(time => (
    <FlexBox direction="col" className="w-full" key={time}>
      <FlexBox className="gap-1 w-full justify-start mb-3">
        <div className="C3 text-Gray4">{time.slice(0, 5)}</div>
        <div className="w-full h-px bg-Gray2" />
      </FlexBox>
      <FlexBox direction="col" className="w-full gap-2 mb-3">
        {historyList
          ?.filter(historyInfo => historyInfo.startTime === String(time))
          .map((historyInfo, index) => (
            <ScheduleList
              key={index}
              name={historyInfo.relation.member.name}
              role={historyInfo.relation.role}
              time={getTimeString(historyInfo.startTime, historyInfo.endTime)}
              onDelete={() => onClickDeleteBtn(historyInfo.id)}
            />
          ))}
      </FlexBox>
    </FlexBox>
  ));
}
