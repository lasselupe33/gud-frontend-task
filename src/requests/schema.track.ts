import { z } from "zod";

export type TrackModel = z.output<typeof trackSchema>;

export const trackSchema = z
  .object({
    idTrack: z.string(),
    strTrack: z.string(),
    intDuration: z.string().nullish().default(null),
    strGenre: z.string().nullish().default(null),
  })
  .transform((data) => ({
    id: data.idTrack,
    name: data.strTrack,

    meta: {
      durationInMs: Number(data.intDuration),
      genre: data.strGenre,
    },
  }));
