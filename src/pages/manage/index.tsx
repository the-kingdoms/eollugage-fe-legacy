import StaffInform from "@/screen/manage/StaffInform";
import Schedule from "@/screen/manage/Schedule";
import TabBarGage from "@modules/components/bars/TabBarGage";
import LongTab from "@modules/components/tabs/LongTab";
import FlexBox from "@modules/layout/FlexBox";
import { useState, useEffect } from "react";
import FloatingActionButton from "@modules/components/button/FloatingActionButton";
import Icon from "@modules/layout/Icon";
import { useRouter } from "next/router";
import AddWorkModal from "@/screen/manage/AddWorkModal";

export default function Manage() {
  const [selectTab, setSelectTab] = useState("left");
  const [authority, setAutority] = useState("staff");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // 권한 가져오기
    setAutority("ceo"); // 임시 권한
  }, []);

  const addWork = () => {
    setIsModalOpen(true);
  };

  const router = useRouter();
  return (
    <>
      <FlexBox direction="col" className="h-full justify-between">
        <FlexBox direction="col" className="w-full h-full gap-4">
          <div className="B1-medium mt-1.5">직원 관리</div>
          <LongTab
            text={["근무 스케쥴", "직원 정보"]}
            pageHandle={Options => setSelectTab(Options)}
          />
          {selectTab === "right" && authority === "ceo" && (
            <div className="w-full px-4">
              <FlexBox
                direction="row"
                className="pl-4 py-3 pr-2.5 rounded-lg border border-neutral-500 gap-5
          justify-between"
              >
                <FlexBox direction="col" className="gap-1 items-start">
                  <div className="B5-medium text-neutral-500">출퇴근 관리</div>
                  <div className="B4-medium text-zinc-800">
                    직원들의 출퇴근을 승인 및 거절해보세요
                  </div>
                </FlexBox>
                <Icon
                  src={"/icon/direction/right.svg"}
                  sz={24}
                  onClick={() => router.push("/manage/attendance")}
                />
              </FlexBox>
            </div>
          )}
          {selectTab === "left" ? <Schedule /> : <StaffInform />}
        </FlexBox>
        <div className="ml-auto my-6 mx-4">
          {selectTab === "left" && authority === "ceo" && (
            <FloatingActionButton text="근무 추가" onClick={addWork} />
          )}
          {selectTab === "right" && authority === "ceo" && (
            <FloatingActionButton text="직원 추가" />
          )}
        </div>
        <TabBarGage />
      </FlexBox>
      <AddWorkModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
}
