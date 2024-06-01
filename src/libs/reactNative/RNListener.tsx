import { PostAppleLoginBody } from "@/apis/login";
import { setTokenFromLocalStorage } from "@/apis/network";
import { Platform, platformAtom } from "@/data/platform";
import { usePostFcmToken } from "@/hooks/query/fcmtoken";
import { useAppleLogin } from "@/hooks/query/login";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";

function RNListener() {
  const { push } = useRouter();
  const { mutate: postFcmTokenMutate } = usePostFcmToken();
  const { mutate: postAppleLoginMutate } = useAppleLogin();
  const [, setPlatform] = useAtom(platformAtom);

  const onMessageEvent = (e: MessageEvent) => {
    e.stopPropagation();
    const message: { type: string; data: number | string | object } =
      JSON.parse(String(e.data));
    if (message.type === "getFcmToken") {
      postFcmTokenMutate({ token: message.data as string });
    }
    if (message.type === "getPlatform") {
      setPlatform(message.data as Platform);
    }
    if (message.type === "getAppleIdentifyToken") {
      const data = message.data as PostAppleLoginBody;
      postAppleLoginMutate(
        { data },
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
  };

  useEffect(() => {
    window.addEventListener("message", onMessageEvent, { capture: true });
    return () => window.removeEventListener("message", onMessageEvent);
  }, []);
  return null;
}

export default RNListener;
