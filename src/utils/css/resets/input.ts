import { css } from "../util.compose-css";

export const input = css`
  appearance: none;

  margin: 0;
  padding: 0;

  background-color: transparent;
  border: none;

  font-family: inherit;
  font-size: inherit;

  outline: none;

  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-appearance: none;

  &::-webkit-clear-button {
    appearance: none;

    /* stylelint-disable-next-line property-no-vendor-prefix */
    -moz-appearance: none;

    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-appearance: none;
  }

  &[type="search"]::-webkit-search-decoration,
  &[type="search"]::-webkit-search-cancel-button,
  &[type="search"]::-webkit-search-results-button,
  &[type="search"]::-webkit-search-results-decoration {
    appearance: none;

    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-appearance: none;
  }
`;
