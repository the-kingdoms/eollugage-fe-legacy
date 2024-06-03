import api from "@/apis/network";

export interface PostAppleLoginBody {
  token: string;
  firstName: string;
  lastName: string;
}

interface PostLoginResponse {
  token: string;
}

async function postAppleLogin(
  body: PostAppleLoginBody,
): Promise<PostLoginResponse> {
  const { data } = await api.post(`/api/login/apple`, body);
  return data;
}

export interface PostKakaoLoginBody {
  code: string;
  state: string;
  redirectUri: string;
}

async function postKakaoLogin(
  body: PostKakaoLoginBody,
): Promise<PostLoginResponse> {
  const { data } = await api.post(`/api/login/kakao`, body);
  return data;
}

export { postAppleLogin, postKakaoLogin };
