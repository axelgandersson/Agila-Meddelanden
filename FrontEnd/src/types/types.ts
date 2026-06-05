export type Conversation = {
  id: string;
  name: string;
  initials: string;
  status: string;
  color: "orange" | "blue" | "red";
  type: "group" | "private";
  lastMessage: string;
  time: string;
};

export type ChatMessage = {
  id: string;
  conversationId: string;
  text: string;
  sender: "me" | "other";
  time: string;
};
