import { Child, ConsentGrant, Target, AuditEvent, MessageItem } from '../types';

export const INITIAL_CHILDREN: Child[] = [
  {
    id: 'child-1',
    name: 'Leo Miller',
    age: 6,
    avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=150&auto=format&fit=crop&q=80',
    diagnosis: 'Autism Spectrum Disorder (Level 1), Speech Delay',
    caregivers: ['Sarah Miller (Mother)', 'David Miller (Father)'],
    school: 'Oakridge Elementary School',
    classroom: 'Grade 1 - Room 104',
    assignedTeam: [
      { role: 'behavior', name: 'Dr. Maya Lin', title: 'Lead BCBA' },
      { role: 'speech', name: 'Elena Vance', title: 'Speech-Language Pathologist' },
      { role: 'ot', name: 'Marcus Reed', title: 'Occupational Therapist' },
      { role: 'teacher', name: 'Emma Watson', title: 'Primary Classroom Teacher' },
      { role: 'remedial', name: 'James Chen', title: 'Remedial Learning Specialist' },
      { role: 'supervisor', name: 'Dr. Rebecca Hall', title: 'Clinical Director' },
      { role: 'admin', name: 'David Kim', title: 'Clinic Operations Manager' },
    ],
    todayProgress: [
      { area: 'Communication', status: 'Improving', reason: 'Responded to 5 of 6 WH questions during speech session with verbal prompt fading.', score: 85, criterion: 90 },
      { area: 'Math', status: 'Improving', reason: 'Successfully sorted 10 colored blocks with independent counting.', score: 80, criterion: 80 },
      { area: 'Fine motor', status: 'Developing', reason: 'Fastened 3 large buttons; required partial physical help on the final top button.', score: 65, criterion: 85 },
      { area: 'Independent dressing', status: 'Developing', reason: 'Put on sneakers independently; velcro fastened with verbal cue.', score: 60, criterion: 90 },
      { area: 'Attention', status: 'Improving', reason: 'Sustained focus for 12 minutes in morning circle activity without leaving seat.', score: 75, criterion: 70 },
    ],
    thisWeek: {
      whatWeWorkedOn: 'Answering WH questions in speech therapy and in class, pencil grasp stabilization, and independent classroom transition.',
      whatChildIsDoingWell: 'Answered 4 of 5 questions on their own during science class and identified parts of a flower.',
      whatNeedsMorePractice: 'Starting dressing steps without a reminder and buttoning smaller garments.',
      howToPracticeAtHome: {
        title: 'Snack-Time WH Question Game',
        description: 'At snack time, ask a "what" or "where" question and wait a full 4 seconds before offering a gentle hint.',
        materials: ['Favorite healthy snack (e.g. apple slices or crackers)', 'Visual choice board (optional)'],
        videoDuration: '1:02',
        steps: [
          'Place snack within sight but just out of direct reach.',
          'Ask: "Where is the apple?" or "What do you want to eat?"',
          'Count quietly to 4 in your head to allow processing time.',
          'If no response, point to the item (gesture prompt) rather than answering for them.',
          'Celebrate immediately with positive praise and hand them the snack!'
        ]
      }
    }
  },
  {
    id: 'child-2',
    name: 'Maya Al-Rashid',
    age: 5,
    avatar: 'https://images.unsplash.com/photo-1595454223600-91fb57d22457?w=150&auto=format&fit=crop&q=80',
    diagnosis: 'Developmental Language Delay, Sensory Processing',
    caregivers: ['Amira Al-Rashid (Mother)', 'Tariq Al-Rashid (Father)'],
    school: 'Al-Noor International Academy',
    classroom: 'Kindergarten Blue',
    assignedTeam: [
      { role: 'speech', name: 'Elena Vance', title: 'Speech-Language Pathologist' },
      { role: 'ot', name: 'Marcus Reed', title: 'Occupational Therapist' },
      { role: 'teacher', name: 'Noura Al-Hassan', title: 'Kindergarten Educator' },
      { role: 'supervisor', name: 'Dr. Rebecca Hall', title: 'Clinical Director' },
    ],
    todayProgress: [
      { area: 'Communication', status: 'Improving', reason: 'Expanded phrases to 3-word combinations using core vocabulary board.', score: 82, criterion: 85 },
      { area: 'Math', status: 'Mastered', reason: 'Consistently identifies shapes circles and squares across all settings.', score: 95, criterion: 90 },
      { area: 'Fine motor', status: 'Developing', reason: 'Practiced scissor control on 2-inch straight lines.', score: 70, criterion: 80 },
      { area: 'Independent dressing', status: 'Needs support', reason: 'Zipping jacket slider needs hand-over-hand alignment.', score: 45, criterion: 85 },
      { area: 'Attention', status: 'Improving', reason: 'Completed 8-minute sensory circuit before seated desk tasks.', score: 80, criterion: 75 },
    ],
    thisWeek: {
      whatWeWorkedOn: 'AAC vocabulary expansion for daily wants and gross motor balance beam walks.',
      whatChildIsDoingWell: 'Greeting classmates spontaneously using her communication device.',
      whatNeedsMorePractice: 'Bilateral hand coordination while holding paper and cutting.',
      howToPracticeAtHome: {
        title: 'Two-Hand Playdough Roll',
        description: 'Practice flattening and cutting playdough snakes using both hands together.',
        materials: ['Non-toxic playdough', 'Child-safe plastic plastic knife or ruler'],
        videoDuration: '0:55',
        steps: [
          'Roll playdough into a snake on the table together.',
          'Hold the left side with helper hand, cut pieces with right hand.',
          'Praise using both hands at the same time!'
        ]
      }
    }
  },
  {
    id: 'child-3',
    name: 'Tariq Al-Otaibi',
    age: 7,
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    diagnosis: 'ADHD (Combined Type), Dysgraphia',
    caregivers: ['Fahad Al-Otaibi (Father)', 'Laila Al-Otaibi (Mother)'],
    school: 'Riyadh Modern School',
    classroom: 'Grade 2 - Green',
    assignedTeam: [
      { role: 'behavior', name: 'Dr. Maya Lin', title: 'Lead BCBA' },
      { role: 'remedial', name: 'James Chen', title: 'Remedial Learning Specialist' },
      { role: 'ot', name: 'Marcus Reed', title: 'Occupational Therapist' },
      { role: 'teacher', name: 'Emma Watson', title: 'Grade 2 Teacher' },
      { role: 'supervisor', name: 'Dr. Rebecca Hall', title: 'Clinical Director' },
    ],
    todayProgress: [
      { area: 'Communication', status: 'Mastered', reason: 'Conversational turn-taking exceeds target criteria in classroom discussions.', score: 92, criterion: 85 },
      { area: 'Math', status: 'Improving', reason: 'Addition within 20 accuracy reached 88% with visual number line.', score: 88, criterion: 85 },
      { area: 'Fine motor', status: 'Developing', reason: 'Pencil grip angle maintained with silicone grip aid for 5 lines of text.', score: 72, criterion: 80 },
      { area: 'Independent dressing', status: 'Mastered', reason: 'Ties sneakers and manages backpack zippers without adult assistance.', score: 98, criterion: 90 },
      { area: 'Attention', status: 'Needs support', reason: 'Off-task behavior during unprompted seatwork transitions.', score: 55, criterion: 75 },
    ],
    thisWeek: {
      whatWeWorkedOn: 'Concrete-to-abstract math addition, self-monitoring token charts, and handwriting legibility.',
      whatChildIsDoingWell: 'Self-correcting errors during 1-minute timed math sprints.',
      whatNeedsMorePractice: 'Sustaining focus during silent reading without tapping pencils.',
      howToPracticeAtHome: {
        title: '5-Minute Math Beat-the-Clock',
        description: 'Fun short sprint using visual timer where Tariq beats his own previous record.',
        materials: ['Math flashcards 1-10', 'Visual sand timer (3 min)'],
        videoDuration: '1:10',
        steps: [
          'Set 3-minute visual timer on table.',
          'Child completes cards at their own pace without interruption.',
          'Count cards together and record the high score on the fridge chart!'
        ]
      }
    }
  }
];

