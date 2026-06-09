export type AvatarColor = "orange" | "blue" | "red";

export type Profile = {
  id: string;
  username: string;
  created_at: string;
};

export type Message = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles: { username: string } | null;
};

export type Conversation = {
  id: string;
  name: string;
  initials: string;
  status: string;
  color: AvatarColor;
  type: "group" | "private";
  lastMessage: string;
  time: string;
};
