import HomeBar from "@modules/components/bars/HomeBar";
import TabBar from "@modules/components/bars/TabBar";
import FlexBox from "@modules/layout/FlexBox";
import Image from "next/image";

export default function Home() {
  return (
    <FlexBox direction="col" className="min-h-full justify-between">
      <FlexBox direction="col" className="w-full gap-7 pb-5">
        <HomeBar />
        <div className="w-full px-4">
          <FlexBox className="justify-between bg-black rounded-lg h-[88px] w-full px-8">
            <FlexBox direction="col" className="B1-medium text-white">
              <div className="w-full">얼룩이가</div>
              <div className="w-full">세상을 지배해</div>
            </FlexBox>
            <Image height={72} width={68} alt="banner" src="/eolluga.png" />
          </FlexBox>
        </div>
      </FlexBox>
      <TabBar />
    </FlexBox>
  );
}
