import { css } from "@linaria/core";

import { units } from "../utils/css";
import { colors } from "../utils/design-tokens/colors";

export const button = css`
  height: ${units.px(40)};
  width: ${units.px(40)};

  border-radius: ${units.px(4)};

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${colors.text.secondary()};

  transition:
    color 0.075s linear,
    background-color 0.075s linear;

  &:focus-visible {
    outline: ${units.px(2)} solid ${colors.outline()};
  }

  & > svg {
    transition: fill 0.15s linear;
  }

  &:not([aria-pressed="true"]):hover {
    background-color: ${colors.gray.sim05()};
    color: ${colors.accent()};
  }

  &[aria-pressed="true"] {
    color: ${colors.accent()};

    & > svg {
      fill: ${colors.accent()};
    }
  }
`;
