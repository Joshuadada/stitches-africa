"use client"

import HeroSection from './hero-section'
import InfoSection from './info-section'

const Home = () => {
  return (
    <div>
      <div className='flex flex-col gap-10 sm:gap-12 md:gap-16 lg:gap-20'>
        <HeroSection />
        <InfoSection />
      </div>
    </div>
  )
}

export default Home