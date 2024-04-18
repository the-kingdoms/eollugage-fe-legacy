import { myAtom } from "@/data/global";
import TextButton from "@modules/components/button/TextButton";
import FlexBox from "@modules/layout/FlexBox";
import GridBox from "@modules/layout/GridBox";
import TopTitle from "@modules/layout/TopTitle";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Consult() {
  const [my] = useAtom(myAtom);
  const router = useRouter();
  const from = router.query.from;

  const onClickQuitBtn = () => {
    router.push("/mypage/quit/confirm");
  };

  return (
    <FlexBox direction="col" className="h-full pb-1 gap-6 px-4">
      <TopTitle type="back" />
      <FlexBox direction="col" className="h-full w-full justify-between">
        <FlexBox direction="col" className="gap-4 w-full items-start">
          <div className="text-Gray5 B1-medium !leading-[28px]">
            <span className="text-Black H5-bold">{my?.name} </span>님<br />
            저희가 도와드리고 싶어요
          </div>
          <div className="text-Gray5 B3-regular !leading-5 ">
            고객님이 만족하실 때까지
            <br />
            최선을 다해 해결해드릴게요.
          </div>
        </FlexBox>
        <Image
          alt="consult"
          src="/image/consult.png"
          width={254}
          height={305}
        />
        {from === "setting" ? (
          <Link href="tel://01040009842" className="w-full">
            <TextButton size="full" text="문의하기" />
          </Link>
        ) : (
          <GridBox className="gap-2 w-full">
            <Link href="tel://01040009842" className="w-full">
              <button className="text-Gray4 B4-medium rounded-lg border-2 border-Gray2 h-12 w-full">
                안내받기
              </button>
            </Link>
            <TextButton size="full" text="탈퇴하기" onClick={onClickQuitBtn} />
          </GridBox>
        )}
      </FlexBox>
    </FlexBox>
  );
}
