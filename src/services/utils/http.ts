export async function getJSON<TResponse>(
  url: string,
  config?: RequestInit
): Promise<TResponse> {
  try {
    const response = await fetch(url, config);
    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
