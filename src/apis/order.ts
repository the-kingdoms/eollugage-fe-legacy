interface Order extends PostOrderBody {
  id: string;
  storeId: string;
}

interface PostOrderBody {
  title: string;
  content: string;
}

async function getOrderList(storeId: string): Promise<Order[]> {
  // const { data } = await api.get(`/api/stores/${storeId}/orders`);
  return [
    {
      id: "1",
      storeId,
      title: "발주게시글",
      content: "글 1",
    },
    {
      id: "1",
      storeId,
      title: "발주게시글",
      content: "글 2",
    },
  ];
  // return data;
}

async function postOrder(storeId: string, body: PostOrderBody): Promise<void> {
  // await api.post(`/api/stores/${storeId}/orders`, body);
}

async function putOrder(
  storeId: string,
  orderId: string,
  body: PostOrderBody,
): Promise<void> {
  // await api.put(`/api/stores/${storeId}/orders/${orderId}`, body);
}

export { getOrderList, postOrder, putOrder };
export type { Order, PostOrderBody };
