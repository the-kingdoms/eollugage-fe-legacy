import Image from "next/image";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";

export default function Home() {
  return (
    <FlexBox direction="col" className="w-full h-full px-4">
      <TopTitle title="" type="back" />
      <FlexBox direction="col" className="w-full h-full space-y-16 px-4">
        <div className="w-full mt-4">
          <div className="H4-bold">얼루가님,</div>
          <div className="H4-bold">소속된 가게가 없어요</div>
        </div>
        <FlexBox direction="col" className="space-y-4">
          <Image height={170} width={170} alt="link" src="/image/link.png" />
          <div className="B2-medium text-Gray4">
            사장님께 초대를 요청해볼까요?
          </div>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
