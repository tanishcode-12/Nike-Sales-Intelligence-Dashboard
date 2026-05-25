<div align="center">

# 👟 SwooshIQ — Nike Sales Intelligence Dashboard

### *Turning 3 years of Nike sales data into actionable business insights*

[![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Recharts](https://img.shields.io/badge/Recharts-2.x-FF6B6B?style=for-the-badge)](https://recharts.org)
[![Claude AI](https://img.shields.io/badge/Claude-AI%20Assisted-D97706?style=for-the-badge)](https://claude.ai)
[![Course Project](https://img.shields.io/badge/Data%20Analytics-Course%20Project-22C55E?style=for-the-badge)]()

<br/>

> 📊 **$2.80 Trillion** in revenue analyzed &nbsp;·&nbsp; 🗓️ **3 Years** of data (2021–2023) &nbsp;·&nbsp; 🧠 **10 Key Insights** uncovered &nbsp;·&nbsp; 📈 **4 Interactive Dashboards** built

</div>

---

## 📌 Table of Contents

- [🏷️ Project Name](#️-why-swooshiq)
- [🗂️ Project Structure](#️-project-structure)
- [💬 AI Prompts Used](#-ai-prompts-used)
- [📐 Dataset Overview](#-dataset-overview)
- [🔍 Key Findings](#-key-findings)
- [📊 Visualizations](#-visualizations)
- [🚀 Getting Started](#-getting-started)
- [🛠️ Tech Stack](#️-tech-stack)
- [📚 Course Context](#-course-context)

---

## 🏷️ Why SwooshIQ?

> **Swoosh** — Nike's iconic logo & brand identity  
> **IQ** — Intelligence, insight, analytical depth

*SwooshIQ* captures what this project does: applies data intelligence to one of the world's most iconic brands to surface insights that go far beyond surface-level numbers.

---

## 🗂️ Project Structure

```
SwooshIQ/
│
├── 📁 data/
│   └── nike_sales_analysis.csv          # Raw dataset — 619 rows × 13 columns
│
├── 📁 notebooks/
│   ├── analysis_basic.py                # Revenue, profit, time period, top products
│   └── analysis_trends.py              # YoY changes, channel mix, regional shifts
│
├── 📁 visualizations/
│   ├── DualAxisChart.jsx                # 📊 Revenue, Profit & Units — dual-axis chart
│   ├── ProfitMarginChart.jsx            # 🎯 Horizontal lollipop margin chart
│   ├── ProductionCostChart.jsx          # 💰 3-tab cost breakdown
│   └── NikeDashboard.jsx               # 🖥️ Full 6-tab executive dashboard
│
├── 📄 Nike_Sales_Prompts.docx          # All 7 AI prompts + output summaries
└── 📄 README.md
```

---

## 💬 AI Prompts Used

> All prompts are fully documented with goals and outputs in **📄 Nike_Sales_Prompts.docx**

| # | 🎯 Goal | 💡 What Was Built |
|---|---|---|
| 01 | Initial Data Assessment | Shape, column types, null check |
| 02 | Basic Business Analysis | Revenue, profit, trends snapshot |
| 03 | Dual-Axis Bar Chart | Revenue + Profit + Units in one chart |
| 04 | Profit Margin Visualization | Lollipop chart with tier coloring |
| 05 | Production Cost Deep Dive | Cost vs profit per unit analysis |
| 06 | Hidden Trends & Patterns | 10 ranked business insights |
| 07 | Executive Dashboard | 6-tab interactive React dashboard |

---

## 📐 Dataset Overview

| 🔢 Property | 📋 Value |
|---|---|
| Rows | 619 |
| Columns | 13 |
| 📅 Time Period | Jan 2021 – Dec 2023 |
| 🔁 Frequency | Monthly (end-of-month) |
| ❌ Missing Values | **None** |

**🏷️ Columns:**
`Date` · `Product` · `Region` · `Channel` · `Units_Sold` · `Unit_Price` · `Production_Cost` · `Marketing_Spend` · `Customer_Rating` · `Return_Rate` · `Revenue` · `Profit` · `Profit_Margin`

---

## 🔍 Key Findings

### 💰 Financial Overview

| Metric | Value |
|---|---|
| 💵 Total Revenue | **$2.80 Trillion** |
| 💚 Total Profit | **$1.02 Trillion** |
| 📉 Blended Margin | **36.4%** |
| 🏆 Peak Month | **Oct 2023 — $123.2B** |

---

### 🏆 Product Performance

| 🥇 Rank | Product | Revenue | Profit | Margin |
|---|---|---|---|---|
| 🥇 1st | Basketball Shoes | $1.01T | $381.8B | 37.82% |
| 🥈 2nd | Running Shoes | $766.6B | $288.8B | 37.67% |
| 🥉 3rd | Athletic Apparel | $728.9B | $254.3B | 34.89% |
| 4️⃣ 4th | Accessories | $292.8B | $93.5B | 31.95% |

---

### 📈 Top 10 Business Insights

> Ranked by strategic importance

| # | 💡 Insight | 🔎 Finding |
|---|---|---|
| 🔴 1 | **Boom-and-Bust Risk** | Basketball Shoes +33% in 2022 → -23.4% in 2023 |
| 🔴 2 | **2023 Portfolio Contraction** | All 4 categories declined year-over-year |
| 🟢 3 | **DTC is the Margin Engine** | 40.5% DTC margin vs 30.6% Wholesale; share growing |
| 🟡 4 | **Double-Peak Seasonality** | Revenue peaks Aug–Oct and March every year |
| 🟠 5 | **Accessories Channel Flip** | Shifted to Wholesale in 2022, compressing already thin margins |
| 🟢 6 | **APLA is the Only Growth Region** | Revenue share 17.6% → 22% → 24% — 3 consecutive years up |
| 🔵 7 | **Customer Ratings Improving** | Rising across all products but not driving revenue |
| 🟠 8 | **Basketball Return Rate Rising** | 4.99% → 5.28% — quality signal on the top product |
| 🔵 9 | **Margins Are Frozen** | 36.1% (2021) → 36.3% (2023) — zero operating leverage |
| 🟣 10 | **Products Move Independently** | Near-zero correlation; each needs its own demand model |

---

## 📊 Visualizations

| 📁 File | 📊 Chart Type | 👁️ What It Shows |
|---|---|---|
| `DualAxisChart.jsx` | Grouped Bar + Line | Revenue, Profit & Units per category |
| `ProfitMarginChart.jsx` | Horizontal Lollipop | Margin comparison with avg reference line |
| `ProductionCostChart.jsx` | 3-Tab Bar Chart | Cost breakdown · Cost % · Profit per unit |
| `NikeDashboard.jsx` | 6-Tab Dashboard | Executive overview + 4 insights + recommendations |

---

## 🚀 Getting Started

### 🐍 Run the Python Analysis

```bash
# Install dependencies
pip install pandas numpy

# Run basic analysis (revenue, profit, top products)
python notebooks/analysis_basic.py

# Run deep-dive trends analysis
python notebooks/analysis_trends.py
```

### ⚛️ View the React Dashboards

Each `.jsx` file is a **standalone React component** — no backend needed.

```bash
# 1. Create a new React project (if you don't have one)
npx create-react-app swooshiq
cd swooshiq

# 2. Install Recharts
npm install recharts

# 3. Drop any .jsx file from /visualizations into /src
# 4. Import and render it in App.js
npm start
```

> 💡 **Quickest option:** Paste any `.jsx` file directly into [CodeSandbox](https://codesandbox.io) — it works instantly in the browser with no setup.

> 🖥️ **Start here:** `NikeDashboard.jsx` contains all 4 insights + recommendations in one file.

---

## 🛠️ Tech Stack

| 🔧 Tool | 🎯 Purpose |
|---|---|
| 🐍 Python + Pandas | Data loading, cleaning, EDA |
| ⚛️ React 18 | Component-based UI |
| 📊 Recharts | Chart rendering |
| 🎨 Inline CSS | Styling (zero dependencies) |
| 🤖 Claude AI | AI-assisted analysis & visualization generation |

---

## 📚 Course Context

This project was completed as part of a **Data Analytics Course** and demonstrates:

| ✅ Skill | 📋 How It's Shown |
|---|---|
| 🔍 Exploratory Data Analysis | `analysis_basic.py` + `analysis_trends.py` |
| 📊 Data Visualization | 4 React chart components |
| 💼 Business KPI Interpretation | Executive dashboard + 10 ranked insights |
| 🤖 AI-Assisted Workflows | 7 structured Claude AI prompts |
| 📝 Documentation | This README + `Nike_Sales_Prompts.docx` |

---

<div align="center">

**Built with 🤖 Claude AI &nbsp;·&nbsp; Data Analytics Course Project &nbsp;·&nbsp; 2024**

*If you found this useful, give it a ⭐ on GitHub!*

</div>
