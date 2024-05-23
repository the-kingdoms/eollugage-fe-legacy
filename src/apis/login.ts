import api from "@/apis/network";

async function postAppleLogin({ token }: { token: string }) {
  const { data } = await api.post(`/login/apple`, { token });
  alert(JSON.stringify(data));
  return data;
}

export { postAppleLogin };
