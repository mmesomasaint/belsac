import { createContext, useContext, useState } from "react"
import {BsCheckLg} from 'react-icons/bs'
import {PiArrowDownThin} from 'react-icons/pi'
import { Button } from "./elements"

const DropContext = createContext<{active: string}>({active: ''})
const useDrop = () => useContext(DropContext)

export default function DropDown({ title, initialActive, children }: { title: string, initialActive: string, children: React.ReactNode | React.ReactNode[] }) {
  const [active, setActive] = useState(initialActive)
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <DropContext.Provider value={{active}}>
      <div className='relative' aria-haspopup="menu">
        <Button onClick={() => console.log('dropdown main button clicked')} outline>
          <span className="flex justify-center itmes-center gap-4">
            {title}
            <PiArrowDownThin className='text-4xl' />
          </span>
        </Button>
        <div className={`${isOpen ? 'flex' : 'block'} flex-col items-stretch`}>
          {children}
        </div>
      </div>
    </DropContext.Provider>
  )
}

export function DropItem({onClick, children}: {onClick: () => void, children: string}) {
  const {active} = useDrop()
  const isActive = active === children

  const outlineStyles = `${isActive ? 'bg-black/90 text-white' : 'bg-transparent text-black/90'}`

  return (
    <button
      className={`py-4 px-10 shadow-md border border-black/90 leading-none text-2xl font-light ${outlineStyles}`}
      onClick={onClick}
    >
      <span className="flex justify-center items-center gap-4">
        {children}
        {isActive && <BsCheckLg className='text-4xl' />}
      </span>
    </button>
  )
}