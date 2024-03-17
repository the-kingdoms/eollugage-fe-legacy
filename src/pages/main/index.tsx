import TabBarGage from "@modules/components/bars/TabBarGage";
import FlexBox from "@modules/layout/FlexBox";
import ManagerNotice from "@/screen/main/ManagerNotice";
import TodayShift from "@/screen/main/TodayShift";
import OrderBoard from "@/screen/main/OrderBoard";

export default function Home() {
  return (
    <FlexBox direction="col" className="w-full h-full justify-between">
      <FlexBox direction="col" className="w-full p-4 gap-8">
        <ManagerNotice />

        <TodayShift />

        <OrderBoard />
      </FlexBox>
      <TabBarGage />
    </FlexBox>
  );
}
