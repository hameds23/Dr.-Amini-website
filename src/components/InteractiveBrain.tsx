/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Brain, Cpu, Activity, User, BookOpen, ExternalLink, Award } from 'lucide-react';
import { PUBLICATIONS, EDUCATION_DATA } from '../data';

interface BrainNode {
  id: string;
  name: string;
  category: string;
  description: string;
  color: string;
  glow: string;
  coordinates: { x: number; y: number };
  thesisTitle?: string;
  university?: string;
  iconName: 'Cpu' | 'Brain' | 'Activity' | 'User' | 'BookOpen';
  linkedPubs: string[];
}

const BRAIN_NODES: BrainNode[] = [
  {
    id: "node-ee",
    name: "Electrical Engineering",
    category: "Electronics & Signal Processing",
    description: "Built the quantitative foundation. Studied electronic circuitry, analog/digital filters, computer-aided pattern detection, and biological signal capture.",
    color: "bg-blue-500",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.6)] text-blue-400 border-blue-500/30",
    coordinates: { x: 18, y: 35 },
    thesisTitle: "Detection of anxiety from handwriting with computer-aided processing systems",
    university: "Tarbiat Modares University",
    iconName: "Cpu",
    linkedPubs: ["pub-5", "pub-7"]
  },
  {
    id: "node-psych",
    name: "General Psychology",
    category: "Cognitive States & Human Behavior",
    description: "Bridged quantitative models with subjective science. Studied clinical behaviors, executive functions, interpersonal dynamics, and how physiological stressors impact mental speed.",
    color: "bg-purple-500",
    glow: "shadow-[0_0_15px_rgba(168,85,247,0.6)] text-purple-400 border-purple-500/30",
    coordinates: { x: 38, y: 78 },
    thesisTitle: "Effect of acute/gradual weight loss on cognitive functions and mood states",
    university: "University of Tehran",
    iconName: "User",
    linkedPubs: ["pub-5", "pub-7"]
  },
  {
    id: "node-model",
    name: "Cognitive Modeling",
    category: "Ph.D. Academic Pinnacle",
    description: "The core synthesis! Math-modeling cognitive structures, simulating human problem-solving, attention parameters, and regional grey-matter threshold mathematics.",
    color: "bg-amber-600",
    glow: "shadow-[0_0_15px_rgba(217,119,6,0.6)] text-amber-500 border-amber-600/30",
    coordinates: { x: 50, y: 45 },
    thesisTitle: "Early detection of Alzheimer's through structural-cognitive brain changes",
    university: "Shahid Beheshti University (PhD)",
    iconName: "Brain",
    linkedPubs: ["pub-3", "pub-4", "pub-6"]
  },
  {
    id: "node-ai",
    name: "Artificial Intelligence",
    category: "Computational Deep Learning & Fusion",
    description: "Designing neural networks, custom convolutional classifiers, deep feature grids, and multimodal data-fusion models (biometric + spatial).",
    color: "bg-yellow-500",
    glow: "shadow-[0_0_15px_rgba(234,179,8,0.6)] text-yellow-400 border-yellow-500/30",
    coordinates: { x: 82, y: 35 },
    thesisTitle: "Early diagnosis of Parkinson's Disease via novel multimodal fusion tech",
    university: "Institute for Cognitive Science Studies (ICSS)",
    iconName: "Activity",
    linkedPubs: ["pub-1", "pub-2", "pub-3", "pub-4"]
  },
  {
    id: "node-neuro",
    name: "Computational Neuroscience",
    category: "Neural Dynamics & Medical Imaging",
    description: "Translating engineering, psychology, and AI algorithms into diagnostic medical tools mapping fMRI, EEG signal complexity, and Surface Plasmon Biosensors.",
    color: "bg-teal-500",
    glow: "shadow-[0_0_15px_rgba(20,184,166,0.6)] text-teal-400 border-teal-500/30",
    coordinates: { x: 74, y: 72 },
    thesisTitle: "Early prediction of Alzheimer's Disease via intelligent processing frameworks",
    university: "Shahid Beheshti University (Post-Doc)",
    iconName: "BookOpen",
    linkedPubs: ["pub-1", "pub-2", "pub-5", "pub-6", "pub-7"]
  }
];

const BRAIN_NODES_EN: BrainNode[] = BRAIN_NODES;

