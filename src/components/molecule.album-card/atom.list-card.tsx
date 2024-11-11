import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";

import { resets } from "../../utils/css";
import { triggerEventOnContainerClick } from "../../utils/dom.trigger-event-on-container";

import type { AlbumCardProps } from "./_album-card";
import * as styles from "./atom.list-card.style";

/**
 * WCAG implemented following https://design-system.w3.org/components/cards.html
 */
export function ListCard(props: AlbumCardProps) {
  const router = useRouter();
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleCardClick = (evt: React.MouseEvent) => {
    if (props.context !== "overview") {
      return;
    }

    triggerEventOnContainerClick(evt, linkRef);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={styles.container}
      data-context={props.context}
      onClick={handleCardClick}
    >
      {props.album.thumbnailSrc && (
        <img className={styles.img} src={props.album.thumbnailSrc} alt="" />
      )}

      <div className={styles.caption}>
        <p>
          <b className={styles.label}>{props.album.name}.</b>{" "}
          {props.album.description}
        </p>

        <ul className={styles.meta}>
          <li>
            Udgivet: <b>{props.album.meta.releaseYear}</b>
          </li>
          {props.album.meta.genre && (
            <li>
              Genre: <b>{props.album.meta.genre}</b>
            </li>
          )}
          {props.album.meta.style && (
            <li>
              Stil: <b>{props.album.meta.style}</b>
            </li>
          )}
        </ul>
      </div>

      {props.context === "overview" && (
        <Link
          ref={linkRef}
          onClick={(evt) => {
            if (!evt.isTrusted) {
              evt.stopPropagation();
              router.push(`/album/${props.album.id}`);
            }
          }}
          href={`/album/${props.album.id}`}
          className={resets.screenReaderOnlyCls}
        >
          Læs mere om {props.album.name}
        </Link>
      )}
    </div>
  );
}
