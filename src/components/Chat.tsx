import React, { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";
import { Message, nanoid } from "ai";
import { ChatMessage } from "./ChatMessage";
import { streamAsyncIterable } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const decoder = new TextDecoder();

export default function Chat({ isChatVisible, context }: { isChatVisible: boolean; context: string }) {
  const [userMessage, setUserMessage] = useState("");
  const [language, setLanguage] = useState("French");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour je suis votre assistant en histoire authentique de l'Afrique. Posez-moi une question 🙂",
      id: nanoid(),
    },
  ]);

  useEffect(() => {
    if (language === "Swahili") {
      setMessages((prev) =>
        prev.map((message, index) => {
          if (index === 0) {
            return {
              ...message,
              content: "Habari, mimi ni msaidizi wako katika historia halisi ya Afrika. Niulize swali 🙂",
            };
          }
          return message;
        }),
      );
    }
    if (language === "Lingala") {
      setMessages((prev) =>
        prev.map((message, index) => {
          if (index === 0) {
            return {
              ...message,
              content: "Mbote, nazali mosungi na yo na mateya ya solo ya Afrika. Tuna ngai motuna 🙂",
            };
          }
          return message;
        }),
      );
    }
  }, [language]);

  const onSubmitMessage = async () => {
    if (!userMessage) return;

    const updatedMessages = [
      ...messages,
      {
        role: "user",
        content: userMessage,
        id: nanoid(),
      },
    ] as unknown as Message[];

    setMessages(updatedMessages);
    setIsLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: JSON.stringify({
        question: userMessage,
        history: updatedMessages.map((message) => ({
          content: message.content,
          role: message.role,
        })),
        language: window.localStorage.getItem("hadithi-njo-ai-language") ?? language,
        context,
      }),
    });

    let text = "";
    for await (const chunk of streamAsyncIterable(res.body!)) {
      const chunkContent = decoder.decode(new Uint8Array(chunk));

      text += chunkContent;

      if (text.trim()) {
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        const newsMessages = [
          ...updatedMessages,
          {
            content: text,
            id: lastMessage.id,
            role: "assistant",
          },
        ] as unknown as Message[];

        setMessages(newsMessages);
      } else {
        const newsMessages = [
          ...updatedMessages,
          {
            role: "assistant",
            content: chunkContent,
            id: nanoid(5),
          },
        ] as unknown as Message[];
        setMessages(newsMessages);
      }
    }
    setUserMessage("");
    setIsLoading(false);
  };

  const onLanguagechange = (language: string) => {
    setLanguage(language);
    window.localStorage.setItem("hadithi-njo-ai-language", language);
  };

  return (
    <div
      className={`max-lg:w-full w-[28%] fixed mr-3 top-5 bottom-0 max-h-screen right-0 rounded-md ${isChatVisible ? "max-lg:!fixed max-lg:!backdrop-blur-md max-lg:!bg-black/20 max-lg:!inset-0 max-lg:-[9999999]" : "max-lg:!hidden"}`}
    >
      <div className="bg-[#111827] pb-28 overflow-y-auto max-lg:max-h-[80%] max-lg:absolute max-lg:bottom-0 max-lg:rounded-t-md max-lg:backdrop-blur-md h-full w-full relative py-5">
        <div className="px-4 mb-4">
          <Select onValueChange={onLanguagechange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Langue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="French">Français</SelectItem>
              <SelectItem value="Lingala">Lingala</SelectItem>
              <SelectItem value="Swahili">Swahili</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {messages.map((message) => {
          return (
            <div key={message.id}>
              <ChatMessage message={message} />
            </div>
          );
        })}
      </div>
      <div>
        <div className="flex h-fit items-start absolute bottom-0 right-0 left-0 mx-auto px-2 pb-2 gap-3">
          <Textarea
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="w-full resize-none min-h-10 max-h-[200px] h-10 text-area"
            placeholder="Ecrivez votre question ici..."
          />
          <Button disabled={isLoading} onClick={onSubmitMessage} className="disabled:opacity-40 disabled:!cursor-not-allowed">
            <SendIcon className="text-3xl w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
