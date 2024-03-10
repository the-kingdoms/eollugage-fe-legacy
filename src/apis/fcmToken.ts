import api, { ApiResponse } from "@/apis/network";

interface FcmToken extends PostFcmTokenBody {
  id: string;
  memberId: string;
}

interface PostFcmTokenBody {
  token: string;
}

interface PutFcmTokenBody {
  oldToken: string;
  newToken: string;
}

async function getFcmTokenList(): Promise<FcmToken[]> {
  const { data } = await api.get(`/api/fcm-token`);
  return data;
}

async function postFcmToken(body: PostFcmTokenBody): Promise<ApiResponse> {
  const { data } = await api.post("/api/fcm-token", body);
  return data;
}

async function putFcmToken(body: PutFcmTokenBody): Promise<ApiResponse> {
  const { data } = await api.put("/api/fcm-token", body);
  return data;
}

export { getFcmTokenList, postFcmToken, putFcmToken };
export type { FcmToken, PostFcmTokenBody };
