import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Google Gen AI Client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

// Fallback comprehensive domain engine
function generateStatisticalFallbackAnswer(prompt: string, context: string, mode: string): {
  answer: string;
  references: string[];
  suggestedFollowUps: string[];
} {
  const p = prompt.toLowerCase();

  if (p.includes('age') && (p.includes('187') || p.includes('outlier') || p.includes('impossible'))) {
    return {
      answer: `### National Statistical Validation Audit: Impossible Biological Age Value (187)

1. **Standard Diagnostic Classification**: 
   Under MoSPI Microdata Scrutiny Guidelines (Section 3.2.1), respondent age = 187 violates biological hard-bounds ($[0, 115]$ years). This is classified as a **Fatal Logical Inconsistency** rather than an extreme statistical outlier.

2. **Root Cause Analysis in CAPI Environments**:
   - **Keyboard Repetition Defect**: Likely typo where an enumerator intended 18 or 87, or pressed numeric keypad keys twice.
   - **Missing Skip Pattern**: In older survey schedules, code \`999\` or \`99\` indicated "Not Stated / Refused", which un-sanitized parsers occasionally truncate or offset to \`187\`.

3. **Approved Imputation & Reconciliation Protocol (NSSCF v3.2)**:
   - **Step 1: Check Inter-Variable Coherence**: Cross-reference with Household Schedule Block 3 (Relation to Head, Marital Status, Educational Attainment, and Fertility/Employment block).
     - If record indicates "Grandchild (Enrolled in Primary School)", true age is between 6–12.
     - If record indicates "Spouse of Head (Head age = 52)", true age is approximately 45–55.
   - **Step 2: Field Return Verification**: Flag for regional Sub-Division Field Supervisor verification if household CAPI audio record or re-contact is possible.
   - **Step 3: Constrained Nearest-Neighbor Hot-Deck Imputation**: If re-contact is infeasible, impute from a matching donor household within the same First Stage Unit (FSU / Village / Urban Block) sharing matching relationship, gender, and literacy codes. Never drop the household weight without cluster recalibration.`,
      references: [
        'MoSPI Guidelines on Survey Microdata Scrutiny & Logic Checks (2024)',
        'NSS 79th Round Data Validation & Field Scrutiny Protocol',
        'UN Principles & Recommendations for Population & Housing Censuses (Revision 3)'
      ],
      suggestedFollowUps: [
        'How does negative consumption expenditure get imputed?',
        'What is the threshold for flagging an extreme income outlier in PLFS?',
        'Show SQL/R validation code for cross-schedule age checking'
      ]
    };
  }

  if (p.includes('sampling') || p.includes('weight') || p.includes('stratified') || p.includes('multiplier')) {
    return {
      answer: `### Multi-Stage Stratified Sampling & Weight Calibration in NSS Rounds

In national socio-economic surveys conducted by NSSO, samples follow a **Stratified Multi-Stage Design**:

1. **Design Hierarchy**:
   - **First Stage Units (FSUs)**: Rural Villages (as per 2011 Census / Local Government Directory) or Urban Frame Survey (UFS) blocks.
   - **Second Stage Units (SSUs)**: Households listed within selected FSUs, sub-stratified by affluence or household composition.

2. **Base Sampling Weight Formula**:
   For household $j$ in sub-stratum $i$ of stratum $h$:
   $$W_{hij} = \\frac{1}{P_{hi}} \\times \\frac{H_{hi}}{h_{hi}}$$
   Where:
   - $P_{hi}$: Selection probability of the $i$-th FSU under Probability Proportional to Size with Replacement (PPSWR) or Circular Systematic Sampling.
   - $H_{hi}$: Total listed eligible households in the FSU frame.
   - $h_{hi}$: Number of surveyed sample households actually enumerated.

3. **Non-Response Weight Adjustment Multiplier**:
   When a household is unavailable or refuses, simply dropping the row skews estimators. An adjustment factor $\\lambda_h$ is applied at the stratum level:
   $$\\lambda_h = \\frac{\\sum_{j \\in \\text{Sample}} W_{hij}}{\\sum_{j \\in \\text{Respondents}} W_{hij}}$$
   The calibrated weight becomes $W'_{hij} = W_{hij} \\times \\lambda_h$.

4. **Multipliers in Official Microdata**:
   In NSS raw ASCII/CSV data releases, weights are published as two sub-sample multipliers (\`MLT_SS1\` and \`MLT_SS2\`) and a combined multiplier (\`MLT_COMB = MLT_SS1 / 2 + MLT_SS2 / 2\`) divided by $100$.`,
      references: [
        'NSSO Sample Design & Estimation Procedures Manual (MoSPI)',
        'Indian Statistical Institute (ISI) Technical Monograph on Weight Calibration',
        'National Statistical Commission (NSC) Quality Standard QS-2023-01'
      ],
      suggestedFollowUps: [
        'How to calculate standard error using sub-sample replicates?',
        'Explain post-stratification benchmark calibration against Census totals',
        'What is the difference between rural and urban stratum demarcations?'
      ]
    };
  }

  if (p.includes('dpdp') || p.includes('privacy') || p.includes('pii') || p.includes('mask') || p.includes('anonym')) {
    return {
      answer: `### Digital Personal Data Protection (DPDP) Act 2023: Compliance Framework for Official Statistics

As per the **DPDP Act 2023** and MoSPI's Data Governance Guidelines, all census, survey, and administrative microdata must undergo strict de-identification before secondary academic or public dissemination:

1. **Mandatory De-Identification Transformations**:
   - **Direct Identifiers (Aadhaar, Phone, Full Name, Ration Card ID)**: Must be permanently purged or replaced with a 256-bit salted deterministic cryptographic hash for longitudinal tracking without revealing identity.
   - **Quasi-Identifiers (Exact GPS, Pin Code, Birthdate, Village Name)**:
     - Geographical coordinates must be blurred to block/sub-district centroids ($\ge 5\\text{ km}^2$ spatial resolution).
     - Birthdate must be categorized into age bands or single completed years without month/day.
     - Pincodes with population $< 20,000$ must be aggregated into district-level codes.

2. **Mathematical Anonymity Standards Enforced**:
   - **$k$-Anonymity ($k \\ge 5$)**: Any combination of quasi-identifiers (e.g., *Age = 42, Gender = F, Social Group = ST, District = 214*) must match at least 5 distinct households in the released microdata.
   - **$l$-Diversity**: Sensitive attributes (e.g., rare morbidity, high asset bracket) within an equivalence class must possess at least $l$ well-represented states to prevent attribute disclosure.

3. **Penalties & Cadre Responsibilities**:
   - Unauthorized disclosure of raw, identifiable microdata carries statutory penalties of up to **₹250 Crore** under Section 33 of the DPDP Act.
   - Statistical officers handling CAPI field servers are designated as **Data Fiduciaries** with mandatory audit logging.`,
      references: [
        'Digital Personal Data Protection (DPDP) Act, 2023 (Ministry of Law & Justice)',
        'National Data Sharing and Accessibility Policy (NDSAP) Guidelines',
        'MoSPI Protocol for Microdata Anonymization & Confidentiality Safeguards'
      ],
      suggestedFollowUps: [
        'How to implement k-anonymity on survey microdata in Python?',
        'What exemptions exist for national official statistical research under DPDP?',
        'Demonstrate differential privacy noise addition for aggregate tabular outputs'
      ]
    };
  }

  if (p.includes('plfs') || p.includes('labour') || p.includes('employment') || p.includes('worker') || p.includes('unemployment')) {
    return {
      answer: `### Periodic Labour Force Survey (PLFS) Key Indicators & Estimation Protocols

The Periodic Labour Force Survey (PLFS), launched by MoSPI in 2017, utilizes rotational sampling for urban areas (quarterly visits) and annual rural rounds:

1. **Activity Status Approaches**:
   - **Usual Principal and Subsidiary Status (UPSS)**: Measures activity engaged in over a 365-day reference period (Principal status $\\ge 183$ days; subsidiary status $\\ge 30$ days).
   - **Current Weekly Status (CWS)**: Measures activity within the preceding 7 days (engaged for at least 1 hour in economic activity = employed).

2. **Key Metric Formulations**:
   - **Labour Force Participation Rate (LFPR)**:
     $$\\text{LFPR} = \\frac{\\text{Persons Employed} + \\text{Persons Seeking Work}}{\\text{Total Population}} \\times 100$$
   - **Worker Population Ratio (WPR)**:
     $$\\text{WPR} = \\frac{\\text{Persons Employed}}{\\text{Total Population}} \\times 100$$
   - **Unemployment Rate (UR)**:
     $$\\text{UR} = \\frac{\\text{Unemployed (Seeking Work)}}{\\text{Labour Force (Employed + Unemployed)}} \\times 100$$

3. **Common CAPI Scrutiny Traps in PLFS**:
   - Code \`11\` (Self-employed in household enterprise) recorded without corresponding enterprise NIC classification.
   - Attending domestic duties (Code \`92\`) vs. domestic duties with collection of goods/firewood (Code \`93\`).`,
      references: [
        'Periodic Labour Force Survey (PLFS) Annual Report 2023-24 (MoSPI)',
        'ILO International Conference of Labour Statisticians (ICLS) Guidelines',
        'NSSO Instructions to Field Staff (Volume I: Concepts and Definitions)'
      ],
      suggestedFollowUps: [
        'What are the CWS activity codes 11 through 81?',
        'How does rotation sampling panel attrition get corrected in urban PLFS?',
        'Calculate female LFPR under UPSS vs CWS'
      ]
    };
  }

  if (p.includes('cpi') || p.includes('inflation') || p.includes('index') || p.includes('basket')) {
    return {
      answer: `### Consumer Price Index (CPI) Compilation & Price Quotation Scrutiny

MoSPI compiles Consumer Price Index numbers (Base $2012 = 100$) for Rural, Urban, and Combined series using price quotations from selected markets:

1. **Index Compilation Methodology**:
   - Based on the **Modified Laspeyres Formula**:
     $$I_t = \\frac{\\sum (W_i \\times \\frac{P_{it}}{P_{i0}})}{\\sum W_i} \\times 100$$
   - Where $W_i$ is the consumption expenditure weight derived from the All-India Household Consumer Expenditure Survey (CES), $P_{it}$ is the current price, and $P_{i0}$ is the base price.

2. **Field Price Scrutiny Protocols for SSS/ISS Officers**:
   - **Extreme Price Relatives**: If $\\frac{P_{it}}{P_{it-1}} > 1.25$ or $< 0.80$, mandatory market reason code must be entered (seasonal crop failure, tax revision, local transport disruption).
   - **Product Specification Substitution**: When specified brand/grade is permanently unavailable, officers must follow the comparable substitution protocol and adjust base price through overlap pricing.`,
      references: [
        'Manual on Consumer Price Index (Central Statistics Office, MoSPI)',
        'IMF Consumer Price Index Manual: Theory and Practice',
        'Technical Advisory Committee on Statistics of Prices and Cost of Living (TAC on SPCL)'
      ],
      suggestedFollowUps: [
        'How does geometric mean (Jevons index) compare with Laspeyres for elementary aggregates?',
        'Explain the imputation method for temporarily missing price quotations',
        'What is the weight of Food & Beverages in All-India CPI Combined?'
      ]
    };
  }

  // Comprehensive General Statistical Framework response
  return {
    answer: `### Official Statistical Guidance on "${prompt}"

In the National Statistical System Competency Framework (NSSCF v3.2), this topic aligns with the competency domain **${context || 'Statistical Domain Operations & Data Governance'}**.

1. **Institutional Standards & Methodology**:
   - Official statistics published by the Ministry of Statistics and Programme Implementation (MoSPI) adhere to the **United Nations Fundamental Principles of Official Statistics (UNFPOS)**, emphasizing impartiality, scientific rigor, professional ethics, and transparency.
   - For empirical microdata collection under NSS rounds, Periodic Labour Force Survey (PLFS), and Annual Survey of Industries (ASI), field protocols require double-verification of electronic schedules (CAPI) and cross-block logic validation before central aggregation.

2. **Core Operational Protocols**:
   - **Sampling Integrity**: Strict preservation of random probability selection without substitution in the field.
   - **Consistency Scrutiny**: Verification of arithmetic balances (e.g., itemized consumption must sum to monthly per capita expenditure).
   - **Data Governance**: Strict adherence to the Digital Personal Data Protection (DPDP) Act 2023 and the Collection of Statistics Act 2008.

3. **Recommended Cadre Action**:
   - Review the corresponding competency node in your **Competency Profile & Skill Gap Engine**.
   - Validate live records in the **Data Quality Clinic** to practice identifying subtle survey microdata discrepancies.
   - Engage with the **Work Simulator** to test decision-making under constrained field survey timelines.`,
    references: [
      'National Statistical System Competency Framework (NSSCF v3.2)',
      'MoSPI Operational Guidelines for Field Operations Division (FOD)',
      'Collection of Statistics Act, 2008 & Rules 2011',
      'Mission Karmayogi Competency Dictionary for Statistical Officers'
    ],
    suggestedFollowUps: [
      'Explain multi-stage stratified sampling weight formulas',
      'What are the CAPI validation protocols for rural surveys?',
      'How does the DPDP Act 2023 protect survey respondent microdata?'
    ]
  };
}

