import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { askAIAssistant, CopilotResponse } from '../../services/aiService';
import {
  Sparkles,
  X,
  Send,
  BookOpen,
  Maximize2,
  Minimize2,
  Trash2,
  Copy,
  Check,
  Compass,
  FileCheck,
  ShieldCheck,
  Terminal,
  HelpCircle,
  ChevronRight,
  ExternalLink,
  Cpu,
  BadgeAlert
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  references?: string[];
  suggestedFollowUps?: string[];
  provider?: string;
  timestamp: string;
}

export const ContextualAIAssistant: React.FC = () => {
  const { showAIAssistant, setShowAIAssistant, currentView, currentUser } = useApp();
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMode, setActiveMode] = useState<'protocol' | 'gap-advisor' | 'dpdp-auditor' | 'microdata-qa'>('protocol');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `### KshamataAI Competency & Statistical Reasoning Copilot
*Grounded in National Statistical System Competency Framework (NSSCF v3.2)*

Welcome, **${currentUser.name}** (${currentUser.roleType === 'admin' ? 'Joint Director General' : 'Statistical Officer'}). 

I can assist you with:
- **CAPI & Field Scrutiny Protocols**: Explaining fatal logical errors, impossible biological values (e.g. age 187), and skip patterns.
- **Sampling & Weight Calibration**: Formulating multi-stage stratified weights, non-response multipliers, and post-stratification.
- **Microdata Imputation**: Explaining why hot-deck preserves economic distributions over simplistic mean substitution.
- **DPDP Act 2023 & Privacy**: Auditing questionnaires and microdata for $k$-anonymity and PII protection.
- **Competency Gap Remediation**: Explaining your workplace readiness score delta and recommended training modules.`,
      references: [
        'National Statistical System Competency Framework (NSSCF v3.2)',
        'MoSPI Guidelines on Microdata Quality Standards (2024)',
        'Digital Personal Data Protection (DPDP) Act, 2023'
      ],
      suggestedFollowUps: [
        'Why is age 187 considered a fatal error in CAPI surveys?',
        'Explain the multi-stage stratified sampling weight formula',
        'How does DPDP Act 2023 affect microdata releases?'
      ],
      provider: 'NSSCF Knowledge Core',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showAIAssistant) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, showAIAssistant, isTyping]);

  if (!showAIAssistant) return null;

  const modePresets: Record<string, { label: string; icon: any; placeholder: string; prompts: string[] }> = {
    protocol: {
      label: 'Statistical Protocols',
      icon: FileCheck,
      placeholder: 'Ask about CAPI validation, impossible bounds, skip logic...',
      prompts: [
        'Why is age 187 a fatal error in CAPI data?',
        'What is the approved imputation for missing household consumption?',
        'Explain the CPI price relative tolerance rule (0.80 - 1.25)'
      ]
    },
    'gap-advisor': {
      label: 'Cadre Gap Remediation',
      icon: Compass,
      placeholder: 'Ask about your competency gap, required courses, readiness...',
      prompts: [
        'Why is Data Quality & Validation my #1 priority gap (54% vs 85%)?',
        'Which training module bridges my gap fastest for quarterly release?',
        'What proof is required for my Digital Competency Passport?'
      ]
    },
    'dpdp-auditor': {
      label: 'DPDP & Privacy Compliance',
      icon: ShieldCheck,
      placeholder: 'Ask about microdata anonymization, k-anonymity, DPDP penalties...',
      prompts: [
        'What are the mandatory de-identification steps under DPDP Act 2023?',
        'Explain k-anonymity (k >= 5) on rural survey microdata',
        'What are the statutory penalties under Section 33 of DPDP?'
      ]
    },
    'microdata-qa': {
      label: 'Sampling & Math Logic',
      icon: Terminal,
      placeholder: 'Ask about weight formulas, multiplier derivation, R/Python QA...',
      prompts: [
        'Explain the multi-stage stratified sampling weight formula',
        'How do non-response multipliers adjust cluster weights?',
        'What is the difference between UPSS and CWS in PLFS?'
      ]
    }
  };

  const currentPreset = modePresets[activeMode];

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || query).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsTyping(true);

    try {
      const response: CopilotResponse = await askAIAssistant(
        text,
        currentView,
        currentUser.roleType,
        activeMode,
        messages.map(m => ({ sender: m.sender, text: m.text }))
      );

      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: response.answer,
        references: response.references,
        suggestedFollowUps: response.suggestedFollowUps,
        provider: response.provider || 'gemini-3.8-flash',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: 'err-' + Date.now(),
        sender: 'ai',
        text: 'An unexpected error occurred while communicating with the statistical intelligence engine. Please try asking again.',
        references: ['MoSPI Statistical Systems Helpdesk: 1800-11-MOSPI'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'init-restarted',
        sender: 'ai',
        text: `Conversation cleared. Ready for your statistical and competency queries under **${currentPreset.label}** mode.`,
        references: ['National Statistical System Competency Framework (NSSCF v3.2)'],
        suggestedFollowUps: currentPreset.prompts,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Helper to render markdown text cleanly
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-2 text-xs text-slate-800 leading-relaxed font-normal">
        {lines.map((line, idx) => {
          if (line.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-extrabold text-sm text-[#0B1F3A] pt-2 pb-1 border-b border-slate-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                <span>{line.replace('### ', '')}</span>
              </h4>
            );
          }
          if (line.startsWith('## ')) {
            return (
              <h3 key={idx} className="font-black text-sm text-[#0B1F3A] pt-3 pb-1 border-b border-slate-200">
                {line.replace('## ', '')}
              </h3>
            );
          }
          if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
            return (
              <div key={idx} className="font-semibold text-slate-900 mt-2 flex items-start gap-1.5">
                <span className="text-[#0B1F3A] font-extrabold">{line.slice(0, 3)}</span>
                <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line.slice(3)) }} />
              </div>
            );
          }
          if (line.trim().startsWith('- ')) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-3 text-slate-700">
                <span className="text-teal-600 font-bold">•</span>
                <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line.trim().slice(2)) }} />
              </div>
            );
          }
          if (line.trim().startsWith('$$') && line.trim().endsWith('$$')) {
            return (
              <div key={idx} className="my-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0F172A] font-mono text-[11px] text-center overflow-x-auto shadow-2xs font-semibold">
                {line.replaceAll('$$', '')}
              </div>
            );
          }
          if (line.trim() === '') {
            return <div key={idx} className="h-1" />;
          }
          return (
            <p key={idx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }} />
          );
        })}
      </div>
    );
  };

  const formatInlineMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-slate-600 italic">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-[#0B1F3A] font-mono text-[11px] font-semibold border border-slate-200">$1</code>')
      .replace(/\$([^\$]+)\$/g, '<span class="font-mono text-[#0B1F3A] font-semibold">$1</span>');
  };

  return (
    <div
      className={`fixed bottom-3 right-3 left-3 sm:left-auto sm:right-6 sm:bottom-6 z-50 bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in ${
        isExpanded ? 'sm:w-[740px] max-w-full h-[85vh] sm:h-[720px]' : 'sm:w-[480px] max-w-full h-[80vh] sm:h-[620px]'
      }`}
    >
      {/* Institutional Top Header */}
      <div className="bg-[#0B1F3A] p-3.5 text-white flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center border border-white/20 shadow-inner">
            <Sparkles className="w-5 h-5 text-teal-300 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-black flex items-center gap-2 tracking-wide text-white">
              <span>KSHAMATA STATISTICAL COPILOT</span>
              <span className="text-[9px] px-2 py-0.5 bg-teal-500/20 text-teal-300 border border-teal-400/40 rounded-full font-extrabold uppercase">
                v3.2 Active
              </span>
            </div>
            <p className="text-[10px] text-slate-300 font-medium flex items-center gap-1.5 mt-0.5">
              <span>MoSPI Knowledge Base</span>
              <span>•</span>
              <span>NSSCF Certified Reasoning</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
            title={isExpanded ? 'Standard view' : 'Wide analytical view'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={handleClear}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
            title="Reset conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowAIAssistant(false)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition ml-1"
            title="Close Copilot"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Advisory Mode Selector (4 Options requested) */}
      <div className="grid grid-cols-4 bg-slate-100/90 p-1.5 border-b border-slate-200 gap-1 text-[11px] font-bold shrink-0">
        {(Object.keys(modePresets) as Array<keyof typeof modePresets>).map(modeKey => {
          const modeItem = modePresets[modeKey];
          const Icon = modeItem.icon;
          const isActive = activeMode === modeKey;
          return (
            <button
              key={modeKey}
              onClick={() => setActiveMode(modeKey)}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl transition text-center ${
                isActive
                  ? 'bg-white text-[#0B1F3A] shadow-xs border border-slate-300 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
              <span className="truncate">{modeItem.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC]">
        {messages.map(m => (
          <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div
              className={`max-w-[92%] rounded-2xl p-4 text-xs leading-relaxed transition-all shadow-xs ${
                m.sender === 'user'
                  ? 'bg-[#0B1F3A] text-white rounded-br-xs font-semibold'
                  : 'bg-white border border-slate-200/90 text-slate-800 rounded-bl-xs'
              }`}
            >
              {/* Header inside AI message */}
              {m.sender === 'ai' && (
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5 font-bold text-[#0B1F3A]">
                    <Cpu className="w-3.5 h-3.5 text-teal-600" />
                    <span>{m.provider || 'Gemini 3.8 Flash Statistical System'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{m.timestamp}</span>
                    <button
                      onClick={() => handleCopy(m.id, m.text)}
                      className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
                      title="Copy response"
                    >
                      {copiedId === m.id ? (
                        <Check className="w-3 h-3 text-teal-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Message Content */}
              {m.sender === 'user' ? <p>{m.text}</p> : renderFormattedContent(m.text)}

              {/* Official References */}
              {m.references && m.references.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 text-[10px] text-slate-500 space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="font-extrabold text-[#0B1F3A] flex items-center gap-1.5 uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5 text-[#0B1F3A]" />
                    <span>Authoritative Citations & MoSPI References:</span>
                  </div>
                  {m.references.map((ref, rIdx) => (
                    <div key={rIdx} className="text-slate-600 pl-4 flex items-center gap-1">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>{ref}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Suggested Follow-Ups */}
              {m.suggestedFollowUps && m.suggestedFollowUps.length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Recommended Follow-up Scrutiny:
                  </p>
                  <div className="flex flex-col gap-1">
                    {m.suggestedFollowUps.map((fu, fIdx) => (
                      <button
                        key={fIdx}
                        onClick={() => handleSend(fu)}
                        className="text-left text-[11px] text-[#0B1F3A] hover:text-teal-900 hover:bg-teal-50/50 p-1.5 rounded-lg border border-slate-200 font-semibold flex items-center justify-between group transition"
                      >
                        <span className="truncate">{fu}</span>
                        <ChevronRight className="w-3 h-3 text-teal-600 shrink-0 group-hover:translate-x-0.5 transition" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-slate-200/80 w-64 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce"></span>
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.4s]"></span>
            <span className="text-[11px] text-slate-500 font-semibold">Consulting MoSPI statistical standards...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Contextual Quick Inquiries for Active Mode */}
      <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-[#0B1F3A]" />
            <span>Preset Scrutiny Inquiries ({currentPreset.label}):</span>
          </div>
          <span className="text-[10px] text-[#0B1F3A] font-semibold">Click to execute</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {currentPreset.prompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-[11px] text-left px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-800 rounded-lg border border-slate-200 hover:border-slate-300 transition truncate max-w-full font-medium shadow-2xs active:scale-98"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-3 bg-white border-t border-slate-200 shrink-0 flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder={currentPreset.placeholder}
          className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 focus:bg-white transition text-slate-900 placeholder:text-slate-400 font-medium"
        />
        <button
          onClick={() => handleSend()}
          disabled={!query.trim() || isTyping}
          className="p-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#123B63] disabled:opacity-40 text-white transition shrink-0 shadow-sm active:scale-95 flex items-center gap-1"
          title="Send query"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Institutional Disclaimer */}
      <div className="px-3 py-1 bg-slate-100 text-[9px] text-slate-500 flex flex-wrap items-center justify-between gap-1 border-t border-slate-200/50">
        <span>MoSPI / NSSCF v3.2 AI Reasoning Framework</span>
        <span>All queries logged under DPDP Act 2023</span>
      </div>
    </div>
  );
};
