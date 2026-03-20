import { createClient } from "@supabase/supabase-js";


const SUPABASE_URL = "https://nmcblpsigekwmigoiqat.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tY2JscHNpZ2Vrd21pZ29pcWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NTMxOTUsImV4cCI6MjA4OTUyOTE5NX0.g6yDm52M7yOJR4t18oE0kAFHnWwB5nGKQ4mdsf4PLxg";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
