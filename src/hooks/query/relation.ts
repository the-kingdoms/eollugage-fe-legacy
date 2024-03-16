import {
  PostRelationBody,
  getRelationList,
  postRelation,
  postRelationAdmin,
} from "@/apis/relation";
import { useAtom } from "jotai";
import { storeIdAtom } from "@/data/global";
import { useMutation, useQuery } from "@tanstack/react-query";

function useGetRelationList() {
  const [storeId] = useAtom(storeIdAtom);
  const { data: relations } = useQuery({
    queryKey: ["relataions"],
    queryFn: () => getRelationList(storeId),
  });
  return { relations };
}

function usePostRelation() {
  const { mutate, isSuccess } = useMutation({
    mutationKey: ["postRelationMutate"],
    mutationFn: ({
      storeId,
      memberId,
      body,
    }: {
      storeId: string;
      memberId: string;
      body: PostRelationBody;
    }) => postRelation(storeId, memberId, body),
  });
  const postRelationMutate = (
    storeId: string,
    memberId: string,
    body: PostRelationBody,
  ) => {
    mutate({
      storeId,
      memberId,
      body,
    });
  };
  return { postRelationMutate, isSuccess };
}

function usePostRelationAdmin() {
  const storeId = useAtom(storeIdAtom) as unknown as string;
  const { mutate } = useMutation({
    mutationKey: ["postRelationMutate"],
    mutationFn: ({ memberId, body }: { memberId: string; body: unknown }) =>
      postRelationAdmin(storeId, memberId, body),
  });
  const postRelationAdminMutate = (
    memberId: string,
    body: PostRelationBody,
  ) => {
    mutate({ memberId, body });
  };
  return { postRelationAdminMutate };
}

export { useGetRelationList, usePostRelation, usePostRelationAdmin };
