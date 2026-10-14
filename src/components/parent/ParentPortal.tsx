import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusChipType } from '../../types';
import { 
  ShieldCheck, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  MessageSquare, 
  Video, 
  Calendar, 
  TrendingUp, 
  Download, 
  Star, 
  AlertCircle, 
  X, 
  Send, 
  Volume2, 
  ThumbsUp,
  Clock,
  ExternalLink,
  Camera,
  EyeOff
} from 'lucide-react';

export const ParentPortal: React.FC = () => {
  const { 
    activeChild, 
    activeTab, 
    setActiveTab, 
    language, 
    consentGrants, 
    updateConsentGrant,
    messages,
    sendMessage,
    triggerConfetti,
    showNotification
  } = useApp();

  const isAr = language === 'ar';

  // Modals state
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showWeDidItModal, setShowWeDidItModal] = useState(false);
  const [showHardDayModal, setShowHardDayModal] = useState(false);

  // Home practice check-in state
  const [practiceRating, setPracticeRating] = useState(5);
  const [practiceNotes, setPracticeNotes] = useState('');
  const [completedPracticeToday, setCompletedPracticeToday] = useState(false);

  // Messages input
  const [chatInput, setChatInput] = useState('');
  const [selectedGoalTag, setSelectedGoalTag] = useState('Answering WH questions');

  // Hard day flag state
  const [hardDayNotes, setHardDayNotes] = useState('');

  // Status Chip styling
  const renderStatusChip = (status: StatusChipType) => {
    switch (status) {
      case 'Mastered':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E0E7FF] text-[#4F46E5] dark:bg-indigo-950 dark:text-indigo-300">
            {isAr ? 'متقن' : 'Mastered'}
          </span>
        );
      case 'Improving':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#DDF5EA] text-[#1B9E6B] dark:bg-emerald-950 dark:text-emerald-300">
            {isAr ? 'يتحسن' : 'Improving'}
          </span>
        );
      case 'Developing':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF1CC] text-[#B7791F] dark:bg-amber-950 dark:text-amber-300">
            {isAr ? 'قيد التطوير' : 'Developing'}
          </span>
        );
      case 'Needs support':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FDE3E4] text-[#D63B3B] dark:bg-rose-950 dark:text-rose-300">
            {isAr ? 'يحتاج دعماً' : 'Needs support'}
          </span>
        );
    }
  };

  const handleCompletePractice = () => {
    setCompletedPracticeToday(true);
    setShowWeDidItModal(false);
    triggerConfetti();
    showNotification(isAr ? 'تم تسجيل التطبيق المنزلي بنجاح! أحسنتم!' : 'Home practice completed! Wonderful teamwork!');
  };

  const handleSendHardDay = () => {
    setShowHardDayModal(false);
    showNotification(isAr ? 'تم إرسال إشعار الدعم إلى الفريق العلاجي' : 'Team alerted: Compassionate support mode initiated');
    sendMessage(
      isAr 
        ? `تنبيه من ولي الأمر: اليوم كان يوماً صعباً في المنزل. ${hardDayNotes}` 
        : `Parent Update: Today was a tough day at home. Note: ${hardDayNotes || 'Tiredness and sensory overload during evening routine.'}`,
      'Home Regulation'
    );
    setHardDayNotes('');
  };

  /* ---------------------------------------------------- */
  /* TAB 1: HOME (Exact match to PDF 2 Page 2)            */
  /* ---------------------------------------------------- */
  const renderHomeTab = () => (
    <div className="space-y-6 pb-24">
      {/* Today's progress section */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white mb-1">
          {isAr ? 'تقدم اليوم' : "Today's progress"}
        </h2>
        <p className="text-sm text-[#6B6785] dark:text-[#A5A0C2] mb-4">
          {isAr ? 'محدث من الجلسات العلاجية والمدرسة.' : 'Updated from therapy sessions and school.'}
        </p>

        {/* Progress List Card */}
        <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] shadow-card divide-y divide-[#E8E2D9]/60 dark:divide-[#2F2952]">
          {activeChild.todayProgress.map((item, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between hover:bg-[#FAF6F0] dark:hover:bg-[#252044] transition">
              <div className="flex-1 pr-3 rtl:pr-0 rtl:pl-3">
                <span className="font-semibold text-base text-[#1F1B3A] dark:text-white block">
                  {item.area}
                </span>
                <span className="text-xs text-[#6B6785] dark:text-[#8E8AAB] line-clamp-1 mt-0.5">
                  {item.reason}
                </span>
              </div>
              <div className="shrink-0">
                {renderStatusChip(item.status)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action: "Today was hard" flag */}
      <div className="flex items-center justify-between bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-2xl p-3.5">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span className="text-xs font-medium text-amber-900 dark:text-amber-200">
            {isAr ? 'هل يواجه طفلك يوماً صعباً اليوم؟' : 'Is your child having a challenging day?'}
          </span>
        </div>
        <button
          onClick={() => setShowHardDayModal(true)}
          className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition"
        >
          {isAr ? 'إبلاغ الفريق' : 'Alert Team'}
        </button>
      </div>

      {/* This week Section (4 Cards) */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white mb-4">
          {isAr ? 'هذا الأسبوع' : 'This week'}
        </h2>

        <div className="space-y-3.5">
          {/* Card 1: What we worked on */}
          <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] dark:text-indigo-400 mb-1.5">
              {isAr ? 'ما ركّزنا عليه' : 'What we worked on'}
            </h3>
            <p className="text-sm font-medium text-[#1F1B3A] dark:text-gray-100 leading-relaxed">
              {activeChild.thisWeek.whatWeWorkedOn}
            </p>
          </div>

          {/* Card 2: What your child is doing well */}
          <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#10B981] dark:text-emerald-400 mb-1.5">
              {isAr ? 'ما يبرع فيه طفلك' : 'What your child is doing well'}
            </h3>
            <p className="text-sm font-medium text-[#1F1B3A] dark:text-gray-100 leading-relaxed">
              {activeChild.thisWeek.whatChildIsDoingWell}
            </p>
          </div>

          {/* Card 3: What needs more practice */}
          <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#FF6B57] dark:text-rose-400 mb-1.5">
              {isAr ? 'ما يحتاج لمزيد من التدريب' : 'What needs more practice'}
            </h3>
            <p className="text-sm font-medium text-[#1F1B3A] dark:text-gray-100 leading-relaxed">
              {activeChild.thisWeek.whatNeedsMorePractice}
            </p>
          </div>

          {/* Card 4: How you can practice at home */}
          <div className="bg-gradient-to-br from-white to-[#F4EEE6] dark:from-[#1F1B3A] dark:to-[#17142E] border-2 border-[#4F46E5]/30 dark:border-indigo-800 rounded-[20px] p-5 shadow-warm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] dark:text-indigo-400">
                {isAr ? 'كيف تتدربون معاً في المنزل' : 'How you can practice at home'}
              </h3>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-[#FF6B57] bg-[#FFE4DF] dark:bg-rose-950 px-2 py-0.5 rounded-full">
                <Clock className="w-3 h-3" />
                {activeChild.thisWeek.howToPracticeAtHome.videoDuration}
              </span>
            </div>

            <h4 className="font-heading font-bold text-base text-[#1F1B3A] dark:text-white mb-1.5">
              {activeChild.thisWeek.howToPracticeAtHome.title}
            </h4>
            <p className="text-sm text-[#6B6785] dark:text-[#A5A0C2] leading-relaxed mb-4">
              {activeChild.thisWeek.howToPracticeAtHome.description}
            </p>

            {/* Video & Check-in Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => setShowVideoModal(true)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white dark:bg-[#252044] border border-[#E8E2D9] dark:border-[#38325E] text-[#1F1B3A] dark:text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#F4EEE6] transition shadow-xs"
              >
                <Play className="w-4 h-4 text-[#4F46E5] fill-current" />
                <span>{isAr ? 'مشاهدة الفيديو (60 ث)' : 'Watch 60s Demo'}</span>
              </button>

              <button
                onClick={() => setShowWeDidItModal(true)}
                className={`flex-1 py-2.5 px-4 rounded-xl text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-warm transition ${
                  completedPracticeToday 
                    ? 'bg-emerald-600 hover:bg-emerald-700' 
                    : 'bg-[#4F46E5] hover:bg-[#4338CA]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{completedPracticeToday ? (isAr ? 'تم الإنجاز اليوم ✓' : 'Completed Today ✓') : (isAr ? 'فعلناها معاً!' : 'We did it!')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Link: "Manage who can see my child's information" (PDF 2 Page 2 line) */}
      <div className="pt-2 text-center">
        <button
          onClick={() => setShowConsentModal(true)}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#1B9E6B] hover:text-[#13744F] dark:text-emerald-400 underline underline-offset-4 decoration-2 transition group"
        >
          <ShieldCheck className="w-4 h-4 text-[#1B9E6B] dark:text-emerald-400 group-hover:scale-110 transition" />
          <span>{isAr ? 'التحكم فيمن يمكنه رؤية معلومات طفلي' : "Manage who can see my child's information"}</span>
        </button>
      </div>
    </div>
  );

  /* ---------------------------------------------------- */
  /* TAB 2: PROGRESS (Area trends, milestones, report)   */
  /* ---------------------------------------------------- */
  const renderProgressTab = () => (
    <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">
            {isAr ? 'سجل التقدم المتكامل' : 'Child Progress Trends'}
          </h2>
          <p className="text-xs text-[#6B6785] dark:text-[#A5A0C2]">
            {isAr ? 'مقارنة بين الجلسات الإكلينيكية، المدرسة والتطبيق بالمنزل' : 'Comparing clinic, school and home milestones'}
          </p>
        </div>
        <button
          onClick={() => {
            showNotification(isAr ? 'جاري تجهيز تقرير ولي الأمر المبسط (PDF)' : 'Generating Parent Plain-Language Report PDF...');
          }}
          className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] text-xs font-semibold text-[#4F46E5] hover:bg-[#F4EEE6] flex items-center gap-1.5 shadow-xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isAr ? 'تحميل التقرير' : 'Download PDF'}</span>
        </button>
      </div>

      {/* Cross-Domain Triangulation Card */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card">
        <h3 className="font-heading font-semibold text-base text-[#1F1B3A] dark:text-white mb-2">
          {isAr ? 'المهارة المحورية: الإجابة عن أسئلة WH' : 'Focus Goal: Answering WH Questions'}
        </h3>
        <p className="text-xs text-[#6B6785] dark:text-[#A5A0C2] mb-4">
          {isAr ? 'الاستقلالية عبر البيئات الثلاث (الهدف: 90٪)' : 'Independence across 3 environments (Target: 90%)'}
        </p>

        {/* 3 Environment Bars */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="text-[#4F46E5] font-semibold">Speech Clinic (Elena Vance)</span>
              <span>85% independent</span>
            </div>
            <div className="h-3 w-full bg-[#E0E7FF] dark:bg-indigo-950/60 rounded-full overflow-hidden">
              <div className="h-full bg-[#4F46E5] rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="text-[#10B981] font-semibold">Classroom (Emma Watson)</span>
              <span>80% independent</span>
            </div>
            <div className="h-3 w-full bg-[#D1FAE5] dark:bg-emerald-950/60 rounded-full overflow-hidden">
              <div className="h-full bg-[#10B981] rounded-full transition-all duration-500" style={{ width: '80%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="text-[#FF6B57] font-semibold">Home Snack Routine (Sarah Miller)</span>
              <span>88% independent</span>
            </div>
            <div className="h-3 w-full bg-[#FFE4DF] dark:bg-rose-950/60 rounded-full overflow-hidden">
              <div className="h-full bg-[#FF6B57] rounded-full transition-all duration-500" style={{ width: '88%' }}></div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#E8E2D9] dark:border-[#2F2952] flex items-center justify-between text-xs text-[#6B6785] dark:text-gray-400">
          <span>Mastery Criterion: 90% across 3 sessions</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">Mastery Near!</span>
        </div>
      </div>

      {/* Milestone Timeline */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-5 shadow-card">
        <h3 className="font-heading font-semibold text-base text-[#1F1B3A] dark:text-white mb-3">
          {isAr ? 'المعالم المنجزة حديثاً' : 'Recent Milestone Wins'}
        </h3>
        <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 rtl:before:left-auto rtl:before:right-3.5 before:w-0.5 before:bg-[#E8E2D9] dark:before:bg-[#38325E]">
          <div className="flex items-start gap-3 relative">
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0 z-10">
              ✓
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1F1B3A] dark:text-white">Sorted 10 colored blocks independently</p>
              <p className="text-xs text-[#6B6785] dark:text-gray-400">Math & Sorting · Yesterday in School</p>
            </div>
          </div>

          <div className="flex items-start gap-3 relative">
            <div className="w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold shrink-0 z-10">
              ✓
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1F1B3A] dark:text-white">Identified 5 common kitchen items without hints</p>
              <p className="text-xs text-[#6B6785] dark:text-gray-400">Discrete Trial Training · 3 days ago</p>
            </div>
          </div>

          <div className="flex items-start gap-3 relative">
            <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0 z-10">
              ✓
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1F1B3A] dark:text-white">Put on sneakers and pulled velcro tab</p>
              <p className="text-xs text-[#6B6785] dark:text-gray-400">Independent Dressing · Last week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ---------------------------------------------------- */
  /* TAB 3: MESSAGES (Team chat with goal tags & AR/EN)   */
  /* ---------------------------------------------------- */
  const renderMessagesTab = () => (
    <div className="flex flex-col h-[calc(100vh-190px)] pb-20">
      <div className="mb-3">
        <h2 className="font-heading text-xl font-bold text-[#1F1B3A] dark:text-white">
          {isAr ? 'فريق رعاية طفلك' : 'Care Team Messages'}
        </h2>
        <p className="text-xs text-[#6B6785] dark:text-[#A5A0C2]">
          {isAr ? 'محادثات آمنة مع ربط مباشر بالأهداف العلاجية والترجمة' : 'Secure team chat tagged to specific therapy goals'}
        </p>
      </div>

      {/* Goal Tag Filter pill */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-2">
        {['All Goals', 'Answering WH questions', 'Buttoning a shirt', 'Math & Counting'].map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedGoalTag(tag === 'All Goals' ? '' : tag)}
            className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition ${
              (selectedGoalTag === tag || (!selectedGoalTag && tag === 'All Goals'))
                ? 'bg-[#4F46E5] text-white shadow-xs'
                : 'bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] text-[#6B6785] dark:text-gray-300'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Message history */}
      <div className="flex-1 overflow-y-auto space-y-3 p-1">
        {messages.map((msg) => {
          const isSenderParent = msg.isParent;
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isSenderParent ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-[#6B6785] dark:text-[#8E8AAB]">
                <span className="font-semibold text-[#1F1B3A] dark:text-white">{msg.senderName}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 shadow-card ${
                  isSenderParent
                    ? 'bg-[#4F46E5] text-white rounded-tr-xs'
                    : 'bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] text-[#1F1B3A] dark:text-gray-100 rounded-tl-xs'
                }`}
              >
                {msg.goalTag && (
                  <span
                    className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1.5 ${
                      isSenderParent
                        ? 'bg-white/20 text-white'
                        : 'bg-indigo-50 dark:bg-indigo-950 text-[#4F46E5] dark:text-indigo-400'
                    }`}
                  >
                    🎯 {msg.goalTag}
                  </span>
                )}
                <p className="text-xs sm:text-sm leading-relaxed">
                  {isAr ? msg.contentAr : msg.contentEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat input form */}
      <div className="pt-2 bg-[#FBF7F2] dark:bg-[#14122B]">
        <div className="flex items-center gap-2 bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-2xl p-1.5 shadow-card">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={isAr ? 'اكتب رسالة للفريق العلاجي...' : 'Message your child’s therapists & teacher...'}
            className="flex-1 bg-transparent px-3 py-1.5 text-xs sm:text-sm outline-hidden text-[#1F1B3A] dark:text-white placeholder-[#6B6785]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && chatInput.trim()) {
                sendMessage(chatInput, selectedGoalTag || 'General');
                setChatInput('');
              }
            }}
          />
          <button
            onClick={() => {
              if (chatInput.trim()) {
                sendMessage(chatInput, selectedGoalTag || 'General');
                setChatInput('');
              }
            }}
            className="p-2 rounded-xl bg-[#4F46E5] text-white hover:bg-[#4338CA] transition shrink-0"
          >
            <Send className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );

  /* ---------------------------------------------------- */
  /* TAB 4: TEAM (All active specialists + video call)   */
  /* ---------------------------------------------------- */
  const renderTeamTab = () => (
    <div className="space-y-4 pb-24">
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">
          {isAr ? 'فريق العمل المعتمد' : "Your Child's Team"}
        </h2>
        <p className="text-xs text-[#6B6785] dark:text-[#A5A0C2]">
          {isAr ? 'المختصون المصرح لهم بالاطلاع وتقديم الرعاية' : 'Authorized multidisciplinary professionals'}
        </p>
      </div>

      <div className="space-y-3">
        {activeChild.assignedTeam.map((member, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-4 flex items-center justify-between shadow-card hover:shadow-warm transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#E0E7FF] dark:bg-indigo-950 flex items-center justify-center font-bold text-[#4F46E5] dark:text-indigo-300">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm text-[#1F1B3A] dark:text-white">
                  {member.name}
                </h4>
                <p className="text-xs text-[#6B6785] dark:text-[#8E8AAB]">
                  {member.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTab('Messages');
                }}
                className="p-2 rounded-xl bg-[#F4EEE6] dark:bg-[#252044] text-[#4F46E5] hover:bg-[#E8E2D9] transition"
                title="Message specialist"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  showNotification(isAr ? 'جاري فتح جلسة الاتصال المرئي الآمنة...' : 'Launching secure telehealth video room...');
                }}
                className="p-2 rounded-xl bg-[#E0E7FF] dark:bg-indigo-950 text-[#4F46E5] hover:bg-indigo-100 transition"
                title="Telehealth call link"
              >
                <Video className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Consent link banner */}
      <div className="p-4 rounded-2xl bg-[#FFE4DF]/50 dark:bg-rose-950/30 border border-[#FF6B57]/30 flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-xs text-[#1F1B3A] dark:text-white">
            {isAr ? 'إدارة صلاحيات الوصول' : 'Access & Consent Center'}
          </h4>
          <p className="text-[11px] text-[#6B6785] dark:text-[#8E8AAB]">
            {isAr ? 'يمكنك سحب أو منح إذن الاطلاع على أي تخصص فورياً' : 'Turn on or off data visibility for any specialist'}
          </p>
        </div>
        <button
          onClick={() => setShowConsentModal(true)}
          className="px-3 py-1.5 rounded-xl bg-[#FF6B57] text-white text-xs font-semibold shadow-xs"
        >
          {isAr ? 'تعديل الصلاحيات' : 'Manage'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto px-4 pt-3">
      {activeTab.toLowerCase() === 'home' && renderHomeTab()}
      {activeTab.toLowerCase() === 'progress' && renderProgressTab()}
      {activeTab.toLowerCase() === 'messages' && renderMessagesTab()}
      {activeTab.toLowerCase() === 'team' && renderTeamTab()}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 1: CONSENT CENTER ("Manage who can see my child's info")     */}
      {/* ------------------------------------------------------------------ */}
      {showConsentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-3xl max-w-md w-full max-h-[90vh] flex flex-col shadow-float animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#E8E2D9] dark:border-[#2F2952] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-[#1F1B3A] dark:text-white">
                    {isAr ? 'مركز موافقة ولي الأمر' : 'Parent Consent Center'}
                  </h3>
                  <p className="text-[11px] text-[#6B6785] dark:text-gray-400">
                    {isAr ? 'نظام حماية البيانات الشخصية السعودي (PDPL)' : 'Saudi PDPL compliant granular privacy controls'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowConsentModal(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body with Grants */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              <p className="text-xs text-[#6B6785] dark:text-gray-300 leading-relaxed">
                {isAr
                  ? 'أنت المسؤول الوحيد عن تحديد البيانات التي يمكن لكل ممارس الاطلاع عليها. عند إيقاف أي مجال، تختفي بياناته فورياً من شاشات ذلك المختص.'
                  : "You maintain full custody of your child's record. Toggle specific domains on or off for each professional. Changes take effect immediately."}
              </p>

              <div className="space-y-4">
                {consentGrants.map((grant) => (
                  <div
                    key={grant.id}
                    className="p-4 rounded-2xl bg-[#FAF6F0] dark:bg-[#252044] border border-[#E8E2D9] dark:border-[#38325E]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <img src={grant.avatar} alt={grant.professionalName} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold text-xs text-[#1F1B3A] dark:text-white">
                            {grant.professionalName}
                          </p>
                          <p className="text-[10px] text-[#6B6785] dark:text-gray-400 capitalize">
                            {grant.role} Specialist • Expiry: {grant.expiryDate}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full font-medium">
                        Active Grant
                      </span>
                    </div>

                    {/* Domain Toggles */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { key: 'communication', label: 'Communication' },
                        { key: 'math', label: 'Math & Cognition' },
                        { key: 'fineMotor', label: 'Fine Motor' },
                        { key: 'dressing', label: 'Dressing & ADL' },
                        { key: 'attention', label: 'Attention' },
                        { key: 'clinicalNotes', label: 'Raw Clinical Notes' },
                      ].map((domain) => {
                        const isGranted = grant.domains[domain.key as keyof typeof grant.domains];
                        return (
                          <button
                            key={domain.key}
                            onClick={() =>
                              updateConsentGrant(
                                grant.id,
                                domain.key as keyof typeof grant.domains,
                                !isGranted
                              )
                            }
                            className={`p-2 rounded-xl flex items-center justify-between text-left rtl:text-right border transition ${
                              isGranted
                                ? 'bg-white dark:bg-[#1F1B3A] border-indigo-300 dark:border-indigo-700 text-[#4F46E5] dark:text-indigo-300 font-medium'
                                : 'bg-gray-100/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 text-gray-400 line-through'
                            }`}
                          >
                            <span className="text-[11px]">{domain.label}</span>
                            <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                              isGranted ? 'bg-[#4F46E5] text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-500'
                            }`}>
                              {isGranted ? '✓' : '×'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#E8E2D9] dark:border-[#2F2952] flex justify-end">
              <button
                onClick={() => setShowConsentModal(false)}
                className="w-full py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-xs shadow-warm transition"
              >
                {isAr ? 'حفظ إعدادات الخصوصية والعودة' : 'Save & Enforce Privacy Settings'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 2: 60-SECOND VIDEO DEMO                                      */}
      {/* ------------------------------------------------------------------ */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1F1B3A] rounded-3xl max-w-sm w-full overflow-hidden shadow-float">
            <div className="p-4 border-b border-[#E8E2D9] dark:border-[#2F2952] flex justify-between items-center">
              <h3 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">
                {activeChild.thisWeek.howToPracticeAtHome.title}
              </h3>
              <button onClick={() => setShowVideoModal(false)} className="text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Visual Simulation */}
            <div className="relative bg-slate-900 aspect-video flex flex-col items-center justify-center p-4 text-white">
              <div className="w-12 h-12 rounded-full bg-[#4F46E5] flex items-center justify-center shadow-lg animate-pulse mb-2">
                <Play className="w-6 h-6 fill-current text-white ml-0.5" />
              </div>
              <p className="text-xs font-medium text-center text-gray-200">
                Elena Vance CCC-SLP demonstrates the 4-second delay technique
              </p>
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] text-gray-300">
                <span>0:24</span>
                <div className="flex-1 mx-2 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4F46E5] w-[40%]"></div>
                </div>
                <span>{activeChild.thisWeek.howToPracticeAtHome.videoDuration}</span>
              </div>
            </div>

            {/* Step summary list */}
            <div className="p-4 space-y-2 bg-[#FAF6F0] dark:bg-[#252044]">
              <p className="text-xs font-semibold text-[#1F1B3A] dark:text-white">Quick steps:</p>
              <ol className="text-xs text-[#6B6785] dark:text-gray-300 space-y-1 list-decimal list-inside">
                {activeChild.thisWeek.howToPracticeAtHome.steps.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ol>
            </div>

            <div className="p-3 border-t border-[#E8E2D9] dark:border-[#2F2952]">
              <button
                onClick={() => {
                  setShowVideoModal(false);
                  setShowWeDidItModal(true);
                }}
                className="w-full py-2.5 rounded-xl bg-[#4F46E5] text-white text-xs font-semibold"
              >
                {isAr ? 'جاهز للتطبيق مع طفلي' : 'Ready to Try at Home'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 3: "WE DID IT!" CHECK-IN                                     */}
      {/* ------------------------------------------------------------------ */}
      {showWeDidItModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1F1B3A] rounded-3xl max-w-sm w-full p-5 shadow-float space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="font-heading font-bold text-base text-[#1F1B3A] dark:text-white">
                  {isAr ? 'تسجيل إنجاز التدريب المنزلي' : 'Record Home Practice Check-in'}
                </h3>
              </div>
              <button onClick={() => setShowWeDidItModal(false)} className="text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#6B6785] dark:text-gray-300">
              {isAr
                ? 'كيف كانت تجربة طفلك اليوم؟ تقييمك وملاحظاتك تصل لمعالج النطق ومدرسة الفصل فوراً.'
                : 'How was your practice session today? Your feedback helps the therapists adapt tomorrow’s clinic plan.'}
            </p>

            {/* Star Rating */}
            <div>
              <p className="text-xs font-semibold text-[#1F1B3A] dark:text-white mb-1.5">
                {isAr ? 'تقييم التجاوب العام (1-5):' : 'Engagement & Success Rating:'}
              </p>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setPracticeRating(star)}
                    className="p-1 hover:scale-110 transition"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= practiceRating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Optional reflection note */}
            <div>
              <label className="text-xs font-semibold text-[#1F1B3A] dark:text-white block mb-1">
                {isAr ? 'ملاحظة أو تعليق سريع (اختياري):' : 'Quick reflection note (optional):'}
              </label>
              <textarea
                value={practiceNotes}
                onChange={(e) => setPracticeNotes(e.target.value)}
                placeholder="e.g. Leo loved the apple slices and answered on the first try!"
                className="w-full text-xs p-3 rounded-xl border border-[#E8E2D9] dark:border-[#38325E] bg-[#FAF6F0] dark:bg-[#252044] text-[#1F1B3A] dark:text-white outline-hidden h-20 resize-none"
              />
            </div>

            {/* Photo simulator */}
            <div className="flex items-center gap-2 text-xs text-[#6B6785] dark:text-gray-400 border border-dashed border-[#E8E2D9] dark:border-[#38325E] p-2.5 rounded-xl justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
              <Camera className="w-4 h-4 text-indigo-500" />
              <span>{isAr ? 'إرفاق صورة أو مقطع قصير (اختياري)' : 'Attach celebration photo or audio (optional)'}</span>
            </div>

            {/* Submit button */}
            <button
              onClick={handleCompletePractice}
              className="w-full py-3 rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-xs shadow-warm flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isAr ? 'تأكيد وحفظ الإنجاز ✓' : 'Submit & Share with Team'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 4: "TODAY WAS HARD" FLAG                                     */}
      {/* ------------------------------------------------------------------ */}
      {showHardDayModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1F1B3A] rounded-3xl max-w-sm w-full p-5 shadow-float space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-500" />
                <h3 className="font-heading font-bold text-base text-[#1F1B3A] dark:text-white">
                  {isAr ? 'إشعار: اليوم كان يوماً صعباً' : '"Today Was Hard" Support Flag'}
                </h3>
              </div>
              <button onClick={() => setShowHardDayModal(false)} className="text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#6B6785] dark:text-gray-300">
              {isAr
                ? 'إرسال إشعار لطيف للمدرسة والمعالجين لتعديل مستوى التوقعات وتوفير فترات راحة ودعم حسي إضافي غداً.'
                : 'Alerting the team signals therapists and teachers to reduce task demand, prioritize regulation, and offer sensory comfort tomorrow.'}
            </p>

            <div>
              <label className="text-xs font-semibold text-[#1F1B3A] dark:text-white block mb-1">
                {isAr ? 'ما الذي حدث؟ (نوم قليل، نوبة غضب، ألم أسنان...)' : 'What contributed? (e.g. poor sleep, sensory overload, teething):'}
              </label>
              <textarea
                value={hardDayNotes}
                onChange={(e) => setHardDayNotes(e.target.value)}
                placeholder="e.g. Leo had difficulty falling asleep until 11 PM and was sensitive to loud noises this morning."
                className="w-full text-xs p-3 rounded-xl border border-[#E8E2D9] dark:border-[#38325E] bg-[#FAF6F0] dark:bg-[#252044] text-[#1F1B3A] dark:text-white outline-hidden h-24 resize-none"
              />
            </div>

            <button
              onClick={handleSendHardDay}
              className="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-warm"
            >
              {isAr ? 'إرسال الإشعار للفريق فوراً' : 'Send Alert to Care Team'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
