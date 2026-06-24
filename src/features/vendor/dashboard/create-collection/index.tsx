"use client"

import { useEffect } from "react"
import { useVendorHeaderStore } from "@/store/vendor-header"
import { CreateCollectionFormData, createCollectionSchema } from "@/schema/vendor/collection.schema"
import Button from "@/shared/components/button"
import Input from "@/shared/components/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import AddProductsModal from "./add-products-modal"
import CoverUpload from "./cover-upload"
import ProductsGrid from "./products-grid"
import { Product } from "../../../../types/vendor"
import { useSubmitAddCollection } from "@/hooks/api/vendor/useVendorCollections"

const CreateCollection = () => {
  const { setVendorHeader } = useVendorHeaderStore()

  useEffect(() => {
    setVendorHeader({ title: "Create Collection" })
  }, [])

  const [openAddProducts, setOpenAddProducts] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateCollectionFormData>({
    resolver: zodResolver(createCollectionSchema),
    mode: "onChange",
    defaultValues: {
      collectionName: "",
      description: "",
      bundlePrice: "",
      discountPercentage: "",
      productIds: [],
    },
  })

  const { onSubmit, isPending } = useSubmitAddCollection(reset)

  // Sync selected products into RHF so Zod validation sees them
  const handleAddProducts = (items: Product[]) => {
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

  // Sync cover file into RHF
  const handleCoverChange = (file: File | null) => {
    setValue("coverImage", file ?? undefined, { shouldValidate: true })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl bg-white p-6 pb-20 shadow-sm">
      <h2 className="text-base font-semibold mb-4">Collection details</h2>

      <div className="grid gap-12 sm:gap-14 md:gap-16 lg:gap-18">
        <Input
          label="Collection name"
          name="collectionName"
          required
          register={register}
          error={errors.collectionName as any}
        />

        <div>
          <label className="block text-[10px] sm:text-xs md:text-sm text-black mb-2">
            Description <span className="text-[#DC2626]">*</span>
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full rounded-xl border border-[#E8E8E8] px-4 py-3 text-sm outline-none resize-none"
          />
          {errors.description && (
            <p className="text-[#E24B4A] text-xs mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* CoverUpload now calls handleCoverChange instead of setCover */}
        <CoverUpload onChange={handleCoverChange} />

        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          <div className="flex flex-col gap-1 md:gap-1.5 lg:gap-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] sm:text-xs md:text-sm text-black">
                Products in this catalogue <span className="text-[#DC2626]">*</span>
              </label>
              <div>
                <Button
                  type="button"
                  onClick={() => setOpenAddProducts(true)}
                  className="bg-white border border-[#B5863C] px-4 py-2 rounded-lg"
                >
                  <p className="text-[#B5894A] font-semibold text-sm">+ Add products</p>
                </Button>
              </div>
            </div>
            <p className="text-[#9A9182] text-[8px] md:text-[10px] lg:text-xs">
              The banner shown at the top of the collection page
            </p>
          </div>

          {errors.productIds && (
            <p className="text-[#E24B4A] text-xs">{errors.productIds.message}</p>
          )}

          <ProductsGrid
            products={selectedProducts}
            onRemove={removeProduct}
            onAdd={() => setOpenAddProducts(true)}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 sm:gap-14 md:gap-16 lg:gap-18">
          <div className="w-full">
            <Input
              label="Bundle Price"
              name="bundlePrice"
              required
              register={register}
              error={errors.bundlePrice as any}
            />
          </div>
          <div className="w-full">
            <Input
              label="Discount Percentage"
              name="discountPercentage"
              required
              register={register}
              error={errors.discountPercentage as any}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="bg-[#B5894A] p-4 rounded-xl text-white font-bold text-sm"
          disabled={isPending}
          loading={isPending}
        >
          Publish collection
        </Button>
      </div>

      <AddProductsModal
        open={openAddProducts}
        onClose={() => setOpenAddProducts(false)}
        onAdd={handleAddProducts}
      />
    </form>
  )
}

export default CreateCollection