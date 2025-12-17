import React from 'react'
import Box from '@/components/dashboard/box'
import { DataTable } from '@/components/dashboard/DataTable'
import { Pie_Chart } from '@/components/dashboard/Piechart'
import Line_Chart from '@/components/dashboard/Linechart'
const page = () => {

    const box_data = [
        {title:'Total Products',number:'110',desc:"NaN% vs last period Active products",src:'/sidebar/box.svg'},
        {title:'Total Orders',number:'210',desc:"NaN% vs last period Active products",src:'/sidebar/cart.svg'},
        {title:'Total Count',number:'210',desc:"NaN% vs last period Active products",src:'/boxes.svg'},
        {title:'Total Sales',number:'₹990.00',desc:"NaN% vs last period Active products",src:'/rupee.svg'},
    ]

    const piechart_data = [
    { name: "Confirmed Orders", value: 45, color: "#000000" },
    { name: "Pending Orders", value: 25, color: "#4b4b4b" },
    { name: "Returned Orders", value: 15, color: "#7a7a7a" },
    { name: "Intransits Orders", value: 15, color: "#b5b5b5" },
    ];

    const linechart_data = [
        { name: "Jan", Expense: 5 },
        { name: "feb", Expense: 25 },
        { name: "march", Expense: 12 },
        { name: "April", Expense: 50 },
        { name: "may", Expense: 18 },
        { name: "june", Expense: 40 },
        { name: "july", Expense: 60 },
        { name: "Aug", Expense: 48 },
        { name: "Sep", Expense: 80 },
        { name: "Oct", Expense: 70 },
        { name: "Nov", Expense: 95 },
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

const table1_data = [
  { id: "1", name: "Product 1",size:'m',color:'black',rating:'4.5 rating'},
  { id: "2", name: "Product 1",size:'m',color:'black',rating:'4.5 rating'},
  { id: "3", name: "Product 1",size:'m',color:'black',rating:'4.5 rating'},
  { id: "4", name: "Product 1",size:'m',color:'black',rating:'4.5 rating'},
  { id: "5", name: "Product 1",size:'m',color:'black',rating:'4.5 rating'},
  
];

  return (
    <div className='flex flex-col gap-[18px] mt-[24px]'>
        <div className='flex flex-row gap-[18px]'>
            <div className='grid grid-cols-2 gap-[18px]'>
                {
                    box_data.map((cur,index)=>(
                        <Box title={cur.title} number={cur.number} desc={cur.desc} src={cur.src} key={index}  className='h-[136px] w-[284px]' />
                    ))
                }
            </div>
            <Pie_Chart data={piechart_data} title='Order Status Distribution' desc='Breakdown of orders By Status' radius={true} padding={true} className='h-[290px] w-[444px]' />
            <DataTable columns={table1_columns} data={table1_data} className='w-[718px] h-[290px]' title='Top Rated Products' desc='Best performing by customers rating'/>

        </div>

        <div className='flex flex-row gap-[18px]'>
                <Line_Chart
                    title="Sales Trend"
                    subtitle="Daily revenue and over the selected period"
                    data={linechart_data}
                    lines={[
                        { key: "Expense", color: "#000" },
                    ]}
                    className='w-[884px]'
                    height={200}
                />
                <DataTable columns={table2_columns} data={table2_data} className='w-[882px] h-[324px]'title='Recent Orders' desc='Small Latest customer purchases'/>

        </div>
    </div>
  )
}

export default page