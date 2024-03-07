import { ProviderType } from "@/apis/_type";

interface My {
  name: string;
  phone: string;
  providerType: ProviderType;
  relationList: any[];
  storeList: any[];
}

async function getMy(): Promise<My> {
  // const { data } = await api.get(`/api/stores/${storeId}`);
  return {
    name: "김민수",
    phone: "010-1234-5678",
    providerType: "KAKAO",
    relationList: [],
    storeList: [],
  };
  // return data;
}

export { getMy };
export type { My };
