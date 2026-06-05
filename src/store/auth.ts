import { RegisterBusinessDetailsFormData } from "@/schema/auth/vendor-register.schema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const env = process.env.NEXT_PUBLIC_ENV;

type UserType = "client" | "vendor" | "admin" | "none";

type VendorOnboardingData = RegisterBusinessDetailsFormData & {
  additionalFileData?: any;
  govIdFilesData?: any[];
  portfolioFilesData?: any[];
};

// ── 1. Non-persisted file store ───────────────────────────────────────────────

type VendorOnboardingFilesState = {
  additionalFileData: File | null;
  govIdFiles: File[];
  portfolioFiles: File[];
  setAdditionalFileData: (file: File | null) => void;
  setGovIdFiles: (files: File[]) => void;
  setPortfolioFiles: (files: File[]) => void;
  clearVendorOnboardingFiles: () => void;
};

export const useVendorOnboardingFilesStore = create<VendorOnboardingFilesState>((set) => ({
  additionalFileData: null,
  govIdFiles: [],
  portfolioFiles: [],
  setAdditionalFileData: (file) => set({ additionalFileData: file }),
  setGovIdFiles: (files) => set({ govIdFiles: files }),
  setPortfolioFiles: (files) => set({ portfolioFiles: files }),
  clearVendorOnboardingFiles: () =>
    set({ additionalFileData: null, govIdFiles: [], portfolioFiles: [] }),
}));

// ── 2. Persisted auth store (files completely removed) ────────────────────────

type AuthState = {
  authEmail: string;
  setAuthEmail: (authEmail: string) => void;
  authToken: string;
  setAuthToken: (authToken: string) => void;
  hasHydrated: boolean;
  setHasHydrated: () => void;
  userType: UserType;
  setUserType: (userType: UserType) => void;
  userId: string;
  setUserId: (userId: string) => void;
  vendorOnboardingData: VendorOnboardingData | null;
  setVendorOnboardingData: (vendorOnboardingData: VendorOnboardingData) => void;
  clearVendorOnboardingData: () => void;
  user: any | null;
  setUser: (user: any) => void;
  registrationId: string;
  setRegistrationId: (registrationId: string) => void;
  vendorRegisterEmail: string;
  setVendorRegisterEmail: (vendorRegisterEmail: string) => void;
  vendorRegisterPhone: string;
  setVendorRegisterPhone: (vendorRegisterPhone: string) => void;
  vendorProfile: string;
  setVendorProfile: (vendorProfile: string) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authEmail: "",
      setAuthEmail: (authEmail) => set({ authEmail }),

      authToken: "",
      setAuthToken: (authToken) => set({ authToken }),

      hasHydrated: false,
      setHasHydrated: () => set({ hasHydrated: true }),

      userType: "none",
      setUserType: (userType) => set({ userType }),

      userId: "",
      setUserId: (userId) => set({ userId }),

      vendorOnboardingData: null,
      setVendorOnboardingData: (vendorOnboardingData) =>
        set((state) => ({
          vendorOnboardingData: {
            ...state.vendorOnboardingData,
            ...vendorOnboardingData,
          },
        })),
      clearVendorOnboardingData: () => {
        set({
          vendorOnboardingData: null
        })
      },

      user: null,
      setUser: (user) => set({ user }),

      registrationId: "",
      setRegistrationId: (registrationId) => set({ registrationId }),

      vendorRegisterEmail: "",
      setVendorRegisterEmail: (vendorRegisterEmail) => set({ vendorRegisterEmail }),

      vendorRegisterPhone: "",
      setVendorRegisterPhone: (vendorRegisterPhone) => set({ vendorRegisterPhone }),

      vendorProfile: "",
      setVendorProfile: (vendorProfile) => set({ vendorProfile }),
    }),
    {
      name: `${env}-auth-data`,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        authEmail: state.authEmail,
        authToken: state.authToken,
        userType: state.userType,
        userId: state.userId,
        vendorOnboardingData: state.vendorOnboardingData,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated();
      },
    },
  ),
);