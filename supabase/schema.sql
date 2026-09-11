-- Run this in your Supabase project: SQL Editor > New query > paste > Run.
-- It creates the `listings` table used by the FindAStay homepage and
-- listing detail page, plus basic security rules.

create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  price numeric not null,           -- monthly rent, e.g. 950.00
  location text not null,           -- human-readable, e.g. "Berkeley, CA"
  lat double precision,             -- latitude, for the map
  lng double precision,             -- longitude, for the map
  amenities text[] default '{}',    -- e.g. {"WiFi","Laundry","Parking"}
  photos text[] default '{}',       -- array of image URLs
  landlord_id uuid references auth.users (id),
  created_at timestamptz not null default now()
);

-- Row Level Security (RLS) is Supabase's way of controlling who can read
-- or write which rows, directly in the database. It's off by default, so
-- we turn it on and add explicit rules below.
alter table listings enable row level security;

-- Anyone can view listings (including logged-out visitors browsing the site).
create policy "Listings are viewable by everyone"
  on listings for select
  using (true);

-- Only a signed-in user can create a listing, and only under their own id.
create policy "Landlords can insert their own listings"
  on listings for insert
  with check (auth.uid() = landlord_id);

-- Only the landlord who owns a listing can edit or delete it.
create policy "Landlords can update their own listings"
  on listings for update
  using (auth.uid() = landlord_id);

create policy "Landlords can delete their own listings"
  on listings for delete
  using (auth.uid() = landlord_id);
