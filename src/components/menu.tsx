import { IconButton } from "./iconButton";
import { Message } from "@/features/messages/messages";
import { VoicevoxParam } from "@/features/constants/voicevoxParam";
import { ChatLog } from "./chatLog";
import React, { useCallback, useContext, useRef, useState } from "react";
import { Settings } from "./settings";
import { ViewerContext } from "@/features/vrmViewer/viewerContext";
import { AssistantText } from "./assistantText";

type Props = {
  llmModel: string;
  systemPrompt: string;
  chatLog: Message[];
  voicevoxParam: VoicevoxParam;
  assistantMessage: string;
  onChangeSystemPrompt: (systemPrompt: string) => void;
  onChangeLlmModel: (key: string) => void;
  onChangeChatLog: (index: number, text: string) => void;
  onChangeVoicevoxParam: (param: VoicevoxParam) => void;
};
export const Menu = ({
  llmModel,
  systemPrompt,
  chatLog,
  voicevoxParam,
  assistantMessage,
  onChangeSystemPrompt,
  onChangeLlmModel,
  onChangeChatLog,
  onChangeVoicevoxParam,
}: Props) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showChatLog, setShowChatLog] = useState(false);
  const { viewer } = useContext(ViewerContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangeSystemPrompt = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChangeSystemPrompt(event.target.value);
    },
    [onChangeSystemPrompt],
  );

  const handleLlmModelChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeLlmModel(event.target.value);
    },
    [onChangeLlmModel],
  );

  const handleChangeVoicevoxParam = useCallback(
    (speaker: number) => {
      onChangeVoicevoxParam({
        speaker,
      });
    },
    [onChangeVoicevoxParam],
  );

  const handleClickOpenVrmFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleChangeVrmFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      const file = files[0];
      if (!file) return;

      const file_type = file.name.split(".").pop();

      if (file_type === "vrm") {
        const blob = new Blob([file], { type: "application/octet-stream" });
        const url = window.URL.createObjectURL(blob);
        viewer.loadVrm(url);
      }

      event.target.value = "";
    },
    [viewer],
  );

  return (
    <>
      <div className="absolute z-10 m-24">
        <div className="grid grid-flow-col gap-[8px]">
          <IconButton
            iconName="24/Menu"
            label="設定"
            isProcessing={false}
            onClick={() => setShowSettings(true)}
          ></IconButton>
          {showChatLog ? (
            <IconButton
              iconName="24/CommentOutline"
              label="会話ログ"
              isProcessing={false}
              onClick={() => setShowChatLog(false)}
            />
          ) : (
            <IconButton
              iconName="24/CommentFill"
              label="会話ログ"
              isProcessing={false}
              disabled={chatLog.length <= 0}
              onClick={() => setShowChatLog(true)}
            />
          )}
        </div>
      </div>
      {showChatLog && <ChatLog messages={chatLog} />}
      {showSettings && (
        <Settings
          llmModel={llmModel}
          chatLog={chatLog}
          systemPrompt={systemPrompt}
          voicevoxParam={voicevoxParam}
          onClickClose={() => setShowSettings(false)}
          onChangeLlmModel={handleLlmModelChange}
          onChangeSystemPrompt={handleChangeSystemPrompt}
          onChangeChatLog={onChangeChatLog}
          onChangeVoicevoxParam={handleChangeVoicevoxParam}
          onClickOpenVrmFile={handleClickOpenVrmFile}
        />
      )}
      {!showChatLog && assistantMessage && (
        <AssistantText message={assistantMessage} />
      )}
      <input
        type="file"
        className="hidden"
        accept=".vrm"
        ref={fileInputRef}
        onChange={handleChangeVrmFile}
      />
    </>
  );
};
