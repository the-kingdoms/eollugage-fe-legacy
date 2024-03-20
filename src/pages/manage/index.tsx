import { roleAtom } from "@/data/global";
import { addWorkModalAtom } from "@/data/historyAtom";
import AddWorkModal from "@/screen/manage/AddWorkModal";
import Schedule from "@/screen/manage/Schedule";
import StaffInform from "@/screen/manage/StaffInform";
import TabBarGage from "@modules/components/bars/TabBarGage";
import FloatingActionButton from "@modules/components/button/FloatingActionButton";
import LongTab from "@modules/components/tabs/LongTab";
import FlexBox from "@modules/layout/FlexBox";
import Icon from "@modules/layout/Icon";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Manage() {
  const router = useRouter();
  const [role] = useAtom(roleAtom);
  const [selectTab, setSelectTab] = useState("left");

  const [, setIsModalOpen] = useAtom(addWorkModalAtom);

  const addWork = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <FlexBox direction="col" className="h-full justify-between">
        <FlexBox direction="col" className="w-full h-full gap-4">
          <div className="B1-medium mt-1.5">직원 관리</div>
          <LongTab
            text={["근무 스케쥴", "직원 정보"]}
            pageHandle={Options => setSelectTab(Options)}
          />
          {selectTab === "right" && role === "OWNER" && (
            <div className="w-full px-4">
              <FlexBox
                direction="row"
                className="pl-4 py-3 pr-2.5 rounded-lg border border-Gray5 gap-5 justify-between"
              >
                <FlexBox direction="col" className="gap-1 items-start">
                  <div className="B5-medium text-Gray5">출퇴근 관리</div>
                  <div className="B4-medium text-Gray7">
                    직원들의 출퇴근을 승인 및 거절해보세요
                  </div>
                </FlexBox>
                <Icon
                  src="/icon/direction/right.svg"
                  sz={24}
                  onClick={() => router.push("/manage/attendance")}
                />
              </FlexBox>
            </div>
          )}
          {selectTab === "left" ? <Schedule /> : <StaffInform />}
        </FlexBox>
        <div className="ml-auto my-6 mx-4">
          {selectTab === "left" && (
            <FloatingActionButton onClick={addWork} text="근무 추가" />
          )}
          {selectTab === "right" && role === "OWNER" && (
            <FloatingActionButton text="직원 추가" />
          )}
        </div>
        <TabBarGage />
      </FlexBox>
      <AddWorkModal />
    </>
  );
}
