import { useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  {
    product: "Basketball Shoes",
    shortName: "Basketball",
    revenue: 1009.53,
    profit: 381.79,
    units: 27.17,
  },
  {
    product: "Running Shoes",
    shortName: "Running",
    revenue: 766.63,
    profit: 288.84,
    units: 23.93,
  },
  {
    product: "Athletic Apparel",
    shortName: "Apparel",
    revenue: 728.85,
    profit: 254.33,
    units: 26.70,
  },
  {
    product: "Accessories",
    shortName: "Accessories",
    revenue: 292.80,
    profit: 93.55,
    units: 28.15,
  },
];

const COLORS = {
  revenue: "#2563EB",
  profit: "#10B981",
  units: "#F59E0B",
};

const formatBillion = (v) => `$${v.toFixed(0)}B`;
const formatUnits = (v) => `${v.toFixed(1)}B`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const full = data.find((d) => d.shortName === label);
  return (
    <div
      style={{
        background: "#0F172A",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "12px",
        padding: "14px 18px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        minWidth: "200px",
      }}
    >
      <p
        style={{
          color: "#94A3B8",
          fontSize: "11px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "10px",
          fontWeight: 600,
        }}
      >
        {full?.product}
      </p>
      {payload.map((entry) => (
        <div
          key={entry.name}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "24px",
            marginBottom: "6px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "2px",
                background: entry.color,
                flexShrink: 0,
              }}
            />
            <span style={{ color: "#CBD5E1", fontSize: "12px" }}>
              {entry.name}
            </span>
          </div>
          <span
            style={{ color: "#F8FAFC", fontSize: "13px", fontWeight: 600 }}
          >
            {entry.name === "Units Sold (B)"
              ? `${entry.value.toFixed(2)}B units`
              : `$${entry.value.toFixed(2)}B`}
          </span>
        </div>
      ))}
      {full && (
        <div
          style={{
            marginTop: "10px",
            paddingTop: "10px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#94A3B8", fontSize: "11px" }}>
              Profit Margin
            </span>
            <span
              style={{
                color: "#10B981",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              {((full.profit / full.revenue) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const CustomLegend = ({ activeKeys, onToggle }) => {
  const items = [
    { key: "revenue", label: "Revenue ($B)", color: COLORS.revenue, axis: "Left axis" },
    { key: "profit", label: "Profit ($B)", color: COLORS.profit, axis: "Left axis" },
    { key: "units", label: "Units Sold (B)", color: COLORS.units, axis: "Right axis" },
  ];
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "18px",
      }}
    >
      {items.map((item) => {
        const active = activeKeys[item.key];
        return (
          <button
            key={item.key}
            onClick={() => onToggle(item.key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "999px",
              border: `1.5px solid ${active ? item.color : "rgba(255,255,255,0.1)"}`,
              background: active ? `${item.color}18` : "transparent",
              cursor: "pointer",
              transition: "all 0.2s",
              outline: "none",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: item.key === "units" ? "50%" : "2px",
                background: active ? item.color : "#475569",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: active ? "#F1F5F9" : "#64748B",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                fontSize: "10px",
                color: active ? item.color : "#334155",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              ({item.axis})
            </span>
          </button>
        );
      })}
    </div>
  );
};

const CustomBarLabel = ({ x, y, width, value, color }) => {
  if (!value) return null;
  return (
    <text
      x={x + width / 2}
      y={y - 6}
      textAnchor="middle"
      fill={color}
      fontSize={10}
      fontWeight={600}
      fontFamily="'DM Mono', monospace"
    >
      ${value.toFixed(0)}B
    </text>
  );
};

export default function NikeChart() {
  const [activeKeys, setActiveKeys] = useState({
    revenue: true,
    profit: true,
    units: true,
  });

  const toggle = (key) =>
    setActiveKeys((prev) => ({ ...prev, [key]: !prev[key] }));

  const maxLeft = Math.max(...data.map((d) => d.revenue)) * 1.22;
  const maxRight = Math.max(...data.map((d) => d.units)) * 1.5;

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #0A0F1E 0%, #0D1B2A 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div style={{ width: "100%", maxWidth: "820px" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(37,99,235,0.15)",
              border: "1px solid rgba(37,99,235,0.3)",
              borderRadius: "999px",
              padding: "4px 14px",
              marginBottom: "14px",
            }}
          >
            <span style={{ fontSize: "11px", color: "#60A5FA", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Product Performance
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(20px, 3vw, 26px)",
              fontWeight: 700,
              color: "#F8FAFC",
              margin: "0 0 6px",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Revenue, Profit & Units Sold
          </h1>
          <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>
            Nike product categories · 2021–2023 · All values in billions
          </p>
        </div>

        {/* Chart card */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "20px",
            padding: "28px 24px 20px",
          }}
        >
          <ResponsiveContainer width="100%" height={380}>
            <ComposedChart
              data={data}
              margin={{ top: 28, right: 60, left: 10, bottom: 8 }}
              barCategoryGap="28%"
              barGap={4}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />

              <XAxis
                dataKey="shortName"
                tick={{
                  fill: "#94A3B8",
                  fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
                dy={8}
              />

              <YAxis
                yAxisId="left"
                orientation="left"
                domain={[0, maxLeft]}
                tickFormatter={formatBillion}
                tick={{
                  fill: "#94A3B8",
                  fontSize: 11,
                  fontFamily: "'DM Mono', monospace",
                }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: "Revenue & Profit ($B)",
                  angle: -90,
                  position: "insideLeft",
                  offset: 14,
                  style: {
                    fill: "#64748B",
                    fontSize: 11,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                  },
                  dx: -2,
                }}
                width={72}
              />

              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, maxRight]}
                tickFormatter={formatUnits}
                tick={{
                  fill: "#F59E0B",
                  fontSize: 11,
                  fontFamily: "'DM Mono', monospace",
                }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: "Units Sold (B)",
                  angle: 90,
                  position: "insideRight",
                  offset: 14,
                  style: {
                    fill: "#F59E0B",
                    fontSize: 11,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                  },
                  dx: 6,
                }}
                width={62}
              />

              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />

              {activeKeys.revenue && (
                <Bar
                  yAxisId="left"
                  dataKey="revenue"
                  name="Revenue ($B)"
                  fill={COLORS.revenue}
                  radius={[5, 5, 0, 0]}
                  maxBarSize={52}
                  label={<CustomBarLabel color={COLORS.revenue} />}
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={COLORS.revenue} fillOpacity={0.85} />
                  ))}
                </Bar>
              )}

              {activeKeys.profit && (
                <Bar
                  yAxisId="left"
                  dataKey="profit"
                  name="Profit ($B)"
                  fill={COLORS.profit}
                  radius={[5, 5, 0, 0]}
                  maxBarSize={52}
                  label={<CustomBarLabel color={COLORS.profit} />}
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={COLORS.profit} fillOpacity={0.85} />
                  ))}
                </Bar>
              )}

              {activeKeys.units && (
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="units"
                  name="Units Sold (B)"
                  stroke={COLORS.units}
                  strokeWidth={2.5}
                  dot={{ r: 5, fill: COLORS.units, stroke: "#0A0F1E", strokeWidth: 2 }}
                  activeDot={{ r: 7, fill: COLORS.units, stroke: "#0A0F1E", strokeWidth: 2 }}
                  strokeDasharray="6 3"
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>

          <CustomLegend activeKeys={activeKeys} onToggle={toggle} />
        </div>

        {/* Summary stat row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            marginTop: "14px",
          }}
        >
          {[
            { label: "Highest revenue", value: "Basketball Shoes", sub: "$1.01T", color: COLORS.revenue },
            { label: "Best profit margin", value: "Basketball Shoes", sub: "37.8%", color: COLORS.profit },
            { label: "Most units sold", value: "Accessories", sub: "28.15B units", color: COLORS.units },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "12px",
                padding: "12px 16px",
              }}
            >
              <p style={{ fontSize: "10px", color: "#475569", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600, margin: "0 0 4px" }}>
                {s.label}
              </p>
              <p style={{ fontSize: "13px", color: "#CBD5E1", fontWeight: 600, margin: "0 0 2px" }}>
                {s.value}
              </p>
              <p style={{ fontSize: "15px", color: s.color, fontWeight: 700, margin: 0, fontFamily: "'DM Mono', monospace" }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
