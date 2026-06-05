# Supabase Lead Capture Integration

This repository contains a dynamic Lead Capture Popup that is pre-configured to send leads directly to a Supabase database. 

Because we do not want to expose sensitive keys or break the build if the keys are missing, the system uses a **graceful fallback**. If the keys are not found, the frontend will simply log the lead data to the browser console and display a success message to the user.

Once you are ready to connect to a real database, follow these instructions:

## 1. Create the Table in Supabase
1. Log in to your [Supabase Dashboard](https://supabase.com).
2. Go to the **SQL Editor** on the left menu.
3. Open the `supabase/schema.sql` file located in this repository, copy its contents, and paste them into the SQL Editor.
4. Click **Run**. This will create the `leads` table and configure Row Level Security (RLS) to ensure users can insert leads, but cannot read your database.

## 2. Add Keys Locally (For Development)
1. In the `frontend` directory, create a file named `.env.local` (this file is ignored by Git).
2. Add the following lines:
   ```env
   VITE_SUPABASE_URL=your_project_url_here
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```
3. Restart your Vite dev server.

## 3. Add Keys to Vercel (For Production)
1. Go to your project on the [Vercel Dashboard](https://vercel.com).
2. Navigate to **Settings** > **Environment Variables**.
3. Add two new variables:
   - Key: `VITE_SUPABASE_URL` | Value: *your_project_url_here*
   - Key: `VITE_SUPABASE_ANON_KEY` | Value: *your_anon_key_here*
4. Trigger a new deployment in Vercel for the variables to take effect.
