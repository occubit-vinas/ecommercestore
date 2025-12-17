import React from 'react'
import Box from '@/components/dashboard/box'
import Line_Chart from '@/components/dashboard/Linechart'
import { Pie_Chart } from '@/components/dashboard/Piechart'

const Sales = () => {

    const box_data = [
        {title:'Total Revenue',numbers:'₹110',desc:'NaN% vs last period active product',src:'/sidebar/box.svg'},
        {title:'Total Orders',numbers:'₹110',desc:'NaN% vs last period active product',src:'/sidebar/box.svg'},
        {title:'Average Order Value',numbers:'₹110',desc:'NaN% vs last period active product',src:'/sidebar/box.svg'},
        {title:'Conversion Rate',numbers:'₹110',desc:'NaN% vs last period active product',src:'/sidebar/box.svg'},
    ]

       const linechart_data = [
        { name: "Jan", revenue: 5 ,order:10},
        { name: "Jan", revenue: 25,order:20 },
        { name: "Jan", revenue: 12,order:10 },
        { name: "Jan", revenue: 50,order:30 },
        { name: "Jan", revenue: 18,order:10 },
        { name: "Jan", revenue: 40,order:10 },
        { name: "Jan", revenue: 60,order:20 },
        { name: "Jan", revenue: 48,order:10 },
        { name: "Jan", revenue: 80,order:40 },
        { name: "Jan", revenue: 70,order:10 },
        { name: "Jan", revenue: 95,order:30 },
    ];

     const piechart_data = [
    { name: "UPI and Online payment", value: 45, color: "#000000" },
    { name: "Cash On Delivery", value: 35, color: "#4b4b4b" },
    { name: "Net Banking", value: 20, color: "#7a7a7a" },
];

const barchart_data = [
        { name: "Kurti", r1: 5 ,r2:10},
        { name: "Shirt", r1: 25,r2:20 },
        { name: "T-Shirt", r1: 12,r2:10 },
        { name: "Jeans", r1: 50,r2:30 },
        { name: "Dress", r1: 18,r2:10 },
        { name: "Goun", r1: 40,r2:10 },
        { name: "Western", r1: 60,r2:20 },
    ]

  return (
    <div className='mt-[23px] flex flex-col gap-[32px]'>
        <div className='flex flex-row gap-[32px]'>
        {
            box_data.map((cur,index)=>(
                <Box title={cur.title} number={cur.numbers} desc={cur.desc} src={cur.src} key={index}/> 
                ))
        }
        </div>

        <div className='flex flex-row gap-[32px]'>
            <Line_Chart
             title="Revenue Trend"
                    subtitle="Daily revenue, orders and visitors"
                    data={linechart_data}
                    lines={[
                        { key: "revenue", color: "#000" },
                        { key: "order", color: "#726A6A" },
                    ]}
            />
            <Pie_Chart data={piechart_data} title='Payment Methods' desc='Revenue distribution by payment Type'/>
        </div>
        <Line_Chart
                title="Sales by Category"
                    subtitle="Revenue distribution acroos product categorie"
                    data={barchart_data}
                    lines={[
                        { key: "r1", color: "#999999" },
                        { key: "r2", color: "#000" },
                    ]}
                    c_type='bar'
            />
    </div>
  )
}

export default Sales