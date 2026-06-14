import { Database } from "@/types/database";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export function createServerSupabaseClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      async accessToken() {
        return (await auth()).getToken();
      },
    },
  );
}
