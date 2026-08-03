import React from 'react';
import { AppShell } from '../components/AppShell';
import { FileText } from 'lucide-react';

const WeeklyReports: React.FC = () => {
  return (
    <AppShell title="Weekly Reports">
      <div className="h-full flex flex-col items-center justify-center gap-3 px-6">
        <div className="w-14 h-14 rounded-[14px] bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <FileText size={24} className="text-amber-400" />
        </div>
        <h2 className="text-[18px] font-bold text-white">Weekly Reports</h2>
        <p className="text-[14px] text-zinc-400 text-center max-w-[420px]">
          Auto-generated weekly trend summaries, one per ISO week, aggregating the Athena trend
          tables into a shareable snapshot per the SOW's weekly aggregation process.
        </p>
      </div>
    </AppShell>
  );
};

export default WeeklyReports;
