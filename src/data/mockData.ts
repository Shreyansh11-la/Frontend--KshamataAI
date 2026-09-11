import {
  UserProfile,
  CompetencyItem,
  ExplainableMapNode,
  LearningPathNode,
  Course,
  DataQualityDataset,
  SimulationScenario,
  AIQuizQuestion,
  ExpertProfile,
  DepartmentRiskItem,
  AssessmentItem,
  ProofChallenge
} from '../types';

export const mockLearnerProfile: UserProfile = {
  id: 'usr_ananya_01',
  name: 'Ananya Sharma',
  email: 'ananya.sharma@mospi.gov.in',
  roleTitle: 'Statistical Officer',
  roleType: 'learner',
  level: 'Level 2 (Junior Cadre)',
  cadre: 'Subordinate Statistical Service (SSS)',
  department: 'National Statistical Systems Network',
  division: 'Survey & Data Division (NSSO)',
  joinedDate: 'Oct 2023',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
  overallReadiness: 74,
  readinessDelta: 8,
  competencyCount: 14,
  completedProofs: 5,
  learningHoursThisMonth: 18.5,
  phone: '+91 98112 40918',
  officeLocation: 'Room 412, Sankhyiki Bhawan, CBD Shahdara, New Delhi',
  employeeCode: 'SSS-2023-4921',
  reportingOfficer: 'Dr. Rajiv Menon, Joint Director General',
  bio: 'Statistical Officer specializing in rural household microdata scrutiny, CAPI field verification, and logic-based imputation protocols under NSS rounds.',
  specializations: ['Household Survey Audits', 'CAPI Protocols', 'Data Quality Imputation', 'PLFS Scrutiny'],
  certifications: [
    {
      id: 'cert_01',
      title: 'NSS 79th Round Data Validation Benchmark',
      issueDate: '12 Jan 2026',
      issuer: 'MoSPI National Statistical Academy',
      credentialId: 'NSA-NSS79-VAL-8821',
      status: 'Verified',
      score: 94
    },
    {
      id: 'cert_02',
      title: 'Digital Personal Data Protection (DPDP) Act Compliance',
      issueDate: '04 Feb 2026',
      issuer: 'MeitY & MoSPI Digital Trust Directorate',
      credentialId: 'DPDP-2023-GOV-4190',
      status: 'Verified',
      score: 98
    },
    {
      id: 'cert_03',
      title: 'Survey Weight Calibration & Multi-Stage Sampling',
      issueDate: '28 Feb 2026',
      issuer: 'Indian Statistical Institute (ISI) & MoSPI',
      credentialId: 'ISI-MSP-CALIB-3129',
      status: 'In Progress',
      score: 82
    }
  ],
  postings: [
    {
      period: 'Oct 2023 - Present',
      role: 'Statistical Officer (Field Validation Cell)',
      location: 'New Delhi HQ',
      unit: 'NSSO Data Quality Directorate'
    },
    {
      period: 'Jul 2023 - Oct 2023',
      role: 'Probationary Statistical Cadre Induction',
      location: 'Kolkata Training Hub',
      unit: 'National Statistical Academy'
    }
  ]
};

export const mockAdminProfile: UserProfile = {
  id: 'usr_rajiv_01',
  name: 'Dr. Rajiv Menon',
  email: 'rajiv.menon@mospi.gov.in',
  roleTitle: 'Joint Director General',
  roleType: 'admin',
  level: 'Level 5 (Senior Executive)',
  cadre: 'Indian Statistical Service (ISS)',
  department: 'Workforce Capability & Statistical Standards Directorate',
  division: 'Central Statistics Operations',
  joinedDate: 'Jan 2015',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
  overallReadiness: 91,
  readinessDelta: 4,
  competencyCount: 22,
  completedProofs: 18,
  learningHoursThisMonth: 8.0,
  phone: '+91 94330 18290',
  officeLocation: 'Suite 204, Sardar Patel Bhawan, Parliament Street, New Delhi',
  employeeCode: 'ISS-2015-1082',
  reportingOfficer: 'Secretary & Chief Statistician of India (CSI)',
  bio: 'Cadre Director overseeing national capability benchmarks, sampling standardizations, statistical risk mitigation, and Karmayogi competency alignment.',
  specializations: ['National Accounts Statistics', 'Cadre Capability Strategy', 'Macroeconomic Aggregates', 'DPDP Framework'],
  certifications: [
    {
      id: 'cert_adm_01',
      title: 'Senior Statistical Leadership & System Governance',
      issueDate: '15 Aug 2024',
      issuer: 'Cabinet Secretariat & Mission Karmayogi',
      credentialId: 'GOI-KARM-EXEC-9912',
      status: 'Verified',
      score: 99
    },
    {
      id: 'cert_adm_02',
      title: 'Advanced Econometric & Price Index Modernization',
      issueDate: '10 Nov 2025',
      issuer: 'UN Statistical Commission & MoSPI',
      credentialId: 'UNSC-MSP-GOV-5102',
      status: 'Verified',
      score: 96
    }
  ],
  postings: [
    {
      period: '2022 - Present',
      role: 'Joint Director General (Cadre & Quality)',
      location: 'New Delhi',
      unit: 'Central Statistics Operations'
    },
    {
      period: '2018 - 2022',
      role: 'Director (Economic Statistics & Index Cell)',
      location: 'New Delhi & Mumbai',
      unit: 'National Accounts Division'
    },
    {
      period: '2015 - 2018',
      role: 'Deputy Director (Field Operations)',
      location: 'Bangalore Regional Office',
      unit: 'FOD Southern Zone'
    }
  ]
};

