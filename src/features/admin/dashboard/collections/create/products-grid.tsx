"use client"

export type CatalogueProduct = {
    id: string
    name: string
    price: number
    vendor: string
    imageUrl?: string
}

const ProductsGrid = ({
    products,
    onRemove,
    onAdd,
}: {
    products: CatalogueProduct[]
    onRemove: (id: string) => void
    onAdd: () => void
}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {products.map((p) => (
                <div key={p.id} className="rounded-md border border-[#E7DFD0] bg-white relative flex flex-col min-h-64">
                    <button
                        type="button"
                        onClick={() => onRemove(p.id)}
                        className="absolute right-2 top-2 bg-black/70 hover:bg-black text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer transition"
                    >
                        ✕
                    </button>
                    <div className="flex-1 w-full bg-[#ECE6DA] overflow-hidden rounded-t-md">
                        {p.imageUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" />
                        )}
                    </div>
                    <div className="p-2 sm:p-2.5 lg:p-3">
                        <div className="text-sm font-medium text-[#262626]">{p.name}</div>
                        <div className="text-xs text-[#6A5D4D]">₦{p.price.toLocaleString()}</div>
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={onAdd}
                className="rounded-md border-dashed border border-[#B5863C] p-3 flex items-center justify-center min-h-64 cursor-pointer hover:bg-[#FAF7F2] transition"
            >
                <span className="text-[#B5894A] text-sm">+ Add product</span>
            </button>
        </div>
    )
}

export default ProductsGrid
