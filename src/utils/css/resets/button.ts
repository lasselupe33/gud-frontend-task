import { css } from "../util.compose-css";

export const button = css`
  appearance: none;

  margin: 0;
  padding: 0;

  background: transparent;
  border: none;
  border-radius: 0;

  display: inline-block;
  text-align: left;

  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
  font-style: inherit;
  text-transform: inherit;
  color: currentColor;

  cursor: pointer;
  outline: none;

  &[disabled] {
    cursor: not-allowed;
  }
`;
