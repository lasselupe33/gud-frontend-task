import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Header } from "../components/atom.header";
import { AlbumCard } from "../components/molecule.album-card/_album-card";
import { TrackCard } from "../components/molecule.track-details/_track-details";
import { getAlbumByIdQuery } from "../requests/query.get-album";
import { getTracksForAlbumQuery } from "../requests/query.get-tracks-for-album";

import type { DetailProps } from "./_get-props";
import * as styles from "./_page.style";

export function DetailPage(props: DetailProps) {
  const router = useRouter();
  const album = useQuery(getAlbumByIdQuery(props.albumId)).data;
  const tracks = useQuery(getTracksForAlbumQuery(props.albumId)).data;

  if (!album) {
    // Note: In case loading fails in any form, then some kind of user feedback
    // should be implemented.
    return null;
  }

  const handleGoBack = (evt: React.MouseEvent) => {
    if (evt.metaKey || evt.ctrlKey) {
      // if user is holding down modifier keys, then bail out and let the
      // browser use built-in navigation concepts to open links in new tabs
      return;
    }

    evt.preventDefault();
    router.back();
  };

  return (
    <main className={styles.wrapper}>
      <Head>
        <title>{album.name}</title>
      </Head>

      <Header>
        <Link className={styles.goBackButton} href="/" onClick={handleGoBack}>
          Gå tilbage
        </Link>

        <h1>{album.name}</h1>
      </Header>

      <AlbumCard viewMode="list" context="details" album={album} />

      {!!tracks?.length && (
        <>
          <h2>Sange i albummet</h2>

          <ul className={styles.list}>
            {tracks.map((track) => (
              <li key={track.id}>
                <TrackCard track={track} />
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
