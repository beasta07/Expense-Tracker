'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
type MonthlyData = {
  month: string
  amount: number
}
const TinyBarChart = ({ monthlyData }: { monthlyData: MonthlyData[] }) => {
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={monthlyData}
          margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
          barSize={40}
        >
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickFormatter={(value) => `Rs ${value}`}
          />
          <Tooltip
            cursor={{ fill: '#f0fdf4' }}
            contentStyle={{
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
            }}
            formatter={(value) => [`Rs ${value}`, 'Amount']}
          />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]} fill="#16a34a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TinyBarChart