export const mockCompetencies: CompetencyItem[] = [
  {
    id: 'comp_data_quality',
    code: 'STAT-DOM-04',
    name: 'Data Quality & Validation',
    category: 'Functional',
    description: 'Systematic validation of survey microdata, missing-value imputation protocols, logic consistency checks, and outlier scrutiny.',
    requiredLevel: 85,
    currentLevel: 54,
    gap: 31,
    priority: 'HIGH',
    gapReason: 'Your role involves validating primary field survey datasets, but recent diagnostic assessments indicate gaps in missing-value handling and cross-variable consistency logic.',
    keyBehaviors: [
      'Executes multi-pass verification on household income vs expenditure variables',
      'Detects impossible values before ingestion into central data repository',
      'Applies statistically sound imputation methodologies over arbitrary deletion'
    ],
    recommendedCourseId: 'crs_dq_basics',
    practiceModule: 'Data Quality Clinic',
    proofRequired: 'Audit & Clean Rural Employment Dataset'
  },
  {
    id: 'comp_sampling_method',
    code: 'STAT-DOM-02',
    name: 'Sampling Design & Weight Estimation',
    category: 'Domain',
    description: 'Multi-stage stratified sampling techniques, probability proportional to size (PPS) selection, sampling frame integrity, and design weight calculations.',
    requiredLevel: 80,
    currentLevel: 58,
    gap: 22,
    priority: 'HIGH',
    gapReason: 'Field survey allocation requires constructing representative sub-samples and calculating non-response weights without inflating variance.',
    keyBehaviors: [
      'Designs stratified cluster sampling for rural and urban blocks',
      'Computes multiplier weights adjusting for cluster non-response',
      'Evaluates sampling variance and standard error benchmarks'
    ],
    recommendedCourseId: 'crs_sampling_core',
    practiceModule: 'Statistics Work Simulator: Cluster Non-Response',
    proofRequired: 'Construct Multi-Stage Sampling Multipliers'
  },
  {
    id: 'comp_data_viz',
    code: 'STAT-TEC-03',
    name: 'Statistical Data Visualization',
    category: 'Technical',
    description: 'Creation of executive statistical charts, thematic mapping, distribution plots, and dashboard communication for policy makers.',
    requiredLevel: 75,
    currentLevel: 62,
    gap: 13,
    priority: 'MEDIUM',
    gapReason: 'Quarterly statistical bulletins require clear visual dissemination of Consumer Price trends without misleading scales.',
    keyBehaviors: [
      'Builds time-series index decomposition charts',
      'Adheres to official government visual standards and color-safe palettes',
      'Eliminates truncations that bias visual perception'
    ],
    recommendedCourseId: 'crs_dataviz_stats',
    practiceModule: 'Dissemination Lab',
    proofRequired: 'Generate MoSPI Standard Bulletin Infographic'
  },
  {
    id: 'comp_data_privacy',
    code: 'STAT-FUN-08',
    name: 'Data Privacy & Anonymization Protocols',
    category: 'Functional',
    description: 'Application of Digital Personal Data Protection (DPDP) compliance, microdata anonymization, cell suppression, and PII masking.',
    requiredLevel: 90,
    currentLevel: 72,
    gap: 18,
    priority: 'MEDIUM',
    gapReason: 'Handling sensitive household records demands zero leakage of direct citizen identifiers and geographic coordinate obfuscation.',
    keyBehaviors: [
      'Identifies Quasi-Identifiers and enforces k-anonymity checks',
      'Executes deterministic and randomized masking before public release',
      'Operates the Safe AI Guard protocol on unvetted documents'
    ],
    recommendedCourseId: 'crs_dpdp_compliance',
    practiceModule: 'Safe AI Guard Studio',
    proofRequired: 'Anonymize Microdata Public Release File'
  },
  {
    id: 'comp_survey_operations',
    code: 'STAT-DOM-01',
    name: 'Field Survey Operations & Enumeration',
    category: 'Domain',
    description: 'CAPI (Computer Assisted Personal Interview) deployment, listing schedules, field-level supervisory oversight, and interviewer cadence.',
    requiredLevel: 80,
    currentLevel: 76,
    gap: 4,
    priority: 'LOW',
    gapReason: 'Strong operational foundation demonstrated in field scheduling; minor refinements needed in remote block supervisory callbacks.',
    keyBehaviors: [
      'Oversees digital tablet sync in low-connectivity blocks',
      'Performs 10% spot audit re-interviews on sampled households',
      'Reconciles boundary disputes with municipal ward maps'
    ],
    recommendedCourseId: 'crs_survey_ops',
    practiceModule: 'Field Officer Offline Hub',
    proofRequired: 'Field Supervisory Audit Log'
  },
  {
    id: 'comp_economic_accounts',
    code: 'STAT-DOM-05',
    name: 'National Accounts & Gross Value Added',
    category: 'Domain',
    description: 'Framework of SNA 2008, GVA estimation by economic activity, deflators, and input-output table reconciliation.',
    requiredLevel: 70,
    currentLevel: 45,
    gap: 25,
    priority: 'HIGH',
    gapReason: 'Inter-departmental rotation into Economic Statistics requires understanding double deflation and informal sector estimation techniques.',
    keyBehaviors: [
      'Applies appropriate price deflators to nominal output series',
      'Reconciles MCA21 corporate data with ASI manufacturing surveys',
      'Estimates informal trade contributions using benchmark indicators'
    ],
    recommendedCourseId: 'crs_sna_foundations',
    practiceModule: 'Policy Lab: Economic Accounts Deflator',
    proofRequired: 'Quarterly GVA Estimation Sheet'
  },
  {
    id: 'comp_ethical_governance',
    code: 'STAT-BEH-01',
    name: 'Integrity in Official Statistics & Ethics',
    category: 'Behavioural',
    description: 'UN Fundamental Principles of Official Statistics, objective methodology, transparency, professional independence, and public trust.',
    requiredLevel: 95,
    currentLevel: 92,
    gap: 3,
    priority: 'LOW',
    gapReason: 'Demonstrates exemplary commitment to methodological neutrality and whistleblower adherence.',
    keyBehaviors: [
      'Refuses subjective alteration of survey weights to fit predefined targets',
      'Documents all methodological modifications in public metadata files',
      'Protects confidential primary respondents without exception'
    ],
    recommendedCourseId: 'crs_statistical_ethics',
    practiceModule: 'Case Study: Preserving Independence',
    proofRequired: 'Official Metadata Disclosure Dossier'
  },
  {
    id: 'comp_r_python_stats',
    code: 'STAT-TEC-01',
    name: 'Statistical Programming (R / Python)',
    category: 'Technical',
    description: 'Reproducible statistical pipelines, survey package modeling, automated validation scripts, and version-controlled data cleaning.',
    requiredLevel: 75,
    currentLevel: 50,
    gap: 25,
    priority: 'HIGH',
    gapReason: 'Transition from legacy spreadsheets to automated R scripts is mandatory for national survey processing batches.',
    keyBehaviors: [
      'Writes automated tidyverse/data.table validation pipelines',
      'Uses survey/srvyr R packages to estimate standard errors with sample design',
      'Maintains clean Git commits for methodological audibility'
    ],
    recommendedCourseId: 'crs_r_official_stats',
    practiceModule: 'Data Quality Clinic',
    proofRequired: 'Scripted Clean Pipeline for NSS 79th Round'
  }
];