export const INITIAL_CONSENT_GRANTS: ConsentGrant[] = [
  {
    id: 'grant-1',
    childId: 'child-1',
    professionalId: 'prof-behavior',
    professionalName: 'Dr. Maya Lin',
    role: 'behavior',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    domains: {
      communication: true,
      math: true,
      fineMotor: true,
      dressing: true,
      attention: true,
      clinicalNotes: true,
    },
    expiryDate: '2027-10-31',
    lastViewed: 'Today at 2:15 PM'
  },
  {
    id: 'grant-2',
    childId: 'child-1',
    professionalId: 'prof-speech',
    professionalName: 'Elena Vance',
    role: 'speech',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    domains: {
      communication: true,
      math: false,
      fineMotor: false,
      dressing: false,
      attention: true,
      clinicalNotes: true,
    },
    expiryDate: '2027-10-31',
    lastViewed: 'Today at 11:30 AM'
  },
  {
    id: 'grant-3',
    childId: 'child-1',
    professionalId: 'prof-ot',
    professionalName: 'Marcus Reed',
    role: 'ot',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    domains: {
      communication: false,
      math: false,
      fineMotor: true,
      dressing: true,
      attention: true,
      clinicalNotes: true,
    },
    expiryDate: '2027-08-15',
    lastViewed: 'Yesterday at 3:45 PM'
  },
  {
    id: 'grant-4',
    childId: 'child-1',
    professionalId: 'prof-teacher',
    professionalName: 'Emma Watson',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    domains: {
      communication: true,
      math: true,
      fineMotor: true,
      dressing: false,
      attention: true,
      clinicalNotes: false, // Classroom teacher sees simplified progress, not raw ABA notes
    },
    expiryDate: '2027-06-30',
    lastViewed: 'Today at 9:00 AM'
  },
  {
    id: 'grant-5',
    childId: 'child-1',
    professionalId: 'prof-remedial',
    professionalName: 'James Chen',
    role: 'remedial',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    domains: {
      communication: true,
      math: true,
      fineMotor: false,
      dressing: false,
      attention: true,
      clinicalNotes: true,
    },
    expiryDate: '2027-09-01',
    lastViewed: '2 days ago'
  }
];

