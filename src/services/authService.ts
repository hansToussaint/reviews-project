import supabase from "./supabase";

export interface Profile {
  id?: number;
  user_id: string;
  avatar_url: string;
  username: string;
  created_at?: string;
}

// Sign in using email and password
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

// Sign up using email and password
export async function signUp(
  email: string,
  password: string,
  username: string
) {
  // Sign up with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;

  // after signed up, create a profile in the profiles table
  const userId = data.user?.id;
  if (!userId) throw new Error("User ID is missing");

  // Create a profile entry with additional info (e.g. username)
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .insert([{ user_id: userId, username, avatar_url: "" }])
    .select()
    .single();

  if (profileError) throw profileError;

  return profileData;
}

// Sign out the current user
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true;
}

// Get the current user (auth and profile)
export async function getCurrentUser() {
  // Get the authenticated user from Supabase Auth
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) return null;

  // Retrieve the profile from the profiles table using the user id (UUID)
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) throw error;

  return data;
}

// Get the info for an user by the user_id
export async function getProfileByUserId(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
