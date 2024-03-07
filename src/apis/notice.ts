interface Notice extends PostNoticeBody {
  id: string;
  storeId: string;
}

interface PostNoticeBody {
  content: string;
}

async function getNoticeList(storeId: string): Promise<Notice[]> {
  // const { data } = await api.get(`/api/stores/${storeId}/notices`);
  return [
    {
      id: "1",
      storeId,
      content: "글 1",
    },
    {
      id: "1",
      storeId,
      content: "글 2",
    },
  ];
  // return data;
}

async function postNotice(
  storeId: string,
  body: PostNoticeBody,
): Promise<void> {
  // await api.post(`/api/stores/${storeId}/notices`, body);
}

async function putNotice(
  storeId: string,
  noticeId: string,
  body: PostNoticeBody,
): Promise<void> {
  // await api.put(`/api/stores/${storeId}/notices/${noticeId}`, body);
}

export { getNoticeList, postNotice, putNotice };
export type { Notice, PostNoticeBody };
