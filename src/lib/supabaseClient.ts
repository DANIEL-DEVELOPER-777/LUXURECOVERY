import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // Prevent Supabase from consuming/removing the #access_token hash fragment
    // at whichever page the invite/reset email happens to land on.
    // We parse and exchange the token ourselves in SetPassword.tsx.
    detectSessionInUrl: false,
  },
});

