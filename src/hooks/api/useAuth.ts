import { LoginFormData } from "@/schema/auth/login.schema";
import { post } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { ApiResponse } from "@/types/auth";
import { showToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useVendorLogin(mutationOption: {
    onSuccess: (res: any) => void;
    onError: (error: any) => void;
}) {
    return useMutation({
        mutationFn: (payload: LoginFormData) =>
            post<ApiResponse<any>>(
                "/vendor/auth/login",
                payload,
            ),
        ...mutationOption,
    });
}

export function useSubmitVendorLogin(reset: () => void) {
    const router = useRouter();
    const state = useAuthStore((state) => state);
    const setEmail = state.setAuthEmail;
    const setToken = state.setAuthToken;

    const { mutate: vendorLogin, isPending } = useVendorLogin({
        onSuccess: (res) => {
            showToast({
                type: "success",
                title: "Success",
                message: res.message,
            });

            setEmail(res.data.email);
            setToken(res.data.token);
            router.push("/vendor");
            reset();
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message ||
                error.message ||
                "Something went wrong";
            showToast({
                type: "error",
                title: "Error",
                message,
            });
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        vendorLogin(data);
    };

    return { onSubmit, isPending };
}