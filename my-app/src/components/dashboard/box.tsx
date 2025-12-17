import React from 'react'
import Image from 'next/image'

const Box = ({title,number,desc,src,className='',com:Com}:{title:string,number:string | number,desc?:string,src:string,className?:string,com?:React.FC}) => {

  return (
    <div className={` ${className ? className : 'w-[370px] h-[132px]' }  rounded-[12px] px-[20px] py-[16px] flex flex-row justify-between shadow-[1px_1px_4px_0.5px_#00000040]`}>
        <div className='h-full flex flex-col justify-between items-start'>
            <span className='text-14-md'>{title}</span>
            <span className='text-22-bd'>{number}</span>
            {desc && <span className='text-12-nml max-w-[150px]'>{desc}</span>}
            {Com && <Com/>}
        </div>
        <div className='flex items-center justify-center bg-[#4D4F5240] border border-[#FFFFFF] shadow-[inset_0px_2px_2px_0px_#0505061A,inset_-2px_-2px_4px_0px_#0505064D,2px_2px_4px_-2px_#05050640,-2px_-2px_4px_-3px_#05050640] h-[40px] w-[40px] rounded-full'>

        <Image
        src={src}
        height={22}
        width={22}
        className='size-[22px]'
        alt='img'
        />
        </div>
    </div>
  )
}

export default Box