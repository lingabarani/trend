import React from 'react';
import { AppShell } from '../components/AppShell';
import { useTheme } from '../store/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const Settings: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <AppShell title="Settings">
      <div className="p-6 max-w-[640px] mx-auto space-y-4">
        <div className="p-5 rounded-[14px] border border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between">
          <div>
            <div className="text-[14px] font-semibold text-zinc-100">Appearance</div>
            <div className="text-[13px] text-zinc-500 mt-0.5">Switch between dark and light theme.</div>
          </div>
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-[10px] border border-zinc-800 bg-zinc-900/60 flex items-center justify-center text-zinc-300 hover:border-zinc-700 transition-colors"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Moon size={16} className="text-amber-400" /> : <Sun size={16} className="text-amber-500" />}
          </button>
        </div>

        <div className="p-5 rounded-[14px] border border-zinc-800/80 bg-zinc-900/40">
          <div className="text-[14px] font-semibold text-zinc-100">Session</div>
          <div className="text-[13px] text-zinc-500 mt-0.5">
            Session persistence and conversation TTL are configured in DynamoDB per SOW §4.2.
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Settings;
