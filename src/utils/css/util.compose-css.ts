import type { CSSProperties } from "@linaria/core";

/**
 * We do not want linaria to extract our resets into separate classes. Instead
 * we want to be able to embed these resets into classses that needs them, i.e.
 * mix them in.
 *
 * The postcss-plugin combine-duplicate-selectors ensures that duplicated
 * values due to overwriting resets will be reduced to only the overwritten
 * value, which means that this will not bloat the bundle unnecessarily.
 *
 * NB: the function is named "css" to allow for syntax highlighting.
 */
export function css(
  _strings: TemplateStringsArray,
  ..._exprs: Array<string | number | CSSProperties>
): string {
  let parsedString = "";

  for (let i = 0; i < _strings.length; i++) {
    parsedString += `${_strings[Number(i)]}`;

    if (_exprs[Number(i)]) {
      parsedString += _exprs[Number(i)];
    }
  }

  return parsedString.trim();
}
