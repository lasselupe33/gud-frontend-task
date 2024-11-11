import { css } from "@linaria/core";

import { css as rawCss } from "../util.compose-css";

export const visuallyHidden = rawCss`
  position: absolute;
  top: auto;
  left: -10000px;

  height: 1px;
  width: 1px;

  overflow: hidden;
`;

/**
 * Forces content to only be visible on a screen-reader
 *
 * See https://webaim.org/techniques/css/invisiblecontent/
 */
export const screenReaderOnlyCls = css`
  ${visuallyHidden};
`;

export const visibleOnFocusCls = css`
  &:focus {
    position: static;

    height: auto;
    width: auto;
  }
`;
