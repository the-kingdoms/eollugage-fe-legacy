import StateButton from "@modules/components/button/StateButton";
import Profile from "@modules/components/profile/Profile";
import FlexBox from "@modules/layout/FlexBox";
import Icon from "@modules/layout/Icon";
import { useRouter } from "next/router";

interface ApprovalProfileProps {
  name: string;
  position: string;
  time: string;
  buttonstate?: "approve" | "disapprove" | "decline";
  handleonClick?: () => void;
}

export default function ApprovalProfile({
  name,
  position,
  time,
  buttonstate,
  handleonClick,
}: ApprovalProfileProps) {
  const router = useRouter();

  return (
    <FlexBox direction="row" className="w-full justify-betwen">
      <FlexBox direction="row" className="w-full items-start gap-2">
        <Profile name={name} size="S" />
        <FlexBox direction="col" className="gap-1 items-start py-1">
          <div className="B1-medium">{name}</div>
          <FlexBox className="gap-2 B4-regular text-Gray4">
            <div>{position}</div>
            <div>{time}</div>
          </FlexBox>
        </FlexBox>
      </FlexBox>
      {buttonstate ? (
        <StateButton type={buttonstate} onclick={handleonClick} />
      ) : (
        <Icon
          src={"/icon/direction/right.svg"}
          sz={32}
          onClick={() => router.push("/manage/staff")}
        />
      )}
    </FlexBox>
  );
}
