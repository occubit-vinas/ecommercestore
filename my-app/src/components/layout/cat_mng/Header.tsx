
import React from 'react'

const Header = ({ b1, b2, b3,b4, title, desc }: {
  b1?: React.ReactNode,
  b2?: React.ReactNode,
  b3?: React.ReactNode,
  b4?:React.ReactNode,
  title?: string,
  desc?: string
}) => {

  return (
    <div className='flex flex-row justify-between items-center w-[1784px]'>
      <div className='flex flex-col gap-[10px]'>
        <p className='text-32-md bg-white'>{title}</p>
        <p className='text-12-nml bg-white'>{desc}</p>
      </div>

      <div className='flex flex-row gap-[10px]'>
        {b1}
        {b2}
        {b3}
        {b4}
      </div>
    </div>
  )
}

export default Header;
