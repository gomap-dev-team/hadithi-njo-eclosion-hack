export type ConversationMessage = {
  role: string;
  content: string;
  content_type: "text" | "image";
  owner: string;
  conversation_id: string;
};
