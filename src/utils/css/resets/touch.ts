import { css } from "../util.compose-css";

export const touch = css`
  /** We handle all hover/focus/touch states ourselves and
    thus default touch callout should be disabled */
  -webkit-tap-highlight-color: rgb(0 0 0 / 0);
`;
