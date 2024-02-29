import StateButton from "@modules/components/button/StateButton";
import Profile from "@modules/components/profile/Profile";
import FlexBox from "@modules/layout/FlexBox";
import Icon from "@modules/layout/Icon";

interface ApprovalProfileProps {
  name: string;
  position: string;
  time: string;
  buttonState?: "approve" | "disapprove" | "decline";
  buttonClick?: () => void;
}
export type { ApprovalProfileProps };

export default function ApprovalProfile({
  name,
  position,
  time,
  buttonState,
  buttonClick,
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
      {buttonState ? (
        <StateButton type={buttonState} onclick={buttonClick} />
      ) : (
        <Icon src={"/icon/direction/right.svg"} sz={32} />
      )}
    </FlexBox>
  );
}
