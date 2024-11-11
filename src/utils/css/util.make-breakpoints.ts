/* eslint-disable @typescript-eslint/no-explicit-any */
export type Breakpoint<
  TFrom extends number = number,
  TTo extends number | undefined = number | undefined,
> = {
  from: TFrom;
  to: TTo;

  /**
   * transform the breakpoint into a media query compatible string, which can
   * be used with both CSS-in-JS as well as the useMatchMedia hook from
   * `packages/react-utils`
   */
  toQuery(): string;

  /**
   * create a range that covers everything from (and includi1ng) this
   * breakpoint and up until an infinitely wide screen.
   */
  andUp(): Breakpoint;

  /**
   * create a range that covers everything from 0px up to (and including)
   * this breakpoint.
   */
  andDown(): Breakpoint;
};

export type BreakpointCollection<
  TBreakpoints extends Record<string, number>,
  TKeysArray extends unknown[] = UnionToArray<keyof TBreakpoints>,
> = {
  [key in keyof TBreakpoints]: Breakpoint<
    TBreakpoints[key],
    TKeysArray[Add<IndexOf<key, TKeysArray>, 1>] extends undefined
      ? undefined
      : number
  >;
} & {
  /**
   * create a breakpoint that ranges from and to the specified breakpoints,
   * e.g. covering tablet to desktop.
   */
  range<TFromKey extends keyof TBreakpoints, TToKey extends keyof TBreakpoints>(
    from: TFromKey,
    to: TToKey,
  ): Breakpoint<
    TBreakpoints[TFromKey],
    TKeysArray[Add<IndexOf<TToKey, TKeysArray>, 1>] extends undefined
      ? undefined
      : number
  >;
};

/**
 * creates a collection of static breakpoints that are prepared to be used with
 * CSS-in-JS
 *
 * the breakpoints are automatically prepared to be used with utility hooks
 * from `packages/react-utils` and are optimized for accessibility concerns by
 * honoring user settings and zoom levels
 *
 * @see https://zellwk.com/blog/media-query-units/
 */
export function makeBreakpoints<
  const TBreakpoints extends Record<string, number>,
>(config: TBreakpoints): BreakpointCollection<TBreakpoints> {
  let prevValue: number | undefined = undefined;

  if (process.env["NODE_ENV"] !== "production") {
    if (Object.values(config)[0] !== 0) {
      throw new Error(
        "makeBreakpoints(): first breakpoint must start from 0 px.",
      );
    }
  }

  const breakpoints = Object.entries<number>(config)
    .reverse()
    .reduce(
      (acc, [breakpoint, value]) => {
        if (process.env["NODE_ENV"] !== "production") {
          if (prevValue !== undefined && prevValue < value) {
            throw new Error(
              "makeBreakpoints(): input config must be ordered by size ascendingly.",
            );
          }
        }

        const from = value;
        const to = prevValue !== undefined ? prevValue - 1 : undefined;

        acc[breakpoint as keyof TBreakpoints] = makeBreakpoint(from, to);

        prevValue = value;

        return acc;
      },
      {} as Record<keyof TBreakpoints, Breakpoint>,
    );

  return Object.assign(breakpoints, {
    range(from: keyof TBreakpoints, to: keyof TBreakpoints): Breakpoint {
      if (process.env["NODE_ENV"] !== "production") {
        if ((breakpoints[from].from ?? 0) > (breakpoints[to].to ?? Infinity)) {
          throw new Error(
            `makeBreakpointQuery().range(): the "from" breakpoint must be larger than the "to" breakpoint. Received "${String(
              from,
            )}" - "${String(to)}".`,
          );
        }
      }

      return makeBreakpoint(breakpoints[from].from, breakpoints[to].to);
    },
  }) as BreakpointCollection<TBreakpoints>;
}

export function makeBreakpoint<
  TFrom extends number,
  TTo extends number | undefined,
>(from: TFrom, to: TTo): Breakpoint<TFrom, TTo> {
  return {
    from,
    to,
    toQuery: () => makeBreakpointQuery(from, to),
    andUp: () => makeBreakpoint(from, undefined),
    andDown: () => makeBreakpoint(0, to),
  };
}

function makeBreakpointQuery<
  TFrom extends number,
  TTo extends number | undefined,
>(from: TFrom, to: TTo): string {
  return [
    "screen",
    stringifyBreakpoint(from, "from"),
    stringifyBreakpoint(to, "to"),
  ]
    .filter((it) => !!it)
    .join(" and ");
}

function stringifyBreakpoint(
  valuePx: number | undefined,
  target: "from" | "to",
): string | undefined {
  if (valuePx === undefined) {
    return;
  }

  // NB: We convert breakpoints to em for optimal rendering across browsers and
  // configurations, see https://zellwk.com/blog/media-query-units/
  const valueEm = valuePx / 16;

  if (target === "from") {
    return valueEm > 0 ? `(min-width: ${valueEm}em)` : undefined;
  } else {
    return `(max-width: ${valueEm}em)`;
  }
}

/**
 * Helpers to convert union to array.
 *
 * e.g. "a" | "b" -> ["a", "b"]
 */
// credits goes to https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type UnionToOvlds<U> = UnionToIntersection<
  U extends any ? (f: U) => void : never
>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

type UnionToArray<T, A extends unknown[] = []> =
  IsUnion<T> extends true
    ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
    : [T, ...A];

/**
 * Helpers to add to numbers
 *
 * @example
 * Add<3, 2> -> 5
 * Add<'oops', 2> -> -1
 */
type Length<T extends any[]> = T extends { length: infer L }
  ? L extends number
    ? L
    : -1
  : -1;

type BuildTuple<L extends number, T extends any[] = []> = T extends {
  length: L;
}
  ? T
  : BuildTuple<L, [...T, any]>;

type Add<A extends number, B extends number> = Length<
  [...BuildTuple<A>, ...BuildTuple<B>]
>;

/**
 * Helper to get the index of a specific key in an array
 *
 * @example
 * IndexOf<'b', ['a', 'b']> -> 1
 * IndexOf<'c', ['a', 'b']> -> -1
 */
type IndexOf<
  TKey,
  TArr extends unknown[],
  TIndex extends number = 0,
> = TArr extends [infer Curr, ...infer Tail]
  ? TKey extends Curr
    ? TIndex
    : IndexOf<TKey, Tail, Add<TIndex, 1>>
  : -1;
