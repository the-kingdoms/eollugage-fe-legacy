import UserInfo from "@/screen/mypage/UserInfo";
import WorkHistoryList from "@/screen/mypage/WorkHistoryList";
import WorkHour from "@/screen/mypage/WorkHour";
import TabBarGage from "@modules/components/bars/TabBarGage";
import FlexBox from "@modules/layout/FlexBox";

export default function Manage() {
  return (
    <FlexBox direction="col" className="relative h-full justify-between">
      <FlexBox direction="col" className="w-full gap-6 py-4">
        <FlexBox direction="col" className="w-full">
          <UserInfo />
          <WorkHour />
        </FlexBox>
        <WorkHistoryList />
      </FlexBox>
      <TabBarGage />
    </FlexBox>
  );
}
