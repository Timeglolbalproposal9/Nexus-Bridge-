import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plus, 
  Mic, 
  Sparkles, 
  Save, 
  Volume2, 
  Layers, 
  MessageSquare, 
  Check, 
  BarChart2, 
  BookOpen, 
  X,
  FileText
} from 'lucide-react';

export const SpeechPortal: React.FC = () => {
  const { 
    activeChild, 
    activeTab, 
    language, 
    targets, 
    addSessionResult, 
    showNotification,
    triggerConfetti 
  } = useApp();

  const isAr = language === 'ar';

  // Speech Counters matching PDF 2 Page 3
  const [independentCount, setIndependentCount] = useState<number>(5);
  const [promptedCount, setPromptedCount] = useState<number>(2);
  const [incorrectCount, setIncorrectCount] = useState<number>(1);

  // Audio recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedClips, setRecordedClips] = useState<string[]>(['Clip 1: "Dog on bed" (Clear /d/ sound)']);

  // Modals for Add Target & Add AAC Goal
  const [showAddTargetModal, setShowAddTargetModal] = useState(false);
  const [showAacModal, setShowAacModal] = useState(false);
  const [aacGoalText, setAacGoalText] = useState('Use "More" and "Help" buttons on core board during snack');

  // Speech Target
  const speechTarget = targets.find(t => t.discipline === 'speech' && t.childId === activeChild.id) || targets[0];

  const totalTrials = independentCount + promptedCount + incorrectCount;
  const currentAccuracy = totalTrials > 0 ? Math.round((independentCount / totalTrials) * 100) : 0;

  const handleSave = () => {
    addSessionResult(
      speechTarget.id,
      currentAccuracy,
      `Speech SLP: ${independentCount} indep, ${promptedCount} prompted, ${incorrectCount} incorrect (${currentAccuracy}% accuracy).`
    );
    if (currentAccuracy >= 90) {
      triggerConfetti();
    }
  };

  /* ---------------------------------------------------- */
  /* TAB 1: TODAY'S SESSION (Exact PDF 2 Page 3)         */
  /* ---------------------------------------------------- */
  const renderTodaySession = () => (
    <div className="space-y-5 pb-28 animate-in fade-in">
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white mb-1">
          {isAr ? 'جلسة اليوم' : "Today's session"}
        </h2>
        <p className="text-sm text-[#6B6785] dark:text-[#A5A0C2]">
          {isAr ? 'أهداف اللغة والتواصل' : 'Language and communication targets'}
        </p>
      </div>

      {/* Target card matching PDF 2 Page 3 */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-3">
        <div>
          <span className="text-xs font-bold text-[#4F46E5] dark:text-indigo-400">
            Target: {speechTarget.name.toLowerCase()}
          </span>
          <p className="text-xs text-[#6B6785] dark:text-[#8E8AAB] mt-1 font-medium">
            Target → Materials → Procedure → Data → Recommendation
          </p>
        </div>

        {/* 3 Big Counters matching PDF 2 Page 3 */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          {/* Independent */}
          <button
            onClick={() => setIndependentCount(c => c + 1)}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#DDF5EA] dark:bg-emerald-950/60 border-2 border-emerald-400 dark:border-emerald-700 text-[#1B9E6B] dark:text-emerald-300 active:scale-95 transition shadow-xs"
          >
            <span className="text-3xl font-bold font-heading mb-1">{independentCount}</span>
            <span className="text-xs font-semibold">{isAr ? 'مستقل' : 'Independent'}</span>
          </button>

          {/* Prompted */}
          <button
            onClick={() => setPromptedCount(c => c + 1)}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#FFF1CC] dark:bg-amber-950/60 border-2 border-amber-400 dark:border-amber-700 text-[#B7791F] dark:text-amber-300 active:scale-95 transition shadow-xs"
          >
            <span className="text-3xl font-bold font-heading mb-1">{promptedCount}</span>
            <span className="text-xs font-semibold">{isAr ? 'بتلقين' : 'Prompted'}</span>
          </button>

          {/* Incorrect */}
          <button
            onClick={() => setIncorrectCount(c => c + 1)}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#FDE3E4] dark:bg-rose-950/60 border-2 border-rose-400 dark:border-rose-700 text-[#D63B3B] dark:text-rose-300 active:scale-95 transition shadow-xs"
          >
            <span className="text-3xl font-bold font-heading mb-1">{incorrectCount}</span>
            <span className="text-xs font-semibold">{isAr ? 'غير صحيح' : 'Incorrect'}</span>
          </button>
        </div>

        <div className="flex justify-between items-center text-xs text-[#6B6785] pt-1">
          <span>Tap any counter to score trial (+1)</span>
          <button 
            onClick={() => {
              setIndependentCount(0);
              setPromptedCount(0);
              setIncorrectCount(0);
            }} 
            className="text-[11px] underline hover:text-[#4F46E5]"
          >
            Reset counters
          </button>
        </div>
      </div>

      {/* "Last 3 sessions" card matching PDF 2 Page 3 */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-1.5">
        <h3 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">
          Last 3 sessions
        </h3>
        <p className="text-sm font-medium text-[#1F1B3A] dark:text-gray-200">
          85% independent. Mastery criterion: 90% across 3 sessions. Suggested: continue current target.
        </p>
      </div>

      {/* Audio Sample Recording Tool (Hi-Rasmus / Client extension) */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-4 shadow-card flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsRecording(!isRecording);
              if (!isRecording) {
                showNotification('Recording vocal response sample...');
              } else {
                setRecordedClips(prev => [...prev, `Clip ${prev.length + 1}: WH Question Vocalization`]);
                showNotification('Vocal attempt saved for supervisor review');
              }
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition shadow-xs ${
              isRecording
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-indigo-50 dark:bg-indigo-950 text-[#4F46E5]'
            }`}
          >
            <Mic className="w-5 h-5" />
          </button>
          <div>
            <h4 className="font-semibold text-xs text-[#1F1B3A] dark:text-white">
              {isRecording ? 'Recording Speech Sample...' : 'Record Articulation Attempt'}
            </h4>
            <p className="text-[11px] text-[#6B6785]">
              {recordedClips.length} audio clip(s) attached
            </p>
          </div>
        </div>
        <span className="text-[11px] text-[#4F46E5] font-semibold bg-indigo-50 dark:bg-indigo-950 px-2 py-1 rounded-full">
          MLU 3.4
        </span>
      </div>

      {/* Buttons matching PDF 2 Page 3 */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          onClick={() => setShowAddTargetModal(true)}
          className="py-3 px-4 rounded-xl bg-white dark:bg-[#1F1B3A] border-2 border-[#1B9E6B] dark:border-emerald-600 text-[#1B9E6B] dark:text-emerald-400 font-semibold text-xs hover:bg-[#DDF5EA]/30 transition flex items-center justify-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add target</span>
        </button>

        <button
          onClick={() => setShowAacModal(true)}
          className="py-3 px-4 rounded-xl bg-white dark:bg-[#1F1B3A] border-2 border-[#1B9E6B] dark:border-emerald-600 text-[#1B9E6B] dark:text-emerald-400 font-semibold text-xs hover:bg-[#DDF5EA]/30 transition flex items-center justify-center gap-1.5 shadow-xs"
        >
          <Layers className="w-4 h-4" />
          <span>Add AAC goal</span>
        </button>
      </div>

      {/* Save session CTA */}
      <button
        onClick={handleSave}
        className="w-full py-4 rounded-2xl bg-[#1B9E6B] hover:bg-[#147952] text-white font-heading font-semibold text-base shadow-warm flex items-center justify-center gap-2 active:scale-98 transition"
      >
        <Save className="w-5 h-5" />
        <span>Save session</span>
      </button>

      {/* Add AAC Modal */}
      {showAacModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1F1B3A] rounded-2xl p-5 max-w-sm w-full space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">Add AAC Communication Target</h3>
              <button onClick={() => setShowAacModal(false)}><X className="w-4 h-4" /></button>
            </div>
            <textarea
              value={aacGoalText}
              onChange={(e) => setAacGoalText(e.target.value)}
              rows={3}
              className="w-full text-xs p-2.5 rounded-xl border border-[#E8E2D9] dark:border-gray-700 bg-[#FAF6F0] dark:bg-gray-800"
            />
            <button
              onClick={() => {
                setShowAacModal(false);
                showNotification('AAC target added to speech communication plan.');
              }}
              className="w-full py-2.5 rounded-xl bg-[#4F46E5] text-white text-xs font-semibold"
            >
              Confirm AAC Goal
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-md mx-auto px-4 pt-3">
      {activeTab.toLowerCase() === 'today' && renderTodaySession()}
      {activeTab.toLowerCase() === 'targets' && (
        <div className="space-y-4 pb-28">
          <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">Speech Targets</h2>
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] shadow-card space-y-2">
            <h4 className="font-bold text-sm text-[#4F46E5]">Target: Answering WH Questions</h4>
            <p className="text-xs text-[#6B6785]">Target → Materials → Procedure → Data → Recommendation</p>
            <div className="p-3 bg-[#FAF6F0] dark:bg-[#252044] rounded-xl text-xs space-y-1">
              <p><strong>Criterion:</strong> 90% across 3 sessions</p>
              <p><strong>Current:</strong> 85% independent</p>
              <p className="text-emerald-600 font-semibold">Suggested: Continue current target with verbal prompt fading</p>
            </div>
          </div>
        </div>
      )}
      {activeTab.toLowerCase() === 'graphs' && (
        <div className="space-y-4 pb-28">
          <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">Speech Accuracy Trend</h2>
          <div className="p-5 bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-2xl shadow-card">
            <div className="flex justify-between text-xs text-[#6B6785] mb-2">
              <span>Session History</span>
              <span className="font-bold text-emerald-600">85% Independent</span>
            </div>
            <div className="h-32 flex items-end gap-3 pt-4 border-b border-[#E8E2D9] dark:border-gray-800">
              <div className="flex-1 bg-indigo-200 rounded-t-lg h-[60%] flex items-center justify-center text-[10px] font-bold">60%</div>
              <div className="flex-1 bg-indigo-300 rounded-t-lg h-[70%] flex items-center justify-center text-[10px] font-bold">70%</div>
              <div className="flex-1 bg-indigo-400 rounded-t-lg h-[80%] flex items-center justify-center text-[10px] font-bold">80%</div>
              <div className="flex-1 bg-[#4F46E5] text-white rounded-t-lg h-[85%] flex items-center justify-center text-[10px] font-bold">85%</div>
            </div>
          </div>
        </div>
      )}
      {activeTab.toLowerCase() === 'notes' && (
        <div className="space-y-4 pb-28">
          <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">SLP Clinical Notes</h2>
          <div className="p-4 bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-2xl shadow-card space-y-2">
            <textarea
              defaultValue="Leo responded with high motivation today using picture scenes. Verbal prompt delay increased to 4 seconds. Generalization noted in classroom science class."
              rows={4}
              className="w-full text-xs p-3 rounded-xl border border-[#E8E2D9] dark:border-gray-700 bg-[#FAF6F0] dark:bg-gray-800 text-[#1F1B3A] dark:text-white"
            />
            <button
              onClick={() => showNotification('Speech notes saved.')}
              className="px-4 py-2 bg-[#4F46E5] text-white text-xs font-semibold rounded-xl"
            >
              Save SLP Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