export const mockExplainableLearningMap: Record<string, ExplainableMapNode> = {
  comp_data_quality: {
    id: 'comp_data_quality',
    competencyName: 'Data Quality & Validation',
    roleContext: 'Statistical Officer — Survey & Data Division (NSSO)',
    whyNeeded: 'Your mandate is to certify primary district survey microdata before ingestion into central archives. Flawed missing-value treatments and undetected outliers distort headline national indicators.',
    whatYouWillLearn: [
      'Automated rule-based detection for impossible numeric combinations (e.g., Age 187, negative expenditure)',
      'Deterministic vs stochastic imputation strategies in accordance with official statistical manuals',
      'Cross-record logical consistency verification (e.g. child age > parent age, education vs literacy level)',
      'Variance tracking to ensure data cleaning does not artificially attenuate standard errors'
    ],
    workplaceApplication: 'You will deploy an automated validation suite across incoming field schedules from 18 district sub-offices, reducing manual review latency from 24 days to 48 hours.',
    recommendedActions: [
      {
        title: 'Complete Course: Data Quality & Imputation Protocols',
        type: 'Course',
        duration: '3.5 hours',
        linkId: 'crs_dq_basics'
      },
      {
        title: 'Run Diagnostic in Data Quality Clinic',
        type: 'Clinic',
        duration: '30 mins hands-on',
        linkId: 'clinic_rural_sample'
      },
      {
        title: 'Simulation: Handling Corrupted District Blocks',
        type: 'Simulation',
        duration: '15 mins interactive',
        linkId: 'sim_district_missing'
      },
      {
        title: 'Capstone Proof: Clean Survey Round Microdata',
        type: 'Proof',
        duration: '45 mins practical',
        linkId: 'proof_dq_round'
      }
    ]
  },
  comp_sampling_method: {
    id: 'comp_sampling_method',
    competencyName: 'Sampling Design & Weight Estimation',
    roleContext: 'Statistical Officer — Sampling & Methodology Directorate',
    whyNeeded: 'Official socioeconomic surveys use two-stage stratified sampling. Incorrect selection weights lead to biased estimates that misguide fiscal resource allocation.',
    whatYouWillLearn: [
      'Probability Proportional to Size (PPS) systematically applied to Census enumeration blocks',
      'Calculation of design weights, non-response adjustments, and post-stratification calibration',
      'Standard error and design effect (Deff) computational formulas'
    ],
    workplaceApplication: 'Design representative sample allocations for newly formed administrative sub-divisions without exceeding allocated budget ceilings.',
    recommendedActions: [
      {
        title: 'Core Course: Sampling Design & Weight Estimation',
        type: 'Course',
        duration: '4.0 hours',
        linkId: 'crs_sampling_core'
      },
      {
        title: 'Simulator: 30% Missing Cluster Non-Response',
        type: 'Simulation',
        duration: '20 mins',
        linkId: 'sim_cluster_weights'
      },
      {
        title: 'Proof: Construct Multi-Stage Multipliers',
        type: 'Proof',
        duration: '60 mins practical',
        linkId: 'proof_sampling_calc'
      }
    ]
  }
};

