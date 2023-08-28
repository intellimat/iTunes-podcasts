export function getESdateFromTimestamp(dateText: string) {
  return new Date(dateText).toLocaleDateString("es-es");
}