const BRAIN_NODES_FA: BrainNode[] = [
  {
    id: "node-ee",
    name: "مهندسی برق",
    category: "الکترونیک و پردازش سیگنال",
    description: "پایه ریاضیاتی و کمی سیستم‌ها. مطالعه مدارهای الکترونیکی، فیلترهای آنالوگ و دیجیتال، بازشناسی بیومتریک الگوها و ثبت سیگنال‌های زیستی.",
    color: "bg-blue-500",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.6)] text-blue-400 border-blue-500/30",
    coordinates: { x: 18, y: 35 },
    thesisTitle: "تشخیص میزان اضطراب از روی دست‌خط به کمک سیستم‌های پردازش کامپیوتری",
    university: "دانشگاه تربیت مدرس",
    iconName: "Cpu",
    linkedPubs: ["pub-5", "pub-7"]
  },
  {
    id: "node-psych",
    name: "روانشناسی عمومی",
    category: "حالات شناختی و رفتارشناسی انسان",
    description: "پیوند مدل‌های محاسباتی ریاضی با علوم توصیفی ذهن. تحلیل رفتارهای بالینی، پایش کارکردهای اجرایی مغز و تأثیر استرس بر سرعت پردازش ذهنی.",
    color: "bg-purple-500",
    glow: "shadow-[0_0_15px_rgba(168,85,247,0.6)] text-purple-400 border-purple-500/30",
    coordinates: { x: 38, y: 78 },
    thesisTitle: "بررسی اثر کاهش وزن سریع و تدریجی بر کارکردهای شناختی و حالات خلقی ورزشکاران",
    university: "دانشگاه تهران",
    iconName: "User",
    linkedPubs: ["pub-5", "pub-7"]
  },
  {
    id: "node-model",
    name: "مدلسازی شناختی",
    category: "نقطه اوج تحصیلی دکتری تخصصی",
    description: "تلفیق اصیل همگرایی ذهن، مغز و ریاضیات! شبیه‌سازی عددی فرآیندهای تصمیم‌گیری، پارامترهای توجه مغز، و محاسبات واکنش شبکه‌های خاکستری مغز.",
    color: "bg-amber-600",
    glow: "shadow-[0_0_15px_rgba(217,119,6,0.6)] text-amber-500 border-amber-600/30",
    coordinates: { x: 50, y: 45 },
    thesisTitle: "تشخیص زودهنگام بیماری آلزایمر بر اساس تغییرات پویای ساختاری-شناختی مغز",
    university: "دانشگاه شهید بهشتی (مقطع دکتری)",
    iconName: "Brain",
    linkedPubs: ["pub-3", "pub-4", "pub-6"]
  },
  {
    id: "node-ai",
    name: "هوش مصنوعی",
    category: "یادگیری عمیق محاسباتی و تلفیق سنسورها",
    description: "طراحی شبکه‌های بیومتریک پپلاین، دسته‌بندی‌کننده‌های پیچشی داده‌ها، استخراج فیچرهای عمیق پنهان و الگوهای چندگانه سنسوری.",
    color: "bg-yellow-500",
    glow: "shadow-[0_0_15px_rgba(234,179,8,0.6)] text-yellow-400 border-yellow-500/30",
    coordinates: { x: 82, y: 35 },
    thesisTitle: "سیستم هوشمند تشخیص زودهنگام بیماری پارکینسون به کمک تلفیق سنسورهای حرکتی بیومتریک",
    university: "پژوهشکده علوم شناختی (ICSS)",
    iconName: "Activity",
    linkedPubs: ["pub-1", "pub-2", "pub-3", "pub-4"]
  },
  {
    id: "node-neuro",
    name: "علوم اعصاب محاسباتی",
    category: "پویش‌های عصبی و تصویربرداری بالینی",
    description: "انتقال الگوریتم‌های هوش مصنوعی و مدل‌های مهندسی به ابزارهای تشخیصی پیش‌کلینیکی با تحلیل سیگنال‌های fMRI و EEG مغزی انسان.",
    color: "bg-teal-500",
    glow: "shadow-[0_0_15px_rgba(20,184,166,0.6)] text-teal-400 border-teal-500/30",
    coordinates: { x: 74, y: 72 },
    thesisTitle: "پیش‌بینی ساختارمند بیماری آلزایمر به کمک چارچوب‌های محاسباتی سیگنال‌های شناختی",
    university: "دانشگاه شهید بهشتی (دوره پسادکتری پژوهشی)",
    iconName: "BookOpen",
    linkedPubs: ["pub-1", "pub-2", "pub-5", "pub-6", "pub-7"]
  }
];

