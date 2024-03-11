import { eollugageUrl } from "@/apis/network";
import LoginButton from "@modules/components/button/LoginButton";
import { useRouter } from "next/router";

function KakaoLoginButtonWrapper() {
  const { push } = useRouter();

  const kakaoSDKLogin = () => {
    push(
      `${eollugageUrl}/oauth2/authorization/kakao?redirect_uri=${window.location.origin}/oauth/redirect`,
    );
    /*
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kakao = (window as any).Kakao;
    const redirectUri = `https://api.eolluga.com/login/oauth2/code/kakao`;
    kakao?.Auth?.authorize({
      redirectUri,
    });
    */
  };
  /*
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kakao = (window as any)?.Kakao;
    if (!kakao?.isInitialized()) {
      kakao?.init(KAKAO_JS_KEY);
    }
  }, []);
  */
  return (
    <div className="px-4 w-full">
      <LoginButton type="kakao" onClick={kakaoSDKLogin} />
    </div>
  );
}

export default KakaoLoginButtonWrapper;
