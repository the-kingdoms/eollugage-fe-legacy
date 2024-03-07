interface Order extends PostOrderBody {
  id: string;
  storeId: string;
}

interface PostOrderBody {
  content: string;
  isClicked: boolean;
}

async function getOrderList(storeId: string): Promise<Order[]> {
  // const { data } = await api.get(`/api/stores/${storeId}/orders`);
  return [
    {
      id: "1",
      storeId,
      content: "글 1",
      isClicked: false,
    },
    {
      id: "1",
      storeId,
      content: "글 2",
      isClicked: false,
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
