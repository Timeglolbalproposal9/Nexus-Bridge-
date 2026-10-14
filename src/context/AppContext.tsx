import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Child, 
  RoleType, 
  ConsentGrant, 
  Target, 
  AuditEvent, 
  MessageItem, 
  ObservationRecord 
} from '../types';
import { 
  INITIAL_CHILDREN, 
  INITIAL_CONSENT_GRANTS, 
  INITIAL_TARGETS, 
  INITIAL_AUDIT_LOG, 
  INITIAL_MESSAGES 
} from '../data/seedData';

interface AppContextType {
  role: RoleType | null;
  setRole: (role: RoleType | null) => void;
  selectedChildId: string;
  setSelectedChildId: (id: string) => void;
  activeChild: Child;
  childrenList: Child[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: 'en' | 'ar';
  toggleLanguage: () => void;
  isRtl: boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
  isOffline: boolean;
  toggleOffline: () => void;
  syncQueueCount: number;
  childScheduleMode: boolean;
  setChildScheduleMode: (enabled: boolean) => void;
  targets: Target[];
  consentGrants: ConsentGrant[];
  auditLog: AuditEvent[];
  messages: MessageItem[];
  observations: ObservationRecord[];
  updateConsentGrant: (grantId: string, domain: keyof ConsentGrant['domains'], allowed: boolean) => void;
  hasAccessToDomain: (role: RoleType, domain: keyof ConsentGrant['domains']) => boolean;
  addSessionResult: (targetId: string, scorePercent: number, summaryText: string) => void;
  addTeacherObservation: (obs: Omit<ObservationRecord, 'id' | 'timestamp'>) => void;
  approveTarget: (targetId: string, newCriterion?: string) => void;
  sendMessage: (text: string, goalTag?: string) => void;
  triggerConfetti: () => void;
  notification: string | null;
  showNotification: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<RoleType | null>('parent');
  const [selectedChildId, setSelectedChildId] = useState<string>('child-1');
  const [activeTab, setActiveTabState] = useState<string>('Home');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [syncQueueCount, setSyncQueueCount] = useState<number>(0);
  const [childScheduleMode, setChildScheduleMode] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [childrenList, setChildrenList] = useState<Child[]>(INITIAL_CHILDREN);
  const [targets, setTargets] = useState<Target[]>(INITIAL_TARGETS);
  const [consentGrants, setConsentGrants] = useState<ConsentGrant[]>(INITIAL_CONSENT_GRANTS);
  const [auditLog, setAuditLog] = useState<AuditEvent[]>(INITIAL_AUDIT_LOG);
  const [messages, setMessages] = useState<MessageItem[]>(INITIAL_MESSAGES);
  const [observations, setObservations] = useState<ObservationRecord[]>([
    {
      id: 'obs-1',
      studentId: 'child-1',
      studentName: 'Leo Miller',
      goal: 'Answers questions in class',
      activity: 'Science: parts of a plant',
      result: 'Completed independently',
      observation: 'Answered 4 of 5 questions on their own during flower dissection.',
      timestamp: 'Today at 10:15 AM',
      teacherName: 'Emma Watson'
    }
  ]);

  const isRtl = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [isRtl, language]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Set default tabs whenever role changes
  const setRole = (newRole: RoleType | null) => {
    setRoleState(newRole);
    if (!newRole) return;
    switch (newRole) {
      case 'parent':
        setActiveTabState('Home');
        break;
      case 'behavior':
      case 'speech':
      case 'remedial':
      case 'teacher':
        setActiveTabState('Today');
        break;
      case 'ot':
        setActiveTabState('Today');
        break;
      case 'supervisor':
        setActiveTabState('Review');
        break;
      case 'admin':
        setActiveTabState('Home');
        break;
    }
  };

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const toggleOffline = () => {
    setIsOffline(prev => {
      const next = !prev;
      if (!next && syncQueueCount > 0) {
        showNotification(`${syncQueueCount} offline records synchronized securely.`);
        setSyncQueueCount(0);
      }
      return next;
    });
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#FF6B57', '#10B981', '#F59E0B']
      });
    } catch {
      // safe fallback
    }
  };

  const activeChild = childrenList.find(c => c.id === selectedChildId) || childrenList[0];

  const updateConsentGrant = (grantId: string, domain: keyof ConsentGrant['domains'], allowed: boolean) => {
    setConsentGrants(prev => prev.map(g => {
      if (g.id === grantId) {
        return {
          ...g,
          domains: {
            ...g.domains,
            [domain]: allowed
          }
        };
      }
      return g;
    }));

    // Record audit event for Saudi PDPL compliance
    const targetGrant = consentGrants.find(g => g.id === grantId);
    const newAudit: AuditEvent = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userId: 'user-parent',
      userName: 'Sarah Miller',
      role: 'parent',
      action: allowed ? 'GRANT_ACCESS_DOMAIN' : 'REVOKE_ACCESS_DOMAIN',
      resource: `${targetGrant?.professionalName || 'Professional'} · Domain: ${domain}`
    };
    setAuditLog(prev => [newAudit, ...prev]);
    showNotification(`Consent updated: ${domain} is now ${allowed ? 'shared' : 'restricted'}.`);
  };

  const hasAccessToDomain = (chkRole: RoleType, domain: keyof ConsentGrant['domains']): boolean => {
    if (chkRole === 'parent' || chkRole === 'supervisor' || chkRole === 'admin') return true;
    const grant = consentGrants.find(g => g.role === chkRole && g.childId === selectedChildId);
    if (!grant) return true;
    return !!grant.domains[domain];
  };

  const addSessionResult = (targetId: string, scorePercent: number, summaryText: string) => {
    if (isOffline) {
      setSyncQueueCount(prev => prev + 1);
      showNotification('Session saved offline. Will sync when connection is restored.');
    } else {
      showNotification(`Session data recorded: ${scorePercent}% independent.`);
    }

    setTargets(prev => prev.map(t => {
      if (t.id === targetId) {
        const newThree = [...t.lastThreeSessions.slice(1), scorePercent];
        const isMastered = newThree.every(s => s >= t.criterionThreshold);
        return {
          ...t,
          currentPerformance: scorePercent,
          lastThreeSessions: newThree,
          status: isMastered ? 'mastered' : t.status,
          suggestedAction: isMastered ? 'Target Mastered! Ready for generalization probe.' : t.suggestedAction
        };
      }
      return t;
    }));

    // Audit log
    const newAudit: AuditEvent = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userId: `user-${role}`,
      userName: role === 'behavior' ? 'Dr. Maya Lin' : role === 'speech' ? 'Elena Vance' : 'Marcus Reed',
      role: role || 'behavior',
      action: 'RECORD_TRIAL_DATA',
      resource: `${activeChild.name} · ${summaryText}`
    };
    setAuditLog(prev => [newAudit, ...prev]);
  };

  const addTeacherObservation = (obs: Omit<ObservationRecord, 'id' | 'timestamp'>) => {
    const newObs: ObservationRecord = {
      ...obs,
      id: `obs-${Date.now()}`,
      timestamp: 'Just now'
    };
    setObservations(prev => [newObs, ...prev]);

    // Also update child's today progress item if matching
    setChildrenList(prev => prev.map(c => {
      if (c.id === obs.studentId) {
        return {
          ...c,
          todayProgress: c.todayProgress.map(p => {
            if (p.area.toLowerCase().includes('communication') || p.area.toLowerCase().includes('attention')) {
              return {
                ...p,
                reason: `${obs.activity}: ${obs.result}. ${obs.observation || ''}`
              };
            }
            return p;
          })
        };
      }
      return c;
    }));

    showNotification('Classroom observation saved and shared to child profile.');
  };

  const approveTarget = (targetId: string, newCriterion?: string) => {
    setTargets(prev => prev.map(t => {
      if (t.id === targetId) {
        return {
          ...t,
          approvalStatus: 'approved',
          masteryCriterion: newCriterion || t.masteryCriterion
        };
      }
      return t;
    }));
    showNotification('Target mastery criteria approved by supervisor.');
  };

  const sendMessage = (text: string, goalTag?: string) => {
    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      childId: selectedChildId,
      senderName: role === 'parent' ? 'Sarah Miller' : role === 'teacher' ? 'Emma Watson' : 'Care Team Member',
      senderRole: role || 'parent',
      senderAvatar: activeChild.avatar,
      contentEn: text,
      contentAr: text,
      timestamp: 'Just now',
      goalTag: goalTag || 'General Progress',
      isParent: role === 'parent',
    };
    setMessages(prev => [...prev, newMsg]);
    showNotification('Message sent to child care team.');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        selectedChildId,
        setSelectedChildId,
        activeChild,
        childrenList,
        activeTab,
        setActiveTab,
        language,
        toggleLanguage,
        isRtl,
        darkMode,
        toggleDarkMode,
        isOffline,
        toggleOffline,
        syncQueueCount,
        childScheduleMode,
        setChildScheduleMode,
        targets,
        consentGrants,
        auditLog,
        messages,
        observations,
        updateConsentGrant,
        hasAccessToDomain,
        addSessionResult,
        addTeacherObservation,
        approveTarget,
        sendMessage,
        triggerConfetti,
        notification,
        showNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
