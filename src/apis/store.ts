import api, { ApiResponse } from "@/apis/network";

interface Store {
  storeId: string;
  name: string;
}

interface PostStoreBody {
  name: string;
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
