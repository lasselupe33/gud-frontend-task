import { css } from "@linaria/core";

import { units } from "../utils/css";
import { colors } from "../utils/design-tokens/colors";

export const header = css`
  border-bottom: ${units.px(1)} solid ${colors.gray.sim30()};

  display: flex;
  align-items: center;
  gap: ${units.px(15)};
`;
