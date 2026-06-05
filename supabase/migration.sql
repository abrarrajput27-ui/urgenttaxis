-- Migration: Add multi-trip fare calculation columns to `leads` table

-- Safely add columns if they don't exist
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS trip_type VARCHAR(50),
ADD COLUMN IF NOT EXISTS return_date DATE,
ADD COLUMN IF NOT EXISTS trip_time VARCHAR(20),
ADD COLUMN IF NOT EXISTS estimated_fare DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS fare_breakup JSONB,
ADD COLUMN IF NOT EXISTS distance_km DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS travel_time VARCHAR(50),
ADD COLUMN IF NOT EXISTS estimated_toll DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS estimated_state_tax DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS toll_count INTEGER,
ADD COLUMN IF NOT EXISTS route_source VARCHAR(50),
ADD COLUMN IF NOT EXISTS distance_source VARCHAR(50),
ADD COLUMN IF NOT EXISTS fare_version VARCHAR(20),
ADD COLUMN IF NOT EXISTS pricing_engine_version VARCHAR(50),
ADD COLUMN IF NOT EXISTS booking_id VARCHAR(100),
ADD COLUMN IF NOT EXISTS customer_id VARCHAR(100),
ADD COLUMN IF NOT EXISTS driver_id VARCHAR(100),
ADD COLUMN IF NOT EXISTS vendor_id VARCHAR(100);

-- Note: The existing leads table should already have:
-- id (UUID), name (VARCHAR), mobile (VARCHAR), pickup (VARCHAR), drop_location (VARCHAR), 
-- trip_date (DATE), vehicle_type (VARCHAR), message (TEXT), source_page (VARCHAR), 
-- route_name (VARCHAR), lead_source (VARCHAR), created_at (TIMESTAMP)
