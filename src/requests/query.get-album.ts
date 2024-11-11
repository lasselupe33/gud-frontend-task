import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";

import { albumSchema } from "./schema.album";

export const getAlbumByIdQuery = (albumId: string) => {
  return {
    queryKey: ["album", albumId],
    queryFn: () => getAlbumByIdRequest(albumId),
  } satisfies UseQueryOptions;
};

async function getAlbumByIdRequest(albumId: string) {
  const res = await fetch(
    `https://www.theaudiodb.com/api/v1/json/2/album.php?m=${encodeURIComponent(albumId)}`,
  );

  if (!res.ok) {
    throw res;
  }

  // NB: .min(1) forces our album array to include at least one album, and as
  // such we know that album[0] exists.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return z
    .object({ album: z.array(albumSchema).min(1) })
    .parse(await res.json()).album[0]!;
}
