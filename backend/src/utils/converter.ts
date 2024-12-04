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

export const toPascalCase = (str: string): string => {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
    ?.join('') ?? '';
};