import {
  PostRelationBody,
<<<<<<< HEAD
=======
  PostRelationAdminBody,
>>>>>>> fab097fdbb6312a1e758d9289b0affd12028a5aa
  getRelationList,
  postRelation,
  postRelationAdmin,
} from "@/apis/relation";
import { useAtom } from "jotai";
<<<<<<< HEAD
import { storeIdAtom } from "@/data/global";
import { MutateOptions, useMutation, useQuery } from "@tanstack/react-query";

interface UsePostRelationProps {
  storeId: string;
  memberId: string;
  body: PostRelationBody;
}

function useGetRelationList() {
  const [storeId] = useAtom(storeIdAtom);
  const { data: relations } = useQuery({
    queryKey: ["relataions"],
=======
import { storeIdAtom, myMemberIdAtom } from "@/data/global";
import { useMutation, useQuery } from "@tanstack/react-query";

function useGetRelation() {
  const [storeId] = useAtom(storeIdAtom);
  const { data: relations } = useQuery({
    queryKey: ["getRelationList"],
>>>>>>> fab097fdbb6312a1e758d9289b0affd12028a5aa
    queryFn: () => getRelationList(storeId),
  });
  return { relations };
}

function usePostRelation() {
<<<<<<< HEAD
  const { mutate, isSuccess } = useMutation({
    mutationKey: ["postRelationMutate"],
    mutationFn: ({ storeId, memberId, body }: UsePostRelationProps) =>
      postRelation(storeId, memberId, body),
  });
  const postRelationMutate = (
    storeId: string,
    memberId: string,
    body: PostRelationBody,
    options: MutateOptions<void, Error, UsePostRelationProps>,
  ) => {
    mutate(
      {
        storeId,
        memberId,
        body,
      },
      options,
    );
  };
  return { postRelationMutate, isSuccess };
=======
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
>>>>>>> fab097fdbb6312a1e758d9289b0affd12028a5aa
}

function usePostRelationAdmin() {
  const [storeId] = useAtom(storeIdAtom);
<<<<<<< HEAD
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
=======
  const [memberId] = useAtom(myMemberIdAtom);
  const { mutate } = useMutation({
    mutationKey: ["postRelationAdmin"],
    mutationFn: (body: PostRelationAdminBody) =>
      postRelationAdmin(storeId, memberId, body),
  });
  const postRelationAdminMutate = (body: PostRelationAdminBody) => {
    mutate(body);
>>>>>>> fab097fdbb6312a1e758d9289b0affd12028a5aa
  };
  return { postRelationAdminMutate };
}

<<<<<<< HEAD
export { useGetRelationList, usePostRelation, usePostRelationAdmin };
=======
export { useGetRelation, usePostRelation, usePostRelationAdmin };
>>>>>>> fab097fdbb6312a1e758d9289b0affd12028a5aa
