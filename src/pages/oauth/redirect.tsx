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
  }, [token]);
}
