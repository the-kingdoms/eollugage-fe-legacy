import { RoleType } from "@/apis/_type";
import api, { ApiResponse } from "@/apis/network";

interface Relation extends PostRelationBody {
  id: string;
  storeId: string;
  memberId: string;
}

interface PostRelationBody {
  role: RoleType;
  position: string;
}

interface PutRelationAdminBody {
  role: RoleType;
}

async function getRelationList(storeId: string): Promise<Relation[]> {
  const { data } = await api.get(`/api/stores/${storeId}/relations`);
  return [
    {
      id: "1",
      storeId,
      memberId: "1",
      role: "owner",
      position: "대표",
    },
    {
      id: "2",
      storeId,
      memberId: "2",
      role: "staff",
      position: "직원",
    },
  ]; // 추후 삭제 필요
  return data;
}

async function postRelation(
  storeId: string,
  body: PostRelationBody,
): Promise<ApiResponse> {
  const { data } = await api.post(`/api/stores/${storeId}/relations`, body);
  return data;
}

async function putRelationAdmin(
  storeId: string,
  memberId: string,
  body: PutRelationAdminBody,
): Promise<ApiResponse> {
  const { data } = await api.put(
    `/api/stores/${storeId}/relations/${memberId}/admin`,
    body,
  );
  return data;
}

export { getRelationList, postRelation, putRelationAdmin };
export type { PostRelationBody, Relation };
