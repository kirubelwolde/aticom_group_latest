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
