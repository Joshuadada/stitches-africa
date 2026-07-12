"use client"

import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@/shared/components/button"
import { useVendorProducts } from "@/hooks/api/vendor/useVendorProducts"
import { Product } from "@/types/vendor"
import { addProductsSelectionSchema, AddProductsSelectionFormData } from "@/schema/vendor/add-products-selection.schema"

const AddProductsModal = ({
  open,
  onClose,
  onAdd,
}: {
  open: boolean
  onClose: () => void
  onAdd: (items: Product[]) => void
}) => {
  const [query, setQuery] = useState("")
  const { data: products = [], isLoading } = useVendorProducts()

  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<AddProductsSelectionFormData>({
    resolver: zodResolver(addProductsSelectionSchema),
    mode: "onChange",
    defaultValues: { selectedIds: [] },
  })

  const selectedIds = watch("selectedIds")

  useEffect(() => {
    if (!open) reset({ selectedIds: [] })
  }, [open])

  const filtered = useMemo(() => products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())), [query, products])

  const toggle = (id: string) => {
    const next = selectedIds.includes(id) ? selectedIds.filter((x) => x !== id) : [...selectedIds, id]
    setValue("selectedIds", next, { shouldValidate: true })
  }

  const onSubmit = (data: AddProductsSelectionFormData) => {
    const items = products.filter((p) => data.selectedIds.includes(p.id))
    onAdd(items)
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Add products</h3>
          <button onClick={onClose} className="text-[#6A5D4D]">✕</button>
        </div>

        <div className="mb-4">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your products" className="w-full rounded-md border border-[#E3DDD0] px-3 py-2 outline-none" />
        </div>

        <div className="max-h-64 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-[#6A5D4D]">Loading products…</div>
          ) : (
            filtered.map((p) => (
              <div key={p.id} className="flex items-center gap-3.5 py-3.5 border-b border-[#E3DDD0]">
                <input type="checkbox" checked={selectedIds.includes(p.id)} onChange={() => toggle(p.id)} className="w-4 h-4" />

                <div className="h-10 w-10 bg-[#F3EFEA] rounded-md overflow-hidden shrink-0">
                  {p.imageFile ? (
                    <img src={p.imageFile} alt={p.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-xs text-[#C7B99B]">Img</span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-xs text-[#6A5D4D]">
                    {typeof p.type === "object" ? p.type.name : p.type || "Ready-to-wear"}
                  </div>
                </div>

                <div className="text-sm font-medium">
                  {typeof p.price === "number" ? `₦${p.price.toLocaleString()}` : p.price || "—"}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button onClick={onClose} className="text-sm text-[#6A5D4D]">Cancel</button>
          <div>
            <Button onClick={handleSubmit(onSubmit)} disabled={!isValid} className="bg-[#B5894A] px-4 py-2 text-white">
              <span className="text-sm">Add {selectedIds.length} products</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProductsModal
