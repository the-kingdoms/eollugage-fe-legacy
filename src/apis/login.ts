import api from "@/apis/network";

export interface PostAppleLoginBody {
  token: string;
  firstName: string;
  lastName: string;
}

interface PostAppleLoginResponse {
  token: string;
}

async function postAppleLogin(
  body: PostAppleLoginBody,
): Promise<PostAppleLoginResponse> {
  const { data } = await api.post(`/api/login/apple`, body);
  return data;
}

export { postAppleLogin };
