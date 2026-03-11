import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wemptqdjyvtdnzlacimz.supabase.co';
const supabaseAnonKey = 'sb_publishable_h0iqAYpZqzpwixIxlZ9RCQ_etJ0c242'; // Tomada de la captura

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
