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

// "use client"

// import React, { useState } from "react"
// import Image from "next/image"
// import { useRouter } from "next/navigation"
// // import { Button } from "@../ui/Button"
// import { Button } from "../ui/Button"
// import { useThemeStore } from "@/stores/theme/theme"

// const icons = [
//   {label:'Dashboard', path: "/dashboard", src: "/sidebar/category.svg" },
//   {label:'Category', path: "/category", src: "/sidebar/branch.svg" },
//   {label:'Products', path: "/products", src: "/sidebar/box.svg" },
//   {label:'Orders', path: "/cart", src: "/sidebar/cart.svg" },
//   {label:'Customers', path: "/user", src: "/sidebar/user.svg" },
//   {label:'Analytics', path: "/analytics", src: "/sidebar/chart.svg" },
//   {label:'Coupons', path: "/discount", src: "/sidebar/discount.svg" },
//   {label:'Review', path: "/favorite", src: "/sidebar/star.svg" },
//   {label:'HomePage', path: "/home", src: "/sidebar/home.svg" },
// ]

// export default function Sidebar() {
//   const [activeicon, setactiveicon] = useState<number | null>(null)
//   const [hover,setHover]=useState<boolean>(false);

//   const router = useRouter()
//   const { theme } = useThemeStore()

//   const handleIconClick = (index: number, path: string) => {
//     setactiveicon(index)
//     router.push(path)
//   }

//   return (
//     <div
//       className={`
//         fixed top-[104px] left-[10px]
//         w-[62px] h-[944px]
//         pt-[101px] pb-[50px] px-[21px]
//         flex flex-col justify-between items-center
//         rounded-[16px]
//         backdrop-blur-[92.2px]
//         shadow-[0px_0px_4px_0px_#00000040]
//         hover:w-[200px]
//         hover:items-start
//       ${hover ? "w-[200px]":''}

//       `}
//       onMouseEnter={()=>setHover(true)}
//       onMouseLeave={()=>setHover(false)}
//     >
//       {/* ICONS */}
//       <div className="flex flex-col gap-[4px]">
//         {icons.map((cur, index) => (
//           <Button
//             key={index}
//             variant="ghost"
//             onClick={() => handleIconClick(index, cur.path)}
//             className={`
//               h-[40px] w-[40px] p-0
//               flex items-center justify-center
//               rounded-full
//               hover:bg-transparent
//               cursor-pointer
//               ${
//                 activeicon === index
//                   ? "bg-[#4D4F5240] border border-[#FFFFFF] shadow-[inset_0px_2px_2px_0px_#0505061A,inset_-2px_-2px_4px_0px_#0505064D,2px_2px_4px_-2px_#05050640,-2px_-2px_4px_-3px_#05050640]"
//                   : ""
//               }
//             `}
//           >
//             <Image
//               src={cur.src}
//               height={20}
//               width={20}
//               alt="icon"
//               className="size-[20px]"
//             />
//             {hover ? cur.label:""}
//           </Button>
//         ))}
//       </div>

//       {/* SETTINGS ICON */}
//       <Button
//         variant="ghost"
//         className="
//           h-[40px] w-[40px] p-0
//           flex items-center justify-center
//           rounded-full
//           hover:bg-transparent
//         "
//       >
//         <Image
//           src="/sidebar/setting.svg"
//           height={20}
//           width={20}
//           alt="setting"
//           className="size-[20px]"
//         />
//         {hover && 'Setting'}
//       </Button>
//     </div>
//   )
// }


"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

type sidebarProp = {
  role:{
    role:string
  }
}


const items = [
  { label: 'Dashboard', path: "/dashboard/overview", src: "/sidebar/category.svg" },
  { label: 'Category', path: "/category", src: "/sidebar/branch.svg" },
  { label: 'Products', path: "/products", src: "/sidebar/box.svg" },
  { label: 'Orders', path: "/orders", src: "/sidebar/cart.svg" },
  { label: 'Customers', path: "/user", src: "/sidebar/user.svg" },
  { label: 'Analytics', path: "/analytics", src: "/sidebar/chart.svg" },
  { label: 'Coupons', path: "/coupons", src: "/sidebar/discount.svg" },
  { label: 'Review', path: "/review", src: "/sidebar/star.svg" },
  { label: 'HomePage', path: "/home", src: "/sidebar/home.svg" },
];

const admin_items = [
      { label: 'All Global Category', path: "/add_global_cat", src: "/sidebar/home.svg" },
      { label: 'AddStore', path: "/add_store", src: "/sidebar/home.svg" },
]




export function AppSidebar({role}:sidebarProp) {
  const pathname = usePathname();
  const router = useRouter();

  console.log('role is',role.role);
  
  if(role.role === 'role_super_admin' && items.length === 9){
    items.push(...admin_items);
    console.log(items);
    console.log('hello');
    
  }

  return (

    <Sidebar collapsible="icon" className='h-[944px]  shadow-[0px_0px_4px_0px_#00000040] rounded-[16px] pt-[101px] pb-[50px] fixed top-[104px] left-[10px] bg-white'>
      <SidebarTrigger className='flex items-center ml-[10px] [&_svg]:!h-[24px] [&_svg]:!w-[24px] bg-white' />
      <SidebarContent className='bg-white'>
        <SidebarGroup>
          <SidebarMenu className='flex flex-col gap-[20px] bg-white'>
            {items.map((item) => {
              const active = pathname === item.path;

              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    isActive={active}
                    onClick={() => router.push(item.path)}
                    className={`
                    flex items-center gap-3
                    group-data-[collapsible=icon]:justify-center
                    group-data-[collapsible=icon]:px-2

                  `}
                  >
                    {/* ICON (no wrapper!) */}

                    <Image
                      src={item.src}
                      alt={item.label}
                      width={24}
                      height={24}
                      className={`
                      h-[24px] w-[24px]
                      ${active
                          ? "rounded-full bg-[#4D4F5240] border border-white shadow-[inset_0px_2px_2px_0px_#0505061A,inset_-2px_-2px_4px_0px_#0505064D,2px_2px_4px_-2px_#05050640,-2px_-2px_4px_-3px_#05050640]"
                          : ""
                        }
                    `}
                    />

                    {/* LABEL (auto hidden by shadcn) */}
                    <span className="text-22-md-506">
                      {item.label}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='bg-white'>
        <SidebarMenu >
          <SidebarMenuItem >
            <SidebarMenuButton
              className="
                    group-data-[collapsible=icon]:justify-center
                    group-data-[collapsible=icon]:px-2
                  "
            >
              <Image
                src="/sidebar/setting.svg"
                alt="Settings"
                width={24}
                height={24}
                className="h-[24px] w-[24px]"
              />
              <span className="text-22-md-506">Settings</span>
            </SidebarMenuButton>

          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
