import FlexBox from "@modules/layout/FlexBox";
import Image from "next/image";
import LoginButton from "@modules/components/button/LoginButton";
import styles from "./index.module.css";

export default function Home() {
  return (
    <FlexBox direction="col" className="bg-black w-full h-full">
      <FlexBox
        direction="col"
        className="w-full h-full justify-center relative"
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
          className={`${styles.bodyAnimation} absolute justify-end py-8 w-full h-full gap-20`}
        >
          <div className="B4-regular text-gray-500 text-center">
            간편하게 일하는 법
          </div>
          <div className={styles.backgroundImage} />
          <div className="px-4 w-full">
            <LoginButton type="kakao" onClick={() => {}} />
          </div>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
