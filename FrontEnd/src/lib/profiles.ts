import { supabase } from "./supabase";
import type { Profile } from "../types/types";

export async function fetchProfiles() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, created_at")
    .order("username");

  return { data: data as Profile[] | null, error };
}

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return { user, error };
}
