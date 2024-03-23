import { fcmTokenAtom } from "@/data/fcmToken";
import { myMemberIdAtom } from "@/data/global";
import { usePostFcmToken } from "@/hooks/query/fcmtoken";
import { useAtom } from "jotai";
import { useEffect } from "react";

function RNListener() {
  const { postHistoryStatusMutate } = usePostFcmToken();
  const [fcmToken, setFcmToken] = useAtom(fcmTokenAtom);
  const [myMemberId] = useAtom(myMemberIdAtom);

  const onMessageEvent = (e: MessageEvent) => {
    e.stopPropagation();
    const message: { type: string; data: string } = JSON.parse(String(e.data));
    if (message.type === "fcmtoken") {
      setFcmToken(message.data);
    }
  };

  useEffect(() => {
    if (fcmToken !== "" && myMemberId !== "") {
      postHistoryStatusMutate({ token: fcmToken });
      setFcmToken("");
    }
  }, [fcmToken, myMemberId]);

  useEffect(() => {
    window.addEventListener("message", onMessageEvent, { capture: true });
    return () => window.removeEventListener("message", onMessageEvent);
  }, []);
  return null;
}

export default RNListener;
