import { useKakaoLogin } from "@/hooks/query/login";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Kakao() {
  const { query } = useRouter();
  const code = query.code as string;
  const state = query.state as string;
  const { mutate: postKakaoLoginMutate } = useKakaoLogin();

  useEffect(() => {
    if (code) {
      postKakaoLoginMutate({
        data: {
          code,
          state,
          redirectUri: window.location.origin + window.location.pathname,
        },
      });
    }
  }, [code, state]);
}
