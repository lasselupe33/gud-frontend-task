import { css } from "@linaria/core";

import { breakpoints, units } from "../utils/css";
import { colors } from "../utils/design-tokens/colors";

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

export const headingCount = css`
  color: ${colors.text.secondary()};
`;
