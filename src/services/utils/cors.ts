export function getAllCorsURL(url: string) {
  return "https://api.allorigins.win/get?=" + encodeURIComponent(url);
}
