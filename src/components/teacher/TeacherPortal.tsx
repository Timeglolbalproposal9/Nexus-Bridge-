import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  XCircle, 
  Save, 
  Camera, 
  Mic, 
  Users, 
  TrendingUp, 
  Sparkles,
  ChevronRight,
  BookOpen,
  FileText
} from 'lucide-react';

export const TeacherPortal: React.FC = () => {
  const { 
    activeChild, 
    activeTab, 
    language, 
    addTeacherObservation, 
    observations,
    showNotification,
    triggerConfetti 
  } = useApp();

  const isAr = language === 'ar';

  // State matching PDF 2 Page 5: "Record an activity: Student → Goal → Activity → Observation"
  const [selectedGoal, setSelectedGoal] = useState<string>('Answers questions in class');
  const [activityText, setActivityText] = useState<string>('Science: parts of a plant');
  const [selectedResult, setSelectedResult] = useState<
    'Completed independently' | 'Needed help' | 'Partially completed' | 'Not completed'
  >('Completed independently');
  const [observationNote, setObservationNote] = useState<string>('Answered 4 of 5 questions on their own during plant discussion.');

  const goalsList = [
    'Answers questions in class',
    'Follows 2-step classroom routine',
    'Remains seated during group instruction',
    'Uses gentle hands and shares supplies',
    'Transitions smoothly between activities'
  ];

  const handleSaveObservation = () => {
    addTeacherObservation({
      studentId: activeChild.id,
      studentName: activeChild.name,
      goal: selectedGoal,
      activity: activityText,
      result: selectedResult,
      observation: observationNote,
      teacherName: 'Emma Watson'
    });
    if (selectedResult === 'Completed independently') {
      triggerConfetti();
    }
  };

  /* ---------------------------------------------------- */
  /* TAB 1: RECORD AN ACTIVITY (Exact PDF 2 Page 5)      */
  /* ---------------------------------------------------- */
  const renderRecordActivityTab = () => (
    <div className="space-y-5 pb-28 animate-in fade-in">
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white mb-1">
          {isAr ? 'تسجيل نشاط مدرسي' : 'Record an activity'}
        </h2>
        <p className="text-sm text-[#6B6785] dark:text-[#A5A0C2]">
          {isAr ? 'طالب ← هدف ← نشاط ← ملاحظة' : 'Student → Goal → Activity → Observation'}
        </p>
      </div>

      {/* Goal Field */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#10B981] dark:text-emerald-400 block">
          {isAr ? 'الهدف التعليمي / السلوكي' : 'Goal'}
        </label>
        <select
          value={selectedGoal}
          onChange={(e) => setSelectedGoal(e.target.value)}
          className="w-full text-sm font-semibold text-[#1F1B3A] dark:text-white bg-transparent outline-hidden cursor-pointer"
        >
          {goalsList.map(g => (
            <option key={g} value={g} className="bg-white dark:bg-[#1F1B3A] text-[#1F1B3A] dark:text-white">
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Activity Field */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#10B981] dark:text-emerald-400 block">
          {isAr ? 'النشاط الدراسي' : 'Activity'}
        </label>
        <input
          type="text"
          value={activityText}
          onChange={(e) => setActivityText(e.target.value)}
          placeholder="e.g. Science: parts of a plant"
          className="w-full text-sm font-semibold text-[#1F1B3A] dark:text-white bg-transparent outline-hidden"
        />
      </div>

      {/* 4 Result Buttons matching PDF 2 Page 5 */}
      <div className="space-y-2.5">
        {[
          { id: 'Completed independently', labelAr: 'أنجز باستقلالية', color: 'border-emerald-500 bg-[#DDF5EA] text-[#1B9E6B] dark:bg-emerald-950 dark:text-emerald-300' },
          { id: 'Needed help', labelAr: 'احتاج مساعدة', color: 'border-amber-500 bg-[#FFF1CC] text-[#B7791F] dark:bg-amber-950 dark:text-amber-300' },
          { id: 'Partially completed', labelAr: 'أنجز جزئياً', color: 'border-indigo-500 bg-[#E0E7FF] text-[#4F46E5] dark:bg-indigo-950 dark:text-indigo-300' },
          { id: 'Not completed', labelAr: 'لم يكتمل', color: 'border-rose-500 bg-[#FDE3E4] text-[#D63B3B] dark:bg-rose-950 dark:text-rose-300' }
        ].map((res) => {
          const isSelected = selectedResult === res.id;
          return (
            <button
              key={res.id}
              onClick={() => setSelectedResult(res.id as any)}
              className={`w-full py-3.5 px-4 rounded-2xl font-semibold text-sm transition-all border-2 flex items-center justify-between text-left rtl:text-right shadow-card ${
                isSelected
                  ? res.color + ' shadow-warm'
                  : 'bg-white dark:bg-[#1F1B3A] border-[#E8E2D9] dark:border-[#38325E] text-[#1F1B3A] dark:text-gray-200 hover:border-gray-300'
              }`}
            >
              <span>{isAr ? res.labelAr : res.id}</span>
              {isSelected && <span className="font-bold text-base">✓</span>}
            </button>
          );
        })}
      </div>

      {/* Observation (optional) */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#6B6785] dark:text-[#8E8AAB]">
            {isAr ? 'ملاحظة المعلم (اختياري)' : 'Observation (optional)'}
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => showNotification('Quick classroom photo attached')}
              className="p-1 text-[#6B6785] hover:text-[#10B981]"
              title="Attach photo"
            >
              <Camera className="w-4 h-4" />
            </button>
            <button
              onClick={() => showNotification('Voice observation recorded')}
              className="p-1 text-[#6B6785] hover:text-[#10B981]"
              title="Voice note"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>
        <textarea
          value={observationNote}
          onChange={(e) => setObservationNote(e.target.value)}
          placeholder="e.g. Answered 4 of 5 questions on their own"
          rows={3}
          className="w-full text-xs p-3 rounded-xl border border-[#E8E2D9] dark:border-[#38325E] bg-[#FAF6F0] dark:bg-[#252044] text-[#1F1B3A] dark:text-white outline-hidden resize-none"
        />
      </div>

      {/* Save Button matching PDF 2 Page 5 */}
      <button
        onClick={handleSaveObservation}
        className="w-full py-4 rounded-2xl bg-[#1B9E6B] hover:bg-[#147952] text-white font-heading font-semibold text-base shadow-warm flex items-center justify-center gap-2 active:scale-98 transition"
      >
        <Save className="w-5 h-5" />
        <span>Save</span>
      </button>
    </div>
  );

  /* ---------------------------------------------------- */
  /* TAB 2: STUDENTS (Classroom list & weekly trends)    */
  /* ---------------------------------------------------- */
  const renderStudentsTab = () => (
    <div className="space-y-4 pb-28 animate-in fade-in">
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">
          {isAr ? 'طلاب الفصل' : 'Grade 1 Students'}
        </h2>
        <p className="text-xs text-[#6B6785]">
          {isAr ? 'المتابعة الأسبوعية للأهداف الصفية' : 'Classroom inclusion & weekly progress'}
        </p>
      </div>

      <div className="space-y-3">
        {['Leo Miller', 'Maya Al-Rashid', 'Tariq Al-Otaibi'].map((stName, idx) => (
          <div
            key={stName}
            className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-4 flex items-center justify-between shadow-card"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                {stName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm text-[#1F1B3A] dark:text-white">{stName}</h4>
                <p className="text-xs text-[#6B6785]">Goal: Answers questions in class</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
              {idx === 0 ? '80% Indep' : idx === 1 ? '90% Indep' : '75% Indep'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  /* ---------------------------------------------------- */
  /* TAB 3: NOTES (Teacher observations log)             */
  /* ---------------------------------------------------- */
  const renderNotesTab = () => (
    <div className="space-y-4 pb-28 animate-in fade-in">
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">
          Classroom Logs
        </h2>
        <p className="text-xs text-[#6B6785]">
          Shared observations visible to parents and clinic team
        </p>
      </div>

      <div className="space-y-3">
        {observations.map((obs) => (
          <div
            key={obs.id}
            className="p-4 rounded-2xl bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] shadow-card space-y-1.5"
          >
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#10B981]">{obs.activity}</span>
              <span className="text-[#6B6785]">{obs.timestamp}</span>
            </div>
            <p className="text-sm font-semibold text-[#1F1B3A] dark:text-white">
              {obs.goal} • <span className="text-emerald-600">{obs.result}</span>
            </p>
            {obs.observation && (
              <p className="text-xs text-[#6B6785] dark:text-gray-300">
                "{obs.observation}"
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto px-4 pt-3">
      {activeTab.toLowerCase() === 'today' && renderRecordActivityTab()}
      {activeTab.toLowerCase() === 'students' && renderStudentsTab()}
      {activeTab.toLowerCase() === 'notes' && renderNotesTab()}
    </div>
  );
};
