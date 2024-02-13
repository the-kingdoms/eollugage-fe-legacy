import WorkInfoBanner from "@modules/components/banner/WorkInfoBanner";
import Profile from "@modules/components/profile/Profile";
import FlexBox from "@modules/layout/FlexBox";
import dayjs from "dayjs";

export default function UserInfo() {
  const currentDate = dayjs().format("MM/DD");
  return (
    <FlexBox direction="col" className="w-full">
      <FlexBox className="w-full justify-between px-4">
        <div>
          <div>
            <span className="H5-bold">얼루가게</span>
            <span className="ml-1 B1-medium text-Gray5">님</span>
          </div>
          <div className="B1-medium text-Gray7">오늘도 수고했어요</div>
        </div>
        <Profile size="M" name="얼루가" />
      </FlexBox>
      <FlexBox className="w-full justify-between mt-8">
        <WorkInfoBanner
          direction="left"
          size="L"
          type="regular"
          workingMinutes={50}
        />
      </FlexBox>
      <FlexBox className="w-full justify-end B4-medium text-Gray5 px-4 mt-2">
        {currentDate} 기준
      </FlexBox>
    </FlexBox>
  );
}
