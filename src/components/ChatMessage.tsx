import { cn } from "@/lib/utils";
import { Message } from "ai";
import { MemoizedReactMarkdown } from "./Markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div className={cn("group relative mb-4 flex items-start mr-4", message.role === "user" && "items-end")} {...props}>
      <div className={cn("flex-1 ml-4 bg-background p-2 space-y-2 overflow-hidden w-fit", message.role === "user" && "bg-white/50")}>
        <MemoizedReactMarkdown className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0" remarkPlugins={[remarkGfm, remarkMath]}>
          {message.content}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
}