interface InteractiveBrainProps {
  isDarkMode?: boolean;
  isPersian?: boolean;
}

export default function InteractiveBrain({ isDarkMode = true, isPersian = false }: InteractiveBrainProps) {
  const nodes = isPersian ? BRAIN_NODES_FA : BRAIN_NODES_EN;
  const [selectedNodeId, setSelectedNodeId] = useState<string>("node-model");

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[2];

  const getIcon = (type: string, className: string) => {
    switch (type) {
      case 'Cpu':
        return <Cpu className={className} />;
      case 'User':
        return <User className={className} />;
      case 'Activity':
        return <Activity className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      default:
        return <Brain className={className} />;
    }
  };

  return (
    <div 
      id="interactive-brain-card" 
      className={`rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden transition-all border ${
        isDarkMode 
          ? 'bg-[#090a0d] border-[#191b22] text-slate-100' 
          : 'bg-white border-slate-200/80 text-slate-850'
      }`}
    >
      {/* Background radial highlight */}
      <div className={`absolute top-0 right-0 w-80 h-80 rounded-full filter blur-[80px] pointer-events-none ${isDarkMode ? 'bg-amber-500/5' : 'bg-amber-500/3'}`} />
      <div className={`absolute bottom-0 left-0 w-80 h-80 rounded-full filter blur-[80px] pointer-events-none ${isDarkMode ? 'bg-blue-500/5' : 'bg-blue-500/3'}`} />

      {/* Header and short instructions */}
      <div className="mb-6 mb-6">
        <span className="text-[10px] uppercase tracking-widest text-[#20c997] font-mono font-medium block mb-1">
          {isPersian ? "معماری همگرای پژوهشی" : "Active Research Architecture"}
        </span>
        <h3 className={`text-base sm:text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
          <Brain className="w-5 h-5 text-[#20c997] animate-pulse" /> 
          {isPersian ? "پرتفوی هوشمند پیوند تخصص‌ها" : "Interdisciplinary Brain Map"}
        </h3>
        <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {isPersian 
            ? "این دیاگرام پویا، نقطه تلاقی مطالعات پژوهشی دکتر مرتضی امینی در حوزه‌های فنی مهندسی و علوم شناختی را به تصویر می‌کشد."
            : "Dr. Amini's scholarship resolves the dual challenge of brain and mind. Click on the neural pathways below to trace how his various faculties fuse together."}
        </p>
      </div>

      {/* Split layout: SVG Brain projection (Left/Top) + Information display (Right/Bottom) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* SVG Node Graph panel */}
        <div className={`lg:col-span-12 xl:col-span-7 border rounded-xl p-4 flex justify-center items-center relative aspect-[4/3] w-full min-h-[260px] sm:min-h-[320px] ${
          isDarkMode 
            ? 'bg-slate-950/40 border-slate-900/60' 
            : 'bg-slate-50 border-slate-200'
        }`}>
          {/* Subtle brain background drawing */}
          <svg className={`absolute inset-0 w-full h-full select-none pointer-events-none p-4 ${isDarkMode ? 'text-slate-800/15' : 'text-slate-300/30'}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M 50,15 C 30,15 15,25 15,50 C 15,65 25,75 35,80 C 40,82 45,85 50,85 C 55,85 60,82 65,80 C 75,75 85,65 85,50 C 85,25 70,15 50,15 Z" 
              stroke="currentColor" 
              strokeWidth="0.5" 
              strokeDasharray="2 3" 
            />
            {/* Brain fold curls */}
            <path d="M 50,15 L 50,55" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
            <path d="M 25,45 C 35,45 35,55 50,55" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
            <path d="M 75,45 C 65,45 65,55 50,55" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
            <path d="M 30,30 C 40,35 45,35 50,45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
            <path d="M 70,30 C 60,35 55,35 50,45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
          </svg>

          {/* Animated SVG Lines connecting nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {nodes.map((node, i) => {
              const matchesSelected = node.id === selectedNode.id;
              return nodes.slice(i + 1).map((targetNode) => {
                const isConnectionSelected = matchesSelected || targetNode.id === selectedNode.id;
                return (
                  <line
                    key={`${node.id}-${targetNode.id}`}
                    x1={`${node.coordinates.x}%`}
                    y1={`${node.coordinates.y}%`}
                    x2={`${targetNode.coordinates.x}%`}
                    y2={`${targetNode.coordinates.y}%`}
                    stroke={isConnectionSelected ? '#20c997' : (isDarkMode ? '#1f2937' : '#e2e8f0')}
                    strokeWidth={isConnectionSelected ? '1.25' : '0.5'}
                    strokeOpacity={isConnectionSelected ? '0.85' : '0.3'}
                    className={isConnectionSelected ? 'stroke-[#20c997] animate-pulse' : ''}
                  />
                );
              });
            })}
          </svg>

          {/* Floating nodes */}
          {nodes.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-300 focus:outline-none z-10 cursor-pointer ${
                  isSelected 
                    ? `border-[#20c997] scale-110 z-20 ${isDarkMode ? 'bg-slate-900' : 'bg-white shadow-lg'} shadow-[#20c997]/25` 
                    : `hover:border-[#20c997]/50 hover:scale-105 ${
                        isDarkMode 
                          ? 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200' 
                          : 'border-slate-200 bg-white text-slate-500 hover:text-slate-800'
                      }`
                }`}
                title={node.name}
              >
                {getIcon(node.iconName, `w-4.5 h-4.5 ${isSelected ? 'text-[#20c997] scale-110' : ''}`)}
                
                {/* Custom node tooltips directly on layout */}
                <span className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 px-1.5 py-0.5 rounded text-[9px] font-mono whitespace-nowrap tracking-tight transition-opacity border ${
                  isSelected 
                    ? 'opacity-100 text-[#20c997] bg-[#20c997]/10 border-[#20c997]/25' 
                    : (isDarkMode ? 'opacity-60 text-slate-500 bg-slate-900 border-slate-850' : 'opacity-75 text-slate-600 bg-white border-slate-200')
                }`}>
                  {node.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic description block */}
        <div className={`lg:col-span-12 xl:col-span-5 flex flex-col justify-between h-full border rounded-xl p-5 min-h-[220px] ${
          isDarkMode 
            ? 'bg-[#090a0d] border-[#191b22]' 
            : 'bg-slate-50 border-slate-200 shadow-sm'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 px-2 rounded bg-[#20c997]/10 text-[#20c997] font-mono text-[9px] uppercase tracking-wider border border-[#20c997]/20">
                {selectedNode.category}
              </span>
            </div>
            
            <h4 id="node-detail-title" className={`text-base font-bold font-serif ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              {selectedNode.name}
            </h4>

            <p id="node-detail-desc" className={`text-xs mt-2 leading-relaxed text-justify ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {selectedNode.description}
            </p>

            {selectedNode.thesisTitle && (
              <div id="node-thesis-box" className={`mt-4 p-3 rounded-lg border ${
                isDarkMode 
                  ? 'border-[#191b22] bg-slate-950/60' 
                  : 'border-slate-200 bg-white shadow-xs'
              }`}>
                <div className="flex items-start gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#20c997] mt-0.5 shrink-0" />
                  <div>
                    <span className={`text-[10px] font-mono block ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      {isPersian ? "پایان‌نامه / فیلد پژوهشی اصلی:" : "THESIS / RESEARCH STUDY:"}
                    </span>
                    <span className={`text-xs leading-snug tracking-wide italic block mt-0.5 font-serif ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
                      &ldquo;{selectedNode.thesisTitle}&rdquo;
                    </span>
                    <span className={`text-[9px] font-mono block mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      {selectedNode.university}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={`mt-4 pt-3 border-t ${isDarkMode ? 'border-slate-800/60' : 'border-slate-200'}`}>
            <span className={`text-[9px] font-mono block mb-1.5 ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-500'}`}>
              {isPersian ? "انتشارات مرتبط با موضوع:" : "CONNECTED PUBLICATIONS:"}
            </span>
            <div className="flex flex-wrap gap-1">
              {selectedNode.linkedPubs.map((pubId) => {
                const matchedPub = PUBLICATIONS.find(p => p.id === pubId);
                if (!matchedPub) return null;
                return (
                  <a
                    key={pubId}
                    href={`#${pubId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(pubId);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        element.classList.add('ring-2', 'ring-[#20c997]/40');
                        setTimeout(() => {
                          element.classList.remove('ring-2', 'ring-[#20c997]/40');
                        }, 2500);
                      }
                    }}
                    className="inline-flex items-center gap-1 text-[10px] font-mono text-[#20c997] hover:text-[#20e9a7] bg-[#20c997]/5 hover:bg-[#20c997]/15 border border-[#20c997]/10 hover:border-[#20c997]/30 px-2 py-0.5 rounded transition-all"
                  >
                    {matchedPub.journal} ({matchedPub.year})
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
