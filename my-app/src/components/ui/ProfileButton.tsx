import React from 'react'
import { getuser } from '@/utils/cookie'
const ProfileButton =  () => {
  
  
  async function getdata(){

     data = await getuser();
    console.log('user data',data.name[0]);
    // console.log('user data',data);
    // console.log(typeof data);
    letter = data.name[0];
  }
  getdata();
    
  return (
    <div className='rounded-full size-[36px] bg-[#050506] flex justify-center items-center'>
        <p className='text-22-md'>{letter}</p>
    </div>
  )
}

export default ProfileButton

