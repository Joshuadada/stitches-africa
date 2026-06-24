import { CreateCollectionFormData } from "@/schema/vendor/collection.schema";
import { ApiError, post, isApiError, get, deleteRequest, put } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { ApiResponse } from "@/types/auth";
import { Product, VendorProduct } from "@/types/vendor";
import { showToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useAddProduct(mutationOption: {
    onSuccess: (res: any) => void;
    onError: (error: ApiError) => void;
}) {
    return useMutation({
        mutationFn: (payload: FormData) =>
            post<ApiResponse<any>>(`/Catalog`, payload),
        ...mutationOption,
    });
}

export function useSubmitAddProduct(reset: () => void) {
    const { userId: vendorId, vendorProfile } = useAuthStore()
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutate: addProduct, isPending } = useAddProduct({
        onSuccess: (res) => {
            showToast({
                type: "success",
                title: "Success",
                message: res.message,
            });

            queryClient.invalidateQueries({ queryKey: ["vendor-reviews"] });
            router.push('/vendor/products')
            reset();
        },
        onError: (error: unknown) => {
            const message = isApiError(error)
                ? error.message
                : "Something went wrong";
            showToast({
                type: "error",
                title: "OTP Error",
                message,
            });
        },
    });

    const onSubmit = (payload: VendorProduct) => {
        const formData = new FormData();
        formData.append("name", payload.name);
        formData.append("summary", payload.summary);
        formData.append("description", payload.description);
        formData.append("brandId", payload.brandId);
        formData.append("typeId", payload.typeId);
        formData.append("price", payload.price.toString());
        formData.append("vendorId", vendorId!);
        formData.append("vendorName", `${vendorProfile?.firstName} ${vendorProfile?.lastName}`);
        formData.append("vendorBadgeTier", vendorProfile?.badgeTier!);
        formData.append("listingType", payload.listingType);
        formData.append("isAiTryOnEnabled", payload.isAiTryOnEnabled.toString());
        formData.append("lowStockThreshold", payload.lowStockThreshold.toString());

        // 👇 single main image
        if (payload.imageFile) {
            formData.append("imageFile", payload.imageFile);
        }

        // 👇 multiple images
        if (payload.images?.length) {
            payload.images.forEach((file) => {
                formData.append("images", file);
            });
        }

        // 👇 variants (must be stringified)
        if (payload.variant?.length) {
            formData.append("variants", JSON.stringify(payload.variant));
        }

        addProduct(formData);
    };

    return { onSubmit, isPending };
}

export function useVendorProducts() {
    const { userId } = useAuthStore()

    return useQuery<Product[]>({
        queryKey: ["vendor-products"],
        queryFn: async () => {
            const response = await get<ApiResponse<Product[]>>(
                `/Catalog/vendor/${userId}`,
            );

            return response.data;
        },
    });
}

export const useDeleteVendorProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            deleteRequest<any>(`/Catalog/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vendor-products"] })
        }
    })
}

export function useVendorProductById(id: string) {
    return useQuery<any>({
        queryKey: ["vendor-by-id"],
        queryFn: async () => {
            const response = await get<ApiResponse<any>>(`/Catalog/${id}`);
            return response.data;
        },
    });
}

export function useUpdateProduct(id: string, onSuccess?: () => void) {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { userId: vendorId, vendorProfile } = useAuthStore()

    const { mutate: updateProduct, isPending } = useMutation({
        mutationFn: async (formData: FormData) => {
            return put<ApiResponse<any>>(`/Catalog/${id}`, formData);
        },
        onSuccess: (res) => {
            showToast({
                type: "success",
                title: "Success",
                message: res.message,
            });

            queryClient.invalidateQueries({ queryKey: ["vendor-product", id] });
            queryClient.invalidateQueries({ queryKey: ["vendor-products"] });
            router.push('/vendor/products')
            onSuccess?.();
        },
        onError: (error: unknown) => {
            const message = isApiError(error)
                ? error.message
                : "Something went wrong";
            showToast({
                type: "error",
                title: "Error",
                message,
            });
        },
    });

    const onSubmit = (payload: VendorProduct) => {
        const formData = new FormData();

        formData.append("name", payload.name);
        formData.append("summary", payload.summary);
        formData.append("description", payload.description);
        formData.append("brandId", payload.brandId);
        formData.append("typeId", payload.typeId);
        formData.append("price", payload.price.toString());
        formData.append("vendorId", vendorId!);
        formData.append("vendorName", `${vendorProfile?.firstName} ${vendorProfile?.lastName}`);
        formData.append("vendorBadgeTier", vendorProfile?.badgeTier!);
        formData.append("listingType", payload.listingType);
        formData.append("isAiTryOnEnabled", payload.isAiTryOnEnabled.toString());
        formData.append("lowStockThreshold", payload.lowStockThreshold.toString());

        if (payload.imageFile instanceof File) {
            formData.append("imageFile", payload.imageFile);
        }

        if (payload.images?.length) {
            payload.images.forEach((file) => {
                if (file instanceof File) {
                    formData.append("images", file);
                }
            });
        }

        if (payload.variant?.length) {
            formData.append("variants", JSON.stringify(payload.variant));
        }

        updateProduct(formData);
    };

    return { onSubmit, isPending };
}

export function useGetBrands() {
    return useQuery<any[]>({
        queryKey: ["brands"],
        queryFn: async () => {
            const response = await get<ApiResponse<any[]>>(
                `/Catalog/GetAllBrands`,
            );

            return response.data;
        },
    });
}

export function useGetProductTypes() {
    return useQuery<any[]>({
        queryKey: ["product-types"],
        queryFn: async () => {
            const response = await get<ApiResponse<any[]>>(
                `/Catalog/GetAllTypes`,
            );

            return response.data;
        },
    });
}