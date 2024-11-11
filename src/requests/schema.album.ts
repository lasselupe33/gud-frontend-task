import { z } from "zod";

export type AlbumModel = z.output<typeof albumSchema>;

export const albumSchema = z
  .object({
    idAlbum: z.string(),
    strAlbum: z.string(),
    strArtist: z.string(),
    intYearReleased: z.string(),
    strStyle: z.string().nullish().default(null),
    strGenre: z.string().nullish().default(null),
    strDescriptionEN: z.string().nullish().default(null),
    strAlbumThumb: z.string().nullish().default(null),
  })
  .transform((data) => ({
    id: data.idAlbum,
    name: data.strAlbum,

    description: data.strDescriptionEN,
    thumbnailSrc: data.strAlbumThumb,

    meta: {
      releaseYear: data.intYearReleased,
      genre: data.strGenre,
      style: data.strStyle,
    },
  }));
