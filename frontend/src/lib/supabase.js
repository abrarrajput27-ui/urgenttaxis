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
    from: (table) => {
      let isSingle = false;
      const chain = {
        insert: (data) => {
          console.warn('⚠️ SUPABASE KEYS MISSING ⚠️');
          console.log(`Mock inserting into table [${table}]:`, data);
          return chain;
        },
        select: (columns) => {
          console.warn('⚠️ SUPABASE KEYS MISSING ⚠️');
          return chain;
        },
        update: (data) => {
          console.warn('⚠️ SUPABASE KEYS MISSING ⚠️');
          console.log(`Mock updating table [${table}]:`, data);
          return chain;
        },
        delete: () => {
          console.warn('⚠️ SUPABASE KEYS MISSING ⚠️');
          console.log(`Mock deleting from table [${table}]`);
          return chain;
        },
        order: (column, options) => {
          return chain;
        },
        eq: (column, value) => {
          return chain;
        },
        single: () => {
          isSingle = true;
          return chain;
        },
        then: (onFulfilled) => {
          const result = isSingle
            ? { data: null, error: { message: 'Mock data not found' } }
            : { data: [], error: null };
          return Promise.resolve(result).then(onFulfilled);
        }
      };
      return chain;
    }
  };
}

export const supabase = supabaseInstance;
export const isSupabaseMocked = isMocked;
