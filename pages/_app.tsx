import "@/styles/globals.css";

import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import UserProvider from "./providers/AppProvider";
import Layout from "./components/Layout";
import { NextUIProvider } from "@nextui-org/react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <NextUIProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NextUIProvider>
      </UserProvider>
    </SessionProvider>
  );
}
