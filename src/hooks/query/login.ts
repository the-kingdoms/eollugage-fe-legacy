import {
  postAppleLogin,
  PostAppleLoginBody,
  postKakaoLogin,
  PostKakaoLoginBody,
} from "@/apis/login";
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

function useKakaoLogin() {
  const { mutate } = useMutation({
    mutationKey: ["postKakaoLogin"],
    mutationFn: ({ data }: { data: PostKakaoLoginBody }) =>
      postKakaoLogin(data),
    retry: false,
  });

  return { mutate };
}

export { useAppleLogin, useKakaoLogin };
