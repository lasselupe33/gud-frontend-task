import type { OverridenTokenCSSProperties } from "./util.make-generic-token";
import { makeGenericToken } from "./util.make-generic-token";

export type LengthTokenInput = `${number}${string}` | string;
export type LengthToken = {
  (value: number): string;
  propName: string;

  __override: (
    input: LengthTokenInput | (() => string) | undefined,
  ) => OverridenTokenCSSProperties;

  __extend(propName: `--${string}`): LengthToken;
};

/**
 * represents a token that translates to a CSS length (e.g. a number + a unit)
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/length
 */
export function makeLengthToken(
  propName: `--${string}`,
  input: LengthTokenInput,
): LengthToken {
  return makeGenericToken(
    function format(value: number) {
      return `calc(${value} * var(${propName}, ${input}))`;
    },

    function override(
      nextValue: LengthTokenInput | (() => string) | undefined,
    ) {
      if (nextValue === undefined) {
        return {};
      }

      return {
        [propName]:
          typeof nextValue === "function" ? nextValue() : String(nextValue),
      };
    },

    function extend(propName) {
      return makeLengthToken(
        propName,
        `var(${propName}, ${input})` as `${number}${string}`,
      );
    },

    {
      propName,
    },
  );
}
