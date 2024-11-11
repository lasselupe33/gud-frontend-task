import { css } from "@linaria/core";

import { units } from "../../utils/css";
import { colors } from "../../utils/design-tokens/colors";

export const link = css`
  width: 100%;
  background-color: rgba(0 0 0 / 0.1);
  display: block;

  &:focus-visible {
    outline: ${units.px(3)} solid ${colors.outline()};
    outline-offset: ${units.px(2)};
  }
`;

export const img = css`
  height: 100%;
  width: 100%;
  aspect-ratio: 1;

  background-color: rgba(0 0 0 / 0.1);

  object-fit: cover;
`;
