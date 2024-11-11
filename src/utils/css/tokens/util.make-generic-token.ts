/**
 * React CSSProperties doesn't add typing for custom properties out of the box,
 * we augment it here to ensure that this is fully supported
 */
export type CSSWithCustomProperties = React.CSSProperties &
  Record<`--${string}`, string>;

export type OverridenTokenCSSProperties = CSSWithCustomProperties & {
  toString(): string;
};

export type GenericToken<
  TInput,
  TOutput extends string,
  TOptions extends unknown[],
  TToken,
> = {
  (...options: TOptions): TOutput;
  __override(input: TInput): OverridenTokenCSSProperties;
  __extend(propName: `--${string}`): TToken;
};

/**
 * low-level utility designed to be used in other token maker functions to
 * abstract boiler-platey code
 *
 * this method is NOT intended to be used for the actual creation of tokens,
 * if you're looking to do so, please refer to one of the specific
 * implementations (e.g. makeColorToken or makeFontToken)
 */
export function makeGenericToken<
  TOptions extends unknown[],
  TInput,
  TOutput extends string,
  TTokenProps extends Record<`__${string}`, unknown>,
  TCopiedToken,
>(
  formatter: (...args: TOptions) => TOutput,
  override: (input: TInput) => CSSWithCustomProperties,
  extend: (
    propName: `--${string}`,
    token: GenericToken<TInput, TOutput, TOptions, TCopiedToken> & TTokenProps,
  ) => TCopiedToken,
  tokenProps: TTokenProps,
): GenericToken<TInput, TOutput, TOptions, TCopiedToken> & TTokenProps {
  const token = Object.assign((...args: TOptions) => formatter(...args), {
    ...tokenProps,

    __extend: (propName: `--${string}`) => {
      return extend(propName, token);
    },
    __override: (nextValue: TInput) => {
      const output = override(nextValue);

      // define a toString() method, which will translate the CSS property
      // record into a valid CSS string that can be interpolated into e.g.
      // linaria
      Object.defineProperty(output, "toString", {
        enumerable: false,
        value: () => {
          const css = Object.entries(output)
            .flatMap(([key, value]) => `${key}:${value}`)
            .join(";");

          return css ? `${css};` : "";
        },
      });

      return output;
    },
  });

  return token;
}
