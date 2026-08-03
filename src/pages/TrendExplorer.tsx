import React from 'react';
import { AppShell } from '../components/AppShell';
import { ImagePlus } from 'lucide-react';

/* Placeholder — intended to browse raw + classified catalog images
   from S3 (raw-images/{week}/{portal}/{category}/) alongside the
   Bedrock-extracted attributes, per SOW Phase 2/3. */
const TrendExplorer: React.FC = () => {
  return (
    <AppShell title="Visual Explorer" subtitle="Browse classified catalog images">
      <div className="h-full flex flex-col items-center justify-center gap-3 px-6">
        <div className="w-14 h-14 rounded-[14px] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <ImagePlus size={24} className="text-emerald-400" />
        </div>
        <h2 className="text-[18px] font-bold text-white">Visual Explorer</h2>
        <p className="text-[14px] text-zinc-400 text-center max-w-[420px]">
          Browse raw and classified catalog images from the S3 ingestion layer, with the Bedrock Nova
          Pro 2 attribute extraction (color, pattern, design) shown alongside each image.
        </p>
      </div>
    </AppShell>
  );
};

export default TrendExplorer;
