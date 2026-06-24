import { get } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { ApiResponse } from "@/types/auth";
import { BankAccount, Payout } from "@/types/vendor";
import { useQuery } from "@tanstack/react-query";

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