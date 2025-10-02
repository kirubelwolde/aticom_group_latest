-- Create storage bucket for CSR images and set policies
insert into storage.buckets (id, name, public)
values ('csr-images', 'csr-images', true)
on conflict (id) do nothing;

-- Public can read objects in csr-images
create policy if not exists "Public read csr images"
on storage.objects for select to public
using (bucket_id = 'csr-images');

-- Authenticated users can manage objects
create policy if not exists "Authenticated manage csr images"
on storage.objects for all to authenticated
using (bucket_id = 'csr-images')
with check (bucket_id = 'csr-images');


