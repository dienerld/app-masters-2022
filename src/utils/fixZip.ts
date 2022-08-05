export function fixZip(zip: string): string {
  if (zip.length === 8) {
    const zipArr = zip.split('');
    const zipFormatted = zipArr.map((item, index) => {
      if (index === 4) {
        return `${item}-`;
      }
      return item;
    }).join('');
    return zipFormatted;
  }
  return zip;
}
