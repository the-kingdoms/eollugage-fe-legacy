import { postAppleLogin } from "@/apis/login";
import { useMutation } from "@tanstack/react-query";

function useAppleLogin() {
  const { mutate } = useMutation({
    mutationKey: ["postAppleLogin"],
    mutationFn: ({ token }: { token: string }) => postAppleLogin({ token }),
  });

  return { mutate };
}
export { useAppleLogin };
