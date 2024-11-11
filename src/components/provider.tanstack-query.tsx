import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { HOURS_TO_MS } from "../utils/constants";

export type TanstackQueryProviderProps = {
  dehydratedState: unknown;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 8 * HOURS_TO_MS,
      gcTime: 8 * HOURS_TO_MS,
    }
  }
})

export function TanstackQueryProvider(props: TanstackQueryProviderProps & {
  children: ReactNode | ReactNode[];
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={props.dehydratedState}>
        {props.children}
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
