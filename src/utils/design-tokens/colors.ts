import { makeColorToken } from "../css/tokens/token.color";

const gray = {
  sim100: makeColorToken("--gray-100", "0 0 0"),
  sim80: makeColorToken("--gray-80", "51 51 51"),
  sim60: makeColorToken("--gray-60", "118 118 118"),
  sim30: makeColorToken("--gray-30", "173 173 173"),
  sim15: makeColorToken("--gray-15", "221 221 221"),
  sim05: makeColorToken("--gray-5", "240 240 240"),
  sim00: makeColorToken("--gray-0", "255 255 255"),
};

const accent = makeColorToken("--accent", "31 79 105");
const outline = makeColorToken("--outline", "94 158 214");

const text = {
  primary: gray.sim80.__extend("--text-primary"),
  secondary: gray.sim60.__extend("--text-secondary"),
};

export const colors = {
  accent,
  outline,
  white: gray.sim00,
  black: gray.sim100,
  gray,
  text,
};
