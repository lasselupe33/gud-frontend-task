import type { ColorToken } from "./token.color";
import { makeColorToken } from "./token.color";
import type { FontFaceDescriptor, FontToken } from "./token.font";
import type { ScalarToken } from "./token.scalar";
import { makeScalarToken } from "./token.scalar";
import type { OverridenTokenCSSProperties } from "./util.make-generic-token";
import { makeGenericToken } from "./util.make-generic-token";

export type TypographyTokenInput<TFontWeights extends string> = {
  fontFace:
    | FontToken<TFontWeights>
    | FontFaceDescriptor
    | {
        family: ScalarToken;
        weight: ScalarToken;
      };
  fontSize: string;
  fontStyle?: string;
  lineHeight: string | number;
  letterSpacing?: string | number;
  textTransform?: string;
  color?: ColorToken;
};

export type PartialTypographyTokenInput<TFontWeights extends string> = Partial<{
  fontFace:
    | FontToken<TFontWeights>
    | Partial<FontFaceDescriptor>
    | Partial<{
        family: ScalarToken;
        weight: ScalarToken;
      }>;
  fontSize: string;
  fontStyle: string;
  color: string | undefined;
  lineHeight: string | number;
  letterSpacing: string | number;
  textTransform: string;
}>;

export type TypographyToken = {
  (): string;

  fontFace: {
    family: ScalarToken;
    weight: ScalarToken;
  };
  color?: ColorToken;
  fontSize: ScalarToken;
  lineHeight: ScalarToken;
  fontStyle: ScalarToken;
  letterSpacing: ScalarToken;
  textTransform: ScalarToken;

  __override: <TFontWeights extends string>(
    input:
      | PartialTypographyTokenInput<TFontWeights>
      | TypographyToken
      | undefined,
  ) => OverridenTokenCSSProperties;

  __extend(propName: `--${string}`): TypographyToken;
};

export function makeTypographyToken<TFontWeights extends string>(
  propName: `--${string}`,
  input: TypographyTokenInput<TFontWeights> | TypographyToken,
): TypographyToken {
  const tokens = {
    fontFace: {
      family: makeScalarToken(
        `${propName}--font-family`,
        "__override" in input.fontFace
          ? input.fontFace.default.family
          : input.fontFace.family,
      ),

      weight: makeScalarToken(
        `${propName}--font-weight`,
        "__override" in input.fontFace
          ? input.fontFace.default.weight
          : input.fontFace.weight,
      ),
    },

    color: input.color
      ? makeColorToken(`${propName}--color`, input.color)
      : undefined,

    fontSize: makeScalarToken(`${propName}--font-size`, input.fontSize),
    lineHeight: makeScalarToken(`${propName}--line-height`, input.lineHeight),

    fontStyle: makeScalarToken(
      `${propName}--font-style`,
      input.fontStyle ?? "inherit",
    ),

    letterSpacing: makeScalarToken(
      `${propName}--letter-spacing`,
      input.letterSpacing ?? "inherit",
    ),

    textTransform: makeScalarToken(
      `${propName}--text-transform`,
      input.textTransform ?? "inherit",
    ),
  };

  return makeGenericToken(
    function format() {
      return [
        `${tokens.fontFace.weight()} ${tokens.fontSize()} ${tokens.fontFace.family()}`,
        `font-style:${tokens.fontStyle()}`,
        `line-height:${tokens.lineHeight()}`,
        `letter-spacing:${tokens.letterSpacing()}`,
        `text-transform:${tokens.textTransform()}`,
        tokens.color ? `color:${tokens.color()}` : undefined,
      ]
        .filter((it) => !!it)
        .join(";");
    },

    function override<TFontWeights extends string>(
      nextValue:
        | PartialTypographyTokenInput<TFontWeights>
        | TypographyToken
        | undefined,
    ) {
      if (nextValue === undefined) {
        return {};
      }

      return {
        ...tokens.fontFace.family.__override(
          nextValue.fontFace && "__override" in nextValue.fontFace
            ? nextValue.fontFace.default.family
            : nextValue.fontFace?.family,
        ),
        ...tokens.fontFace.weight.__override(
          nextValue.fontFace && "__override" in nextValue.fontFace
            ? nextValue.fontFace.default.weight
            : nextValue.fontFace?.weight,
        ),

        ...tokens.fontSize.__override(nextValue.fontSize),
        ...tokens.fontStyle.__override(nextValue.fontStyle),
        ...tokens.lineHeight.__override(nextValue.lineHeight),
        ...tokens.letterSpacing.__override(nextValue.letterSpacing),
        ...tokens.textTransform.__override(nextValue.textTransform),
      };
    },

    function copy(propName, token) {
      return makeTypographyToken(propName, token as TypographyToken);
    },

    tokens,

    // type casting is needed, because makeGenericToken cannot handle the
    // generic signature of the override function that handles the TFontWeights
    // input
  ) as TypographyToken;
}
