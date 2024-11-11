import { css } from "@linaria/core";
import type { Meta, StoryObj } from "@storybook/react";

import { AlbumCard } from "../molecule.album-card/_album-card";

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

const gridWrapper = css`
  max-width: 300px;
`;

const listWrapper = css`
  max-width: 500px;
`;

export default {
  title: "Components / Album Card",
  args: {
    album,
  },
  component: AlbumCard,
} satisfies Meta<typeof AlbumCard>;

export const ListCard: StoryObj<typeof AlbumCard> = {
  args: {
    viewMode: "list",
  },
  render: (props) => (
    <div className={listWrapper}>
      <AlbumCard {...props} />
    </div>
  ),
};

export const GridCard: StoryObj<typeof AlbumCard> = {
  args: {
    viewMode: "grid",
  },
  render: (props) => (
    <div className={gridWrapper}>
      <AlbumCard {...props} />
    </div>
  ),
};

export const ListCardWithoutThumbnail: StoryObj<typeof AlbumCard> = {
  args: {
    viewMode: "list",
    album: {
      ...album,
      thumbnailSrc: null,
    },
  },
  render: (props) => (
    <div className={listWrapper}>
      <AlbumCard {...props} />
    </div>
  ),
};

export const GridCardWithoutThumbnail: StoryObj<typeof AlbumCard> = {
  args: {
    viewMode: "grid",
    album: {
      ...album,
      thumbnailSrc: null,
    },
  },
  render: (props) => (
    <div className={gridWrapper}>
      <AlbumCard {...props} />
    </div>
  ),
};
