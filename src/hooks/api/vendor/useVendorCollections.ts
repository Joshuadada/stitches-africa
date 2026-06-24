import { CreateCollectionFormData } from "@/schema/vendor/collection.schema";
import { ApiError, post, isApiError, get, deleteRequest, put } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { ApiResponse } from "@/types/auth";
import { Collection } from "@/types/vendor";
import { showToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useVendorCollections() {
    const { userId } = useAuthStore()

    return useQuery<Collection[]>({
        queryKey: ["vendor-collections"],
        queryFn: async () => {
            const response = await get<ApiResponse<Collection[]>>(
                `/Collections/vendor/${userId}`,
            );

            return response.data;
        },
    });
}

export function useAddCollection(mutationOption: {
    onSuccess: (res: any) => void;
    onError: (error: ApiError) => void;
}) {
    return useMutation({
        mutationFn: (payload: FormData) =>
            post<ApiResponse<any>>(`/Collections`, payload),
        ...mutationOption,
    });
}

export function useSubmitAddCollection(reset: () => void) {
    const { userId: vendorId, vendorProfile } = useAuthStore()
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutate: addCollection, isPending } = useAddCollection({
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

    const onSubmit = (payload: CreateCollectionFormData) => {
        const formData = new FormData();
        formData.append("name", payload.collectionName);
        formData.append("description", payload.description);
        formData.append("bundlePrice", payload.bundlePrice.toString());
        formData.append("discountPercentage", payload.discountPercentage.toString());
        formData.append("productIds", JSON.stringify(payload.productIds ?? []));
        formData.append("createdByVendorId", vendorId!);

        if (payload.coverImage) {
            formData.append("coverImage", payload.coverImage);
        }

        addCollection(formData);
    };

    return { onSubmit, isPending };
}

export const useDeleteVendorCollection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            deleteRequest<any>(`/Collections/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vendor-collections"] })
        }
    })
}

export const usePublishVendorCollection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            put<any>(`Collections/${id}/publish`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vendor-collections"] })
        }
    })
}

export const useUnpublishVendorCollection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            put<any>(`Collections/${id}/unpublish`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vendor-collections"] })
        }
    })
}
