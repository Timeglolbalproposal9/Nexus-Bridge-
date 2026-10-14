import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Plus, 
  BarChart2, 
  Save, 
  Sparkles, 
  Activity, 
  Sliders, 
  X,
  FileText
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  name: string;
  score: 'Independent' | 'Prompted' | 'Physical help' | null;
}

export const OTPortal: React.FC = () => {
  const { 
    activeChild, 
    activeTab, 
    setActiveTab, 
    language, 
    addSessionResult, 
    showNotification,
    triggerConfetti 
  } = useApp();

  const isAr = language === 'ar';

  // Checklist items matching PDF 2 Page 4
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: 'item-1', name: 'Buttons a shirt', score: 'Prompted' },
    { id: 'item-2', name: 'Holds pencil with tripod grip', score: 'Independent' },
    { id: 'item-3', name: 'Cuts along a straight line', score: 'Physical help' },
  ]);

  const [sensoryNote, setSensoryNote] = useState('');
  const [showNewChecklistModal, setShowNewChecklistModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  const handleScoreChange = (id: string, score: 'Independent' | 'Prompted' | 'Physical help') => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, score } : item));
  };

  const handleAddNewItem = () => {
    if (!newItemName.trim()) return;
    setChecklist(prev => [
      ...prev,
      { id: `item-${Date.now()}`, name: newItemName.trim(), score: null }
    ]);
    setNewItemName('');
    setShowNewChecklistModal(false);
    showNotification('New OT checklist target added.');
  };

  const handleSave = () => {
    const scored = checklist.filter(i => i.score !== null);
    const indep = checklist.filter(i => i.score === 'Independent');
    const accuracy = scored.length > 0 ? Math.round((indep.length / scored.length) * 100) : 0;

    addSessionResult(
      'target-3',
      accuracy,
      `OT Session: ${indep.length} of ${scored.length} items independent (${accuracy}%). Sensory note logged.`
    );
    if (accuracy >= 85) {
      triggerConfetti();
    }
  };

  /* ---------------------------------------------------- */
  /* TAB 1: TODAY'S CHECKLIST (Exact PDF 2 Page 4)       */
  /* ---------------------------------------------------- */
  const renderChecklistTab = () => (
    <div className="space-y-5 pb-28 animate-in fade-in">
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white mb-1">
          {isAr ? 'قائمة تفقد اليوم' : "Today's checklist"}
        </h2>
        <p className="text-sm text-[#6B6785] dark:text-[#A5A0C2]">
          {isAr ? 'مهارات ارتداء الملابس والحركات الدقيقة' : 'Dressing and fine motor skills'}
        </p>
      </div>

      {/* Checklist items matching PDF 2 Page 4 */}
      <div className="space-y-4">
        {checklist.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-3"
          >
            <h3 className="font-heading font-semibold text-base text-[#1F1B3A] dark:text-white">
              {item.name}
            </h3>

            {/* Segmented controls: Independent, Prompted, Physical help */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleScoreChange(item.id, 'Independent')}
                className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition ${
                  item.score === 'Independent'
                    ? 'bg-[#DDF5EA] border-[#1B9E6B] text-[#1B9E6B] dark:bg-emerald-950 dark:text-emerald-300 shadow-xs'
                    : 'bg-white dark:bg-[#252044] border-[#E8E2D9] dark:border-[#38325E] text-[#6B6785] dark:text-gray-300'
                }`}
              >
                {isAr ? 'مستقل' : 'Independent'}
              </button>

              <button
                onClick={() => handleScoreChange(item.id, 'Prompted')}
                className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition ${
                  item.score === 'Prompted'
                    ? 'bg-[#FFF1CC] border-[#B7791F] text-[#B7791F] dark:bg-amber-950 dark:text-amber-300 shadow-xs'
                    : 'bg-white dark:bg-[#252044] border-[#E8E2D9] dark:border-[#38325E] text-[#6B6785] dark:text-gray-300'
                }`}
              >
                {isAr ? 'بتلقين' : 'Prompted'}
              </button>

              <button
                onClick={() => handleScoreChange(item.id, 'Physical help')}
                className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition ${
                  item.score === 'Physical help'
                    ? 'bg-[#E0E7FF] border-[#4F46E5] text-[#4F46E5] dark:bg-indigo-950 dark:text-indigo-300 shadow-xs'
                    : 'bg-white dark:bg-[#252044] border-[#E8E2D9] dark:border-[#38325E] text-[#6B6785] dark:text-gray-300'
                }`}
              >
                {isAr ? 'مساعدة جسدية' : 'Physical help'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sensory Activity Card matching PDF 2 Page 4 */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card space-y-2">
        <h3 className="font-heading font-bold text-sm text-[#1B9E6B] dark:text-emerald-400">
          Sensory activity
        </h3>
        <p className="text-xs text-[#6B6785] dark:text-[#A5A0C2]">
          Add a note on what was tried and how the child responded.
        </p>
        <textarea
          value={sensoryNote}
          onChange={(e) => setSensoryNote(e.target.value)}
          placeholder="e.g. 5 minutes weighted vest before buttoning vest. Leo demonstrated reduced tactile defensiveness and smoother pincer grasp."
          rows={3}
          className="w-full text-xs p-3 rounded-xl border border-[#E8E2D9] dark:border-[#38325E] bg-[#FAF6F0] dark:bg-[#252044] text-[#1F1B3A] dark:text-white outline-hidden resize-none"
        />
      </div>

      {/* Action buttons matching PDF 2 Page 4 */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          onClick={() => setShowNewChecklistModal(true)}
          className="py-3 px-4 rounded-xl bg-white dark:bg-[#1F1B3A] border-2 border-[#1B9E6B] dark:border-emerald-600 text-[#1B9E6B] dark:text-emerald-400 font-semibold text-xs hover:bg-[#DDF5EA]/30 transition flex items-center justify-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New checklist</span>
        </button>

        <button
          onClick={() => setActiveTab('Graphs')}
          className="py-3 px-4 rounded-xl bg-white dark:bg-[#1F1B3A] border-2 border-[#1B9E6B] dark:border-emerald-600 text-[#1B9E6B] dark:text-emerald-400 font-semibold text-xs hover:bg-[#DDF5EA]/30 transition flex items-center justify-center gap-1.5 shadow-xs"
        >
          <BarChart2 className="w-4 h-4" />
          <span>Graphs</span>
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

      {/* New checklist modal */}
      {showNewChecklistModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1F1B3A] rounded-2xl p-5 max-w-sm w-full space-y-3 shadow-float">
            <div className="flex justify-between items-center">
              <h3 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">
                Add New OT Checklist Target
              </h3>
              <button onClick={() => setShowNewChecklistModal(false)}><X className="w-4 h-4" /></button>
            </div>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="e.g. Zips winter jacket or Ties shoelaces"
              className="w-full text-xs p-2.5 rounded-xl border border-[#E8E2D9] dark:border-gray-700 bg-[#FAF6F0] dark:bg-gray-800"
            />
            <button
              onClick={handleAddNewItem}
              className="w-full py-2.5 rounded-xl bg-[#4F46E5] text-white text-xs font-semibold"
            >
              Add Target Item
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-md mx-auto px-4 pt-3">
      {activeTab.toLowerCase() === 'today' && renderChecklistTab()}
      {activeTab.toLowerCase() === 'checklists' && renderChecklistTab()}
      {activeTab.toLowerCase() === 'graphs' && (
        <div className="space-y-4 pb-28">
          <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">OT Functional Progress</h2>
          <div className="p-5 bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-2xl shadow-card space-y-3">
            <h3 className="font-semibold text-sm">Buttoning a Shirt (% Steps Independent)</h3>
            <div className="h-32 flex items-end gap-3 pt-4 border-b border-[#E8E2D9] dark:border-gray-800">
              <div className="flex-1 bg-amber-200 rounded-t-lg h-[50%] flex items-center justify-center text-[10px] font-bold">50%</div>
              <div className="flex-1 bg-amber-300 rounded-t-lg h-[60%] flex items-center justify-center text-[10px] font-bold">60%</div>
              <div className="flex-1 bg-amber-400 rounded-t-lg h-[65%] flex items-center justify-center text-[10px] font-bold">65%</div>
              <div className="flex-1 bg-amber-500 text-white rounded-t-lg h-[70%] flex items-center justify-center text-[10px] font-bold">70%</div>
            </div>
            <p className="text-xs text-[#6B6785]">Mastery Criterion: 85% across 3 sessions (Backward chaining recommended)</p>
          </div>
        </div>
      )}
      {activeTab.toLowerCase() === 'notes' && (
        <div className="space-y-4 pb-28">
          <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">OT Clinical Notes</h2>
          <div className="p-4 bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-2xl shadow-card space-y-2">
            <textarea
              defaultValue="Proprioceptive heavy work successfully organized vestibular system. Pincer grasp endurance improved by 3 minutes on line tracing activity."
              rows={4}
              className="w-full text-xs p-3 rounded-xl border border-[#E8E2D9] dark:border-gray-700 bg-[#FAF6F0] dark:bg-gray-800 text-[#1F1B3A] dark:text-white"
            />
            <button
              onClick={() => showNotification('OT note saved.')}
              className="px-4 py-2 bg-[#4F46E5] text-white text-xs font-semibold rounded-xl"
            >
              Save OT Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
