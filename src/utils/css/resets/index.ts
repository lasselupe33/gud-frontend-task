import { css } from "@linaria/core";

import * as addressResets from "./address";
import * as anchorResets from "./anchor";
import * as buttonResets from "./button";
import * as dialogResets from "./dialog";
import * as fieldsetResets from "./fieldset";
import * as figureResets from "./figure";
import * as hrResets from "./hr";
import * as iframeResets from "./iframe";
import * as imageResets from "./image";
import * as inputResets from "./input";
import * as listResets from "./list";
import * as screenReaderResets from "./screen-reader";
import * as svgResets from "./svg";
import * as textResets from "./text";
import * as touchResets from "./touch";

/**
 * Merges all resets into a single className which can be applied to any
 * element.
 *
 * When applied then all elements below will have the resets applied with a
 * specificity of 0, meaning that any custom styles will always take precedence
 * over our resets
 */
const rootCls = "resets--root";

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
css`
  :global() {
    :where(.${rootCls} *),
    :where(.${rootCls}) {
      ${touchResets.touch};
    }

    :where(.${rootCls} address),
    :where(address.${rootCls}) {
      ${addressResets.address};
    }

    :where(.${rootCls} a),
    :where(a.${rootCls}) {
      ${anchorResets.anchor};
    }

    :where(.${rootCls} button),
    :where(button.${rootCls}) {
      ${buttonResets.button};
    }

    :where(.${rootCls}) :where(ul, ol),
    :where(ul.${rootCls}, ol.${rootCls}) {
      ${listResets.list};
    }

    :where(.${rootCls}) :where(h1, h2, h3, h4, h5, h6),
    :where(
        h1.${rootCls},
          h2.${rootCls},
          h3.${rootCls},
          h4.${rootCls},
          h5.${rootCls},
          h6.${rootCls}
      ) {
      ${textResets.heading};
    }

    :where(.${rootCls} p),
    :where(p.${rootCls}) {
      ${textResets.paragraph};
    }

    :where(.${rootCls} iframe),
    :where(iframe.${rootCls}) {
      ${iframeResets.iframe};
    }

    :where(.${rootCls} img),
    :where(img.${rootCls}) {
      ${imageResets.image};
    }

    /* stylelint-disable-next-line selector-not-notation */
    :where(
        .${rootCls} img:not(.LaTeX-formula):not(.Wirisformula):not([data-latex])
      ),
    :where(
        img.${rootCls}:not(.LaTeX-formula):not(.Wirisformula):not([data-latex])
      ) {
      ${imageResets.basicImage};
    }

    :where(.${rootCls} input),
    :where(input.${rootCls}) {
      ${inputResets.input};
    }

    :where(.${rootCls} picture),
    :where(picture.${rootCls}) {
      ${imageResets.picture};
    }

    :where(.${rootCls} dialog),
    :where(dialog.${rootCls}) {
      ${dialogResets.dialog};
    }

    :where(.${rootCls} hr),
    :where(hr.${rootCls}) {
      ${hrResets.hr};
    }

    :where(.${rootCls} figure),
    :where(figure.${rootCls}) {
      ${figureResets.figure};
    }

    :where(.${rootCls} fieldset),
    :where(fieldset.${rootCls}) {
      ${fieldsetResets.fieldset};
    }

    :where(.${rootCls} legend),
    :where(legend.${rootCls}) {
      ${fieldsetResets.legend};
    }

    :where(.${rootCls} svg),
    :where(svg.${rootCls}) {
      ${svgResets.svg};
    }
  }
`;

/**
 * Expose all individual resets as well as our root className which merges the
 * resets, allowing consumers full control over the exact reset that they may
 * need
 */
export const resets = {
  ...addressResets,
  ...anchorResets,
  ...buttonResets,
  ...dialogResets,
  ...figureResets,
  ...hrResets,
  ...imageResets,
  ...inputResets,
  ...listResets,
  ...screenReaderResets,
  ...svgResets,
  ...textResets,
  ...touchResets,
  rootCls,
};
