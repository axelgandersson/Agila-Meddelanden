export type Page = "login" | "home" | "chat" | "contacts";

export type Contact = {
  id: string;
  name: string;
  initials: string;
  status: string;
  color: "orange" | "blue" | "red";
};

export type ChatMessage = {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
};
