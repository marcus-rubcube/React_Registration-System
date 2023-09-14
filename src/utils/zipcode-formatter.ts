export function zipCodeFormatter(zipCode: string): string {
  return zipCode.replace(/\D/g, "").replace(/^(\d{5})(\d{3})$/, "$1-$2");
}
