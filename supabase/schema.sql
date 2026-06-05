-- Supabase Schema for Urgent Taxis Lead Generation

-- 1. Create the 'leads' table
CREATE TABLE public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    pickup TEXT,
    drop_location TEXT,
    trip_date DATE,
    vehicle_type TEXT,
    message TEXT,
    source_page TEXT,
    route_name TEXT,
    lead_source TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 3. Create Policy: Allow anonymous inserts (so public users can submit leads)
CREATE POLICY "Allow anonymous inserts"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (true);

-- 4. Create Policy: Disallow anonymous reads (keep leads private)
CREATE POLICY "Disallow anonymous reads"
ON public.leads
FOR SELECT
TO anon
USING (false);
