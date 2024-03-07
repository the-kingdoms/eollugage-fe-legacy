import FlexBox from "@modules/layout/FlexBox";
import RouterWrapper from "./RouterWrapper";

export default function CeoBanner() {
  return (
    <RouterWrapper routerdest="/manage/attendance" type="ceo">
      <FlexBox direction="col" className="gap-1 items-start">
        <div className="B5-medium text-neutral-500">출퇴근 관리</div>
        <div className="B4-medium text-zinc-800">
          직원들의 출퇴근을 승인 및 거절해보세요
        </div>
      </FlexBox>
    </RouterWrapper>
  );
}
