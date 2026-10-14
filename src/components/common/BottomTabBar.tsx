import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  TrendingUp, 
  MessageSquare, 
  Users, 
  Calendar, 
  Target as TargetIcon, 
  BarChart2, 
  FileText, 
  CheckSquare, 
  GraduationCap, 
  ClipboardCheck, 
  Settings, 
  FolderKanban
} from 'lucide-react';

export const BottomTabBar: React.FC = () => {
  const { role, activeTab, setActiveTab, language } = useApp();

  if (!role) return null;

  interface TabDef {
    id: string;
    labelEn: string;
    labelAr: string;
    icon: React.ComponentType<{ className?: string }>;
  }

  const getTabsForRole = (): TabDef[] => {
    switch (role) {
      case 'parent':
        return [
          { id: 'Home', labelEn: 'Home', labelAr: 'الرئيسية', icon: Home },
          { id: 'Progress', labelEn: 'Progress', labelAr: 'التقدم', icon: BarChart2 },
          { id: 'Targets', labelEn: 'Targets', labelAr: 'الأهداف', icon: TargetIcon },
          { id: 'Sessions', labelEn: 'Sessions', labelAr: 'الجلسات', icon: Calendar },
          { id: 'Messages', labelEn: 'Messages', labelAr: 'الرسائل', icon: MessageSquare },
        ];
      case 'behavior':
        return [
          { id: 'Today', labelEn: 'Today', labelAr: 'اليوم', icon: Calendar },
          { id: 'Targets', labelEn: 'Targets', labelAr: 'الأهداف', icon: TargetIcon },
          { id: 'Graphs', labelEn: 'Graphs', labelAr: 'الرسوم', icon: BarChart2 },
          { id: 'Notes', labelEn: 'Notes', labelAr: 'الملاحظات', icon: FileText },
        ];
      case 'speech':
        return [
          { id: 'Today', labelEn: 'Today', labelAr: 'اليوم', icon: Calendar },
          { id: 'Targets', labelEn: 'Targets', labelAr: 'الأهداف', icon: TargetIcon },
          { id: 'Graphs', labelEn: 'Graphs', labelAr: 'الرسوم', icon: BarChart2 },
          { id: 'Notes', labelEn: 'Notes', labelAr: 'الملاحظات', icon: FileText },
        ];
      case 'ot':
        return [
          { id: 'Today', labelEn: 'Today', labelAr: 'اليوم', icon: Calendar },
          { id: 'Checklists', labelEn: 'Checklists', labelAr: 'القوائم', icon: CheckSquare },
          { id: 'Graphs', labelEn: 'Graphs', labelAr: 'الرسوم', icon: BarChart2 },
          { id: 'Notes', labelEn: 'Notes', labelAr: 'الملاحظات', icon: FileText },
        ];
      case 'remedial':
        return [
          { id: 'Today', labelEn: 'Today', labelAr: 'اليوم', icon: Calendar },
          { id: 'Targets', labelEn: 'Targets', labelAr: 'الأهداف', icon: TargetIcon },
          { id: 'Graphs', labelEn: 'Graphs', labelAr: 'الرسوم', icon: BarChart2 },
          { id: 'Notes', labelEn: 'Notes', labelAr: 'الملاحظات', icon: FileText },
        ];
      case 'teacher':
        return [
          { id: 'Today', labelEn: 'Today', labelAr: 'اليوم', icon: Calendar },
          { id: 'Students', labelEn: 'Students', labelAr: 'الطلاب', icon: GraduationCap },
          { id: 'Notes', labelEn: 'Notes', labelAr: 'الملاحظات', icon: FileText },
        ];
      case 'supervisor':
        return [
          { id: 'Review', labelEn: 'Review', labelAr: 'المراجعة', icon: ClipboardCheck },
          { id: 'Children', labelEn: 'Children', labelAr: 'الأطفال', icon: Users },
          { id: 'Staff', labelEn: 'Staff', labelAr: 'الكادر', icon: FolderKanban },
          { id: 'Reports', labelEn: 'Reports', labelAr: 'التقارير', icon: BarChart2 },
        ];
      case 'admin':
        return [
          { id: 'Home', labelEn: 'Home', labelAr: 'الرئيسية', icon: Home },
          { id: 'Staff', labelEn: 'Staff', labelAr: 'الكادر', icon: Users },
          { id: 'Children', labelEn: 'Children', labelAr: 'الأطفال', icon: FolderKanban },
          { id: 'Settings', labelEn: 'Settings', labelAr: 'الإعدادات', icon: Settings },
        ];
    }
  };

  const tabs = getTabsForRole();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pb-safe pointer-events-none">
      <div className="max-w-md mx-auto px-4 pb-3">
        <nav 
          aria-label="Bottom Navigation" 
          className="pointer-events-auto bg-white/95 dark:bg-[#1F1B3A]/95 backdrop-blur-md border border-[#E8E2D9] dark:border-[#38325E] rounded-[24px] shadow-warm py-2 px-3 flex items-center justify-around transition-all"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab.toLowerCase() === tab.id.toLowerCase();

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 min-w-[56px] ${
                  isActive
                    ? 'text-white'
                    : 'text-[#6B6785] dark:text-[#A5A0C2] hover:text-[#1F1B3A] dark:hover:text-white'
                }`}
              >
                {/* Active Indigo Pill Background */}
                {isActive && (
                  <span className="absolute inset-0 bg-[#4F46E5] rounded-xl shadow-xs transition-all duration-200" />
                )}

                <span className="relative z-10 flex flex-col items-center">
                  <Icon className="w-5 h-5 mb-0.5" />
                  <span className="text-[11px] font-medium leading-none">
                    {language === 'ar' ? tab.labelAr : tab.labelEn}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
