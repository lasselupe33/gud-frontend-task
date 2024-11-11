import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticPropsResult } from "next";

import type { TanstackQueryProviderProps } from "../components/provider.tanstack-query";
import { getAlbumsForArtistQuery } from "../requests/query.get-albums-for-artist";
import { HOURS_TO_SECONDS } from "../utils/constants";

export type OverviewProps = TanstackQueryProviderProps & {
  artistId: string;
};

const THE_WEEKND_ARTIST_ID = "112024";

/**
 * resolves and fetches the relevant book based on hostname and path segments.
 * Further fetching cannot be done serverside as it requires user
 * authentication which is handled through gateway.
 */
export async function getStaticProps(): Promise<
  GetStaticPropsResult<OverviewProps>
> {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    getAlbumsForArtistQuery(THE_WEEKND_ARTIST_ID),
  );

  return {
    revalidate: 8 * HOURS_TO_SECONDS,
    props: {
      artistId: THE_WEEKND_ARTIST_ID,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
