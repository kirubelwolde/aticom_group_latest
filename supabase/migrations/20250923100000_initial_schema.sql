
CREATE TABLE public.bathroom_categories (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_sector_id uuid REFERENCES public.business_sectors(id) ON DELETE SET NULL,
    name text NOT NULL,
    description text,
    active boolean DEFAULT TRUE,
    sort_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.bathroom_products (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_sector_id uuid REFERENCES public.business_sectors(id) ON DELETE SET NULL,
    name text NOT NULL,
    model text,
    category text REFERENCES public.bathroom_categories(name) ON UPDATE CASCADE ON DELETE SET NULL,
    price text,
    features text[] DEFAULT ARRAY[]::text[],
    description text,
    specifications jsonb DEFAULT '{}'::jsonb,
    image_url text,
    rating numeric DEFAULT 0,
    reviews_count integer DEFAULT 0,
    published boolean DEFAULT FALSE,
    sort_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.bathroom_installations (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_sector_id uuid REFERENCES public.business_sectors(id) ON DELETE SET NULL,
    title text NOT NULL,
    location text,
    description text,
    area text,
    client_name text,
    image_url text,
    completion_date date,
    published boolean DEFAULT FALSE,
    sort_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.product_inquiries (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id uuid REFERENCES public.bathroom_products(id) ON DELETE SET NULL,
    customer_name text NOT NULL,
    customer_email text NOT NULL,
    customer_phone text,
    message text,
    inquiry_type text DEFAULT 'general',
    status text DEFAULT 'pending',
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

