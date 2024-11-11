import type { ScalarToken } from "./token.scalar";
import { makeScalarToken } from "./token.scalar";
import type { OverridenTokenCSSProperties } from "./util.make-generic-token";
import { makeGenericToken } from "./util.make-generic-token";

type FontFamily = string;
type FontWeight = string | number;

export type FontFaceDescriptor = {
  family: string;
  weight: string | number;
};

export type FontToken<TFontWeights extends string> = {
  (options?: { weight?: TFontWeights; priority?: "important" }): string;

  default: {
    family: ScalarToken;
    weight: ScalarToken;
  };

  fontFaces: Record<
    TFontWeights,
    {
      family: ScalarToken;
      weight: ScalarToken;
    }
  >;

  __override(
    definitions:
      | FontToken<TFontWeights>
      | Partial<Record<TFontWeights, [FontFamily, FontWeight]>>,
  ): OverridenTokenCSSProperties;

  __extend(propName: `--${string}`): FontToken<TFontWeights>;
};

export function makeFontToken<
  TFontWeights extends string,
  TDefaultFontWeight extends TFontWeights,
>(
  propName: `--${string}`,
  input: {
    fontFaces: Record<TFontWeights, [FontFamily, FontWeight]>;
    default: TDefaultFontWeight;
  },
): FontToken<TFontWeights> {
  const tokens = Object.fromEntries(
    (
      Object.entries(input.fontFaces) as Array<
        [TFontWeights, [FontFamily, FontWeight]]
      >
    ).map(([key, [fontFamily, fontWeight]]) => {
      return [
        key,
        {
          family: makeScalarToken(
            `${propName}--${key}--font-family`,
            fontFamily,
          ),
          weight: makeScalarToken(
            `${propName}--${key}--font-weight`,
            fontWeight,
          ),
        },
      ] as const;
    }),
  ) as Record<
    TFontWeights,
    {
      family: ScalarToken;
      weight: ScalarToken;
    }
  >;

  return makeGenericToken(
    function format(options) {
      const key = options?.weight ?? input.default;
      const fontFace = tokens[key];

      const priority = options?.priority === "important" ? " !important" : "";

      return `${fontFace.family()}${priority};font-weight:${fontFace.weight()}${priority}`;
    },

    function override(nextValue) {
      if (nextValue === undefined) {
        return {};
      }

      if ("__override" in nextValue) {
        return (Object.keys(nextValue.fontFaces) as TFontWeights[]).reduce(
          (acc, key) => {
            return {
              ...acc,
              ...tokens[key].family.__override(nextValue.fontFaces[key].family),
              ...tokens[key].weight.__override(nextValue.fontFaces[key].weight),
            };
          },
          {},
        );
      }

      return (Object.keys(nextValue) as TFontWeights[]).reduce((acc, key) => {
        const [fontFamily, fontWeight] = nextValue[key] ?? [];

        return {
          ...acc,
          ...tokens[key].family.__override(fontFamily),
          ...tokens[key].weight.__override(fontWeight),
        };
      }, {});
    },

    function extend(propName) {
      const prevTokens = Object.fromEntries(
        Object.entries<{
          family: ScalarToken;
          weight: ScalarToken;
        }>(tokens).map(([key, value]) => [
          key,
          [value.family(), value.weight()],
        ]),
      ) as unknown as Record<TFontWeights, [FontFamily, FontWeight]>;

      return makeFontToken(propName, {
        fontFaces: prevTokens,
        default: input.default,
      });
    },

    {
      fontFaces: tokens,
      default: tokens[input.default],
    },
  );
}
