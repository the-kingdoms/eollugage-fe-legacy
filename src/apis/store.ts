import api from "@/apis/network";

interface Store {
  storeId: string;
  name: string;
}

interface PostStoreBody {
  name: string;
}

async function getStore(uuid: string): Promise<Store> {
  // const { data } = await api.get(`/api/stores/${uuid}`);
  return {
    storeId: uuid,
    name: "얼루가게",
  };
  // return data;
}

async function postStore(body: PostStoreBody): Promise<Store> {
  const { data } = await api.post("/api/stores", body);
  return {
    storeId: data.id,
    name: body.name,
  };
}

export { getStore, postStore };
export type { Store, PostStoreBody };
