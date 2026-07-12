import { create } from "zustand";

export type AdminHeaderAction = {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: "outline" | "filled";
};

const DEFAULT_ACTIONS: AdminHeaderAction[] = [
    { label: "Refresh", variant: "outline" },
    { label: "Generate report", variant: "filled" },
];

type AdminHeaderState = {
    eyebrow: string;
    title: string;
    actions: AdminHeaderAction[];
    setAdminHeader: (data: {
        eyebrow?: string;
        title: string;
        actions?: AdminHeaderAction[];
    }) => void;
}

export const useAdminHeaderStore =
    create<AdminHeaderState>((set) => ({
        eyebrow: "Admin Dashboard",
        title: "Platform Overview",
        actions: DEFAULT_ACTIONS,

        setAdminHeader: (data) =>
            set({
                eyebrow: data.eyebrow ?? "",
                title: data.title,
                actions: data.actions ?? DEFAULT_ACTIONS,
            }),
    }));
