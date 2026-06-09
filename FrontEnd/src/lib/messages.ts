import { supabase } from "./supabase";
import type { Message } from "../types/types";

const MESSAGE_SELECT = "id, user_id, content, created_at, profiles(username)";

type MessageRow = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles: { username: string } | { username: string }[] | null;
};

function toMessage(row: MessageRow): Message {
  const profiles = Array.isArray(row.profiles)
    ? row.profiles[0] ?? null
    : row.profiles;

  return { ...row, profiles };
}

export async function fetchMessages() {
  const { data, error } = await supabase
    .from("messages")
    .select(MESSAGE_SELECT)
    .order("created_at", { ascending: true });

  return { data: data?.map(toMessage) ?? null, error };
}

export async function sendMessage(content: string, userId: string) {
  const { data, error } = await supabase
    .from("messages")
    .insert({ user_id: userId, content })
    .select(MESSAGE_SELECT)
    .single();

  return { data: data ? toMessage(data) : null, error };
}

export async function fetchMessageById(messageId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select(MESSAGE_SELECT)
    .eq("id", messageId)
    .single();

  return { data: data ? toMessage(data) : null, error };
}

export async function deleteMessage(messageId: string, userId: string) {
  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", messageId)
    .eq("user_id", userId);

  return { error };
}

export function subscribeToMessages(
  onInsert: (message: Message) => void,
  onDelete?: (messageId: string) => void,
) {
  const channel = supabase
    .channel("messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      async (payload) => {
        const { data } = await fetchMessageById(payload.new.id as string);
        if (data) {
          onInsert(data);
        }
      },
    )
    .on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "messages" },
      (payload) => {
        onDelete?.(payload.old.id as string);
      },
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
