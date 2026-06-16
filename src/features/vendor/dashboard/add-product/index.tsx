"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/shared/components/button";
import Input from "@/shared/components/input";
import { AddProductFormData, addProductSchema } from "@/schema/vendor/product.schema";
import CategorySelector from "./category-selector";
import PriceSummary from "./prices-summary";
import ProductImages from "./product-images";
import SizesAndStock from "./sizes-and-stock";
import { useVendorHeaderStore } from "@/store/vendor-header";
import { useSubmitAddProduct } from "@/hooks/api/vendor/useVendorProducts";
import { VendorProduct } from "@/types/vendor";



const CATEGORIES = ["Ready to wear", "Made to Order", "Bespoke"];
const SIZES = ["S", "M", "L", "XL"];

const createSizeDefaults = (sizes: string[], value: boolean | number) =>
    Object.fromEntries(sizes.map((s) => [s, value]));

const AddProduct = () => {
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
    const { setVendorHeader } = useVendorHeaderStore();

    useEffect(() => {
        setVendorHeader({
            title: "Add New Product"
          })
    }, [])

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
        reset
    } = useForm<AddProductFormData>({
        resolver: zodResolver(addProductSchema),
        mode: "onChange",
        defaultValues: {
            category: CATEGORIES[0],
            productTitle: "",
            productCode: "",
            description: "",
            basePrice: "",
            images: [],
            sizes: [],
        },
    });

    const basePrice = watch("basePrice");

    const numericBasePrice = useMemo(
        () => Number(basePrice?.replace(/,/g, "")) || 0,
        [basePrice]
    );


    const { onSubmit: submitProduct, isPending } = useSubmitAddProduct(reset);

    // Sync sizes + stock into form state
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

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const updated = [...images, ...files];
        setImages(updated);
        setValue("images", updated, { shouldValidate: true });
    };

    const onSubmit = (data: AddProductFormData) => {
        const payload: VendorProduct = {
            name: data.productTitle,
            summary: data.description.slice(0, 120),
            description: data.description,
            brandId: "default", // replace if you have it
            typeId: data.category,
            price: Number(data.basePrice.replace(/,/g, "")),
            vendorId: "", // optional if hook overrides
            vendorName: "", // replace from auth/store if needed
            vendorBadgeTier: "",
            listingType: data.category,
            isAiTryOnEnabled: false,
            lowStockThreshold: 5,
    
            variant: Object.entries(stock)
                .filter(([size]) => selectedSizes[size])
                .map(([size, quantity]) => ({
                    size,
                    stockQuality: quantity,
                    color: "default",
                    additionalPrice: 0,
                })),
    
            imageFile: images[0] || ({} as File),
            images,
        };
    
        submitProduct(payload);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl md:rounded-2xl lg:rounded-[20px] bg-white p-6 sm:p-10 md:p-16 lg:p-22 py-4 sm:py-5 md:py-6 lg:py-7 shadow-sm"
        >
            <CategorySelector
                categories={CATEGORIES}
                selected={selectedCategory}
                onChange={handleCategoryChange}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left column */}
                <div className="lg:col-span-7 flex flex-col gap-7">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <Input
                            label="Product title"
                            name="productTitle"
                            type="text"
                            required
                            register={register}
                            error={errors.productTitle}
                        />
                        <Input
                            label="Product code"
                            name="productCode"
                            type="text"
                            required
                            register={register}
                            error={errors.productCode}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs sm:text-sm text-[#171717] mb-2">
                            Description <span className="text-[#DC2626]">*</span>
                        </label>
                        <textarea
                            {...register("description")}
                            rows={5}
                            className="
                                w-full rounded-xl border border-[#E8E8E8]
                                px-4 py-3 text-sm outline-none resize-none
                                focus:border-[#B5894A] transition
                            "
                        />
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <ProductImages
                        images={images}
                        onUpload={handleImageUpload}
                        error={errors.images}
                    />

                    <Input
                        label="Your Base Price (NGN)"
                        name="basePrice"
                        type="text"
                        required
                        register={register}
                        error={errors.basePrice}
                    />
                </div>

                {/* Right column */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <SizesAndStock
                        sizes={SIZES}
                        selectedSizes={selectedSizes}
                        stock={stock}
                        onToggleSize={handleToggleSize}
                        onUpdateStock={handleUpdateStock}
                        error={errors.sizes}
                    />

                    <PriceSummary basePrice={numericBasePrice} />
                </div>
            </div>

            <div className="mt-12">
                <Button
                    type="submit"
                    disabled={!isValid || isSubmitting || isPending}
                    loading={isSubmitting || isPending}
                    className="bg-[#B5894A] hover:bg-[#9F763D] p-4 w-full rounded-xl"
                >
                    <p className="text-white font-semibold text-sm">
                        Publish Product
                    </p>
                </Button>
            </div>
        </form>
    );
};

export default AddProduct;