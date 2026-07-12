import { z } from "zod";

export const adminAddProductsSelectionSchema = z.object({
    selectedIds: z
        .array(z.string())
        .min(1, "Select at least one product"),
});

export type AdminAddProductsSelectionFormData = z.infer<typeof adminAddProductsSelectionSchema>;
