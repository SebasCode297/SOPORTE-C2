import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wemptqdjyvtdnzlacimz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlbXB0cWRqeXZ0ZG56bGFvaW16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMDEzMTcsImV4cCI6MjA4ODc3NzMxN30.ULyhgvoYYWSXyDIhnozT0ywhjMLiox6_zdNu4k2EQSs'; // Clave real del usuario

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
