import React from 'react'
import { Pie_Chart } from '@/components/dashboard/Piechart'
import Line_Chart from '@/components/dashboard/Linechart'
import Box from '@/components/dashboard/box'
import { DataTable } from '@/components/dashboard/DataTable'
const page = () => {

    const boxData = [
        {
            title: 'Total Customers',
            number: 110,
            desc: 'All registered users',
            src: '/sidebar/user.svg',
        },
        {
            title: 'Active Customers',
            number: 210,
            desc: 'Active in last 30 days',
            src: '/eye.svg',
        },
        {
            title: 'Repeat Customers',
            number: 20,
            desc: 'Multiple purchase',
            src: '/heart.svg',
        },
        {
            title: 'Retention Rate',
            number: '0.0%',
            desc: 'Customers retention',
            src: '/rings.svg',
        },
    ]

    const linechart_data = [
        { name: "Jan", customers: 5 },
        { name: "feb", customers: 25 },
        { name: "march", customers: 12 },
        { name: "April", customers: 50 },
        { name: "may", customers: 18 },
        { name: "june", customers: 40 },
        { name: "july", customers: 60 },
        { name: "Aug", customers: 48 },
        { name: "Sep", customers: 80 },
        { name: "Oct", customers: 70 },
        { name: "Nov", customers: 95 },
    ];

    const barchart_data = [
        { name: "UK", today: 5 ,prev:15},
        { name: "Canada", today: 25,prev:15 },
        { name: "US", today: 12,prev:65 },
        { name: "Germany", today: 50,prev:35 },
        { name: "Australia", today: 18,prev:65 },
        { name: "Russia", today: 40,prev:15 },
        { name: "Africa", today: 60,prev:25 },    
    ];

    const piechart_data = [
        { name: "Desktop", value: 45, color: "#000000" },
        { name: "Mobiles", value: 25, color: "#4b4b4b" },
        { name: "Tablet", value: 30, color: "#7a7a7a" },
    ];

    const table1_columns = [
  { key: "email", header: "Email" },
  
  {
    key: "rating",
    header: "Rating",
  },
];

    const table1_data = [
  { id: "1", email: "abc@gmail.com",rating:'4.5 rating'},
  { id: "2", email: "abc@gmail.com",rating:'4.5 rating'},
  { id: "3", email: "abc@gmail.com",rating:'4.5 rating'},
  { id: "4", email: "abc@gmail.com",rating:'4.5 rating'},
  { id: "5", email: "abc@gmail.com",rating:'4.5 rating'},
  
];

    return (
        <div className='flex flex-col gap-[18px] mt-[26px]'>
            <div className='flex flex-row gap-[18px]'>

                <div className='grid grid-cols-2 gap-[18px]'>
                    {
                        boxData.map((cur, index) => (
                            <Box title={cur.title} number={cur.number} desc={cur.desc} src={cur.src} key={index} className='h-[146px] w-[284px]' />
                        ))
                    }
                </div>
                <Pie_Chart data={piechart_data} title='By Device' desc='Breakdown of device' radius={true} padding={true} className='h-[326px] w-[444px]' />
                <DataTable columns={table1_columns} data={table1_data} className='w-[718px] h-[326px]' title='Top Customers' desc='Highest spending customers'/>

            </div>

            <div className='flex flex-row gap-[18px]'>
                <Line_Chart
                    title="Customer Growth"
                    subtitle="New customers registered over time"
                    data={linechart_data}
                    lines={[
                        { key: "customers", color: "#000" },
                    ]}
                    className='w-[884px]'
                />

                <Line_Chart
                title="Customer Demography"
                    subtitle="Geography usage breakdown"
                    data={barchart_data}
                    lines={[
                        { key: "today", color: "#999999" },
                        { key: "prev", color: "#000" },
                    ]}
                    c_type='bar'
                    className='w-[884px]'
                />
            </div>
        </div>
    )
}

export default page