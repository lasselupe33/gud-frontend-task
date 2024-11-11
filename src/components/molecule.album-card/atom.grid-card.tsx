import Link from "next/link";

import type { AlbumCardProps } from "./_album-card";
import * as styles from "./atom.grid-card.style";

export function GridCard(props: AlbumCardProps) {
  switch (props.context) {
    case "overview":
      return (
        <Link
          href={`/album/${props.album.id}`}
          aria-label={`Læs mere om ${props.album.name}`}
          className={styles.link}
        >
          <Content {...props} />
        </Link>
      );

    case "details":
      return (
        <div>
          <Content {...props} />
        </div>
      );
  }
}

function Content(props: AlbumCardProps) {
  return props.album.thumbnailSrc ? (
    // Note: Could be optimised using next/image given more time
    // Note: Postloading of images with fade-in could be implemented
    <img className={styles.img} src={props.album.thumbnailSrc} alt="" />
  ) : (
    <div className={styles.img} />
  );
}
