
import type { Json } from "@/integrations/supabase/types";

export interface BathroomProduct {
  id: string;
  business_sector_id?: string;
  name: string;
  model?: string;
  category: string;
  price?: string;
  features: string[];
  description?: string;
  specifications: Json;
  image_url?: string;
  rating: number;
  reviews_count: number;
  published: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface BathroomInstallation {
  id: string;
  business_sector_id?: string;
  title: string;
  location?: string;
  description?: string;
  area?: string;
  client_name?: string;
  image_url?: string;
  completion_date?: string;
  published: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface BathroomCategory {
  id: string;
  business_sector_id?: string;
  name: string;
  description?: string;
  active: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductInquiry {
  id: string;
  product_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  message?: string;
  inquiry_type: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface BathroomProductFormData {
  name: string;
  model?: string;
  category: string;
  price?: string;
  features: string[];
  description?: string;
  specifications: Json;
  image_url?: string;
  rating?: number;
  reviews_count?: number;
  published: boolean;
  sort_order?: number;
}

export interface BathroomInstallationFormData {
  title: string;
  location?: string;
  description?: string;
  area?: string;
  client_name?: string;
  image_url?: string;
  completion_date?: string;
  published: boolean;
  sort_order?: number;
}

export interface ProductInquiryFormData {
  product_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  message?: string;
  inquiry_type?: string;
}

export interface BathroomSolutionFormData {
  title: string;
  description: string;
  image_url: string;
  category: string;
  features: string[];
}