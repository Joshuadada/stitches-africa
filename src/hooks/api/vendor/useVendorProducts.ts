import { ApiError, post, isApiError, get } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { ApiResponse } from "@/types/auth";
import { Product, VendorProduct } from "@/types/vendor";
import { showToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    const { userId: vendorId, user } = useAuthStore()
    const queryClient = useQueryClient();
    const { mutate: addProduct, isPending } = useAddProduct({
        onSuccess: (res) => {
            showToast({
                type: "success",
                title: "Success",
                message: res.message,
            });

            queryClient.invalidateQueries({ queryKey: ["vendor-reviews"] });
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
        formData.append("vendorName", `${user.firstName} ${user.lastName}`);
        formData.append("vendorBadgeTier", user.badgeTier!);
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