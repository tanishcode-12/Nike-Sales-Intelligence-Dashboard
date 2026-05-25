import { useState } from "react";
import {
  ComposedChart,
  Bar,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const data = [
  { product: "Basketball Shoes", shortName: "Basketball\nShoes", margin: 37.82, revenue: 1009.53, profit: 381.79 },
  { product: "Running Shoes",    shortName: "Running\nShoes",    margin: 37.67, revenue: 766.63,  profit: 288.84 },
  { product: "Athletic Apparel", shortName: "Athletic\nApparel", margin: 34.89, revenue: 728.85,  profit: 254.33 },
  { product: "Accessories",      shortName: "Accessories",       margin: 31.95, revenue: 292.80,  profit: 93.55  },
];

const avgMargin = data.reduce((s, d) => s + d.margin, 0) / data.length;

const getColor = (margin) => {
  if (margin >= 37.5) return { bar: "#22C55E", dot: "#4ADE80", glow: "rgba(34,197,94,0.25)", label: "#86EFAC" };
  if (margin >= 35)   return { bar: "#3B82F6", dot: "#60A5FA", glow: "rgba(59,130,246,0.25)", label: "#93C5FD" };
  return                     { bar: "#F59E0B", dot: "#FCD34D", glow: "rgba(245,158,11,0.25)",  label: "#FDE68A" };
};

const getTier = (margin) => {
  if (margin >= 37.5) return { label: "High",   bg: "rgba(34,197,94,0.15)",  border: "rgba(34,197,94,0.4)",  text: "#4ADE80" };
  if (margin >= 35)   return { label: "Mid",    bg: "rgba(59,130,246,0.15)", border: "rgba(59,130,246,0.4)", text: "#60A5FA" };
  return                     { label: "Low",    bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.4)", text: "#FCD34D" };
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  const c = getColor(d.margin);
  const tier = getTier(d.margin);
  const vsAvg = (d.margin - avgMargin).toFixed(2);
  return (
    <div style={{
      background: "#0D1117",
      border: `1px solid ${c.bar}55`,
      borderRadius: "14px",
      padding: "16px 20px",
      boxShadow: `0 8px 32px ${c.glow}, 0 0 0 1px rgba(255,255,255,0.04)`,
      minWidth: "210px",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <p style={{ color: "#94A3B8", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 10px" }}>
        {d.product}
      </p>
      <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "12px" }}>
        <span style={{ fontSize: "32px", fontWeight: 700, color: c.dot, fontFamily: "'IBM Plex Mono', monospace", lineHeight: 1 }}>
          {d.margin.toFixed(2)}
        </span>
        <span style={{ fontSize: "18px", color: c.label, fontWeight: 600 }}>%</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
        {[
          { label: "Revenue", val: `$${d.revenue.toFixed(1)}B` },
          { label: "Profit",  val: `$${d.profit.toFixed(1)}B`  },
        ].map(({ label, val }) => (
          <div key={label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "8px 10px" }}>
            <p style={{ color: "#64748B", fontSize: "10px", margin: "0 0 3px", fontWeight: 500 }}>{label}</p>
            <p style={{ color: "#E2E8F0", fontSize: "13px", fontWeight: 600, margin: 0, fontFamily: "'IBM Plex Mono', monospace" }}>{val}</p>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#64748B", fontSize: "11px" }}>vs category avg</span>
        <span style={{ color: parseFloat(vsAvg) >= 0 ? "#4ADE80" : "#F87171", fontSize: "12px", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>
          {parseFloat(vsAvg) >= 0 ? "+" : ""}{vsAvg}pp
        </span>
      </div>
      <div style={{ marginTop: "10px", display: "inline-flex", alignItems: "center", gap: "6px", background: tier.bg, border: `1px solid ${tier.border}`, borderRadius: "999px", padding: "3px 10px" }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: tier.text, display: "inline-block" }} />
        <span style={{ color: tier.text, fontSize: "10px", fontWeight: 700, letterSpacing: "0.07em" }}>{tier.label} performer</span>
      </div>
    </div>
  );
};

const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  if (!cx || !cy) return null;
  const c = getColor(payload.margin);
  return (
    <g>
      <circle cx={cx} cy={cy} r={14} fill={c.glow} />
      <circle cx={cx} cy={cy} r={9}  fill={c.dot} stroke="#0D1117" strokeWidth={2.5} />
    </g>
  );
};

const CustomBar = (props) => {
  const { x, y, width, height, payload } = props;
  if (!height) return null;
  const c = getColor(payload.margin);
  return (
    <rect
      x={x} y={y + height / 2 - 3}
      width={width} height={6}
      rx={3} ry={3}
      fill={c.bar}
      fillOpacity={0.35}
    />
  );
};

export default function ProfitMarginChart() {
  const [hovered, setHovered] = useState(null);
  const domainMin = 28;
  const domainMax = 42;

  return (
    <div style={{
      background: "linear-gradient(160deg, #080D14 0%, #0D1520 60%, #090E18 100%)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "36px 20px",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ width: "100%", maxWidth: "780px" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#475569", margin: "0 0 10px" }}>
            Nike · 2021–2023 · Product Analysis
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 700, color: "#F1F5F9", margin: "0 0 8px", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            Profit Margin by<br />Product Category
          </h1>
          <p style={{ fontSize: "13px", color: "#475569", margin: 0 }}>
            Percentage of revenue retained as profit · hover bars for details
          </p>
        </div>

        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px", marginBottom: "28px" }}>
          {data.map((d) => {
            const c = getColor(d.margin);
            const tier = getTier(d.margin);
            const isHov = hovered === d.product;
            return (
              <div key={d.product}
                onMouseEnter={() => setHovered(d.product)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHov ? `${c.bar}12` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isHov ? c.bar + "55" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: "14px",
                  padding: "14px",
                  cursor: "default",
                  transition: "all 0.2s",
                }}>
                <p style={{ fontSize: "10px", color: "#475569", fontWeight: 600, margin: "0 0 8px", letterSpacing: "0.05em" }}>
                  {d.product.toUpperCase().split(" ")[0]}
                </p>
                <p style={{ fontSize: "22px", fontWeight: 700, color: c.dot, margin: "0 0 6px", fontFamily: "'IBM Plex Mono', monospace", lineHeight: 1 }}>
                  {d.margin.toFixed(1)}%
                </p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: tier.bg, border: `1px solid ${tier.border}`, borderRadius: "999px", padding: "2px 8px" }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: tier.text, display: "inline-block" }} />
                  <span style={{ color: tier.text, fontSize: "9px", fontWeight: 700, letterSpacing: "0.06em" }}>{tier.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart */}
        <div style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "20px",
          padding: "28px 20px 20px",
        }}>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "20px", paddingLeft: "8px" }}>
            {[
              { color: "#22C55E", dot: "#4ADE80", label: "High margin  ≥ 37.5%" },
              { color: "#3B82F6", dot: "#60A5FA", label: "Mid margin   35–37.5%" },
              { color: "#F59E0B", dot: "#FCD34D", label: "Low margin   < 35%" },
              { color: "#94A3B8", dashed: true,   label: `Avg: ${avgMargin.toFixed(1)}%` },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                {item.dashed ? (
                  <svg width="18" height="10" viewBox="0 0 18 10">
                    <line x1="0" y1="5" x2="18" y2="5" stroke={item.color} strokeWidth="1.5" strokeDasharray="4 2" />
                  </svg>
                ) : (
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: item.dot, display: "inline-block", flexShrink: 0 }} />
                )}
                <span style={{ fontSize: "11px", color: "#64748B", fontFamily: "'IBM Plex Mono', monospace" }}>{item.label}</span>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 72, bottom: 10, left: 20 }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                type="number"
                domain={[domainMin, domainMax]}
                tickCount={8}
                tickFormatter={(v) => `${v}%`}
                tick={{ fill: "#64748B", fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
                axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                tickLine={false}
                label={{
                  value: "Profit Margin (%)",
                  position: "insideBottom",
                  offset: -2,
                  style: { fill: "#475569", fontSize: 11, fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 },
                }}
                height={36}
              />
              <YAxis
                type="category"
                dataKey="product"
                width={130}
                tick={{ fill: "#94A3B8", fontSize: 12, fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <ReferenceLine
                x={avgMargin}
                stroke="#94A3B8"
                strokeDasharray="4 2"
                strokeWidth={1.5}
                label={{
                  value: `Avg ${avgMargin.toFixed(1)}%`,
                  position: "top",
                  style: { fill: "#64748B", fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" },
                }}
              />
              <Bar
                dataKey="margin"
                shape={<CustomBar />}
                background={{ fill: "rgba(255,255,255,0.025)", radius: 4 }}
                isAnimationActive={true}
                animationDuration={800}
              >
                {data.map((d) => <Cell key={d.product} />)}
                <LabelList
                  dataKey="margin"
                  position="right"
                  formatter={(v) => `${v.toFixed(2)}%`}
                  style={{ fill: "#94A3B8", fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}
                />
              </Bar>
              <Scatter
                dataKey="margin"
                shape={<CustomDot />}
                isAnimationActive={true}
                animationDuration={900}
              >
                {data.map((d) => <Cell key={d.product} fill={getColor(d.margin).dot} />)}
              </Scatter>
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Footer insight */}
        <div style={{
          marginTop: "14px",
          background: "rgba(34,197,94,0.06)",
          border: "1px solid rgba(34,197,94,0.15)",
          borderRadius: "12px",
          padding: "12px 18px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <span style={{ fontSize: "18px" }}>💡</span>
          <p style={{ fontSize: "12px", color: "#94A3B8", margin: 0, lineHeight: 1.6 }}>
            <span style={{ color: "#4ADE80", fontWeight: 600 }}>Basketball Shoes</span> leads with the highest margin at{" "}
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#4ADE80" }}>37.82%</span>, while{" "}
            <span style={{ color: "#FCD34D", fontWeight: 600 }}>Accessories</span> trails at{" "}
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#FCD34D" }}>31.95%</span> — a{" "}
            <span style={{ color: "#F1F5F9", fontWeight: 600 }}>5.87 percentage point</span> spread across all categories.
          </p>
        </div>
      </div>
    </div>
  );
}
