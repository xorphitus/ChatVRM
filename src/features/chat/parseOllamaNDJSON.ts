/**
 * Parse raw decoder output from Ollama streaming API.
 * Splits by "data:", filters "[DONE]" markers, and extracts message content.
 */
export function parseOllamaChunks(data: string): string[] {
  const chunks = data
    .split("data:")
    .filter((val) => !!val && val.trim() !== "[DONE]");

  const results: string[] = [];
  for (const chunk of chunks) {
    const json = JSON.parse(chunk);
    const messagePiece = json.message.content;
    if (!!messagePiece) {
      results.push(messagePiece);
    }
  }
  return results;
}
