"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "@/lib/editorial";

type PieDatum = {
  name: string;
  amount: number;
  percentage: number;
  color: string;
  isAlert?: boolean;
};

const CustomPieTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: PieDatum }>;
}) => {
  if (!active || !payload?.length) return null;

  const datum = payload[0].payload;

  return (
    <div className="border border-[var(--color-ink)] bg-white px-2.5 py-1.5 text-[11px]" style={{ fontFamily: "var(--font-jetbrains)" }}>
      <div className="font-bold text-[var(--color-ink)]">{datum.name}</div>
      <div className="text-[var(--color-ink)]">
        {datum.percentage}% · {formatCurrency(datum.amount)}
      </div>
    </div>
  );
};

const Piechart = ({ categoryData }: { categoryData: PieDatum[] }) => {
  const total = categoryData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="relative h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="amount"
            nameKey="name"
            innerRadius={62}
            outerRadius={98}
            paddingAngle={1}
            stroke="#ffffff"
            strokeWidth={1}
          >
            {categoryData.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomPieTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[11px] font-bold text-[var(--color-ink)]" style={{ fontFamily: "var(--font-playfair)" }}>
          Total
        </div>
        <div className="text-[10px] text-[var(--color-ink-mid)]" style={{ fontFamily: "var(--font-jetbrains)" }}>
          {formatCurrency(total)}
        </div>
      </div>
    </div>
  );
};

export default Piechart;
