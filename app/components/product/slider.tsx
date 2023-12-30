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
    <div className='container mx-auto px-4'>
      <div className='relative'>
        <img
          src={images[activeImageIndex].url}
          alt={images[activeImageIndex].altText}
          className='w-full h-40 object-cover'
        />
      </div>
      <div className='mt-4'>
        <div className='flex overflow-x-auto'>
          {images.map((image, index) => (
            <button
              key={index}
              type='button'
              className={`relative w-1/5 mx-1 border border-gray-300 overflow-hidden cursor-pointer ${
                activeImageIndex === index ? 'ring-2 ring-black' : ''
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