export const INITIAL_TARGETS: Target[] = [
  {
    id: 'target-1',
    childId: 'child-1',
    discipline: 'speech',
    name: 'Answering WH Questions',
    domain: 'Communication & Receptive Language',
    operationalDefinition: 'Given a picture scene or short 2-sentence story and a "who", "what", or "where" question, Leo will respond with an accurate single word or phrase within 5 seconds without physical prompting.',
    materials: ['Everyday scenario flashcards (kitchen, playground, school)', 'Visual question prompt icon cards ("Who", "What", "Where")'],
    procedureSteps: [
      '1. Present visual scenario card in front of student.',
      '2. Deliver vocal discriminative stimulus (e.g. "Where is the dog sleeping?").',
      '3. Provide 4-second latency delay before stepping in.',
      '4. If no response, use verbal prompt ("Look at the bed... where is he?").',
      '5. Reinforce correct response immediately with social praise and token.'
    ],
    masteryCriterion: '90% across 3 consecutive sessions',
    criterionThreshold: 90,
    currentPerformance: 85,
    status: 'teaching',
    suggestedAction: 'Continue current target with verbal prompt fading',
    suggestedNextStep: 'Review related prerequisite skill (identifying locations in picture scenes)',
    approvalStatus: 'needs_review',
    lastThreeSessions: [80, 85, 85]
  },
  {
    id: 'target-2',
    childId: 'child-1',
    discipline: 'behavior',
    name: 'Identifying Common Objects (DTT)',
    domain: 'Receptive Identification',
    operationalDefinition: 'When presented with an array of 3 3D objects and instructed "Touch [object]", student will point to or touch the correct object within 3 seconds across 10 trials.',
    materials: ['Common object figurines (cup, spoon, shoe, ball, car)', 'Token board (5 tokens)', 'Preferred edibles/tangibles'],
    procedureSteps: [
      '1. Clear table and seat child facing instructor.',
      '2. Place 3 randomized items 6 inches apart.',
      '3. Deliver vocal instruction: "Touch the shoe".',
      '4. Least-to-most prompt hierarchy: Independent -> Gesture -> Model -> Physical.',
      '5. Record data on trial-by-trial grid.'
    ],
    masteryCriterion: '90% across 3 sessions',
    criterionThreshold: 90,
    currentPerformance: 88,
    status: 'teaching',
    suggestedAction: 'Continue current target; mastery near',
    suggestedNextStep: 'Prepare generalization probes across novel therapy rooms and home setting',
    approvalStatus: 'approved',
    lastThreeSessions: [75, 85, 88]
  },
  {
    id: 'target-3',
    childId: 'child-1',
    discipline: 'ot',
    name: 'Buttoning a Shirt (Task Analysis)',
    domain: 'Independent Dressing & Fine Motor',
    operationalDefinition: 'Leo will grasp, insert, and pull through 5 large buttons on a dressing vest independently from top to bottom.',
    materials: ['Therapy button vest with 1-inch wooden buttons', 'Mirror', 'Visual step schedule'],
    procedureSteps: [
      '1. Align bottom edge of vest.',
      '2. Pinch button with dominant pincer grasp.',
      '3. Push button halfway through slot.',
      '4. Transfer grasp with helper hand and pull through.'
    ],
    masteryCriterion: '85% independent steps across 3 sessions',
    criterionThreshold: 85,
    currentPerformance: 70,
    status: 'teaching',
    suggestedAction: 'Provide backward chaining on final 2 steps',
    suggestedNextStep: 'Introduce smaller 0.75-inch buttons once criterion is reached',
    approvalStatus: 'approved',
    lastThreeSessions: [60, 65, 70]
  },
  {
    id: 'target-4',
    childId: 'child-1',
    discipline: 'remedial',
    name: 'Words Correct Per Minute (WCPM Fluency)',
    domain: 'Reading & Functional Academics',
    operationalDefinition: 'Leo will read aloud grade-appropriate 1st grade decodable text with at least 40 words correct per minute and fewer than 3 errors.',
    materials: ['Grade 1 Decodable Passages (Passage #14: The Red Hen)', 'Digital 60-second countdown stopwatch', 'Teacher scoring sheet'],
    procedureSteps: [
      '1. Provide student with printed passage.',
      '2. Say: "When I say start, begin reading out loud at the top. Do your best work."',
      '3. Start 60-second timer on first vocalization.',
      '4. Mark omissions and substitutions as errors; do not correct during the 1 minute.',
      '5. Calculate total words minus errors = WCPM.'
    ],
    masteryCriterion: '40 WCPM with 90% accuracy across 3 sessions',
    criterionThreshold: 40,
    currentPerformance: 34,
    status: 'teaching',
    suggestedAction: 'Implement repeated reading and pre-teaching of sight words',
    suggestedNextStep: 'Progress to 2-syllable compound words in decodables',
    approvalStatus: 'approved',
    lastThreeSessions: [28, 31, 34]
  }
];

