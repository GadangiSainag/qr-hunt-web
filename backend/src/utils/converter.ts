export function stringToStringArray(baseString: string): string[] {
  return baseString
    .toLowerCase()
    .split(" ")
    .filter((item) => item !== "");
}
