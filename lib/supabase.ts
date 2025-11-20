import { createClient } from '@supabase/supabase-js';

// COLE SUAS CHAVES DIRETO AQUI DENTRO DAS ASPAS
const supabaseUrl = "https://agnhngkoibnuygjnqvkw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbmhuZ2tvaWJudXlnam5xdmt3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzg3NTkxNSwiZXhwIjoyMDczNDUxOTE1fQ.vhSGXBRGkgbZN_qrVxYXxCKH9W_DQMHnYpTpvuJQZJI";

export const supabase = createClient(supabaseUrl, supabaseKey);