import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabase = createClient(
  process.env.DATABASE_URL,
  process.env.DATABASE_PRIVATE_KEY,
);

export default supabase;
