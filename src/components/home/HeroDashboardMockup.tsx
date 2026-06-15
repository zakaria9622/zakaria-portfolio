"use client";

import { type ReactElement } from "react";
import { motion } from "framer-motion";
import { Activity, BarChart3, TrendingUp } from "lucide-react";

/** Real portfolio KPIs — sourced from project analyses */
const heroKpis = [
  { label: "Profit margin", value: "10.42%", delta: "Profit Leak" },
  { label: "Revenue analyzed", value: "€2.05M", delta: "12K orders" },
  { label: "Users in funnel", value: "3M+", delta: "Funnel Analysis" },
  { label: "VIP revenue share", value: "75.4%", delta: "RFM Segmentation" },
];

const funnelBars = [
  { stage: "View", pct: 100, opacity: "bg-electric-500" },
  { stage: "Cart", pct: 42, opacity: "bg-electric-400/80" },
  { stage: "Purchase", pct: 18, opacity: "bg-electric-300/60" },
];

const marginDriverBars = [
  { label: "Baseline", h: 88, tone: "from-electric-500 to-electric-400" },
  { label: "Discount impact", h: 52, tone: "from-electric-600/90 to-electric-500/70" },
  { label: "Loss-making orders", h: 34, tone: "from-amber-500/80 to-orange-500/60" },
];

/** Revenue share — from RFM project KPIs */
const rfmSegments = [
  { name: "VIP", pct: 75.4, color: "stroke-electric-400" },
  { name: "Other", pct: 21.65, color: "stroke-electric-500/50" },
  { name: "Lost", pct: 2.95, color: "stroke-slate-600" },
];

function MiniKpi({
  label,
  value,
  delta,
  delay,
}: {
  label: string;
  value: string;
  delta: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="home-glass-kpi rounded-lg border border-white/10 bg-white/[0.07] p-3 backdrop-blur-md"
    >
      <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-0.5 font-kpi text-lg font-bold tabular-nums text-white">
        {value}
      </p>
      <p className="mt-1 truncate font-mono text-[10px] text-electric-400/90">{delta}</p>
    </motion.div>
  );
}

export function HeroDashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      <div className="home-dashboard-glow pointer-events-none absolute -inset-4 rounded-3xl" />

      <div className="home-dashboard-frame relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-electric-500/[0.08] p-4 shadow-2xl shadow-electric-500/10 backdrop-blur-xl md:p-5">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative mb-4 flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-electric-500/20">
              <BarChart3 className="h-4 w-4 text-electric-400" />
            </div>
            <div>
              <p className="font-heading text-xs font-semibold leading-tight text-white">
                Portfolio Analytics
              </p>
              <p className="font-mono text-[10px] text-slate-500">Live project KPIs</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] font-semibold leading-none text-emerald-300">Active</span>
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-2">
          {heroKpis.map((kpi, i) => (
            <MiniKpi key={kpi.label} {...kpi} delay={0.25 + i * 0.08} />
          ))}
        </div>

        <div className="relative mt-4 grid gap-3 sm:grid-cols-2">
          <div className="home-glass-panel rounded-xl border border-white/10 bg-navy-950/40 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Conversion funnel
              </p>
              <Activity className="h-3.5 w-3.5 text-electric-400" />
            </div>
            <div className="space-y-2">
              {funnelBars.map((bar) => (
                <div key={bar.stage} className="flex items-center gap-2">
                  <span className="w-14 font-mono text-[10px] text-slate-400">{bar.stage}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${bar.pct}%` }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className={`h-full rounded-full ${bar.opacity}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2 font-mono text-[10px] text-slate-500">
              Friction: view → cart
            </p>
          </div>

          <div className="home-glass-panel flex flex-col rounded-xl border border-white/10 bg-navy-950/40 p-3.5">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Margin drivers
              </p>
              <TrendingUp className="h-3.5 w-3.5 text-electric-400" />
            </div>

            <div className="relative rounded-lg border border-white/5 bg-navy-950/60 px-2 pb-2 pt-3">
              <div className="absolute inset-x-2 top-3 flex flex-col justify-between h-[72px] pointer-events-none">
                {[0, 1, 2].map((line) => (
                  <div
                    key={line}
                    className="border-t border-dashed border-white/[0.06]"
                  />
                ))}
              </div>

              <div className="relative flex h-[72px] items-end justify-center gap-3 sm:gap-4">
                {marginDriverBars.map((bar, i) => (
                  <div
                    key={bar.label}
                    className="flex min-w-0 flex-1 max-w-[72px] flex-col items-center"
                  >
                    <div className="flex h-[72px] w-full items-end justify-center">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${bar.h}%` }}
                        transition={{ duration: 0.65, delay: 0.45 + i * 0.1 }}
                        className={`w-7 shrink-0 rounded-t-sm bg-gradient-to-t shadow-sm sm:w-8 ${bar.tone}`}
                        style={{ maxHeight: "72px" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-2.5 grid grid-cols-3 gap-1">
              {marginDriverBars.map((bar) => (
                <p
                  key={bar.label}
                  className="text-center font-mono text-[8px] leading-snug text-slate-500 sm:text-[9px]"
                >
                  {bar.label}
                </p>
              ))}
            </div>

            <div className="mt-3 rounded-lg border border-amber-500/25 bg-gradient-to-r from-amber-500/10 to-orange-500/5 px-2.5 py-2">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-wider text-amber-200/70">
                Key metric
              </p>
              <p className="mt-0.5 font-kpi text-sm font-bold tabular-nums text-amber-100">
                16.01%
                <span className="ml-1 text-[10px] font-medium text-slate-400">
                  loss-making order rate
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-3 home-glass-panel rounded-xl border border-white/10 bg-navy-950/40 p-3">
          <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            RFM revenue concentration
          </p>
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                {rfmSegments.reduce(
                  (acc, seg) => {
                    const offset = acc.offset;
                    const dash = (seg.pct / 100) * 100;
                    acc.elements.push(
                      <circle
                        key={seg.name}
                        cx="18"
                        cy="18"
                        r="15.9"
                        fill="none"
                        strokeWidth="3"
                        strokeDasharray={`${dash} ${100 - dash}`}
                        strokeDashoffset={-offset}
                        className={seg.color}
                      />
                    );
                    acc.offset += dash;
                    return acc;
                  },
                  { offset: 0, elements: [] as ReactElement[] }
                ).elements}
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-kpi text-[9px] font-bold text-white">
                VIP
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-1.5">
              {rfmSegments.map((s) => (
                <div key={s.name} className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] text-slate-400">{s.name} revenue</span>
                  <span className="font-kpi text-[10px] font-bold tabular-nums text-white">
                    {s.pct}%
                  </span>
                </div>
              ))}
              <p className="font-mono text-[9px] text-slate-600">27.9% customers → 75.4% revenue</p>
            </div>
          </div>
        </div>

        <div className="relative mt-3 flex gap-2 overflow-hidden rounded-lg border border-electric-500/20 bg-electric-500/5 px-3 py-2">
          <p className="truncate font-mono text-[10px] text-slate-400">
            <span className="font-semibold text-electric-300">Insight:</span>{" "}
            Margin leak in Electronics/EU · view-to-cart friction · VIP = 75.4% revenue
          </p>
        </div>
      </div>
    </motion.div>
  );
}