export const mockLearningPath: LearningPathNode[] = [
  {
    id: 'step_1',
    stepNumber: 1,
    stageName: 'Stage 1: Foundation',
    title: 'Statistical Principles & Institutional Framework',
    competency: 'Integrity in Official Statistics & Ethics',
    currentLevel: 92,
    targetLevel: 95,
    effort: '2.0 hrs',
    status: 'completed',
    description: 'Foundations of the National Statistical Commission mandate and UN Principles of Official Statistics.',
    skillsGained: ['Institutional mandates', 'Ethical protocols', 'Conflict of interest resolution']
  },
  {
    id: 'step_2',
    stepNumber: 2,
    stageName: 'Stage 2: Collection & Field Cadre',
    title: 'Digital Field Operations & CAPI Protocol',
    competency: 'Field Survey Operations & Enumeration',
    currentLevel: 76,
    targetLevel: 80,
    effort: '3.0 hrs',
    status: 'completed',
    description: 'Field supervisor protocols, remote offline survey synchronizations, and spot verification audits.',
    skillsGained: ['CAPI tablet workflows', 'Enumeration boundary audits', 'Household listing']
  },
  {
    id: 'step_3',
    stepNumber: 3,
    stageName: 'Stage 3: Core Diagnostic Gap',
    title: 'Data Quality & Imputation Protocols',
    competency: 'Data Quality & Validation',
    currentLevel: 54,
    targetLevel: 85,
    effort: '4.5 hrs',
    status: 'recommended_next',
    description: 'Master rule-based validation, outlier scrutiny, missingness classification, and ethical imputation.',
    skillsGained: ['Logical cross-validation', 'Hot-deck & Mean imputation', 'Outlier bounds checking']
  },
  {
    id: 'step_4',
    stepNumber: 4,
    stageName: 'Stage 4: Methodological Rigor',
    title: 'Advanced Sampling & Design Weight Calibration',
    competency: 'Sampling Design & Weight Estimation',
    currentLevel: 58,
    targetLevel: 80,
    effort: '5.0 hrs',
    status: 'in_progress',
    description: 'Constructing robust sampling frames, probability proportional to size (PPS), and non-response calibration.',
    skillsGained: ['Multi-stage stratification', 'Multiplier estimation', 'Variance calculations']
  },
  {
    id: 'step_5',
    stepNumber: 5,
    stageName: 'Stage 5: Automation & Scripting',
    title: 'Reproducible Pipelines in R for Official Statistics',
    competency: 'Statistical Programming (R / Python)',
    currentLevel: 50,
    targetLevel: 75,
    effort: '6.0 hrs',
    status: 'locked',
    description: 'Transforming legacy spreadsheet processes into automated, audit-logged R script pipelines.',
    skillsGained: ['Tidyverse microdata batching', 'Survey design modeling in R', 'Reproducible reporting']
  },
  {
    id: 'step_6',
    stepNumber: 6,
    stageName: 'Stage 6: Real-World Certification',
    title: 'Practical Capstone: National Survey Microdata Audit',
    competency: 'Learning-to-Work Proof',
    currentLevel: 74,
    targetLevel: 90,
    effort: '2.5 hrs',
    status: 'locked',
    description: 'Interactive real-work proof: sanitize, audit, weight, and certify a corrupted district dataset.',
    skillsGained: ['End-to-end dataset sign-off', 'Executive summary drafting', 'Zero-defect certification']
  }
];

export const mockCourses: Course[] = [
  {
    id: 'crs_dq_basics',
    title: 'Data Quality & Imputation Protocols in Official Surveys',
    competencyId: 'comp_data_quality',
    competencyName: 'Data Quality & Validation',
    category: 'Functional',
    level: 'Intermediate',
    duration: '3.5 hours',
    whyRecommended: 'Your Data Quality competency is currently 54% (Required: 85%). This course directly targets your highest operational risk.',
    competencyDelta: 18,
    currentCompetency: 54,
    targetCompetency: 72,
    practicalApplication: 'You will be able to configure automated validation rules for the upcoming Annual Household Expenditure Survey.',
    modulesCount: 5,
    rating: 4.85,
    enrolledCount: 1420,
    instructors: 'Dr. Savita Roy (Former DDG, NSSO Methodology)',
    tags: ['Data Validation', 'Imputation', 'Outliers', 'Microdata'],
    progress: 35,
    completed: false
  },
  {
    id: 'crs_sampling_core',
    title: 'Stratified Multi-Stage Sampling & Weighting in Practice',
    competencyId: 'comp_sampling_method',
    competencyName: 'Sampling Design & Weight Estimation',
    category: 'Domain',
    level: 'Intermediate',
    duration: '4.2 hours',
    whyRecommended: 'Targeted to close your 22% gap in sampling weights and cluster non-response calculations.',
    competencyDelta: 15,
    currentCompetency: 58,
    targetCompetency: 73,
    practicalApplication: 'Equips you to calculate urban and rural sub-sample multiplier tables for quarterly labor surveys.',
    modulesCount: 6,
    rating: 4.9,
    enrolledCount: 980,
    instructors: 'Prof. K. Venkatesh (ISI Kolkata Faculty)',
    tags: ['Sampling Frame', 'PPS Selection', 'Weight Calibration', 'Design Effect'],
    progress: 10,
    completed: false
  },
  {
    id: 'crs_dpdp_compliance',
    title: 'Data Privacy & Anonymization Under DPDP Act for Public Data',
    competencyId: 'comp_data_privacy',
    competencyName: 'Data Privacy & Anonymization Protocols',
    category: 'Functional',
    level: 'Intermediate',
    duration: '2.5 hours',
    whyRecommended: 'Closes a 18% gap in microdata masking and ensures legal compliance before public repository releases.',
    competencyDelta: 14,
    currentCompetency: 72,
    targetCompetency: 86,
    practicalApplication: 'Confidently strip quasi-identifiers and apply k-anonymity algorithms to district health statistics.',
    modulesCount: 4,
    rating: 4.78,
    enrolledCount: 2150,
    instructors: 'Adv. Meenakshi Sundaram & MoSPI Legal Cell',
    tags: ['DPDP Act', 'k-Anonymity', 'PII Redaction', 'Microdata Protection'],
    progress: 0,
    completed: false
  },
  {
    id: 'crs_r_official_stats',
    title: 'R for Official Statistics: Survey Analysis & Automated Quality Checks',
    competencyId: 'comp_r_python_stats',
    competencyName: 'Statistical Programming (R / Python)',
    category: 'Technical',
    level: 'Advanced',
    duration: '6.0 hours',
    whyRecommended: 'Mandatory technical upgrade to transition off manual spreadsheets to script-based audit trails.',
    competencyDelta: 22,
    currentCompetency: 50,
    targetCompetency: 72,
    practicalApplication: 'Build automated nightly data validation scripts that email error flags to field supervisory teams.',
    modulesCount: 8,
    rating: 4.92,
    enrolledCount: 840,
    instructors: 'Arjun Nambiar (Senior Data Architect, DIID)',
    tags: ['R Programming', 'survey package', 'ggplot2', 'Automated QA'],
    progress: 0,
    completed: false
  }
];

