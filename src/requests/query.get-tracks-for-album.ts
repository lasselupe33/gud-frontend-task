import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";

import { trackSchema } from "./schema.track";

export const getTracksForAlbumQuery = (albumId: string) => {
  return {
    queryKey: ["tracks-for-album", albumId],
    queryFn: () => getTracksForAlbumRequest(albumId),
  } satisfies UseQueryOptions;
};

async function getTracksForAlbumRequest(albumId: string) {
  const res = await fetch(
    `https://www.theaudiodb.com/api/v1/json/2/track.php?m=${encodeURIComponent(albumId)}`,
  );

  if (!res.ok) {
    throw res;
  }

  try {
    return z
      .object({ track: z.array(trackSchema).nullable().default([]) })
      .parse(await res.json()).track;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
