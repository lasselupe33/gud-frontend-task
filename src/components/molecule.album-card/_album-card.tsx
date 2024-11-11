import type { AlbumModel } from "../../requests/schema.album";
import type { ViewMode } from "../organism.album-list/typings.view-mode";

import { GridCard } from "./atom.grid-card";
import { ListCard } from "./atom.list-card";

export type AlbumCardProps = {
  viewMode: ViewMode;
  context: "details" | "overview";

  album: AlbumModel;
};

export function AlbumCard(props: AlbumCardProps) {
  switch (props.viewMode) {
    case "list":
      return <ListCard {...props} />;

    case "grid":
      return <GridCard {...props} />;
  }
}
