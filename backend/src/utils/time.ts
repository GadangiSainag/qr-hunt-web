export function getDurationString(start: number, end: number) {
  const durationMs = end - start;
  const hours = Math.floor(durationMs / 3600000);
  const minutes = Math.floor((durationMs % 3600000) / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);

  const formattedDuration = `${hours
    .toString()
    .padStart(2, "")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return formattedDuration;
}

export function getDuration(start: number, end: number) {
  return end - start;
}
