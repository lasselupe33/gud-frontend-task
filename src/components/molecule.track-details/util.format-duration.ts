import { MINUTES_TO_MS, SECONDS_TO_MS } from "../../utils/constants";

export function formatDuration(durationInMs: number): string {
  const minutes = Math.floor(durationInMs / MINUTES_TO_MS);
  const seconds = Math.round(durationInMs / SECONDS_TO_MS) % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0",
  )}`;
}
