"use client"

import BecomeVendorSection from './become-vendor-section'
import CuratedCollectionsSection from './curated-collections-section'
import FeatureVendorsSection from './feature-vendors-section'
import HeroSection from './hero-section'
import HowItWorksSection from './how-it-works-section'
import InfoSection from './info-section'
import TrendingProductsSection from './trending-products-section'

const Home = () => {
  return (
    <div>
      <div className='flex flex-col gap-10 sm:gap-12 md:gap-16 lg:gap-20'>
        <HeroSection />
        <InfoSection />
        <TrendingProductsSection />
        <FeatureVendorsSection />
        <CuratedCollectionsSection />
        <HowItWorksSection />
        <BecomeVendorSection />
        <div></div>
      </div>
    </div>
  )
}

export default Home