"use server";

import { redirect } from "next/navigation";
import { supabase } from "./supabase";

export const signUp = async (email: string, password: string) => {
  return supabase.auth.signUp({ email, password });
};

export const login = async (email: string, password: string) => {
  return supabase.auth.signInWithPassword({ email, password });
};

export const refresh = async (session?: { refresh_token: string }) => {
  return supabase.auth.refreshSession(session);
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    redirect("/login");
  }
};
