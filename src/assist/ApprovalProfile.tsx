import StateButton from "@modules/components/button/StateButton";
import Profile from "@modules/components/profile/Profile";
import FlexBox from "@modules/layout/FlexBox";

interface ApprovalProfileProps {
  name: string;
  position: string;
  time: string;
  buttonstate: "approve" | "disapprove" | "decline";
  handleonClick: () => void;
}

export default function ApprovalProfile({
  name,
  position,
  time,
  buttonstate,
  handleonClick,
}: ApprovalProfileProps) {
  return (
    <FlexBox direction="row" className="w-full justify-betwen">
      <FlexBox direction="row" className="w-full items-start gap-2">
        <Profile name={name} size="S" />
        <FlexBox direction="col" className="gap-1 items-start py-1">
          <div className="B3-medium">{name}</div>
          <div className="B5-medium text-zinc-400">
            {position}
            {` `}
            {time}
          </div>
        </FlexBox>
      </FlexBox>
      <StateButton type={buttonstate} onclick={handleonClick} />
    </FlexBox>
  );
}
