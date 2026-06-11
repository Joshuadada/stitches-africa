import { ApiError, post, isApiError } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { ApiResponse } from "@/types/auth";
import { showToast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRespondReview } from "./useVendorReview";

export function useAddProduct(mutationOption: {
    onSuccess: (res: any) => void;
    onError: (error: ApiError) => void;
}) {
    return useMutation({
        mutationFn: ({ reviewId, vendorId, response }: { reviewId: number, vendorId: string, response: string }) =>
            post<ApiResponse<any>>(`/trust/reviews/${reviewId}/respond?vendorId=${vendorId}`, { responseText: response }),
        ...mutationOption,
    });
}

export function useSubmitAddProduct(reset: () => void) {
    const { userId: vendorId } = useAuthStore()
    const queryClient = useQueryClient();
    const { mutate: respondReview, isPending } = useRespondReview({
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

    const onSubmit = (payload: { reviewId: number, response: string }) => {
        respondReview({
            vendorId,
            ...payload
        });
    };

    return { onSubmit, isPending };
}