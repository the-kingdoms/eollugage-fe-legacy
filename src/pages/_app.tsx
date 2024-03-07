import "@/styles/fonts/fonts.css";
import "@/styles/globals.scss";
import "@/styles/scroll.scss";
import useDialog from "@modules/hooks/useDialog";
import Layout from "@modules/layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

dayjs.locale("ko");

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const { dialog } = useDialog();
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
