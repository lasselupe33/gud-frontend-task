import { css } from "@linaria/core";

import { units } from "../../utils/css";

export const viewButtonsWrapper = css`
  margin-right: ${units.px(-10)};
  margin-bottom: ${units.px(25)};

  display: flex;
  justify-content: flex-end;
`;

export const list = css`
  &[data-view="list"] {
    display: flex;
    flex-direction: column;
    gap: ${units.px(25)};
  }

  &[data-view="grid"] {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(${units.px(200)}, 1fr));
    gap: ${units.px(7)};
  }
`;
