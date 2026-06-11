import { number } from "zod";

export type ProductType = "Bespoke" | "MTO" | "RTW";
export type ReviewStatus = "Published" | "Hidden"

export type VendorProfile = {
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    businessName: string,
    cacNumber: string,
    physicalAddress: string,
    productCategories: any[],
    badgeTier: string,
    isBankAccountVerified: boolean,
    isKycVerified: boolean,
    averageResponseTimeMinutes: number
}

export type VendorReview = {
    reviewId: number,
    orderId: number,
    productId: string,
    productName: string,
    productCategory: ProductType,
    vendorId: string,
    customerName: string,
    rating: number,
    reviewText: string,
    status: ReviewStatus,
    createdDate: string,
    photoUrls: string[],
    vendorResponseText: string | null
}