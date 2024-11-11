import type { TrackModel } from "../../requests/schema.track";

import * as styles from "./_track-details.style";
import { formatDuration } from "./util.format-duration";

export type Props = {
  track: TrackModel;
};

export function TrackCard(props: Props) {
  return (
    <div className={styles.container}>
      <p>
        <b className={styles.label}>{props.track.name}.</b>{" "}
      </p>

      <ul className={styles.meta}>
        <li>
          Længde: <b>{formatDuration(props.track.meta.durationInMs)}</b>
        </li>
        {props.track.meta.genre && (
          <li>
            Genre: <b>{props.track.meta.genre}</b>
          </li>
        )}
      </ul>
    </div>
  );
}
