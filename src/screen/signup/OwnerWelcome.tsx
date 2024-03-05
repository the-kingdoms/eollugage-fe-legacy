import TextButton from "@modules/components/button/TextButton";
import Profile from "@modules/components/profile/Profile";
import FlexBox from "@modules/layout/FlexBox";
import { useRouter } from "next/router";

interface OwnerWelcomeProps {
  storeName: string;
}

export default function OwnerWelcome({ storeName }: OwnerWelcomeProps) {
  const router = useRouter();

  return (
    <FlexBox direction="col" className="w-full h-full justify-between px-4">
      <FlexBox direction="col" className="w-full h-full">
        <div className="w-full mt-4">
          <div className="H4-bold">얼루가 사장님,</div>
          <div className="H4-bold">환영합니다</div>
        </div>
        <FlexBox direction="col" className="space-y-4 mt-16">
          <Profile name="얼" size="L" />
          <FlexBox direction="col" className="items-center">
            <div className="H5-bold">{storeName}</div>
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <TextButton
        size="L"
        text="직원 추가하러 가기"
        className="mb-4"
        onClick={() => router.push("/manage")}
      />
    </FlexBox>
  );
}
