import { PieChart, Pie, Cell, Sector, Tooltip, Legend } from 'recharts'
import React from 'react'
import { CategoryData } from '@/types'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};
const MyCustomPie = (props:any) => {

  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};


const Piechart = ({ categoryData }: { categoryData: CategoryData[] }) => {
    console.log(categoryData,'Category data in piechart')
  return (
<PieChart width={400} height={400} style={{ overflow: 'visible' }}>
    <Pie
  shape={MyCustomPie}
  label={renderCustomizedLabel}
  labelLine={false}
  data={categoryData}
  dataKey="value"
  nameKey="name"
/>  
  <Tooltip />  
 <Legend />
</PieChart>
  )
}

export default Piechart

