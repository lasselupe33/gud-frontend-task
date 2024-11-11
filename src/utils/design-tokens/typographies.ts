import { units } from "../css";
import { makeTypographyToken } from "../css/tokens/token.typography";

import { colors } from "./colors";
import { fonts } from "./fonts";

const heading1 = makeTypographyToken("--heading-1", {
  fontFace: fonts.volkhov.fontFaces["bold"],
  fontSize: units.px(28),
  lineHeight: 1.6,
});

const heading2 = makeTypographyToken("--heading-2", {
  fontFace: fonts.volkhov.fontFaces["bold"],
  fontSize: units.px(24),
  lineHeight: 1.6,
});

const caption = makeTypographyToken("--caption", {
  fontFace: fonts.notoSans,
  fontSize: units.px(15),
  lineHeight: 1.6,
});

const label = makeTypographyToken("--detail", {
  fontFace: fonts.notoSans.fontFaces.bold,
  fontSize: units.px(15),
  lineHeight: 1.6,
  color: colors.text.secondary,
});

export const typographies = {
  heading1,
  heading2,

  label,
  caption,
};
