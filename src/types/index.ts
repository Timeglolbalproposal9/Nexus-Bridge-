export type RoleType = 
  | 'parent' 
  | 'behavior' 
  | 'speech' 
  | 'ot' 
  | 'remedial' 
  | 'teacher' 
  | 'supervisor' 
  | 'admin';

export type StatusChipType = 'Mastered' | 'Improving' | 'Developing' | 'Needs support';

export interface Child {
  id: string;
  name: string;
  age: number;
  avatar: string;
  diagnosis: string;
  caregivers: string[];
  school: string;
  classroom: string;
  assignedTeam: {
    role: RoleType;
    name: string;
    title: string;
  }[];
  todayProgress: {
    area: string;
    status: StatusChipType;
    reason: string;
    score: number;
    criterion: number;
  }[];
  thisWeek: {
    whatWeWorkedOn: string;
    whatChildIsDoingWell: string;
    whatNeedsMorePractice: string;
    howToPracticeAtHome: {
      title: string;
      description: string;
      materials: string[];
      videoDuration: string;
      steps: string[];
    };
  };
}

export interface ConsentGrant {
  id: string;
  childId: string;
  professionalId: string;
  professionalName: string;
  role: RoleType;
  avatar: string;
  domains: {
    communication: boolean;
    math: boolean;
    fineMotor: boolean;
    dressing: boolean;
    attention: boolean;
    clinicalNotes: boolean;
  };
  expiryDate: string;
  lastViewed?: string;
}

export interface Target {
  id: string;
  childId: string;
  discipline: 'behavior' | 'speech' | 'ot' | 'remedial' | 'teacher';
  name: string;
  domain: string;
  operationalDefinition: string;
  materials: string[];
  procedureSteps: string[];
  masteryCriterion: string; // e.g., "90% across 3 sessions"
  criterionThreshold: number; // e.g. 90
  currentPerformance: number; // e.g. 85
  status: 'baseline' | 'teaching' | 'generalizing' | 'maintenance' | 'mastered';
  suggestedAction: string; // e.g., "Continue current target"
  suggestedNextStep: string; // e.g., "Review related prerequisite skill"
  approvalStatus: 'approved' | 'awaiting_approval' | 'needs_review';
  lastThreeSessions: number[]; // e.g. [80, 85, 85]
  origin?: string; // Where target came from (e.g. "Aug 2026 IEP Clinical Baseline Assessment")
  therapistName?: string; // Assigned lead specialist
  baseline?: number; // Initial assessment score before therapy (e.g. 20%)
  contributingSessions?: {
    id: string;
    date: string;
    therapistName: string;
    scorePercent: number;
    notes: string;
    trialsRecorded?: string;
    source: 'Clinic Session' | 'Home Practice' | 'Classroom Observation' | 'Telehealth';
  }[];
}

export interface TrialData {
  trialNumber: number;
  result: '+' | 'P' | '-'; // + independent, P prompted, - incorrect
  promptLevel?: 'Independent' | 'Verbal' | 'Gesture' | 'Model' | 'Partial physical' | 'Full physical';
  timestamp: string;
}

export interface SessionRecord {
  id: string;
  childId: string;
  date: string;
  role: RoleType;
  therapistName: string;
  discipline: string;
  targetId: string;
  targetName: string;
  trials: TrialData[];
  frequencyCount: number;
  durationSeconds: number;
  latencySeconds: number;
  ratePerMinute: number;
  notes: string;
  ioaAgreementPercent?: number;
  treatmentIntegrityPercent?: number;
}

export interface ObservationRecord {
  id: string;
  studentId: string;
  studentName: string;
  goal: string;
  activity: string;
  result: 'Completed independently' | 'Needed help' | 'Partially completed' | 'Not completed';
  observation?: string;
  timestamp: string;
  teacherName: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  role: RoleType;
  action: string;
  resource: string;
  ipAddress?: string;
}

export interface MessageItem {
  id: string;
  childId: string;
  senderName: string;
  senderRole: RoleType;
  senderAvatar: string;
  contentEn: string;
  contentAr: string;
  timestamp: string;
  goalTag?: string;
  isParent: boolean;
}

export interface ChatContact {
  id: string;
  name: string;
  roleTitle: string;
  avatarInitial: string;
  avatarBg: string;
  avatarTextColor: string;
  online: boolean;
  timestamp: string;
  lastMessage: string;
  unreadCount?: number;
  category: 'therapists' | 'school' | 'circle';
  messages: MessageItem[];
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'goal' | 'message' | 'session' | 'consent' | 'system';
  read: boolean;
  badge?: string;
}
