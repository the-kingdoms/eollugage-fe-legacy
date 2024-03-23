import { RoleType } from "@/apis/_type";
import FlexBox from "@modules/layout/FlexBox";

interface WorkInfoProps {
  name: string;
  position: string;
  time: string;
  role: RoleType;
}

const style = {
  MANAGER: "bg-Manager",
  STAFF: "bg-PartTime",
  OWNER: "bg-ETC",
};

export default function WorkInfo({
  name,
  position,
  time,
  role,
}: WorkInfoProps) {
  return (
    <FlexBox className="w-full gap-2 justify-start">
      <div className={`w-1 shrink-0 h-full ${style[role]} rounded-full`} />
      <FlexBox direction="col" className="w-full gap-2.5 items-start">
        <div className="B1-medium">{name}</div>
        <FlexBox className="gap-2">
          <div className="text-Gray4 B4-regular">{position}</div>
          <div className="text-Gray4 B4-regular">{time}</div>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
