import React from 'react';
import { AppShell } from '../components/AppShell';
import { LineChart, TrendingUp, Globe, Database } from 'lucide-react';

/* NOTE: The SOW explicitly lists "Development of dashboards or
   visualization interfaces (BI, QuickSight, Tableau)" under
   Out of Scope. This page is a lightweight landing/summary view
   only — deep analytics belong in a future BI layer, not here. */
const STAT_CARDS = [
  { label: 'Portals Ingesting', value: '8', icon: Globe, accent: 'text-emerald-400', iconBg: 'bg-emerald-500/15' },
  { label: 'Images Processed (W30)', value: '2,840', icon: Database, accent: 'text-amber-400', iconBg: 'bg-amber-500/15' },
  { label: 'Emerging Trends', value: '6', icon: TrendingUp, accent: 'text-purple-400', iconBg: 'bg-purple-500/15' },
  { label: 'Active Queries Today', value: '23', icon: LineChart, accent: 'text-blue-400', iconBg: 'bg-blue-500/15' },
];

const Dashboard: React.FC = () => {
  return (
    <AppShell title="Dashboard" subtitle="LATAM Region · 2026-W30">
      <div className="p-6 max-w-[1100px] mx-auto space-y-6">
        <div>
          <h2 className="text-[22px] font-bold text-white">Weekly Overview</h2>
          <p className="text-[14px] text-zinc-400 mt-1">
            Summary of this week's ingestion, processing, and agent activity across all 8 portals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STAT_CARDS.map((c) => (
            <div key={c.label} className="p-5 rounded-[14px] border border-zinc-800/80 bg-zinc-900/40">
              <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center mb-3 ${c.iconBg}`}>
                <c.icon size={17} className={c.accent} />
              </div>
              <div className="text-[24px] font-bold text-white">{c.value}</div>
              <div className="text-[13px] text-zinc-500 mt-1">{c.label}</div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-[14px] border border-zinc-800/80 bg-zinc-900/40 text-[14px] text-zinc-400 leading-relaxed">
          For detailed trend queries, temporal comparisons, and design/pattern breakdowns, use the{' '}
          <span className="text-blue-400 font-semibold">AI Chat Agent</span> — it's connected to Athena over
          the full weekly-partitioned Parquet data lake described in the SOW's data pipeline.
        </div>
      </div>
    </AppShell>
  );
};

export default Dashboard;
