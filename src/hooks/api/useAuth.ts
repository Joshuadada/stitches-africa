import { LoginFormData } from "@/schema/auth/login.schema";
import { RegisterBusinessDetailsFormData, RegisterStartFormData } from "@/schema/auth/vendor-register.schema";
import { post } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { ApiResponse } from "@/types/auth";
import { showToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type VendorOnboardingData = RegisterBusinessDetailsFormData & {
    additionalFileData: any;
    govIdFilesData: any[];
    portfolioFilesData: any[];
};

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
                title: "Login Success",
                message: res.message,
            });

            setEmail(res.data.email);
            setToken(res.data.token);
            router.push("/vendor/home");
            reset();
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message ||
                error.message ||
                "Something went wrong";
            showToast({
                type: "error",
                title: "Login Error",
                message,
            });
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        vendorLogin(data);
    };

    return { onSubmit, isPending };
}

export function useVendorRegisterStart(mutationOption: {
    onSuccess: (res: any) => void;
    onError: (error: any) => void;
}) {
    return useMutation({
        mutationFn: (payload: RegisterStartFormData) =>
            post<ApiResponse<any>>(
                "/vendor/auth/register",
                payload,
            ),
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
                title: "Login Success",
                message: res.message,
            });

            setRegistrationId(res.data.registrationId);
            success?.()
            reset();
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message ||
                error.message ||
                "Something went wrong";
            showToast({
                type: "error",
                title: "Login Error",
                message,
            });
        },
    });

    const onSubmit = async (data: RegisterStartFormData) => {
        vendorRegisterStart(data);
    };

    return { onSubmit, isPending };
}

export function useVendorConfirmOtp(mutationOption: {
    onSuccess: (res: any) => void;
    onError: (error: any) => void;
}) {
    return useMutation({
        mutationFn: (payload: {
            verificationCode: string;
            registrationId: string
        }) =>
            post<ApiResponse<any>>(
                "/vendor/auth/verify-email",
                payload,
            ),
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

            router.push('/vendor/register/business-details')
            reset();
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message ||
                error.message ||
                "Something went wrong";
            showToast({
                type: "error",
                title: "Confirm OTP Error",
                message,
            });
        },
    });

    const onSubmit = async ({ verificationCode }: { verificationCode: string }) => {
        console.log(registrationId)
        const payload = {
            verificationCode,
            registrationId
        }
        vendorConfirmOtp(payload);
    };

    return { onSubmit, isPending };
}

export function useVendorRegister(mutationOption: {
    onSuccess: (res: any) => void;
    onError: (error: any) => void;
}) {
    return useMutation({
        mutationFn: (payload: any) =>
            post<ApiResponse<any>>(
                "/vendor/auth/complete-registration",
                payload,
            ),
        ...mutationOption,
    });
}

export function useSubmitVendorRegister(reset: () => void) {
    const router = useRouter();
    const state = useAuthStore((state) => state);
    const setEmail = state.setAuthEmail;
    const setToken = state.setAuthToken;
    const registrationId = state.registrationId;

    const { mutate: vendorRegister, isPending } = useVendorRegister({
        onSuccess: (res) => {
            showToast({
                type: "success",
                title: "Registration Successful",
                message: res.message,
            });
            setEmail(res.data.email);
            setToken(res.data.token);
            router.push("/vendor/login");
            reset();
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message ||
                error.message ||
                "Something went wrong";
            showToast({
                type: "error",
                title: "Registration Error",
                message,
            });
        },
    });

    const onSubmit = (vendorOnboardingData: RegisterBusinessDetailsFormData, fileData: { additionalFile: File | null, portfolioFiles: File[] | null, govIdFiles: File[] | null }) => {
        const {
            // Step 1 — personal info (from initial registration step)
            firstName,
            lastName,
            password,

            // Step 2 — business details
            businessName,
            cacRegistrationNumber,
            physicalBusinessAddress,
            yearsInOperation,
            businessEmail,
            phoneNumber,
            businessCategory,
            whatsappNumber
        } = vendorOnboardingData;

        const { additionalFile, govIdFiles, portfolioFiles } = fileData

        const formData = new FormData();

        // Text fields — match API keys exactly from the screenshot
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

        // productCategories sent as repeated keys (not JSON array)
        businessCategory?.forEach((cat: any) => {
            formData.append("productCategories", cat);
        });

        // File fields
        if (additionalFile) {
            formData.append("cacCertificate", additionalFile);
        }

        govIdFiles?.forEach((file: any) => {
            formData.append("governmentIssuedId", file);
        });

        portfolioFiles?.forEach((file: any) => {
            formData.append("productPortfolio", file);
        });

        vendorRegister(formData);
    };

    return { onSubmit, isPending };
}