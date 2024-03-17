import { getHistoryList } from "@/apis/history";
import { storeIdAtom } from "@/data/global";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

function useGetHistory(memberId: string) {
  const [storeId] = useAtom(storeIdAtom);
  const { data: historys } = useQuery({
    queryKey: ["getHistoryList", storeId, memberId],
    queryFn: () => getHistoryList(storeId, memberId),
  });
  return { historys };
}

export { useGetHistory };
