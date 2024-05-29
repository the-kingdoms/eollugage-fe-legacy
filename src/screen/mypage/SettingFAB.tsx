import FlexBox from "@modules/layout/FlexBox";
import Icon from "@modules/layout/Icon";
import { useRouter } from "next/router";

export default function SettingFAB() {
  const router = useRouter();

  const onClickFAB = () => {
    router.push("/mypage/setting");
  };

  return (
    <button
      onClick={onClickFAB}
      type="button"
      className="fixed rounded-[20px] p-3 bg-Gray7 bottom-[128px] right-4"
    >
      <FlexBox className="gap-2">
        <Icon src="/icon/control/setting.svg" sz={16} />
        <div className="text-White B4-regular">설정</div>
      </FlexBox>
    </button>
  );
}
