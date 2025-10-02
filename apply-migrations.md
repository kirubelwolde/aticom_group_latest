# Apply Team Database Migrations

To set up the team functionality with image uploads, you need to apply the database migrations:

## Option 1: Using Supabase CLI (Recommended)

```bash
# Start Supabase (if not already running)
npx supabase start

# Apply all migrations
npx supabase db reset

# Or apply specific migrations
npx supabase db push
```

## Option 2: Manual SQL Execution

If you prefer to run the SQL manually in your Supabase dashboard:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the following migrations in order:

### 1. Team Members Table
```sql
-- File: supabase/migrations/20250930120000_create_team_members_table.sql
CREATE TABLE team_members (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  position text NOT NULL,
  department text NOT NULL,
  bio text NOT NULL,
  image_url text,
  experience text,
  order_index integer NOT NULL,
  active boolean DEFAULT TRUE,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow public read access to active team members" ON team_members
  FOR SELECT USING (active = true);

CREATE POLICY "Allow admin full access to team members" ON team_members
  FOR ALL USING (true);

-- Insert sample team members
INSERT INTO team_members (name, position, department, bio, image_url, experience, order_index) VALUES
('ABDUREHMAN YASSIN', 'Chief Executive Officer (CEO)', 'Executive Leadership', 'Founder and CEO leading ATICOM Investment Group with a vision for diversified growth and international excellence.', '/lovable-uploads/11.jpg', '15+ Years', 1),
('TESFAYE BIRHANU', 'Chief Operating Officer (COO)', 'Operations Management', 'COO driving operational excellence across divisions, ensuring efficiency and delivery at scale.', '/lovable-uploads/12.jpg', '12+ Years', 2),
('BIRUK ASMERA', 'Corporate Marketing and Sales', 'Marketing & Sales', 'Leads corporate marketing and sales strategy, strengthening brand presence and revenue growth.', '/lovable-uploads/13.jpg', '10+ Years', 3),
('ABDULAZIZ HUSSEIN', 'Corporate Finance and Procurement', 'Finance & Procurement', 'Oversees corporate finance and procurement, enabling sustainable growth through prudent resource management.', '/lovable-uploads/14.jpg', '8+ Years', 4);
```

### 2. Team Images Storage
```sql
-- File: supabase/migrations/20251001121000_team_images_storage.sql
-- Create storage bucket for team member images and set policies
insert into storage.buckets (id, name, public)
values ('team-images', 'team-images', true)
on conflict (id) do nothing;

-- Public can read objects in team-images
create policy if not exists "Public read team images"
on storage.objects for select to public
using (bucket_id = 'team-images');

-- Authenticated users can manage objects
create policy if not exists "Authenticated manage team images"
on storage.objects for all to authenticated
using (bucket_id = 'team-images')
with check (bucket_id = 'team-images');
```

## What's Been Implemented

✅ **Database Schema**: Team members table with all necessary fields
✅ **Image Upload**: File upload functionality with Supabase Storage
✅ **Dynamic Team Page**: Team page now fetches data from database
✅ **Admin Interface**: Enhanced admin panel with image upload
✅ **Navigation**: Redirect to team page after adding member
✅ **Error Handling**: Proper error handling and fallbacks

## How to Use

1. **Add Team Members**: Go to `http://localhost:8080/admin/team`
2. **Upload Images**: Click "Upload Image" to select and upload photos
3. **View Team**: Visit `http://localhost:8080/team` to see the dynamic team page
4. **Automatic Redirect**: After adding a member, you'll be redirected to the team page

The system now supports:
- Image uploads to Supabase Storage
- Dynamic team member display
- Admin management interface
- Public team page with database-driven content
