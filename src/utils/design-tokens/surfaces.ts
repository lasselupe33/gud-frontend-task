import { makeSurfaceToken } from "../css/tokens/token.surface";

import { colors } from "./colors";

const accent = makeSurfaceToken("--accent-surface", {
  background: colors.accent,
  color: colors.white,
});

const gray = {
  sim100: makeSurfaceToken("--gray-100-surface", {
    background: colors.gray.sim100,
    color: colors.white,
  }),
  sim80: makeSurfaceToken("--gray-80-surface", {
    background: colors.gray.sim80,
    color: colors.white,
  }),
  sim60: makeSurfaceToken("--gray-60-surface", {
    background: colors.gray.sim60,
    color: colors.white,
  }),
  sim30: makeSurfaceToken("--gray-30-surface", {
    background: colors.gray.sim30,
    color: colors.text.primary,
  }),
  sim15: makeSurfaceToken("--gray-15-surface", {
    background: colors.gray.sim15,
    color: colors.text.primary,
  }),
  sim00: makeSurfaceToken("--gray-0-surface", {
    background: colors.gray.sim00,
    color: colors.text.primary,
  }),
};

export const surfaces = {
  accent,
  gray,
};
