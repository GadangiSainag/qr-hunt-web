export function stringToStringArray(
  baseString: string,
  caseSensitive: boolean
): string[] {
  return baseString
    ?.split(",")
    .map((element) =>
      caseSensitive ? element.trim() : element.trim().toLowerCase()
    );
}
