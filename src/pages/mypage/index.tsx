import AdminControlBanner from "@/assist/banner/AdminControlBanner";
import { roleAtom } from "@/data/global";
import RelationSlider from "@/screen/mypage/RelationSlider";
import UserInfo from "@/screen/mypage/UserInfo";
import WorkHistoryList from "@/screen/mypage/WorkHistoryList";
import WorkHour from "@/screen/mypage/WorkHour";
import TabBarGage from "@modules/components/bars/TabBarGage";
import FlexBox from "@modules/layout/FlexBox";
import { useAtom } from "jotai";

export default function Manage() {
  const [role] = useAtom(roleAtom);
  return (
    <FlexBox direction="col" className="relative h-full justify-between">
      <FlexBox direction="col" className="w-full gap-6 py-4">
        <UserInfo />
        <FlexBox direction="col" className="w-full gap-2">
          <WorkHour />
          <div className="w-full px-4">
            {role === "OWNER" && <AdminControlBanner />}
          </div>
          <div className="w-full">
            {(role === "MANAGER" || role === "OWNER") && <RelationSlider />}
          </div>
        </FlexBox>
        <WorkHistoryList />
      </FlexBox>
      <TabBarGage />
    </FlexBox>
  );
}
