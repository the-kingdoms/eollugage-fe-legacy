import FlexBox from "@modules/layout/FlexBox";
import StaffButton from "@modules/components/button/StateButton";
import dayjs from "dayjs";
import { StatusType } from "@/apis/_type";

interface StaffTimeApprovalProps {
  status: StatusType;
  starttime: string;
  endtime: string;
  date: string;
}

export default function StaffTimeApproval({
  status,
  starttime,
  endtime,
  date,
}: StaffTimeApprovalProps) {
  return (
    <FlexBox className="w-full justify-between px-4 py-3">
      <div>
        <div className="text-Gray7 B1-medium">
          {dayjs(date).format("MM월 DD일 (ddd)")}
        </div>
        <div className="B4-regular text-Gray5">
          {starttime.split(":").slice(0, 2).join(":")} -{" "}
          {endtime.split(":").slice(0, 2).join(":")}
        </div>
      </div>
      <StaffButton type={status} />
    </FlexBox>
  );
}
