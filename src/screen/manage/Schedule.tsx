import Calender from "@modules/components/calender/Calender";
import ScheduleList, {
  ScheduleListProps,
} from "@modules/components/list/ScheduleList";
import Divider from "@modules/layout/Divider";
import FlexBox from "@modules/layout/FlexBox";
import dayjs from "dayjs";
import useDialog from "@modules/hooks/useDialog";
import { useState } from "react";
import { useDeleteHistory } from "@/hooks/query/history";

export default function Schedule() {
  const { deleteHistoryMutate, isPending } = useDeleteHistory();
  const schedules: ScheduleListProps[] = [
    { name: "방기연", position: "etc", time: "00:00 ~ 00:00" },
    { name: "방기연", position: "manager", time: "00:00 ~ 00:00" },
    { name: "방기연", position: "parttime", time: "00:00 ~ 00:00" },
  ];
  const { openDialog } = useDialog();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const onClickDeleteBtn = () => {
    openDialog({
      title: "근무 삭제하기",
      discription: "근무를 삭제하시나요?",
      type: "confirm",
      onAction: () => deleteHistoryMutate(""), // 임시
    });
  };

  return (
    <FlexBox direction="col" className="gap-3 w-full">
      <Calender />
      <Divider />
      <FlexBox direction="col" className="w-full px-4 gap-3">
        <FlexBox className="w-full justify-between">
          <FlexBox className="gap-1">
            <div className="H4-bold text-Gray7">{dayjs().format("DD")}</div>
            <div className="B3-medium text-Gray5">{dayjs().format("ddd")}</div>
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
          {schedules.map((plan, index) => (
            <ScheduleList
              key={index}
              name={plan.name}
              position={plan.position}
              time={plan.time}
              onDelete={onClickDeleteBtn}
            />
          ))}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
