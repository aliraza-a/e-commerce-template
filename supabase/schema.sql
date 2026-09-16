-- ==========================================
-- E-COMMERCE SUPABASE SCHEMA & RLS POLICIES
-- ==========================================

-- 1. PROFILES (Extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  role text default 'customer' check (role in ('customer', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

-- Helper function to check if current user is admin without triggering recursive RLS
create or replace function public.is_admin()
returns boolean as $$
declare
  user_role text;
begin
  select role into user_role from public.profiles where id = auth.uid();
  return user_role = 'admin';
end;
$$ language plpgsql security definer set search_path = public;

create policy "Public profiles are viewable by admin."
  on profiles for select
  using ( public.is_admin() );

create policy "Users can view own profile."
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Function to handle new user signup
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'customer');
  return new;
end;
$$;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. CATEGORIES
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.categories enable row level security;

create policy "Categories are viewable by everyone."
  on categories for select
  using ( true );

create policy "Only admins can insert categories."
  on categories for insert
  with check ( (select role from profiles where id = auth.uid()) = 'admin' );

create policy "Only admins can update categories."
  on categories for update
  using ( (select role from profiles where id = auth.uid()) = 'admin' );

create policy "Only admins can delete categories."
  on categories for delete
  using ( (select role from profiles where id = auth.uid()) = 'admin' );


-- 3. PRODUCTS
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  category_id uuid references public.categories on delete set null,
  title text not null,
  slug text not null unique,
  description text,
  price numeric(10,2) not null default 0.00,
  compare_at_price numeric(10,2),
  images text[] default '{}',
  inventory_count integer default 0,
  is_active boolean default true,
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.products enable row level security;

create policy "Active products are viewable by everyone."
  on products for select
  using ( is_active = true or (select role from profiles where id = auth.uid()) = 'admin' );

create policy "Only admins can insert products."
  on products for insert
  with check ( (select role from profiles where id = auth.uid()) = 'admin' );

create policy "Only admins can update products."
  on products for update
  using ( (select role from profiles where id = auth.uid()) = 'admin' );

create policy "Only admins can delete products."
  on products for delete
  using ( (select role from profiles where id = auth.uid()) = 'admin' );


-- 4. ORDERS
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete set null,
  status text not null default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  subtotal numeric(10,2) not null,
  shipping_cost numeric(10,2) not null default 0.00,
  total numeric(10,2) not null,
  shipping_address jsonb not null,
  billing_address jsonb,
  stripe_session_id text,
  stripe_payment_intent_id text,
  tracking_number text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.orders enable row level security;

create policy "Users can view their own orders."
  on orders for select
  using ( auth.uid() = user_id or (select role from profiles where id = auth.uid()) = 'admin' );

create policy "Only admins or system can insert orders."
  on orders for insert
  with check ( (select role from profiles where id = auth.uid()) = 'admin' );

create policy "Only admins can update orders."
  on orders for update
  using ( (select role from profiles where id = auth.uid()) = 'admin' );


-- 5. ORDER ITEMS
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders on delete cascade not null,
  product_id uuid references public.products on delete set null,
  quantity integer not null check (quantity > 0),
  price_at_time numeric(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.order_items enable row level security;

create policy "Users can view their own order items."
  on order_items for select
  using ( 
    (select user_id from orders where orders.id = order_items.order_id) = auth.uid() 
    or (select role from profiles where id = auth.uid()) = 'admin'
  );


-- 6. STORAGE BUCKETS (For product images)
insert into storage.buckets (id, name, public) values ('products', 'products', true);

create policy "Product images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'products' );

create policy "Only admins can upload product images."
  on storage.objects for insert
  with check ( bucket_id = 'products' and (select role from profiles where id = auth.uid()) = 'admin' );

create policy "Only admins can update product images."
  on storage.objects for update
  using ( bucket_id = 'products' and (select role from profiles where id = auth.uid()) = 'admin' );

create policy "Only admins can delete product images."
  on storage.objects for delete
  using ( bucket_id = 'products' and (select role from profiles where id = auth.uid()) = 'admin' );
