# Supabase Setup Guide for E-Commerce Template

Follow these steps to set up the database and authentication for a new client using this template.

## 1. Create a New Supabase Project
1. Go to [database.new](https://database.new) and create a new project.
2. Select your organization, project name (e.g., `Client-Store`), and database password.
3. Wait for the database to finish provisioning (usually takes 1-2 minutes).

## 2. Execute the Database Schema
We need to create the tables, relationships, and Row Level Security (RLS) policies.

1. In your Supabase Dashboard, navigate to the **SQL Editor** on the left sidebar.
2. Click **New Query**.
3. Copy the entire contents of `schema.sql` (located in this folder) and paste it into the editor.
4. Click **Run** (or press Cmd/Ctrl + Enter).
5. Ensure you see a "Success" message indicating the tables and policies were created.

## 3. Set Up Authentication Providers
By default, Email/Password authentication is enabled.

1. Navigate to **Authentication > Providers**.
2. If you want to enable Google Login (recommended), click **Google** and provide your OAuth Client ID and Secret (from Google Cloud Console).
3. If you want to allow email signups without email verification (for development/testing), go to **Authentication > Providers > Email** and turn OFF "Confirm email". (Remember to turn it back ON for production).

## 4. Get Your API Keys
1. Navigate to **Project Settings** (the cog icon at the bottom left) -> **API**.
2. Copy the **Project URL**.
3. Copy the **anon / public** key.

## 5. Configure Your Next.js App
1. In the root of your Next.js project, rename `.env.example` to `.env.local` (or `.env`).
2. Paste the URL and Anon Key:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 6. Make Yourself an Admin
To access the Admin Dashboard, your user account needs the `admin` role.

1. Sign up on your frontend as a normal user.
2. Go to the Supabase Dashboard -> **Table Editor** -> `profiles` table.
3. Find your user row and change the `role` column from `customer` to `admin`.
4. Click Save. Your user now has full administrative access to the store.
