import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect() {
  const { query, push } = useRouter();
  const token = query?.token;
  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token.toString());
      push("/main");
    }
    if (
      typeof localStorage.getItem("postion") === "string" &&
      typeof localStorage.getItem("schedule") === "string"
    ) {
      push("/main"); // 일단은 main(직원용)으로 이동
    }
  }, [token]);
}
