import KakaoLoginButtonWrapper from "@/assist/KakaoLoginButtonWrapper";
import FlexBox from "@modules/layout/FlexBox";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./index.module.css";

export default function Home() {
  const { query } = useRouter();

  useEffect(() => {
    if (typeof query.inviteData === "string") {
      const inviteData = query.inviteData as string;
      localStorage.setItem("inviteData", inviteData);
    }
  }, [query]);

  return (
    <FlexBox direction="col" className="bg-black w-full h-full">
      <FlexBox
        direction="col"
        className="w-full h-full justify-center pt-16 pb-8 gap-4 relative"
      >
        <div className={styles.titleAnimation}>
          <Image
            height={38}
            width={234}
            alt="text"
            src="/splash/eollugage_title.png"
          />
        </div>
        <FlexBox
          direction="col"
          className={`${styles.bodyAnimation} justify-between w-full h-full`}
        >
          <div className="B4-regular text-gray-500 text-center">
            간편하게 일하는 법
          </div>
          <div className={styles.backgroundImage} />
          <KakaoLoginButtonWrapper />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
