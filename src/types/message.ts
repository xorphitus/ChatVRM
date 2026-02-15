// Ollama API message type — shared across features
export type Message = {
  role: "assistant" | "system" | "user";
  content: string;
};
