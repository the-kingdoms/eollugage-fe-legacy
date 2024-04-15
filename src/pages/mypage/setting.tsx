import Radio from "@modules/components/selections/Radio";
import Divider from "@modules/layout/Divider";
import FlexBox from "@modules/layout/FlexBox";
import Icon from "@modules/layout/Icon";
import TopTitle from "@modules/layout/TopTitle";
import { useRouter } from "next/router";
import { useState } from "react";
import Switch from "react-switch";

export default function Setting() {
  const parts = [
    {
      name: "문의하기",
      path: "/mypage/consult",
    },
    {
      name: "서비스 약관",
      path: "/mypage/term",
    },
    {
      name: "회원 탈퇴하기",
      path: "/mypage/quit",
    },
  ];

  const router = useRouter();
  const onClickPart = (path: string) => {
    if (path === "/mypage/consult")
      router.push({
        pathname: path,
        query: {
          from: "setting",
        },
      });
    else {
      router.push(path);
    }
  };

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const onClickSwitch = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  return (
    <>
      <FlexBox direction="col" className="px-4 gap-6 w-full mb-6">
        <TopTitle type="back" title="설정" />
        <div className="w-full">
          <div className="B1-medium mb-[21px]">권한설정</div>
          <FlexBox className="w-full justify-between">
            <FlexBox direction="col" className="items-start gap-2">
              <div className="text-Gray7 B4-regular">푸시알림</div>
              <div className="text-Gray5 B5-regular">
                얼루가게에서 제공하는 푸시알림에 동의합니다.
              </div>
            </FlexBox>
            <Switch
              onChange={checked => onClickSwitch(checked)}
              checked={isChecked}
              checkedIcon={false}
              uncheckedIcon={false}
              onColor={"#000"}
              width={48}
              height={28}
              handleDiameter={24}
              borderRadius={24}
            />
          </FlexBox>
        </div>
      </FlexBox>
      <Divider height={16} />
      <FlexBox direction="col" className="px-4 w-full items-start mt-6 gap-6">
        <div className="text-Gray7 B1-medium">고객센터</div>
        <FlexBox direction="col" className="gap-6 w-full">
          {parts.map(part => (
            <button className="w-full" onClick={() => onClickPart(part.path)}>
              <FlexBox className="justify-between w-full">
                <div className="text-Gray7 B4-regular">{part.name}</div>
                <Icon src="/icon/direction/right.svg" sz={24} />
              </FlexBox>
            </button>
          ))}
        </FlexBox>
      </FlexBox>
    </>
  );
}
