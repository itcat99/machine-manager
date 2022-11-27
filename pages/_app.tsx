import type { AppProps } from "next/app";
import { useEffect, useRef, useState } from "react";
import { ConfigProvider } from "antd";
import { Layout } from "@/layout";
import { RecoilRoot } from "recoil";
import { api } from "@/api";

import zhCN from "antd/locale/zh_CN";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const apiIsInit = useRef(false);
  const [isInit, setIsInit] = useState(!!apiIsInit.current);

  console.log("isInit", isInit);

  useEffect(() => {
    console.log("HOME");
    if (apiIsInit.current) return;

    (async () => {
      await api.login("root", "root");
      setIsInit(true);
    })().catch((err) => console.error(err));
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <RecoilRoot>
        <Layout>{isInit ? <Component {...pageProps} /> : null}</Layout>
      </RecoilRoot>
    </ConfigProvider>
  );
}
