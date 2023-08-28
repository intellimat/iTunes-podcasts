export function getAllCorsURL(url: string) {
  return "https://api.allorigins.win/get?url=" + encodeURIComponent(url);
}

export interface AllCorsResponse {
  contents: string;
  status: {
    url: string;
    content_type: string;
    http_code: number;
    response_time: number;
    content_length: number;
  };
}
