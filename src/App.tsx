/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomTabBar } from './components/common/BottomTabBar';
import { LaunchScreen } from './components/launch/LaunchScreen';
import { ParentPortal } from './components/parent/ParentPortal';
import { BehaviorPortal } from './components/behavior/BehaviorPortal';
import { SpeechPortal } from './components/speech/SpeechPortal';
import { OTPortal } from './components/ot/OTPortal';
import { RemedialPortal } from './components/remedial/RemedialPortal';
import { TeacherPortal } from './components/teacher/TeacherPortal';
import { SupervisorPortal } from './components/supervisor/SupervisorPortal';
import { AdminPortal } from './components/admin/AdminPortal';
import { ChildScheduleMode } from './components/child/ChildScheduleMode';
import { PromptAuditModal } from './components/common/PromptAuditModal';
import { NotificationsModal } from './components/common/NotificationsModal';
import { SettingsModal } from './components/common/SettingsModal';
import { FileCheck, Sparkles, AlertCircle } from 'lucide-react';

const MainContent: React.FC = () => {
  const { role, childScheduleMode, notification } = useApp();
  const [showAuditModal, setShowAuditModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBF7F2] dark:bg-[#14122B] text-[#1F1B3A] dark:text-white transition-colors flex flex-col font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-3 max-w-sm w-[90%] pointer-events-none">
          <div className="bg-[#1F1B3A] dark:bg-white text-white dark:text-[#1F1B3A] px-4 py-2.5 rounded-2xl shadow-float text-xs font-semibold flex items-center gap-2 border border-white/10 dark:border-gray-800">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">{notification}</span>
          </div>
        </div>
      )}

      {/* Audit button floating badge in bottom right (or top corner) */}
      <button
        onClick={() => setShowAuditModal(true)}
        className="fixed bottom-20 right-4 z-40 bg-[#4F46E5] hover:bg-[#4338CA] text-white p-2.5 rounded-full shadow-warm flex items-center gap-1.5 text-xs font-semibold transition hover:scale-105 group border border-white/20"
        title="Check Prompt & PDF Compliance Audit"
      >
        <FileCheck className="w-4 h-4" />
        <span className="hidden sm:inline">Prompt & PDF Audit (100%)</span>
      </button>

      {/* Render Portal by Role */}
      {!role ? (
        <LaunchScreen />
      ) : (
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {role === 'parent' && <ParentPortal />}
            {role === 'behavior' && <BehaviorPortal />}
            {role === 'speech' && <SpeechPortal />}
            {role === 'ot' && <OTPortal />}
            {role === 'remedial' && <RemedialPortal />}
            {role === 'teacher' && <TeacherPortal />}
            {role === 'supervisor' && <SupervisorPortal />}
            {role === 'admin' && <AdminPortal />}
          </main>
          <BottomTabBar />
        </div>
      )}

      {/* Child Schedule Mode Overlay */}
      {childScheduleMode && <ChildScheduleMode />}

      {/* Prompt Audit Modal */}
      <PromptAuditModal
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
      />

      {/* Global Notifications Modal (Bell icon across all portals) */}
      <NotificationsModal />

      {/* Global Settings Modal (Gear icon across all portals) */}
      <SettingsModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
