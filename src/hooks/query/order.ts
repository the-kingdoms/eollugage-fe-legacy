import { getOrderList, postOrder } from "@/apis/order";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostOrderBody, putOrder } from "@/apis/order";

function useGetOrder(storeId: string) {
  const { data: orders } = useQuery({
    queryKey: ["getOrderList"],
    queryFn: () => getOrderList(storeId),
  });
  return { orders };
}

function usePostOrder(storeId: string) {
  const { mutate } = useMutation({
    mutationKey: ["postOrder"],
    mutationFn: (body: PostOrderBody) => postOrder(storeId, body),
  });
  const postOrderMutation = (body: PostOrderBody) => {
    mutate(body);
  };
  return { postOrderMutation };
}

function usePutOrder(storeId: string) {
  const { mutate } = useMutation({
    mutationKey: ["putOrder"],
    mutationFn: ({ orderId, body }: { orderId: string; body: PostOrderBody }) =>
      putOrder(storeId, orderId, body),
  });
  const putOrderMutation = (orderId: string, body: PostOrderBody) => {
    mutate({ orderId, body });
  };
  return { putOrderMutation };
}

export { useGetOrder, usePostOrder, usePutOrder };
