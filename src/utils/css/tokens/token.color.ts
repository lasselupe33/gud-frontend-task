import type { ScalarToken } from "./token.scalar";
import { makeScalarToken } from "./token.scalar";
import type { OverridenTokenCSSProperties } from "./util.make-generic-token";
import { makeGenericToken } from "./util.make-generic-token";

export type ColorTokenFragment =
  | `${number}`
  | `var(${string})`
  | `calc(${string})`;

export type ColorTokenInput =
  | `${ColorTokenFragment} ${ColorTokenFragment} ${ColorTokenFragment}`
  | `${ColorTokenFragment} ${ColorTokenFragment} ${ColorTokenFragment} / ${ColorTokenFragment}`;

export type ColorTokenOutput =
  `rgba(${ColorTokenFragment} ${ColorTokenFragment} ${ColorTokenFragment} / ${ColorTokenFragment})`;

type Options = {
  alpha?: number;
  mix?: {
    with: ColorTokenInput | ColorTokenOutput | ColorToken;
    ratio: number;
  };
};

export type ColorToken = {
  (options?: Options): ColorTokenOutput;

  r: ScalarToken;
  g: ScalarToken;
  b: ScalarToken;
  alpha: ScalarToken;

  __override: (
    input: ColorTokenInput | ColorTokenOutput | ColorToken | undefined,
  ) => OverridenTokenCSSProperties;

  __extend(propName: `--${string}`): ColorToken;
};

export function makeColorToken(
  propName: `--${string}`,
  input: ColorTokenInput | ColorTokenOutput | ColorToken,
): ColorToken {
  const tokens = (() => {
    if (typeof input === "string") {
      const [r, g, b, alpha] = extractColorFragments(input);

      return {
        r: makeScalarToken(`${propName}--r`, r),
        g: makeScalarToken(`${propName}--g`, g),
        b: makeScalarToken(`${propName}--b`, b),
        alpha: makeScalarToken(`${propName}--alpha`, alpha),
      };
    }

    return {
      r: input.r.__extend(`${propName}--r`),
      g: input.g.__extend(`${propName}--g`),
      b: input.b.__extend(`${propName}--b`),
      alpha: input.alpha.__extend(`${propName}--alpha`),
    };
  })();

  return makeGenericToken(
    function format(options?: Options): ColorTokenOutput {
      let r: ColorTokenFragment = tokens.r();
      let g: ColorTokenFragment = tokens.g();
      let b: ColorTokenFragment = tokens.b();

      if (options?.mix) {
        const withRgb = (() => {
          if (typeof options.mix.with === "string") {
            const [r, g, b] = extractColorFragments(options.mix.with);

            return { r, g, b };
          }

          return {
            r: options.mix.with.r(),
            g: options.mix.with.g(),
            b: options.mix.with.b(),
          };
        })();

        r = `calc(${tokens.r()} * ${options.mix.ratio} + ${withRgb.r} * ${
          1 - options.mix.ratio
        })`;
        g = `calc(${tokens.g()} * ${options.mix.ratio} + ${withRgb.g} * ${
          1 - options.mix.ratio
        })`;
        b = `calc(${tokens.b()} * ${options.mix.ratio} + ${withRgb.b} * ${
          1 - options.mix.ratio
        })`;
      }

      return `rgba(${r} ${g} ${b} / ${options?.alpha ?? tokens.alpha()})`;
    },

    function override(
      nextValue: ColorToken | ColorTokenInput | ColorTokenOutput | undefined,
    ) {
      if (nextValue === undefined) {
        return {};
      }

      if (typeof nextValue === "string") {
        const [nextR, nextG, nextB, nextAlpha] =
          extractColorFragments(nextValue);

        return {
          ...tokens.r.__override(nextR),
          ...tokens.g.__override(nextG),
          ...tokens.b.__override(nextB),
          ...tokens.alpha.__override(nextAlpha),
        };
      }

      return {
        ...tokens.r.__override(nextValue.r()),
        ...tokens.g.__override(nextValue.g()),
        ...tokens.b.__override(nextValue.b()),
        ...tokens.alpha.__override(nextValue.alpha()),
      };
    },

    function extend(propName, token) {
      return makeColorToken(propName, token);
    },

    {
      r: tokens.r,
      g: tokens.g,
      b: tokens.b,
      alpha: tokens.alpha,
    },
  );
}

