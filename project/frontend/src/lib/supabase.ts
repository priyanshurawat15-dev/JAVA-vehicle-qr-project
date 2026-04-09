import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nrbyzvxafymfgqalgilp.supabase.co";
const supabaseAnonKey = "sb_publishable_hZKX9cI8jLkHCPx6kdB9ww_LCUIhZ_f";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
