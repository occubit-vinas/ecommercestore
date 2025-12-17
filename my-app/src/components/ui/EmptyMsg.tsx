import React, { JSX } from 'react'
import Image from 'next/image'
const EmptyMsg = ({msg}:{msg:string}) => {
  return (
    <div className='flex flex-col gap-[10px] justify-center items-center'>
        <Image src='folder.svg' height={20} width={20} alt='folder' className='size-[20px]'/>
        <p>{msg}</p>
    </div>
  )
}

export default EmptyMsg