
"use client";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Sector,
    Tooltip
} from "recharts";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

type piedata = {
    name:string,value:number,color:string
}

export const Pie_Chart = ({ data, title, desc, radius, padding, className = '' }: { data: piedata[], title: string, desc: string, radius?: boolean, padding?: boolean, className?: string }) => {

    const maxValue:number = Math.max(...data.map((d) => d.value));
    const activeIndex:number = data.findIndex((d) => d.value === maxValue);
    return (
        <Card className={`shadow-[1px_1px_4px_0.5px_#00000040] rounded-[12px] ${className ? className : 'h-[296px] w-[504px]'} `}>
            <CardHeader>
                <CardTitle className="text-18-md">
                    {title}
                </CardTitle>
                <CardDescription>
                    {desc}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex items-center gap-6">
                    {/* Chart */}
                    <div className="h-[200px] w-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    innerRadius={65}
                                    outerRadius={90}
                                    startAngle={90}
                                    endAngle={-270}
                                    paddingAngle={!padding ? 0 : 2}
                                    cornerRadius={!radius ? 0 : 7}

                                    // activeIndex={activeIndex >= 0 ? activeIndex : undefined}
                                    activeShape={({ outerRadius = 0, ...props }) => (
                                        <Sector {...props} outerRadius={outerRadius + 5} />
                                    )}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>

                                {/* Center Text */}
                                <text
                                    x="50%"
                                    y="45%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-18-md"
                                >
                                    100%
                                </text>
                                <text
                                    x="50%"
                                    y="55%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-18-md"
                                >
                                    Distribution
                                </text>
                                <Tooltip
                        formatter={(value: number, name: string) => [`₹ ${value}`, name]}
                        contentStyle={{
                            borderRadius: "9999px",
                            border: "none",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            fontSize: "12px",
                        }}
                    />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Legend */}
                    <div className="space-y-2 text-sm">
                        {data.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <span
                                    className="h-2.5 w-2.5 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className='text-14-nml-506 '>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>

    )
}

