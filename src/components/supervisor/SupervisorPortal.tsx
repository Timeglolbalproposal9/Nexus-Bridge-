import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  Edit3, 
  MessageSquare, 
  ChevronRight, 
  AlertCircle, 
  Users, 
  ShieldCheck, 
  BarChart2, 
  Sparkles,
  X,
  Send
} from 'lucide-react';

export const SupervisorPortal: React.FC = () => {
  const { 
    activeChild, 
    activeTab, 
    language, 
    targets, 
    approveTarget, 
    showNotification,
    triggerConfetti 
  } = useApp();

  const isAr = language === 'ar';

  // Modals
  const [showEditCriteriaModal, setShowEditCriteriaModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [newCriterionVal, setNewCriterionVal] = useState('90% across 3 sessions');
  const [feedbackNote, setFeedbackNote] = useState('');

  // Target needing review
  const pendingTarget = targets.find(t => t.approvalStatus === 'needs_review') || targets[0];

  const handleApprove = () => {
    approveTarget(pendingTarget.id);
    triggerConfetti();
  };

  const handleSaveCriteria = () => {
    approveTarget(pendingTarget.id, newCriterionVal);
    setShowEditCriteriaModal(false);
  };

  const handleSendFeedback = () => {
    setShowFeedbackModal(false);
    showNotification('Clinical supervisory feedback sent to therapist.');
    setFeedbackNote('');
  };

  /* ---------------------------------------------------- */
  /* TAB 1: REVIEW QUEUE (Exact PDF 2 Page 6)            */
  /* ---------------------------------------------------- */
  const renderReviewTab = () => (
    <div className="space-y-5 pb-28 animate-in fade-in">
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white mb-1">
          {isAr ? 'قائمة المراجعة الإكلينيكية' : 'Review'}
        </h2>
        <p className="text-sm text-[#6B6785] dark:text-[#A5A0C2]">
          {isAr ? 'الأطفال، المعالجون، الأهداف والبيانات' : 'Children, therapists, targets and data'}
        </p>
      </div>

      {/* Review Counters matching PDF 2 Page 6 */}
      <div className="space-y-2.5">
        <button
          onClick={() => showNotification('Filtering: 2 goals awaiting supervisor sign-off')}
          className="w-full p-4 rounded-2xl bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] flex items-center justify-between text-left rtl:text-right shadow-card hover:border-[#4F46E5] transition"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="font-semibold text-sm text-[#1F1B3A] dark:text-white">
              Goals awaiting approval · 2
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B6785]" />
        </button>

        <button
          onClick={() => showNotification('Filtering: 4 clinical sessions to sign-off')}
          className="w-full p-4 rounded-2xl bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] flex items-center justify-between text-left rtl:text-right shadow-card hover:border-[#4F46E5] transition"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            <span className="font-semibold text-sm text-[#1F1B3A] dark:text-white">
              Sessions to review · 4
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B6785]" />
        </button>
      </div>

      {/* Child Cards matching PDF 2 Page 6 */}
      <div className="space-y-3 pt-1">
        {/* Child A */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1F1B3A] border-2 border-amber-300 dark:border-amber-700/60 shadow-card flex items-center justify-between">
          <div>
            <h4 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">
              Leo Miller
            </h4>
            <p className="text-xs text-[#6B6785]">Speech · Answering WH questions</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF1CC] text-[#B7791F] dark:bg-amber-950 dark:text-amber-300">
            Needs review
          </span>
        </div>

        {/* Child B */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] shadow-card flex items-center justify-between">
          <div>
            <h4 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">
              Maya Al-Rashid
            </h4>
            <p className="text-xs text-[#6B6785]">Behavior · Identifying objects</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#DDF5EA] text-[#1B9E6B] dark:bg-emerald-950 dark:text-emerald-300">
            On track
          </span>
        </div>

        {/* Child C */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] shadow-card flex items-center justify-between">
          <div>
            <h4 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">
              Tariq Al-Otaibi
            </h4>
            <p className="text-xs text-[#6B6785]">OT · Buttoning</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#DDF5EA] text-[#1B9E6B] dark:bg-emerald-950 dark:text-emerald-300">
            On track
          </span>
        </div>
      </div>

      {/* Detail Card matching PDF 2 Page 6 */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-warm space-y-4">
        <div>
          <h3 className="font-heading font-bold text-base text-[#1F1B3A] dark:text-white">
            Leo Miller: answering WH questions
          </h3>
          <p className="text-xs text-[#6B6785] dark:text-gray-300 mt-1">
            85% independent. Criterion: 90% across 3 sessions.
          </p>
        </div>

        {/* 3 Action Buttons matching PDF 2 Page 6 */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handleApprove}
            className="py-3 px-2 rounded-xl bg-white dark:bg-[#252044] border-2 border-[#1B9E6B] text-[#1B9E6B] dark:text-emerald-300 font-semibold text-xs hover:bg-[#DDF5EA]/30 transition text-center shadow-xs"
          >
            Approve goal
          </button>

          <button
            onClick={() => setShowEditCriteriaModal(true)}
            className="py-3 px-2 rounded-xl bg-white dark:bg-[#252044] border-2 border-[#4F46E5] text-[#4F46E5] dark:text-indigo-300 font-semibold text-xs hover:bg-indigo-50 transition text-center shadow-xs"
          >
            Edit criteria
          </button>

          <button
            onClick={() => setShowFeedbackModal(true)}
            className="py-3 px-2 rounded-xl bg-white dark:bg-[#252044] border-2 border-[#0EA5E9] text-[#0EA5E9] dark:text-sky-300 font-semibold text-xs hover:bg-sky-50 transition text-center shadow-xs"
          >
            Feedback
          </button>
        </div>
      </div>

      {/* Quality & Fidelity Check */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-[#1F1B3A] dark:text-white">Interobserver Agreement (IOA)</span>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
            89% Agreement
          </span>
        </div>
        <p className="text-[11px] text-[#6B6785]">
          BCBA Observer and lead RBT data matched on 8 of 9 intervals.
        </p>
      </div>

      {/* Edit Criteria Modal */}
      {showEditCriteriaModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1F1B3A] rounded-2xl p-5 max-w-sm w-full space-y-3 shadow-float">
            <div className="flex justify-between items-center">
              <h3 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">Edit Mastery Criterion</h3>
              <button onClick={() => setShowEditCriteriaModal(false)}><X className="w-4 h-4" /></button>
            </div>
            <input
              type="text"
              value={newCriterionVal}
              onChange={(e) => setNewCriterionVal(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-[#E8E2D9] dark:border-gray-700 bg-[#FAF6F0] dark:bg-gray-800"
            />
            <button
              onClick={handleSaveCriteria}
              className="w-full py-2.5 rounded-xl bg-[#4F46E5] text-white text-xs font-semibold"
            >
              Update Criterion & Approve
            </button>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1F1B3A] rounded-2xl p-5 max-w-sm w-full space-y-3 shadow-float">
            <div className="flex justify-between items-center">
              <h3 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">Therapist Feedback</h3>
              <button onClick={() => setShowFeedbackModal(false)}><X className="w-4 h-4" /></button>
            </div>
            <textarea
              value={feedbackNote}
              onChange={(e) => setFeedbackNote(e.target.value)}
              placeholder="e.g. Ensure 4-second latency delay is maintained before delivering gestural cue."
              rows={3}
              className="w-full text-xs p-2.5 rounded-xl border border-[#E8E2D9] dark:border-gray-700 bg-[#FAF6F0] dark:bg-gray-800"
            />
            <button
              onClick={handleSendFeedback}
              className="w-full py-2.5 rounded-xl bg-[#0EA5E9] text-white text-xs font-semibold"
            >
              Deliver Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-md mx-auto px-4 pt-3">
      {activeTab.toLowerCase() === 'review' && renderReviewTab()}
      {activeTab.toLowerCase() === 'children' && (
        <div className="space-y-4 pb-28">
          <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">Caseload Overview</h2>
          <div className="p-4 bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-2xl shadow-card space-y-2">
            <p className="text-xs text-[#6B6785]">Total Active Caseload: 3 children • 14 active multidisciplinary targets</p>
          </div>
        </div>
      )}
      {activeTab.toLowerCase() === 'staff' && (
        <div className="space-y-4 pb-28">
          <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">Staff Fidelity & Supervision</h2>
          <div className="p-4 bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-2xl shadow-card space-y-2">
            <p className="text-xs text-[#6B6785]">7 active therapists and teachers logged 94% treatment integrity this week.</p>
          </div>
        </div>
      )}
      {activeTab.toLowerCase() === 'reports' && (
        <div className="space-y-4 pb-28">
          <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">Monthly Clinical Audits</h2>
          <div className="p-4 bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-2xl shadow-card">
            <button
              onClick={() => showNotification('Generating complete multidisciplinary clinical audit PDF')}
              className="w-full py-2.5 rounded-xl bg-[#4F46E5] text-white text-xs font-semibold"
            >
              Generate Monthly Summary PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
