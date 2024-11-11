import { useRouter } from "next/router";
import { useState } from "react";

import type { AlbumModel } from "../../requests/schema.album";
import { IconToggleButton } from "../atom.icon-toggle-button";
import { GridViewIcon } from "../icons/grid-view";
import { ListViewIcon } from "../icons/list-view";
import { AlbumCard } from "../molecule.album-card/_album-card";

import * as styles from "./_album-list.style";
import { viewModeSchema, type ViewMode } from "./typings.view-mode";

type Props = {
  albums: AlbumModel[];
};

export function AlbumList(props: Props) {
  const router = useRouter();

  // NB: As our pages are statically rendered during SSR, then router
  // parameters will not be available until clientside JS has been loaded.
  //
  // Let's wait for this before showing the list to avoid flicker when the
  // correct viewMode is initially loaded.
  if (!router.isReady) {
    return null;
  }

  return <Content {...props} />;
}

function Content(props: Props) {
  const router = useRouter();

  const [view, setView] = useState<ViewMode>(
    viewModeSchema.parse(router.query["view"]),
  );

  const handleViewChange = (nextView: ViewMode) => {
    setView(nextView);
    router.replace(
      {
        query: {
          ...router.query,
          view: nextView,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <div>
      <div className={styles.viewButtonsWrapper}>
        <IconToggleButton
          label="Vis elementer i liste"
          icon={<ListViewIcon />}
          active={view === "list"}
          onClick={() => handleViewChange("list")}
        />
        <IconToggleButton
          label="Vis elementer i grid"
          icon={<GridViewIcon />}
          active={view === "grid"}
          onClick={() => handleViewChange("grid")}
        />
      </div>

      <ul className={styles.list} data-view={view}>
        {props.albums.map((album) => (
          <li key={album.id}>
            <AlbumCard viewMode={view} album={album} context="overview" />
          </li>
        ))}
      </ul>
    </div>
  );
}