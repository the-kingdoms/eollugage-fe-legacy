import React, { useEffect } from "react";
import { eollugageUrl } from "@/apis/network";
import LoginButton from "@modules/components/button/LoginButton";
import FlexBox from "@modules/layout/FlexBox";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./index.module.css";

export default function Home() {
  const { push, query } = useRouter();

  useEffect(() => {
<<<<<<< HEAD
    if (typeof query["inviteData"] === "string") {
      const inviteData = query["inviteData"] as string;
      localStorage.setItem("inviteData", inviteData);
=======
    if (
      typeof query.position === "string" &&
      typeof query.schedule === "string"
    ) {
      const position = query.position as string;
      const schedule = query.schedule as string;
      localStorage.setItem("position", position);
      localStorage.setItem("schedule", schedule);
>>>>>>> fab097fdbb6312a1e758d9289b0affd12028a5aa
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
          <div className="px-4 w-full">
            <LoginButton
              type="kakao"
              onClick={() => {
                push(
                  `${eollugageUrl}/oauth2/authorization/kakao?redirect_uri=${window.location.origin}/oauth/redirect`,
                );
              }}
            />
          </div>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
