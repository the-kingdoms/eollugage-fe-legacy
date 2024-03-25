import { usePostFcmToken } from "@/hooks/query/fcmtoken";
import { useEffect } from "react";

function RNListener() {
  const { mutate: postHistoryStatusMutate } = usePostFcmToken();

  const onMessageEvent = (e: MessageEvent) => {
    e.stopPropagation();
    const message: { type: string; data: string } = JSON.parse(String(e.data));
    if (message.type === "getFcmTokenResponse") {
      postHistoryStatusMutate({ token: message.data });
    }
  };

  useEffect(() => {
    window.addEventListener("message", onMessageEvent, { capture: true });
    return () => window.removeEventListener("message", onMessageEvent);
  }, []);
  return null;
}

export default RNListener;
