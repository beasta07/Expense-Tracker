"use client";

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/lib/editorial";

type MonthlyData = {
  label: string;
  abbr: string;
  amount: number;
  isCurrent: boolean;
};

const CustomBarTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="border border-[var(--color-ink)] bg-white px-2.5 py-1.5 text-[11px]" style={{ fontFamily: "var(--font-jetbrains)" }}>
      <div className="font-bold text-[var(--color-ink)]">{label}</div>
      <div className="text-[var(--color-ink)]">{formatCurrency(payload[0].value)}</div>
    </div>
  );
};

const Barchart = ({ monthlyData }: { monthlyData: MonthlyData[] }) => {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData} margin={{ top: 18, right: 10, left: -22, bottom: 8 }}>
          <XAxis
            dataKey="abbr"
            tickLine={false}
            axisLine={{ stroke: "#111111", strokeWidth: 2 }}
            tick={{ fill: "#555555", fontSize: 10, fontFamily: "var(--font-jetbrains)" }}
          />
          <YAxis
            tickLine={false}
            axisLine={{ stroke: "#111111", strokeWidth: 2 }}
            tick={{ fill: "#777777", fontSize: 9, fontFamily: "var(--font-jetbrains)" }}
            tickFormatter={(value) => `${Math.round(value / 1000)}k`}
          />
          <Tooltip cursor={false} content={<CustomBarTooltip />} />
          <Bar dataKey="amount" maxBarSize={40}>
            {monthlyData.map((entry) => (
              <Cell key={entry.label} fill={entry.isCurrent ? "#C0392B" : "#111111"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
