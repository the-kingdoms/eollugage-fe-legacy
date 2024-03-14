import FlexBox from "@modules/layout/FlexBox";
import RouterWrapper from "../RouterWrapper";

export default function AdminControlBanner() {
  return (
    <RouterWrapper routerdest="/mypage/authority" type="ceo">
      <FlexBox direction="col" className="gap-1 items-start">
        <div className="B5-medium text-neutral-500">권한 설정</div>
        <div className="B4-medium text-zinc-800">
          관리자를 등록해 편리하게 가게를 운영하세요
        </div>
      </FlexBox>
    </RouterWrapper>
  );
}