export const mockDataQualityDatasets: DataQualityDataset[] = [
  {
    id: 'ds_rural_employment',
    name: 'District_74_Rural_Household_Sample_v2.csv',
    sector: 'Periodic Labour Force & Employment Survey',
    recordsCount: 450,
    fieldsCount: 18,
    uploadDate: 'Today, 09:30 AM',
    qualityScore: 72,
    criticalIssues: 3,
    moderateIssues: 6,
    minorIssues: 5,
    recommendedLearning: [
      'Data Validation Protocols (STAT-DOM-04)',
      'Outlier Bounds Checking',
      'Logical Relationship Checks'
    ],
    issues: [
      {
        id: 'iss_1',
        rowNumber: 48,
        fieldName: 'Respondent_Age',
        currentValue: '187',
        issueType: 'Impossible Value',
        severity: 'Critical',
        explanation: 'Age value of 187 exceeds verified human biological limits. In official schedules, human age must lie between 0 and 115.',
        recommendedAction: 'Cross-check with voter ID/Aadhaar year of birth recorded in physical schedule or flag for supervisory re-interview.',
        fixedValue: '37',
        status: 'unresolved',
        relatedCompetency: 'Data Quality & Validation'
      },
      {
        id: 'iss_2',
        rowNumber: 112,
        fieldName: 'Monthly_Consumption_Expenditure',
        currentValue: '-4200.00',
        issueType: 'Impossible Value',
        severity: 'Critical',
        explanation: 'Household consumption expenditure cannot be a negative value. Likely typographical transposition of debt repayments.',
        recommendedAction: 'Verify expenditure schedule section 4.2; rectify negative sign to positive or code as debt repayment.',
        fixedValue: '4200.00',
        status: 'unresolved',
        relatedCompetency: 'Data Quality & Validation'
      },
      {
        id: 'iss_3',
        rowNumber: 204,
        fieldName: 'Primary_Industry_NIC_Code',
        currentValue: '99999',
        issueType: 'Missing Value',
        severity: 'Critical',
        explanation: 'Generic placeholder code 99999 applied where economic enterprise code was omitted by field enumerator.',
        recommendedAction: 'Review descriptive text note: "Cultivates paddy & wheat" -> Impute NIC-2008 Code 01111.',
        fixedValue: '01111',
        status: 'unresolved',
        relatedCompetency: 'Data Quality & Validation'
      },
      {
        id: 'iss_4',
        rowNumber: 89,
        fieldName: 'Household_ID',
        currentValue: 'HH-DIST74-0089',
        issueType: 'Duplicate Record',
        severity: 'Moderate',
        explanation: 'Exact duplicate record with identical head of household, GPS location, and asset listing found at row 90.',
        recommendedAction: 'Confirm with block supervisor if visit was double-synchronized during offline tablet upload. Remove second entry.',
        status: 'unresolved',
        relatedCompetency: 'Data Quality & Validation'
      },
      {
        id: 'iss_5',
        rowNumber: 156,
        fieldName: 'Interview_Date',
        currentValue: '31/02/2026',
        issueType: 'Invalid Date',
        severity: 'Moderate',
        explanation: 'Calendar date 31/02/2026 does not exist. CAPI app date validation bypass detected.',
        recommendedAction: 'Derive correct date from tablet timestamp metadata: 28/02/2026.',
        fixedValue: '28/02/2026',
        status: 'unresolved',
        relatedCompetency: 'Data Quality & Validation'
      },
      {
        id: 'iss_6',
        rowNumber: 310,
        fieldName: 'Daily_Wage_Rate',
        currentValue: '95000',
        issueType: 'Outlier Spike',
        severity: 'Moderate',
        explanation: 'Unskilled rural agricultural daily wage of ₹95,000 is 300x the state average. Likely entered monthly aggregate instead of daily rate.',
        recommendedAction: 'Divide by reported 26 working days in month: ₹95,000 / 26 = ₹3,653.80 or inspect physical note.',
        fixedValue: '3650',
        status: 'unresolved',
        relatedCompetency: 'Data Quality & Validation'
      },
      {
        id: 'iss_7',
        rowNumber: 19,
        fieldName: 'Education_Level',
        currentValue: 'Post_Graduate',
        issueType: 'Formatting Error',
        severity: 'Minor',
        explanation: 'Member age is 4 years old while educational attainment is marked Post_Graduate. Incompatible cross-variable logic.',
        recommendedAction: 'Code education for children under 5 as "Not Applicable / Below School Age".',
        fixedValue: 'Not Applicable',
        status: 'unresolved',
        relatedCompetency: 'Data Quality & Validation'
      }
    ]
  }
];

