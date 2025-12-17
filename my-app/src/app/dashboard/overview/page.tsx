import React from 'react'
import Box from '@/components/dashboard/box'
import Line_Chart from '@/components/dashboard/Linechart'
import { Pie_Chart } from '@/components/dashboard/Piechart'
import { DataTable } from '@/components/dashboard/DataTable'

const Page = () => {

    const boxData = [
        {
            title: 'Total Products',
            number: 110,
            desc: 'NaN% vs last period Active Products',
            src: '/sidebar/box.svg',
        },
        {
            title: 'Total Orders',
            number: 110,
            desc: 'NaN% vs last period Active Products',
            src: '/sidebar/cart.svg',
        },
        {
            title: 'Total Sales',
            number: 110,
            desc: 'NaN% vs last period Active Products',
            src: '/rupee.svg',
        },
        {
            title: 'Inventory Count',
            number: 110,
            desc: 'NaN% vs last period Active Products',
            src: '/boxes.svg',
        },
    ]

    const linechart_data = [
        { name: "Jan", revenue: 5 },
        { name: "feb", revenue: 25 },
        { name: "march", revenue: 12 },
        { name: "April", revenue: 50 },
        { name: "may", revenue: 18 },
        { name: "june", revenue: 40 },
        { name: "july", revenue: 60 },
        { name: "Aug", revenue: 48 },
        { name: "Sep", revenue: 80 },
        { name: "Oct", revenue: 70 },
        { name: "Nov", revenue: 95 },
    ];
        const piechart_data = [
    { name: "Confirmed Orders", value: 45, color: "#000000" },
    { name: "Pending Orders", value: 25, color: "#4b4b4b" },
    { name: "Returned Orders", value: 15, color: "#7a7a7a" },
    { name: "Intransits Orders", value: 15, color: "#b5b5b5" }, 
];

const table1_columns = [
  { key: "name", header: "Product Name" },
  
  {
    key: "rating",
    header: "Rating",
    // render: (row: Product) => (
    //   <span className="px-2 py-1 rounded text-xs bg-gray-100">
    //     {row.status}
    //   </span>
    // ),
  },
];

const table2_columns = [
    {key:'email',header:'Email'},
    {key:'total',header:'Total Products'},
    {key:'amount',header:'Total Amount'},
    {key:'date',header:'Date'},
    {key:'payment',header:'Payment'},
]

const table2_data = [
    {id:1,email:'abc@gmail.com',total:3,amount:'₹499.00',date:'2 hours ago',payment:'Confirmed'},
    {id:2,email:'abc@gmail.com',total:3,amount:'₹499.00',date:'2 hours ago',payment:'Confirmed'},
    {id:3,email:'abc@gmail.com',total:3,amount:'₹499.00',date:'2 hours ago',payment:'Pending'},
    {id:4,email:'abc@gmail.com',total:3,amount:'₹499.00',date:'2 hours ago',payment:'Pending'},
    {id:5,email:'abc@gmail.com',total:3,amount:'₹499.00',date:'2 hours ago',payment:'Confirmed'},
]


const table1_data = [
  { id: "1", name: "Product 1",size:'m',color:'black',rating:'4.5 rating'},
  { id: "2", name: "Product 1",size:'m',color:'black',rating:'4.5 rating'},
  { id: "3", name: "Product 1",size:'m',color:'black',rating:'4.5 rating'},
  { id: "4", name: "Product 1",size:'m',color:'black',rating:'4.5 rating'},
  { id: "5", name: "Product 1",size:'m',color:'black',rating:'4.5 rating'},
  
];

    return (
        <div className=' flex flex-col gap-[32px] mb-[40px]'>
            <div className='flex flex-row gap-[32px] mt-[23px]'>
                {boxData.map((cur, index) => (
                    <Box title={cur.title} number={cur.number} desc={cur.desc} src={cur.src} key={index} />
                ))}
            </div>
            <div className='flex flex-row gap-[32px]'>
                <Line_Chart
                    title="Revenue Trend"
                    subtitle="Daily revenue, orders and visitors"
                    data={linechart_data}
                    lines={[
                        { key: "revenue", color: "#000" },
                    ]}
                />

                <Pie_Chart data={piechart_data} title='Order Status Distribution' desc='Breakdown of orders By Status' />
            </div>
            <div className='flex flex-row gap-[32px]'>
                    <DataTable columns={table1_columns} data={table1_data} className='w-[638px] h-[398px]' title='Top Rated Products' desc='Best performing by customers rating'/>
                    <DataTable columns={table2_columns} data={table2_data} className='w-[906px] h-[398px]'title='Recent Orders' desc='Small Latest customer purchases'/>
            </div>
        </div>
    )
}

export default Page