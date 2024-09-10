import React from "react";
import { IconButton } from "./iconButton";
import { TextButton } from "./textButton";
import { Message } from "@/features/messages/messages";
import {
  VoicevoxParam,
} from "@/features/constants/voicevoxParam";

type Props = {
  llmModel: string;
  systemPrompt: string;
  chatLog: Message[];
  voicevoxParam: VoicevoxParam;
  onClickClose: () => void;
  onChangeLlmModel: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSystemPrompt: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeChatLog: (index: number, text: string) => void;
  onChangeVoicevoxParam: (speaker: number) => void;
  onClickOpenVrmFile: () => void;
};
export const Settings = ({
  llmModel,
  chatLog,
  systemPrompt,
  voicevoxParam,
  onClickClose,
  onChangeSystemPrompt,
  onChangeLlmModel,
  onChangeChatLog,
  onChangeVoicevoxParam,
  onClickOpenVrmFile,
}: Props) => {
  return (
    <div className="absolute z-40 w-full h-full bg-white/80 backdrop-blur ">
      <div className="absolute m-24">
        <IconButton
          iconName="24/Close"
          isProcessing={false}
          onClick={onClickClose}
        ></IconButton>
      </div>
      <div className="max-h-full overflow-auto">
        <div className="text-text1 max-w-3xl mx-auto px-24 py-64 ">
          <div className="my-24 typography-32 font-bold">設定</div>
          <div className="my-24">
            <div className="my-16 typography-20 font-bold">LLMモデル名</div>
            <input
              className="text-ellipsis px-16 py-8 w-col-span-2 bg-surface1 hover:bg-surface1-hover rounded-8"
              type="text"
              placeholder="llama3.1:8b"
              value={llmModel}
              onChange={onChangeLlmModel}
            />
            <div>
              LLMモデルはOllamaでpull済みのモデル名をフォームに入力してください。
            </div>
          </div>
          <div className="my-40">
            <div className="my-16 typography-20 font-bold">
              キャラクターモデル
            </div>
            <div className="my-8">
              <TextButton onClick={onClickOpenVrmFile}>VRMを開く</TextButton>
            </div>
          </div>
          <div className="my-40">
            <div className="my-16 typography-20 font-bold">
              キャラクター設定（システムプロンプト）
            </div>

            <textarea
              value={systemPrompt}
              onChange={onChangeSystemPrompt}
              className="px-16 py-8  bg-surface1 hover:bg-surface1-hover h-168 rounded-8 w-full"
            ></textarea>
          </div>
          <div className="my-40">
            <div className="my-16 typography-20 font-bold">声の調整</div>
            <div>
              VOICEVOXを使用しています。詳しくは
              <a
                className="text-primary hover:text-primary-hover"
                target="_blank"
                rel="noopener noreferrer"
                href="https://voicevox.hiroshiba.jp"
              >
                https://voicevox.hiroshiba.jp
              </a>
              をご覧ください。
            </div>
            <div className="my-24">
              <div className="select-none">
                Speaker : {voicevoxParam.speaker}
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={voicevoxParam.speaker}
                className="mt-8 mb-16 input-range"
                onChange={(e) => {
                  onChangeVoicevoxParam(Number(e.target.value));
                }}
              ></input>
            </div>
          </div>
          {chatLog.length > 0 && (
            <div className="my-40">
              <div className="my-16 typography-20 font-bold">会話履歴</div>
              <div className="my-8">
                {chatLog.map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="my-8 grid grid-flow-col  grid-cols-[min-content_1fr] gap-x-fixed"
                    >
                      <div className="w-[64px] py-8">
                        {value.role === "assistant" ? "Character" : "You"}
                      </div>
                      <input
                        key={index}
                        className="bg-surface1 hover:bg-surface1-hover rounded-8 w-full px-16 py-8"
                        type="text"
                        value={value.content}
                        onChange={(event) => {
                          onChangeChatLog(index, event.target.value);
                        }}
                      ></input>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
