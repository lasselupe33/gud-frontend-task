import { useQuery } from "@tanstack/react-query";
import Head from "next/head";

import { Header } from "../components/atom.header";
import { AlbumList } from "../components/organism.album-list/_album-list";
import { getAlbumsForArtistQuery } from "../requests/query.get-albums-for-artist";

import type { OverviewProps } from "./_get-props";
import * as styles from "./_page.style";

export function OverviewPage(props: OverviewProps) {
  const albums = useQuery(getAlbumsForArtistQuery(props.artistId)).data;

  return (
    <main className={styles.wrapper}>
      <Head>
        <title>The Weeknd</title>
      </Head>

      <Header>
        <h1>
          Albums{" "}
          {albums?.length && (
            <span className={styles.headingCount}>({albums?.length})</span>
          )}
        </h1>
      </Header>

      <AlbumList albums={albums ?? []} />
    </main>
  );
}
