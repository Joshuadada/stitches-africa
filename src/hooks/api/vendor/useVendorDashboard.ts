import { get } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { ApiResponse } from "@/types/auth";
import { Dashboard } from "@/types/vendor";
import { useQuery } from "@tanstack/react-query";

export function useVendorDashboard() {
    const { userId } = useAuthStore()

    return useQuery<Dashboard>({
        queryKey: ["vendor-dashboard"],
        queryFn: async () => {
            const response = await get<ApiResponse<Dashboard>>(
                `/vendor/${userId}/dashboard`,
            );

            return response.data;
        },
    });
}