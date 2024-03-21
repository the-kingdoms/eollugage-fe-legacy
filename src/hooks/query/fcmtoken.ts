import { postFcmToken } from "@/apis/fcmToken";
import { useMutation } from "@tanstack/react-query";

function usePostFcmToken() {
  const { mutate } = useMutation({
    mutationKey: ["postFcmToken"],
    mutationFn: ({ token }: { token: string }) => postFcmToken({ token }),
  });

  return { postHistoryStatusMutate: mutate };
}

export { usePostFcmToken };
