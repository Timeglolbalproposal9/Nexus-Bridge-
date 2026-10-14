import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RoleType } from '../../types';
import { 
  ChevronDown, 
  Globe, 
  Moon, 
  Sun, 
  Wifi, 
  WifiOff, 
  Sparkles, 
  UserCheck, 
  ShieldCheck,
  Check,
  Smartphone
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    role, 
    setRole, 
    activeChild, 
    selectedChildId, 
    setSelectedChildId, 
    childrenList,
    language,
    toggleLanguage,
    darkMode,
    toggleDarkMode,
    isOffline,
    toggleOffline,
    syncQueueCount,
    childScheduleMode,
    setChildScheduleMode
  } = useApp();

  const [childDropdownOpen, setChildDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  // Role accents defined in design specification
  const roleColors: Record<RoleType, { bg: string; dot: string; labelEn: string; labelAr: string }> = {
    parent: { bg: 'bg-[#FFE4DF]', dot: 'bg-[#FF6B57]', labelEn: 'Parent portal', labelAr: 'بوابة ولي الأمر' },
    behavior: { bg: 'bg-[#E0E7FF]', dot: 'bg-[#4F46E5]', labelEn: 'Behavior therapist', labelAr: 'أخصائي السلوك' },
    speech: { bg: 'bg-[#E0F2FE]', dot: 'bg-[#0EA5E9]', labelEn: 'Speech therapist', labelAr: 'أخصائي النطق والتخاطب' },
    ot: { bg: 'bg-[#FEF3C7]', dot: 'bg-[#F59E0B]', labelEn: 'Occupational therapist', labelAr: 'أخصائي العلاج الوظيفي' },
    remedial: { bg: 'bg-[#EDE9FE]', dot: 'bg-[#7C3AED]', labelEn: 'Remedial teacher', labelAr: 'معلم التربية الخاصة' },
    teacher: { bg: 'bg-[#D1FAE5]', dot: 'bg-[#10B981]', labelEn: 'Teacher', labelAr: 'معلم الفصل' },
    supervisor: { bg: 'bg-[#F1F5F9]', dot: 'bg-[#334155]', labelEn: 'Supervisor', labelAr: 'المشرف الإكلينيكي' },
    admin: { bg: 'bg-[#E2E8F0]', dot: 'bg-[#0F172A]', labelEn: 'Administrator', labelAr: 'مدير النظام' },
  };

  const currentRoleConfig = role ? roleColors[role] : roleColors.parent;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#1A1733]/95 backdrop-blur-md border-b border-[#E8E2D9] dark:border-[#2D284D] transition-colors">
      {/* Top micro-bar with quick simulator toggles (Language, Dark mode, Offline, Role switcher, Child schedule mode) */}
      <div className="bg-[#F4EEE6] dark:bg-[#14122B] px-3 py-1.5 flex items-center justify-between text-xs text-[#6B6785] dark:text-[#A5A0C2] border-b border-[#E8E2D9]/60 dark:border-[#2D284D]/60">
        <div className="flex items-center gap-2">
          {/* Quick Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 font-medium px-2 py-0.5 rounded-full bg-white dark:bg-[#201C3D] text-[#1F1B3A] dark:text-white border border-[#E8E2D9] dark:border-[#38325E] shadow-xs hover:border-[#4F46E5] transition"
              title="Switch role"
            >
              <span className={`w-2 h-2 rounded-full ${currentRoleConfig.dot}`}></span>
              <span className="truncate max-w-[110px] sm:max-w-none">
                {language === 'ar' ? currentRoleConfig.labelAr : currentRoleConfig.labelEn}
              </span>
              <ChevronDown className="w-3 h-3 text-[#6B6785]" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute left-0 mt-1 w-64 bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-xl shadow-warm py-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#6B6785] dark:text-[#8E8AAB]">
                  Switch Portal Role
                </div>
                {(Object.keys(roleColors) as RoleType[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left rtl:text-right px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F4EEE6] dark:hover:bg-[#2B264E] transition ${
                      role === r ? 'font-semibold text-[#4F46E5] dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30' : 'text-[#1F1B3A] dark:text-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${roleColors[r].dot}`}></span>
                      <span>{language === 'ar' ? roleColors[r].labelAr : roleColors[r].labelEn}</span>
                    </div>
                    {role === r && <Check className="w-3.5 h-3.5 text-[#4F46E5]" />}
                  </button>
                ))}
                <div className="border-t border-[#E8E2D9] dark:border-[#38325E] mt-1 pt-1">
                  <button
                    onClick={() => {
                      setRole(null);
                      setRoleDropdownOpen(false);
                    }}
                    className="w-full text-left rtl:text-right px-3 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                  >
                    <Smartphone className="w-3 h-3" />
                    <span>Return to Launch Screen</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Child Schedule Mode Quick Button */}
          <button
            onClick={() => setChildScheduleMode(!childScheduleMode)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full border transition text-[11px] font-medium ${
              childScheduleMode 
                ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300' 
                : 'bg-white dark:bg-[#201C3D] border-[#E8E2D9] dark:border-[#38325E] hover:text-[#4F46E5]'
            }`}
            title="First-Then & Picture Schedule"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span className="hidden sm:inline">Child Mode</span>
          </button>
        </div>

        {/* Right tools: Language toggle, Dark mode, Offline simulation */}
        <div className="flex items-center gap-2">
          {/* Offline indicator */}
          <button
            onClick={toggleOffline}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-medium transition ${
              isOffline
                ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300'
            }`}
            title={isOffline ? 'Offline mode active (Click to go online)' : 'Online and synced (Click to simulate offline)'}
          >
            {isOffline ? <WifiOff className="w-3 h-3 text-amber-600" /> : <Wifi className="w-3 h-3 text-emerald-600" />}
            <span className="hidden sm:inline">{isOffline ? `Offline (${syncQueueCount})` : 'Synced'}</span>
          </button>

          {/* Language Switch */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white dark:bg-[#201C3D] border border-[#E8E2D9] dark:border-[#38325E] hover:border-[#4F46E5] text-[11px] font-medium transition"
            title="Toggle English / Arabic (RTL)"
          >
            <Globe className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
            <span>{language === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          {/* Dark Mode */}
          <button
            onClick={toggleDarkMode}
            className="p-1 rounded-full bg-white dark:bg-[#201C3D] border border-[#E8E2D9] dark:border-[#38325E] hover:text-indigo-600 transition"
            title="Toggle Dark Mode"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-indigo-600" />}
          </button>
        </div>
      </div>

      {/* Main Header bar matching Client PDF screens exactly */}
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Role label with accent badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${currentRoleConfig.dot}`}></span>
            <span className="text-sm font-semibold text-[#1F1B3A] dark:text-white">
              {language === 'ar' ? currentRoleConfig.labelAr : currentRoleConfig.labelEn}
            </span>
          </div>
        </div>

        {/* Right: [Child's name] ▾ dropdown */}
        <div className="relative">
          <button
            onClick={() => setChildDropdownOpen(!childDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4EEE6] dark:bg-[#241F45] text-xs font-semibold text-[#1F1B3A] dark:text-white hover:bg-[#E8E2D9] dark:hover:bg-[#2E2856] transition"
          >
            <span className="max-w-[120px] truncate">{activeChild.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#6B6785]" />
          </button>

          {childDropdownOpen && (
            <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-56 bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-2xl shadow-warm py-2 z-50 animate-in fade-in">
              <div className="px-3 py-1 text-[11px] font-semibold text-[#6B6785] dark:text-[#A5A0C2]">
                Active Child Record
              </div>
              {childrenList.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedChildId(c.id);
                    setChildDropdownOpen(false);
                  }}
                  className={`w-full text-left rtl:text-right px-3 py-2 text-xs flex items-center gap-2 hover:bg-[#F4EEE6] dark:hover:bg-[#2B264E] transition ${
                    selectedChildId === c.id ? 'font-semibold text-[#4F46E5] dark:text-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/40' : 'text-[#1F1B3A] dark:text-gray-200'
                  }`}
                >
                  <img src={c.avatar} alt={c.name} className="w-6 h-6 rounded-full object-cover" />
                  <div className="truncate flex-1">
                    <p className="leading-tight">{c.name}</p>
                    <p className="text-[10px] text-[#6B6785] dark:text-gray-400 truncate">{c.diagnosis}</p>
                  </div>
                  {selectedChildId === c.id && <Check className="w-3.5 h-3.5 text-[#4F46E5]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick 1-Tap Portal Navigation Strip across all 8 roles */}
      <div className="max-w-md mx-auto px-4 pb-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 text-xs">
        <button
          onClick={() => setRole(null)}
          className="px-2.5 py-1 rounded-full text-[11px] font-semibold border transition shrink-0 bg-white dark:bg-[#201C3D] border-[#E8E2D9] dark:border-[#38325E] text-[#6B6785] hover:text-[#1F1B3A] hover:border-gray-400"
          title="Return to Launch Screen"
        >
          📱 Launch
        </button>

        {[
          { key: 'parent', label: 'Parent' },
          { key: 'behavior', label: 'Behavior' },
          { key: 'speech', label: 'Speech' },
          { key: 'ot', label: 'OT' },
          { key: 'teacher', label: 'Teacher' },
          { key: 'remedial', label: 'Remedial' },
          { key: 'supervisor', label: 'Supervisor' },
          { key: 'admin', label: 'Admin' },
        ].map((item) => {
          const isCurrent = role === item.key;
          const conf = roleColors[item.key as RoleType];
          return (
            <button
              key={item.key}
              onClick={() => setRole(item.key as RoleType)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition shrink-0 border ${
                isCurrent
                  ? `${conf.bg} text-[#1F1B3A] dark:text-white border-[#4F46E5]/40 shadow-xs font-bold`
                  : 'bg-white dark:bg-[#201C3D] border-[#E8E2D9] dark:border-[#38325E] text-[#6B6785] dark:text-gray-300 hover:border-gray-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${conf.dot}`}></span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
