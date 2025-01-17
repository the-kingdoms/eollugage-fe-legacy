import Profile from "@modules/components/profile/Profile";
import FlexBox from "@modules/layout/FlexBox";

interface ApprovalProfileProps {
  name: string | null;
  position: string;
  phone: string;
}

export default function ApprovalProfile({
  name,
  position,
  phone,
}: ApprovalProfileProps) {
  return (
    <FlexBox direction="row" className="w-full items-start gap-2">
      <Profile name={name} size="S" />
      <FlexBox direction="col" className="gap-1 items-start py-1">
        {name === null ? (
          <div className="B3-medium text-zinc-400">탈퇴한 유저입니다</div>
        ) : (
          <div className="B3-medium">{name}</div>
        )}
        <div className="B5-medium text-zinc-400">
          {position}
          {` `}
          {phone}
        </div>
      </FlexBox>
    </FlexBox>
  );
}

// 임시 수정
