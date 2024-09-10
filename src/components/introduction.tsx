import React, { useState, useCallback } from "react";
import { Link } from "./link";

type Props = {
  llmModel: string;
  onChangeLlmModel: (llmModel: string) => void;
};
export const Introduction = ({ llmModel, onChangeLlmModel }: Props) => {
  const [opened, setOpened] = useState(true);

  const handleLlmModelChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeLlmModel(event.target.value);
    },
    [onChangeLlmModel],
  );

  return opened ? (
    <div className="absolute z-40 w-full h-full px-24 py-40  bg-black/30 font-M_PLUS_2">
      <div className="mx-auto my-auto max-w-3xl max-h-full p-24 overflow-auto bg-white rounded-16">
        <div className="my-24">
          <div className="my-8 font-bold typography-20 text-secondary ">
            このアプリケーションについて
          </div>
          <div>
            Webブラウザだけで3Dキャラクターとの会話を、マイクやテキスト入力、音声合成を用いて楽しめます。キャラクター（VRM）の変更や性格設定、音声調整もできます。
          </div>
        </div>
        <div className="my-24">
          <div className="my-8 font-bold typography-20 text-secondary">
            技術紹介
          </div>
          <div>
            3Dモデルの表示や操作には
            <Link
              url={"https://github.com/pixiv/three-vrm"}
              label={"@pixiv/three-vrm"}
            />
            、 会話文生成には
            <Link url={"https://ollama.com"} label={"Ollama"} />
            音声合成には
            <Link url={"https://voicevox.hiroshiba.jp"} label={"VOICEVOX"} />
            を使用しています。
          </div>
        </div>

        <div className="my-24">
          <div className="my-8 font-bold typography-20 text-secondary">
            利用上の注意
          </div>
          <div>
            差別的または暴力的な発言、特定の人物を貶めるような発言を、意図的に誘導しないでください。また、VRMモデルを使ってキャラクターを差し替える際はモデルの利用条件に従ってください。
          </div>
        </div>
        <div className="my-24">
          <div className="my-8 font-bold typography-20 text-secondary">
            LLMモデル名
          </div>
          <input
            type="text"
            placeholder="llama3.1:8b"
            value={llmModel}
            onChange={handleLlmModelChange}
            className="my-4 px-16 py-8 w-full h-40 bg-surface3 hover:bg-surface3-hover rounded-4 text-ellipsis"
          ></input>
          <div>
            LLMモデルはOllamaでpull済みのモデル名をフォームに入力してください。
          </div>
        </div>
        <div className="my-24">
          <button
            onClick={() => {
              setOpened(false);
            }}
            className="font-bold bg-secondary hover:bg-secondary-hover active:bg-secondary-press disabled:bg-secondary-disabled text-white px-24 py-8 rounded-oval"
          >
            LLMモデル名を入力してはじめる
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
