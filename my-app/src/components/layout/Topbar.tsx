'use client'
import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import Serch_bar from '../ui/Serch_bar'
// import useThemeStore from '@/stores/theme/theme';
import { getuser } from '@/utils/cookie'
import ProfileButton from '../ui/ProfileButton'

const Topbar = () => {

    const [serch,setserch]=useState<string>('');
    // const {theme,setTheme} = useThemeStore();
    const [letter,setLetter]=useState<string>('');

    // it will be goes inside useEffect hook

    useEffect(() => {
      
      async function getLetter(){
          const data = await getuser();
          setLetter(data.name[0]);
      }
      getLetter();

    }, [])
    

    return (
        <div className='fixed z-[40] top-[10px] w-[1878px] h-[62px] mt-[10px] ml-[10px] rounded-[16px] backdrop-blur-[32.2px] shadow-[0px_0px_4px_0px_#00000040] pl-[94px] pr-[15px] flex flex-row justify-between items-center'>
            
            <Serch_bar value={serch} onChange={()=>{}} className='w-[900px]'/>

            <div className='flex flex-row gap-[10px] items-center'>

                {/* <Image src='/sun.svg' className='size-[20px]' alt='sun' height={20} width={20} onClick={()=>setTheme(theme === 'light'?'dark':'light')}/> */}
                <Image src='/sun.svg' className='size-[20px]' alt='sun' height={20} width={20} />

                <Image src='/notification.svg' className='size-[20px]' alt='notification' height={20} width={20}/>

                <div className='rounded-full size-[36px] bg-[#050506] flex justify-center items-center'>
                    <p className='text-22-md'>{letter}</p>
                    {/* <p className='text-22-md'>V</p> */}
                </div>
                {/* <ProfileButton/> */}
            </div>
        </div>
    )
}

export default Topbar