export const mockSimulations: SimulationScenario[] = [
  {
    id: 'sim_district_missing',
    title: 'District Survey Crisis: 30% Missing Response in Rural Cluster B',
    division: 'Field Operations & Socioeconomic Surveys',
    difficulty: 'Operational',
    context: 'During Round 79 of the National Household Living Conditions Survey, Block B of District 14 reports a 30% unit non-response due to seasonal agricultural migration. You are the Statistical Officer responsible for the integrity of the data batch.',
    prompt: 'The raw dataset has arrived on your desk. The quarterly deadline is in 5 working days. What is your immediate and methodologically compliant first action?',
    relatedCompetency: 'Sampling Design & Weight Estimation',
    workplaceRelevance: 'Directly mirrors real-world non-response scenarios encountered in annual survey cycles.',
    options: [
      {
        id: 'opt_a',
        text: 'A. Delete all incomplete records and compute estimates from the remaining 70% sample without modification.',
        isOptimal: false,
        competencyDelta: -10,
        decisionImpact: 'Severe Selection Bias Induced',
        consequence: 'Systematic attrition of migrant labor households causes a 24% overestimation of average rural consumption, rendering the report scientifically invalid.',
        statisticalRationale: 'Deletion assumes Missing Completely At Random (MCAR), which is false here because seasonal migrants systematically differ from non-migrants.'
      },
      {
        id: 'opt_b',
        text: 'B. Investigate the missingness pattern, evaluate if Missing At Random (MAR) holds, and re-weight surviving clusters via propensity adjustment.',
        isOptimal: true,
        competencyDelta: 15,
        decisionImpact: 'Statistically Sound Adjustment',
        consequence: 'You compute non-response adjustment multipliers based on auxiliary listing census counts, preserving unbiased population estimates.',
        statisticalRationale: 'Proper re-weighting redistributes the sampling weights of non-responding households across similar respondents in the same stratum.'
      },
      {
        id: 'opt_c',
        text: 'C. Replace all missing income and expenditure fields with zeros.',
        isOptimal: false,
        competencyDelta: -15,
        decisionImpact: 'Catastrophic Distribution Distortion',
        consequence: 'Household poverty estimates in the district spike artificially to 58%, triggering false emergency policy alerts and media alarm.',
        statisticalRationale: 'Zero-imputation turns missing data into real zero-income data points, crushing the mean and inflating false poverty metrics.'
      },
      {
        id: 'opt_d',
        text: 'D. Request a 30-day blanket extension for the entire state and cancel publication.',
        isOptimal: false,
        competencyDelta: -5,
        decisionImpact: 'Unjustified Administrative Bottleneck',
        consequence: 'Breaches statutory timeline commitments when statistical remedies (weight calibration & proxy visits) were readily available.',
        statisticalRationale: 'Established survey methodology provides standardized non-response weight adjustment mechanisms specifically designed for seasonal attrition.'
      }
    ]
  },
  {
    id: 'sim_outlier_cpi',
    title: 'Consumer Price Index Anomaly: Garlic Price Spike in Urban Centers',
    division: 'Price Statistics Division',
    difficulty: 'Complex',
    context: 'In Month M, weekly quotation returns from 3 urban centers show a 400% surge in garlic prices due to temporary supply chain disruptions in wholesale mandis.',
    prompt: 'As the Price Index Verifier, how do you handle this extreme outlier before finalizing the monthly CPI bulletin?',
    relatedCompetency: 'Data Quality & Validation',
    workplaceRelevance: 'Ensures accurate index representation without discarding genuine inflationary price signals.',
    options: [
      {
        id: 'cpi_opt_1',
        text: 'Instantly trim the highest 5% price quotes to prevent index volatility.',
        isOptimal: false,
        competencyDelta: -8,
        decisionImpact: 'Artificially Suppresses Real Market Inflation',
        consequence: 'CPI figures fail to reflect genuine cost-of-living increases felt by consumers in urban clusters.',
        statisticalRationale: 'Outliers driven by real economic forces must not be censored merely to make index numbers look stable.'
      },
      {
        id: 'cpi_opt_2',
        text: 'Conduct secondary price verification with supervisory price collectors and document the supply shock in the index methodology note.',
        isOptimal: true,
        competencyDelta: 15,
        decisionImpact: 'Institutional Transparency & Methodological Integrity',
        consequence: 'The spike is confirmed by mandi gate receipts; transparent documentation defends the index credibility during press briefing.',
        statisticalRationale: 'Ground truth verification distinguishes measurement errors from authentic price shocks, upholding public trust.'
      },
      {
        id: 'cpi_opt_3',
        text: 'Substitute previous month price quotes for the 3 centers.',
        isOptimal: false,
        competencyDelta: -10,
        decisionImpact: 'Carry-Forward Distortion',
        consequence: 'Introduces downward bias into headline food inflation metrics.',
        statisticalRationale: 'Last Observation Carried Forward (LOCF) is prohibited for volatile perishable commodities when actual quotes are accessible.'
      }
    ]
  }
];

