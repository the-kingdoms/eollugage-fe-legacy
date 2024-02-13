import UserInfo from "@/screen/mypage/UserInfo";
import WorkLog from "@/screen/mypage/WorkLog";
import TabBarGage from "@modules/components/bars/TabBarGage";
import FlexBox from "@modules/layout/FlexBox";

export default function Manage() {
  return (
    <FlexBox direction="col" className="relative h-full justify-between">
      <FlexBox direction="col" className="w-full gap-6 py-4">
        <UserInfo />
        <WorkLog />
      </FlexBox>
      <TabBarGage />
    </FlexBox>
  );
}
