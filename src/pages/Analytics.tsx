import React from 'react';
import { AppShell } from '../components/AppShell';
import { LineChart } from 'lucide-react';

/* Placeholder — the real implementation queries the Glue-cataloged
   Parquet trend tables via Athena and renders weekly variation
   (strong uptrend / uptrend / stable / downtrend) per SOW §Phase 3. */
const Analytics: React.FC = () => {
  return (
    <AppShell title="Trend Analytics" subtitle="Weekly variation by color / pattern / design family">
      <div className="h-full flex flex-col items-center justify-center gap-3 px-6">
        <div className="w-14 h-14 rounded-[14px] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <LineChart size={24} className="text-blue-400" />
        </div>
        <h2 className="text-[18px] font-bold text-white">Trend Analytics</h2>
        <p className="text-[14px] text-zinc-400 text-center max-w-[420px]">
          Weekly color/pattern/design variation charts, sourced from the Athena-queried Parquet trend
          tables, render here once the processing pipeline (SOW Phase 3) is connected.
        </p>
      </div>
    </AppShell>
  );
};

export default Analytics;
