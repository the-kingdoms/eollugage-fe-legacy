import {
  PostRelationBody,
  PostRelationAdminBody,
  getRelationList,
  postRelation,
  postRelationAdmin,
} from "@/apis/relation";
import { useAtom } from "jotai";
import { storeIdAtom, myMemberIdAtom } from "@/data/global";
import { useMutation, useQuery } from "@tanstack/react-query";

function useGetRelation() {
  const [storeId] = useAtom(storeIdAtom);
  const { data: relations } = useQuery({
    queryKey: ["getRelationList"],
    queryFn: () => getRelationList(storeId),
  });
  return { relations };
}

function usePostRelation() {
  const [storeId] = useAtom(storeIdAtom);
  const [memberId] = useAtom(myMemberIdAtom);
  const { mutate } = useMutation({
    mutationKey: ["postRelation"],
    mutationFn: (body: PostRelationBody) =>
      postRelation(storeId, memberId, body),
  });
  const postRelationMutate = (body: PostRelationBody) => {
    mutate(body);
  };
  return { postRelationMutate };
}

function usePostRelationAdmin() {
  const [storeId] = useAtom(storeIdAtom);
  const [memberId] = useAtom(myMemberIdAtom);
  const { mutate } = useMutation({
    mutationKey: ["postRelationAdmin"],
    mutationFn: (body: PostRelationAdminBody) =>
      postRelationAdmin(storeId, memberId, body),
  });
  const postRelationAdminMutate = (body: PostRelationAdminBody) => {
    mutate(body);
  };
  return { postRelationAdminMutate };
}

export { useGetRelation, usePostRelation, usePostRelationAdmin };
