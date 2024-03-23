import { selectedDateAtom } from "@/data/historyAtom";
import {
  useDeleteHistory,
  useGetAllMemberHistoryByDate,
} from "@/hooks/query/history";
import { getTimeString } from "@/libs/timeValidation";
import Calender from "@modules/components/calender/Calender";
import ScheduleList from "@modules/components/list/ScheduleList";
import useDialog from "@modules/hooks/useDialog";
import Divider from "@modules/layout/Divider";
import FlexBox from "@modules/layout/FlexBox";
import dayjs from "dayjs";
import { useAtom } from "jotai";

export default function Schedule() {
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

  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
  const onClickCalendar = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
  };
  const { data: historyList } = useGetAllMemberHistoryByDate(
    selectedDate.format("YYYY-MM-DD"),
  );

  return (
    <FlexBox direction="col" className="gap-3 w-full">
      <Calender day={selectedDate} onClick={onClickCalendar} />
      <Divider />
      <FlexBox direction="col" className="w-full px-4 gap-3">
        <FlexBox className="w-full justify-between">
          <FlexBox className="gap-1">
            <div className="H4-bold text-Gray7">
              {selectedDate.format("DD")}
            </div>
            <div className="B3-medium text-Gray5">
              {selectedDate.format("ddd")}
            </div>
          </FlexBox>
          <FlexBox className="gap-4">
            <FlexBox className="gap-1">
              <div className="w-3 h-4 bg-Manager rounded" />
              <div className="B5-medium text-Gray6">매니저</div>
            </FlexBox>
            <FlexBox className="gap-1">
              <div className="w-3 h-4 bg-PartTime rounded" />
              <div className="B5-medium text-Gray6">알바</div>
            </FlexBox>
            <FlexBox className="gap-1">
              <div className="w-3 h-4 bg-Black rounded" />
              <div className="B5-medium text-Gray6">기타</div>
            </FlexBox>
          </FlexBox>
        </FlexBox>
        <FlexBox className="gap-1 w-full justify-start">
          <div className="C3 text-Gray4">00:00</div>
          <div className="w-full h-px bg-Gray2" />
        </FlexBox>
        <FlexBox direction="col" className="w-full gap-2">
          {historyList?.map((historyInfo, index) => (
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
    </FlexBox>
  );
}
