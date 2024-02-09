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
        <div className={styles.firstAnimation}>
          <Image
            height={38}
            width={234.46}
            alt="text"
            src="/text/Eollugage.png"
          />
        </div>
        <div className={styles.fadeInLater}>
          <div className="B4-regular text-gray-500">간편하게 일하는 법</div>
          <Image
            height={392}
            width={360}
            alt="splash"
            src="/splash/eollugage_store.png"
          />
          <div className="w-full px-4">
            <LoginButton type="kakao" onClick={() => {}} />
          </div>
        </div>
      </FlexBox>
    </FlexBox>
  );
}
