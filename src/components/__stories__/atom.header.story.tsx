import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "../atom.header";

export default {
  title: "Components / Header",
  component: Header,
} satisfies Meta<typeof Header>;

export const Default: StoryObj<typeof Header> = {
  args: {
    children: <h1>Albums</h1>,
  },
};
