import FlexBox from "@modules/layout/FlexBox";
import Image from "next/image";
import LoginButton from "@modules/components/button/LoginButton";
import styles from "./index.module.css";

export default function Home() {
  return (
    <FlexBox direction="col" className="bg-black w-full h-full">
      <FlexBox direction="col" className="w-full h-full justify-center">
        <div className={styles.firstAnimation}>
          <Image
            height={38}
            width={234.46}
            alt="text"
            src="/image/Eollugage.png"
          />
        </div>
        <div className={styles.fadeInLater}>
          <div className={`B4-regular text-gray-500 text-center`}>
            간편하게 일하는 법
          </div>
          <Image
            height={392}
            width={360}
            alt="splash"
            src="/image/unsplash_store.png"
          />
          <LoginButton type="kakao" />
        </div>
      </FlexBox>
    </FlexBox>
  );
}
