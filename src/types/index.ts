// Types for KshamataAI - Competency Intelligence & Learning Platform

export type UserRole = 'learner' | 'admin' | 'field_officer' | 'senior_officer';

export type CompetencyCategory = 'Domain' | 'Functional' | 'Technical' | 'Behavioural';

export type PriorityLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  roleTitle: string;
  roleType: UserRole;
  level: string;
  cadre: string;
  department: string;
  division: string;
  joinedDate: string;
  avatarUrl: string;
  overallReadiness: number;
  readinessDelta: number;
  competencyCount: number;
  completedProofs: number;
  learningHoursThisMonth: number;
  phone?: string;
  officeLocation?: string;
  employeeCode?: string;
  reportingOfficer?: string;
  bio?: string;
  specializations?: string[];
  certifications?: {
    id: string;
    title: string;
    issueDate: string;
    issuer: string;
    credentialId: string;
    status: 'Verified' | 'In Progress';
    score: number;
  }[];
  postings?: {
    period: string;
    role: string;
    location: string;
    unit: string;
  }[];
}

export interface CompetencyItem {
  id: string;
  code: string;
  name: string;
  category: CompetencyCategory;
  description: string;
  requiredLevel: number; // 0 - 100
  currentLevel: number;  // 0 - 100
  gap: number;           // required - current
  priority: PriorityLevel;
  gapReason: string;
  keyBehaviors: string[];
  recommendedCourseId?: string;
  practiceModule?: string;
  proofRequired?: string;
}

export interface ExplainableMapNode {
  id: string;
  competencyName: string;
  roleContext: string;
  whyNeeded: string;
  whatYouWillLearn: string[];
  workplaceApplication: string;
  recommendedActions: {
    title: string;
    type: 'Course' | 'Clinic' | 'Simulation' | 'Proof';
    duration: string;
    linkId: string;
  }[];
}

export interface LearningPathNode {
  id: string;
  title: string;
  stageName: string;
  stepNumber: number;
  competency: string;
  currentLevel: number;
  targetLevel: number;
  effort: string;
  status: 'completed' | 'in_progress' | 'locked' | 'recommended_next';
  description: string;
  skillsGained: string[];
}

export interface Course {
  id: string;
  title: string;
  competencyId: string;
  competencyName: string;
  category: CompetencyCategory;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  whyRecommended: string;
  competencyDelta: number; // e.g. +18%
  currentCompetency: number;
  targetCompetency: number;
  practicalApplication: string;
  modulesCount: number;
  rating: number;
  enrolledCount: number;
  instructors: string;
  tags: string[];
  completed?: boolean;
  progress?: number;
}

export interface DataQualityIssue {
  id: string;
  rowNumber: number;
  fieldName: string;
  currentValue: string;
  issueType: 'Missing Value' | 'Impossible Value' | 'Duplicate Record' | 'Invalid Date' | 'Outlier Spike' | 'Formatting Error';
  severity: 'Critical' | 'Moderate' | 'Minor';
  explanation: string;
  recommendedAction: string;
  fixedValue?: string;
  status: 'unresolved' | 'fixed' | 'ignored';
  relatedCompetency: string;
}

export interface DataQualityDataset {
  id: string;
  name: string;
  sector: string;
  recordsCount: number;
  fieldsCount: number;
  uploadDate: string;
  qualityScore: number;
  criticalIssues: number;
  moderateIssues: number;
  minorIssues: number;
  issues: DataQualityIssue[];
  recommendedLearning: string[];
}

export interface SimulatorChoice {
  id: string;
  text: string;
  decisionImpact: string;
  consequence: string;
  statisticalRationale: string;
  isOptimal: boolean;
  competencyDelta: number;
}

export interface SimulationScenario {
  id: string;
  title: string;
  division: string;
  context: string;
  difficulty: 'Foundation' | 'Operational' | 'Complex';
  prompt: string;
  options: SimulatorChoice[];
  workplaceRelevance: string;
  relatedCompetency: string;
}

export interface AIQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  sourceDocument: string;
  sourcePage: number;
  sourceSnippet: string;
  status: 'approved' | 'pending' | 'rejected' | 'edited';
  competency: string;
  reviewedBy?: string;
  reviewDate?: string;
}

export interface ExpertProfile {
  id: string;
  name: string;
  roleTitle: string;
  cadre: string;
  department: string;
  specializations: string[];
  competencyFocus: string[];
  verifiedBadge: boolean;
  availableSlot: string;
  experienceYears: number;
  rating: number;
  consultationsDone: number;
}

export interface DepartmentRiskItem {
  id: string;
  departmentName: string;
  division: string;
  headcount: number;
  avgReadiness: number;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  topAtRiskCompetencies: {
    name: string;
    gap: number;
    risk: 'HIGH' | 'MEDIUM' | 'LOW';
  }[];
  trend: 'improving' | 'stable' | 'declining';
  recommendedIntervention: string;
}

export interface PolicyMetricOutcome {
  budgetImpactCrores: number;
  dataQualityProjected: number; // 0-100
  workforceOvertimeHours: number;
  citizenTrustIndex: number;    // 0-100
  projectDelayWeeks: number;
}

export interface AssessmentItem {
  id: string;
  title: string;
  type: 'Knowledge' | 'Scenario' | 'Practical';
  duration: string;
  questionsCount: number;
  competencyName: string;
  contributionPercentage: number;
  userScore?: number;
  status: 'not_started' | 'passed' | 'needs_practice';
  lastAttempt?: string;
}

export interface ProofChallenge {
  id: string;
  title: string;
  competency: string;
  context: string;
  instructions: string[];
  deliverableType: 'Cleaned Dataset' | 'Sampling Weight Table' | 'Data Quality Audit Report' | 'Survey Frame Validation';
  timeEstimate: string;
  evaluatedMetrics: {
    name: string;
    weight: number;
  }[];
  passedScoreThreshold: number;
  currentStatus: 'available' | 'in_progress' | 'evaluated';
  readinessScoreAwarded?: number;
}
