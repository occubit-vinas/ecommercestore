'use client'
import React, { useState,useEffect } from 'react'
import { Refresh } from '@/components/ui/Buttons'
import { Export } from '@/components/ui/Buttons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const navLinks=[{title:'overview'},{title:'sales'},{title:'customers'},{title:'products'},{title:'inventory'}]



const TopNavBar = () => {

    const [active,setActive] = useState<number>(10);
    const router = useRouter();
    const pathname = usePathname();

   useEffect(() => {
    if (pathname.includes("overview")) setActive(0);
    else if (pathname.includes("sales")) setActive(1);
    else if (pathname.includes("customers")) setActive(2);
    else if (pathname.includes("products")) setActive(3);
    else if (pathname.includes("inventory")) setActive(4);
  }, [pathname]); 

    return (
        <div className='flex flex-row justify-between w-[1575px]'>
            <div className='flex flex-col gap-[5px]'>
                <p className='text-32-md'>Store Analytics</p>
                <p className='text-14-nml-506'>You have 2 notification today</p>
            </div>

            <div className="flex justify-center  h-[46px] w-[799px] ">
                <div className={`flex flex-row gap-4 bg-white rounded-sm px-[4px] py-[4px] shadow-[0_0_2px_0.5px_rgba(0,0,0,0.25)]`}>
                    {navLinks.map((cur, index) => (
                        <Link
                            href={`/dashboard/${cur.title}`}
                            key={index}
                            // onClick={() =>router.push(`/dashboard/${cur.title}`)}
                            onClick={()=>setActive(index)}
                            className={`px-11 py-2 rounded-md transition-all duration-200 ${active === index
                                    ? ` shadow text-white bg-[#4D4F52]`
                                    : 'text-black'
                                }`}
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 700,
                                fontSize: '20px',
                                lineHeight: '100%',
                            }}
                        >
                            {cur.title}
                        </Link>
                    ))}
                </div>
            </div>

            <div className='flex flex-row gap-[10px]'>
                <Refresh onClick={()=>{}} loading={true}/>
                <Export onClick={()=>{}}/>
            </div>
        </div>
    )
}

export default TopNavBar