export const INITIAL_AUDIT_LOG: AuditEvent[] = [
  {
    id: 'audit-1',
    timestamp: '2026-10-13 14:15:22',
    userId: 'user-behavior',
    userName: 'Dr. Maya Lin',
    role: 'behavior',
    action: 'RECORD_SESSION_DATA',
    resource: 'Leo Miller · Target: Identifying Objects (DTT)'
  },
  {
    id: 'audit-2',
    timestamp: '2026-10-13 11:32:05',
    userId: 'user-speech',
    userName: 'Elena Vance',
    role: 'speech',
    action: 'COMPLETE_SPEECH_TRIAL',
    resource: 'Leo Miller · Target: Answering WH questions (85% indep)'
  },
  {
    id: 'audit-3',
    timestamp: '2026-10-13 09:40:11',
    userId: 'user-parent',
    userName: 'Sarah Miller',
    role: 'parent',
    action: 'UPDATE_CONSENT_GRANT',
    resource: 'Permitted Emma Watson (Teacher) for Math & Communication'
  },
  {
    id: 'audit-4',
    timestamp: '2026-10-12 16:50:30',
    userId: 'user-supervisor',
    userName: 'Dr. Rebecca Hall',
    role: 'supervisor',
    action: 'APPROVE_TREATMENT_GOAL',
    resource: 'Approved Mastery Criteria for Buttoning a Shirt'
  },
  {
    id: 'audit-5',
    timestamp: '2026-10-12 10:12:44',
    userId: 'user-admin',
    userName: 'David Kim',
    role: 'admin',
    action: 'PDPL_COMPLIANCE_ACCESS_LOG',
    resource: 'Verified data encryption and consent ledger at rest'
  }
];

export const INITIAL_MESSAGES: MessageItem[] = [
  {
    id: 'msg-1',
    childId: 'child-1',
    senderName: 'Sarah Miller',
    senderRole: 'parent',
    senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    contentEn: 'Hi team! We tried the snack-time WH question game today. Leo answered "Where is the apple?" right away without needing a prompt!',
    contentAr: 'مرحباً بالفريق! جربنا لعبة أسئلة أين وماذا وقت الوجبة الخفيفة اليوم. أجاب ليو "أين التفاحة؟" فوراً دون الحاجة لمساعدة!',
    timestamp: 'Today at 3:12 PM',
    goalTag: 'Answering WH Questions',
    isParent: true,
  },
  {
    id: 'msg-2',
    childId: 'child-1',
    senderName: 'Elena Vance, CCC-SLP',
    senderRole: 'speech',
    senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    contentEn: 'That is incredible news Sarah! That matches what we observed in our clinic session this morning (85% independent). We will keep fading the verbal cues.',
    contentAr: 'هذا خبر رائع يا سارة! هذا يتطابق تماماً مع ما لاحظناه في جلسة العيادة هذا الصباح (85٪ استقلالية). سنواصل تخفيف التلميحات اللفظية.',
    timestamp: 'Today at 3:25 PM',
    goalTag: 'Answering WH Questions',
    isParent: false,
  },
  {
    id: 'msg-3',
    childId: 'child-1',
    senderName: 'Emma Watson',
    senderRole: 'teacher',
    senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    contentEn: 'I also noticed Leo raised his hand during our science lesson about plants and answered where the roots grow. Great generalization!',
    contentAr: 'لاحظت أيضاً أن ليو رفع يده أثناء درس العلوم عن النباتات وأجاب عن مكان نمو الجذور. تعميم رائع للمهارة!',
    timestamp: 'Today at 4:02 PM',
    goalTag: 'Answering WH Questions',
    isParent: false,
  }
];