function extractColorFragments(
  input: ColorTokenInput | ColorTokenOutput,
): [
  r: ColorTokenFragment,
  g: ColorTokenFragment,
  b: ColorTokenFragment,
  alpha: ColorTokenFragment,
] {
  // remove the rgba() part of the ColorTokenOutput, so we can work with a raw
  // input
  const rawInput = (
    input.startsWith("rgba(") ? input.substring(5, input.length - 1) : input
  ) as ColorTokenInput;

  // begin parsing each rgb fragment within the input one-by-one
  const [r, remainingInput1] = extractFirstColorFragmentFromString(
    rawInput,
    false,
  );
  const [g, remainingInput2] = extractFirstColorFragmentFromString(
    remainingInput1,
    false,
  );
  const [b, remainingInput3] = extractFirstColorFragmentFromString(
    remainingInput2,
    false,
  );

  // if there is any content left, then verify that it's an alpha fragment
  const alphaInput = remainingInput3.trimStart();

  if (alphaInput.length > 0 && !alphaInput.startsWith("/")) {
    throw new Error(
      `extractColorFragments(): rgb segments extracted, but alpha not valid in input '${input}'`,
    );
  }

  const [alpha, remainingInput4] =
    alphaInput.length > 0
      ? extractFirstColorFragmentFromString(alphaInput.substring(1), true)
      : ([`${1}`, ""] as const);

  // if there is any content left after parsing alpha, then the input was
  // invalid
  if (remainingInput4.trim().length > 0) {
    throw new Error(
      `extractColorFragments(): rgb and alpha segments extracted, but end of input not found '${input}'`,
    );
  }

  return [r, g, b, alpha];
}

function extractFirstColorFragmentFromString(
  input: string,
  allowDecimals: boolean,
): [fragment: ColorTokenFragment, remaining: string] {
  const rawInput = input.trimStart();

  if (!rawInput.startsWith("calc(") && !rawInput.startsWith("var(")) {
    // if we're handling a literal value, then extract it and verify that it's
    // parseable as a numeric value
    const fragmentString = rawInput.includes(" ")
      ? rawInput.substring(0, rawInput.indexOf(" "))
      : rawInput;
    const fragmentValue = parseFloat(fragmentString);

    if (Number.isNaN(fragmentValue)) {
      throw new Error(
        `extractFirstColorFragmentFromString(): unable to extract fragment from input '${input}'`,
      );
    }

    if (!allowDecimals && fragmentValue !== Math.round(fragmentValue)) {
      throw new Error(
        `extractFirstColorFragmentFromString(): decimals not allowed in input '${input}'`,
      );
    }

    return [`${fragmentValue}`, rawInput.substring(fragmentString.length)];
  }

  // if we're handling an interpolation statement, then continue extraction
  // until all start parenthesises have been closed
  let openedParenthesises = 0;
  let closedParenthesises = 0;
  let fragmentString = rawInput.substring(0, rawInput.indexOf("("));

  outerLoop: for (let i = fragmentString.length; i < rawInput.length; i++) {
    const currChar = rawInput.charAt(i);
    switch (currChar) {
      case "(":
        fragmentString += currChar;
        openedParenthesises++;
        break;

      case ")":
        fragmentString += currChar;
        closedParenthesises++;

        if (closedParenthesises === openedParenthesises) {
          break outerLoop;
        }
        break;

      default:
        fragmentString += currChar;
    }
  }

  if (openedParenthesises !== closedParenthesises) {
    throw new Error(
      `extractFirstColorFragmentFromString(): unable to parse interpolation statement from input '${input}'`,
    );
  }

  return [
    fragmentString as ColorTokenFragment,
    rawInput.substring(fragmentString.length),
  ];
}
