import type { Preview } from "@storybook/react";
import React, { useEffect } from "react";

import { resets } from "../src/utils/css/resets";

const preview: Preview = {
  decorators: [
    (Story) => {
      useEffect(() => {
        document.body.classList.add(resets.rootCls);
      }, []);

      return <Story />;
    },
  ],
};

export default preview;
