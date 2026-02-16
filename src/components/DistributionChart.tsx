import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface DistributionChartProps {
    principal: number;
    interest: number;
}

const COLORS = ['#0088FE', '#00C49F'];

export const DistributionChart: React.FC<DistributionChartProps> = ({ principal, interest }) => {
    const data = [
        { name: 'Principal', value: principal },
        { name: 'Interest', value: interest },
    ];

    if (principal <= 0 && interest <= 0) {
        return null; // Or a placeholder if preferred
    }

    return (
        <div className="h-64 w-full mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center">Interest Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value: number | string | Array<number | string> | undefined) => {
                        if (typeof value === 'number') {
                            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
                        }
                        return value;
                    }} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
