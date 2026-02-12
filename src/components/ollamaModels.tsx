import React, { useCallback, useEffect, useState } from "react";
import {OLLAMA_URL} from "@/constants/api";

type Props = {
  llmModel: string;
  onChangeLlmModel: (llmModel: string) => void;
};

export const OllamaModels = ({ llmModel, onChangeLlmModel }: Props) => {
  const [options, setOptions] = useState<string[]>([]); // State to hold fetched options
  const [isLoading, setIsLoading] = useState(false); // State to handle loading

  // Fetch available model names
  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(OLLAMA_URL + "/api/tags");
        const data = await response.json();
        const models = data.models.map((model: { name: string }) => model.name); // Extract names
        setOptions(models);
      } catch (error) {
        console.error("Failed to fetch model options:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions().catch(console.error);
  }, []);

  const handleLlmModelChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChangeLlmModel(event.target.value); // Pass selected value to parent
    },
    [onChangeLlmModel],
  );

  return (
    <div className="my-24">
      <div className="my-8 font-bold typography-20 text-secondary">
        LLMモデル名
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <select
          value={llmModel}
          onChange={handleLlmModelChange}
          className="my-4 px-16 py-8 w-full h-40 bg-surface3 hover:bg-surface3-hover rounded-4 text-ellipsis"
        >
          <option value="">モデルを選択してください</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      <div>Ollamaでpull済みのモデルが表示されます。</div>
    </div>
  );
};
