import CeoBanner from "@/assist/CeoBanner";
import { manageMenuAtom, roleAtom } from "@/data/global";
import Schedule from "@/screen/manage/Schedule";
import StaffInform from "@/screen/manage/StaffInform";
import TabBarGage from "@modules/components/bars/TabBarGage";
import FloatingActionButton from "@modules/components/button/FloatingActionButton";
import LongTab from "@modules/components/tabs/LongTab";
import FlexBox from "@modules/layout/FlexBox";
import { useAtom } from "jotai";

export default function Manage() {
  const [manageMenu, setManageMenu] = useAtom(manageMenuAtom);
  const [role] = useAtom(roleAtom);

  return (
    <FlexBox direction="col" className="h-full justify-between">
      <FlexBox direction="col" className="w-full h-full gap-4 py-4">
        <div className="B1-medium mt-1.5">직원 관리</div>
        <LongTab
          text={["근무 스케쥴", "직원 정보"]}
          initPage={manageMenu}
          pageHandle={option => setManageMenu(option)}
        />
        <div className="w-full px-4">
          {manageMenu === "right" && role === "owner" && <CeoBanner />}
        </div>
        {manageMenu === "left" ? <Schedule /> : <StaffInform />}
      </FlexBox>
      <div className="ml-auto my-6 mx-4">
        {manageMenu === "left" && role === "owner" && (
          <FloatingActionButton text="근무 추가" />
        )}
        {manageMenu === "right" && role === "owner" && (
          <FloatingActionButton text="직원 추가" />
        )}
      </div>
      <TabBarGage />
    </FlexBox>
  );
}
