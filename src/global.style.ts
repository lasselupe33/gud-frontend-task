import { css } from "@linaria/core";

import { breakpoints, units } from "./utils/css";
import { typographies } from "./utils/design-tokens/typographies";

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
css`
  :global() {
    :root {
      ${units.px.__override("0.1rem").toString()};

      @media ${breakpoints.mobile.toQuery()} {
        ${typographies.heading1
          .__override({
            fontSize: units.px(24),
          })
          .toString()};
        ${typographies.heading2
          .__override({
            fontSize: units.px(20),
          })
          .toString()};
      }
    }

    html {
      /**
      * default font-size is 16px; reset to 1px for easier calculations
      * throughout the application styles (1rem = 10px, unless user has scaled
      * font sizes up for readability)
      */
      font-size: 0.625em;
    }

    #__next,
    html,
    body {
      margin: 0;
    }

    body {
      -webkit-font-smoothing: antialiased;
    }

    h1 {
      font: ${typographies.heading1()};
    }

    h2 {
      font: ${typographies.heading2()};
    }
  }
`;
