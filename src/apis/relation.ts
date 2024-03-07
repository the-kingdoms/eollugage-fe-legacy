import { RoleType } from "@/apis/_type";
import api from "@/apis/network";

interface Relation extends PostRelationBody {
  id: string;
  storeId: string;
  memberId: string;
}

interface PostRelationBody {
  role: RoleType;
  position: string;
}

async function getRelationList(storeId: string): Promise<Relation[]> {
  // const { data } = await api.get(`/api/stores/${storeId}/relations`);
  return [
    {
      id: "1",
      storeId,
      memberId: "1",
      role: "ADMIN",
      position: "대표",
    },
    {
      id: "2",
      storeId,
      memberId: "2",
      role: "USER",
      position: "직원",
    },
  ];
}

async function postRelation(
  storeId: string,
  body: PostRelationBody,
): Promise<void> {
  // await api.post("/api/stores", body);
}

async function postRelationAdmin(
  storeId: string,
  memberId: string,
  body: any,
): Promise<void> {
  // await api.post(`/api/stores/${storeId}/relations`, {
  //   memberId,
  //   role: "ADMIN",
  // });
}

export { getRelationList, postRelation, postRelationAdmin };
export type { Relation, PostRelationBody };
