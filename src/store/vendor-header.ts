import { create } from "zustand";

type VendorHeaderState = {
    title: string;
    highlight?: string;
    setVendorHeader: (data: {
        title: string;
        highlight?: string;
    }) => void;
}

export const useVendorHeaderStore =
    create<VendorHeaderState>((set) => ({
        title: "Welcome back",
        highlight: "",

        setVendorHeader: (data) =>
            set({
                title: data.title,
                highlight: data.highlight,
            }),
    }));