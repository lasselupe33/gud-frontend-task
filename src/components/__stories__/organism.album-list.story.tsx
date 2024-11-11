import { css } from "@linaria/core";
import type { Meta, StoryObj } from "@storybook/react";

import { AlbumList } from "../organism.album-list/_album-list";

const container = css`
  max-width: 650px;
`;

const album = {
  id: "123456",
  name: "Album",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis dolor ut orci eleifend, non tempus quam placerat.",
  thumbnailSrc:
    "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTkFocxsbI47dNJFCFyxv9TryfbKOn3bwFwJMMujyTNa-BbTexH",
  meta: {
    genre: "R&B",
    style: null,
    releaseYear: "2024",
  },
};

export default {
  title: "Components / Album List",
  args: {
    albums: [album, album, album, album, album],
  },
  component: AlbumList,
  render: (props) => (
    <div className={container}>
      <AlbumList {...props} />
    </div>
  ),
} satisfies Meta<typeof AlbumList>;

export const List: StoryObj<typeof AlbumList> = {};
