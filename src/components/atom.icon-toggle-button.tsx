import type { ReactNode } from "react";

import * as styles from "./atom.icon-toggle-button.style";

type Props = {
  label: string;
  active: boolean;

  icon: ReactNode;

  onClick(): void;
};

/**
 * WCAG considerations based on
 * https://www.w3.org/WAI/ARIA/apg/patterns/button/ ToggleButton pattern.
 *
 * Given more time, then the button should likely have a tooltip associated
 * such that non-screenreader users could access a descriptive textual
 * indication of the buttons intent.
 */
export function IconToggleButton(props: Props) {
  return (
    <button
      className={styles.button}
      aria-label={props.label}
      aria-pressed={props.active}
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  );
}
