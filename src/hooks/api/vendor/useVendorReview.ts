import { ApiError, get, isApiError, post } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { ApiResponse } from "@/types/auth";
import { VendorReview } from "@/types/vendor";
import { showToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useVendorReviews() {
    const { userId } = useAuthStore()

    return useQuery<VendorReview[]>({
        queryKey: ["vendor-reviews"],
        queryFn: async () => {
            const response = await get<ApiResponse<VendorReview[]>>(
                `/trust/reviews/vendor/${userId}`,
            );

            return response.data;
        },
    });
}

export function useRespondReview(mutationOption: {
    onSuccess: (res: any) => void;
    onError: (error: ApiError) => void;
}) {
    return useMutation({
        mutationFn: ({ reviewId, vendorId, response }: { reviewId: number, vendorId: string, response: string }) =>
            post<ApiResponse<any>>(`/trust/reviews/${reviewId}/respond?vendorId=${vendorId}`, { responseText: response }),
        ...mutationOption,
    });
}

export function useSubmitRespondReview() {
    const { userId: vendorId } = useAuthStore();
    const queryClient = useQueryClient();

    const { mutateAsync: respondReview, isPending } = useMutation({
        mutationFn: ({ reviewId, response }: { reviewId: number; response: string }) =>
            post<ApiResponse<any>>(
                `/trust/reviews/${reviewId}/respond?vendorId=${vendorId}`,
                { responseText: response }
            ),
        onSuccess: (res) => {
            showToast({
                type: "success",
                title: "Success",
                message: res.message,
            });

            queryClient.invalidateQueries({
                queryKey: ["vendor-reviews"],
            });
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

    const onSubmit = async (payload: {
        reviewId: number;
        response: string;
    }) => {
        return respondReview(payload);
    };

    return { onSubmit, isPending };
}