import StaffTimeApproval from "@/screen/manage/StaffTimeApproval";
import StaffTimeInput from "@/screen/manage/StaffTimeInput";
import WeekButtons from "@/screen/manage/WeekButtons";
import DayChip from "@modules/components/chips/DayChip";
import Divider from "@modules/layout/Divider";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";
import dayjs from "dayjs";

export default function Staff() {
  return (
    <div className="bg-Black">
      <TopTitle type="back" />
      <div className="pl-4">
        <div className="text-White H5-medium mt-4">얼루가</div>
        <FlexBox className="mt-1 mb-9 gap-2 text-White B4-regular">
          <span>알바</span>
          <span>010-1234-5678</span>
        </FlexBox>
      </div>
      <div className="rounded-t-2xl bg-White">
        <FlexBox direction="col" className="py-6 px-4 w-full gap-6">
          <WeekButtons />
          <StaffTimeInput
            title="근무시간"
            start={dayjs().format("HHmm")}
            end={dayjs().format("HHmm")}
          />
          <StaffTimeInput
            title="휴게시간"
            start={dayjs().format("HHmm")}
            end={dayjs().format("HHmm")}
          />
        </FlexBox>
        <Divider height={16} />
        <FlexBox direction="col" className="items-start pt-6">
          <div className="text-Gray6 B4-medium mb-4 px-4">출퇴근 기록</div>
          <StaffTimeApproval status="approve" />
          <Divider />
          <StaffTimeApproval status="disapprove" />
        </FlexBox>
      </div>
    </div>
  );
}
