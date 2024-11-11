import { css } from "@linaria/core";

import { units } from "../../utils/css";
import { colors } from "../../utils/design-tokens/colors";
import { typographies } from "../../utils/design-tokens/typographies";

export const container = css`
  padding-bottom: ${units.px(30)};

  border-bottom: ${units.px(1)} solid ${colors.gray.sim15()};

  display: flex;
  flex-direction: column;
  gap: ${units.px(6)};

  font: ${typographies.caption()};
`;

export const img = css`
  width: 100%;
  aspect-ratio: 1;

  background-color: rgba(0 0 0 / 0.1);

  object-fit: cover;
`;

export const label = css`
  font: ${typographies.label()};
`;

export const meta = css`
  margin-top: ${units.px(6)};
  color: ${colors.text.secondary()};
`;
