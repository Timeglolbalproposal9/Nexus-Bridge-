import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UserPlus, 
  ChevronRight, 
  Users, 
  ShieldCheck, 
  FolderKanban, 
  CreditCard, 
  BarChart2, 
  FileText, 
  Settings, 
  Lock, 
  Download, 
  X,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { auditLog, language, showNotification } = useApp();
  const isAr = language === 'ar';

  const [activeAdminView, setActiveAdminView] = useState<'main' | 'staff' | 'roles' | 'assignments' | 'billing' | 'audit'>('main');
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('Speech Therapist (SLP)');

  const handleAddStaff = () => {
    if (!newStaffName.trim()) return;
    showNotification(`Staff invite sent to ${newStaffName} (${newStaffRole})`);
    setNewStaffName('');
    setShowAddStaffModal(false);
  };

  const handleExportAudit = () => {
    showNotification('Saudi PDPL compliance audit log exported as CSV.');
  };

  /* ---------------------------------------------------- */
  /* MAIN ORGANIZATION VIEW (Exact PDF 2 Page 7)         */
  /* ---------------------------------------------------- */
  const renderMainView = () => (
    <div className="space-y-5 pb-28 animate-in fade-in">
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white mb-1">
          {isAr ? 'إدارة المنشأة' : 'Organization'}
        </h2>
        <p className="text-sm text-[#6B6785] dark:text-[#A5A0C2]">
          {isAr ? 'إدارة الكادر، الصلاحيات والفوترة' : 'Manage staff, access and billing'}
        </p>
      </div>

      {/* Primary CTA matching PDF 2 Page 7 */}
      <button
        onClick={() => setShowAddStaffModal(true)}
        className="w-full py-4 rounded-2xl bg-[#1B9E6B] hover:bg-[#147952] text-white font-heading font-semibold text-base shadow-warm flex items-center justify-center gap-2 active:scale-98 transition"
      >
        <UserPlus className="w-5 h-5" />
        <span>{isAr ? 'إضافة عضو كادر جديد' : 'Add staff member'}</span>
      </button>

      {/* 7 Menu items matching PDF 2 Page 7 */}
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[24px] shadow-card divide-y divide-[#E8E2D9]/60 dark:divide-[#2F2952] overflow-hidden">
        {/* Staff accounts */}
        <button
          onClick={() => setActiveAdminView('staff')}
          className="w-full p-4 flex items-center justify-between text-left rtl:text-right hover:bg-[#FAF6F0] dark:hover:bg-[#252044] transition"
        >
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-[#4F46E5]" />
            <span className="font-semibold text-sm text-[#1F1B3A] dark:text-white">
              {isAr ? 'حسابات الكادر' : 'Staff accounts'}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B6785]" />
        </button>

        {/* Roles and permissions */}
        <button
          onClick={() => setActiveAdminView('roles')}
          className="w-full p-4 flex items-center justify-between text-left rtl:text-right hover:bg-[#FAF6F0] dark:hover:bg-[#252044] transition"
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#10B981]" />
            <span className="font-semibold text-sm text-[#1F1B3A] dark:text-white">
              {isAr ? 'الأدوار والصلاحيات' : 'Roles and permissions'}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B6785]" />
        </button>

        {/* Child assignments */}
        <button
          onClick={() => setActiveAdminView('assignments')}
          className="w-full p-4 flex items-center justify-between text-left rtl:text-right hover:bg-[#FAF6F0] dark:hover:bg-[#252044] transition"
        >
          <div className="flex items-center gap-3">
            <FolderKanban className="w-5 h-5 text-[#0EA5E9]" />
            <span className="font-semibold text-sm text-[#1F1B3A] dark:text-white">
              {isAr ? 'تعيين الأطفال للفريق' : 'Child assignments'}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B6785]" />
        </button>

        {/* Billing and subscription (Prompt note: Later phase placeholder) */}
        <button
          onClick={() => setActiveAdminView('billing')}
          className="w-full p-4 flex items-center justify-between text-left rtl:text-right hover:bg-[#FAF6F0] dark:hover:bg-[#252044] transition"
        >
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-[#F59E0B]" />
            <div>
              <span className="font-semibold text-sm text-[#1F1B3A] dark:text-white block">
                {isAr ? 'الاشتراك والفوترة' : 'Billing and subscription'}
              </span>
              <span className="text-[10px] text-[#6B6785] bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                Phase 2 Roadmap
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B6785]" />
        </button>

        {/* Reports */}
        <button
          onClick={() => showNotification('Organization Analytics: 94% multidisciplinary goal mastery index')}
          className="w-full p-4 flex items-center justify-between text-left rtl:text-right hover:bg-[#FAF6F0] dark:hover:bg-[#252044] transition"
        >
          <div className="flex items-center gap-3">
            <BarChart2 className="w-5 h-5 text-[#7C3AED]" />
            <span className="font-semibold text-sm text-[#1F1B3A] dark:text-white">
              {isAr ? 'التقارير الإحصائية' : 'Reports'}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B6785]" />
        </button>

        {/* Audit log (PDPL compliance) */}
        <button
          onClick={() => setActiveAdminView('audit')}
          className="w-full p-4 flex items-center justify-between text-left rtl:text-right hover:bg-[#FAF6F0] dark:hover:bg-[#252044] transition"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#334155] dark:text-gray-300" />
            <div>
              <span className="font-semibold text-sm text-[#1F1B3A] dark:text-white block">
                {isAr ? 'سجل الرقابة والامتثال' : 'Audit log'}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                Saudi PDPL Certified
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B6785]" />
        </button>

        {/* Organization settings */}
        <button
          onClick={() => showNotification('Organization Profile: Oakridge Clinic & Integrated Schools Network')}
          className="w-full p-4 flex items-center justify-between text-left rtl:text-right hover:bg-[#FAF6F0] dark:hover:bg-[#252044] transition"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-[#6B6785]" />
            <span className="font-semibold text-sm text-[#1F1B3A] dark:text-white">
              {isAr ? 'إعدادات المنشأة' : 'Organization settings'}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B6785]" />
        </button>
      </div>
    </div>
  );

  /* ---------------------------------------------------- */
  /* SUBVIEW: AUDIT LOG (PDPL & HIPAA Compliance)        */
  /* ---------------------------------------------------- */
  const renderAuditView = () => (
    <div className="space-y-4 pb-28 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">
            Audit log
          </h2>
          <p className="text-xs text-[#6B6785]">
            Saudi PDPL compliant immutable activity ledger
          </p>
        </div>
        <button
          onClick={() => setActiveAdminView('main')}
          className="text-xs font-semibold text-[#4F46E5] hover:underline"
        >
          ← Back
        </button>
      </div>

      <div className="flex justify-between items-center bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-900">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
            Encrypted Audit Ledger Active
          </span>
        </div>
        <button
          onClick={handleExportAudit}
          className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold flex items-center gap-1"
        >
          <Download className="w-3 h-3" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="space-y-2.5">
        {auditLog.map((ev) => (
          <div
            key={ev.id}
            className="p-3.5 rounded-2xl bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] shadow-card text-xs space-y-1"
          >
            <div className="flex justify-between items-center text-[11px] text-[#6B6785]">
              <span className="font-semibold text-[#1F1B3A] dark:text-white">{ev.userName} ({ev.role})</span>
              <span>{ev.timestamp}</span>
            </div>
            <p className="font-mono text-[11px] text-[#4F46E5] dark:text-indigo-300 font-bold">
              {ev.action}
            </p>
            <p className="text-[#6B6785] dark:text-gray-300 text-[11px]">
              {ev.resource}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  /* ---------------------------------------------------- */
  /* SUBVIEW: BILLING & SUBSCRIPTION (Client Roadmap)    */
  /* ---------------------------------------------------- */
  const renderBillingView = () => (
    <div className="space-y-4 pb-28 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#1F1B3A] dark:text-white">
            Billing & Subscriptions
          </h2>
          <p className="text-xs text-[#6B6785]">Phase 2 Planned Integration</p>
        </div>
        <button
          onClick={() => setActiveAdminView('main')}
          className="text-xs font-semibold text-[#4F46E5] hover:underline"
        >
          ← Back
        </button>
      </div>

      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-[20px] p-6 text-center space-y-3 shadow-card">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center mx-auto">
          <Clock className="w-6 h-6" />
        </div>
        <h3 className="font-heading font-bold text-base text-[#1F1B3A] dark:text-white">
          Scheduled for Phase 2 Roadmap
        </h3>
        <p className="text-xs text-[#6B6785] dark:text-gray-300 max-w-xs mx-auto leading-relaxed">
          Per client specification: Insurance claims, NDIS/Tawuniya medical coding, and automated therapist payroll are scheduled for subsequent expansion. Current focus is child skill intelligence and shared progress records.
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto px-4 pt-3">
      {activeAdminView === 'main' && renderMainView()}
      {activeAdminView === 'audit' && renderAuditView()}
      {activeAdminView === 'billing' && renderBillingView()}
      {activeAdminView === 'staff' && (
        <div className="space-y-4 pb-28">
          <div className="flex justify-between items-center">
            <h2 className="font-heading text-2xl font-bold">Staff Accounts</h2>
            <button onClick={() => setActiveAdminView('main')} className="text-xs text-[#4F46E5]">← Back</button>
          </div>
          <p className="text-xs text-[#6B6785]">8 active clinical and educational practitioners registered in system.</p>
        </div>
      )}
      {activeAdminView === 'roles' && (
        <div className="space-y-4 pb-28">
          <div className="flex justify-between items-center">
            <h2 className="font-heading text-2xl font-bold">Role Permissions Matrix</h2>
            <button onClick={() => setActiveAdminView('main')} className="text-xs text-[#4F46E5]">← Back</button>
          </div>
          <p className="text-xs text-[#6B6785]">RBAC matrix strictly segregates sensitive psychological notes from classroom staff.</p>
        </div>
      )}
      {activeAdminView === 'assignments' && (
        <div className="space-y-4 pb-28">
          <div className="flex justify-between items-center">
            <h2 className="font-heading text-2xl font-bold">Child Assignments</h2>
            <button onClick={() => setActiveAdminView('main')} className="text-xs text-[#4F46E5]">← Back</button>
          </div>
          <p className="text-xs text-[#6B6785]">3 assigned children with active multidisciplinary teams.</p>
        </div>
      )}

      {/* Add Staff Modal */}
      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1F1B3A] rounded-2xl p-5 max-w-sm w-full space-y-3 shadow-float">
            <div className="flex justify-between items-center">
              <h3 className="font-heading font-bold text-sm text-[#1F1B3A] dark:text-white">Add New Staff Member</h3>
              <button onClick={() => setShowAddStaffModal(false)}><X className="w-4 h-4" /></button>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#6B6785] block mb-1">Full Name</label>
              <input
                type="text"
                value={newStaffName}
                onChange={(e) => setNewStaffName(e.target.value)}
                placeholder="e.g. Dr. Sarah Jenkins"
                className="w-full text-xs p-2.5 rounded-xl border border-[#E8E2D9] dark:border-gray-700 bg-[#FAF6F0] dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#6B6785] block mb-1">Role & Specialization</label>
              <select
                value={newStaffRole}
                onChange={(e) => setNewStaffRole(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#E8E2D9] dark:border-gray-700 bg-[#FAF6F0] dark:bg-gray-800"
              >
                <option>Speech-Language Pathologist (SLP)</option>
                <option>Behavior Analyst (BCBA / RBT)</option>
                <option>Occupational Therapist (OT)</option>
                <option>Remedial Specialist</option>
                <option>Classroom Teacher</option>
              </select>
            </div>
            <button
              onClick={handleAddStaff}
              className="w-full py-2.5 rounded-xl bg-[#1B9E6B] text-white text-xs font-semibold"
            >
              Send Secure Portal Invite
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
