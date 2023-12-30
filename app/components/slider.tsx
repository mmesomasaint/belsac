import React, { useState } from 'react'

interface ProductImage {
  src: string
  alt: string
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
          src={images[activeImageIndex].src}
          alt={images[activeImageIndex].alt}
          className='w-full h-40 object-cover rounded-lg'
        />
      </div>
      <div className='mt-4'>
        <div className='flex overflow-x-auto'>
          {images.map((image, index) => (
            <button
              key={index}
              type='button'
              className={`relative w-1/5 mx-1 rounded-lg overflow-hidden cursor-pointer ${
                activeImageIndex === index ? 'border-2 border-blue-500' : ''
              }`}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
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
