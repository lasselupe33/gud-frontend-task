import { makeFontToken } from "../css/tokens/token.font";

const volkhov = makeFontToken("--volkhov", {
  fontFaces: {
    bold: ["'Volkhov', serif", 700],
  },
  default: "bold",
});

const notoSans = makeFontToken("--noto-sans", {
  fontFaces: {
    default: ["'Noto Sans', serif", 400],
    bold: ["'Noto Sans', serif", 700],
  },
  default: "default",
});

export const fonts = {
  volkhov,
  notoSans,
};
