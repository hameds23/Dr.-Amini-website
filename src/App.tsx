/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  User, Brain, BookOpen, GraduationCap, Award, Mail, MapPin, 
  ChevronRight, Quote, Check, Clock, Globe, ArrowUpRight, 
  FileText, Home, Menu, X, Calendar, Linkedin, Github, Cpu,
  Bookmark, Sparkles, MessageSquare, Moon, Sun, Laptop, ShieldCheck,
  Send, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data imports
import { 
  DR_AMIN_BIO, 
  PUBLICATIONS, 
  RESEARCH_INTERESTS, 
  EDUCATION_DATA, 
  TIMELINE_EVENTS,
  TEACHING_COURSES
} from './data';

// Component imports
import ProfileUpload from './components/ProfileUpload';
import InteractiveBrain from './components/InteractiveBrain';
import ContactForm from './components/ContactForm';
import PrintableCV from './components/PrintableCV';
import { BlogsSection } from './components/BlogsSection';
import { 
  translations, 
  PERS_RESEARCH_INTERESTS, 
  PERS_EDUCATION_DATA, 
  PERS_TEACHING_COURSES, 
  PERS_TIMELINE_EVENTS 
} from './localization';

// Custom rotating/typing roles matching Sergio's style
function TypingRoles({ isPersian }: { isPersian: boolean }) {
  const rolesEn = [
    "Computational Neuroscientist",
    "Assistant Professor",
    "Cognitive Modeler & Researcher",
    "Machine Learning Expert"
  ];
  const rolesFa = [
    "استادیار پژوهشکده علوم شناختی",
    "متخصص مدلسازی شناختی مغز",
    "پژوهشگر ارشد هوش مصنوعی متمایز",
    "طراح بردهای الکترونیک نوسان مغزی"
  ];
  const roles = isPersian ? rolesFa : rolesEn;
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = roles[roleIndex] || '';

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(100);
          return;
        }
      }
      setTypingSpeed(isDeleting ? 40 : 100);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, roles]);

  return (
    <span className="text-[#20c997] font-semibold inline-block min-h-[1.5em] border-r-2 border-[#20c997]/80 pr-1 select-none">
      {isPersian ? "من شیفته پژوهش در زمینه " : "I Am Passionate "}{currentText}
    </span>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  // Poll for any photo updates in localStorage to sync sidebar and main panel
  useEffect(() => {
    const fetchPhoto = () => {
      const savedPhoto = localStorage.getItem('dr_amini_profile_photo');
      if (savedPhoto !== profilePhoto) {
        setProfilePhoto(savedPhoto);
      }
    };
    fetchPhoto();
    const interval = setInterval(fetchPhoto, 1000);
    return () => clearInterval(interval);
  }, [profilePhoto]);

  // Scroll to section block smoothly
  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTab(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  // Scroll Spy to detect currently visible section and highlight left menu item
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'portfolio', 'blogs', 'contact'];
      const scrollPosition = window.scrollY + 180; // offset for triggers

      // If at bottom, select contact
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
      if (isAtBottom) {
        setActiveTab('contact');
        return;
      }

      for (const section of sections) {
        const el = document.getElementById(`section-${section}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isPersian, setIsPersian] = useState(() => {
    return localStorage.getItem('isPersian') === 'true';
  });
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('isDarkMode') !== 'false';
  });

  const togglePersian = () => {
    setIsPersian(prev => {
      const next = !prev;
      localStorage.setItem('isPersian', String(next));
      return next;
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('isDarkMode', String(next));
      return next;
    });
  };

  const t = translations[isPersian ? 'fa' : 'en'];

  // Sidebar navigation menu items
  const menuItems = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'about', label: t.navAbout, icon: User },
    { id: 'services', label: t.navServices, icon: Award },
    { id: 'portfolio', label: t.navPortfolio, icon: Brain },
    { id: 'blogs', label: t.navBlogs, icon: BookOpen },
    { id: 'contact', label: t.navContact, icon: Mail },
  ];

  return (
    <div 
      className={`min-h-screen transition-colors duration-350 font-sans selection:bg-[#20c997]/20 selection:text-[#20c997] relative overflow-x-hidden ${
        isDarkMode 
          ? 'bg-[#0e0f14]' 
          : 'bg-[#f4f5f6] text-slate-700'
      }`}
      dir={isPersian ? "rtl" : "ltr"}
      style={{ fontFamily: isPersian ? '"Vazirmatn", sans-serif' : '"Inter", sans-serif' }}
    >
      
      {/* SIDEBAR (DESKTOP) */}
      <aside 
        id="sergio-desktop-sidebar" 
        className={`hidden lg:flex w-[260px] xl:w-[290px] h-screen fixed top-0 z-40 flex-col justify-between py-8 px-6 ${
          isPersian ? 'right-0 border-l border-r-0' : 'left-0 border-r border-l-0'
        } ${
          isDarkMode 
            ? 'bg-[#090a0d] border-[#191b22]' 
            : 'bg-white border-slate-200/95 shadow-[4px_0_24px_rgba(0,0,0,0.02)]'
        }`}
      >
        <div className="space-y-8 relative">
          
          {/* Top Green Background swoosh quadrant + avatar circle combo */}
          <div className="relative pt-6 flex flex-col items-center">
            {/* Top-left curved green accent blob */}
            <div className={`absolute top-[-32px] w-32 h-32 bg-[#20c997] -z-10 opacity-90 shadow-md ${isPersian ? 'right-[-24px] rounded-bl-full' : 'left-[-24px] rounded-br-full'}`} />
            
            {/* Circular Profile Frame */}
            <div className={`w-24 h-24 rounded-full bg-[#fbc02d] border-[3px] overflow-hidden shadow-lg relative flex items-center justify-center ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              {profilePhoto ? (
                <img 
                  id="sidebar-custom-profile-img"
                  src={profilePhoto} 
                  alt="Morteza Amini" 
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Default pointing avatar cutout mockup built using premium CSS look */
                <div className="w-full h-full bg-gradient-to-tr from-[#e67e22] to-[#fbc02d] flex items-center justify-center relative">
                  <svg className="w-14 h-14 text-white p-1 mt-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                </div>
              )}
            </div>

            {/* Spaced aesthetic uppercase text label underneath */}
            <h1 className={`text-sm font-mono tracking-[0.25em] font-extrabold uppercase mt-4 block text-center leading-none ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              Morteza Amini
            </h1>
            <span className={`text-[9px] font-mono font-semibold block uppercase tracking-wider mt-1 text-center ${isDarkMode ? 'text-[#818183]' : 'text-slate-500'}`}>
              دکتر مرتضی امینی
            </span>
          </div>

          {/* Vertical Menu Links with green hover/active highlight */}
          <nav id="sidebar-nav-menu" className="flex flex-col gap-1.5 pt-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => handleScrollTo(item.id)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg text-xs font-mono uppercase tracking-[0.15em] transition-all group cursor-pointer ${
                    isPersian ? 'text-right justify-start' : 'text-left justify-start'
                  } ${
                    isActive 
                      ? 'text-[#20c997] font-bold bg-[#20c997]/5 ' + (isPersian ? 'border-r-2 border-l-0' : 'border-l-2 border-r-0') + ' border-[#20c997]' 
                      : (isDarkMode ? 'text-[#818183]' : 'text-slate-500') + ' hover:text-[#20c997] hover:bg-[#20c997]/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-[#20c997]' : 'text-[#515359]'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer with clean minimal socials */}
        <div className={`border-t pt-5 space-y-3 ${isDarkMode ? 'border-[#191b22]' : 'border-slate-200'}`}>
          <div className="flex justify-center gap-4 text-xs font-mono">
            <a 
              href="https://scholar.google.com/citations?user=Gg2f-SIAAAAJ" 
              target="_blank" 
              className={`transition-colors ${isDarkMode ? 'text-[#515359] hover:text-[#20c997]' : 'text-slate-500 hover:text-[#20c997]'}`}
              title="Google Scholar"
            >
              {isPersian ? "اسکولار" : "Scholar"}
            </a>
            <span className="text-[#252835]">&bull;</span>
            <a 
              href="https://www.researchgate.net/profile/Morteza-Amini-13" 
              target="_blank" 
              className={`transition-colors ${isDarkMode ? 'text-[#515359] hover:text-[#20c997]' : 'text-slate-500 hover:text-[#20c997]'}`}
              title="ResearchGate"
            >
              {isPersian ? "گیت" : "Gate"}
            </a>
            <span className="text-[#252835]">&bull;</span>
            <a 
              href="mailto:amini_m@icss.ac.ir"
              className={`transition-colors ${isDarkMode ? 'text-[#515359] hover:text-[#20c997]' : 'text-slate-500 hover:text-[#20c997]'}`}
              title="Email Address"
            >
              {isPersian ? "ایمیل" : "Email"}
            </a>
          </div>
          <p className={`text-[9px] font-mono text-center leading-normal ${isDarkMode ? 'text-[#4a4d57]' : 'text-slate-400'}`}>
            &copy; 2026 Dr. M. Amini Portfolio<br />
            {isPersian ? "طراحی منطبق بر استایل سرجیو" : "Designed in the Sergio theme"}
          </p>
        </div>
      </aside>

      {/* MOBILE SNAP/HEADER BAR */}
      <div 
        id="sergio-mobile-header"
        className={`lg:hidden fixed top-0 left-0 right-0 h-16 px-6 z-50 flex items-center justify-between transition-all ${
          isDarkMode ? 'bg-[#090a0d] border-b border-[#191b22]' : 'bg-white border-b border-slate-200/80 shadow-sm'
        }`}
        dir={isPersian ? "rtl" : "ltr"}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#fbc02d] overflow-hidden border border-white flex items-center justify-center">
            {profilePhoto ? (
              <img src={profilePhoto} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#e67e22]" />
            )}
          </div>
          <div>
            <span className={`font-bold tracking-[0.1em] text-xs font-mono uppercase block ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{isPersian ? 'دکتر امینی' : 'M. Amini'}</span>
            <span className="text-[9px] text-[#20c997] font-mono tracking-wide block leading-none uppercase">{isPersian ? 'استادیار علمی' : 'Neuroscientist'}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5" dir="ltr">
          {/* Quick Language Switch */}
          <button 
            id="mobile-quick-lang"
            onClick={togglePersian}
            className={`px-2 py-1 rounded text-[9px] font-bold font-mono transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-[#151720] border border-[#252835] text-slate-200' 
                : 'bg-slate-100 border border-slate-200 text-slate-800'
            }`}
          >
            {isPersian ? "EN" : "فا"}
          </button>
          
          {/* Quick Theme Switch */}
          <button 
            id="mobile-quick-theme"
            onClick={toggleDarkMode}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isDarkMode ? 'bg-white text-slate-900' : 'bg-slate-950 text-amber-400'
            }`}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <button 
            id="mobile-drawer-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all cursor-pointer ${
              isDarkMode 
                ? 'border-[#252835] hover:border-[#20c997] text-slate-300 bg-[#0e0f14]' 
                : 'border-slate-200 hover:border-[#20c997] text-slate-700 bg-slate-50'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* MOBILE POPUP NAVIGATION DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-drawer-overlay"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`lg:hidden fixed inset-0 top-16 z-40 flex flex-col justify-between p-8 overflow-y-auto ${
              isDarkMode ? 'bg-[#090a0d]' : 'bg-[#eef0f2]'
            }`}
            dir={isPersian ? "rtl" : "ltr"}
          >
            <div className="space-y-6">
              <nav className="flex flex-col gap-2 mt-4 font-sans">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`mobile-nav-tab-${item.id}`}
                      onClick={() => handleScrollTo(item.id)}
                      className={`flex items-center gap-4 px-5 py-4 rounded-xl text-xs font-mono uppercase tracking-[0.15em] transition-all cursor-pointer ${
                        isPersian ? 'text-right justify-start' : 'text-left justify-start'
                      } ${
                        isActive 
                          ? 'bg-[#20c997]/10 text-[#20c997] border border-[#20c997]/20 font-bold' 
                          : (isDarkMode ? 'text-[#818183]' : 'text-slate-600') + ' hover:text-slate-900 hover:bg-[#20c997]/5'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#20c997]' : 'text-[#818183]'}`} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className={`border-t pt-6 text-center space-y-4 ${isDarkMode ? 'border-[#191b22]' : 'border-slate-300'}`}>
              <div className="flex justify-center gap-6 text-xs font-mono" dir="ltr">
                <a href="https://scholar.google.com/citations?user=Gg2f-SIAAAAJ" target="_blank" className={`transition-colors ${isDarkMode ? 'text-[#818183] hover:text-[#20c997]' : 'text-slate-600 hover:text-[#20c997]'}`}>Scholar</a>
                <span className="text-[#252835]">&bull;</span>
                <a href="https://www.researchgate.net/profile/Morteza-Amini-13" target="_blank" className={`transition-colors ${isDarkMode ? 'text-[#818183] hover:text-[#20c997]' : 'text-slate-600 hover:text-[#20c997]'}`}>ResearchGate</a>
                <span className="text-[#252835]">&bull;</span>
                <a href="mailto:amini_m@icss.ac.ir" className={`transition-colors ${isDarkMode ? 'text-[#818183] hover:text-[#20c997]' : 'text-slate-600 hover:text-[#20c997]'}`}>Email</a>
              </div>
              <p className={`text-[9px] font-mono ${isDarkMode ? 'text-[#515359]' : 'text-slate-400'}`}>
                &copy; 2026 Dr. Morteza Amini &bull; ICSS Computational Neuroscience Lab
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE WORKSPACE PANEL */}
      <main className={`w-full min-h-screen flex flex-col pt-16 lg:pt-0 relative z-10 transition-all ${
        isPersian ? 'lg:pr-[260px] xl:pr-[290px] lg:pl-0' : 'lg:pl-[260px] xl:pl-[290px] lg:pr-0'
      }`}>
        
        {/* Decorative Top Bar header with language and theme switches */}
        <div id="content-header-bar" className={`absolute top-6 ${isPersian ? 'left-6 md:left-10' : 'right-6 md:right-10'} z-30 flex items-center gap-2.5`}>
          {/* Language Toggle */}
          <button 
            id="lang-toggle-btn"
            onClick={togglePersian}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase font-mono tracking-wider transition-all cursor-pointer shadow-md ${
              isDarkMode 
                ? 'bg-[#151720]/80 border border-[#252835]/80 text-white hover:bg-[#20c997]/10 hover:text-[#20c997]' 
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-[#20c997]/5 hover:text-[#20c997]'
            }`}
          >
            {isPersian ? "English" : "فارسی"}
          </button>

          {/* Theme Toggle Button */}
          <button 
            id="theme-toggle-btn"
            onClick={toggleDarkMode}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer ${
              isDarkMode ? 'bg-white text-slate-900 hover:scale-105' : 'bg-[#151720] text-amber-400 hover:scale-105'
            }`}
            title={isDarkMode ? t.lightModeToggle : t.darkModeToggle}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* ACTIVE SCROLLABLE WRAPPER */}
        <div id="sergio-content-viewport" className="flex-grow max-w-5xl xl:max-w-6xl w-full mx-auto px-6 sm:px-12 lg:px-16 py-12 lg:py-20 space-y-24 lg:space-y-36">
              
          {/* === SECTION 1. HOME === */}
          <section id="section-home" className="scroll-mt-24 lg:scroll-mt-12 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center min-h-[60vh] pt-4 lg:pt-14 text-start">
            {/* Bio details left */}
            <div className="md:col-span-12 lg:col-span-7 space-y-6">
              <span className="text-xs uppercase font-mono font-bold tracking-[0.25em] text-[#20c997] block">
                {t.greeting}
              </span>
              <h2 className={`text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-none ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                {isPersian ? 'مرتضی امینی' : 'Morteza Amini'}
              </h2>
              
              {/* Rotating typing sub-role */}
              <div className={`text-md sm:text-lg font-mono ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                <TypingRoles isPersian={isPersian} />
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed text-justify max-w-xl font-sans ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-550'}`}>
                {isPersian ? t.summaryText : `${DR_AMIN_BIO.summary} I design, prototype, and build data systems at the intersection of mind, brain, and machine. Currently, I serve as an Assistant Professor on the Faculty of the Institute for Cognitive Science Studies.`}
              </p>

              {/* Brutalist Button with White Shift Offset behind */}
              <div className="pt-4 flex flex-wrap gap-4">
                <button 
                  id="home-cv-action-btn"
                  onClick={() => handleScrollTo('portfolio')}
                  className="relative group cursor-pointer inline-block"
                >
                  {/* Solid offset shadow layer */}
                  <div className={`absolute inset-0 translate-x-[6px] translate-y-[6px] rounded-sm group-hover:translate-x-[4px] group-hover:translate-y-[4px] transition-transform ${isDarkMode ? 'bg-white' : 'bg-slate-950'}`} />
                  {/* Green button front layer */}
                  <div className="relative z-10 bg-[#20c997] border border-[#20c997] text-[#0e0f14] font-mono font-bold tracking-widest text-[10px] uppercase px-7 py-3.5 rounded-sm hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[4px] active:translate-y-[4px] transition-all">
                    {t.exploreBtn}
                  </div>
                </button>

                <button 
                  id="home-contact-action-btn"
                  onClick={() => handleScrollTo('contact')}
                  className={`px-7 py-3.5 border font-mono font-bold tracking-widest text-[10px] uppercase rounded-sm transition-all cursor-pointer ${
                    isDarkMode 
                      ? 'border-[#252835] hover:border-[#20c997] text-slate-200 bg-transparent' 
                      : 'border-slate-300 hover:border-[#20c997] text-slate-800 bg-white hover:bg-slate-50'
                  }`}
                >
                  {t.contactBtn}
                </button>
              </div>
            </div>

            {/* Profile cutout inside bright circle right */}
            <div className="md:col-span-12 lg:col-span-5 flex justify-center items-center">
              <div className={`relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#20c997] flex items-center justify-center overflow-hidden border-4 shadow-2xl relative ${isDarkMode ? 'border-slate-900' : 'border-white'}`}>
                {profilePhoto ? (
                  <img 
                    id="home-main-profile-avatar"
                    src={profilePhoto} 
                    alt="Dr. Morteza Amini" 
                    className="w-full h-full object-cover scale-105"
                  />
                ) : (
                  /* Default silhouette representing clean cutout scholar */
                  <div className="w-full h-full bg-gradient-to-tr from-[#13b185] to-[#20c997] flex items-center justify-center p-6 relative">
                    <svg className="w-48 h-48 text-slate-900 mt-12 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                )}
                
                {/* Subtle circular grid coordinates map */}
                <svg className="absolute inset-0 w-full h-full text-slate-950/15 pointer-events-none" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.3" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.3" />
                </svg>
              </div>
            </div>
          </section>

          {/* === SECTION 2. ABOUT ME === */}
          <section id="section-about" className={`scroll-mt-24 lg:scroll-mt-12 space-y-16 pt-8 border-t ${isDarkMode ? 'border-[#191b22]/50' : 'border-slate-200'}`}>
            
            {/* Subsection 1: Biography & Collages */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Left Column: Irregular Collage representing facets */}
              <div className="lg:col-span-6 flex justify-center lg:justify-start">
                <div className="relative w-full max-w-[420px] aspect-square p-2">
                  <div className="absolute top-[18%] left-[-4%] w-4 h-4 rounded-full bg-[#fbc02d] animate-pulse" />
                  <div className="absolute bottom-[2%] left-[40%] w-3 h-3 rounded-full bg-slate-500/60" />
                  <div className="absolute top-[40%] right-[-3%] w-2.5 h-2.5 rounded-full bg-slate-500/50" />

                  {/* Top-Left Image: Electronics */}
                  <div className={`absolute left-0 top-0 w-[45%] h-[45%] rounded-2xl overflow-hidden border-2 shadow-lg bg-[#20c997]/15 hover:scale-105 transition-transform duration-300 group cursor-help ${isDarkMode ? 'border-slate-900' : 'border-white'}`} title={isPersian ? 'مهندسی برق و سیستم‌های نوسانی' : "Facet 1: Electronic Circuits & Systems"}>
                    <div className="absolute inset-0 bg-[#00acc1]/10 mix-blend-color-burn" />
                    <div className="absolute bottom-1 right-2 text-[8px] font-mono text-[#00acc1] font-bold">{isPersian ? "سیستم‌های آنالوگ" : "ELECTRONICS"}</div>
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-slate-900/40">
                      <Cpu className="w-8 h-8 text-[#00acc1] mb-1.5" />
                      <span className="text-[10px] font-bold text-slate-100 uppercase tracking-tight">{isPersian ? "طراح بردهای مغزی" : "Circuit board design"}</span>
                    </div>
                  </div>

                  {/* Top-Right Image: Psychology */}
                  <div className={`absolute right-[5%] top-[8%] w-[45%] h-[45%] rounded-2xl overflow-hidden border-2 shadow-lg bg-[#fbc02d]/15 hover:scale-105 transition-transform duration-300 group cursor-help ${isDarkMode ? 'border-slate-900' : 'border-white'}`} title={isPersian ? 'روان‌شناسی شناختی عمومی' : "Facet 2: Cognitive Psychology & Brain States"}>
                    <div className="absolute inset-0 bg-[#fbc02d]/10 mix-blend-color-burn" />
                    <div className="absolute bottom-1 right-2 text-[8px] font-mono text-[#fbc02d] font-bold">{isPersian ? "روان‌سنجی" : "MIND SCIENCE"}</div>
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-slate-900/40">
                      <User className="w-8 h-8 text-[#fbc02d] mb-1.5" />
                      <span className="text-[10px] font-bold text-slate-100 uppercase tracking-tight">{isPersian ? "آزمون شناختی" : "Psych testing & cognition"}</span>
                    </div>
                  </div>

                  {/* Bottom-Left Image: Dynamical Models */}
                  <div className={`absolute left-[3%] bottom-[8%] w-[45%] h-[45%] rounded-2xl overflow-hidden border-2 shadow-lg bg-[#ff9800]/15 hover:scale-105 transition-transform duration-300 group cursor-help ${isDarkMode ? 'border-slate-900' : 'border-white'}`} title={isPersian ? 'مدل‌های پویای شبکه‌های عصبی' : "Facet 3: Ph.D. Cognitive Modeling simulations"}>
                    <div className="absolute inset-0 bg-[#ff9800]/10 mix-blend-color-burn" />
                    <div className="absolute bottom-1 right-2 text-[8px] font-mono text-[#ff9800] font-bold">{isPersian ? "مدلسازی پویا" : "BRAIN MODELS"}</div>
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-slate-900/40">
                      <Brain className="w-8 h-8 text-[#ff9800] mb-1.5" />
                      <span className="text-[10px] font-bold text-slate-100 uppercase tracking-tight">{isPersian ? "مدل ACT-R بهساز" : "ACT-R & neural models"}</span>
                    </div>
                  </div>

                  {/* Bottom-Right Image: CNN Diagnosis */}
                  <div className={`absolute right-0 bottom-0 w-[45%] h-[45%] rounded-2xl overflow-hidden border-2 shadow-lg bg-[#9b59b6]/15 hover:scale-105 transition-transform duration-300 group cursor-help ${isDarkMode ? 'border-slate-900' : 'border-white'}`} title={isPersian ? 'تشخیص زودهنگام پاتولوژیک با هوش مصنوعی' : "Facet 4: Early Alzheimer's and Parkinson's diagnosis using CNNs"}>
                    <div className="absolute inset-0 bg-[#9b59b6]/10 mix-blend-color-burn" />
                    <div className="absolute bottom-1 right-2 text-[8px] font-mono text-[#af7ac5] font-bold">{isPersian ? "پایش تشخیصی" : "DIAGNOSTIC AI"}</div>
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-slate-900/40">
                      <Laptop className="w-8 h-8 text-[#af7ac5] mb-1.5" />
                      <span className="text-[10px] font-bold text-slate-100 uppercase tracking-tight">{isPersian ? "همجوشی سیگنال مغزی" : "EEG & fMRI convolutions"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Bio Paragraph & Stats */}
              <div className="lg:col-span-6 space-y-5 text-start">
                <div className="inline-block relative">
                  <span className="text-xs uppercase font-mono font-bold tracking-[0.25em] text-[#20c997]">
                    {t.aboutHeading}
                  </span>
                  <div className="w-6 h-[2px] bg-[#20c997] mt-1" />
                </div>

                <h3 className={`text-xl sm:text-2xl font-bold font-sans leading-snug ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                  {t.aboutIntro}
                </h3>

                <p className={`text-xs sm:text-sm leading-relaxed text-justify font-sans ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-500'}`}>
                  {t.aboutFullBio} {isPersian ? t.detailedAboutText.substring(0, 150) + "..." : ""}
                </p>

                {/* Display stats */}
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="flex items-center gap-3">
                    <span className={`text-3xl sm:text-4xl font-black font-mono leading-none ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>12+</span>
                    <span className={`text-[10px] uppercase tracking-wider font-mono font-semibold ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-500'}`}>
                      {t.coursesInstructed.split(' ').slice(0, 2).join(' ')}<br />{t.coursesInstructed.split(' ').slice(2).join(' ') || "Instructed"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-3xl sm:text-4xl font-black font-mono leading-none ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>7+</span>
                    <span className={`text-[10px] uppercase tracking-wider font-mono font-semibold ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-500'}`}>
                      {t.journalPubs.split(' ').slice(0, 2).join(' ')}<br />{t.journalPubs.split(' ').slice(2).join(' ') || "Pubs"}
                    </span>
                  </div>
                </div>

                {/* Buttons side-by-side */}
                <div className="pt-4 flex flex-wrap gap-4">
                  <button 
                    id="about-contact-btn"
                    onClick={() => handleScrollTo('contact')}
                    className="relative group cursor-pointer inline-block"
                  >
                    <div className={`absolute inset-0 translate-x-[4px] translate-y-[4px] rounded-sm group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-transform ${isDarkMode ? 'bg-white' : 'bg-slate-950'}`} />
                    <div className="relative z-10 bg-[#20c997] border border-[#20c997] text-[#0e0f14] font-mono font-bold tracking-widest text-[9px] uppercase px-5 py-3 rounded-sm hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] transition-all">
                      {t.contactBtn}
                    </div>
                  </button>

                  <a 
                    href="https://www.researchgate.net/profile/Morteza-Amini-13" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-5 py-3 border font-mono font-bold tracking-widest text-[9px] uppercase rounded-sm transition-all inline-block cursor-pointer ${
                      isDarkMode 
                        ? 'border-[#252835] hover:border-[#20c997] text-slate-200 bg-[#090a0d]/30' 
                        : 'border-slate-300 hover:border-[#20c997] text-slate-800 bg-white hover:bg-slate-50'
                    }`}
                  >
                    {t.researchProfileBtn}
                  </a>
                </div>
              </div>
            </div>

            {/* Subsection 2: EDUCATION & SKILLS */}
            <div className={`space-y-8 pt-8 border-t ${isDarkMode ? 'border-[#191b22]/50' : 'border-slate-200'}`}>
              <div className="inline-block relative">
                <span className={`text-xs uppercase font-mono font-bold tracking-[0.25em] ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  {t.educationHeading}
                </span>
                <div className="w-8 h-[2px] bg-[#20c997] mt-1" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Left Side: Timeline Cards */}
                <div className="md:col-span-6 space-y-4">
                  {(isPersian ? PERS_EDUCATION_DATA : EDUCATION_DATA).slice(0, 3).map((edu, idx) => (
                    <div 
                      key={idx}
                      className={`p-5 border hover:border-[#20c997]/20 rounded-xl relative space-y-2.5 transition-all ${
                        isDarkMode 
                          ? 'bg-[#090a0d] border-[#191b22]' 
                          : 'bg-white border-slate-200/80 shadow-sm'
                      }`}
                    >
                      {/* Year ribbon badge on the top left */}
                      <span className="inline-block bg-[#20c997]/15 text-[#20c997] border border-[#20c997]/20 text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                        {edu.year === "Graduated" && idx === 0 ? (isPersian ? "مقطع کاندیداتوری دکتری" : "Ph.D. degree") : edu.year}
                      </span>
                      
                      <h4 className={`text-sm font-semibold font-sans ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                        {edu.major}
                      </h4>
                      <p className={`text-xs font-mono uppercase tracking-wider ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-500'}`}>
                        {edu.institution}
                      </p>
                      <p className={`text-[11px] font-sans leading-relaxed text-justify ${isDarkMode ? 'text-[#5e6066]' : 'text-slate-650'}`}>
                        {edu.details}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Right Side: Skill bars */}
                <div className="md:col-span-6 space-y-6">
                  <div className="space-y-1.5">
                    <h4 className={`text-base font-bold font-sans ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                      {t.skillsSectionTitle}
                    </h4>
                    <p className={`text-xs leading-relaxed text-justify ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-600'}`}>
                      {isPersian 
                        ? 'مجموع برآیندهای مهارتی فنی با بررسی دقیق پاتولوژی سیگنال، شبیه‌سازی سیستم‌های الکترونیکی نوسانی و تحلیل شناختی مغز انسان عبارتند از:'
                        : 'Through structured multidisciplinary fellowships and professional practice, my quantitative technical engineering and medical diagnostic expertise covers:'
                      }
                    </p>
                  </div>

                  <div className="space-y-4.5 pt-2">
                    {[
                      { name: isPersian ? "فناوری‌های یادگیری عمیق و شبکه‌های همپیچش" : "Deep Learning & Convolutional CNNs", value: 95 },
                      { name: isPersian ? "پردازش سیگنال‌های مغزی (fMRI و EEG)" : "Brain Signal Processing (EEG / fMRI)", value: 90 },
                      { name: isPersian ? "مدلسازی ریاضیاتی شبکه‌های شناختی مغز" : "Mathematical Cognitive Modeling", value: 85 },
                      { name: isPersian ? "طراحی تخصصی مدارهای آنالوگ و تله‌متری" : "High-level Electronics & Systems Telemetry", value: 80 }
                    ].map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1.5" dir="ltr">
                        <div className="flex justify-between text-xs font-mono font-medium text-slate-400">
                          <span className={`text-start ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{skill.name}</span>
                          <span className="text-[#20c997]">{skill.value}%</span>
                        </div>
                        {/* Slidertrack bar matching image 3 */}
                        <div className={`h-2 w-full rounded-full relative ${isDarkMode ? 'bg-[#151720]' : 'bg-slate-200'}`}>
                          <div 
                            className="h-full bg-[#20c997] rounded-full relative transition-all duration-1000"
                            style={{ width: `${skill.value}%` }}
                          >
                            {/* Circular thumbnail end */}
                            <div className="absolute right-[-4px] top-[-3px] w-3.5 h-3.5 bg-[#20c997] rounded-full border border-slate-900 shadow-md" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Subsection 3: EXPERIENCE */}
            <div className={`space-y-8 pt-8 border-t ${isDarkMode ? 'border-[#191b22]/50' : 'border-slate-200'}`}>
              <div className="inline-block relative">
                <span className={`text-xs uppercase font-mono font-bold tracking-[0.25em] ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  {t.experienceHeading}
                </span>
                <div className="w-6 h-[2px] bg-[#20c997] mt-1" />
              </div>

              <div className="space-y-4 max-w-4xl">
                {(isPersian ? PERS_TIMELINE_EVENTS : TIMELINE_EVENTS).map((event, idx) => (
                  <div 
                    key={idx}
                    className={`flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-5 sm:p-6 border rounded-xl relative group hover:border-[#20c997]/20 transition-all ${
                      isDarkMode 
                        ? 'bg-[#090a0d] border-[#191b22]' 
                        : 'bg-white border-slate-200/85 shadow-sm'
                    }`}
                  >
                    {/* Logo badge square left */}
                    <div className="w-14 h-14 shrink-0 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center font-serif font-black text-slate-900 text-sm md:text-md">
                      {idx === 0 ? "ICSS" : idx === 1 ? "SBU" : idx === 2 ? "ICSS" : "SBU"}
                    </div>

                    {/* Center description */}
                    <div className="flex-grow space-y-1">
                      <h4 className={`text-sm sm:text-base font-bold font-sans ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                        {event.title}
                      </h4>
                      <span className="text-[11px] font-mono text-[#20c997] uppercase tracking-wider block">
                        {event.subtitle} &bull; {event.year}
                      </span>
                      <p className={`text-xs leading-relaxed pt-1.5 text-justify font-sans ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-550'}`}>
                        {event.description}
                      </p>
                    </div>

                    {/* Full time pill rights */}
                    <span className="sm:self-center shrink-0 bg-[#20c997]/10 text-[#20c997] border border-[#20c997]/20 text-[8px] font-mono font-bold tracking-wider uppercase px-2 py-1 rounded">
                      {idx === 0 ? (isPersian ? "پژوهش علمی" : "FACULTY") : (isPersian ? "فلوشیپ پژوهشی" : "FELLOWSHIP")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </section>

          {/* === SECTION 3. SERVICES === */}
          <section id="section-services" className={`scroll-mt-24 lg:scroll-mt-12 space-y-12 pt-8 border-t ${isDarkMode ? 'border-[#191b22]/50' : 'border-slate-200'}`}>
            <div className="inline-block relative">
              <span className={`text-xs uppercase font-mono font-bold tracking-[0.25em] ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                {t.servicesHeading}
              </span>
              <div className="w-8 h-[2px] bg-[#20c997] mt-1" />
            </div>

            {/* Grid blocks of service cards */}
            <div id="services-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(isPersian ? PERS_RESEARCH_INTERESTS : RESEARCH_INTERESTS).map((interest, idx) => (
                <div 
                  key={idx}
                  className={`p-6 border rounded-xl flex gap-5 hover:translate-y-[-2px] transition-all group ${
                    isDarkMode 
                      ? 'bg-[#090a0d] border-[#191b22] hover:border-[#20c997]/35' 
                      : 'bg-white border-slate-200/80 shadow-sm hover:border-[#20c997]/35'
                  }`}
                >
                  {/* Icon display */}
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-all ${
                    isDarkMode 
                      ? 'bg-slate-900 border-[#191b22] group-hover:border-[#20c997]/40 text-slate-200 group-hover:text-[#20c997]' 
                      : 'bg-slate-50 border-slate-200 group-hover:border-[#20c997]/40 text-slate-700 group-hover:text-[#20c997]'
                  }`}>
                    {idx === 0 ? <Brain className="w-6 h-6" /> :
                     idx === 1 ? <Cpu className="w-6 h-6" /> :
                     idx === 2 ? <Laptop className="w-6 h-6" /> :
                     idx === 3 ? <Zap className="w-6 h-6" /> :
                     idx === 4 ? <Globe className="w-6 h-6" /> :
                                 <Calendar className="w-6 h-6" />}
                  </div>

                  <div className="space-y-2">
                    <h4 className={`text-sm sm:text-base font-bold font-sans transition-colors ${
                      isDarkMode ? 'text-slate-200 group-hover:text-slate-100' : 'text-slate-850 group-hover:text-slate-950'
                    }`}>
                      {interest.title}
                    </h4>
                    <p className={`text-xs leading-relaxed text-justify font-sans ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-550'}`}>
                      {interest.description}
                    </p>
                    <span className={`inline-block text-[9px] font-mono px-2 py-0.5 rounded border ${
                      isDarkMode ? 'bg-[#151720] text-slate-400 border-[#191b22]' : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      #{interest.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sub-bento: Graduation courses */}
            <div className="pt-8 space-y-6 text-start">
              <h3 className={`text-base font-bold font-sans ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                {t.curriculumSeminarsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(isPersian ? PERS_TEACHING_COURSES : TEACHING_COURSES).map((course, idx) => (
                  <div 
                    key={idx} 
                    className={`p-4 border rounded-lg ${
                      isDarkMode 
                        ? 'bg-[#090a0d]/50 border-[#191b22]' 
                        : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <span className="text-[9px] font-mono text-[#20c997] uppercase tracking-tight block mb-1">
                      {course.level === "Core" ? (isPersian ? "سیلابس هسته اصلی علمی" : "Core syllabus") : (isPersian ? "سیلابس تخصصی" : course.level)} {isPersian ? "" : "course"}
                    </span>
                    <h5 className={`text-xs font-bold font-sans leading-tight ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {course.title}
                    </h5>
                    <p className={`text-[11px] leading-normal mt-1 text-justify font-sans ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-500'}`}>
                      {course.description.substring(0, 100)}...
                    </p>
                    <div className="flex flex-wrap gap-1 mt-3" dir="ltr">
                      {course.topics.slice(0, 2).map((tag, tIdx) => (
                        <span key={tIdx} className="text-[8px] font-mono text-[#20c997] bg-[#20c997]/5 px-1.5 py-0.5 rounded border border-[#20c997]/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* === SECTION 4. PORTFOLIO === */}
          <section id="section-portfolio" className={`scroll-mt-16 lg:scroll-mt-10 space-y-12 pt-8 border-t ${isDarkMode ? 'border-[#191b22]/50' : 'border-slate-200'}`}>
            <div className="inline-block relative">
              <span className={`text-xs uppercase font-mono font-bold tracking-[0.25em] ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                {t.portfolioTitle}
              </span>
              <div className="w-8 h-[2px] bg-[#20c997] mt-1" />
            </div>

            {/* Interactive brain map highlight right here */}
            <div className="space-y-4 text-start">
              <h3 className={`text-lg font-bold font-sans ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                {isPersian ? "نقشه پویای راه پژوهشی" : "Interactive Research Map"}
              </h3>
              <p className={`text-xs leading-relaxed max-w-2xl font-sans ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-500'}`}>
                {isPersian 
                  ? "روی گره‌های مختلف یا مسیرهای ارتباط مغزی کلیک کنید تا ارتباط مدلسازی ریاضی من با ساختارهای بالینی را رهگیری کنید." 
                  : "Toggle active node vertices in the computer-aided graph below to trace Dr. Morteza Amini's computational biology, engineering, and psychology paths."}
              </p>
              <div className={`p-4 border rounded-2xl ${isDarkMode ? 'bg-[#090a0d]/30 border-[#191b22]' : 'bg-white border-slate-200/80 shadow-xs'}`}>
                <InteractiveBrain isDarkMode={isDarkMode} isPersian={isPersian} />
              </div>
            </div>

            {/* CV sheet download section */}
            <div className={`pt-8 border-t ${isDarkMode ? 'border-[#191b22]/50' : 'border-slate-200'}`}>
              <h3 className={`text-lg font-bold font-sans mb-4 text-start ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                {t.viewCVBtn}
              </h3>
              <PrintableCV isPersian={isPersian} isDarkMode={isDarkMode} />
            </div>
          </section>

          {/* === SECTION 5. BLOGS === */}
          <BlogsSection isPersian={isPersian} isDarkMode={isDarkMode} />

          {/* === SECTION 6. CONTACT ME === */}
          <section id="section-contact" className={`scroll-mt-24 lg:scroll-mt-12 space-y-12 pt-8 border-t pb-8 ${isDarkMode ? 'border-[#191b22]/50' : 'border-slate-200'}`}>
            
            {/* Title and line */}
            <div className="inline-block relative">
              <span className={`text-xs uppercase font-mono font-bold tracking-[0.25em] ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                {t.contactHeading}
              </span>
              <div className="w-8 h-[2px] bg-[#20c997] mt-1" />
            </div>

            {/* Clean responsive contact frame */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start text-start">
              
              {/* Left Side: Coordinates details */}
              <div className="md:col-span-12 lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <h3 className={`text-lg font-bold font-sans ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    {t.contactSectionTitle}
                  </h3>
                  <p className={`text-xs leading-relaxed text-justify font-sans ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-555'}`}>
                    {isPersian 
                      ? 'علاقه‌مند به مشاوره پیرامون بردهای تله‌متری مغزی، پایش بیماری‌های پارکینسون و آلزایمر، یا راهنمایی پایان‌نامه‌های دانشجویی هستید؟ پیام بگذارید.' 
                      : 'Interested in pre-clinical diagnostic partnerships, computational handwriting, cognitive testing, or postgraduate supervision? Leave a message.'}
                  </p>
                </div>

                {/* Coordinates stacked */}
                <div className="space-y-4 pt-2">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-[#20c997]/15 border border-[#20c997]/25 flex items-center justify-center text-[#20c997] shrink-0">
                      <MapPin className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className={`text-[10px] block font-mono ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-500'}`}>
                        {isPersian ? "نشانی پستی فیزیکی دپارتمان" : "PHYSICAL ADDRESS"}
                      </span>
                      <span className={`text-xs font-serif font-black leading-normal block mt-0.5 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                        {isPersian ? "دفتر کار استادیار پژوهشی، پژوهشکده علوم شناختی" : "Faculty Offices, ICSS"}
                      </span>
                      <span className={`text-[10px] block mt-0.5 font-sans ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-500'}`}>
                        {isPersian ? "تهران، شهر پردیس، پژوهشکده علوم شناختی" : "Institute for Cognitive Science Studies, Tehran, Iran"}
                      </span>
                    </div>
                  </div>

                  <div className={`flex gap-4 items-start border-t pt-4 ${isDarkMode ? 'border-[#191b22]/55' : 'border-slate-200'}`}>
                    <div className="w-10 h-10 rounded-lg bg-[#20c997]/15 border border-[#20c997]/25 flex items-center justify-center text-[#20c997] shrink-0">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className={`text-[10px] block font-mono ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-500'}`}>
                        {isPersian ? "ایمیل ارتباط مستقیم دپارتمان علمی" : "CORRESPONDING EMAIL"}
                      </span>
                      <a 
                        href="mailto:amini_m@icss.ac.ir"
                        className={`text-xs font-mono font-bold hover:text-[#20c997] transition-colors mt-0.5 block ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}
                      >
                        amini_m@icss.ac.ir
                      </a>
                      <span className="text-[9px] text-[#515359] block font-mono leading-none mt-1">
                        {isPersian ? "پاسخگویی معمولاً زیر ۴۸ ساعت کاری" : "Response delay: < 48 hours"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Photo upload frame for home avatar customizable */}
                <div className={`border rounded-xl p-5 space-y-4 ${
                  isDarkMode 
                    ? 'bg-[#090a0d] border-[#191b22]' 
                    : 'bg-white border-slate-200/80 shadow-sm'
                }`}>
                  <span className={`text-[10px] font-mono uppercase tracking-wider block border-b pb-2 ${
                    isDarkMode ? 'text-slate-500 border-[#191b22]' : 'text-slate-600 border-slate-100'
                  }`}>
                    {isPersian ? "شخصی‌سازی تصویر پروفایل استاد" : "Customize App Portrait"}
                  </span>
                  <p className={`text-[11px] leading-relaxed text-justify font-sans ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-500'}`}>
                    {isPersian 
                      ? "آیا مایل هستید تصویر رسمی خود را جایگزین کاریکاتور پیش‌فرض کنید؟ تصویر مناسب با تناسب مربع را آپلود کنید تا در کل سایت اعمال شود:" 
                      : "Would you like to replace the default sketch avatar with your own photo? Upload an image below to update pages:"}
                  </p>
                  <ProfileUpload />
                </div>
              </div>

              {/* Right Side: Say Something Form */}
              <div className={`md:col-span-12 lg:col-span-7 border rounded-xl p-6 sm:p-8 ${
                isDarkMode 
                  ? 'bg-[#090a0d] border-[#191b22]' 
                  : 'bg-white border-slate-200/80 shadow-md'
              }`}>
                <ContactForm isPersian={isPersian} isDarkMode={isDarkMode} />
              </div>

            </div>

          </section>

        </div>

        {/* CORE HIGH-POLISHED SUB-FOOTER */}
        <footer className={`border-t py-8 z-10 font-mono text-[9px] print:hidden text-center justify-center items-center ${
          isDarkMode 
            ? 'bg-[#090a0d] border-[#191b22] text-slate-500' 
            : 'bg-white border-slate-200 text-slate-500 shadow-inner'
        }`}>
          <div className="max-w-5xl mx-auto px-6 space-y-2.5">
            <p className="leading-relaxed">
              &copy; 2026 Dr. Morteza Amini Faculty Portfolio Website &bull; {isPersian ? "بر اساس استایل طراحی اختصاصی سرجیو. تمامی حقوق محفوظ است." : "Designed exactly in the Sergio design style. All rights reserved."}
            </p>
            <div className={`flex justify-center gap-4 ${isDarkMode ? 'text-[#515359]' : 'text-slate-400'}`}>
              <span>ICSS Computational Neuroscience Initiative</span>
              <span>&bull;</span>
              <span>Tehran University Faculty Coordinates</span>
            </div>
          </div>
        </footer>

      </main>

    </div>
  );
}
