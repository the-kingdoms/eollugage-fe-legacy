import { RoleType } from "@/apis/_type";
import api, { ApiResponse } from "@/apis/network";

interface Relation extends PostRelationBody {
  id: string;
  storeId: string;
  member: {
    id: string;
    name: string;
    phone: string;
  };
}

interface PostRelationBody {
  role: RoleType;
  position: string;
}

interface PostRelationAdminBody {
  role: RoleType;
}

async function getAllRelationList(storeId: string): Promise<Relation[]> {
  const { data } = await api.get(`/api/stores/${storeId}/relations`);
  return data;
}

async function getRelationList(
  storeId: string,
  memberId: string,
): Promise<Relation> {
  const { data } = await api.get(
    `/api/stores/${storeId}/relations/${memberId}`,
  );
  return data;
}

async function postRelation(
  storeId: string,
  memberId: string,
  body: PostRelationBody,
): Promise<ApiResponse> {
  const { data } = await api.post(
    `/api/stores/${storeId}/relations/${memberId}`,
    body,
  );
  return data;
}

async function postRelationAdmin(
  storeId: string,
  memberId: string,
  body: PostRelationAdminBody,
): Promise<ApiResponse> {
  const { data } = await api.post(
    `/api/stores/${storeId}/relations/${memberId}/admin`,
    body,
  );
  return data;
}

export { getAllRelationList, postRelation, postRelationAdmin, getRelationList };
export type { PostRelationBody, Relation, PostRelationAdminBody };
