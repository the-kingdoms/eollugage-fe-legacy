import Calender from "@modules/components/calender/Calender";
import FlexBox from "@modules/layout/FlexBox";
import Icon from "@modules/layout/Icon";
import { useRouter } from "next/router";

export default function Staff() {
  const router = useRouter();
  return (
    <FlexBox
      direction="col"
      className="bg-black items-start w-full h-full gap-4"
    >
      <Icon
        src={"/icon/direction/left.svg"}
        sz={32}
        onClick={() => router.back()}
        className="ml-1.5"
      />
      <div className="H5-bold text-white mx-4">얼루가</div>
      <FlexBox direction="row" className="mx-4 gap-2 mb-5">
        <div className="B4-regular text-gray-200">알바</div>
        <div className="B4-medium text-white">010-1234-5678</div>
      </FlexBox>
      <FlexBox
        direction="col"
        className="w-full bg-white rounded-tl-2xl rounded-tr-2xl"
      >
        <div></div>
      </FlexBox>
    </FlexBox>
  );
}
