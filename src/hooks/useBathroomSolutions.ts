
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BathroomSolutionsService } from "@/services/bathroomSolutionsService";
import type { 
  BathroomProductFormData, 
  BathroomInstallationFormData, 
  ProductInquiryFormData 
} from "@/types/bathroom-solutions";
import { useToast } from "@/hooks/use-toast";

export const useBathroomProducts = (publishedOnly = false) => {
  return useQuery({
    queryKey: ["bathroom-products", publishedOnly],
    queryFn: () => BathroomSolutionsService.getProducts(publishedOnly),
  });
};

export const useBathroomProduct = (id: string) => {
  return useQuery({
    queryKey: ["bathroom-product", id],
    queryFn: () => BathroomSolutionsService.getProduct(id),
    enabled: !!id,
  });
};

export const useBathroomInstallations = (publishedOnly = false) => {
  return useQuery({
    queryKey: ["bathroom-installations", publishedOnly],
    queryFn: () => BathroomSolutionsService.getInstallations(publishedOnly),
  });
};

export const useBathroomCategories = (activeOnly = false) => {
  return useQuery({
    queryKey: ["bathroom-categories", activeOnly],
    queryFn: () => BathroomSolutionsService.getCategories(activeOnly),
  });
};

export const useProductInquiries = () => {
  return useQuery({
    queryKey: ["product-inquiries"],
    queryFn: () => BathroomSolutionsService.getInquiries(),
  });
};

export const useCreateBathroomProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: BathroomProductFormData) => 
      BathroomSolutionsService.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bathroom-products"] });
      toast({
        title: "Success",
        description: "Product created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create product: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateBathroomProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BathroomProductFormData> }) =>
      BathroomSolutionsService.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bathroom-products"] });
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update product: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteBathroomProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => BathroomSolutionsService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bathroom-products"] });
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete product: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

export const useCreateBathroomInstallation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: BathroomInstallationFormData) => 
      BathroomSolutionsService.createInstallation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bathroom-installations"] });
      toast({
        title: "Success",
        description: "Installation created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create installation: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateBathroomInstallation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BathroomInstallationFormData> }) =>
      BathroomSolutionsService.updateInstallation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bathroom-installations"] });
      toast({
        title: "Success",
        description: "Installation updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update installation: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteBathroomInstallation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => BathroomSolutionsService.deleteInstallation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bathroom-installations"] });
      toast({
        title: "Success",
        description: "Installation deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete installation: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

export const useCreateProductInquiry = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: ProductInquiryFormData) => 
      BathroomSolutionsService.createInquiry(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Inquiry submitted successfully. We'll contact you soon!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to submit inquiry: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};
