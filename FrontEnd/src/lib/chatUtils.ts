import type { AvatarColor } from "../types/types";

const AVATAR_COLORS: AvatarColor[] = ["orange", "blue", "red"];

export function getInitials(username: string) {
  return username.slice(0, 2).toUpperCase();
}

export function getAvatarColor(username: string): AvatarColor {
  const index =
    username.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    AVATAR_COLORS.length;

  return AVATAR_COLORS[index];
}

export function formatMessageTime(isoDate: string) {
  return new Date(isoDate).toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatConversationTime(isoDate: string) {
  return new Date(isoDate)
    .toLocaleDateString("sv-SE", { weekday: "short" })
    .toUpperCase();
}
