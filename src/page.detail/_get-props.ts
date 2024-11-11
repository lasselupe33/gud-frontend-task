import { dehydrate, QueryClient } from "@tanstack/react-query";
import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { z } from "zod";

import type { TanstackQueryProviderProps } from "../components/provider.tanstack-query";
import { getAlbumByIdQuery } from "../requests/query.get-album";
import { getTracksForAlbumQuery } from "../requests/query.get-tracks-for-album";
import { HOURS_TO_SECONDS } from "../utils/constants";

export type DetailProps = TanstackQueryProviderProps & {
  albumId: string;
};

const requiredParamSchema = z.preprocess(
  (val) =>
    val ? decodeURIComponent(Array.isArray(val) ? val[0] : val) : undefined,
  z.string(),
);

/**
 * resolves and fetches the relevant book based on hostname and path segments.
 * Further fetching cannot be done serverside as it requires user
 * authentication which is handled through gateway.
 */
export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<DetailProps>> {
  const albumId = requiredParamSchema.parse(context.params?.["albumId"]);

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getAlbumByIdQuery(albumId)),
    queryClient.prefetchQuery(getTracksForAlbumQuery(albumId)),
  ]);

  return {
    revalidate: 8 * HOURS_TO_SECONDS,
    props: {
      albumId,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    fallback: "blocking",
    paths: [],
  };
}
