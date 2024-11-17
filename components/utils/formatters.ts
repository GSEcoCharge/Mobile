export function formatFloat(value: number): string {
  let valueFormatted = value.toFixed(2);
  value = Math.round(parseFloat(valueFormatted) * 100) / 100;
  return value.toString().replace(",", ".");
}
