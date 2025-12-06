
'use client'
import React,{useState} from 'react'
import Image from 'next/image'
import Serch_bar from '../ui/Serch_bar'
// import useThemeStore from '@/stores/theme/theme';
const Topbar = () => {

    const [serch,setserch]=useState<string>('');
    // const {theme,setTheme} = useThemeStore();
    return (
        <div className='fixed top-[10px] w-[1878px] h-[62px] mt-[10px] ml-[10px] rounded-[16px] backdrop-blur-[32.2px] shadow-[0px_0px_4px_0px_#00000040] pl-[94px] pr-[15px] flex flex-row justify-between items-center'>
            
            <Serch_bar value={serch} onChange={setserch} className='w-[900px]'/>

            <div className='flex flex-row gap-[10px] items-center'>

                <Image src='/sun.svg' className='size-[20px]' alt='sun' height={20} width={20} onClick={()=>setTheme(theme === 'light'?'dark':'light')}/>

                <Image src='/notification.svg' className='size-[20px]' alt='notification' height={20} width={20}/>

                <div className='rounded-full size-[36px] bg-[#050506] flex justify-center items-center'>
                    <p className='text-22-md'>A</p>
                </div>
                
            </div>
        </div>
    )
}

export default Topbar