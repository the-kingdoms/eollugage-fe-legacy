import { postAppleLogin, PostAppleLoginBody } from "@/apis/login";
import { Platform, platformAtom } from "@/data/platform";
import { usePostFcmToken } from "@/hooks/query/fcmtoken";
import { useAtom } from "jotai";
import { useEffect } from "react";

function RNListener() {
  const { mutate: postFcmTokenMutate } = usePostFcmToken();
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
      postAppleLogin(message.data as PostAppleLoginBody);
    }
  };

  useEffect(() => {
    window.addEventListener("message", onMessageEvent, { capture: true });
    return () => window.removeEventListener("message", onMessageEvent);
  }, []);
  return null;
}

export default RNListener;
