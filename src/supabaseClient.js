import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tpfsjpibyupeaxrajuwm.supabase.co";
const supabaseKey = "sb_publishable_8oB1j-OxtywOLPIXtnYpXg_helnvHb6";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);