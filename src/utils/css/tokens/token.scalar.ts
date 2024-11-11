import type { OverridenTokenCSSProperties } from "./util.make-generic-token";
import { makeGenericToken } from "./util.make-generic-token";

export type ScalarTokenInput = string | number;
export type ScalarTokenOutput = `var(${string}, ${ScalarTokenInput})`;

export type ScalarToken = {
  (): ScalarTokenOutput;
  propName: string;
  defaultValue: ScalarTokenInput;

  __override: (
    input: ScalarTokenInput | (() => string) | undefined,
  ) => OverridenTokenCSSProperties;

  __extend(propName: `--${string}`): ScalarToken;
};

export function makeScalarToken(
  propName: `--${string}`,
  input: ScalarTokenInput | ScalarToken | (() => string),
): ScalarToken {
  const realDefaultValue = (() => {
    if (typeof input === "function" && "defaultValue" in input) {
      return input.defaultValue;
    }

    if (typeof input === "function") {
      return input();
    }

    return input;
  })();

  const appliedDefaultValue = (() => {
    if (typeof input === "function") {
      return input();
    }

    return input;
  })();

  return makeGenericToken(
    function format() {
      return `var(${propName}, ${appliedDefaultValue})`;
    },

    function override(
      nextValue: ScalarTokenInput | (() => string) | undefined,
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
      return makeScalarToken(propName, token);
    },

    {
      propName,
      defaultValue: realDefaultValue,
    },
  );
}
