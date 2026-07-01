"use client"

import React from "react"
import { Product } from "../../../../types/vendor"

const ProductsGrid = ({ products, onRemove, onAdd }: { products: Product[]; onRemove: (id: string) => void; onAdd: () => void }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {products.map((p) => (
        <div key={p.id} className="rounded-md border border-[#E7DFD0] bg-white relative flex flex-col min-h-64">
          <button type="button" onClick={() => onRemove(p.id)} className="absolute right-2 top-2 bg-white rounded-full w-6 h-6 flex items-center justify-center">✕</button>
          <div className="flex-1 w-full bg-[#ECE6DA] mb-2 overflow-hidden">
            {p.imageFile ? (
              <img src={p.imageFile} alt={p.name} className="h-full w-full object-cover" />
            ) : null}
          </div>
          <div className="p-1.5 sm:p-2 md:p-2.5 lg:p-3">
            <div className="text-sm font-medium">{p.name}</div>
            <div className="text-xs text-[#6A5D4D]">₦{p.price.toLocaleString()}</div>
          </div>
        </div>
      ))}

      <div className="rounded-md border-dashed border border-[#B5863C] p-3 flex items-center justify-center min-h-64">
        <button type="button" onClick={onAdd} className="text-[#B5894A]">+ Add product</button>
      </div>
    </div>
  )
}

export default ProductsGrid
