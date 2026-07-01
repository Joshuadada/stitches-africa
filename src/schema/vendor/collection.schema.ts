import { z } from "zod";

export const createCollectionSchema = z.object({
  collectionName: z.string().min(2, "Collection name is required"),

  description: z.string().min(10, "Description must be at least 10 characters"),

  bundlePrice: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Bundle price must be a valid amount",
    }),

  discountPercentage: z
    .string()
    .refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100), {
      message: "Discount percentage must be between 0 and 100",
    }),

  // Not registered as an RHF field — set manually via setValue
  productIds: z.array(z.string()).min(1, "Add at least one product").optional(),
  coverImage: z.instanceof(File).optional(),
});

export type CreateCollectionFormData = z.infer<typeof createCollectionSchema>;