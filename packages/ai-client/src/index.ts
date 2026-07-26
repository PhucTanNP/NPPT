/**
 * AI Client - Frontend client for AI chat and streaming
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

class AIClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async chat(
    messages: ChatMessage[],
    options: ChatOptions = {}
  ): Promise<Response> {
    const response = await fetch(`${API_BASE_URL}/chat/conversations`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        messages,
        ...options,
      }),
    });
    return response;
  }

  async chatStream(
    messages: ChatMessage[],
    options: ChatOptions = {},
    onChunk: (text: string) => void,
    onDone?: () => void,
    onError?: (error: Error) => void
  ): Promise<AbortController> {
    const controller = new AbortController();

    try {
      const response = await fetch(`${API_BASE_URL}/chat/stream`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({
          messages,
          stream: true,
          ...options,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          onDone?.();
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              onDone?.();
            } else {
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content || "";
                if (content) {
                  onChunk(content);
                }
              } catch {
                // Skip malformed chunks
              }
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        onError?.(error);
      }
    }

    return controller;
  }
}

export const aiClient = new AIClient();
export type { ChatMessage, ChatOptions };
