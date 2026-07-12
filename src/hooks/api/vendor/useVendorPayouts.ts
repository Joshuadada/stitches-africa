import { ApiError, get, isApiError, put } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { ApiResponse } from "@/types/auth";
import { Bank, BankAccount, Payout, PayoutSummary } from "@/types/vendor";
import { showToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useVendorPayouts() {
    const { userId } = useAuthStore()

    return useQuery<Payout[]>({
        queryKey: ["vendor-payouts"],
        queryFn: async () => {
            const response = await get<ApiResponse<Payout[]>>(
                `/payment/escrow/payouts/${userId}`,
            );

            return response.data;
        },
    });
}

export function useBankAccountDetails() {
    const { userId } = useAuthStore()

    return useQuery<BankAccount>({
        queryKey: ["vendor-account-details"],
        queryFn: async () => {
            const response = await get<ApiResponse<BankAccount>>(
                `/vendor/${userId}/bank-account`,
            );

            return response.data;
        },
    });
}

export function usePayoutSummary() {
    const { userId } = useAuthStore()

    return useQuery<PayoutSummary>({
        queryKey: ["vendor-payout-summary"],
        queryFn: async () => {
            const response = await get<ApiResponse<PayoutSummary>>(
                `/payment/escrow/payouts/${userId}/summary`,
            );

            return response.data;
        },
    });
}

export function useGetBanks() {
    return useQuery<Bank[]>({
        queryKey: ["vendor-banks"],
        queryFn: async () => {
            const response = await get<ApiResponse<Bank[]>>(
                `/payment/banks`,
            );

            return response.data;
        },
    });
}

export function useUpdateBankAccount(mutationOption: {
    onSuccess: (res: any) => void;
    onError: (error: ApiError) => void;
}) {
    return useMutation({
        mutationFn: (payload: {bankAccountNumber: string, bankCode: string, bankAccountName: string}) =>
            put<ApiResponse<any>>(`/identity/api/profile/vendor/bank`, payload),
        ...mutationOption,
    });
}

export function useSubmitUpdateBankAccount(reset: () => void) {
    const queryClient = useQueryClient();
    const { mutate: updateBankAccount, isPending } = useUpdateBankAccount({
        onSuccess: (res) => {
            showToast({
                type: "success",
                title: "Success",
                message: res.message,
            });

            queryClient.invalidateQueries({ queryKey: ["vendor-account-details"] });
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

    const onSubmit = (payload: {bankAccountNumber: string, bankCode: string, bankAccountName: string}) => {
        updateBankAccount(payload);
    };

    return { onSubmit, isPending };
}

export function useGetBankAccountDetails({accountNumber, bankCode}: {accountNumber: string, bankCode: string}) {
    return useQuery<{ accountName: string }>({
        queryKey: ["vendor-bank-account-details", accountNumber, bankCode],
        queryFn: async () => {
            const response = await get<ApiResponse<{ accountName: string }>>(
                `/payment/banks/resolve?accountNumber=${accountNumber}&bankCode=${bankCode}`,
            );

            return response.data;
        },
        enabled: accountNumber.length === 10 && !!bankCode,
    });
}