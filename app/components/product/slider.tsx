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
    <div className='container mx-auto'>
      <div className='relative'>
        <img
          src={images[activeImageIndex].url}
          alt={images[activeImageIndex].altText}
          className='w-full h-96 object-cover'
        />
      </div>
      <div className='mt-4'>
        <div className='flex gap-4 overflow-x-auto'>
          {images.map((image, index) => (
            <button
              key={index}
              type='button'
              className={`relative w-1/5 mx-1 overflow-hidden cursor-pointer ${
                activeImageIndex === index ? 'border-2 border-black' : ''
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
    </div>
  )
}

export default ProductSlider
