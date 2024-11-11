import type {
  ColorToken,
  ColorTokenInput,
  ColorTokenOutput,
} from "./token.color";
import { makeColorToken } from "./token.color";
import type { OverridenTokenCSSProperties } from "./util.make-generic-token";
import { makeGenericToken } from "./util.make-generic-token";

export type SurfaceTokenInput = {
  background: ColorToken | ColorTokenInput | ColorTokenOutput;
  border?: ColorToken | ColorTokenInput | ColorTokenOutput;
  color: ColorToken | ColorTokenInput | ColorTokenOutput;
  inversedText?: ColorToken | ColorTokenInput | ColorTokenOutput;
};

export type PartialSurfaceTokenInput = Partial<{
  background: ColorToken | ColorTokenInput | ColorTokenOutput;
  border: ColorToken | ColorTokenInput | ColorTokenOutput;
  color: ColorToken | ColorTokenInput | ColorTokenOutput;
  inversedText: ColorToken | ColorTokenInput | ColorTokenOutput;
}>;

export type SurfaceToken = {
  (options?: {
    priority?: "important";
    property?: keyof SurfaceTokenInput;
    alpha?: number | { background?: number; border?: number; color?: number };
    exclude?: Array<Exclude<keyof SurfaceTokenInput, "background">>;
  }): string;

  background: ColorToken;
  border: ColorToken;
  color: ColorToken;
  inversedText: ColorToken;

  __override: (
    input: PartialSurfaceTokenInput | SurfaceToken | undefined,
  ) => OverridenTokenCSSProperties;

  __extend(propName: `--${string}`): SurfaceToken;
};

export function makeSurfaceToken(
  propName: `--${string}`,
  input: SurfaceTokenInput | SurfaceToken,
): SurfaceToken {
  const tokens = {
    background: makeColorToken(`${propName}--background`, input.background),
    border: makeColorToken(`${propName}--border`, input.border ?? "0 0 0 / 0"),
    color: makeColorToken(`${propName}--color`, input.color),
    inversedText: makeColorToken(
      `${propName}--inversed-text`,
      input.inversedText ?? input.color,
    ),
  };

  return makeGenericToken(
    function format(options) {
      const priority = options?.priority === "important" ? " !important" : "";

      const backgroundOptions = {
        alpha:
          typeof options?.alpha === "number"
            ? options.alpha
            : options?.alpha?.background,
      };

      const borderOptions = {
        alpha:
          typeof options?.alpha === "number"
            ? options.alpha
            : options?.alpha?.border,
      };

      const colorOptions = {
        alpha:
          typeof options?.alpha === "number"
            ? options.alpha
            : options?.alpha?.color,
      };

      switch (options?.property) {
        case "background":
          return `${tokens.background(backgroundOptions)}${priority}`;

        case "border":
          return `${tokens.border(borderOptions)}${priority}`;

        case "color":
          return `${tokens.color(colorOptions)}${priority}`;
      }

      return [
        `${tokens.background(backgroundOptions)}${priority}`,
        (!options?.exclude || !options.exclude.includes("border")) &&
          `border-color:${tokens.border(borderOptions)}${priority}`,
        (!options?.exclude || !options.exclude.includes("color")) &&
          `color:${tokens.color(colorOptions)}${priority}`,
      ]
        .filter(Boolean)
        .join(";");
    },

    function override(nextValue) {
      if (nextValue === undefined) {
        return {};
      }

      return {
        ...tokens.background.__override(nextValue.background),
        ...tokens.border.__override(nextValue.border),
        ...tokens.color.__override(nextValue.color),
        ...tokens.inversedText.__override(nextValue.inversedText),
      };
    },

    function extend(propName, token) {
      return makeSurfaceToken(propName, token);
    },

    tokens,
  );
}
