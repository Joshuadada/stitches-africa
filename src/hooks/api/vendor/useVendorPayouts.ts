import { get } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { ApiResponse } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";

export function useVendorPayouts() {
    const { userId } = useAuthStore()

    return useQuery<any[]>({
        queryKey: ["vendor-payouts"],
        queryFn: async () => {
            const response = await get<ApiResponse<any[]>>(
                `/payment/escrow/payouts/${userId}`,
            );

            return response.data;
        },
    });
}