import { supabase } from "./supabase";
import type { Message } from "../types/types";

const MESSAGE_SELECT = "id, user_id, content, created_at, profiles(username)";

export async function fetchMessages() {
  const { data, error } = await supabase
    .from("messages")
    .select(MESSAGE_SELECT)
    .order("created_at", { ascending: true });

  return { data: data as Message[] | null, error };
}

export async function sendMessage(content: string, userId: string) {
  const { data, error } = await supabase
    .from("messages")
    .insert({ user_id: userId, content })
    .select(MESSAGE_SELECT)
    .single();

  return { data: data as Message | null, error };
}

export async function fetchMessageById(messageId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select(MESSAGE_SELECT)
    .eq("id", messageId)
    .single();

  return { data: data as Message | null, error };
}

export function subscribeToMessages(onInsert: (message: Message) => void) {
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
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
