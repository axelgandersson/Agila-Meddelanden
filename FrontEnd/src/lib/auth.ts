import { supabase } from "./supabase";

export async function loginWithUsername(username: string, password: string) {
  // Hämta email via username
  const { data: email, error: lookupError } = await supabase.rpc(
    "get_email_by_username",
    { p_username: username }
  );

  if (lookupError || !email) {
    return { error: "Användaren hittades inte" };
  }

  // Logga in med email + lösenord
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Fel lösenord" };
  }

  return { data };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  return { error };
}
