import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance = null;
let isMocked = false;

if (supabaseUrl && supabaseAnonKey) {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Graceful fallback if keys are missing
  isMocked = true;
  supabaseInstance = {
    from: (table) => ({
      insert: async (data) => {
        console.warn('⚠️ SUPABASE KEYS MISSING ⚠️');
        console.log(`Mock inserting lead into table [${table}]:`, data);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        return { data, error: null };
      }
    })
  };
}

export const supabase = supabaseInstance;
export const isSupabaseMocked = isMocked;
