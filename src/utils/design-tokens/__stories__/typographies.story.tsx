import { css } from "@linaria/core";
import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";

import { typographies } from "../typographies";

type Props = {
  children: ReactNode;
};

export default {
  title: "Design Tokens / Typographies",
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis dolor ut orci eleifend, non tempus quam placerat. Donec aliquet dolor erat, aliquam vestibulum lectus cursus et. Praesent lectus purus, consequat non felis non, tincidunt placerat leo. Integer hendrerit gravida magna, at finibus felis ultricies et. In consectetur nibh sed ipsum luctus, at porta urna finibus. Sed mattis bibendum laoreet. Maecenas placerat tellus eu sapien suscipit egestas. Aenean vel tincidunt massa, non tincidunt diam. Nulla ac blandit ex. Cras dui elit, ullamcorper vel sapien vel, faucibus porta elit. Etiam in ligula sed tortor egestas blandit nec at tellus. Nam imperdiet aliquam hendrerit. Fusce velit ante, pharetra ac dui in, malesuada elementum augue. Nam a consectetur quam. Pellentesque mollis ex vitae urna vestibulum, nec semper lacus cursus. Mauris non ex eget magna aliquet convallis fringilla in ipsum.",
  },
} satisfies Meta;

const heading1 = css`
  font: ${typographies.heading1()};
`;

const heading2 = css`
  font: ${typographies.heading2()};
`;

const caption = css`
  font: ${typographies.caption()};
`;

const label = css`
  font: ${typographies.label()};
`;

export const Heading1: StoryObj<Props> = {
  args: {
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  render: (props) => <p className={heading1}>{props.children}</p>,
};

export const Heading2: StoryObj<Props> = {
  args: {
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  render: (props) => <p className={heading2}>{props.children}</p>,
};

export const Caption: StoryObj<Props> = {
  render: (props) => <p className={caption}>{props.children}</p>,
};

export const Label: StoryObj<Props> = {
  args: {
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  render: (props) => <p className={label}>{props.children}</p>,
};
