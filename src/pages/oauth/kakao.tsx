import { setTokenFromLocalStorage } from "@/apis/network";
import { useKakaoLogin } from "@/hooks/query/login";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Kakao() {
  const { push, query } = useRouter();
  const code = query.code as string;
  const state = query.state as string;
  const { mutate: postKakaoLoginMutate } = useKakaoLogin();

  useEffect(() => {
    if (code && state) {
      postKakaoLoginMutate(
        {
          data: {
            code,
            state,
            redirectUri: window.location.origin + window.location.pathname,
          },
        },
        {
          onSuccess: res => {
            setTokenFromLocalStorage(res.token);
            push("/oauth/redirect");
          },
          onError: () => {
            alert("로그인에 실패했습니다.");
          },
        },
      );
    }
  }, [code, state]);
}
