import { selectedDateAtom } from "@/data/historyAtom";
import { useGetAllMemberHistoryByDate } from "@/hooks/query/history";
import Calender from "@modules/components/calender/Calender";
import Divider from "@modules/layout/Divider";
import FlexBox from "@modules/layout/FlexBox";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import ShowTimeLine from "./ShowTimeLine";

export default function Schedule() {
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
        <ShowTimeLine historyList={historyList} />
      </FlexBox>
    </FlexBox>
  );
}
