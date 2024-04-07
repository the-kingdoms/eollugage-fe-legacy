import ApprovalBanner from "@/assist/banner/ApprovalBanner";
import { roleAtom } from "@/data/global";
import { addWorkModalAtom } from "@/data/historyAtom";
import AddWorkModal from "@/screen/manage/AddWorkModal";
import Schedule from "@/screen/manage/Schedule";
import StaffInform from "@/screen/manage/StaffInform";
import TabBarGage from "@modules/components/bars/TabBarGage";
import FloatingActionButton from "@modules/components/button/FloatingActionButton";
import LongTab from "@modules/components/tabs/LongTab";
import FlexBox from "@modules/layout/FlexBox";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Manage() {
  const { push } = useRouter();
  const [role] = useAtom(roleAtom);
  const [selectTab, setSelectTab] = useState("left");

  const [, setIsModalOpen] = useAtom(addWorkModalAtom);

  const addWork = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <FlexBox direction="col" className="relative h-full justify-between">
        <FlexBox direction="col" className="w-full h-full gap-4 py-4">
          <div className="B1-medium">직원 관리</div>
          <LongTab
            text={["근무 스케쥴", "직원 정보"]}
            pageHandle={Options => setSelectTab(Options)}
          />
          {selectTab === "right" && role === "OWNER" && (
            <div className="w-full px-4">
              <ApprovalBanner />
            </div>
          )}
          {selectTab === "left" ? <Schedule /> : <StaffInform />}
        </FlexBox>
        <div className="ml-auto my-6 mx-4">
          {selectTab === "left" && (role === "OWNER" || role === "MANAGER") && (
            <FloatingActionButton onClick={addWork} text="근무 추가" />
          )}
          {selectTab === "right" && role === "OWNER" && (
            <FloatingActionButton
              onClick={() => push("/manage/invite")}
              text="직원 추가"
            />
          )}
        </div>
        <TabBarGage />
      </FlexBox>
      <AddWorkModal />
    </>
  );
}
