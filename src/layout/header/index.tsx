"use client"

import { useState } from "react"
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 font-sans">
      <div className="flex items-center gap-6 h-[68] px-8 sm:px-16 md:px-32 lg:px-44 mx-auto">

        {/* Logo */}
        <a href="/" className="flex items-baseline gap-0.5 text-black no-underline shrink-0">
          <span className="text-[22px] font-extrabold tracking-tight">SA</span>
          <span className="text-[22px] font-extrabold">•</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 shrink-0">
          <a href="/" className="text-sm font-medium text-black px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors">Home</a>
          <a href="/trending" className="text-sm font-medium text-black px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors">Trending</a>
          <a href="/collections" className="text-sm font-medium text-black px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors">Collections</a>
        </nav>

        {/* Search Bar */}
        <div className="hidden xl:flex flex-1 min-w-0 max-w-sm items-center border border-gray-200 rounded-full overflow-hidden bg-white focus-within:border-[#b8924a] transition-colors">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 border-none outline-none px-4 py-2 text-sm text-black placeholder-gray-400 bg-transparent"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            aria-label="Search"
          />
          <button
            className="flex items-center justify-center w-9 h-9 m-0.5 bg-[#b8924a] hover:bg-[#a07a38] rounded-full text-white shrink-0 transition-colors cursor-pointer"
            aria-label="Submit search"
          >
            <Search size={15} strokeWidth={2.5} />
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="hidden xl:flex items-center gap-2.5 shrink-0">
          <a
            onClick={() => router.replace('/vendor/register')}
            className="inline-flex items-center px-5 py-2.5 bg-[#b8924a] hover:bg-[#a07a38] text-white rounded-full text-sm font-semibold whitespace-nowrap transition-all hover:-translate-y-px cursor-pointer"
          >
            Become a Vendor
          </a>
          <a
            href="/login"
            className="inline-flex items-center px-6 py-2.5 bg-black hover:bg-gray-800 text-white rounded-full text-sm font-semibold whitespace-nowrap transition-all hover:-translate-y-px"
          >
            Login
          </a>
        </div>

        {/* Icon Actions */}
        <div className="hidden xl:flex items-center gap-1 shrink-0">
          <button className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" aria-label="Wishlist">
            <Heart size={20} strokeWidth={1.8} className="text-[#b8924a] fill-[#b8924a]" />
          </button>
          <button className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" aria-label="Cart">
            <ShoppingCart size={20} strokeWidth={1.8} className="text-black" />
          </button>
        </div>

        {/* Mobile: icons + hamburger */}
        <div className="flex xl:hidden items-center gap-1 ml-auto">
          <button className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" aria-label="Wishlist">
            <Heart size={20} strokeWidth={1.8} className="text-[#b8924a] fill-[#b8924a]" />
          </button>
          <button className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" aria-label="Cart">
            <ShoppingCart size={20} strokeWidth={1.8} className="text-black" />
          </button>
          <button
            className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} className="text-black" /> : <Menu size={22} className="text-black" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`xl:hidden flex flex-col gap-5 px-8 sm:px-16 md:px-32 lg:px-44 border-t border-gray-200 bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-[500] py-5 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        {/* Mobile Search */}
        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-white focus-within:border-[#b8924a] transition-colors">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 border-none outline-none px-4 py-2 text-sm text-black placeholder-gray-400 bg-transparent"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            aria-label="Search"
          />
          <button
            className="flex items-center justify-center w-9 h-9 m-0.5 bg-[#b8924a] hover:bg-[#a07a38] rounded-full text-white shrink-0 transition-colors cursor-pointer"
            aria-label="Submit search"
          >
            <Search size={15} strokeWidth={2.5} />
          </button>
        </div>

        {/* Mobile Nav */}
        <nav className="flex flex-col gap-1">
          <a href="/" className="text-base font-medium text-black px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="/trending" className="text-base font-medium text-black px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>Trending</a>
          <a href="/collections" className="text-base font-medium text-black px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>Collections</a>
        </nav>

        {/* Mobile CTAs */}
        <div className="flex flex-col gap-2.5 pb-1">
          <a onClick={() => router.replace('/vendor/register')} className="flex justify-center px-5 py-3 bg-[#b8924a] hover:bg-[#a07a38] text-white rounded-full text-sm font-semibold transition-colors">
            Become a Vendor
          </a>
          <a href="/login" className="flex justify-center px-5 py-3 bg-black hover:bg-gray-800 text-white rounded-full text-sm font-semibold transition-colors">
            Login
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header