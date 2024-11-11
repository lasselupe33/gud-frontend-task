import type { ScalarToken } from "./token.scalar";
import { makeScalarToken } from "./token.scalar";
import type {
  GenericToken,
  OverridenTokenCSSProperties,
} from "./util.make-generic-token";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyToken = GenericToken<any, any, any, GenericToken<any, any, any, any>>;
type TokenMakerCallback<TInput, TOutput extends AnyToken> = (
  propName: `--${string}`,
  input: TInput,
) => TOutput;

// combineToken accepts multiple different kinds of inputs, which are each going
// to be processed in different ways
type ExistingTokenInput = AnyToken;
type PrimitiveTokenInput = string | number;
type TupleTokenInput<TInput, TOutput extends AnyToken> = [
  TInput,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TokenMakerCallback<any, TOutput>,
];

// the overall input signature for the method will consist of a tuple of inputs,
// which will in turn create an output record of tokens based on that input
type Input = Record<
  string,
  PrimitiveTokenInput | TupleTokenInput<unknown, AnyToken> | ExistingTokenInput
>;

type CombinedTokenRecord<T extends Input> = {
  [K in keyof T]: T[K] extends PrimitiveTokenInput
    ? // given a primitive input, a scalar token will be created automatically
      ScalarToken
    : // given an existing pre-created token, an identical (extended) token is
      // return
      T[K] extends ExistingTokenInput
      ? T[K]
      : // given a tuple, a token is created based on the maker callback
        T[K] extends TupleTokenInput<unknown, infer TOutput>
        ? TOutput
        : never;
};

type Output<T extends Input> = CombinedTokenRecord<T> & {
  propName: `--${string}`;

  // allows overriding the individual tokens on a per-token basis
  __override: (
    input: Partial<{
      [K in keyof T]: Parameters<CombinedTokenRecord<T>[K]["__override"]>[0];
    }>,
  ) => OverridenTokenCSSProperties;
  __extend: (extendedPropName: `--${string}`) => Output<T>;
};

// finally we need a validation of tuple based inputs, where we need to
// guarantee that the input matches what's expected by the maker callback,
// otherwise we loose type-safety of inputs in the following shape:
//
// { invalidColor: ["not a color", makeColorToken] }
type ValidateInput<T extends Input> = {
  [K in keyof T]: T[K] extends [
    unknown,
    TokenMakerCallback<infer TInput, infer TOutput>,
  ]
    ? // given a tuple, ensure that input is consistent with the expected
      // signature from the maker function
      [TInput, TokenMakerCallback<TInput, TOutput>]
    : T[K];
};

/**
 * combine a record of tokens under a singular namespace, so that they are
 * easily distinguishable within the browser developer tools, and that they can
 * be overridden together in a single callback
 */
export function combineTokens<T extends Input>(
  propName: `--${string}`,
  tokens: ValidateInput<T> | CombinedTokenRecord<T>,
): Output<T> {
  const combinedTokens = Object.fromEntries(
    Object.entries(tokens).map(
      ([key, item]: [
        string,
        (
          | PrimitiveTokenInput
          | TupleTokenInput<unknown, AnyToken>
          | ExistingTokenInput
        ),
      ]) => {
        const nestedName = `${propName}--${key}` as const;

        if (Array.isArray(item)) {
          const [input, factory] = item;
          return [key, factory(nestedName, input)] as const;
        } else if (typeof item === "function") {
          return [key, item.__extend(nestedName)] as const;
        } else {
          return [key, makeScalarToken(nestedName, item)] as const;
        }
      },
    ),
  ) as CombinedTokenRecord<T>;

  Object.defineProperties(combinedTokens, {
    propName: {
      enumerable: false,
      value: propName,
    },

    __override: {
      enumerable: false,
      value: (
        input: Partial<{
          [K in keyof T]: Parameters<
            CombinedTokenRecord<T>[K]["__override"]
          >[0];
        }>,
      ) => {
        const output = Object.entries(input).reduce((acc, [key, nextValue]) => {
          return {
            ...acc,
            ...combinedTokens[key as keyof T]?.__override(nextValue),
          };
        }, {});

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
    },

    __extend: {
      enumerable: false,
      value: (extendedPropName: `--${string}`) => {
        return combineTokens(extendedPropName, combinedTokens);
      },
    },
  });

  return combinedTokens as Output<T>;
}
