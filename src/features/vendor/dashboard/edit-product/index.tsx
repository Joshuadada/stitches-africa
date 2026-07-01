"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/shared/components/button";
import Input from "@/shared/components/input";
import Select from "@/shared/components/select";
import { AddProductFormData, addProductSchema } from "@/schema/vendor/product.schema";
import { useVendorHeaderStore } from "@/store/vendor-header";
import { VendorProduct } from "@/types/vendor";
import CategorySelector from "../add-product/category-selector";
import PriceSummary from "../add-product/prices-summary";
import ProductImages from "../add-product/product-images";
import SizesAndStock from "../add-product/sizes-and-stock";
import { useParams } from "next/navigation";
import { useVendorProductById, useUpdateProduct, useGetBrands, useGetProductTypes } from "@/hooks/api/vendor/useVendorProducts";
import Loader from "@/shared/components/loader";
import { showToast } from "@/utils/toast";

const CATEGORIES = ["Ready to Wear", "Made to Order", "Bespoke"];

const LISTING_TYPE_TO_DISPLAY: Record<string, string> = {
    ReadyToWear: "Ready to Wear",
    MadeToOrder: "Made to Order",
    Bespoke: "Bespoke",
};

const DISPLAY_TO_LISTING_TYPE: Record<string, string> = {
    "Ready to Wear": "ReadyToWear",
    "Made to Order": "MadeToOrder",
    Bespoke: "Bespoke",
};

const SIZES = ["S", "M", "L", "XL"];

const createSizeDefaults = (sizes: string[], value: boolean | number) =>
    Object.fromEntries(sizes.map((s) => [s, value]));

