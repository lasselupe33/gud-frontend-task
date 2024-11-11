/**
 * @type {import("stylelint").Config}
 */
export default {
  extends: ["stylelint-config-standard", "stylelint-css-in-js-syntax"],
  plugins: ["stylelint-no-unsupported-browser-features"],

  allowEmptyInput: true,

  rules: {
    "plugin/no-unsupported-browser-features": [
      true,
      {
        ignore: [
          "css3-cursors", // Safari on iOS doesn't support cursors (it's touch based - ignore the error)
          "css-nesting", // We're using css-in-js, and as such the css won't be output as css-nesting
          "css-selection", // We allow using ::selection as a progressive enhancement.
          "intrinsic-width", // Firefox has few bugs related to intrinsic width, however our usage has not broken Firefox rendering.
          "css-has", // We've accepted that Firefox <120 does not support :has(),
          "css-content-visibility", // We exclusively use content-visibility as a progressive enhancement
          "css-scrollbar", // We exclusively use css-scrollbar properties as a progressive enhancement,
          "css3-cursors-grab", // Cursors are exclusively used as a progressive enhancement
          "css-masks", // our usage of clip-paths and masks are supported
          "css-appearance", // resets styles only on browsers where supported
          "css-touch-action", // used as a progressive enhancement for touch devices
          "css-logical-props", // only border-(start|end)-(start-end)-radius are not supported by Chrome 88
          "css-gradients", // only using the 'transparent' keyword is not supported by iOS < 15.4
          "css-overflow", // only the 'clip'-value isn't supported by iOS < 15.6
          "css-overscroll-behavior", // not supported by Safari <= 15.8, but used as a progressive enhancement
          "css-resize", // not supported by iOS, but used as a progressive enhancement for desktop
          "css-clip-path", // we do not use partially supported clip-path properties: Partial support refers to supporting shapes and the url(#foo) syntax for inline SVG, but not shapes in external SVG
          "css-text-indent", // Partial support refers to supporting a <length> value, but not the each-line or hanging keywords.
          "multicolumn", // Does not support the values avoid (in the column context), avoid-column, and avoid-page for the properties break-after, break-before, and break-inside; does not support the value column for the properties break-after and break-before.
        ],
        severity: "warning",
      },
    ],
    "length-zero-no-unit": [true, { ignore: "custom-properties" }],
    "alpha-value-notation": "number",

    // we handle our formatting of ids ourselves
    "selector-id-pattern": null,

    // we handle formatting using our grouped-css-declarations plugin
    "custom-property-empty-line-before": null,

    "media-feature-range-notation": "prefix",
    "custom-property-pattern": null,

    // we should allow keywords such as currentColor to be camel-cased.
    "value-keyword-case": null,

    // we ship our own CSS-in-JS formatting, and as such we disable built-in
    // stylelint formatting.
    "rule-empty-line-before": null,
    "declaration-empty-line-before": null,

    // JS-in-css urls should not be quoted.
    "function-url-quotes": null,
  },
};
