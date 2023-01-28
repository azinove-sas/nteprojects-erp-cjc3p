import "../assets/css/main.css";

import { ReactElement, ReactNode, useEffect, useState } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { signIn, getSession } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "react-query";
import Loading_1 from "azinove/components/templates/loading/Loading_1";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

async function checkLogin(callBack: any) {
  const session = await getSession();

  if (!session) {
    signIn("auth0", { callbackUrl: window.location.href });
  } else {
    callBack(true);
  }
}

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  const [sessionLog, setSessionLog] = useState<boolean>(false);

  useEffect(() => {
    checkLogin(setSessionLog);
  }, [sessionLog]);

  const queryClient = new QueryClient();

  if (!sessionLog)
    return (
      <Loading_1 width={400} image_1={"/static/images/nteprojects-logo.webp"} />
    );

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  );
}
