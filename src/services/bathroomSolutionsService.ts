
import { supabase } from "@/integrations/supabase/client";
import type { 
  BathroomProduct, 
  BathroomInstallation, 
  BathroomCategory, 
  ProductInquiry,
  BathroomProductFormData,
  BathroomInstallationFormData,
  ProductInquiryFormData,
  BathroomSolutionFormData
} from "@/types/bathroom-solutions";

export class BathroomSolutionsService {
  // Products
  static async getProducts(published_only = false): Promise<BathroomProduct[]> {
    let query = supabase
      .from("bathroom_products")
      .select("*")
      .order("sort_order", { ascending: true });

    if (published_only) {
      query = query.eq("published", true);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  static async getProduct(id: string): Promise<BathroomProduct | null> {
    const { data, error } = await supabase
      .from("bathroom_products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createProduct(product: BathroomProductFormData): Promise<BathroomProduct> {
    // Get bathroom solutions business sector ID
    const { data: sector } = await supabase
      .from("business_sectors")
      .select("id")
      .eq("route", "/bathroom-solutions")
      .single();

    const { data, error } = await supabase
      .from("bathroom_products")
      .insert([{ ...product, business_sector_id: sector?.id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateProduct(id: string, product: Partial<BathroomProductFormData>): Promise<BathroomProduct> {
    const { data, error } = await supabase
      .from("bathroom_products")
      .update(product)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from("bathroom_products")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }

  // Installations
  static async getInstallations(published_only = false): Promise<BathroomInstallation[]> {
    let query = supabase
      .from("bathroom_installations")
      .select("*")
      .order("sort_order", { ascending: true });

    if (published_only) {
      query = query.eq("published", true);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  static async getInstallation(id: string): Promise<BathroomInstallation | null> {
    const { data, error } = await supabase
      .from("bathroom_installations")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createInstallation(installation: BathroomInstallationFormData): Promise<BathroomInstallation> {
    // Get bathroom solutions business sector ID
    const { data: sector } = await supabase
      .from("business_sectors")
      .select("id")
      .eq("route", "/bathroom-solutions")
      .single();

    const { data, error } = await supabase
      .from("bathroom_installations")
      .insert([{ ...installation, business_sector_id: sector?.id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateInstallation(id: string, installation: Partial<BathroomInstallationFormData>): Promise<BathroomInstallation> {
    const { data, error } = await supabase
      .from("bathroom_installations")
      .update(installation)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteInstallation(id: string): Promise<void> {
    const { error } = await supabase
      .from("bathroom_installations")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }

  // Categories
  static async getCategories(active_only = false): Promise<BathroomCategory[]> {
    let query = supabase
      .from("bathroom_categories")
      .select("*")
      .order("sort_order", { ascending: true });

    if (active_only) {
      query = query.eq("active", true);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  static async getCategory(id: string): Promise<BathroomCategory | null> {
    const { data, error } = await supabase
      .from("bathroom_categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createCategory(category: { name: string; description?: string; active?: boolean; sort_order?: number }): Promise<BathroomCategory> {
    // Get bathroom solutions business sector ID
    const { data: sector } = await supabase
      .from("business_sectors")
      .select("id")
      .eq("route", "/bathroom-solutions")
      .single();

    const { data, error } = await supabase
      .from("bathroom_categories")
      .insert([{ ...category, business_sector_id: sector?.id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateCategory(id: string, category: { name?: string; description?: string; active?: boolean; sort_order?: number }): Promise<BathroomCategory> {
    const { data, error } = await supabase
      .from("bathroom_categories")
      .update(category)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteCategory(id: string): Promise<void> {
    const { error } = await supabase
      .from("bathroom_categories")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }

  // Inquiries
  static async getInquiries(): Promise<ProductInquiry[]> {
    const { data, error } = await supabase
      .from("product_inquiries")
      .select(`
        *,
        bathroom_products (
          name,
          model
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async createInquiry(inquiry: ProductInquiryFormData): Promise<ProductInquiry> {
    const { data, error } = await supabase
      .from("product_inquiries")
      .insert([inquiry])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async createBathroomSolution(solution: BathroomSolutionFormData): Promise<BathroomSolutionFormData> {
    // Get bathroom solutions business sector ID
    const { data: sector } = await supabase
      .from("business_sectors")
      .select("id")
      .eq("route", "/bathroom-solutions")
      .single();

    const { data, error } = await supabase
      .from("bathroom_solutions")
      .insert([{ ...solution, business_sector_id: sector?.id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateInquiryStatus(id: string, status: string): Promise<ProductInquiry> {
    const { data, error } = await supabase
      .from("product_inquiries")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteInquiry(id: string): Promise<void> {
    const { error } = await supabase
      .from("product_inquiries")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}
