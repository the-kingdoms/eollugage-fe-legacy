import {
  postAppleLogin,
  PostAppleLoginBody,
  postKakaoLogin,
  PostKakaoLoginBody,
} from "@/apis/login";
import { setTokenFromLocalStorage } from "@/apis/network";
import { useGetMy } from "@/hooks/query/my";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

function useAppleLogin() {
  const { push } = useRouter();
  const { refetch } = useGetMy();
  const { mutate } = useMutation({
    mutationKey: ["postAppleLogin"],
    mutationFn: ({ data }: { data: PostAppleLoginBody }) =>
      postAppleLogin(data),
    retry: false,
    onSuccess: res => {
      setTokenFromLocalStorage(res.token);
      refetch().then(() => {
        push("/oauth/redirect");
      });
    },
    onError: () => {
      alert("로그인에 실패했습니다.");
    },
  });

  return { mutate };
}

function useKakaoLogin() {
  const { push } = useRouter();
  const { refetch } = useGetMy();
  const { mutate } = useMutation({
    mutationKey: ["postKakaoLogin"],
    mutationFn: ({ data }: { data: PostKakaoLoginBody }) =>
      postKakaoLogin(data),
    retry: false,
    onSuccess: res => {
      setTokenFromLocalStorage(res.token);
      refetch().then(() => {
        push("/oauth/redirect");
      });
    },
    onError: () => {
      alert("로그인에 실패했습니다.");
    },
  });

  return { mutate };
}

export { useAppleLogin, useKakaoLogin };
