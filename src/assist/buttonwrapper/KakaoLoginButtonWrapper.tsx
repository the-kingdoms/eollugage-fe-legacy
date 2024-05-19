import LoginButton from "@modules/components/button/LoginButton";
import FlexBox from "@modules/layout/FlexBox";
import { useEffect } from "react";

function KakaoLoginButtonWrapper() {
  const kakaoSDKLogin = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kakao = (window as any).Kakao;
    const redirectUri = `https://api.eolluga.com/login/oauth2/code/kakao`;
    kakao?.Auth?.authorize({
      redirectUri,
    });
  };
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kakao = (window as any)?.Kakao;
    if (!kakao?.isInitialized()) {
      kakao?.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }, []);
  return (
    <FlexBox className="px-4 w-full justify-center">
      <div className="w-full max-w-[360px]">
        <LoginButton type="kakao" onClick={kakaoSDKLogin} />
      </div>
    </FlexBox>
  );
}

export default KakaoLoginButtonWrapper;
