import { getMy } from "@/apis/my";
import { myAtom } from "@/data/global";
import "@/styles/fonts/fonts.css";
import "@/styles/globals.scss";
import "@/styles/scroll.scss";
import useDialog from "@modules/hooks/useDialog";
import Layout from "@modules/layout/Layout";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useAtom } from "jotai";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

dayjs.locale("ko");

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [, setMy] = useAtom(myAtom);
  const { pathname, push } = useRouter();
  const { dialog } = useDialog();
  const { data, isFetched, isSuccess } = useQuery(
    {
      queryKey: ["my"],
      queryFn: getMy,
    },
    queryClient,
  );

  useEffect(() => {
    if (isFetched) {
      if (isSuccess) {
        setMy(data);
      } else if (pathname !== "/" && pathname !== "/oauth/redirect") {
        push("/");
      }
    }
  }, [isFetched]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Layout className={pathname === "/" ? "bg-black" : "bg-white"}>
        {dialog}
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
