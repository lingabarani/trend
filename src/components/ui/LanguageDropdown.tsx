import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

interface LanguageDropdownProps {
  currentLang: string;
  onSwitch: (lang: string) => void;
  isDark: boolean;
}

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
];

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ currentLang, onSwitch, isDark }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-[10px] border text-[13px] font-semibold transition-colors ${
          isDark
            ? 'bg-zinc-900/60 border-zinc-800/80 text-zinc-300 hover:border-zinc-700'
            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
        }`}
        aria-label="Change language"
      >
        <Globe size={15} />
        <span>{currentLang.toUpperCase()}</span>
        <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className={`absolute right-0 mt-2 w-28 rounded-[10px] border shadow-xl overflow-hidden z-50 ${
            isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'
          }`}
        >
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                onSwitch(l.code);
                setOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 text-[13px] font-medium transition-colors ${
                currentLang === l.code
                  ? 'text-blue-400 bg-blue-500/10'
                  : isDark
                  ? 'text-zinc-300 hover:bg-zinc-800'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
