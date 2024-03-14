import RouterWrapper from "@/assist/RouterWrapper";
import { roleAtom } from "@/data/global";
import UserInfo from "@/screen/mypage/UserInfo";
import WorkHistoryList from "@/screen/mypage/WorkHistoryList";
import WorkHour from "@/screen/mypage/WorkHour";
import AdminSettingBanner from "@modules/components/banner/AdminSettingBanner";
import TabBarGage from "@modules/components/bars/TabBarGage";
import FlexBox from "@modules/layout/FlexBox";
import { useAtom } from "jotai";

export default function Manage() {
  const [role] = useAtom(roleAtom);
  return (
    <FlexBox direction="col" className="relative h-full justify-between">
      <FlexBox direction="col" className="w-full gap-6 py-4">
        <FlexBox direction="col" className="w-full">
          <UserInfo />
          <WorkHour />
          {role === "OWNER" && <AdminSettingBanner />}
        </FlexBox>
        <WorkHistoryList />
      </FlexBox>
      <TabBarGage />
    </FlexBox>
  );
}
