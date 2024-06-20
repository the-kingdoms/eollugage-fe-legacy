import { createRandomString } from "@/libs/createRandomId";
import LoginButton from "@modules/components/button/LoginButton";
import FlexBox from "@modules/layout/FlexBox";
import { useRouter } from "next/router";
import { useState } from "react";

function KakaoLoginButtonWrapper() {
  const { push } = useRouter();
  const [clickedNumber, setClickedNumber] = useState(0);
  const redirectUri = `${window.location.origin}/oauth/kakao`;
  const kakaoSDKLogin = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kakao = (window as any).Kakao;
    if (!kakao?.isInitialized()) {
      kakao?.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
    kakao?.Auth?.authorize({
      redirectUri,
      state: createRandomString(32),
    });
  };
  const kakaoRESTLogin = () => {
    push(
      `https://kauth.kakao.com/oauth/authorize?redirect_uri=${redirectUri}&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}&response_type=code`,
    );
  };

  return (
    <FlexBox className="px-4 w-full justify-center">
      <div className="w-full max-w-[360px]">
        <LoginButton
          type="kakao"
          onClick={() => {
            if (clickedNumber === 0) kakaoSDKLogin();
            else kakaoRESTLogin();
            setClickedNumber(clickedNumber + 1);
          }}
        />
      </div>
    </FlexBox>
  );
}

export default KakaoLoginButtonWrapper;
