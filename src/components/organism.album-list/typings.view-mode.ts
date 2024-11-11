import { z } from "zod";

export type ViewMode = "grid" | "list";

export const viewModeSchema = z.enum(["list", "grid"]).optional();
