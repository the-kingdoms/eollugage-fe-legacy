import { Store } from "@/apis/_type";
import api, { ApiResponse } from "@/apis/network";

interface PostStoreBody {
  name: string;
  introduction: string;
  image: string;
  phone: string;
  address: string;
  openingHour: string;
  originalInfo: string;
  externalNotice: string;
  internalNotice: string;
}

async function getStore(storeId: string): Promise<Store> {
  const { data } = await api.get<Store>(`/api/stores/${storeId}`);
  return data;
}

async function postStore(body: PostStoreBody): Promise<ApiResponse> {
  const { data } = await api.post("/api/stores", body);
  return data;
}

export { getStore, postStore };
export type { Store, PostStoreBody };
