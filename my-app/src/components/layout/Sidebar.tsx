// 'use client'

// import React, { useState } from 'react'
// import Image from 'next/image'
// import { useRouter } from 'next/navigation'

// import { useThemeStore } from '@/stores/theme/theme'
// const icons = [
//     {path:'/dashboard' ,src: '/sidebar/category.svg' },
//     {path:'/category' ,src: '/sidebar/branch.svg' },
//     {path:'/product' ,src: '/sidebar/box.svg' },
//     {path:'/cart' ,src: '/sidebar/cart.svg' },
//     {path:'/user' ,src: '/sidebar/user.svg' },
//     {path:'/analytics' ,src: '/sidebar/chart.svg' },
//     {path:'/discount' ,src: '/sidebar/discount.svg' },
//     {path:'/favorite' ,src: '/sidebar/star.svg' },
//     {path:'/home' ,src: '/sidebar/home.svg' },
// ]

// const Sidebar = () => {

//     const [activeicon, setactiveicon] = useState<number | null>(null);
//     const router = useRouter();
//     const {theme}=useThemeStore();

//     const handleIconClick = (index:number,path:string):void =>{
//         setactiveicon(index);
//         router.push(path);
//     }

//     return (

//     <div className={`fixed top-[104px] left-[10px] w-[62px] h-[944px] pt-[101px] pb-[50px] flex flex-col justify-between items-center rounded-[16px] backdrop-blur-[32.2px] shadow-[0px_0px_4px_0px_#00000040]`}>

//         <div className='flex flex-col gap-[4px]'>
//             {
//                 icons.map((cur,index)=>(
//                     <div className={`${activeicon === index ? "h-[40px] w-[40px] bg-[#4D4F5240] rounded-full flex justify-center items-center border border-[#FFFFFF] shadow-[inset_0px_2px_2px_0px_#0505061A,inset_-2px_-2px_4px_0px_#0505064D,2px_2px_4px_-2px_#05050640,-2px_-2px_4px_-3px_#05050640]":"h-[40px] w-[40px]  flex items-center justify-center"} `} onClick={()=>handleIconClick(index,cur.path)} key={index}>
//                         <Image src={cur.src} height={20} width={20} className={`size-[20px]`} alt='icon'/>
//                     </div>
//                 ))
//             }
//         </div>

//         <Image src='/sidebar/setting.svg' height={20} width={20} alt='setting' className='size-[20px]'/>

//     </div >

//   )
// }

// export default Sidebar
"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
// import { Button } from "@../ui/Button"
import { Button } from "../ui/Button"
import { useThemeStore } from "@/stores/theme/theme"

const icons = [
  { path: "/dashboard", src: "/sidebar/category.svg" },
  { path: "/category", src: "/sidebar/branch.svg" },
  { path: "/product", src: "/sidebar/box.svg" },
  { path: "/cart", src: "/sidebar/cart.svg" },
  { path: "/user", src: "/sidebar/user.svg" },
  { path: "/analytics", src: "/sidebar/chart.svg" },
  { path: "/discount", src: "/sidebar/discount.svg" },
  { path: "/favorite", src: "/sidebar/star.svg" },
  { path: "/home", src: "/sidebar/home.svg" },
]

export default function Sidebar() {
  const [activeicon, setactiveicon] = useState<number | null>(null)
  const router = useRouter()
  const { theme } = useThemeStore()

  const handleIconClick = (index: number, path: string) => {
    setactiveicon(index)
    router.push(path)
  }

  return (
    <div
      className="
        fixed top-[104px] left-[10px]
        w-[62px] h-[944px]
        pt-[101px] pb-[50px]
        flex flex-col justify-between items-center
        rounded-[16px]
        backdrop-blur-[32.2px]
        shadow-[0px_0px_4px_0px_#00000040]
      "
    >
      {/* ICONS */}
      <div className="flex flex-col gap-[4px]">
        {icons.map((cur, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={() => handleIconClick(index, cur.path)}
            className={`
              h-[40px] w-[40px] p-0
              flex items-center justify-center
              rounded-full
              hover:bg-transparent

              ${
                activeicon === index
                  ? "bg-[#4D4F5240] border border-[#FFFFFF] shadow-[inset_0px_2px_2px_0px_#0505061A,inset_-2px_-2px_4px_0px_#0505064D,2px_2px_4px_-2px_#05050640,-2px_-2px_4px_-3px_#05050640]"
                  : ""
              }
            `}
          >
            <Image
              src={cur.src}
              height={20}
              width={20}
              alt="icon"
              className="size-[20px]"
            />
          </Button>
        ))}
      </div>

      {/* SETTINGS ICON */}
      <Button
        variant="ghost"
        className="
          h-[40px] w-[40px] p-0
          flex items-center justify-center
          rounded-full
          hover:bg-transparent
        "
      >
        <Image
          src="/sidebar/setting.svg"
          height={20}
          width={20}
          alt="setting"
          className="size-[20px]"
        />
      </Button>
    </div>
  )
}
