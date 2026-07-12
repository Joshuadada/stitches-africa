"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAdminHeaderStore } from "@/store/admin-header"
import Button from "@/shared/components/button"
import Input from "@/shared/components/input"
import AddProductsModal from "./add-products-modal"
import ProductsGrid, { CatalogueProduct } from "./products-grid"
import CoverUpload from "./cover-upload"
import { adminCreateCollectionSchema, AdminCreateCollectionFormData } from "@/schema/admin/create-collection.schema"

const AdminCreateCollection = () => {
    const { setAdminHeader } = useAdminHeaderStore()

    useEffect(() => {
        setAdminHeader({
            title: "Create Collection",
            actions: [
                { label: "View Store", href: "/", variant: "outline" },
                { label: "+ New Product", href: "/admin/catalogue", variant: "filled" },
            ],
        })
    }, [])

    const [openAddProducts, setOpenAddProducts] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState<CatalogueProduct[]>([])

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm<AdminCreateCollectionFormData>({
        resolver: zodResolver(adminCreateCollectionSchema),
        mode: "onChange",
        defaultValues: {
            collectionName: "",
            description: "",
            bundlePrice: "",
            discountPercentage: "0",
            productIds: [],
            coverImage: null,
        },
    })

    // Auto-compute bundle price from selected products
    useEffect(() => {
        const total = selectedProducts.reduce((sum, p) => sum + p.price, 0)
        setValue("bundlePrice", total.toString(), { shouldValidate: true })
    }, [selectedProducts])

    const handleAddProducts = (items: CatalogueProduct[]) => {
        setSelectedProducts((prev) => {
            const existing = new Set(prev.map((p) => p.id))
            const merged = [...prev, ...items.filter((i) => !existing.has(i.id))]
            setValue("productIds", merged.map((p) => p.id), { shouldValidate: true })
            return merged
        })
    }

    const removeProduct = (id: string) => {
        setSelectedProducts((prev) => {
            const updated = prev.filter((p) => p.id !== id)
            setValue("productIds", updated.map((p) => p.id), { shouldValidate: true })
            return updated
        })
    }

    const handleCoverChange = (file: File | null) => {
        setValue("coverImage", file, { shouldValidate: true })
    }

    const onSubmit = (data: AdminCreateCollectionFormData) => {
        console.log("Create collection:", data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl bg-white p-6 sm:p-8 shadow-sm flex flex-col gap-8 sm:gap-10">
            <h2 className="text-base font-semibold text-[#262626]">Collection details</h2>

            <Input
                label="Collection name"
                name="collectionName"
                required
                register={register}
                error={errors.collectionName}
            />

            <div className="flex flex-col gap-2">
                <label className="text-[10px] sm:text-xs md:text-sm text-black">
                    Description <span className="text-[#DC2626]">*</span>
                </label>
                <textarea
                    {...register("description")}
                    rows={4}
                    className={`w-full rounded-md border px-4 py-3 text-sm outline-none resize-none transition ${errors.description ? "border-[#E24B4A] bg-[#FFF5F5]" : "border-[#E8E8E8] focus:border-[#262626]"
                        }`}
                />
                {errors.description && (
                    <p className="text-[#E24B4A] text-xs">{errors.description.message}</p>
                )}
            </div>

            <CoverUpload onChange={handleCoverChange} error={errors.coverImage?.message} />

            <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex items-center justify-between">
                    <label className="text-[10px] sm:text-xs md:text-sm text-black">
                        Products in this catalogue <span className="text-[#DC2626]">*</span>
                    </label>
                    <button
                        type="button"
                        onClick={() => setOpenAddProducts(true)}
                        className="shrink-0 bg-white border border-[#B5863C] px-4 py-2 rounded-lg text-[#B5894A] font-semibold text-sm cursor-pointer hover:bg-[#FAF7F2] transition"
                    >
                        + Add products
                    </button>
                </div>
                <p className="text-[#9A9182] text-[8px] md:text-[10px] lg:text-xs -mt-2">
                    Search and select from your published products.
                </p>

                {errors.productIds && (
                    <p className="text-[#E24B4A] text-xs">{errors.productIds.message}</p>
                )}

                <ProductsGrid
                    products={selectedProducts}
                    onRemove={removeProduct}
                    onAdd={() => setOpenAddProducts(true)}
                />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-10">
                <div className="w-full">
                    <Input
                        label="Bundle Price"
                        name="bundlePrice"
                        required
                        readonly
                        register={register}
                    />
                </div>
                <div className="w-full">
                    <Input
                        label="Discount Percentage"
                        name="discountPercentage"
                        register={register}
                        error={errors.discountPercentage}
                    />
                </div>
            </div>

            <Button
                type="submit"
                disabled={!isValid}
                className="bg-[#B5894A] hover:bg-[#a07840] p-4 rounded-xl text-white font-bold text-sm"
            >
                Publish collection
            </Button>

            <AddProductsModal
                open={openAddProducts}
                onClose={() => setOpenAddProducts(false)}
                onAdd={handleAddProducts}
            />
        </form>
    )
}

export default AdminCreateCollection
