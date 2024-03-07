import { myAtom } from "@/data/global";
import Profile from "@modules/components/profile/Profile";
import FlexBox from "@modules/layout/FlexBox";
import { useAtom } from "jotai";

export default function UserInfo() {
  const [my] = useAtom(myAtom);
  return (
    <FlexBox className="w-full justify-between px-4 items-start">
      <div className="pt-1">
        <div>
          <span className="H5-bold">{my?.name}</span>
          <span className="ml-1 B1-medium text-Gray5">님</span>
        </div>
        <div className="B1-medium text-Gray7">오늘도 수고했어요</div>
      </div>
      <Profile size="M" name={my?.name ?? ""} />
    </FlexBox>
  );
}
