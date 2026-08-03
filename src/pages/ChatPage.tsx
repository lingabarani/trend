import React, { useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  LayoutGrid,
  MessageSquare,
  LineChart,
  ImagePlus,
  FileText,
  Plus,
  Search,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Settings as SettingsIcon,
  CalendarClock,
  RotateCw,
  Palette,
  Shirt,
  BarChart3,
  Tag,
  Send,
  Info,
  MessageCircle,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

/* ═══════════════════════════════════════════════════════════════════
   AI Chat Agent — Blacksmith Trends AI
   Bedrock Fashion Assistant dashboard (SOW Phase 4 — Trends
   Conversational Agent + Frontend). Suggestion prompts are drawn
   from the SOW §4.3 "Supported sample queries" list.
   ═══════════════════════════════════════════════════════════════════ */

const NAV_ITEMS = [
  { key: 'dashboard', path: '/dashboard', labelKey: 'nav.dashboard', icon: LayoutGrid },
  { key: 'chat', path: '/chat', labelKey: 'nav.chat', icon: MessageSquare },
  { key: 'analytics', path: '/analytics', labelKey: 'nav.analytics', icon: LineChart },
  { key: 'explorer', path: '/explorer', labelKey: 'nav.explorer', icon: ImagePlus },
  { key: 'reports', path: '/reports', labelKey: 'nav.reports', icon: FileText },
] as const;

const CHAT_HISTORY = [
  { id: 'h1', title: 'Animal print evolution' },
  { id: 'h2', title: 'ASOS vs Zara necklines' },
  { id: 'h3', title: 'Winter coats LATAM' },
];

const SUGGESTIONS = [
  {
    id: 'color',
    title: 'Color Trends',
    question: "What are the predominant colors in women's jackets this week?",
    icon: Palette,
    accent: 'text-blue-400',
    iconBg: 'bg-blue-500/15',
  },
  {
    id: 'pattern',
    title: 'Pattern Evolution',
    question: 'How has animal print usage changed over the last 4 weeks?',
    icon: Shirt,
    accent: 'text-purple-400',
    iconBg: 'bg-purple-500/15',
  },
  {
    id: 'portal',
    title: 'Portal Comparison',
    question: 'Compare neckline trends between ASOS and Zara',
    icon: BarChart3,
    accent: 'text-emerald-400',
    iconBg: 'bg-emerald-500/15',
  },
  {
    id: 'design',
    title: 'Design Details',
    question: 'What design construction details are on the rise in blouses?',
    icon: Tag,
    accent: 'text-amber-400',
    iconBg: 'bg-amber-500/15',
  },
];

const ChatPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [historySearch, setHistorySearch] = useState('');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'agent'; content: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredHistory = CHAT_HISTORY.filter((h) =>
    h.title.toLowerCase().includes(historySearch.toLowerCase())
  );

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : 'JC';

  const handleSend = useCallback(
    (text?: string) => {
      const content = (text ?? inputValue).trim();
      if (!content) return;
      setMessages((prev) => [...prev, { role: 'user', content }]);
      setInputValue('');
      // Wire to POST /conversations/{id}/messages per SOW §4.2 when the
      // API Gateway + Lambda + Bedrock Agent backend is available.
    },
    [inputValue]
  );

  const handleNewSession = useCallback(() => {
    setMessages([]);
    setActiveChatId(null);
    setInputValue('');
  }, []);

  return (
    <div className="h-screen w-full flex bg-space-950 text-zinc-100 font-sans overflow-hidden">
      {/* ═══ SIDEBAR ═══ */}
      <AnimatePresence initial={false}>
        {!sidebarCollapsed && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 322, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="shrink-0 h-full border-r border-zinc-800/60 bg-space-925 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 pt-6 pb-5">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-[12px] bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[16px] text-white leading-tight truncate">Blacksmith</div>
                  <div className="text-[11px] font-bold text-blue-500 uppercase tracking-[0.1em] leading-tight">TRENDS AI</div>
                </div>
              </div>
              <button
                onClick={() => setSidebarCollapsed(true)}
                aria-label="Collapse sidebar"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors shrink-0"
              >
                <ChevronLeft size={16} />
              </button>
            </div>

            <div className="px-5">
              <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-3">{t('nav.platformMenu')}</div>
              <nav className="space-y-1" aria-label="Platform navigation">
                {NAV_ITEMS.map(({ key, path, labelKey, icon: Icon }) => {
                  const active = location.pathname === path;
                  return (
                    <button
                      key={key}
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

              <button
                onClick={handleNewSession}
                className="w-full flex items-center justify-center gap-2 mt-4 mb-6 text-[13px] font-semibold text-blue-500 hover:text-blue-400 transition-colors"
              >
                <Plus size={15} />
                <span>{t('nav.newAnalysis')}</span>
              </button>
            </div>

            <div className="px-5 flex-1 min-h-0 flex flex-col">
              <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-3">{t('nav.chatHistory')}</div>
              <div className="relative mb-3">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  placeholder={t('nav.searchConversations') ?? ''}
                  className="w-full h-9 pl-9 pr-3 rounded-[10px] bg-zinc-900/70 border border-zinc-800 text-[13px] text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700"
                />
              </div>

              <div className="space-y-1 overflow-y-auto flex-1 scroll-thin">
                {filteredHistory.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setActiveChatId(h.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[13.5px] font-medium text-left transition-colors ${
                      activeChatId === h.id ? 'bg-zinc-800/70 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                    }`}
                  >
                    <MessageCircle size={15} className="shrink-0 text-zinc-500" />
                    <span className="truncate">{h.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-zinc-800/60 px-5 py-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[13.5px] font-semibold text-zinc-200">Nova Pro 2 Agent</span>
                <span className="flex items-center gap-1.5 text-[12px] font-semibold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {t('nav.online')}
                </span>
              </div>
              <button
                onClick={() => navigate('/settings')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-[10px] border border-zinc-800 text-[13.5px] font-medium text-zinc-300 hover:bg-zinc-800/50 hover:border-zinc-700 transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <SettingsIcon size={15} className="text-zinc-500" />
                  {t('nav.settings')}
                </span>
                <ChevronRight size={15} className="text-zinc-500" />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="flex-1 min-w-0 h-full flex flex-col">
        <header className="shrink-0 h-[68px] px-6 flex items-center gap-3 border-b border-zinc-800/60">
          {sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(false)}
              aria-label="Expand sidebar"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors shrink-0"
            >
              <ChevronRight size={16} />
            </button>
          )}

          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              placeholder={t('chat.searchPlaceholder') ?? ''}
              className="w-full h-10 pl-10 pr-14 rounded-[10px] bg-zinc-900/70 border border-zinc-800 text-[13.5px] text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono text-zinc-500 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-700/60">⌘K</span>
          </div>

          <button className="hidden md:flex items-center gap-2 h-10 px-3.5 rounded-[10px] border border-zinc-800 bg-zinc-900/50 text-[13.5px] text-zinc-300 hover:border-zinc-700 transition-colors shrink-0">
            <CalendarClock size={15} className="text-zinc-500" />
            <span className="font-bold text-zinc-100">2026-W30</span>
            <span className="w-px h-4 bg-zinc-700 mx-1" />
            <span>{t('chat.region')}</span>
            <ChevronDown size={14} className="text-zinc-500" />
          </button>

          <div className="hidden lg:flex items-center gap-2 text-[13px] text-zinc-400 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>
              Scrapers: <span className="text-emerald-400 font-semibold">HBX, Vogue</span> {t('chat.scrapersActive')}
            </span>
          </div>

          <button className="hidden sm:flex items-center gap-1.5 h-10 px-3.5 rounded-[10px] border border-zinc-800 bg-zinc-900/50 text-[13.5px] font-semibold text-zinc-200 hover:border-zinc-700 transition-colors shrink-0">
            <Plus size={15} className="text-blue-400" />
            {t('nav.newAnalysis')}
          </button>

          <div className="relative group shrink-0">
            <button className="flex items-center gap-1">
              <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white text-[13px] font-bold">
                {initials}
              </span>
              <ChevronDown size={14} className="text-zinc-500" />
            </button>
            <div className="absolute right-0 mt-2 w-40 rounded-[10px] border border-zinc-800 bg-zinc-900 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="w-full text-left px-3.5 py-2.5 text-[13px] font-medium text-zinc-300 hover:bg-zinc-800 transition-colors rounded-[10px]"
              >
                Sign out
              </button>
            </div>
          </div>
        </header>

        <div className="shrink-0 px-6 py-4 flex items-center justify-between border-b border-zinc-800/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shrink-0">
              <Sparkles size={17} className="text-white" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-white leading-tight">{t('chat.assistantName')}</div>
              <div className="text-[12.5px] text-zinc-500 flex items-center gap-1.5 leading-tight mt-0.5">
                <span>{t('chat.assistantStack')}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {t('chat.connected')}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleNewSession}
            className="flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] border border-zinc-800 text-[13px] font-semibold text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/40 transition-colors"
          >
            <RotateCw size={14} />
            {t('chat.newSession')}
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto scroll-thin">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center px-6 py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-16 h-16 rounded-[18px] bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6"
              >
                <Sparkles className="w-7 h-7 text-white" />
              </motion.div>

              <h1 className="text-[26px] font-bold text-white text-center">{t('chat.heroTitle')}</h1>
              <p className="text-[15px] text-zinc-400 text-center max-w-[560px] mt-3 leading-relaxed">{t('chat.heroSubtitle')}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-9 max-w-[760px] w-full">
                {SUGGESTIONS.map((s, idx) => (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 + idx * 0.05 }}
                    onClick={() => handleSend(s.question)}
                    className="text-left p-4 rounded-[14px] border border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className={`w-8 h-8 rounded-[9px] flex items-center justify-center ${s.iconBg}`}>
                        <s.icon size={16} className={s.accent} />
                      </div>
                      <span className={`text-[14.5px] font-bold ${s.accent}`}>{s.title}</span>
                    </div>
                    <p className="text-[13.5px] text-zinc-400 leading-snug">{s.question}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-[760px] mx-auto px-6 py-8 space-y-4">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-[14px] text-[14px] leading-relaxed ${
                      m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-zinc-900/70 border border-zinc-800 text-zinc-200'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-zinc-800/60 px-6 py-4">
          <div className="max-w-[760px] mx-auto">
            <div className="flex items-center gap-3 h-14 px-4 rounded-[14px] border border-zinc-800 bg-zinc-900/50">
              <span className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                <Sparkles size={13} className="text-zinc-400" />
              </span>
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('chat.inputPlaceholder') ?? ''}
                className="flex-1 bg-transparent text-[14px] text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                aria-label="Send message"
                className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center shrink-0 transition-colors disabled:opacity-40"
                disabled={!inputValue.trim()}
              >
                <Send size={15} className="text-zinc-200" />
              </button>
            </div>

            <p className="flex items-center justify-center gap-2 text-[12px] text-zinc-500 mt-3.5">
              <Info size={13} className="shrink-0" />
              {t('chat.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
