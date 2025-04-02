import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://agakdyczoudovijuycyl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnYWtkeWN6b3Vkb3ZpanV5Y3lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzODQxMjQsImV4cCI6MjA1ODk2MDEyNH0.h4AYF2RhNTP5tzbv3l6RTtrwwB_NYsRupI06B9-tpKQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
