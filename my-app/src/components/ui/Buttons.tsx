// 'use client'
import Image from "next/image"
// import { Button } from "@/components/ui/button"
import { Button } from "./Button"
// export const S_filter=()=>{
//     return(
//     <div className='hover:cursor-pointer h-[40px] w-[146px] flex flex-row justify-center items-center gap-[8px] btn-bdr bg-white'>
//         <Image src='/filter.svg' alt='filter' height={10} width={10} className='size-[20px]'/>
//         <p className='btn-text'>Show Filter</p>
//     </div>
//     )
// }

// export const Refresh=({onClick,loading}:{onClick:()=>void,loading:()=>void})=>{
//     return(
//         <button className='hover:cursor-pointer h-[40px] px-[13.5px] btn-bdr flex justify-center items-center bg-white flex flex-row gap-[8px]' onClick={onClick} disabled={loading}>
//             <Image src='/rotate-left.svg' alt='refresh' height={10} width={10} className='size-[20px]'/>
//             <p className='btn-text mt-[1px]'>Refresh</p>
//         </button>
//     )
// }

// export const Add=({onClick}:{onClick:()=>void})=>{
//     return(
//         <div className="hover:cursor-pointer h-[40px] w-[106px] btn-bdr flex flex-row justify-center items-center bg-[#050506] gap-[8px]" onClick={onClick}>
//             <Image src='/add-square.svg' alt='add' height={10} width={10} className='size-[20px]' />
//             <p className='black-btn-text text-white mt-[1px]'>Add</p>
//         </div>
//     )
// }



// export const Cancel=({onClick}:{onClick:()=>void})=>{
//     return(
//         <div className='hover:cursor-pointer w-[106px] h-[40px] flex items-center justify-center border-[2px] border-[#050506] rounded-[14px] text-14-nml-506' onClick={onClick}>
//             Cancel
//         </div>
//     )
// }

// export const Create=({onClick,loading}:{onClick:()=>void,loading:boolean})=>{
//     return(
    //         <button className='w-[106px] h-[40px] flex justify-center items-center rounded-[14px]  text-[14px] font-inter font-normal   bg-[#050506] text-white hover:cursor-pointer' onClick={onClick} disabled={loading}>
//             Create
//         </button>
//     )
// }


export const S_filter=()=>{
    return(
    <Button className='hover:cursor-pointer h-[40px] w-[146px] flex flex-row justify-center items-center gap-[8px] btn-bdr bg-white'>
        <Image src='/filter.svg' alt='filter' height={10} width={10} className='size-[20px]'/>
        <p className='btn-text'>Show Filter</p>
    </Button>
    )
}

export const Refresh=({onClick,loading}:{onClick:()=>void,loading:()=>void})=>{
    return(
        <Button 
            className='hover:cursor-pointer h-[40px] px-[13.5px] btn-bdr flex justify-center items-center bg-white flex flex-row gap-[8px]' onClick={onClick} disabled={loading}>
            <Image src='/rotate-left.svg' alt='refresh' height={10} width={10} className='size-[20px]'/>
            <p className='btn-text mt-[1px]'>Refresh</p>
        </Button>
    )
}

export const Add=({onClick}:{onClick:()=>void})=>{
    return(
        <Button 
            // variant="outline"
            className="hover:cursor-pointer h-[40px] w-[106px] btn-bdr flex flex-row justify-center items-center bg-[#050506] gap-[8px]" 
            onClick={onClick}>
            <Image src='/add-square.svg' alt='add' height={10} width={10} className='size-[20px]' />
            <p className='black-btn-text text-white mt-[1px]'>Add</p>
        </Button>
    )
}

// Cancel Button
export const Cancel = ({ onClick }: { onClick: () => void }) => {
    return (
    <Button
      variant="outline"
      className="w-[106px] h-[40px] rounded-[14px] border-[2px] border-[#050506] text-[#050506]"
      onClick={onClick}
    >
      Cancel
    </Button>
  )
}

// Create Button
export const Create = ({
    onClick,
  loading,
}: {
    onClick: () => void
  loading: boolean
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      className="w-[106px] h-[40px] rounded-[14px] bg-[#050506] text-white"
    >
      {loading ? "Creating..." : "Create"}
    </Button>
  )
}
