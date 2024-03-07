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

async function getFcmTokenList(memberId: string): Promise<FcmToken[]> {
  // const { data } = await api.get(`/api/stores/${storeId}`);
  return [
    {
      id: "string",
      memberId: "string",
      token: "string",
    },
  ];
  // return data;
}

async function postFcmToken(body: PostFcmTokenBody): Promise<void> {}

async function putFcmToken(body: PostFcmTokenBody): Promise<void> {}

export { getFcmTokenList, postFcmToken, putFcmToken };
export type { FcmToken, PostFcmTokenBody };
