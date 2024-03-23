import { RoleType } from "@/apis/_type";
import api, { ApiResponse } from "@/apis/network";
import { My } from "@/apis/my";
import { Plan } from "@/apis/plan";

interface Relation extends PostRelationBody {
  id: string;
  storeId: string;
  member: My;
  planList: Plan[];
}

interface PostRelationBody {
  role: RoleType;
  position: string;
}

interface PostRelationAdminBody {
  role: RoleType;
}

async function getRelationList(storeId: string): Promise<Relation[]> {
  const { data } = await api.get(`/api/stores/${storeId}/relations`);
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

export { getRelationList, postRelation, postRelationAdmin };
export type { PostRelationBody, Relation, PostRelationAdminBody };
