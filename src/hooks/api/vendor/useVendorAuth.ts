import { LoginFormData } from "@/schema/auth/login.schema";
import { RegisterBusinessDetailsFormData, RegisterStartFormData } from "@/schema/auth/vendor-register.schema";
import { get, post } from "@/services/api";
import { isApiError, type ApiError } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { ApiResponse } from "@/types/auth";
import { VendorProfile } from "@/types/vendor";
import { showToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useVendorLogin(mutationOption: {
    onSuccess: (res: any) => void;
    onError: (error: ApiError) => void;
}) {
    return useMutation({
        mutationFn: (payload: LoginFormData) =>
            post<ApiResponse<any>>("/vendor/auth/login", payload),
        ...mutationOption,
    });
}

export function useSubmitVendorLogin(reset: () => void) {
    const router = useRouter();
    const state = useAuthStore((state) => state);

    const setEmail = state.setAuthEmail;
    const setToken = state.setAuthToken;
    const setUser = state.setUser;
    const setUserId = state.setUserId;
    const setUserType = state.setUserType;

    const { mutate: vendorLogin, isPending } = useVendorLogin({
        onSuccess: (res) => {
            showToast({
                type: "success",
                title: "Login Success",
                message: res.message,
            });

            setEmail(res.data.email);
            setToken(res.data.token);
            setUser(res.data);
            setUserId(res.data.userId);
            setUserType('vendor');

            router.push("/vendor/home");
            reset();
        },
        onError: (error: unknown) => {
            const message = isApiError(error)
                ? error.message
                : "Something went wrong";
            showToast({
                type: "error",
                title: "Login Error",
                message,
            });
        },
    });

    const onSubmit = (data: LoginFormData) => {
        vendorLogin(data);
    };

    return { onSubmit, isPending };
}

// ─── Vendor Social Login (Google / Facebook) ───────────────────────────────

export function useVendorSocialLogin(mutationOption: {
    onSuccess: (res: any) => void;
    onError: (error: ApiError) => void;
}) {
    return useMutation({
        mutationFn: (payload: { provider: string; token: string; role?: string }) =>
            post<ApiResponse<any>>("/identity/api/auth/social-login", payload),
        ...mutationOption,
    });
}

export function useSubmitVendorSocialLogin() {
    const router = useRouter();
    const state = useAuthStore((state) => state);
    const setEmail = state.setAuthEmail;
    const setToken = state.setAuthToken;
    const setUser = state.setUser;

    const { mutate: socialLogin, isPending } = useVendorSocialLogin({
        onSuccess: (res) => {
            showToast({ type: "success", title: "Login Success", message: res.message });

            setEmail(res.data.email);
            setToken(res.data.token);
            setUser(res.data);
            router.push("/vendor/home");
        },
        onError: (error: unknown) => {
            const message = isApiError(error) ? error.message : "Something went wrong";
            showToast({ type: "error", title: "Login Error", message });
        },
    });

    const onSubmit = (provider: string, token: string) => {
        socialLogin({ provider, token, role: "Vendor" });
    };

    return { onSubmit, isPending };
}

// ─── Register Start ───────────────────────────────────────────────────────────

export function useVendorRegisterStart(mutationOption: {
    onSuccess: (res: any) => void;
    onError: (error: ApiError) => void;
}) {
    return useMutation({
        mutationFn: (payload: RegisterStartFormData) =>
            post<ApiResponse<any>>("/vendor/auth/register", payload),
        ...mutationOption,
    });
}

export function useSubmitVendorRegisterStart(reset: () => void, success?: () => void) {
    const state = useAuthStore((state) => state);
    const setRegistrationId = state.setRegistrationId;

    const { mutate: vendorRegisterStart, isPending } = useVendorRegisterStart({
        onSuccess: (res) => {
            showToast({
                type: "success",
                title: "Registration Started",
                message: res.message,
            });

            setRegistrationId(res.data.registrationId);
            success?.();
            reset();
        },
        onError: (error: unknown) => {
            const message = isApiError(error)
                ? error.message
                : "Something went wrong";
            showToast({
                type: "error",
                title: "Registration Error",
                message,
            });
        },
    });

    const onSubmit = (data: RegisterStartFormData) => {
        vendorRegisterStart(data);
    };

    return { onSubmit, isPending };
}

// ─── Confirm OTP ──────────────────────────────────────────────────────────────

export function useVendorConfirmOtp(mutationOption: {
    onSuccess: (res: any) => void;
    onError: (error: ApiError) => void;
}) {
    return useMutation({
        mutationFn: (payload: { verificationCode: string; registrationId: string }) =>
            post<ApiResponse<any>>("/vendor/auth/verify-email", payload),
        ...mutationOption,
    });
}

export function useSubmitVendorConfirmOtp(reset: () => void) {
    const state = useAuthStore((state) => state);
    const router = useRouter();
    const registrationId = state.registrationId;

    const { mutate: vendorConfirmOtp, isPending } = useVendorConfirmOtp({
        onSuccess: (res) => {
            showToast({
                type: "success",
                title: "Success",
                message: res.message,
            });

            router.push("/vendor/register/business-details");
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

    const onSubmit = ({ verificationCode }: { verificationCode: string }) => {
        vendorConfirmOtp({ verificationCode, registrationId: registrationId ?? "" });
    };

    return { onSubmit, isPending };
}

// ─── Complete Registration ────────────────────────────────────────────────────

export function useVendorRegister(mutationOption: {
    onSuccess: (res: any) => void;
    onError: (error: ApiError) => void;
}) {
    return useMutation({
        mutationFn: (payload: FormData) =>
            post<ApiResponse<any>>("/vendor/auth/complete-registration", payload),
        ...mutationOption,
    });
}

export function useSubmitVendorRegister(reset: (vendorId: string) => void) {
    const state = useAuthStore((state) => state);
    const registrationId = state.registrationId;

    const { mutate: vendorRegister, isPending } = useVendorRegister({
        onSuccess: (res) => {
            showToast({
                type: "success",
                title: "Registration Successful",
                message: res.message,
            });
            reset(res.data.vendorId);
        },
        onError: (error: unknown) => {
            const message = isApiError(error)
                ? error.message
                : "Something went wrong";
            showToast({
                type: "error",
                title: "Registration Error",
                message,
            });
        },
    });

    const onSubmit = (
        vendorOnboardingData: RegisterBusinessDetailsFormData,
        fileData: {
            additionalFile: File | null;
            portfolioFiles: File[] | null;
            govIdFiles: File[] | null;
        }
    ) => {
        const {
            firstName,
            lastName,
            password,
            businessName,
            cacRegistrationNumber,
            physicalBusinessAddress,
            yearsInOperation,
            businessEmail,
            phoneNumber,
            businessCategory,
            whatsappNumber,
        } = vendorOnboardingData;

        const { additionalFile, govIdFiles, portfolioFiles } = fileData;

        const formData = new FormData();

        formData.append("registrationId", registrationId ?? "");
        formData.append("firstName", firstName ?? "");
        formData.append("lastName", lastName ?? "");
        formData.append("password", password ?? "");
        formData.append("businessName", businessName ?? "");
        formData.append("cacRegistrationNumber", cacRegistrationNumber ?? "");
        formData.append("physicalAddress", physicalBusinessAddress ?? "");
        formData.append("yearsInOperation", String(yearsInOperation ?? ""));
        formData.append("contactEmail", businessEmail || "");
        formData.append("contactPhone", phoneNumber || "");
        formData.append("contactWhatsapp", whatsappNumber || "");

        businessCategory?.forEach((cat: string) => {
            formData.append("productCategories", cat);
        });

        if (additionalFile) {
            formData.append("cacCertificate", additionalFile);
        }

        govIdFiles?.forEach((file: File) => {
            formData.append("governmentIssuedId", file);
        });

        portfolioFiles?.forEach((file: File) => {
            formData.append("productPortfolio", file);
        });

        vendorRegister(formData);
    };

    return { onSubmit, isPending };
}

export function useVendorProfile() {
    const setVendorProfile = useAuthStore((state) => state.setVendorProfile);

    return useQuery<VendorProfile>({
        queryKey: ["vendor-profile"],
        queryFn: async () => {
            const response = await get<ApiResponse<VendorProfile>>(
                "/identity/api/profile/vendor",
            );

            setVendorProfile(response?.data);
            return response.data;
        },
    });
}