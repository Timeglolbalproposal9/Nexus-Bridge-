import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  BookOpen, 
  FileText, 
  Check, 
  Save, 
  Sparkles, 
  Camera, 
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';

export const RemedialPortal: React.FC = () => {
  const { activeChild, activeTab, language, addSessionResult, showNotification, triggerConfetti } = useApp();
  const isAr = language === 'ar';

  // WCPM Fluency reader state
  const [wcpmTimerRunning, setWcpmTimerRunning] = useState(false);
  const [wcpmSecondsLeft, setWcpmSecondsLeft] = useState(60);
  const [totalWordsRead, setTotalWordsRead] = useState(38);
  const [errorsCount, setErrorsCount] = useState(4);

  // Math Digits Per Minute
  const [mathDigitsCorrect, setMathDigitsCorrect] = useState(24);
  const [mathDigitsIncorrect, setMathDigitsIncorrect] = useState(2);

  // Goal Attainment Scaling (-2 Much less, -1 Less, 0 Expected, +1 More, +2 Much more)
  const [gasScore, setGasScore] = useState<number>(0);

  useEffect(() => {
    let interval: any = null;
    if (wcpmTimerRunning && wcpmSecondsLeft > 0) {
      interval = setInterval(() => {
        setWcpmSecondsLeft(s => s - 1);
      }, 1000);
    } else if (wcpmSecondsLeft === 0 && wcpmTimerRunning) {
      setWcpmTimerRunning(false);
      showNotification('1-Minute reading sample complete!');
    }
    return () => clearInterval(interval);
  }, [wcpmTimerRunning, wcpmSecondsLeft]);

  const wcpmCalculated = Math.max(0, totalWordsRead - errorsCount);

  const handleSaveFluency = () => {
    addSessionResult(
      'target-4',
      wcpmCalculated,
      `Remedial Reading Fluency: ${wcpmCalculated} WCPM (${totalWordsRead} words read, ${errorsCount} errors).`
    );
    if (wcpmCalculated >= 40) {
      triggerConfetti();
    }
  };

  /* ---------------------------------------------------- */
  /* TAB 1: TODAY (WCPM Reading & Math Sprints)          */
  /* ---------------------------------------------------- */
  const renderTodayTab = () => (
    <div className="space-y-5 pb-28 animate-in fade-in">
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white mb-1">
          {isAr ? 'جلسة المعالجة التعليمية' : 'Remedial Session'}
        </h2>
        <p className="text-sm text-[#6B6785] dark:text-[#A5A0C2]">
          {isAr ? 'الطلاقة القرائية والرياضية الصريحة' : 'Explicit Instruction & Fluency Timing'}
        </p>
      </div>

      {/* Target Card: Words Correct Per Minute */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED] bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded-full">
              Reading Fluency (WCPM)
            </span>
            <h3 className="font-heading font-bold text-base text-[#1F1B3A] dark:text-white mt-1">
              Passage #14: The Red Hen (1st Grade Decodable)
            </h3>
          </div>
          <span className="text-xs font-bold text-[#7C3AED]">Target: 40 WCPM</span>
        </div>

        {/* 60s Timer */}
        <div className="p-4 rounded-2xl bg-[#FAF6F0] dark:bg-[#252044] border border-[#E8E2D9] dark:border-[#38325E] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center font-mono font-bold text-lg text-[#7C3AED]">
              {wcpmSecondsLeft}s
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1F1B3A] dark:text-white">60-Second Fluency Sprint</p>
              <p className="text-[11px] text-[#6B6785]">Standard curriculum-based measurement</p>
            </div>
          </div>

          <button
            onClick={() => {
              if (wcpmSecondsLeft === 0) setWcpmSecondsLeft(60);
              setWcpmTimerRunning(!wcpmTimerRunning);
            }}
            className={`p-3 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 transition ${
              wcpmTimerRunning ? 'bg-amber-600' : 'bg-[#7C3AED] hover:bg-[#6D28D9]'
            }`}
          >
            {wcpmTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{wcpmTimerRunning ? 'Pause' : 'Start'}</span>
          </button>
        </div>

        {/* Words and Errors Counters */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-[#E8E2D9] dark:border-gray-700">
            <span className="text-xs text-[#6B6785] block">Total words read</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-bold text-[#1F1B3A] dark:text-white">{totalWordsRead}</span>
              <button
                onClick={() => setTotalWordsRead(w => w + 1)}
                className="px-2.5 py-1 bg-purple-600 text-white rounded-lg text-xs font-bold"
              >
                +1
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-[#E8E2D9] dark:border-gray-700">
            <span className="text-xs text-[#6B6785] block">Errors (Omission / Sub)</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-bold text-rose-600">{errorsCount}</span>
              <button
                onClick={() => setErrorsCount(e => e + 1)}
                className="px-2.5 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold"
              >
                +1
              </button>
            </div>
          </div>
        </div>

        {/* Result summary */}
        <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 flex justify-between items-center text-xs">
          <div>
            <span className="text-[#6B6785] block">Calculated Result</span>
            <span className="text-lg font-bold text-[#7C3AED]">
              {wcpmCalculated} Words Correct Per Minute (WCPM)
            </span>
          </div>
          <span className="text-purple-700 dark:text-purple-300 font-semibold bg-white dark:bg-purple-900 px-2.5 py-1 rounded-full">
            {Math.round((wcpmCalculated / 40) * 100)}% of Goal
          </span>
        </div>

        <button
          onClick={handleSaveFluency}
          className="w-full py-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm shadow-warm flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Fluency Sprint</span>
        </button>
      </div>

      {/* Goal Attainment Scaling (GAS) Card */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">
            Goal Attainment Scaling (GAS)
          </h3>
          <span className="text-xs font-bold text-[#7C3AED]">Score: {gasScore >= 0 ? `+${gasScore}` : gasScore}</span>
        </div>
        <p className="text-xs text-[#6B6785]">
          Standardized progress measure recommended for IEP review
        </p>
        <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
          {[-2, -1, 0, 1, 2].map((sc) => (
            <button
              key={sc}
              onClick={() => setGasScore(sc)}
              className={`p-2 rounded-xl border font-bold transition ${
                gasScore === sc
                  ? 'bg-[#7C3AED] text-white border-[#7C3AED]'
                  : 'bg-white dark:bg-[#252044] border-[#E8E2D9] dark:border-gray-700 text-[#6B6785]'
              }`}
            >
              {sc >= 0 ? `+${sc}` : sc}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-center text-[#6B6785]">
          {gasScore === 0 ? 'Expected outcome achieved' : gasScore > 0 ? 'Exceeding target expectations!' : 'Below expected outcome'}
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto px-4 pt-3">
      {activeTab.toLowerCase() === 'today' && renderTodayTab()}
      {activeTab.toLowerCase() === 'targets' && (
        <div className="space-y-4 pb-28">
          <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">IEP Academic Targets</h2>
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] shadow-card space-y-2">
            <h4 className="font-bold text-sm text-[#7C3AED]">Target: WCPM Reading Fluency</h4>
            <p className="text-xs text-[#6B6785]">Criterion: 40 WCPM with 90% accuracy across 3 sessions</p>
            <p className="text-xs text-emerald-600 font-semibold">Suggested action: Implement repeated reading and pre-teaching</p>
          </div>
        </div>
      )}
      {activeTab.toLowerCase() === 'graphs' && (
        <div className="space-y-4 pb-28">
          <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">Academic Sprints Trend</h2>
          <div className="p-5 bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-2xl shadow-card">
            <div className="flex justify-between text-xs text-[#6B6785] mb-2">
              <span>WCPM Progress</span>
              <span className="font-bold text-purple-600">34 WCPM (Goal: 40)</span>
            </div>
            <div className="h-32 flex items-end gap-3 pt-4 border-b border-[#E8E2D9] dark:border-gray-800">
              <div className="flex-1 bg-purple-200 rounded-t-lg h-[60%] flex items-center justify-center text-[10px] font-bold">24</div>
              <div className="flex-1 bg-purple-300 rounded-t-lg h-[70%] flex items-center justify-center text-[10px] font-bold">28</div>
              <div className="flex-1 bg-purple-400 rounded-t-lg h-[80%] flex items-center justify-center text-[10px] font-bold">31</div>
              <div className="flex-1 bg-[#7C3AED] text-white rounded-t-lg h-[85%] flex items-center justify-center text-[10px] font-bold">34</div>
            </div>
          </div>
        </div>
      )}
      {activeTab.toLowerCase() === 'notes' && (
        <div className="space-y-4 pb-28">
          <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">Remedial Education Notes</h2>
          <div className="p-4 bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-2xl shadow-card space-y-2">
            <textarea
              defaultValue="Leo responded with high enthusiasm to visual flashcards. Word substitution on 'hen' was self-corrected with explicit phonics prompt."
              rows={4}
              className="w-full text-xs p-3 rounded-xl border border-[#E8E2D9] dark:border-gray-700 bg-[#FAF6F0] dark:bg-gray-800 text-[#1F1B3A] dark:text-white"
            />
            <button
              onClick={() => showNotification('Remedial learning notes saved.')}
              className="px-4 py-2 bg-[#7C3AED] text-white text-xs font-semibold rounded-xl"
            >
              Save Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
