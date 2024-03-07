import { getMy } from "@/apis/my";
import { myAtom } from "@/data/global";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect() {
  const { query, push } = useRouter();
  const token = query?.token;
  const [my, setMy] = useAtom(myAtom);
  const { refetch } = useQuery({
    queryKey: ["my"],
    queryFn: () =>
      getMy().then(res => {
        setMy(res);
        return res;
      }),
    enabled: false,
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token.toString());
      refetch();
    }
  }, [token]);

  useEffect(() => {
    if (my !== null) {
      if (my.relationList.length > 0) push("/main");
      else push("/signup");
    }
  }, [my]);
}
