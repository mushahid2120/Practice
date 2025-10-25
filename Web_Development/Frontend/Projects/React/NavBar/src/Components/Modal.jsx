import React, { Children } from 'react'
import {createPortal} from 'react-dom'

export default function Modal({isOpen,setIsOpen,header,footer,children}) {
  return (
    createPortal(<div className={`${isOpen ?'':'hidden'} flex items-center justify-center bg-slate-100 bg-opacity-75 fixed inset-0 h-screen`}
        onClick={()=>{
                        setIsOpen(false)
                    }}
     >
        <div className='flex flex-col  bg-white rounded-lg  p-4 shadow-lg'
            onClick={(e)=>{
              e.stopPropagation()  
            }}
        >
            {header}
            {children}
            {footer}
        </div>
    </div>,document.querySelector('#portal'))
  )
}
