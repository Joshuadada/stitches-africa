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
    variant: { size: string, color: string, stockQuantity: number, additionalPrice: number }[],
    imageFile: File | string,
    images: (string | File)[]
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
    stockQuantity: number,
    markupAmount: number,
    totalCost: number,
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
    status: 'Pending' | 'InProduction' | 'ReadyToShip' | 'Confirmed' | 'Completed' | 'Cancelled',
    orderType: "ReadyToWear" | "MadeToOrder" | "Bespoke",
    currency: string,
    vendorId: string,
    referralCode: string | null,
    depositAmount: any,
    balanceAmount: any,
    orderDate: string,           // added
    deliveredAt: string,
    productName: string,         // added
    productImageUrl: string | null, // added
    category: "ReadyToWear" | "MadeToOrder" | "Bespoke",  // added
    itemCount: number,           // added
    lineItems: {
        productId: string,
        productName: string,
        imageUrl: string | null, // added
        vendorId: string,
        listingType: "ReadyToWear" | "MadeToOrder" | "Bespoke",
        quantity: number,
        unitPrice: number,
        subTotal: number
    }[],
    measurements: any
}

export type Collection = {
    id: string,
    name: string,
    description: string,
    coverImageUrl: string,
    createdByVendorId: string,
    createdByAdminId: string | null,
    productIds: string[],
    bundlePrice: number,
    isOnSale: boolean,
    discountPercentage: number,
    discountedPrice: number | null,
    effectivePrice: number,
    isPublished: false,
    createdDate: string,
    publishedDate: string | null
}

export type Dashboard = {
    businessName: string,
    badgeTier: string,
    salesThisMonth: number,
    salesLastMonth: number,
    salesChangePercent: number,
    activeOrders: {
        total: number,
        readyToWear: number,
        madeToOrder: number,
        bespoke: number
    },
    activeOrdersValue: number,
    nextProcessingDate: string | null,
    reviews: {
        average: number,
        total: number,
        five: number,
        four: number,
        three: number,
        two: number,
        one: number
    },
    recentOrders:
    {
        orderRef: string,
        product: string,
        category: string,
        country: string,
        status: string
    }[]
}

export type Payout = {
    payoutBatchId: string,
    date: string,
    periodStart: string,
    periodEnd: string,
    gross: number,
    platformMarkup: number,
    netPayout: number,
    currency: string,
    status: string,
    bankReference: string | null,
    scheduledAt: string,
    processedAt: string
}

export type BankAccount = {
    hasBankAccount: boolean,
    bankName: string | null,
    accountName: string | null,
    accountNumberMasked: string | null,
    isBankAccountVerified: boolean,
    isPayoutEnabled: boolean
}

export type PayoutSummary = {
    pendingPayout: number,
    nextProcessingDate: string | null,
    paidThisMonth: number,
    totalPaidAllTime: number,
    sinceDate: string,
    currency: string
}

export type Bank = {
    name: string,
    code: string
}