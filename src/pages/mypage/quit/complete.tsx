import { myAtom } from "@/data/global";
import TextButton from "@modules/components/button/TextButton";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";
import { useAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/router";

export default function QuitComplete() {
  const [my] = useAtom(myAtom);
  const router = useRouter();

  const onClickCompleteBtn = () => {
    router.push("/");
  };

  return (
    <FlexBox direction="col" className="px-4 w-full h-full pb-1 gap-6">
      <TopTitle type="back" />
      <FlexBox direction="col" className="h-full w-full justify-between">
        <div className="text-Gray5 B1-medium w-full">
          <span className="text-Black H5-bold">{my?.name} </span>님<br />
          지금까지 얼루가게를 이용해주셔서
          <br />
          감사해요. 탈퇴메일은 2-3일 내로
          <br />
          등록하신 메일로 발송돼요.
        </div>
        <Image
          alt="QuitCompleted"
          src="/image/QuitComplete.png"
          width={254}
          height={305}
        />
        <TextButton text="탈퇴완료" size="full" onClick={onClickCompleteBtn} />
      </FlexBox>
    </FlexBox>
  );
}
