import type { OverridenTokenCSSProperties } from "./util.make-generic-token";
import { makeGenericToken } from "./util.make-generic-token";

export type ScaleableTokenInput = string | number;
export type ScaleableToken = {
  (options?: { scale: string | number }): string;
  propName: string;
  defaultValue: ScaleableTokenInput;

  __override: (
    input: ScaleableTokenInput | (() => string) | undefined,
  ) => OverridenTokenCSSProperties;

  __extend(propName: `--${string}`): ScaleableToken;
};

export function makeScaleableToken(
  propName: `--${string}`,
  input: ScaleableTokenInput | (() => string),
): ScaleableToken {
  const defaultValue = typeof input === "function" ? input() : input;

  return makeGenericToken(
    function format(options?: { scale: number | string }) {
      const rawValue = `var(${propName}, ${defaultValue})`;

      return options?.scale === undefined
        ? rawValue
        : `calc(${options.scale} * ${rawValue})`;
    },

    function override(
      nextValue: ScaleableTokenInput | (() => string) | undefined,
    ) {
      if (nextValue === undefined) {
        return {};
      }

      return {
        [propName]:
          typeof nextValue === "function" ? nextValue() : String(nextValue),
      };
    },

    function extend(propName, token) {
      return makeScaleableToken(propName, token());
    },

    {
      propName,
      defaultValue,
    },
  );
}
