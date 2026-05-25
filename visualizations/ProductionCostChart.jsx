import { useState } from "react";
import {
  ComposedChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, LabelList,
  ReferenceLine,
} from "recharts";

const data = [
  {
    product: "Basketball Shoes", short: "Basketball",
    revenue: 1009.53, profit: 381.79, prodCost: 627.74,
    profitMargin: 37.82, costPct: 62.18,
    unitPrice: 36.87, costPerUnit: 19.41, profitPerUnit: 14.05,
    units: 27.17,
  },
  {
    product: "Running Shoes", short: "Running",
    revenue: 766.63, profit: 288.84, prodCost: 477.78,
    profitMargin: 37.68, costPct: 62.32,
    unitPrice: 31.56, costPerUnit: 16.68, profitPerUnit: 12.07,
    units: 23.93,
  },
  {
    product: "Athletic Apparel", short: "Apparel",
    revenue: 728.85, profit: 254.33, prodCost: 474.53,
    profitMargin: 34.89, costPct: 65.11,
    unitPrice: 26.70, costPerUnit: 14.71, profitPerUnit: 9.53,
    units: 26.70,
  },
  {
    product: "Accessories", short: "Accessories",
    revenue: 292.80, profit: 93.55, prodCost: 199.25,
    profitMargin: 31.95, costPct: 68.05,
    unitPrice: 10.86, costPerUnit: 6.27, profitPerUnit: 3.32,
    units: 28.15,
  },
];

const PALETTE = {
  "Basketball Shoes": { profit: "#22C55E", cost: "#166534", badge: "rgba(34,197,94,0.15)", badgeBorder: "rgba(34,197,94,0.35)", badgeText: "#4ADE80" },
  "Running Shoes":    { profit: "#3B82F6", cost: "#1E3A8A", badge: "rgba(59,130,246,0.15)", badgeBorder: "rgba(59,130,246,0.35)", badgeText: "#60A5FA" },
  "Athletic Apparel": { profit: "#A855F7", cost: "#581C87", badge: "rgba(168,85,247,0.15)", badgeBorder: "rgba(168,85,247,0.35)", badgeText: "#C084FC" },
  "Accessories":      { profit: "#F59E0B", cost: "#78350F", badge: "rgba(245,158,11,0.15)", badgeBorder: "rgba(245,158,11,0.35)", badgeText: "#FCD34D" },
};

