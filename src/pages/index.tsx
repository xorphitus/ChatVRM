import VrmViewer from "@/components/vrmViewer";
import { MessageInputContainer } from "@/components/messageInputContainer";
import { M_PLUS_2, Montserrat } from "next/font/google";
import { Introduction } from "@/components/introduction";
import { Menu } from "@/components/menu";
import { GitHubLink } from "@/components/githubLink";
import { Meta } from "@/components/meta";
import { useChatSession } from "@/hooks/useChatSession";

const m_plus_2 = M_PLUS_2({
  variable: "--font-m-plus-2",
  display: "swap",
  preload: false,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  display: "swap",
  subsets: ["latin"],
});

export default function Home() {
  const {
    systemPrompt,
    setSystemPrompt,
    llmModel,
    setLlmModel,
    voicevoxParam,
    setVoicevoxParam,
    chatProcessing,
    chatLog,
    assistantMessage,
    handleChangeChatLog,
    handleSendChat,
  } = useChatSession();

  return (
    <div className={`${m_plus_2.variable} ${montserrat.variable}`}>
      <Meta />
      <Introduction llmModel={llmModel} onChangeLlmModel={setLlmModel} />
      <VrmViewer />
      <MessageInputContainer
        isChatProcessing={chatProcessing}
        onChatProcessStart={handleSendChat}
      />
      <Menu
        llmModel={llmModel}
        systemPrompt={systemPrompt}
        chatLog={chatLog}
        voicevoxParam={voicevoxParam}
        assistantMessage={assistantMessage}
        onChangeLlmModel={setLlmModel}
        onChangeSystemPrompt={setSystemPrompt}
        onChangeChatLog={handleChangeChatLog}
        onChangeVoicevoxParam={setVoicevoxParam}
      />
      <GitHubLink />
    </div>
  );
}
