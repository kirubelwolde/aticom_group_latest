# Team Images Troubleshooting Guide

## Problem: Images are not showing on the team page

Here's a step-by-step guide to fix the image display issues:

## Step 1: Apply Database Setup

1. **Go to your Supabase Dashboard**
2. **Navigate to SQL Editor**
3. **Run the setup script** (copy and paste the contents of `setup-team-database.sql`)

This will:
- Create the `team_members` table
- Set up proper permissions
- Insert sample team members (without images initially)

## Step 2: Check Browser Console

1. **Open your browser's Developer Tools** (F12)
2. **Go to the Console tab**
3. **Visit** `http://localhost:8080/team`
4. **Look for these debug messages:**
   - `"Fetched team members:"` - This shows if data is being fetched
   - `"Image failed to load:"` - This shows if specific images are failing

## Step 3: Test the Admin Panel

1. **Go to** `http://localhost:8080/admin/team`
2. **Try adding a new team member with an image:**
   - Click "Add Member"
   - Fill in the details
   - Click "Upload Image" and select a photo
   - Save the member
3. **Check if you get redirected to** `/team` page
4. **See if the new member appears with their image**

## Step 4: Verify Storage Bucket

1. **In Supabase Dashboard, go to Storage**
2. **Check if you have a bucket called** `hero-cards`
3. **If not, create it:**
   - Click "New bucket"
   - Name: `hero-cards`
   - Make it public: ✅
   - Click "Create bucket"

## Step 5: Check RLS Policies

1. **In Supabase Dashboard, go to Authentication > Policies**
2. **Find the** `hero-cards` bucket policies
3. **Make sure you have:**
   - Public read access
   - Authenticated user upload access

## Step 6: Manual Database Check

Run this query in Supabase SQL Editor to check your data:

```sql
-- Check if team members exist
SELECT id, name, position, image_url, active FROM team_members;

-- Check if images are being uploaded
SELECT * FROM storage.objects WHERE bucket_id = 'hero-cards';
```

## Common Issues & Solutions

### Issue 1: "No team members found"
**Solution:** The database setup hasn't been applied. Run the `setup-team-database.sql` script.

### Issue 2: "Images not loading"
**Possible causes:**
- Storage bucket doesn't exist
- RLS policies are blocking access
- Image URLs are incorrect

**Solution:** 
1. Create the `hero-cards` bucket in Storage
2. Set it as public
3. Add proper RLS policies

### Issue 3: "Upload button not working"
**Solution:** Check browser console for JavaScript errors. Make sure Supabase client is properly configured.

### Issue 4: "Redirect not working"
**Solution:** Check if the navigation is working. The redirect happens after successful team member creation.

## Quick Fix Commands

If you want to quickly test with some sample data:

```sql
-- Add a test team member with a working image URL
INSERT INTO team_members (name, position, department, bio, image_url, experience, order_index) VALUES
('Test Member', 'Test Position', 'Test Department', 'This is a test member', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face', '5+ Years', 999);
```

## Expected Behavior

After proper setup:
1. **Admin page** (`/admin/team`) should show existing team members
2. **Upload functionality** should work (click "Upload Image")
3. **Team page** (`/team`) should display members with images or fallback avatars
4. **After adding a member**, you should be redirected to `/team`

## Still Having Issues?

1. **Check the browser console** for error messages
2. **Verify Supabase connection** in your environment variables
3. **Make sure all migrations are applied**
4. **Test with a simple image URL first** before trying file uploads

The system is designed to gracefully handle missing images by showing a nice fallback avatar with the person's initials.
