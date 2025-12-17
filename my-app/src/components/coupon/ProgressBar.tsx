import React from 'react'
import { Progress } from '../ui/progress'
import { calculatePercentage } from '@/utils/helper'
const ProgressBar = ({total_c,use_c}:{total_c:number,use_c:number}) => {

    const per = calculatePercentage({total_c,use_c});

  return (
    <div className='h-[33px] w-[289px] flex flex-col '>
        <div className='flex flex-row justify-between'>
            <p>{use_c} / {total_c} users</p>
            <p>{per}%</p>
        </div>
        <Progress value={per} className='w-full h-[10px]'/>
    </div>
  )
}

export default ProgressBar;