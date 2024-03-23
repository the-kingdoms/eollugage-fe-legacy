import {
  PostRelationBody,
  PostRelationAdminBody,
  getAllRelationList,
  postRelation,
  postRelationAdmin,
  getRelationList,
} from "@/apis/relation";
import { useAtom } from "jotai";
import { storeIdAtom } from "@/data/global";
import { MutateOptions, useMutation, useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/apis/network";

interface UsePostRelationProps {
  storeId: string;
  memberId: string;
  body: PostRelationBody;
}

function useGetRelationList(memberId: string) {
  const [storeId] = useAtom(storeIdAtom);
  const { data: relations } = useQuery({
    queryKey: ["getRelationList"],
    queryFn: () => getRelationList(storeId, memberId),
  });
  return { relations };
}

function useGetAllRelationList() {
  const [storeId] = useAtom(storeIdAtom);
  const { data: relations } = useQuery({
    queryKey: ["getAllRelationList"],
    queryFn: () => getAllRelationList(storeId),
  });
  return { relations };
}

function usePostRelation() {
  const { mutate, isSuccess } = useMutation({
    mutationKey: ["postRelationMutate"],
    mutationFn: ({ storeId, memberId, body }: UsePostRelationProps) =>
      postRelation(storeId, memberId, body),
  });
  const postRelationMutate = (
    storeId: string,
    memberId: string,
    body: PostRelationBody,
    options: MutateOptions<ApiResponse, Error, UsePostRelationProps>,
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
}

function usePostRelationAdmin() {
  const [storeId] = useAtom(storeIdAtom);
  const { mutate } = useMutation({
    mutationKey: ["postRelationMutate"],
    mutationFn: ({
      memberId,
      body,
    }: {
      memberId: string;
      body: PostRelationAdminBody;
    }) => postRelationAdmin(storeId, memberId, body),
  });
  const postRelationAdminMutate = (
    memberId: string,
    body: PostRelationBody,
  ) => {
    mutate({ memberId, body });
  };
  return { postRelationAdminMutate };
}

export {
  useGetAllRelationList,
  usePostRelation,
  usePostRelationAdmin,
  useGetRelationList,
};
