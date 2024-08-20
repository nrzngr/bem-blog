import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center'>
      <Image src={assets.logo} alt='' width={120} />
      <p className='text-sm text-white'>All right reserved. Copyright @nrzngr.['Dept Kominfo BEM UBSI Karawang']</p>
        <div className='flex'>
            <Link href="https://www.tiktok.com/@bemubsi_kab.karawang?lang=en"><Image src={assets.tiktok_icon} alt='' width={40} /></Link>
            <Link href="https://www.instagram.com/bem_ubsikarawang/"><Image src={assets.instagram} alt='' width={40} /></Link>
        </div>
    </div>
  )
}

export default Footer
