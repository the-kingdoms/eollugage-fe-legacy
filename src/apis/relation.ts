import { RoleType } from "@/apis/_type";
import api, { ApiResponse } from "@/apis/network";

interface Relation extends PostRelationBody {
  id: string;
  storeId: string;
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
<<<<<<< HEAD
): Promise<void> {
  await api.post(`/api/stores/${storeId}/relations/${memberId}`, body);
=======
): Promise<ApiResponse> {
  const { data } = await api.post(
    `/api/stores/${storeId}/relations/${memberId}`,
    body,
  );
  return data;
>>>>>>> fab097fdbb6312a1e758d9289b0affd12028a5aa
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
