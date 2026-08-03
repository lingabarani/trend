import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  Sun,
  Moon,
  Zap,
  TrendingUp,
  Image as ImageIcon,
  Globe,
  Database,
  Clock,
  MessageSquare,
  Headphones,
  BookOpen,
  Loader2,
  Eye,
  EyeOff,
  Cloud,
  ShieldCheck,
  CalendarClock,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useTheme } from '../store/ThemeContext';
import { Input } from '../components/ui/Input';
import { LanguageDropdown } from '../components/ui/LanguageDropdown';

/* ═══════════════════════════════════════════════════════════════════
   Login Page — Blacksmith Trends AI
   Production Enterprise SaaS Authentication Experience
   Background: deep space indigo (space-950 / #0B0D17) per design spec
   — never pure black, never flat zinc.
   ═══════════════════════════════════════════════════════════════════ */

/* ── Floating Portal Labels (Decorative) — all 8 in-scope portals ── */
const PORTAL_LABELS = [
  { name: 'H&M', x: '6%', y: '10%', delay: 0.2 },
  { name: 'ZARA', x: '3%', y: '24%', delay: 0.3 },
  { name: 'ASOS', x: '2%', y: '38%', delay: 0.4 },
  { name: 'VOGUE', x: '5%', y: '50%', delay: 0.5 },
  { name: 'SHEIN', x: '4%', y: '62%', delay: 0.6 },
  { name: 'HBX', x: '7%', y: '74%', delay: 0.7 },
  { name: 'MANGO', x: '4%', y: '84%', delay: 0.8 },
  { name: 'REVOLVE', x: '2%', y: '94%', delay: 0.9 },
];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();

  const [email, setEmail] = useState('juancarlos@blacksmith.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const currentLang = i18n.language?.startsWith('es') ? 'es' : 'en';

  const setLanguage = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang);
      localStorage.setItem('i18nextLng', lang);
    },
    [i18n]
  );

  const validateForm = useCallback((): boolean => {
    let valid = true;
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    }

    return valid;
  }, [email, password]);

  const handleLogin = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isLoading) return;
      if (!validateForm()) return;

      setIsLoading(true);
      setLoadingStage(t('login.card.loadingStage1'));
      setTimeout(() => setLoadingStage(t('login.card.loadingStage2')), 400);
      setTimeout(() => setLoadingStage(t('login.card.loadingStage3')), 800);

      setTimeout(() => {
        login({
          id: 'usr-1',
          email: email || 'juancarlos@blacksmith.com',
          name: 'Juan Carlos Ochoa',
          token: 'mock-jwt-token-12345',
        });
        setIsLoading(false);
        navigate('/chat');
      }, 1200);
    },
    [isLoading, validateForm, t, login, email, navigate]
  );

  /* Feature grid — icons match the design spec exactly */
  const features = useMemo(
    () => [
      { icon: <TrendingUp className="w-5 h-5 text-purple-400" />, titleKey: 'login.features.trendIntel', descKey: 'login.features.trendIntelDesc' },
      { icon: <ImageIcon className="w-5 h-5 text-blue-400" />, titleKey: 'login.features.aiAnalysis', descKey: 'login.features.aiAnalysisDesc' },
      { icon: <Globe className="w-5 h-5 text-emerald-400" />, titleKey: 'login.features.portals', descKey: 'login.features.portalsDesc' },
      { icon: <Database className="w-5 h-5 text-amber-400" />, titleKey: 'login.features.athena', descKey: 'login.features.athenaDesc' },
      { icon: <Clock className="w-5 h-5 text-cyan-400" />, titleKey: 'login.features.historical', descKey: 'login.features.historicalDesc' },
      { icon: <MessageSquare className="w-5 h-5 text-purple-400" />, titleKey: 'login.features.agent', descKey: 'login.features.agentDesc' },
    ],
    []
  );

  const trustBadges = useMemo(
    () => [
      { icon: <Cloud className="w-4 h-4 text-blue-400" />, labelKey: 'login.trust.bedrock' },
      { icon: <Database className="w-4 h-4 text-purple-400" />, labelKey: 'login.trust.athena' },
      { icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />, labelKey: 'login.trust.encryption' },
      { icon: <CalendarClock className="w-4 h-4 text-amber-400" />, labelKey: 'login.trust.updates' },
    ],
    []
  );

  const d = isDark;

  return (
    <div
      className={`login-page min-h-screen w-full flex flex-col relative overflow-x-hidden font-sans selection:bg-blue-500/30 selection:text-white ${
        d ? 'bg-space-950 text-zinc-100' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div
          className={`absolute inset-0 ${d ? 'opacity-[0.04]' : 'opacity-[0.06]'}`}
          style={{
            backgroundImage: d
              ? 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)'
              : 'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className={`absolute -top-32 left-[15%] w-[800px] h-[800px] rounded-full blur-[200px] ${d ? 'bg-blue-600/10' : 'bg-blue-400/8'}`} />
        <div className={`absolute -bottom-32 right-[15%] w-[700px] h-[700px] rounded-full blur-[180px] ${d ? 'bg-purple-600/10' : 'bg-purple-400/6'}`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full blur-[240px] ${d ? 'bg-indigo-600/5' : 'bg-indigo-400/3'}`} />
      </div>

      {/* Header */}
      <header className={`relative z-30 h-[72px] px-6 md:px-12 lg:px-[96px] flex items-center justify-between border-b shrink-0 ${d ? 'bg-space-950/80 border-zinc-800/60' : 'bg-white/85 border-slate-200'} backdrop-blur-2xl`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-3">
            <span className={`font-bold text-[18px] tracking-tight ${d ? 'text-white' : 'text-slate-900'}`}>Blacksmith</span>
            <span className="text-[11px] font-bold text-blue-500 uppercase tracking-[0.1em] bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20 leading-none">
              TRENDS AI
            </span>
            <span className={`hidden sm:inline-flex text-[11px] font-mono px-2.5 py-1 rounded-md border leading-none ${d ? 'text-zinc-400 bg-zinc-900 border-zinc-800' : 'text-slate-500 bg-slate-100 border-slate-200'}`}>
              v2.0 Beta
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-3 sm:gap-4" aria-label="Login navigation">
          <a href="#docs" onClick={(e) => e.preventDefault()} className={`hidden lg:flex items-center gap-2 text-[14px] font-medium px-3 py-2 rounded-[10px] transition-colors ${d ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
            <BookOpen size={16} aria-hidden="true" />
            <span>{t('login.nav.documentation')}</span>
          </a>
          <a href="#support" onClick={(e) => e.preventDefault()} className={`hidden lg:flex items-center gap-2 text-[14px] font-medium px-3 py-2 rounded-[10px] transition-colors ${d ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
            <Headphones size={16} aria-hidden="true" />
            <span>{t('login.nav.support')}</span>
          </a>

          <div className={`hidden lg:block h-6 w-px mx-1 ${d ? 'bg-zinc-800' : 'bg-slate-200'}`} aria-hidden="true" />

          <LanguageDropdown currentLang={currentLang} onSwitch={setLanguage} isDark={d} />

          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-[10px] transition-all duration-200 ${d ? 'bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800' : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50'}`}
            aria-label={d ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {d ? <Moon size={16} className="text-amber-400" /> : <Sun size={16} className="text-amber-500" />}
          </button>
        </nav>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-[1440px] w-full mx-auto px-6 md:px-12 lg:px-[96px] py-12 lg:py-0">

          {/* Left — Hero + Features */}
          <motion.section
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative"
            aria-label="Platform overview"
          >
            <div className="absolute inset-0 pointer-events-none hidden xl:block" aria-hidden="true">
              {PORTAL_LABELS.map((portal) => (
                <motion.span
                  key={portal.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 0.4, x: 0 }}
                  transition={{ duration: 0.6, delay: portal.delay }}
                  className={`absolute text-[11px] font-bold tracking-[0.2em] uppercase ${d ? 'text-zinc-500' : 'text-slate-400'}`}
                  style={{ left: portal.x, top: portal.y }}
                >
                  {portal.name}
                </motion.span>
              ))}
            </div>

            <div className="relative z-10 space-y-10 xl:pl-12">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[12px] font-semibold tracking-wide"
                >
                  <Zap size={14} aria-hidden="true" />
                  <span>{t('login.hero.badge')}</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] font-bold tracking-tight leading-[1.05] max-w-[620px] ${d ? 'text-white' : 'text-slate-900'}`}
                >
                  {t('login.hero.titlePart1')}
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    {t('login.hero.titleHighlight')}
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className={`text-[16px] leading-[1.6] max-w-[520px] ${d ? 'text-zinc-400' : 'text-slate-600'}`}
                >
                  {t('login.hero.subtitle')}
                </motion.p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.35 + 0.05 * idx, ease: 'easeOut' }}
                    className={`group p-5 rounded-[16px] border backdrop-blur-md transition-all duration-300 hover:-translate-y-1
                      ${d
                        ? 'bg-zinc-900/40 border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-lg hover:shadow-black/50'
                        : 'bg-white/70 border-slate-200/80 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50'
                      }`}
                  >
                    <div className="flex items-center gap-3.5 mb-2.5">
                      <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 border transition-colors ${d ? 'bg-zinc-950 border-zinc-800 group-hover:border-zinc-700' : 'bg-slate-50 border-slate-200 group-hover:border-slate-300'}`}>
                        {feat.icon}
                      </div>
                      <h3 className={`text-[18px] font-bold leading-tight ${d ? 'text-zinc-100' : 'text-slate-800'}`}>{t(feat.titleKey)}</h3>
                    </div>
                    <p className={`text-[15px] leading-[1.5] ${d ? 'text-zinc-400' : 'text-slate-500'}`}>{t(feat.descKey)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Right — Auth Card */}
          <motion.section
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 w-full max-w-[480px] mx-auto lg:mx-0 lg:ml-auto"
            aria-label="Authentication"
          >
            <div
              className={`p-8 rounded-[20px] border backdrop-blur-2xl
              ${d ? 'bg-[#111118]/80 border-zinc-800/80 shadow-2xl shadow-black/40' : 'bg-white/90 border-slate-200 shadow-2xl shadow-slate-200/50'}`}
            >
              <div className="mb-8">
                <h2 className={`text-2xl font-bold tracking-tight ${d ? 'text-white' : 'text-slate-900'}`}>{t('login.card.title')}</h2>
                <p className={`text-[15px] mt-2 leading-relaxed ${d ? 'text-zinc-400' : 'text-slate-500'}`}>{t('login.card.subtitle')}</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6" noValidate>
                <div className="space-y-2.5">
                  <label htmlFor="login-email" className={`text-[14px] font-semibold block ${d ? 'text-zinc-200' : 'text-slate-700'}`}>
                    {t('login.card.emailLabel')}
                  </label>
                  <Input
                    id="login-email"
                    type="email"
                    icon={<Mail size={18} className={d ? 'text-zinc-500' : 'text-slate-400'} />}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                    placeholder={t('login.card.emailPlaceholder')}
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-invalid={!!emailError}
                    error={emailError}
                    className={d ? 'bg-zinc-900/80 border-zinc-800 text-zinc-100' : 'bg-slate-50 border-slate-200 text-slate-900'}
                  />
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="login-password" className={`text-[14px] font-semibold block ${d ? 'text-zinc-200' : 'text-slate-700'}`}>
                      {t('login.card.passwordLabel')}
                    </label>
                    <button type="button" className="text-[13px] font-medium text-blue-500 hover:text-blue-400 transition-colors rounded focus-visible:outline-blue-500">
                      {t('login.card.forgotPassword')}
                    </button>
                  </div>
                  <Input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    icon={<Lock size={18} className={d ? 'text-zinc-500' : 'text-slate-400'} />}
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${d ? 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200'}`}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    }
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
                    placeholder={t('login.card.passwordPlaceholder')}
                    autoComplete="current-password"
                    required
                    aria-required="true"
                    aria-invalid={!!passwordError}
                    error={passwordError}
                    className={d ? 'bg-zinc-900/80 border-zinc-800 text-zinc-100' : 'bg-slate-50 border-slate-200 text-slate-900'}
                  />
                </div>

                <label htmlFor="login-remember" className={`flex items-center gap-3 pt-1 cursor-pointer select-none text-[14px] font-medium ${d ? 'text-zinc-300' : 'text-slate-600'}`}>
                  <input
                    id="login-remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-blue-600 focus:ring-blue-500/30 focus:ring-offset-0 cursor-pointer accent-blue-600 transition-all"
                  />
                  <span>{t('login.card.rememberMe')}</span>
                </label>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full h-[56px] mt-2 rounded-[14px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-[15px] tracking-wide shadow-lg shadow-blue-600/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 ${d ? 'focus-visible:ring-offset-zinc-950' : 'focus-visible:ring-offset-white'}`}
                  aria-label={isLoading ? loadingStage : t('login.card.submitButton')}
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.span key="loading" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex items-center gap-2 text-blue-100">
                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                        <span>{loadingStage}</span>
                      </motion.span>
                    ) : (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                        <span>{t('login.card.submitButton')}</span>
                        <ArrowRight size={18} aria-hidden="true" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </form>

              <div className="mt-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`flex-1 h-px ${d ? 'bg-zinc-800' : 'bg-slate-200'}`} />
                  <span className={`text-[11px] font-bold uppercase tracking-widest whitespace-nowrap ${d ? 'text-zinc-500' : 'text-slate-400'}`}>{t('login.trust.divider')}</span>
                  <div className={`flex-1 h-px ${d ? 'bg-zinc-800' : 'bg-slate-200'}`} />
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {trustBadges.map((badge, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + 0.05 * idx }}
                      className={`flex flex-col items-center justify-center gap-2 py-3 px-1 rounded-[12px] border text-center transition-colors
                        ${d ? 'bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700' : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'}`}
                    >
                      <div className={`w-8 h-8 rounded-[10px] flex items-center justify-center ${d ? 'bg-zinc-950/80' : 'bg-white shadow-sm'}`}>{badge.icon}</div>
                      <span className={`text-[10px] font-semibold leading-tight ${d ? 'text-zinc-400' : 'text-slate-500'}`}>{t(badge.labelKey)}</span>
                    </motion.div>
                  ))}
                </div>

                <p className={`text-center text-[12px] font-medium mt-5 ${d ? 'text-zinc-500' : 'text-slate-400'}`}>{t('login.trust.protection')}</p>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`relative z-20 py-5 px-6 md:px-12 lg:px-[96px] border-t shrink-0 text-[13px] font-medium flex flex-col sm:flex-row items-center justify-between gap-4
          ${d ? 'bg-space-950/80 border-zinc-800/60 text-zinc-500' : 'bg-white/85 border-slate-200 text-slate-500'} backdrop-blur-2xl`}
        role="contentinfo"
      >
        <span>{t('login.footer.copyright')}</span>
        <nav className="flex items-center gap-6 sm:gap-8" aria-label="Footer links">
          <a href="#privacy" onClick={(e) => e.preventDefault()} className={`transition-colors ${d ? 'hover:text-zinc-300' : 'hover:text-slate-800'}`}>
            {t('login.footer.privacy')}
          </a>
          <a href="#terms" onClick={(e) => e.preventDefault()} className={`transition-colors ${d ? 'hover:text-zinc-300' : 'hover:text-slate-800'}`}>
            {t('login.footer.terms')}
          </a>
          <span className="flex items-center gap-2">
            <span>{t('login.footer.status')}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" aria-label="Systems operational" />
          </span>
        </nav>
      </footer>
    </div>
  );
};

export default Login;
