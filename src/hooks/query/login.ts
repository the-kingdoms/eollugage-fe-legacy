import { postAppleLogin, PostAppleLoginBody } from "@/apis/login";
import { useMutation } from "@tanstack/react-query";

function useAppleLogin() {
  const { mutate } = useMutation({
    mutationKey: ["postAppleLogin"],
    mutationFn: ({ data }: { data: PostAppleLoginBody }) =>
      postAppleLogin(data),
    retry: false,
  });

  return { mutate };
}
export { useAppleLogin };