export const mockAIQuizQuestions: AIQuizQuestion[] = [
  {
    id: 'qz_01',
    question: 'What is the primary statistical justification for using Stratified Sampling rather than Simple Random Sampling in socioeconomic surveys?',
    options: [
      'To reduce the total financial cost of printing survey schedules',
      'To ensure representative precision across diverse heterogeneous sub-populations and minimize sampling error',
      'To eliminate the need for calculating household multiplier weights',
      'To allow enumerators to pick the most easily accessible households'
    ],
    correctAnswerIndex: 1,
    explanation: 'Stratification partitions the heterogeneous population into homogeneous strata (e.g., rural vs urban, income quartiles), guaranteeing precision for sub-groups and reducing standard error.',
    sourceDocument: 'NSSO_Survey_Design_Manual_Rev4.pdf',
    sourcePage: 14,
    sourceSnippet: '“Stratified multi-stage sampling ensures adequate representation of rare or geographically dispersed population domains, yielding smaller sampling variance than unstratified SRS for equivalent sample sizes.”',
    status: 'approved',
    competency: 'Sampling Design & Weight Estimation',
    reviewedBy: 'Dr. Rajiv Menon (JDG)',
    reviewDate: '2026-09-02'
  },
  {
    id: 'qz_02',
    question: 'When validating household survey microdata, under which condition is Hot-Deck Imputation methodologically favored over Mean Imputation?',
    options: [
      'When you want to artificially reduce the variance of the variable to zero',
      'When preserving the realistic bimodal distribution and variability of responses from similar matching respondents is critical',
      'Only when the sample size is fewer than 10 households',
      'When all respondents in the stratum have identical income values'
    ],
    correctAnswerIndex: 1,
    explanation: 'Mean imputation suppresses sample variance and alters data distributions. Hot-deck imputation substitutes values from a randomly selected similar donor within the same conditioning cell.',
    sourceDocument: 'Handbook_on_Microdata_Quality_Standards.pdf',
    sourcePage: 38,
    sourceSnippet: '“Mean substitution causes artificial attenuation of standard errors. Hot-deck imputation from qualified donor matrices is the recommended standard for missing household expenditure components.”',
    status: 'pending',
    competency: 'Data Quality & Validation'
  },
  {
    id: 'qz_03',
    question: 'Under the Digital Personal Data Protection (DPDP) Act, which measure is mandatory before releasing anonymized survey microdata for academic research?',
    options: [
      'Publishing respondent telephone numbers in an encrypted appendix',
      'Ensuring k-anonymity and stripping direct identifiers including Aadhaar numbers, respondent names, and fine GPS coordinates',
      'Charging researchers a fee per downloaded record',
      'Limiting downloads exclusively to government officials'
    ],
    correctAnswerIndex: 1,
    explanation: 'The DPDP Act mandates that publicly disseminated datasets must not enable re-identification of living individuals through quasi-identifier linkage.',
    sourceDocument: 'Data_Sovereignty_and_DPDP_Guideline_MoSPI.pdf',
    sourcePage: 9,
    sourceSnippet: '“Section 6.4: Direct and indirect identifiers capable of triangulating individual identity (including high-resolution geo-tags and biometric references) must undergo irreversible de-identification.”',
    status: 'approved',
    competency: 'Data Privacy & Anonymization Protocols',
    reviewedBy: 'P. Sundaram (Legal & Compliance)',
    reviewDate: '2026-08-28'
  }
];

export const mockExperts: ExpertProfile[] = [
  {
    id: 'exp_1',
    name: 'Dr. Rajeshwar Sen',
    roleTitle: 'Deputy Director General',
    cadre: 'Indian Statistical Service (ISS)',
    department: 'Survey Methodology & Sample Design Division',
    specializations: ['Multi-Stage Stratified Sampling', 'Non-Response Multipliers', 'Design Effect Analysis'],
    competencyFocus: ['Sampling Design & Weight Estimation', 'Field Survey Operations & Enumeration'],
    verifiedBadge: true,
    availableSlot: 'Tomorrow at 3:30 PM (IST)',
    experienceYears: 24,
    rating: 4.96,
    consultationsDone: 142
  },
  {
    id: 'exp_2',
    name: 'Smt. Kalyani Varma',
    roleTitle: 'Director — Microdata Quality & Audit',
    cadre: 'Indian Statistical Service (ISS)',
    department: 'Data Quality & Dissemination Directorate',
    specializations: ['Microdata Imputation', 'Logical Consistency Frameworks', 'Outlier Scrutiny'],
    competencyFocus: ['Data Quality & Validation', 'Statistical Programming (R / Python)'],
    verifiedBadge: true,
    availableSlot: 'Friday at 11:00 AM (IST)',
    experienceYears: 19,
    rating: 4.92,
    consultationsDone: 98
  },
  {
    id: 'exp_3',
    name: 'Dr. Amitabh Chatterjee',
    roleTitle: 'Senior Statistical Advisor',
    cadre: 'Former Advisor, National Accounts Division',
    department: 'National Accounts & GVA Directorate',
    specializations: ['SNA 2008 Framework', 'Input-Output Deflators', 'Informal Economy Estimation'],
    competencyFocus: ['National Accounts & Gross Value Added'],
    verifiedBadge: true,
    availableSlot: 'Monday at 4:00 PM (IST)',
    experienceYears: 31,
    rating: 4.98,
    consultationsDone: 210
  }
];

