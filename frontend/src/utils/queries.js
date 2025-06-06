import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function getList() {
  const { data } = await supabase.from("spending").select();
  console.log(data);
  return data;
}

export async function insertSpending(
  name,
  date,
  category,
  description,
  amount
) {
  const { error } = await supabase
    .from("spending")
    .insert({
      name: name,
      date: date,
      category: category,
      description: description,
      amount: amount,
    });
  return error;
}
