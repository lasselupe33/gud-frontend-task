import type { Meta, StoryObj } from "@storybook/react";

import { IconToggleButton } from "../atom.icon-toggle-button";
import { GridViewIcon } from "../icons/grid-view";

export default {
  title: "Components / Icon Toggle Button",
  component: IconToggleButton,
  args: {
    label: "Descriptive label",
    icon: <GridViewIcon />,
  },
} satisfies Meta<typeof IconToggleButton>;

export const Default: StoryObj<typeof IconToggleButton> = {};

export const Active: StoryObj<typeof IconToggleButton> = {
  args: {
    active: true,
  },
};
