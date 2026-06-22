/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Send, MessageSquare, Check, Trash2, ShieldCheck, Copy, HelpCircle, BookOpen, ExternalLink } from 'lucide-react';
import { translations } from '../localization';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  institution: string;
  message: string;
  timestamp: string;
  status: 'unread' | 'replied' | 'archived';
}

interface ContactFormProps {
  isPersian?: boolean;
  isDarkMode?: boolean;
}

export default function ContactForm({ isPersian = false, isDarkMode = true }: ContactFormProps) {
  const t = translations[isPersian ? 'fa' : 'en'];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Research Collaboration');
  const [institution, setInstitution] = useState('');
  const [message, setMessage] = useState('');
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const [selectedNeuronId, setSelectedNeuronId] = useState<string | null>(null);
  
  // Local state for inbox simulation
  const [inbox, setInbox] = useState<ContactMessage[]>([]);
  const [showDemoInbox, setShowDemoInbox] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);

  // Load inbox messages from localStorage on mount
  useEffect(() => {
    const savedMsg = localStorage.getItem('dr_amini_inbox_messages');
    if (savedMsg) {
      try {
        setInbox(JSON.parse(savedMsg));
      } catch (e) {
        setInbox([]);
      }
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('amini_m@icss.ac.ir');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleNeuronClick = (id: string, isValid: boolean) => {
    setSelectedNeuronId(id);
    if (isValid) {
      setCaptchaPassed(true);
    } else {
      setCaptchaPassed(false);
      if (isPersian) {
        alert('عدم تطابق شناختی: این یک شیار عصبی غیرفعال است! لطفاً بر روی سیناپس فعال با تپش طلایی زرد رنگ کلیک کنید.');
      } else {
        alert('Cognitive mismatch: That is a dormant synapse node! Please tap the high-amplitude pulsating gold synapse.');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      if (isPersian) {
        alert('برخی فیلدهای ضروری خالی هستند: لطفاً نام، ایمیل و متن پیام را پر نمایید.');
      } else {
        alert('Required elements missing: Please occupy the Name, Email and Message forms.');
      }
      return;
    }
    if (!captchaPassed) {
      if (isPersian) {
        alert('بخش تایید امنیتی: لطفاً ابتدا معمای سیناپسی شناختی را حل کنید.');
      } else {
        alert('Security Check block: Please complete the cognitive synapse verification first.');
      }
      return;
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject,
      institution: institution || (isPersian ? 'پژوهشگر مستقل' : 'Independent Researcher'),
      message,
      timestamp: new Date().toLocaleString(isPersian ? 'fa-IR' : 'en-US'),
      status: 'unread'
    };

    const updatedInbox = [newMessage, ...inbox];
    setInbox(updatedInbox);
    localStorage.setItem('dr_amini_inbox_messages', JSON.stringify(updatedInbox));

    // Clear form
    setName('');
    setEmail('');
    setInstitution('');
    setMessage('');
    setCaptchaPassed(false);
    setSelectedNeuronId(null);
    setSuccessAnimation(true);
    setTimeout(() => setSuccessAnimation(false), 5000);
  };

  const updateStatus = (id: string, newStatus: 'unread' | 'replied' | 'archived') => {
    const updated = inbox.map(msg => msg.id === id ? { ...msg, status: newStatus } : msg);
    setInbox(updated);
    localStorage.setItem('dr_amini_inbox_messages', JSON.stringify(updated));
  };

  const deleteMessage = (id: string) => {
    const confirmMsg = isPersian 
      ? 'آیا از حذف این پیام از صندوق شبیه‌ساز محلی اطمینان دارید؟' 
      : 'Delete message from local demonstration registry?';
    if (window.confirm(confirmMsg)) {
      const updated = inbox.filter(msg => msg.id !== id);
      setInbox(updated);
      localStorage.setItem('dr_amini_inbox_messages', JSON.stringify(updated));
    }
  };

  // Theme variables mapping
  const cardBg = isDarkMode ? "bg-[#090a0d] border-[#191b22]" : "bg-white border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]";
  const boxBg = isDarkMode ? "bg-[#0e0f14] border-[#191b22]" : "bg-slate-50 border-slate-200/80";
  const subBoxBg = isDarkMode ? "bg-slate-900/30 border-slate-900" : "bg-slate-50 border-slate-100";
  const textTitle = isDarkMode ? "text-slate-100" : "text-slate-800";
  const textMuted = isDarkMode ? "text-slate-400" : "text-slate-500";
  const textLabel = isDarkMode ? "text-[#8e9096]" : "text-slate-500";
  const inputBg = isDarkMode ? "bg-[#0e0f14] border-[#191b22] text-slate-100 focus:border-[#20c997] placeholder:text-slate-700" : "bg-white border-slate-200 text-slate-900 focus:border-[#20c997] placeholder:text-slate-400";

  return (
    <div id="contact-outer-block" className="space-y-8" dir={isPersian ? "rtl" : "ltr"}>
      
      {/* Visual coordinates and detail boxes */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Contact Coordinates Column (Left) */}
        <div className="md:col-span-5 space-y-4">
          <span className="text-[10px] uppercase tracking-widest text-[#20c997] font-mono font-medium block">
            {t.contactChannels}
          </span>
          <h3 className={`text-xl font-bold ${textTitle} leading-tight`}>
            {t.researchConsults}
          </h3>
          <p className={`text-xs ${textMuted} leading-relaxed`}>
            {t.contactParagraph}
          </p>

          <div className="pt-4 space-y-3">
            {/* Institution location */}
            <div className={`flex gap-3.5 items-start p-3 ${subBoxBg} rounded-xl text-xs`}>
              <MapPin className="w-4 h-4 text-[#20c997] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono text-slate-500 block uppercase">{t.labLocationLabel}</span>
                <span className={`${textTitle} font-medium block mt-0.5`}>{t.labLocationVal}</span>
                <span className={`${textMuted} block mt-0.5 text-[11px]`}>
                  {isPersian ? 'تهران، پژوهشکده علوم شناختی، محوطه اعضای هیئت علمی' : 'Institute for Cognitive Science Studies, Tehran, Iran'}
                </span>
              </div>
            </div>

            {/* Email copying tool */}
            <div className={`flex gap-3.5 items-start p-3 ${subBoxBg} rounded-xl text-xs`}>
              <Mail className="w-4 h-4 text-[#20c997] shrink-0 mt-0.5" />
              <div className="w-full">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">{t.primaryCorrespondence}</span>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <span className={`${textTitle} font-mono font-medium truncate select-all`}>
                    amini_m@icss.ac.ir
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className={`p-1 px-2 text-[9px] font-mono rounded ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'} border transition-all flex items-center gap-1 cursor-pointer`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        {isPersian ? 'کپی شد' : 'Copied'}
                      </>
                    ) : (
                      <>
                        <span className="w-1 h-1 bg-[#20c997] rounded-full" />
                        {isPersian ? 'کپی' : 'Copy'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* ResearchGate and Academic Hub link entries for direct profile inspection */}
            <div className="grid grid-cols-2 gap-3.5">
              <a
                href="https://www.researchgate.net/profile/Morteza-Amini-13"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2.5 p-3 ${isDarkMode ? 'bg-[#20c997]/5 hover:bg-[#20c997]/10 border-[#20c997]/15 hover:border-[#20c997]/30' : 'bg-slate-50 hover:bg-[#20c997]/5 border-slate-200/50 hover:border-[#20c997]/20'} border rounded-xl text-xs transition-all group`}
              >
                <BookOpen className="w-4 h-4 text-[#20c997]" />
                <div className="min-w-0 text-start">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">ResearchGate</span>
                  <span className={`${textTitle} font-medium truncate block mt-0.5 flex items-center gap-1 group-hover:text-[#20c997] transition-all`}>
                    {isPersian ? 'مشخصات' : 'Profile'} <ExternalLink className="w-2.5 h-2.5 inline-block opacity-60" />
                  </span>
                </div>
              </a>

              <a
                href="https://icss.ac.ir"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2.5 p-3 ${subBoxBg} rounded-xl text-xs transition-all group`}
              >
                <HelpCircle className="w-4 h-4 text-[#20c997]" />
                <div className="min-w-0 text-start">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">ICSS Hub</span>
                  <span className={`${textTitle} font-medium truncate block mt-0.5 flex items-center gap-1 group-hover:text-[#20c997] transition-all`}>
                    {isPersian ? 'هیئت علمی' : 'Faculty'} <ExternalLink className="w-2.5 h-2.5 inline-block opacity-60" />
                  </span>
                </div>
              </a>
            </div>
            
            {/* Standard notification feedback info */}
            <div className={`p-3 ${isDarkMode ? 'bg-indigo-500/5 border-indigo-500/10 text-indigo-400/90' : 'bg-indigo-50/50 border-indigo-100 text-indigo-700'} rounded-xl border text-[11px] leading-relaxed font-sans`}>
              {isPersian ? 'ℹ️ دکتر امینی برای صحت بالینی و محاسباتی اهمیت زیادی قائل است. مکاتبات مرتبط با تشخیص‌ها و حسگرهای مغزی در اولویت قرار دارند.' : 'ℹ️ Dr. Amini values clinical and computational accuracy. Correspondence regarding machine-learning diagnostics and brain biosensors is prioritized.'}
            </div>
          </div>
        </div>

        {/* Contact Form Dispatch Panel Column (Right) */}
        <div className={`md:col-span-7 ${cardBg} rounded-2xl p-5 sm:p-6 relative text-start`}>
          
          {successAnimation && (
            <div id="contact-toast-success" className={`absolute inset-0 ${isDarkMode ? 'bg-slate-950/95' : 'bg-white/98'} z-40 rounded-2xl flex flex-col items-center justify-center p-6 text-center animate-fade-in`}>
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-3.5 animate-bounce">
                <Check className="w-6 h-6" />
              </div>
              <h4 className={`text-base font-semibold ${textTitle} font-sans`}>
                {isPersian ? 'پیام شما ثبت شد!' : 'Message Dispatched!'}
              </h4>
              <p className={`text-xs ${textMuted} max-w-sm mt-1.5 leading-relaxed font-sans`}>
                {isPersian 
                  ? 'مکاتبه شما با موفقیت ثبت شد. می‌توانید نامه ارسالی خود را در صندوق پیام فرضی پایین صفحه پایش فرمایید!'
                  : 'The communication was successfully stamped with credentials and saved. You can inspect your letter in the Local Demonstration Inbox right below this panel!'}
              </p>
              <button 
                onClick={() => setSuccessAnimation(false)}
                className={`mt-4 px-4 py-1.5 text-xs font-mono rounded ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'} border transition-colors cursor-pointer`}
                id="dismiss-success-button"
              >
                {isPersian ? 'ارسال پیام جدید دیگر' : 'Send Another Message'}
              </button>
            </div>
          )}

          <span className="text-[10px] font-mono text-slate-400 block mb-4 uppercase tracking-wider">
            {t.saySomething}
          </span>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name & Email cluster */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`text-[10px] font-mono ${textLabel} uppercase tracking-wider block mb-1`}>
                  {t.fullNameLabel}
                </label>
                <input
                  id="contact-name-field"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.fullNamePlaceholder}
                  className={`w-full px-3.5 py-2.5 text-xs font-sans rounded border ${inputBg} transition-colors`}
                />
              </div>

              <div>
                <label className={`text-[10px] font-mono ${textLabel} uppercase tracking-wider block mb-1`}>
                  {t.emailLabel}
                </label>
                <input
                  id="contact-email-field"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className={`w-full px-3.5 py-2.5 text-xs font-mono rounded border ${inputBg} transition-colors`}
                />
              </div>
            </div>

            {/* Subject Dropdown & Institution field */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`text-[10px] font-mono ${textLabel} uppercase tracking-wider block mb-1`}>
                  {t.subjectLabel}
                </label>
                <select
                  id="contact-subject-select"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-xs font-mono rounded border ${inputBg} transition-colors cursor-pointer`}
                >
                  <option value="Research Collaboration">{t.subjectResearch}</option>
                  <option value="Postgraduate Advisorship">{t.subjectPostgrad}</option>
                  <option value="Speaking / Lecturing">{t.subjectSpeaking}</option>
                  <option value="General Inquiry">{t.subjectGeneral}</option>
                </select>
              </div>

              <div>
                <label className={`text-[10px] font-mono ${textLabel} uppercase tracking-wider block mb-1`}>
                  {t.institutionLabel}
                </label>
                <input
                  id="contact-institution-field"
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder={t.institutionPlaceholder}
                  className={`w-full px-3.5 py-2.5 text-xs font-sans rounded border ${inputBg} transition-colors`}
                />
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className={`text-[10px] font-mono ${textLabel} uppercase tracking-wider block mb-1`}>
                {t.messageLabel}
              </label>
              <textarea
                id="contact-message-area"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.messagePlaceholder}
                className={`w-full px-3.5 py-2.5 text-xs font-sans rounded border ${inputBg} transition-colors resize-none leading-relaxed`}
              />
            </div>

            {/* Cognitive Neural Captcha Game */}
            <div id="captcha-box" className={`p-4 ${boxBg} rounded space-y-2`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-mono text-[#20c997] uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {t.synapticFilterTitle}
                </span>
                <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                  captchaPassed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {captchaPassed ? (isPersian ? 'اتصال برقرار شد' : 'Neural Connected') : (isPersian ? 'غیرفعال' : 'Dormant state')}
                </span>
              </div>
              <p className={`text-[10px] ${textMuted} leading-normal`}>
                {t.synapticParagraph}
              </p>

              {/* Three nodes rendering */}
              <div className="flex justify-center gap-10 py-1">
                {/* Node A (Dormant) */}
                <button
                  id="node-dormant-a"
                  type="button"
                  onClick={() => handleNeuronClick('a', false)}
                  className={`relative flex flex-col items-center group focus:outline-none cursor-pointer ${
                    selectedNeuronId === 'a' ? 'scale-95' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-[#090a0d] border-[#191b22]' : 'bg-white border-slate-200'} border flex items-center justify-center transition-all ${
                    selectedNeuronId === 'a' ? 'border-red-500/40 bg-red-950/10' : 'group-hover:border-slate-400'
                  }`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400 opacity-20" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 mt-1">{t.synapticDormant}</span>
                </button>

                {/* Node B (Active/Pulsating Gold) */}
                <button
                  id="node-active-b"
                  type="button"
                  onClick={() => handleNeuronClick('b', true)}
                  className={`relative flex flex-col items-center group focus:outline-none cursor-pointer ${
                    selectedNeuronId === 'b' ? 'scale-105' : ''
                  }`}
                >
                  {/* Ripple effect */}
                  <div className="absolute top-0 w-8 h-8 rounded-full bg-[#20c997]/20 animate-ping [animation-duration:1.5s]" />
                  <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-[#090a0d] border-[#191b22]' : 'bg-emerald-50 border-emerald-200'} border flex items-center justify-center transition-all relative z-10 ${
                    selectedNeuronId === 'b' 
                      ? 'border-emerald-500 bg-emerald-950/10 shadow-[0_0_12px_rgba(32,201,151,0.3)]' 
                      : 'border-[#20c997] shadow-[0_0_8px_rgba(32,201,151,0.2)]'
                  }`}>
                    <div className={`w-3.5 h-3.5 rounded-full transition-all ${
                      selectedNeuronId === 'b' ? 'bg-emerald-500' : 'bg-[#20c997] animate-pulse'
                    }`} />
                  </div>
                  <span className={`text-[9px] font-mono mt-1 ${
                    selectedNeuronId === 'b' ? 'text-emerald-500 font-bold' : 'text-[#20c997] font-medium'
                  }`}>
                    {selectedNeuronId === 'b' ? t.synapticActive : t.synapticFiring}
                  </span>
                </button>

                {/* Node C (Dormant) */}
                <button
                  id="node-dormant-c"
                  type="button"
                  onClick={() => handleNeuronClick('c', false)}
                  className={`relative flex flex-col items-center group focus:outline-none cursor-pointer ${
                    selectedNeuronId === 'c' ? 'scale-95' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-[#090a0d] border-[#191b22]' : 'bg-white border-slate-200'} border flex items-center justify-center transition-all ${
                    selectedNeuronId === 'c' ? 'border-red-500/40 bg-red-950/10' : 'group-hover:border-slate-400'
                  }`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400 opacity-20" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 mt-1">{t.synapticDormant}</span>
                </button>
              </div>
            </div>

            {/* Brutalist Button with White Shift Offset behind */}
            <div className="pt-3">
              <button
                id="contact-submit-button"
                type="submit"
                disabled={!captchaPassed}
                className={`w-full relative group block ${captchaPassed ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
              >
                {/* Solid offset shadow layer */}
                {captchaPassed && (
                  <div className="absolute inset-0 bg-[#252835]/15 translate-x-[4px] translate-y-[4px] rounded-sm group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-transform" />
                )}
                {/* Button active layout */}
                <div className={`relative z-10 w-full font-sans font-bold tracking-wider text-[11px] uppercase p-3 rounded-sm active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-2 border ${
                  captchaPassed
                    ? 'bg-[#20c997] text-[#0e0f14] border-[#20c997] hover:-translate-x-[1px] hover:-translate-y-[1px]'
                    : isDarkMode ? 'bg-[#151720] text-slate-500 border-[#191b22]' : 'bg-slate-100 text-slate-400 border-slate-200'
                }`}>
                  <Send className="w-3.5 h-3.5" />
                  {t.sendMessageBtn}
                </div>
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Local Demonstration Inbox Dashboard (Awesome addition showing full functional fidelity) */}
      <div id="demo-inbox-section" className={`${boxBg} rounded-2xl p-4 sm:p-5 text-start`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1 px-1.5 rounded bg-[#20c997]/15 text-[#20c997] font-mono text-[9px] uppercase font-bold border border-[#20c997]/20 animate-pulse">
              {t.demoLabLabel}
            </span>
            <h4 className={`text-sm font-semibold ${textTitle} flex items-center gap-1.5 font-sans`}>
              <MessageSquare className="w-4 h-4 text-[#20c997]" /> {t.sandboxInboxTitle}
            </h4>
          </div>
          <button
            id="toggle-sandbox-inbox-btn"
            onClick={() => setShowDemoInbox(!showDemoInbox)}
            className={`px-2.5 py-1 text-[10px] font-mono rounded ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200' : 'bg-slate-150 border-slate-205 text-slate-600 hover:text-slate-900'} border transition-colors cursor-pointer`}
          >
            {showDemoInbox ? t.sandboxInboxLockBtn : `${t.sandboxInboxViewBtn} (${inbox.length})`}
          </button>
        </div>

        {showDemoInbox && (
          <div className="mt-5 space-y-4 animate-fade-in pt-4 border-t border-slate-200/20">
            <p className={`text-[11px] ${textMuted} max-w-2xl leading-relaxed`}>
              {t.sandboxInboxParagraph}
            </p>

            {inbox.length > 0 ? (
              <div id="messages-list-grid" className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                {inbox.map((msg) => (
                  <div 
                    key={msg.id} 
                    id={`sandbox-msg-${msg.id}`}
                    className={`p-4 rounded-xl border relative shadow-sm ${
                      msg.status === 'unread' 
                        ? 'border-[#20c997]/30 bg-[#20c997]/5' 
                        : isDarkMode ? 'border-[#191b22] bg-[#050507]' : 'border-slate-100 bg-slate-50/50'
                    }`}
                  >
                    {/* Delete button */}
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="absolute top-4 right-4 p-1 rounded hover:bg-red-500/15 text-slate-400 hover:text-red-500 border border-transparent transition-colors cursor-pointer"
                      title="Purge message"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono mb-2">
                      <span className="text-[#20c997] font-semibold">{msg.name}</span>
                      <span className="text-slate-400">&bull;</span>
                      <span className={textMuted}>{msg.email}</span>
                      <span className="text-slate-400">&bull;</span>
                      <span className={`px-1.5 py-0.5 rounded border text-[9px] ${isDarkMode ? 'bg-[#151720] border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                        {msg.institution}
                      </span>
                    </div>

                    <h5 className={`text-xs font-semibold ${textTitle} leading-snug`}>
                      {isPersian ? 'موضوع پیام:' : 'Subject:'} {msg.subject}
                    </h5>

                    <p className={`mt-2 text-xs ${textMuted} leading-relaxed p-2.5 rounded border ${isDarkMode ? 'bg-black/30 border-slate-900' : 'bg-white border-slate-100'}`}>
                      {msg.message}
                    </p>

                    <div className={`mt-3 pt-2.5 border-t ${isDarkMode ? 'border-slate-900/60' : 'border-slate-100'} flex flex-wrap items-center justify-between text-[9px] font-mono text-slate-500`}>
                      <span>{isPersian ? 'ارسال شده در:' : 'Submitted:'} {msg.timestamp}</span>
                      
                      <div className="flex items-center gap-1.5">
                        <span>{isPersian ? 'وضعیت دمو:' : 'Demo actions:'}</span>
                        <select
                          value={msg.status}
                          onChange={(e) => updateStatus(msg.id, e.target.value as any)}
                          className={`px-1.5 py-0.5 rounded cursor-pointer text-[9px] focus:outline-none border ${isDarkMode ? 'bg-[#0e0f14] border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-650'}`}
                        >
                          <option value="unread">{isPersian ? 'خوانده نشده' : 'Unread'}</option>
                          <option value="replied">{isPersian ? 'پاسخ داده شده (شبیه‌ساز)' : 'Replied (Simulated)'}</option>
                          <option value="archived">{isPersian ? 'بایگانی شده' : 'Archived'}</option>
                        </select>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-6 ${isDarkMode ? 'bg-[#050507] border-slate-900' : 'bg-slate-50 border-slate-100'} border rounded-xl`}>
                <span className="text-slate-500 block text-xl mb-1">📭</span>
                <p className="text-[11px] font-mono text-slate-500">
                  {t.sandboxInboxEmpty}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
