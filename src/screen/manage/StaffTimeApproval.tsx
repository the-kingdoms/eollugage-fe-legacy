import FlexBox from "@modules/layout/FlexBox";
import StaffButton from "@modules/components/button/StateButton";

interface StaffTimeApprovalProps {
  status: "approve" | "disapprove" | "decline";
}

export default function StaffTimeApproval({ status }: StaffTimeApprovalProps) {
  return (
    <FlexBox className="w-full justify-between px-4 py-3">
      <div>
        <div className="text-Gray7 B1-medium">00월 00일 (월)</div>
        <div className="B4-regular text-Gray5">00:00 - 00:00</div>
      </div>
      <StaffButton type={status} />
    </FlexBox>
  );
}
