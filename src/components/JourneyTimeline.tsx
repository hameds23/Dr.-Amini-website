/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GraduationCap, Briefcase, Calendar, Award, CheckCircle, PlusCircle, MinusCircle } from 'lucide-react';
import { EDUCATION_DATA, TIMELINE_EVENTS, TimelineEvent } from '../data';

export default function JourneyTimeline() {
  const [expandedEventId, setExpandedEventId] = useState<number | null>(0); // Default first item expanded

  const getIcon = (type: string) => {
    switch (type) {
      case 'academic':
        return <Briefcase className="w-4 h-4 text-amber-500" />;
      case 'fellowship':
        return <Award className="w-4 h-4 text-emerald-500" />;
      default:
        return <GraduationCap className="w-4 h-4 text-blue-500" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'academic': return 'border-amber-500/40';
      case 'fellowship': return 'border-emerald-500/40';
      default: return 'border-blue-500/40';
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-amber-500/10';
      case 'fellowship': return 'bg-emerald-500/10';
      default: return 'bg-blue-500/10';
    }
  };

  return (
    <div id="timeline-component" className="grid grid-cols-1 md:grid-cols-12 gap-8">
      
      {/* Short Context Intro Column */}
      <div className="md:col-span-4 space-y-4">
        <span className="text-[10px] uppercase tracking-widest text-amber-500 font-mono font-medium block">
          Academic Track Record
        </span>
        <h3 className="text-xl font-bold font-serif text-slate-100 leading-snug">
          Dual-Specialized Research Career
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Dr. Amini possesses a unique combination of extreme analytical quantitative skills in electronics and advanced clinical psychological training. 
        </p>
        <p className="text-xs text-slate-500 leading-relaxed font-sans">
          This hybrid academic profile allows him to craft computational modeling algorithms that are both mathematically state-of-the-art and biologically/psychologically accurate.
        </p>

        {/* Education Credentials quick grid */}
        <div className="pt-4 border-t border-slate-900/60 space-y-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Academic Credentials:</span>
          {EDUCATION_DATA.map((edu, idx) => (
            <div key={idx} className="p-3 bg-slate-950 border border-slate-900 rounded-lg text-xs space-y-1">
              <div className="flex justify-between items-center text-slate-500 font-mono text-[9px]">
                <span>{edu.degree}</span>
                <span className="text-amber-500/90">{edu.year}</span>
              </div>
              <h5 className="font-semibold text-slate-200 text-xs font-serif leading-tight">{edu.major}</h5>
              <p className="text-[10px] text-slate-400 font-sans">{edu.institution}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Interactive Chronological Timeline Column */}
      <div className="md:col-span-8 relative">
        {/* Continuous center timeline bar */}
        <div className="absolute left-6 top-4 bottom-4 w-[1px] bg-slate-800" />

        <div className="space-y-6">
          {TIMELINE_EVENTS.map((event, idx) => {
            const isExpanded = expandedEventId === idx;
            return (
              <div 
                key={idx} 
                className="relative pl-12 group transition-all"
              >
                {/* Outer bullet circle */}
                <div 
                  onClick={() => setExpandedEventId(isExpanded ? null : idx)}
                  className={`absolute left-3.5 top-1.5 w-6 h-6 rounded-full border bg-slate-950 flex items-center justify-center cursor-pointer transition-all z-10 ${
                    isExpanded 
                      ? `${getBorderColor(event.type)} ring-4 ring-slate-950 scale-110 shadow-[0_0_10px_rgba(245,158,11,0.15)]` 
                      : 'border-slate-800 group-hover:border-slate-600'
                  }`}
                >
                  {getIcon(event.type)}
                </div>

                {/* Event header item */}
                <div 
                  onClick={() => setExpandedEventId(isExpanded ? null : idx)}
                  className="cursor-pointer select-none"
                >
                  <div className="flex items-center justify-between gap-2.5">
                    <span className="text-[10px] sm:text-xs font-mono text-amber-500 font-medium">
                      {event.year}
                    </span>
                    <button className="text-slate-600 hover:text-slate-400 transition-colors">
                      {isExpanded ? (
                        <MinusCircle className="w-4 h-4 text-slate-600 group-hover:text-amber-500/80" />
                      ) : (
                        <PlusCircle className="w-4 h-4 text-slate-700 group-hover:text-amber-500/80" />
                      )}
                    </button>
                  </div>

                  <h4 className="text-sm sm:text-base font-semibold text-slate-200 mt-1 font-serif group-hover:text-amber-500 transition-colors leading-tight">
                    {event.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans tracking-wide">
                    {event.subtitle}
                  </p>
                </div>

                {/* Expanded details container */}
                {isExpanded && (
                  <div className="mt-3.5 p-4 rounded-xl border border-slate-900 bg-slate-950/60 shadow-inner space-y-3 animate-fade-in">
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {event.description}
                    </p>

                    <div className="space-y-1.5 pt-2.5 border-t border-slate-900/80">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Key Accomplishments:</span>
                      <ul className="space-y-1.5">
                        {event.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="text-xs text-slate-400 flex items-start gap-2 leading-relaxed">
                            <CheckCircle className="w-3.5 h-3.5 text-amber-500/80 mt-0.5 shrink-0" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
