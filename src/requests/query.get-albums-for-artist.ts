import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";

import { albumSchema } from "./schema.album";

export const getAlbumsForArtistQuery = (artistId: string) => {
  return {
    queryKey: ["albums-for-artist", artistId],
    queryFn: () => getAlbumsForArtistRequest(artistId),
  } satisfies UseQueryOptions;
};

async function getAlbumsForArtistRequest(artistId: string) {
  const res = await fetch(
    `https://www.theaudiodb.com/api/v1/json/2/album.php?i=${encodeURIComponent(artistId)}`,
  );

  if (!res.ok) {
    throw res;
  }

  return z
    .object({ album: z.array(albumSchema).nullable().default([]) })
    .parse(await res.json()).album;
}
