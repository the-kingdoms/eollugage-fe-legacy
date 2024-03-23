import { storeIdAtom } from "@/data/global";
import { useGetMy } from "@/hooks/query/my";
import RNListener from "@/libs/RNListener";
import "@/styles/fonts/fonts.css";
import "@/styles/globals.scss";
import "@/styles/scroll.scss";
import useDialog from "@modules/hooks/useDialog";
import Layout from "@modules/layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useAtom } from "jotai";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

dayjs.locale("ko");

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [storeId] = useAtom(storeIdAtom);
  const { pathname, push } = useRouter();
  const { dialog } = useDialog();
  const { isError } = useGetMy(queryClient);
  const [rendor, setRendor] = useState(false);

  useEffect(() => {
    if (isError && pathname !== "/" && pathname !== "/oauth/redirect") {
      push("/");
    }
  }, [isError, pathname]);

  useEffect(() => {
    if (
      pathname === "/" ||
      pathname === "/oauth/redirect" ||
      pathname.includes("/signup")
    )
      setRendor(true);
    if (storeId !== "") setRendor(true);
  }, [storeId, pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RNListener />
      <Layout className={pathname === "/" ? "bg-black" : "bg-white"}>
        {dialog}
        {rendor && <Component {...pageProps} />}
      </Layout>
    </QueryClientProvider>
  );
}