const fmt = (v) => `$${v.toFixed(1)}B`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const d = data.find((x) => x.short === label);
  if (!d) return null;
  const p = PALETTE[d.product];
  return (
    <div style={{
      background: "#0A0F1A",
      border: `1px solid ${p.profit}44`,
      borderRadius: "14px",
      padding: "16px 20px",
      boxShadow: `0 16px 40px rgba(0,0,0,0.6)`,
      fontFamily: "'IBM Plex Sans', sans-serif",
      minWidth: "230px",
    }}>
      <p style={{ color: "#64748B", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 12px" }}>{d.product}</p>
      {[
        { label: "Production Cost", val: fmt(d.prodCost), color: p.badgeText, sub: `${d.costPct.toFixed(1)}% of revenue` },
        { label: "Profit",          val: fmt(d.profit),   color: p.profit,    sub: `${d.profitMargin.toFixed(1)}% margin` },
      ].map(({ label, val, color, sub }) => (
        <div key={label} style={{ marginBottom: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#64748B", fontSize: "11px" }}>{label}</span>
            <span style={{ color, fontSize: "14px", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>{val}</span>
          </div>
          <p style={{ color: "#334155", fontSize: "10px", margin: "2px 0 0", fontFamily: "'IBM Plex Mono', monospace" }}>{sub}</p>
        </div>
      ))}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "10px", marginTop: "4px" }}>
        <p style={{ color: "#64748B", fontSize: "10px", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Per unit economics</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
          {[
            { lbl: "Price",   val: `$${d.unitPrice.toFixed(2)}` },
            { lbl: "Cost",    val: `$${d.costPerUnit.toFixed(2)}` },
            { lbl: "Profit",  val: `$${d.profitPerUnit.toFixed(2)}` },
          ].map(({ lbl, val }) => (
            <div key={lbl} style={{ background: "rgba(255,255,255,0.04)", borderRadius: "7px", padding: "6px 8px", textAlign: "center" }}>
              <p style={{ color: "#475569", fontSize: "9px", margin: "0 0 3px", fontWeight: 600 }}>{lbl}</p>
              <p style={{ color: "#CBD5E1", fontSize: "11px", fontWeight: 700, margin: 0, fontFamily: "'IBM Plex Mono', monospace" }}>{val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TABS = ["Revenue Breakdown", "Cost % of Revenue", "Profit per Unit"];

export default function ProductionCostChart() {
  const [tab, setTab] = useState(0);

  return (
    <div style={{
      background: "linear-gradient(160deg,#06090F 0%,#0C1322 60%,#080C16 100%)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "36px 20px",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ width: "100%", maxWidth: "820px" }}>
        <div style={{ marginBottom: "28px" }}>
          <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#334155", margin: "0 0 10px" }}>
            Nike · 2021–2023 · Cost Analysis
          </p>
          <h1 style={{ fontSize: "clamp(22px,4vw,28px)", fontWeight: 700, color: "#F1F5F9", margin: "0 0 6px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Production Cost vs Profit
          </h1>
          <p style={{ fontSize: "13px", color: "#475569", margin: 0 }}>
            Where every revenue dollar goes — across all product categories
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px", marginBottom: "24px" }}>
          {data.map((d) => {
            const p = PALETTE[d.product];
            const costRatio = d.costPerUnit / d.unitPrice;
            return (
              <div key={d.product} style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "14px",
                padding: "14px",
              }}>
                <p style={{ fontSize: "10px", color: "#475569", fontWeight: 700, margin: "0 0 10px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {d.short}
                </p>
                <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.07)", overflow: "hidden", marginBottom: "10px", display: "flex" }}>
                  <div style={{ width: `${costRatio * 100}%`, background: p.badgeText, opacity: 0.7, borderRadius: "3px 0 0 3px" }} />
                  <div style={{ flex: 1, background: p.profit, borderRadius: "0 3px 3px 0" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "10px", color: "#475569" }}>Cost/unit</span>
                  <span style={{ fontSize: "11px", color: p.badgeText, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>${d.costPerUnit.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "10px", color: "#475569" }}>Price/unit</span>
                  <span style={{ fontSize: "11px", color: "#94A3B8", fontWeight: 600, fontFamily: "'IBM Plex Mono', monospace" }}>${d.unitPrice.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "10px", color: "#475569" }}>Profit/unit</span>
                  <span style={{ fontSize: "11px", color: p.profit, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>${d.profitPerUnit.toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{
              padding: "7px 16px",
              borderRadius: "999px",
              border: `1px solid ${tab === i ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)"}`,
              background: tab === i ? "rgba(255,255,255,0.08)" : "transparent",
              color: tab === i ? "#F1F5F9" : "#475569",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "'IBM Plex Sans', sans-serif",
              transition: "all 0.15s",
            }}>{t}</button>
          ))}
        </div>

        <div style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "20px",
          padding: "28px 16px 16px",
        }}>
          <div style={{ display: "flex", gap: "20px", paddingLeft: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
            {tab === 0 && [
              { color: "#475569", label: "Production Cost ($B)" },
              { color: "#22C55E", label: "Profit ($B)" },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: color, display: "inline-block" }} />
                <span style={{ fontSize: "11px", color: "#64748B" }}>{label}</span>
              </div>
            ))}
            {tab === 1 && [{ color: "#F59E0B", label: "Cost as % of revenue (lower = better)" }].map(({ color, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: color, display: "inline-block" }} />
                <span style={{ fontSize: "11px", color: "#64748B" }}>{label}</span>
              </div>
            ))}
            {tab === 2 && [{ color: "#22C55E", label: "Profit earned per unit sold ($)" }].map(({ color, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: color, display: "inline-block" }} />
                <span style={{ fontSize: "11px", color: "#64748B" }}>{label}</span>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={300}>
            {tab === 0 ? (
              <ComposedChart data={data} margin={{ top: 24, right: 20, bottom: 8, left: 10 }} barCategoryGap="30%" barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="short" tick={{ fill: "#94A3B8", fontSize: 12, fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }} axisLine={{ stroke: "rgba(255,255,255,0.08)" }} tickLine={false} dy={6} />
                <YAxis tickFormatter={(v) => `$${v}B`} tick={{ fill: "#64748B", fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }} axisLine={false} tickLine={false}
                  label={{ value: "Amount ($B)", angle: -90, position: "insideLeft", offset: 12, style: { fill: "#475569", fontSize: 11, fontFamily: "'IBM Plex Sans', sans-serif" } }} width={60} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Bar dataKey="prodCost" name="Production Cost" radius={[5,5,0,0]} maxBarSize={52}>
                  {data.map((d) => <Cell key={d.product} fill={PALETTE[d.product].badgeText} fillOpacity={0.5} />)}
                  <LabelList dataKey="prodCost" position="top" formatter={(v) => `$${v.toFixed(0)}B`} style={{ fill: "#64748B", fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }} />
                </Bar>
                <Bar dataKey="profit" name="Profit" radius={[5,5,0,0]} maxBarSize={52}>
                  {data.map((d) => <Cell key={d.product} fill={PALETTE[d.product].profit} fillOpacity={0.85} />)}
                  <LabelList dataKey="profit" position="top" formatter={(v) => `$${v.toFixed(0)}B`} style={{ fill: "#94A3B8", fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }} />
                </Bar>
              </ComposedChart>
            ) : tab === 1 ? (
              <ComposedChart data={data} margin={{ top: 24, right: 20, bottom: 8, left: 10 }} barCategoryGap="38%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="short" tick={{ fill: "#94A3B8", fontSize: 12, fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }} axisLine={{ stroke: "rgba(255,255,255,0.08)" }} tickLine={false} dy={6} />
                <YAxis domain={[55, 72]} tickFormatter={(v) => `${v}%`} tick={{ fill: "#64748B", fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }} axisLine={false} tickLine={false}
                  label={{ value: "Cost as % of Revenue", angle: -90, position: "insideLeft", offset: 14, style: { fill: "#475569", fontSize: 11, fontFamily: "'IBM Plex Sans', sans-serif" } }} width={64} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <ReferenceLine y={data.reduce((s,d)=>s+d.costPct,0)/data.length} stroke="#94A3B8" strokeDasharray="4 2" strokeWidth={1.5}
                  label={{ value: `Avg ${(data.reduce((s,d)=>s+d.costPct,0)/data.length).toFixed(1)}%`, position: "right", style: { fill: "#64748B", fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" } }} />
                <Bar dataKey="costPct" name="Cost %" radius={[6,6,0,0]} maxBarSize={64}>
                  {data.map((d) => <Cell key={d.product} fill={PALETTE[d.product].badgeText} fillOpacity={0.75} />)}
                  <LabelList dataKey="costPct" position="top" formatter={(v) => `${v.toFixed(1)}%`} style={{ fill: "#94A3B8", fontSize: 11, fontWeight: 600, fontFamily: "'IBM Plex Mono', monospace" }} />
                </Bar>
              </ComposedChart>
            ) : (
              <ComposedChart data={data} margin={{ top: 24, right: 20, bottom: 8, left: 10 }} barCategoryGap="38%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="short" tick={{ fill: "#94A3B8", fontSize: 12, fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }} axisLine={{ stroke: "rgba(255,255,255,0.08)" }} tickLine={false} dy={6} />
                <YAxis tickFormatter={(v) => `$${v}`} tick={{ fill: "#64748B", fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }} axisLine={false} tickLine={false}
                  label={{ value: "Profit per Unit ($)", angle: -90, position: "insideLeft", offset: 14, style: { fill: "#475569", fontSize: 11, fontFamily: "'IBM Plex Sans', sans-serif" } }} width={60} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Bar dataKey="profitPerUnit" name="Profit/Unit" radius={[6,6,0,0]} maxBarSize={64}>
                  {data.map((d) => <Cell key={d.product} fill={PALETTE[d.product].profit} fillOpacity={0.85} />)}
                  <LabelList dataKey="profitPerUnit" position="top" formatter={(v) => `$${v.toFixed(2)}`} style={{ fill: "#94A3B8", fontSize: 11, fontWeight: 600, fontFamily: "'IBM Plex Mono', monospace" }} />
                </Bar>
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>

        <div style={{
          marginTop: "14px",
          background: "rgba(245,158,11,0.06)",
          border: "1px solid rgba(245,158,11,0.2)",
          borderRadius: "14px",
          padding: "16px 20px",
        }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
            <div style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "8px", padding: "6px 10px", flexShrink: 0 }}>
              <span style={{ fontSize: "11px", color: "#FCD34D", fontWeight: 700, letterSpacing: "0.06em" }}>⚠ ACCESSORIES</span>
            </div>
            <div>
              <p style={{ fontSize: "13px", color: "#CBD5E1", margin: "0 0 6px", lineHeight: 1.6 }}>
                <strong style={{ color: "#FCD34D" }}>Most units sold (28.15B) yet lowest profit per unit at just $3.32.</strong> At an average price of $10.86, production alone consumes $6.27 — leaving only <span style={{ color: "#FCD34D", fontFamily: "'IBM Plex Mono', monospace" }}>$4.59</span> to cover all other costs.
              </p>
              <p style={{ fontSize: "12px", color: "#64748B", margin: 0, lineHeight: 1.6 }}>
                Compare to Basketball Shoes: same ballpark unit volume (27.17B) but <span style={{ color: "#4ADE80", fontFamily: "'IBM Plex Mono', monospace" }}>$14.05 profit/unit</span> — <strong style={{ color: "#94A3B8" }}>4.2× more profitable per item sold.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
