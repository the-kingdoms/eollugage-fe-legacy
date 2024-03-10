import { ProviderType } from "@/apis/_type";
import api from "@/apis/network";
import { Relation } from "@/apis/relation";
import { Store } from "@/apis/store";

interface My {
  id: string;
  name: string;
  phone: string;
  providerType: ProviderType;
  relationList: Relation[];
  storeList: Store[];
}

async function getMy(): Promise<My> {
  const { data } = await api.get<My>(`/api/my`);
  return data;
}

export { getMy };
export type { My };
