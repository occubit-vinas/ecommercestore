"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Bar,
    BarChart,
} from "recharts";

type LineConfig = {
    key: string;
    color: string;
    strokeWidth?: number;
};

type Props = {
    title: string;
    subtitle?: string;
    data: Record<string, any>[];
    lines: LineConfig[];
    height?: number;
    c_type?: string;
    className?: string;
};

export default function Line_Chart({
    title,
    subtitle,
    data,
    lines,
    height = 200,
    c_type = 'line',
    className = ''
}: Props) {
    const ChartComponent = c_type === "bar" ? BarChart : LineChart;

    return (
        <div className={`${className ? className : 'w-[1040px]'} rounded-[12px] shadow-[1px_1px_4px_0.5px_#00000040] px-[20px] py-[16px]`}>
            {/* Title */}
            <div className="mb-4">
                <h2 className="text-18-md mb-[5px]">{title}</h2>
                {subtitle && (
                    <p className="text-12-nml">{subtitle}</p>
                )}
            </div>

            <ResponsiveContainer width="100%" height={height} className='-translate-x-[40px]'>

                <ChartComponent
                    data={data}
                    margin={c_type === "bar" ? { left: 10, right: 10 } : { left: 0, right: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

                    <XAxis
                        dataKey="name"
                        padding={c_type === "bar" ? { left: 30, right: 30 } : undefined}
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />

                    <YAxis
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />

                    <Tooltip
                        formatter={(value: number, name: string) => [`₹ ${value}`, name]}
                        contentStyle={{
                            borderRadius: "9999px",
                            border: "none",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            fontSize: "12px",
                        }}
                    />

                    {lines.map((line) =>
                        c_type === "line" ? (
                            <Line
                                key={line.key}
                                type="monotone"
                                dataKey={line.key}
                                stroke={line.color}
                                strokeWidth={line.strokeWidth ?? 2}
                                dot={false}
                            />
                        ) : (
                            <Bar
                                key={line.key}
                                dataKey={line.key}
                                fill={line.color ?? "#000"}
                                barSize={38}
                            />
                        )
                    )}
                </ChartComponent>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="mt-2 flex justify-center gap-4 text-xs">
                {lines.map((line) => (
                    <div key={line.key} className="flex items-center gap-2">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: line.color }}
                        />
                        <span className='text-12-nml'>{line.key}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
