import { css } from "@linaria/core";

import { breakpoints, units } from "../utils/css";
import { colors } from "../utils/design-tokens/colors";
import { typographies } from "../utils/design-tokens/typographies";

export const wrapper = css`
  margin-block: ${units.px(80)};
  margin-inline: auto;
  padding-inline: ${units.px(30)};

  max-width: ${units.px(650)};

  display: flex;
  flex-direction: column;
  gap: ${units.px(25)};

  @media ${breakpoints.mobile.andDown().toQuery()} {
    margin-block: ${units.px(50)};
    padding-inline: ${units.px(15)};
  }
`;

export const goBackButton = css`
  flex-shrink: 0;

  font: ${typographies.heading2()};
  color: ${colors.text.secondary()};

  transition: color 0.075s linear;

  &:hover,
  &:focus-visible {
    color: ${colors.accent()};
  }

  &:focus-visible {
    outline: ${units.px(2)} solid ${colors.outline()};
  }
`;

export const list = css`
  display: flex;
  flex-direction: column;
  gap: ${units.px(25)};
`;
