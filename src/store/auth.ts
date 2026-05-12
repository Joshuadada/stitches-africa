import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const env = process.env.NEXT_PUBLIC_ENV;

type UserType = "client" | "vendor" | "admin" | "none";

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
  vendorOnboardingData: any | null;
  setVendorOnboardingData: (vendorOnboardingData: any) => void;
  user: any | null;
  setUser: (user: any) => void;
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
        set({ vendorOnboardingData }),

      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: `${env}-auth-data`,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        vendorOnboardingData: state.vendorOnboardingData,
        authEmail: state.authEmail,
        authToken: state.authToken,
        userType: state.userType,
        userId: state.userId,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated();
      },
    },
  ),
);
