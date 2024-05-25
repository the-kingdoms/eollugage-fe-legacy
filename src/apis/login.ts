import api from "@/apis/network";

export interface PostAppleLoginBody {
  token: string;
  firstName: string;
  lastName: string;
}

async function postAppleLogin(body: PostAppleLoginBody) {
  const { data } = await api.post(`/api/login/apple`, body);
  return data;
}

export { postAppleLogin };
