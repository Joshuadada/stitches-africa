import { z } from "zod";

export const addProductsSelectionSchema = z.object({
    selectedIds: z
        .array(z.string())
        .min(1, "Select at least one product"),
});

export type AddProductsSelectionFormData = z.infer<typeof addProductsSelectionSchema>;
