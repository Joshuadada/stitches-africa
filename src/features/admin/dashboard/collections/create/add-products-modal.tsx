"use client"

import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { adminAddProductsSelectionSchema, AdminAddProductsSelectionFormData } from "@/schema/admin/add-products-selection.schema"
import { CatalogueProduct } from "./products-grid"

const CATALOGUE_PRODUCTS: CatalogueProduct[] = [
    { id: "1", name: "Ankara Tailored Trouser", price: 38000, vendor: "Fabric Couture", imageUrl: "/svgs/dummy/product-image-1.svg" },
    { id: "2", name: "Ìmọ́lẹ̀ Linen Shirt", price: 56000, vendor: "Kente Kings", imageUrl: "/svgs/dummy/product-image-2.svg" },
    { id: "3", name: "Adire Kaftan — Indigo", price: 45000, vendor: "Kente Kings", imageUrl: "/svgs/dummy/product-image-3.svg" },
    { id: "4", name: "Embroidered Agbada Set", price: 92000, vendor: "Royal Threads", imageUrl: "/svgs/dummy/product-image-4.svg" },
    { id: "5", name: "Nma Bespoke Co-ord Set", price: 56000, vendor: "Fabric Couture", imageUrl: "/svgs/dummy/product-image-5.svg" },
    { id: "6", name: "Oge Wrap Dress", price: 55000, vendor: "Royal Threads", imageUrl: "/svgs/dummy/product-image-6.svg" },
]

const AddProductsModal = ({
    open,
    onClose,
    onAdd,
}: {
    open: boolean
    onClose: () => void
    onAdd: (items: CatalogueProduct[]) => void
}) => {
    const [query, setQuery] = useState("")

    const {
        watch,
        setValue,
        handleSubmit,
        reset,
        formState: { isValid },
    } = useForm<AdminAddProductsSelectionFormData>({
        resolver: zodResolver(adminAddProductsSelectionSchema),
        mode: "onChange",
        defaultValues: { selectedIds: [] },
    })

    const selectedIds = watch("selectedIds")

    useEffect(() => {
        if (!open) reset({ selectedIds: [] })
    }, [open])

    const filtered = useMemo(
        () => CATALOGUE_PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
        [query]
    )

    const toggle = (id: string) => {
        const next = selectedIds.includes(id) ? selectedIds.filter((x) => x !== id) : [...selectedIds, id]
        setValue("selectedIds", next, { shouldValidate: true })
    }

    const onSubmit = (data: AdminAddProductsSelectionFormData) => {
        const items = CATALOGUE_PRODUCTS.filter((p) => data.selectedIds.includes(p.id))
        onAdd(items)
        onClose()
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
            <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-[#262626]">Add products</h3>
                    <button onClick={onClose} className="text-[#6A5D4D] cursor-pointer">✕</button>
                </div>

                <div className="mb-4">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search the catalogue"
                        className="w-full rounded-md border border-[#E3DDD0] px-3 py-2 outline-none text-sm"
                    />
                </div>

                <div className="max-h-72 overflow-y-auto">
                    {filtered.map((p) => (
                        <div key={p.id} className="flex items-center gap-3.5 py-3.5 border-b border-[#E3DDD0]">
                            <input type="checkbox" checked={selectedIds.includes(p.id)} onChange={() => toggle(p.id)} className="w-4 h-4" />

                            <div className="h-10 w-10 bg-[#F3EFEA] rounded-md overflow-hidden shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" />
                            </div>

                            <div className="flex-1">
                                <div className="text-sm font-medium text-[#262626]">{p.name}</div>
                                <div className="text-xs text-[#6A5D4D]">{p.vendor}</div>
                            </div>

                            <div className="text-sm font-medium text-[#262626]">₦{p.price.toLocaleString()}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <button onClick={onClose} className="text-sm text-[#6A5D4D] cursor-pointer">Cancel</button>
                    <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={!isValid}
                        className="bg-[#B5894A] hover:bg-[#a07840] disabled:opacity-50 rounded-md px-4 py-2 text-white text-sm font-medium transition cursor-pointer"
                    >
                        Add {selectedIds.length} products
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddProductsModal
