import { postDeleteAccount } from "@/apis/deleteAccount";
import { myAtom } from "@/data/global";
import { quitReasonAtom } from "@/pages/mypage/quit";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useAtom } from "jotai";

export function usePostDeleteAccount() {
  const now = dayjs().format("YYYY-MM-DD HH:mm");
  const [my] = useAtom(myAtom);
  const [reason] = useAtom(quitReasonAtom);

  const { mutate } = useMutation({
    mutationKey: ["postDeleteAccount"],
    mutationFn: () =>
      postDeleteAccount(
        String(my?.id),
        String(my?.name),
        String(my?.phone),
        now,
        reason,
      ),
  });

  return { mutate };
}