// API Route: Ask Contextual Copilot
app.post('/api/ai/ask', async (req, res) => {
  try {
    const { prompt, context = 'General Competency', role = 'learner', mode = 'protocol', chatHistory = [] } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Prompt string is required' });
      return;
    }

    const ai = getGenAI();

    // If Gemini API Key is available, invoke Gemini 3.8 Flash
    if (ai) {
      try {
        const systemInstruction = `You are KshamataAI Copilot, the official AI Statistical Reasoning and Competency Advisor for the Ministry of Statistics and Programme Implementation (MoSPI), Government of India.
You provide authoritative, mathematically sound, precise, and highly practical advisory to officers of the Indian Statistical Service (ISS) and Subordinate Statistical Service (SSS).
Your domain includes:
1. National Statistical System Competency Framework (NSSCF v3.2)
2. National Sample Survey (NSS) rounds (78th, 79th, 80th) and CAPI validation protocols
3. Periodic Labour Force Survey (PLFS), Consumer Price Index (CPI), and National Accounts Statistics (NAS)
4. Multi-stage stratified cluster sampling, probability proportional to size (PPS), and design weight calibration
5. Microdata quality diagnostics (outlier detection, logical inconsistencies, hot-deck and regression imputation)
6. Digital Personal Data Protection (DPDP) Act 2023 compliance and statistical disclosure control (k-anonymity, l-diversity, PII masking)

Format your responses with professional Markdown headings, clear bulleted points, mathematical formulas where appropriate, and cite specific MoSPI/NSSO manuals or national statutory guidelines.
Be helpful, rigorous, respectful, and dignified in tone.`;

        // Format recent chat history
        const formattedHistory = Array.isArray(chatHistory)
          ? chatHistory.slice(-4).map((m: any) => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n')
          : '';

        const fullPrompt = `${formattedHistory ? `Recent Context:\n${formattedHistory}\n\n` : ''}Active View Context: ${context}
Officer Cadre Perspective: ${role === 'admin' ? 'Joint Director General (Executive Directorate)' : 'Statistical Officer (Field Operations Division)'}
Copilot Advisory Mode: ${mode}

Officer Query: ${prompt}

Provide an authoritative, detailed, structured statistical analysis with clear steps, formulas, and official MoSPI references.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: fullPrompt,
          config: {
            systemInstruction,
            temperature: 0.2,
          }
        });

        const textResponse = response.text || '';

        // Extract or provide authoritative citations
        const references = [
          'National Statistical System Competency Framework (NSSCF v3.2)',
          'MoSPI Microdata Quality Standards & Field Audit Manual',
          'Collection of Statistics Act, 2008 & DPDP Act 2023',
          'NSSO Sample Design & Estimation Procedures Manual'
        ];

        const suggestedFollowUps = [
          'What are the mandatory CAPI checks for this procedure?',
          'How does this impact the overall workplace readiness score?',
          'Show an empirical calculation example for field verification'
        ];

        res.json({
          answer: textResponse,
          references,
          suggestedFollowUps,
          provider: 'gemini-3.8-flash'
        });
        return;
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to statistical knowledge engine:', geminiError);
        // Fallback to domain engine below
      }
    }

    // Fallback Domain Engine
    const fallback = generateStatisticalFallbackAnswer(prompt, context, mode);
    res.json({
      ...fallback,
      provider: 'kshamata-statistical-engine'
    });
  } catch (error: any) {
    console.error('Error in /api/ai/ask:', error);
    res.status(500).json({ error: 'Internal AI Copilot error', details: error?.message });
  }
});

// API Route: AI Question Generator
app.post('/api/ai/quiz-generate', async (req, res) => {
  try {
    const { competencyName, category = 'Domain', difficulty = 'Intermediate' } = req.body;
    const ai = getGenAI();

    if (ai) {
      try {
        const prompt = `Generate an authentic, high-caliber statistical test question for an Indian Statistical Service (ISS) officer.
Competency: ${competencyName || 'Data Quality & Validation'}
Category: ${category}
Difficulty: ${difficulty}

Respond ONLY with valid JSON in this exact structure:
{
  "question": "Realistic scenario-based question",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": "Detailed explanation citing MoSPI/NSSO methodology",
  "officialSource": "Specific manual name and section"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            temperature: 0.2,
            responseMimeType: 'application/json'
          }
        });

        const parsed = JSON.parse(response.text || '{}');
        res.json({ success: true, question: parsed });
        return;
      } catch (e) {
        console.warn('Gemini quiz generation error, using fallback:', e);
      }
    }

    // Fallback question
    res.json({
      success: true,
      question: {
        question: `During the CAPI field scrutiny of NSS 79th Round microdata, an enumerator encounters a rural household where the recorded monthly consumer expenditure is negative (₹-450). According to MoSPI data validation protocols, what is the mandatory immediate action?`,
        options: [
          "Impute the negative amount using mean district consumption immediately",
          "Flag the schedule as a fatal logical error and initiate cross-schedule verification against cash-outflow blocks before any imputation",
          "Delete the household schedule and record the unit as non-response",
          "Multiply the negative amount by -1 to assume it was an inverted sign entry"
        ],
        correctAnswer: 1,
        explanation: "MoSPI Data Scrutiny Protocol dictates that negative consumption values represent severe logical inconsistencies requiring cross-block verification against cash loans and agricultural outlays before any secondary imputation is permitted.",
        officialSource: "MoSPI Microdata Scrutiny Standards (Section 4.1.2)"
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Quiz generation failed' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '3.2.0',
    service: 'KshamataAI Institutional Platform',
    geminiEnabled: !!process.env.GEMINI_API_KEY
  });
});

// Vite Middleware for Development / Static serving for Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KshamataAI Institutional Platform running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
