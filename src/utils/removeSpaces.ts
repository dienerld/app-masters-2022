export function removeSpaces(str: string) {
  str = str.replace(/\s{2,}/g, ' ');
  return str.trim();
}
