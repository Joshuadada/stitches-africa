import { get } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { ApiResponse } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";

export function useVendorOrders() {
    const { userId } = useAuthStore()

    return useQuery<any[]>({
        queryKey: ["vendor-orders"],
        queryFn: async () => {
            const response = await get<ApiResponse<any[]>>(
                `/Order/vendor/${userId}`,
            );

            return response.data;
        },
    });
}