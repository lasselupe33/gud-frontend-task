import type { AppProps } from "next/app";

import { TanstackQueryProvider } from "../src/components/provider.tanstack-query";

import "../src/global.style";
import "../src/utils/css/resets";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Head>
        
      </Head> */}

      <TanstackQueryProvider {...pageProps}>
        <Component {...pageProps} />
      </TanstackQueryProvider>
    </>
  );
}
