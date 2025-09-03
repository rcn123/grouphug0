import { createClient } from "@supabase/supabase-js";
import {requireEnv} from '../lib/env'

const supabaseUrl = "https://ltwunqfxpqzrsvhlssmd.supabase.co";
export const supabase = createClient(supabaseUrl, requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"));

