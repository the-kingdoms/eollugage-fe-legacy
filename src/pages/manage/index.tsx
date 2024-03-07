import { authAtom, manageMenuAtom } from "@/data/global";
import Schedule from "@/screen/manage/Schedule";
import StaffInform from "@/screen/manage/StaffInform";
import TabBarGage from "@modules/components/bars/TabBarGage";
import FloatingActionButton from "@modules/components/button/FloatingActionButton";
import LongTab from "@modules/components/tabs/LongTab";
import FlexBox from "@modules/layout/FlexBox";
import Icon from "@modules/layout/Icon";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

export default function Manage() {
  const [manageMenu, setManageMenu] = useAtom(manageMenuAtom);
  const [auth] = useAtom(authAtom);

  const router = useRouter();
  return (
    <FlexBox direction="col" className="h-full justify-between">
      <FlexBox direction="col" className="w-full h-full gap-4 py-4">
        <div className="B1-medium mt-1.5">직원 관리</div>
        <LongTab
          text={["근무 스케쥴", "직원 정보"]}
          initPage={manageMenu}
          pageHandle={option => setManageMenu(option)}
        />
        {manageMenu === "right" && auth === "owner" && (
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
                src="/icon/direction/right.svg"
                sz={24}
                onClick={() => router.push("/manage/attendance")}
              />
            </FlexBox>
          </div>
        )}
        {manageMenu === "left" ? <Schedule /> : <StaffInform />}
      </FlexBox>
      <div className="ml-auto my-6 mx-4">
        {manageMenu === "left" && auth === "owner" && (
          <FloatingActionButton text="근무 추가" />
        )}
        {manageMenu === "right" && auth === "owner" && (
          <FloatingActionButton text="직원 추가" />
        )}
      </div>
      <TabBarGage />
    </FlexBox>
  );
}
