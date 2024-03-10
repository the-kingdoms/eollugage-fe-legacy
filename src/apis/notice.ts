import api from "./network";

interface Notice extends PostNoticeBody {
  id: string;
  storeId: string;
}

interface PostNoticeBody {
  content: string;
}

async function getNoticeList(storeId: string): Promise<Notice[]> {
  const { data } = await api.get(`/api/stores/${storeId}/notices`);
  return data;
}

async function postNotice(
  storeId: string,
  body: PostNoticeBody,
): Promise<void> {
  await api.post(`/api/stores/${storeId}/notices`, { title: "temp", ...body });
}

async function putNotice(
  storeId: string,
  noticeId: string,
  body: PostNoticeBody,
): Promise<void> {
  await api.put(`/api/stores/${storeId}/notices/${noticeId}`, {
    title: "temp",
    ...body,
  });
}

export { getNoticeList, postNotice, putNotice };
export type { Notice, PostNoticeBody };
