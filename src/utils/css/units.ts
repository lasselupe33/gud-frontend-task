import { css } from "@linaria/core";

import { makeLengthToken } from "./tokens/token.length";
import { combineTokens } from "./tokens/util.combine-tokens";

/**
 * Exports a collection of commonly used units, which should be favored over
 * using regular units (e.g. ${units.px(10)} instead of 10px).
 *
 * The reason for favoring these units is two-fold:
 *
 * 1) keeping units as CSS Variables allow hot-swapping values per-brand
 *    (e.g. one brand may need components rendered 10% larger which can easily
 *          be achieved by units.override() and setting the "px" to be
 *          slightly larger.)
 *
 * 2) As rem is still generally favored over px in order to respect user zoom
 *    etc. then unit.px() can be configured to use rem under the hood while
 *    developers can implement styling using the familiar px unit.
 */
export const units = combineTokens("--unit", {
  px: ["1px", makeLengthToken],
  vh: ["1vh", makeLengthToken],
  vw: ["1vw", makeLengthToken],
});

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
css`
  :global(:root) {
    @supports (height: 100dvh) {
      ${units.vh.__override("1dvh").toString()};
    }
  }
`;
