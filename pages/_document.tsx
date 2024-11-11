import { Html, Head, Main, NextScript } from "next/document";

import { resets } from "../src/utils/css";

export default function Document() {
  return (
    <Html lang="da">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400..700&family=Volkhov:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={resets.rootCls}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
