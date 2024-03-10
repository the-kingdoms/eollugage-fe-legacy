import { getMy } from "@/apis/my";
import { myAtom } from "@/data/global";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

function useGetMy(queryClient?: QueryClient) {
  const [, setMy] = useAtom(myAtom);
  return useQuery(
    {
      queryKey: ["my"],
      queryFn: () =>
        getMy().then(res => {
          setMy(res);
          return res;
        }),
    },
    queryClient,
  );
}

export { useGetMy };
