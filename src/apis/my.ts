import { AbstractMember } from "@/apis/_type";
import api from "@/apis/network";
import { Relation } from "@/apis/relation";

interface My extends AbstractMember {
  relationList: Relation[];
}

async function getMy(): Promise<My> {
  const { data } = await api.get<My>(`/api/my`);
  return data;
}

export { getMy };
export type { My };
