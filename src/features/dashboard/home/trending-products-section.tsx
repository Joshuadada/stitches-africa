import ProductCard from './components/product-card'
import SideProduct from './components/side-product'
import Button from '@/shared/components/button'
import Image from 'next/image'

const products = [
    {
        imgSrc: "/svgs/dummy/product-image-1.svg",
        title: "Nma Bespoke Co-ord Set",
        amount: "N56,000",
        tier: "Gold tier",
        rating: 4,
        numberOfRatings: 25
    },
    {
        imgSrc: "/svgs/dummy/product-image-2.svg",
        title: "Oge Wrap Dress",
        amount: "N56,000",
        tier: "Silver tier",
        rating: 4,
        numberOfRatings: 25
    },
    {
        imgSrc: "/svgs/dummy/product-image-3.svg",
        title: "Ìmọ́lẹ̀ Linen Shirt",
        amount: "N56,000",
        tier: "Gold tier",
        rating: 4,
        numberOfRatings: 25
    },
    {
        imgSrc: "/svgs/dummy/product-image-4.svg",
        title: "Tafo  Trousers",
        amount: "N56,000",
        tier: "Gold tier",
        rating: 4,
        numberOfRatings: 25
    },
    {
        imgSrc: "/svgs/dummy/product-image-5.svg",
        title: "Zaki Agbada Pants",
        amount: "N56,000",
        tier: "Gold tier",
        rating: 4,
        numberOfRatings: 25
    },
    {
        imgSrc: "/svgs/dummy/product-image-6.svg",
        title: "Ria Bespoke Pants",
        amount: "N56,000",
        tier: "Gold tier",
        rating: 4,
        numberOfRatings: 25
    }
]

const TrendingProductsSection = () => {
    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-13 flex flex-col gap-10 sm:gap-14 md:gap-18 lg:gap-22">
            <h3 className='font-garamond text-center text-black font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl'>Trending Products</h3>
            <div className='flex flex-col md:flex-row gap-11 sm:gap-13 md:gap-15 lg:gap-x-18 xl:gap-x-22 gap-y-3 sm:gap-y-4 md:gap-y-5 lg:gap-y-6'>
                <div className='md:w-[33%]'>
                    <SideProduct />
                </div>
                <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-11 md:gap-13 lg:gap-x-15 gap-y-3 sm:gap-y-4 md:gap-y-5 lg:gap-y-6'>
                    {
                        products.map((product, index) => (
                            <ProductCard
                                key={product.title + index}
                                imgSrc={product.imgSrc}
                                title={product.title}
                                amount={product.amount}
                                tier={product.tier}
                                rating={product.rating}
                                numberOfRatings={product.numberOfRatings}
                            />
                        ))
                    }

                </div>
            </div>
            <div className='flex justify-center'>
                <Button onClick={() => { }} type='submit' className='bg-transparent py-1.5 px-3.5 max-w-[138] w-full border border-[#A3A3A3] rounded-md flex items-center gap-2'>
                    <p className='text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-[#262626]'>Browse more</p>
                    <Image src={'/svgs/arrow-right.svg'} alt='arrow' height={16} width={16}></Image>
                </Button>
            </div>
        </div>
    )
}

export default TrendingProductsSection