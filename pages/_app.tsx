import "@/styles/globals.css";

import type { AppProps } from "next/app";
import UserProvider from "../providers/AppProvider";
import Layout from "./components/Layout";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <UserProvider>
      <NextUIProvider>
        <Layout>
          <Toaster position="top-right" reverseOrder={false} />
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </UserProvider>
  );
}
