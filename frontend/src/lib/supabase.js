import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "https://vqzbouddkyxixjxrrgbm.supabase.co";
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "sb_publishable_QI458mCbWhUG_l3jQFtHYA_CTIijjVE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);