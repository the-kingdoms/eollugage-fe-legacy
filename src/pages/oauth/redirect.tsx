import { myAtom } from "@/data/global";
import { useGetMy } from "@/hooks/query/my";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect() {
  const { query, push } = useRouter();
  const token = query?.token;
  const [my] = useAtom(myAtom);
  const { refetch } = useGetMy();

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
