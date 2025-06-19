import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function signUp(email, password) {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.log({ error });
  }
}

export async function signIn(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.log({ error });
  } else {
    console.log({ data });
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log({ error });
  } else {
    console.log("Successfully signed out");
  }
}

export async function getListByCategory(userId, category) {
  const { data, error } = await supabase
    .from("spending")
    .select()
    .eq("user_id", userId)
    .order("category", { ascending: false });
  if (!error) {
    console.log(data);
  } else {
    console.log(error);
  }
  return data;
}

export async function getList(userId) {
  const { data, error } = await supabase
    .from("spending")
    .select()
    .eq("user_id", userId);
  if (!error) {
    console.log(data);
  } else {
    console.log(error);
  }
  return data;
}

export async function getCategory(id) {
  const { data, error } = await supabase
    .from("category")
    .select()
    .eq("user_id", id);
  if (!error) {
    console.log(data);
  } else {
    console.log(error);
  }
  return data;
}

export async function insertSpending(
  name,
  date,
  category,
  description,
  amount,
  id
) {
  const { error } = await supabase.from("spending").insert({
    name: name,
    date: date,
    category: category,
    description: description,
    amount: amount,
    user_id: id,
  });
  return error;
}

export async function insertCategory(name, id) {
  const { error } = await supabase.from("category").insert({
    name: name,
    user_id: id,
  });
  return error;
}
