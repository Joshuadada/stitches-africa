import { strict } from "assert";
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

export type VendorProduct = {
    name: string,
    summary: string,
    description: string,
    brandId: string,
    typeId: string,
    price: number,
    vendorId: string,
    vendorName: string,
    vendorBadgeTier: string,
    listingType: string,
    isAiTryOnEnabled: boolean,
    lowStockThreshold: number,
    variant: { size: string, color: string, stockQuality: number, additionalPrice: number }[],
    imageFile: File,
    images: File[]
}

export type Product = {
    id: string,
    name: string,
    summary: string,
    description: string,
    imageFile: string,
    images: string[],
    brand: {
        id: string,
        name: string
    },
    type: {
        id: string,
        name: string
    },
    price: number,
    createdDate: string,
    vendorId: string,
    vendorName: string,
    vendorBadgeTier: string,
    listingType: "ReadyToWear" | "MadeToOrder" | "Bespoke",
    isAiTryOnEnabled: boolean,
    isOnSale: boolean,
    discountPercentage: number,
    variants: {
        variantId: string,
        size: string,
        color: string,
        stockQuantity: number,
        additionalPrice: number
    }[],
    lowStockThreshold: number,
    measurementGuide: any,
    productionPeriodDays: any,
    styleOptions: any[],
    consultationDescription: string | null,
    depositAmount: any,
    estimatedProductionDays: any
}

export type Order = {
    id: string | number,
    userName: string,
    totalPrice: number,
    firstName: string,
    lastName: string,
    emailAddress: string,
    addressLine: string,
    country: string,
    state: string,
    zipCode: string,
    paymentMethodToken: string,
    paymentMethod: number,
    status: 'Pending' | 'InProduction' | 'ReadyToShip' | 'Completed' | 'Cancelled',
    orderType: "ReadyToWear" | "MadeToOrder" | "Bespoke",
    currency: string,
    vendorId: string,
    referralCode: string | null,
    depositAmount: any,
    balanceAmount: any,
    deliveredAt: string,
    lineItems: {
        productId: string,
        productName: string,
        vendorId: string,
        listingType: "ReadyToWear" | "MadeToOrder" | "Bespoke",
        quantity: number,
        unitPrice: number,
        subTotal: number
    }[],
    measurements: any
}