export const mockDepartmentRisks: DepartmentRiskItem[] = [
  {
    id: 'dept_field_ops',
    departmentName: 'Field Operations Division (FOD)',
    division: 'Regional Sub-Offices (North & East)',
    headcount: 3200,
    avgReadiness: 68,
    riskLevel: 'HIGH',
    trend: 'declining',
    topAtRiskCompetencies: [
      { name: 'Data Quality & Validation', gap: 34, risk: 'HIGH' },
      { name: 'Field Survey Operations & Enumeration', gap: 26, risk: 'MEDIUM' },
      { name: 'Data Privacy & Anonymization Protocols', gap: 22, risk: 'MEDIUM' }
    ],
    recommendedIntervention: 'Deploy mandatory Data Quality Clinic micro-labs to all 48 district field supervisors before Q3 survey launch.'
  },
  {
    id: 'dept_sampling_design',
    departmentName: 'Survey Design & Methodology Directorate',
    division: 'Central Methodology Headquarters',
    headcount: 480,
    avgReadiness: 76,
    riskLevel: 'MEDIUM',
    trend: 'improving',
    topAtRiskCompetencies: [
      { name: 'Sampling Design & Weight Estimation', gap: 22, risk: 'HIGH' },
      { name: 'Statistical Programming (R / Python)', gap: 28, risk: 'HIGH' }
    ],
    recommendedIntervention: 'Conduct 2-week intensive R scripting bootcamp replacing manual spreadsheet weighting files.'
  },
  {
    id: 'dept_economic_stats',
    departmentName: 'Economic Statistics Division',
    division: 'Industrial & Price Indices',
    headcount: 920,
    avgReadiness: 71,
    riskLevel: 'HIGH',
    trend: 'stable',
    topAtRiskCompetencies: [
      { name: 'National Accounts & Gross Value Added', gap: 31, risk: 'HIGH' },
      { name: 'Data Quality & Validation', gap: 24, risk: 'MEDIUM' }
    ],
    recommendedIntervention: 'Enroll junior analysts in National Accounts SNA 2008 Simulation Lab to reduce revision variance.'
  },
  {
    id: 'dept_social_stats',
    departmentName: 'Social Statistics Division',
    division: 'Health & Education Indices',
    headcount: 650,
    avgReadiness: 84,
    riskLevel: 'LOW',
    trend: 'improving',
    topAtRiskCompetencies: [
      { name: 'Statistical Data Visualization', gap: 12, risk: 'LOW' }
    ],
    recommendedIntervention: 'Routine micro-learning refreshes on color-safe infographic dissemination.'
  }
];

export const mockAssessments: AssessmentItem[] = [
  {
    id: 'ass_knowledge_dq',
    title: 'Diagnostic Knowledge Assessment: Data Quality Principles',
    type: 'Knowledge',
    duration: '25 mins',
    questionsCount: 15,
    competencyName: 'Data Quality & Validation',
    contributionPercentage: 30,
    userScore: 58,
    status: 'passed',
    lastAttempt: '2 days ago'
  },
  {
    id: 'ass_scenario_sampling',
    title: 'Scenario Assessment: Complex Cluster Non-Response Handling',
    type: 'Scenario',
    duration: '35 mins',
    questionsCount: 8,
    competencyName: 'Sampling Design & Weight Estimation',
    contributionPercentage: 35,
    userScore: 62,
    status: 'needs_practice',
    lastAttempt: '1 week ago'
  },
  {
    id: 'ass_practical_proof',
    title: 'Practical Assessment: Clean & Certify Corrupted District Microdata',
    type: 'Practical',
    duration: '45 mins',
    questionsCount: 4,
    competencyName: 'Data Quality & Validation',
    contributionPercentage: 35,
    userScore: 78,
    status: 'passed',
    lastAttempt: 'Yesterday'
  }
];

export const mockProofChallenges: ProofChallenge[] = [
  {
    id: 'proof_dq_round',
    title: 'District Microdata Cleaning & Quality Audit Certification',
    competency: 'Data Quality & Validation',
    context: 'You are provided with a 50-row extract from the upcoming Agricultural Wages Survey exhibiting deliberate data entry anomalies (impossible ages, negative wage rates, duplicate IDs).',
    instructions: [
      'Identify and isolate all 3 Critical Severity issues',
      'Apply correct imputation logic for missing economic activity codes',
      'Re-validate the dataset to achieve a certified Quality Score of ≥ 95/100',
      'Submit the audit signature log for institutional verification'
    ],
    deliverableType: 'Cleaned Dataset',
    timeEstimate: '30 mins',
    evaluatedMetrics: [
      { name: 'Outlier Detection Accuracy', weight: 35 },
      { name: 'Imputation Protocol Adherence', weight: 35 },
      { name: 'Preservation of True Sample Distribution', weight: 30 }
    ],
    passedScoreThreshold: 80,
    currentStatus: 'available',
    readinessScoreAwarded: 18
  }
];
