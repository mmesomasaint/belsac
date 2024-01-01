'use client'

import React, { useState } from 'react'

interface ProductImage {
  url: string
  altText: string
}

const ProductSlider: React.FC<{ images: ProductImage[] }> = ({ images }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index)
  }

  return (
    <div className='container mx-auto flex max-h-[35rem]'>
      <div className='max-h-full overflow-hidden'>
        <div className='flex flex-col w-full h-full gap-4 overflow-y-auto'>
          {images.map((image, index) => (
            <button
              key={index}
              type='button'
              className={`shrink-0 relative w-full h-1/5 mr-4 overflow-hidden cursor-pointer border-2 hover:border-black/40 ${
                activeImageIndex === index
                  ? 'border-black'
                  : 'border-transparent'
              }`}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.url}
                alt={image.altText}
                className='w-full h-32 object-cover'
              />
            </button>
          ))}
        </div>
      </div>
      <div className='relative grow'>
        <img
          src={images[activeImageIndex].url}
          alt={images[activeImageIndex].altText}
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  )
}

export default ProductSlider
