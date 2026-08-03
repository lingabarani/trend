import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  LayoutGrid,
  MessageSquare,
  LineChart,
  ImagePlus,
  FileText,
  ChevronRight,
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/dashboard', labelKey: 'nav.dashboard', icon: LayoutGrid },
  { path: '/chat', labelKey: 'nav.chat', icon: MessageSquare },
  { path: '/analytics', labelKey: 'nav.analytics', icon: LineChart },
  { path: '/explorer', labelKey: 'nav.explorer', icon: ImagePlus },
  { path: '/reports', labelKey: 'nav.reports', icon: FileText },
] as const;

/* Lightweight shell reused by the stub pages (Dashboard, Analytics,
   Visual Explorer, Settings) so navigation stays consistent across
   the app. ChatPage implements its own richer version of this same
   sidebar since it also needs the collapsible + chat-history panel. */
export const AppShell: React.FC<{ children: React.ReactNode; title: string; subtitle?: string }> = ({
  children,
  title,
  subtitle,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen w-full flex bg-space-950 text-zinc-100 font-sans overflow-hidden">
      <aside className="w-[322px] shrink-0 h-full border-r border-zinc-800/60 bg-space-925 flex flex-col">
        <div className="flex items-center gap-3 px-5 pt-6 pb-5">
          <div className="w-10 h-10 rounded-[12px] bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-[16px] text-white leading-tight">Blacksmith</div>
            <div className="text-[11px] font-bold text-blue-500 uppercase tracking-[0.1em] leading-tight">TRENDS AI</div>
          </div>
        </div>

        <div className="px-5">
          <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-3">{t('nav.platformMenu')}</div>
          <nav className="space-y-1">
            {NAV_ITEMS.map(({ path, labelKey, icon: Icon }) => {
              const active = location.pathname === path;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-[14px] font-semibold transition-colors ${
                    active
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 border border-transparent'
                  }`}
                >
                  <Icon size={17} className="shrink-0" />
                  <span className="truncate">{t(labelKey)}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="flex-1 min-w-0 h-full flex flex-col">
        <header className="shrink-0 h-[68px] px-6 flex items-center border-b border-zinc-800/60">
          <h1 className="text-[16px] font-bold text-white">{title}</h1>
          {subtitle && (
            <>
              <ChevronRight size={14} className="mx-2 text-zinc-600" />
              <span className="text-[14px] text-zinc-400">{subtitle}</span>
            </>
          )}
        </header>
        <div className="flex-1 min-h-0 overflow-y-auto scroll-thin">{children}</div>
      </div>
    </div>
  );
};
