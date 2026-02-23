import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://irsrywsfpzvgzdpujjng.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlyc3J5d3NmcHp2Z3pkcHVqam5nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTc3NDU3NCwiZXhwIjoyMDg3MzUwNTc0fQ.J678FDjJUS_pu6u3tR58gsRpOkXJT3kcYZpkKDx7hDo'

export const supabase = createClient(supabaseUrl, supabaseKey)