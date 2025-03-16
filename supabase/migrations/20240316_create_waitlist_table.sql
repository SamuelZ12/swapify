-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Set up RLS (Row Level Security)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting into waitlist (public can insert)
CREATE POLICY "Allow public to insert into waitlist" 
  ON waitlist FOR INSERT 
  WITH CHECK (true);

-- Create policy for admin access (only authenticated users with admin role can select)
CREATE POLICY "Allow admins to view waitlist" 
  ON waitlist FOR SELECT 
  USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin'); 