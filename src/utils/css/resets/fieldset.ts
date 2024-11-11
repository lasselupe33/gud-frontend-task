import { css } from "../util.compose-css";

// See https://thatemil.com/blog/2015/01/03/reset-your-fieldset/
export const legend = css`
  padding: 0;
  display: table;
`;

export const fieldset = css`
  margin: 0;
  padding: 0.01em 0 0;

  min-width: 0;

  border: 0;

  body:not(:-moz-handler-blocked) & {
    display: table-cell;
  }
`;
