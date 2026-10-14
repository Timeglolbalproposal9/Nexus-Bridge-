import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BEHAVIOR_PROCEDURES, 
  CLINICAL_MEASURES 
} from '../../data/clinicalCatalog';
import { 
  Check, 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Clock, 
  TrendingUp, 
  FileText, 
  Save, 
  Mic, 
  Camera, 
  ShieldAlert, 
  Sparkles,
  ChevronRight,
  Sliders,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye
} from 'lucide-react';

export const BehaviorPortal: React.FC = () => {
  const { 
    activeChild, 
    activeTab, 
    setActiveTab, 
    language, 
    targets, 
    addSessionResult,
    showNotification,
    triggerConfetti
  } = useApp();

  const isAr = language === 'ar';

  // Sub-view on Today tab: 'plan' | 'datasheet' | 'continuous' | 'interval' | 'other_measures'
  const [sessionSubView, setSessionSubView] = useState<'datasheet' | 'plan' | 'continuous' | 'interval' | 'other_measures'>('datasheet');

  // Selected procedures and measures matching PDF 1 Page 1
  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([
    'prompt_fading',
    'dtt',
    'extinction',
    'visual_schedules'
  ]);
  const [selectedMeasures, setSelectedMeasures] = useState<string[]>([
    'frequency',
    'mts'
  ]);

  // Active target for DTT session
  const behaviorTarget = targets.find(t => t.discipline === 'behavior' && t.childId === activeChild.id) || targets[0];

  // 1-10 Trial-by-trial DTT state (PDF 1 Page 5)
  const initialTrials: Array<{ num: number; res: '+' | 'P' | '-' | null }> = [
    { num: 1, res: '+' },
    { num: 2, res: '+' },
    { num: 3, res: 'P' },
    { num: 4, res: '+' },
    { num: 5, res: '-' },
    { num: 6, res: '+' },
    { num: 7, res: '+' },
    { num: 8, res: 'P' },
    { num: 9, res: '+' },
    { num: 10, res: null },
  ];
  const [trials, setTrials] = useState(initialTrials);
  const [currentPromptLevel, setCurrentPromptLevel] = useState<'Independent' | 'Verbal' | 'Gesture' | 'Model' | 'Partial physical' | 'Full physical'>('Verbal');

  // Continuous frequency counter state
  const [frequencyCount, setFrequencyCount] = useState<number>(4);
  const [frequencyHistory, setFrequencyHistory] = useState<number[]>([4]);

  // MTS interval state
  const [mtsIntervals, setMtsIntervals] = useState<Array<{ num: number; state: 'Yes' | 'No' | null }>>([
    { num: 1, state: 'Yes' },
    { num: 2, state: 'No' },
    { num: 3, state: 'No' },
    { num: 4, state: 'Yes' },
    { num: 5, state: 'No' },
    { num: 6, state: 'Yes' },
    { num: 7, state: 'Yes' },
    { num: 8, state: 'No' },
    { num: 9, state: null },
    { num: 10, state: null },
  ]);

  // Second Observer IOA toggle
  const [ioaEnabled, setIoaEnabled] = useState<boolean>(false);

  // Continuous Measures Timers & Records (PDF 1 Page 6)
  const [durationTimerRunning, setDurationTimerRunning] = useState<boolean>(false);
  const [durationSeconds, setDurationSeconds] = useState<number>(134); // 2:14
  const [durationEpisodes, setDurationEpisodes] = useState<Array<{ id: number; time: string }>>([
    { id: 1, time: '1:05' },
    { id: 2, time: '2:14' }
  ]);

  // Rate timer
  const [rateTimerRunning, setRateTimerRunning] = useState<boolean>(true);
  const [rateResponses, setRateResponses] = useState<number>(4);
  const [rateElapsedSec, setRateElapsedSec] = useState<number>(750); // 12:30 min

  // Latency & IRT
  const [latencyTrials, setLatencyTrials] = useState<number[]>([4, 7, 3]);
  const [irtResponses, setIrtResponses] = useState<Array<{ num: number; time: number }>>([
    { num: 2, time: 12 },
    { num: 3, time: 8 },
    { num: 4, time: 15 }
  ]);

  // Interval and Sampling (PDF 1 Page 7)
  const [partialIntervals, setPartialIntervals] = useState<boolean[]>([
    true, false, true, true, false, false, true, false, true, false
  ]);
  const [wholeIntervals, setWholeIntervals] = useState<boolean[]>([
    true, false, false, true, false, false, false, true, false, false
  ]);

  // Notes state
  const [sessionNotes, setSessionNotes] = useState(
    'Leo participated actively in DTT trials for object identification. Responded well to verbal prompt fading on "shoe" and "cup". Mild vocal protest at trial 5 resolved with brief sensory break.'
  );
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);

  // Timer tick for rate and duration
  useEffect(() => {
    let interval: any = null;
    if (durationTimerRunning) {
      interval = setInterval(() => {
        setDurationSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [durationTimerRunning]);

  useEffect(() => {
    let interval: any = null;
    if (rateTimerRunning) {
      interval = setInterval(() => {
        setRateElapsedSec(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [rateTimerRunning]);

  // Compute live summary statistics
  const scoredTrials = trials.filter(t => t.res !== null);
  const independentTrials = scoredTrials.filter(t => t.res === '+');
  const percentIndependent = scoredTrials.length > 0 
    ? Math.round((independentTrials.length / scoredTrials.length) * 100) 
    : 0;

  const toggleProcedure = (id: string) => {
    setSelectedProcedures(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleMeasure = (id: string) => {
    setSelectedMeasures(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleTrialClick = (num: number) => {
    setTrials(prev => prev.map(t => {
      if (t.num === num) {
        const nextRes: '+' | 'P' | '-' | null = 
          t.res === null ? '+' : t.res === '+' ? 'P' : t.res === 'P' ? '-' : null;
        return { ...t, res: nextRes };
      }
      return t;
    }));
  };

  const handleSaveSession = () => {
    addSessionResult(
      behaviorTarget.id,
      percentIndependent,
      `DTT Session: ${percentIndependent}% independent across ${scoredTrials.length} trials.`
    );
    if (percentIndependent >= 90) {
      triggerConfetti();
    }
  };

  /* ---------------------------------------------------- */
  /* SUBVIEW 1: PLAN THE SESSION (Exact PDF 1 Page 1)    */
  /* ---------------------------------------------------- */
  const renderPlanView = () => (
    <div className="space-y-6 pb-24 animate-in fade-in">
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white mb-1">
          {isAr ? 'تخطيط الجلسة' : 'Plan the session'}
        </h2>
        <p className="text-sm text-[#6B6785] dark:text-[#A5A0C2]">
          {isAr
            ? 'اختر الإجراءات وطرق القياس. اختياراتك تقوم ببناء ورقة جمع البيانات آلياً.'
            : 'Choose what you will use. Your choices set up the datasheet.'}
        </p>
      </div>

      {/* Treatment procedures */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-base text-[#1F1B3A] dark:text-white">
          {isAr ? 'الإجراءات العلاجية' : 'Treatment procedures'}
        </h3>

        {/* Skill acquisition and behavior increase */}
        <div>
          <h4 className="text-xs font-semibold text-[#6B6785] dark:text-[#8E8AAB] mb-2 uppercase tracking-wider">
            {isAr ? 'اكتساب المهارات وزيادة السلوك' : 'Skill acquisition and behavior increase'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {BEHAVIOR_PROCEDURES.filter(p => p.category === 'skill_acquisition').map((proc) => {
              const isSelected = selectedProcedures.includes(proc.id);
              return (
                <button
                  key={proc.id}
                  onClick={() => toggleProcedure(proc.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-[#E0E7FF] border-[#4F46E5] text-[#4F46E5] font-semibold dark:bg-indigo-950 dark:border-indigo-400 dark:text-indigo-200'
                      : 'bg-white dark:bg-[#1F1B3A] border-[#E8E2D9] dark:border-[#38325E] text-[#1F1B3A] dark:text-gray-300 hover:border-gray-400'
                  }`}
                >
                  {isSelected && '✓ '}
                  {proc.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Behavior reduction */}
        <div>
          <h4 className="text-xs font-semibold text-[#6B6785] dark:text-[#8E8AAB] mb-2 uppercase tracking-wider">
            {isAr ? 'خفض السلوكيات غير المرغوبة' : 'Behavior reduction'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {BEHAVIOR_PROCEDURES.filter(p => p.category === 'behavior_reduction').map((proc) => {
              const isSelected = selectedProcedures.includes(proc.id);
              return (
                <button
                  key={proc.id}
                  onClick={() => toggleProcedure(proc.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-[#E0E7FF] border-[#4F46E5] text-[#4F46E5] font-semibold dark:bg-indigo-950 dark:border-indigo-400 dark:text-indigo-200'
                      : 'bg-white dark:bg-[#1F1B3A] border-[#E8E2D9] dark:border-[#38325E] text-[#1F1B3A] dark:text-gray-300 hover:border-gray-400'
                  }`}
                >
                  {isSelected && '✓ '}
                  {proc.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Other treatment procedures */}
        <div>
          <h4 className="text-xs font-semibold text-[#6B6785] dark:text-[#8E8AAB] mb-2 uppercase tracking-wider">
            {isAr ? 'إجراءات علاجية أخرى' : 'Other treatment procedures'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {BEHAVIOR_PROCEDURES.filter(p => p.category === 'other').map((proc) => {
              const isSelected = selectedProcedures.includes(proc.id);
              return (
                <button
                  key={proc.id}
                  onClick={() => toggleProcedure(proc.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-[#E0E7FF] border-[#4F46E5] text-[#4F46E5] font-semibold dark:bg-indigo-950 dark:border-indigo-400 dark:text-indigo-200'
                      : 'bg-white dark:bg-[#1F1B3A] border-[#E8E2D9] dark:border-[#38325E] text-[#1F1B3A] dark:text-gray-300 hover:border-gray-400'
                  }`}
                >
                  {isSelected && '✓ '}
                  {proc.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Measurement methods */}
      <div className="space-y-4 pt-2">
        <h3 className="font-heading font-bold text-base text-[#1F1B3A] dark:text-white">
          {isAr ? 'طرق القياس' : 'Measurement methods'}
        </h3>

        {/* Continuous */}
        <div>
          <h4 className="text-xs font-semibold text-[#6B6785] dark:text-[#8E8AAB] mb-2 uppercase tracking-wider">
            {isAr ? 'القياس المستمر' : 'Continuous'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {CLINICAL_MEASURES.filter(m => m.category === 'continuous').map((m) => {
              const isSelected = selectedMeasures.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => toggleMeasure(m.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-[#E0E7FF] border-[#4F46E5] text-[#4F46E5] font-semibold dark:bg-indigo-950 dark:border-indigo-400 dark:text-indigo-200'
                      : 'bg-white dark:bg-[#1F1B3A] border-[#E8E2D9] dark:border-[#38325E] text-[#1F1B3A] dark:text-gray-300 hover:border-gray-400'
                  }`}
                >
                  {isSelected && '✓ '}
                  {m.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Discontinuous */}
        <div>
          <h4 className="text-xs font-semibold text-[#6B6785] dark:text-[#8E8AAB] mb-2 uppercase tracking-wider">
            {isAr ? 'القياس غير المستمر (فترات)' : 'Discontinuous'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {CLINICAL_MEASURES.filter(m => m.category === 'discontinuous').map((m) => {
              const isSelected = selectedMeasures.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => toggleMeasure(m.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-[#E0E7FF] border-[#4F46E5] text-[#4F46E5] font-semibold dark:bg-indigo-950 dark:border-indigo-400 dark:text-indigo-200'
                      : 'bg-white dark:bg-[#1F1B3A] border-[#E8E2D9] dark:border-[#38325E] text-[#1F1B3A] dark:text-gray-300 hover:border-gray-400'
                  }`}
                >
                  {isSelected && '✓ '}
                  {m.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Done button to return to configured datasheet */}
      <div className="pt-4">
        <button
          onClick={() => {
            setSessionSubView('datasheet');
            showNotification('Datasheet configured dynamically from your selected procedures.');
          }}
          className="w-full py-3.5 rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-sm shadow-warm flex items-center justify-center gap-2"
        >
          <Sliders className="w-4 h-4" />
          <span>{isAr ? 'تطبيق والانتقال إلى ورقة البيانات' : 'Apply & Open Session Datasheet'}</span>
        </button>
      </div>
    </div>
  );

  /* ---------------------------------------------------- */
  /* SUBVIEW 2: SESSION DATASHEET (Exact PDF 1 Page 5)    */
  /* ---------------------------------------------------- */
  const renderDatasheetView = () => (
    <div className="space-y-5 pb-28 animate-in fade-in">
      {/* Header & Subview Navigator */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white mb-0.5">
            {isAr ? 'ورقة بيانات الجلسة' : 'Session datasheet'}
          </h2>
          <p className="text-xs text-[#6B6785] dark:text-[#A5A0C2]">
            {isAr
              ? 'مبنية وفق اختياراتك من الإجراءات والقياسات.'
              : 'Built from your chosen procedures and measures. Sample data shown.'}
          </p>
        </div>
        <button
          onClick={() => setSessionSubView('plan')}
          className="px-3 py-1 rounded-xl bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] text-xs font-semibold text-[#4F46E5] hover:bg-[#F4EEE6] transition flex items-center gap-1 shadow-xs"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{isAr ? 'تعديل الإجراءات' : 'Plan'}</span>
        </button>
      </div>

      {/* Sub-measure quick tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'datasheet', label: 'DTT & MTS (Main)' },
          { id: 'continuous', label: 'Continuous (Freq/Rate/Dur)' },
          { id: 'interval', label: 'Interval & Sampling' },
          { id: 'other_measures', label: 'Other (IOA / Integrity)' },
        ].map((sub) => (
          <button
            key={sub.id}
            onClick={() => setSessionSubView(sub.id as any)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
              sessionSubView === sub.id
                ? 'bg-[#4F46E5] text-white shadow-xs'
                : 'bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] text-[#6B6785] dark:text-gray-300'
            }`}
          >
            {sub.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: Trial-by-trial · Discrete-trial training */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-4">
        <div>
          <span className="text-[11px] font-semibold text-[#4F46E5] dark:text-indigo-400 uppercase tracking-wider block mb-0.5">
            Trial-by-trial · Discrete-trial training
          </span>
          <h3 className="font-heading font-bold text-base text-[#1F1B3A] dark:text-white">
            Target: {behaviorTarget.name}
          </h3>
        </div>

        {/* 1-10 Grid matching PDF 1 Page 5 */}
        <div className="grid grid-cols-5 gap-2.5">
          {trials.map((trial) => {
            let bgClass = 'bg-[#FAF6F0] dark:bg-[#252044] border-[#E8E2D9] dark:border-[#38325E] text-gray-400';
            let symbol = '…';
            if (trial.res === '+') {
              bgClass = 'bg-[#DDF5EA] dark:bg-emerald-950/60 border-emerald-400 text-[#1B9E6B] dark:text-emerald-300 font-bold';
              symbol = '+';
            } else if (trial.res === 'P') {
              bgClass = 'bg-[#FFF1CC] dark:bg-amber-950/60 border-amber-400 text-[#B7791F] dark:text-amber-300 font-bold';
              symbol = 'P';
            } else if (trial.res === '-') {
              bgClass = 'bg-[#FDE3E4] dark:bg-rose-950/60 border-rose-400 text-[#D63B3B] dark:text-rose-300 font-bold';
              symbol = '−';
            }

            return (
              <button
                key={trial.num}
                onClick={() => handleTrialClick(trial.num)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border-2 transition active:scale-95 ${bgClass}`}
                title={`Trial ${trial.num}: Click to toggle result (+, P, -)`}
              >
                <span className="text-[11px] font-medium text-[#6B6785] dark:text-[#8E8AAB]">
                  {trial.num}
                </span>
                <span className="text-lg font-bold leading-tight">{symbol}</span>
              </button>
            );
          })}
        </div>

        <p className="text-center text-xs text-[#6B6785] dark:text-gray-400">
          + independent · P prompted · − incorrect
        </p>

        {/* Prompt level for this trial (least to most) */}
        <div>
          <label className="text-xs font-semibold text-[#1F1B3A] dark:text-white block mb-2">
            Prompt level for this trial (least to most)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              'Independent',
              'Verbal',
              'Gesture',
              'Model',
              'Partial physical',
              'Full physical',
            ].map((p) => {
              const isSelected = currentPromptLevel === p;
              return (
                <button
                  key={p}
                  onClick={() => setCurrentPromptLevel(p as any)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition ${
                    isSelected
                      ? 'bg-[#E0E7FF] border-[#4F46E5] text-[#4F46E5] font-semibold dark:bg-indigo-950 dark:border-indigo-400 dark:text-indigo-200 shadow-xs'
                      : 'bg-white dark:bg-[#1F1B3A] border-[#E8E2D9] dark:border-[#38325E] text-[#1F1B3A] dark:text-gray-300'
                  }`}
                >
                  {isSelected ? `✓ ${p}` : p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary box matching PDF 1 Page 5 */}
        <div className="p-3.5 rounded-2xl bg-[#FAF6F0] dark:bg-[#252044] border border-[#E8E2D9] dark:border-[#38325E]">
          <h4 className="text-xs font-bold text-[#1F1B3A] dark:text-white mb-1">Summary</h4>
          <p className="text-xs font-medium text-[#1F1B3A] dark:text-gray-200">
            {independentTrials.length} of {scoredTrials.length} trials independent so far ({percentIndependent}%).
          </p>
          <p className="text-xs text-[#6B6785] dark:text-[#8E8AAB]">
            Mastery criterion: 90% across 3 sessions.
          </p>
        </div>
      </div>

      {/* SECTION 2: Frequency counter (PDF 1 Page 5) */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-3">
        <div>
          <span className="text-[11px] font-semibold text-[#4F46E5] dark:text-indigo-400 uppercase tracking-wider block">
            Frequency
          </span>
          <p className="text-xs text-[#6B6785] dark:text-gray-400">
            [Operational definition: Out-of-seat behavior during table-top task]
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold font-heading text-[#1F1B3A] dark:text-white min-w-[50px] text-center">
            {frequencyCount}
          </div>

          <button
            onClick={() => {
              setFrequencyHistory(prev => [...prev, frequencyCount + 1]);
              setFrequencyCount(c => c + 1);
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-[#1B9E6B] hover:bg-[#16855A] text-white font-bold text-base shadow-xs active:scale-95 transition flex items-center justify-center gap-1.5"
          >
            <Plus className="w-5 h-5" />
            <span>+1</span>
          </button>

          <button
            onClick={() => {
              if (frequencyCount > 0) {
                setFrequencyCount(c => c - 1);
              }
            }}
            className="py-3 px-4 rounded-xl border border-[#E8E2D9] dark:border-[#38325E] text-[#6B6785] hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-semibold active:scale-95 transition"
          >
            Undo
          </button>
        </div>
      </div>

      {/* SECTION 3: Momentary time sampling · every 30 seconds (PDF 1 Page 5) */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-3">
        <div>
          <span className="text-[11px] font-semibold text-[#4F46E5] dark:text-indigo-400 uppercase tracking-wider block">
            Momentary time sampling · every 30 seconds
          </span>
          <p className="text-xs text-[#6B6785] dark:text-gray-400">
            Yes = behavior occurring at the moment the interval ends
          </p>
        </div>

        {/* 1-10 MTS grid */}
        <div className="grid grid-cols-5 gap-2">
          {mtsIntervals.map((inv) => (
            <button
              key={inv.num}
              onClick={() => {
                setMtsIntervals(prev => prev.map(item => {
                  if (item.num === inv.num) {
                    const next = item.state === null ? 'Yes' : item.state === 'Yes' ? 'No' : null;
                    return { ...item, state: next };
                  }
                  return item;
                }));
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl border transition ${
                inv.state === 'Yes'
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 text-emerald-800 dark:text-emerald-300 font-bold'
                  : inv.state === 'No'
                  ? 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                  : 'bg-[#FAF6F0] dark:bg-[#252044] border-[#E8E2D9] dark:border-[#38325E] text-gray-400'
              }`}
            >
              <span className="text-[10px] text-[#6B6785]">{inv.num}</span>
              <span className="text-xs font-semibold">{inv.state || '—'}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 4: Second observer (IOA) Toggle (PDF 1 Page 5) */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-2xl p-4 flex items-center justify-between shadow-card">
        <div>
          <span className="text-xs font-semibold text-[#1F1B3A] dark:text-white block">
            Second observer (IOA)
          </span>
          <span className="text-[11px] text-[#6B6785] dark:text-gray-400">
            Calculates interobserver agreement during live trial
          </span>
        </div>
        <button
          onClick={() => {
            setIoaEnabled(!ioaEnabled);
            showNotification(ioaEnabled ? 'IOA second observer mode disabled' : 'IOA enabled: Dual observer score matching active');
          }}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
            ioaEnabled
              ? 'bg-[#1B9E6B] text-white shadow-xs'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          {ioaEnabled ? 'On (89%)' : 'Off'}
        </button>
      </div>

      {/* Save Session CTA Button */}
      <button
        onClick={handleSaveSession}
        className="w-full py-4 rounded-2xl bg-[#1B9E6B] hover:bg-[#147952] text-white font-heading font-semibold text-base shadow-warm flex items-center justify-center gap-2 active:scale-98 transition"
      >
        <Save className="w-5 h-5" />
        <span>Save session</span>
      </button>
    </div>
  );

  /* ---------------------------------------------------- */
  /* SUBVIEW 3: CONTINUOUS MEASURES (Exact PDF 1 Page 6)  */
  /* ---------------------------------------------------- */
  const renderContinuousView = () => (
    <div className="space-y-4 pb-28 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">
            Continuous measures
          </h2>
          <p className="text-xs text-[#6B6785]">Sample data shown.</p>
        </div>
        <button
          onClick={() => setSessionSubView('datasheet')}
          className="text-xs font-semibold text-[#4F46E5] hover:underline"
        >
          ← Back to Datasheet
        </button>
      </div>

      {/* Frequency (count) */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-2">
        <h3 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">Frequency (count)</h3>
        <p className="text-xs text-[#6B6785]">Count each time the behavior occurs</p>
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-3xl font-bold text-[#1F1B3A] dark:text-white mr-2">{frequencyCount}</span>
            <span className="text-xs text-[#6B6785]">occurrences</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFrequencyCount(c => c + 1)}
              className="px-4 py-2 bg-[#1B9E6B] text-white rounded-xl text-xs font-bold"
            >
              +1
            </button>
            <button
              onClick={() => frequencyCount > 0 && setFrequencyCount(c => c - 1)}
              className="px-3 py-2 border border-[#E8E2D9] dark:border-gray-700 text-xs font-semibold rounded-xl"
            >
              Undo
            </button>
          </div>
        </div>
        <p className="text-[11px] text-[#6B6785] pt-1">Session length: 30 min</p>
      </div>

      {/* Rate */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-2">
        <h3 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">Rate</h3>
        <p className="text-xs text-[#6B6785]">Count divided by observation time</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#1F1B3A] dark:text-white">
            {(rateResponses / (rateElapsedSec / 60)).toFixed(2)}
          </span>
          <span className="text-xs text-[#6B6785]">per minute</span>
        </div>
        <div className="flex justify-between text-xs text-[#6B6785] pt-1 border-t border-[#E8E2D9] dark:border-gray-800">
          <span>Responses: {rateResponses}</span>
          <span>Observation time: {Math.floor(rateElapsedSec / 60)}:{(rateElapsedSec % 60).toString().padStart(2, '0')} min</span>
        </div>
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => setRateResponses(r => r + 1)}
            className="flex-1 py-2 bg-[#1B9E6B] text-white rounded-xl text-xs font-bold"
          >
            +1 Response
          </button>
          <button
            onClick={() => setRateTimerRunning(!rateTimerRunning)}
            className="flex-1 py-2 border border-[#E8E2D9] dark:border-gray-700 text-xs font-semibold rounded-xl"
          >
            {rateTimerRunning ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>

      {/* Duration */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-2">
        <h3 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">Duration</h3>
        <p className="text-xs text-[#6B6785]">Time from start to end of each episode</p>
        <div className="text-3xl font-bold font-mono text-[#1F1B3A] dark:text-white">
          {Math.floor(durationSeconds / 60).toString().padStart(2, '0')}:{(durationSeconds % 60).toString().padStart(2, '0')}
          <span className="text-xs font-normal text-[#6B6785] font-sans ml-2">current episode</span>
        </div>
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => setDurationTimerRunning(true)}
            className="flex-1 py-2 bg-[#1B9E6B] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start</span>
          </button>
          <button
            onClick={() => {
              setDurationTimerRunning(false);
              const min = Math.floor(durationSeconds / 60);
              const sec = (durationSeconds % 60).toString().padStart(2, '0');
              setDurationEpisodes(prev => [...prev, { id: prev.length + 1, time: `${min}:${sec}` }]);
            }}
            className="flex-1 py-2 border border-[#E8E2D9] dark:border-gray-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1"
          >
            <Pause className="w-3.5 h-3.5" />
            <span>Stop</span>
          </button>
        </div>
        <div className="space-y-1 pt-2 text-xs text-[#6B6785] border-t border-[#E8E2D9] dark:border-gray-800">
          {durationEpisodes.map(ep => (
            <div key={ep.id} className="flex justify-between">
              <span>Episode {ep.id}</span>
              <span className="font-mono">{ep.time}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold text-[#1F1B3A] dark:text-white pt-1">
            <span>Total • Mean</span>
            <span>3:19 • 1:40</span>
          </div>
        </div>
      </div>

      {/* Latency */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-2">
        <h3 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">Latency</h3>
        <p className="text-xs text-[#6B6785]">Time from the instruction to the response</p>
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => showNotification('Instruction timer started')}
            className="flex-1 py-2 bg-[#1B9E6B] text-white rounded-xl text-xs font-bold"
          >
            Instruction given
          </button>
          <button
            onClick={() => showNotification('Response recorded at 4.2s')}
            className="flex-1 py-2 border border-[#E8E2D9] dark:border-gray-700 text-xs font-semibold rounded-xl"
          >
            Response
          </button>
        </div>
        <div className="space-y-1 text-xs text-[#6B6785] pt-2">
          {latencyTrials.map((sec, idx) => (
            <div key={idx} className="flex justify-between">
              <span>Trial {idx + 1}</span>
              <span>{sec} s</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold text-[#1F1B3A] dark:text-white pt-1 border-t border-[#E8E2D9] dark:border-gray-800">
            <span>Mean</span>
            <span>4.7 s</span>
          </div>
        </div>
      </div>

      {/* IRT (Interresponse time) */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-2">
        <h3 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">Interresponse time (IRT)</h3>
        <p className="text-xs text-[#6B6785]">Time between one response and the next</p>
        <button
          onClick={() => {
            const last = irtResponses[irtResponses.length - 1];
            const nextTime = Math.floor(Math.random() * 8) + 8;
            setIrtResponses(prev => [...prev, { num: (last?.num || 1) + 1, time: nextTime }]);
          }}
          className="w-full py-2 bg-[#1B9E6B] text-white rounded-xl text-xs font-bold"
        >
          Response occurred
        </button>
        <div className="space-y-1 text-xs text-[#6B6785] pt-2">
          {irtResponses.map(r => (
            <div key={r.num} className="flex justify-between">
              <span>Response {r.num}</span>
              <span>{r.time} s after #{r.num - 1}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold text-[#1F1B3A] dark:text-white pt-1 border-t border-[#E8E2D9] dark:border-gray-800">
            <span>Mean IRT</span>
            <span>11.7 s</span>
          </div>
        </div>
      </div>
    </div>
  );

  /* ---------------------------------------------------- */
  /* SUBVIEW 4: INTERVAL & SAMPLING (Exact PDF 1 Page 7) */
  /* ---------------------------------------------------- */
  const renderIntervalView = () => (
    <div className="space-y-4 pb-28 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">
            Interval and sampling
          </h2>
          <p className="text-xs text-[#6B6785]">Sample data shown.</p>
        </div>
        <button
          onClick={() => setSessionSubView('datasheet')}
          className="text-xs font-semibold text-[#4F46E5] hover:underline"
        >
          ← Back to Datasheet
        </button>
      </div>

      {/* Partial-interval recording */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-2">
        <h3 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">Partial-interval recording</h3>
        <p className="text-xs text-[#6B6785]">
          Yes if the behavior occurs at any time in the 10-second interval
        </p>
        <div className="grid grid-cols-5 gap-2 pt-2">
          {partialIntervals.map((occ, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPartialIntervals(prev => {
                  const arr = [...prev];
                  arr[idx] = !arr[idx];
                  return arr;
                });
              }}
              className={`p-2 rounded-xl text-center border transition ${
                occ
                  ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-400 text-emerald-800 dark:text-emerald-300 font-bold'
                  : 'bg-white dark:bg-[#1F1B3A] border-[#E8E2D9] dark:border-gray-700 text-gray-500'
              }`}
            >
              <div className="text-[10px] text-[#6B6785]">{idx + 1}</div>
              <div className="text-xs font-semibold">{occ ? 'Yes' : 'No'}</div>
            </button>
          ))}
        </div>
        <p className="text-xs font-semibold text-[#1F1B3A] dark:text-white pt-2 border-t border-[#E8E2D9] dark:border-gray-800">
          Intervals with behavior: {partialIntervals.filter(Boolean).length} of 10 ({partialIntervals.filter(Boolean).length * 10}%)
        </p>
      </div>

      {/* Whole-interval recording */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-2">
        <h3 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">Whole-interval recording</h3>
        <p className="text-xs text-[#6B6785]">
          Yes only if the behavior lasts the whole 10-second interval
        </p>
        <div className="grid grid-cols-5 gap-2 pt-2">
          {wholeIntervals.map((occ, idx) => (
            <button
              key={idx}
              onClick={() => {
                setWholeIntervals(prev => {
                  const arr = [...prev];
                  arr[idx] = !arr[idx];
                  return arr;
                });
              }}
              className={`p-2 rounded-xl text-center border transition ${
                occ
                  ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-400 text-emerald-800 dark:text-emerald-300 font-bold'
                  : 'bg-white dark:bg-[#1F1B3A] border-[#E8E2D9] dark:border-gray-700 text-gray-500'
              }`}
            >
              <div className="text-[10px] text-[#6B6785]">{idx + 1}</div>
              <div className="text-xs font-semibold">{occ ? 'Yes' : 'No'}</div>
            </button>
          ))}
        </div>
        <p className="text-xs font-semibold text-[#1F1B3A] dark:text-white pt-2 border-t border-[#E8E2D9] dark:border-gray-800">
          Intervals with behavior: {wholeIntervals.filter(Boolean).length} of 10 ({wholeIntervals.filter(Boolean).length * 10}%)
        </p>
      </div>
    </div>
  );

  /* ---------------------------------------------------- */
  /* SUBVIEW 5: OTHER MEASURES (Exact PDF 1 Page 8 & 9)   */
  /* ---------------------------------------------------- */
  const renderOtherMeasuresView = () => (
    <div className="space-y-4 pb-28 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">
            Other clinical measures
          </h2>
          <p className="text-xs text-[#6B6785]">Sample data shown.</p>
        </div>
        <button
          onClick={() => setSessionSubView('datasheet')}
          className="text-xs font-semibold text-[#4F46E5] hover:underline"
        >
          ← Back to Datasheet
        </button>
      </div>

      {/* Permanent product recording */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-2">
        <h3 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">Permanent product recording</h3>
        <p className="text-xs text-[#6B6785]">Score what the behavior leaves behind</p>
        <div className="space-y-1 text-xs pt-1">
          <div className="flex justify-between"><span>Worksheet 1</span><span className="font-semibold">8 of 10 correct</span></div>
          <div className="flex justify-between"><span>Worksheet 2</span><span className="font-semibold">9 of 10 correct</span></div>
        </div>
        <button
          onClick={() => showNotification('Worksheet photo captured and stored securely')}
          className="w-full py-2.5 rounded-xl border border-[#E8E2D9] dark:border-gray-700 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <Camera className="w-4 h-4 text-indigo-500" />
          <span>Attach photo</span>
        </button>
      </div>

      {/* IOA Calculator */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-2">
        <h3 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">Interobserver agreement (IOA)</h3>
        <p className="text-xs text-[#6B6785]">Two observers record independently</p>
        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800">
            <span className="text-[#6B6785] block">Observer 1</span>
            <span className="text-base font-bold">8</span>
          </div>
          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800">
            <span className="text-[#6B6785] block">Observer 2</span>
            <span className="text-base font-bold">9</span>
          </div>
        </div>
        <div className="flex justify-between text-xs text-[#6B6785] pt-1">
          <span>Method</span>
          <span className="font-medium text-[#1F1B3A] dark:text-white">Total count</span>
        </div>
        <div className="flex justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-1 border-t border-[#E8E2D9] dark:border-gray-800">
          <span>Agreement formula</span>
          <span>8 ÷ 9 × 100 = 89%</span>
        </div>
      </div>

      {/* Treatment integrity measurement */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-3">
        <h3 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">Treatment integrity measurement</h3>
        <p className="text-xs text-[#6B6785]">Check the procedure was delivered as written</p>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span>Give the instruction</span>
            <span className="text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">✓ Done</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Wait 3 seconds</span>
            <span className="text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">✓ Done</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Use the correct prompt</span>
            <span className="text-rose-600 font-semibold bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-full">✗ Missed</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Deliver reinforcement</span>
            <span className="text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">✓ Done</span>
          </div>
        </div>
        <p className="text-xs font-semibold text-[#1F1B3A] dark:text-white pt-2 border-t border-[#E8E2D9] dark:border-gray-800">
          3 of 4 steps correct (75%)
        </p>
      </div>
    </div>
  );

  /* ---------------------------------------------------- */
  /* TAB 2: TARGETS (Library, operational defs, rules)    */
  /* ---------------------------------------------------- */
  const renderTargetsTab = () => (
    <div className="space-y-4 pb-28 animate-in fade-in">
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">
          Active targets
        </h2>
        <p className="text-xs text-[#6B6785]">
          Operational definitions, materials, prompt fading steps and decision engine
        </p>
      </div>

      {targets.filter(t => t.childId === activeChild.id).map((target) => (
        <div
          key={target.id}
          className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-3"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F46E5] bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-full">
                {target.domain}
              </span>
              <h3 className="font-heading font-bold text-base text-[#1F1B3A] dark:text-white mt-1">
                {target.name}
              </h3>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 capitalize">
              {target.status}
            </span>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#1F1B3A] dark:text-white mb-1">Operational Definition</h4>
            <p className="text-xs text-[#6B6785] dark:text-gray-300 leading-relaxed">
              {target.operationalDefinition}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#1F1B3A] dark:text-white mb-1">Materials</h4>
            <ul className="text-xs text-[#6B6785] dark:text-gray-300 list-disc list-inside space-y-0.5">
              {target.materials.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>

          {/* Signature Decision Support Card (Client requirement) */}
          <div className="p-3.5 rounded-2xl bg-[#FAF6F0] dark:bg-[#252044] border-l-4 border-l-[#4F46E5] border border-[#E8E2D9] dark:border-[#38325E] space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] dark:text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Decision Support Engine</span>
            </div>
            <p className="text-xs font-medium text-[#1F1B3A] dark:text-white">
              Performance: {target.currentPerformance}% independent. Mastery criterion: {target.masteryCriterion}.
            </p>
            <p className="text-xs text-[#10B981] font-semibold">
              Suggested action: {target.suggestedAction}
            </p>
            <p className="text-xs text-[#6B6785] dark:text-gray-400">
              Suggested next step: {target.suggestedNextStep}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  /* ---------------------------------------------------- */
  /* TAB 3: GRAPHS (Live line/bar chart with phase line)  */
  /* ---------------------------------------------------- */
  const renderGraphsTab = () => (
    <div className="space-y-4 pb-28 animate-in fade-in">
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">
          Clinical graphs
        </h2>
        <p className="text-xs text-[#6B6785]">
          Trial-by-trial accuracy, criterion reference line, and phase changes
        </p>
      </div>

      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-sm text-[#1F1B3A] dark:text-white">
            Identifying Common Objects (% Independent)
          </h3>
          <span className="text-xs font-bold text-[#4F46E5]">Criterion: 90%</span>
        </div>

        {/* SVG Graph */}
        <div className="h-48 w-full relative pt-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 320 160">
            {/* Grid lines */}
            <line x1="30" y1="20" x2="310" y2="20" stroke="#E8E2D9" strokeDasharray="3 3" />
            <line x1="30" y1="60" x2="310" y2="60" stroke="#E8E2D9" strokeDasharray="3 3" />
            <line x1="30" y1="100" x2="310" y2="100" stroke="#E8E2D9" strokeDasharray="3 3" />
            <line x1="30" y1="140" x2="310" y2="140" stroke="#1F1B3A" strokeWidth="1.5" />
            <line x1="30" y1="10" x2="30" y2="140" stroke="#1F1B3A" strokeWidth="1.5" />

            {/* Y axis labels */}
            <text x="5" y="24" fontSize="9" fill="#6B6785">100%</text>
            <text x="12" y="64" fontSize="9" fill="#6B6785">75%</text>
            <text x="12" y="104" fontSize="9" fill="#6B6785">50%</text>
            <text x="18" y="144" fontSize="9" fill="#6B6785">0%</text>

            {/* Coral Criterion Line (90%) */}
            <line x1="30" y1="36" x2="310" y2="36" stroke="#FF6B57" strokeWidth="2" strokeDasharray="4 4" />
            <text x="240" y="32" fontSize="9" fill="#FF6B57" fontWeight="bold">Criterion (90%)</text>

            {/* Phase change line (Baseline -> Intervention) */}
            <line x1="100" y1="10" x2="100" y2="140" stroke="#6B6785" strokeWidth="1.5" strokeDasharray="2 2" />
            <text x="50" y="16" fontSize="9" fill="#6B6785" textAnchor="middle">Baseline</text>
            <text x="180" y="16" fontSize="9" fill="#4F46E5" fontWeight="bold" textAnchor="middle">DTT + Fading</text>

            {/* Data line */}
            <polyline
              fill="none"
              stroke="#4F46E5"
              strokeWidth="2.5"
              points="45,120 75,115 110,85 145,65 180,60 215,55 250,50 285,42"
            />

            {/* Data points */}
            {[
              { x: 45, y: 120, label: '35%' },
              { x: 75, y: 115, label: '40%' },
              { x: 110, y: 85, label: '60%' },
              { x: 145, y: 65, label: '75%' },
              { x: 180, y: 60, label: '78%' },
              { x: 215, y: 55, label: '82%' },
              { x: 250, y: 50, label: '85%' },
              { x: 285, y: 42, label: '88%' },
            ].map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r="4.5"
                fill="#4F46E5"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>

        <div className="flex items-center justify-between text-xs text-[#6B6785] pt-2 border-t border-[#E8E2D9] dark:border-gray-800">
          <span>8 consecutive clinical sessions</span>
          <span className="font-semibold text-emerald-600">Upward Trend (+53%)</span>
        </div>
      </div>
    </div>
  );

  /* ---------------------------------------------------- */
  /* TAB 4: NOTES (Voice-to-text, incident, reports)      */
  /* ---------------------------------------------------- */
  const renderNotesTab = () => (
    <div className="space-y-4 pb-28 animate-in fade-in">
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">
          Session notes
        </h2>
        <p className="text-xs text-[#6B6785]">
          Voice-to-text transcription, AI draft approval and supervisor co-signing
        </p>
      </div>

      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#1F1B3A] dark:text-white">Clinical Session Narrative</span>
          <button
            onClick={() => {
              setIsRecordingAudio(!isRecordingAudio);
              if (!isRecordingAudio) {
                showNotification('Listening to speech... speak your clinical notes.');
              }
            }}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              isRecordingAudio
                ? 'bg-rose-100 text-rose-600 animate-pulse'
                : 'bg-indigo-50 text-[#4F46E5] hover:bg-indigo-100'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{isRecordingAudio ? 'Recording...' : 'Dictate'}</span>
          </button>
        </div>

        <textarea
          value={sessionNotes}
          onChange={(e) => setSessionNotes(e.target.value)}
          rows={5}
          className="w-full text-xs p-3 rounded-xl border border-[#E8E2D9] dark:border-[#38325E] bg-[#FAF6F0] dark:bg-[#252044] text-[#1F1B3A] dark:text-white outline-hidden resize-none leading-relaxed"
        />

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-xs text-[#6B6785]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>HIPAA / PDPL Compliant</span>
          </div>
          <button
            onClick={() => showNotification('Session note signed and added to child medical chart.')}
            className="px-4 py-2 rounded-xl bg-[#4F46E5] text-white text-xs font-semibold shadow-xs"
          >
            Save & Sign Note
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto px-4 pt-3">
      {activeTab.toLowerCase() === 'today' && (
        sessionSubView === 'plan' ? renderPlanView() :
        sessionSubView === 'continuous' ? renderContinuousView() :
        sessionSubView === 'interval' ? renderIntervalView() :
        sessionSubView === 'other_measures' ? renderOtherMeasuresView() :
        renderDatasheetView()
      )}
      {activeTab.toLowerCase() === 'targets' && renderTargetsTab()}
      {activeTab.toLowerCase() === 'graphs' && renderGraphsTab()}
      {activeTab.toLowerCase() === 'notes' && renderNotesTab()}
    </div>
  );
};