const EditProduct = () => {
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
    const { setVendorHeader } = useVendorHeaderStore();
    const { id } = useParams<{ id: string }>();

    const { data: product, isLoading: isProductLoading, error: productError } = useVendorProductById(id);

    const {
        data: brands,
        isLoading: isBrandLoading,
        error: brandError,
    } = useGetBrands();

    const {
        data: productTypes,
        isLoading: isTypeLoading,
        error: typeError,
    } = useGetProductTypes();

    useEffect(() => {
        if (brandError) {
            showToast({
                type: "error",
                title: "Error",
                message: brandError.message,
            });
        }

        if (typeError) {
            showToast({
                type: "error",
                title: "Error",
                message: typeError.message,
            });
        }

        if (productError) {
            showToast({
                type: "error",
                title: "Error",
                message: productError.message,
            });
        }
    }, [brandError, typeError, productError]);

    useEffect(() => {
        setVendorHeader({ title: "Edit Product" });
    }, []);

    const [selectedSizes, setSelectedSizes] = useState<Record<string, boolean>>(
        createSizeDefaults(SIZES, false) as Record<string, boolean>
    );

    const [stock, setStock] = useState<Record<string, number>>(
        createSizeDefaults(SIZES, 0) as Record<string, number>
    );

    const [images, setImages] = useState<File[]>([]);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid, isSubmitting },
        reset,
    } = useForm<AddProductFormData>({
        resolver: zodResolver(addProductSchema),
        mode: "onChange",
        defaultValues: {
            category: CATEGORIES[0],
            productTitle: "",
            // productCode: "",
            brandId: "",
            productType: "",
            summary: "",
            description: "",
            enableAiTryOn: false,
            basePrice: "",
            images: [],
            sizes: [],
        },
    });

    // Hydrate form once product data arrives
    useEffect(() => {
        if (!product) return;

        const displayCategory =
            LISTING_TYPE_TO_DISPLAY[product.listingType] ?? CATEGORIES[0];

        setSelectedCategory(displayCategory);

        reset({
            category: displayCategory,
            productTitle: product.name ?? "",
            // productCode: product.productCode ?? "",
            brandId: product.brand?.id ?? "",
            productType: product.type?.id ?? "",
            summary: product.summary ?? "",
            description: product.description ?? "",
            enableAiTryOn: product.isAiTryOnEnabled ?? false,
            basePrice: product.price?.toString() ?? "",
            images: [],
            sizes: (product.variants ?? []).map((v: any) => ({
                size: v.size,
                quantity: v.stockQuantity,
            })),
        });

        // const uploadedImages = [product.imageFile, ...product.images]
        const uploadedImages = [...product.images]

        setImages(uploadedImages)

        // Rebuild size/stock local state from variants
        if (product.variants?.length) {
            const newSelectedSizes = createSizeDefaults(SIZES, false) as Record<string, boolean>;
            const newStock = createSizeDefaults(SIZES, 0) as Record<string, number>;

            product.variants.forEach((v: any) => {
                if (SIZES.includes(v.size)) {
                    newSelectedSizes[v.size] = true;
                    newStock[v.size] = v.stockQuantity ?? 0;
                }
            });

            setSelectedSizes(newSelectedSizes);
            setStock(newStock);
        }
    }, [product]);

    const basePrice = watch("basePrice");
    const enableAiTryOn = watch("enableAiTryOn");

    const numericBasePrice = useMemo(
        () => Number(basePrice?.replace(/,/g, "")) || 0,
        [basePrice]
    );

    const { onSubmit: updateProduct, isPending } = useUpdateProduct(id);

    const syncSizesToForm = (
        stockState: Record<string, number>,
        sizeState: Record<string, boolean>
    ) => {
        const formattedSizes = Object.entries(sizeState)
            .filter(([_, checked]) => checked)
            .map(([size]) => ({ size, quantity: stockState[size] }));
        setValue("sizes", formattedSizes, { shouldValidate: true });
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setValue("category", category, { shouldValidate: true });
    };

    const handleToggleSize = (size: string) => {
        setSelectedSizes((prev) => {
            const updated = { ...prev, [size]: !prev[size] };
            syncSizesToForm(stock, updated);
            return updated;
        });
    };

    const handleUpdateStock = (size: string, type: "increment" | "decrement") => {
        setStock((prev) => {
            const updated = {
                ...prev,
                [size]:
                    type === "increment"
                        ? prev[size] + 1
                        : Math.max(0, prev[size] - 1),
            };
            syncSizesToForm(updated, selectedSizes);
            return updated;
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const updated = [...images];
        updated[index] = file;
        setImages(updated);
        setValue("images", updated, { shouldValidate: true });
    };

    const handleImageRemove = (index: number) => {
        const updated = images.filter((_, i) => i !== index);
        setImages(updated);
        setValue("images", updated, { shouldValidate: true });
    };

    const onSubmit = (data: AddProductFormData) => {
        const payload: VendorProduct = {
            name: data.productTitle,
            summary: data.summary,
            description: data.description,
            brandId: data.brandId,
            typeId: data.productType,
            price: Number(data.basePrice.replace(/,/g, "")),
            vendorId: "", // optional if hook overrides
            vendorName: "", // replace from auth/store if needed
            vendorBadgeTier: "",
            listingType: DISPLAY_TO_LISTING_TYPE[data.category] ?? data.category,
            isAiTryOnEnabled: data.enableAiTryOn,
            lowStockThreshold: product?.lowStockThreshold ?? 5,

            variant: Object.entries(stock)
                .filter(([size]) => selectedSizes[size])
                .map(([size, quantity]) => ({
                    size,
                    stockQuantity: quantity,
                    color: product?.variants?.find((v: any) => v.size === size)?.color ?? "default",
                    additionalPrice: 0,
                })),

            imageFile: images[0] || ({} as File),
            images,
        };

        updateProduct(payload); // ← now calls onSubmit inside the hook
    };

    if (isProductLoading || isBrandLoading || isTypeLoading) {
        return <Loader />;
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl md:rounded-2xl lg:rounded-[20px] bg-white p-6 sm:p-10 md:p-16 lg:p-22 py-4 sm:py-5 md:py-6 lg:py-7 shadow-sm"
        >
            {/* <div className="mb-8 md:mb-12 lg:mb-16 xl:mb-20">
                <CategorySelector
                    categories={CATEGORIES}
                    selected={selectedCategory}
                    onChange={handleCategoryChange}
                />
            </div> */}

            <div className="flex flex-col gap-7 mb-18 sm:mb-22 md:mb-26 lg:mb-30 xl:mb-34">
                <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                        label="Product title"
                        name="productTitle"
                        type="text"
                        required
                        register={register}
                        error={errors.productTitle}
                    />
                    {/* <Input
                        label="Product code"
                        name="productCode"
                        type="text"
                        required
                        register={register}
                        error={errors.productCode}
                    /> */}
                    <Input
                        label="Short Summary"
                        name="summary"
                        type="text"
                        required
                        register={register}
                        error={errors.summary}
                    />
                </div>

                {/* <div>
                    <Input
                        label="Short Summary"
                        name="summary"
                        type="text"
                        required
                        register={register}
                        error={errors.summary}
                    />
                </div> */}

                <div className="grid sm:grid-cols-2 gap-6">
                    <Select
                        label="Select Brand"
                        name="brandId"
                        options={brands?.map((brand) => ({ value: brand.id, label: brand.name })) ?? []}
                        required
                        register={register}
                        error={errors.brandId}
                        placeholder="Select Brand"
                    />
                    <Select
                        label="Product Type"
                        name="productType"
                        options={productTypes?.map((productType) => ({ value: productType.id, label: productType.name })) ?? []}
                        required
                        register={register}
                        error={errors.productType}
                        placeholder="Select Type"
                    />
                </div>

                <div>
                    <label className="block text-xs sm:text-sm text-[#171717] mb-2">
                        Description <span className="text-[#DC2626]">*</span>
                    </label>
                    <textarea
                        {...register("description")}
                        rows={5}
                        className="w-full rounded-xl border border-[#E8E8E8] px-4 py-3 text-sm outline-none resize-none focus:border-[#B5894A] transition"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.description.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md-18 md:mb-18 lg:mb-22 xl:mb-26">
                <div className="lg:col-span-7 flex flex-col gap-12">
                    <ProductImages
                        images={images}
                        onUpload={handleImageUpload}
                        onRemove={handleImageRemove}
                        error={errors.images}
                    />

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-sm font-medium text-black">
                                Enable AI-Try On for this product
                            </p>
                            <button
                                type="button"
                                onClick={() =>
                                    setValue("enableAiTryOn", !enableAiTryOn, {
                                        shouldValidate: true,
                                    })
                                }
                                className={`h-9 w-16 rounded-full transition ${enableAiTryOn
                                    ? "bg-[#B5894A] justify-end"
                                    : "bg-[#D9D9D9] justify-start"
                                    } inline-flex p-1`}
                            >
                                <span className="h-7 w-7 rounded-full bg-white shadow-sm" />
                            </button>
                        </div>
                    </div>

                    <Input
                        label="Your Base Price (NGN)"
                        name="basePrice"
                        type="text"
                        required
                        register={register}
                        error={errors.basePrice}
                    />
                </div>

                <div className="lg:col-span-5 flex flex-col gap-6">
                    <SizesAndStock
                        sizes={SIZES}
                        selectedSizes={selectedSizes}
                        stock={stock}
                        onToggleSize={handleToggleSize}
                        onUpdateStock={handleUpdateStock}
                        error={errors.sizes}
                    />
                </div>
            </div>

            <div className="mb-8 md:mb-12 lg:mb-16 xl:mb-19">
                <PriceSummary basePrice={numericBasePrice} />
            </div>

            <div>
                <Button
                    type="submit"
                    disabled={!isValid || isSubmitting || isPending}
                    loading={isSubmitting || isPending}
                    className="bg-[#B5894A] hover:bg-[#9F763D] p-4 w-full rounded-xl"
                >
                    <p className="text-white font-semibold text-sm">
                        Update Product
                    </p>
                </Button>
            </div>
        </form>
    );
};

export default EditProduct;