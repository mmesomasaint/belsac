import { createContext, useContext, useState } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { PiCaretDownThin } from 'react-icons/pi'
import { Button } from './elements'

type DropContextType = {
  active: string
  setActive: (value: string) => void
  setIsOpen: (value: boolean) => void
}

const DropContext = createContext<DropContextType>({
  active: '',
  setActive: () => {
    return
  },
  setIsOpen: () => {
    return
  },
})
const useDrop = () => useContext(DropContext)

export default function DropDown({
  title,
  initialActive,
  children,
}: {
  title: string
  initialActive: string
  children: React.ReactNode | React.ReactNode[]
}) {
  const [active, setActive] = useState(initialActive)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropContext.Provider
      value={{
        active,
        setActive: (value: string) => setActive(value),
        setIsOpen: (value: boolean) => setIsOpen(value),
      }}
    >
      {isOpen && (
        <div
          className='fixed inset-0 bg-transparent'
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className='relative' aria-haspopup='menu'>
        <Button onClick={() => setIsOpen((prev) => !prev)} outline>
          <span className='flex justify-center items-center gap-4'>
            {title}
            <PiCaretDownThin className='text-4xl' />
          </span>
        </Button>
        <div
          className={`absolute top-[100%] right-0 ${
            isOpen ? 'flex' : 'hidden'
          } flex-col items-stretch`}
        >
          {children}
        </div>
      </div>
    </DropContext.Provider>
  )
}

export function DropItem({
  value,
  onClick,
  children,
}: {
  value: string
  onClick: () => void
  children: React.ReactNode
}) {
  const { active, setActive, setIsOpen } = useDrop()
  const isActive = active === value

  const outlineStyles = `${
    isActive ? 'bg-black/90 text-white' : 'bg-white text-black/90'
  }`

  return (
    <button
      className={`py-4 px-10 shadow-md border border-black/90 leading-none text-2xl font-light ${outlineStyles}`}
      onClick={() => {
        setActive(value)
        onClick()
        setIsOpen(false)
      }}
    >
      <span className='flex justify-center items-center gap-4'>
        {children}
        <BsCheckLg className='text-4xl text-white' />
      </span>
    </button>
  )
}
