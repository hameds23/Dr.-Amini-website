/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, GraduationCap, Check, ArrowUpRight, HelpCircle, ShieldAlert } from 'lucide-react';
import { TEACHING_COURSES, Course } from '../data';

export default function TeachingBento() {
  const [selectedCourse, setSelectedCourse] = useState<Course>(TEACHING_COURSES[0]);

  return (
    <div id="teaching-bento-container" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Left panel: Vertical lists of syllabus courses */}
      <div className="lg:col-span-5 flex flex-col space-y-2.5">
        <span className="text-[10px] uppercase tracking-widest text-amber-500 font-mono font-medium block">
          Courses &amp; Seminars
        </span>
        <h3 className="text-xl font-bold font-serif text-slate-100 mb-1 leading-tight">
          Educational Leadership
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-3">
          Conducting research-driven postgraduate instruction. Select an active course to review the curriculum structure.
        </p>

        <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
          {TEACHING_COURSES.map((course, idx) => {
            const isSelected = selectedCourse.title === course.title;
            return (
              <button
                key={idx}
                id={`course-select-${idx}`}
                onClick={() => setSelectedCourse(course)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 group ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/30 text-slate-100 shadow-md'
                    : 'bg-slate-950 border-slate-900/80 hover:border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="min-w-0">
                  <span className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    course.level === 'Core'
                      ? 'bg-blue-500/10 text-blue-400'
                      : course.level === 'Advanced'
                      ? 'bg-amber-500/15 text-amber-400'
                      : 'bg-purple-500/10 text-purple-400'
                  }`}>
                    {course.level} Module
                  </span>
                  <h4 className="text-xs sm:text-sm font-semibold font-serif mt-1.5 truncate group-hover:text-amber-500 transition-colors">
                    {course.title}
                  </h4>
                </div>
                <ArrowUpRight className={`w-4 h-4 shrink-0 transition-transform ${
                  isSelected ? 'text-amber-500 translate-x-0.5 -translate-y-0.5' : 'text-slate-600 group-hover:text-slate-400'
                }`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Right panel: Syllabus Detail showcase card */}
      <div className="lg:col-span-7 bg-slate-950 border border-slate-900 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
        {/* Abstract page background curl */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-slate-900 rounded-bl-[150px] border-l border-b border-slate-900/40 pointer-events-none" />
        <span className="absolute top-4 right-4 text-slate-800 text-5xl font-mono select-none font-extrabold index-num">
          0{TEACHING_COURSES.indexOf(selectedCourse) + 1}
        </span>

        <div>
          <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px] mb-2 uppercase">
            <GraduationCap className="w-4 h-4 text-amber-500" />
            <span>Graduate Syllabus</span>
          </div>

          <h3 id="selected-course-title" className="text-base sm:text-lg font-bold font-serif text-slate-100 max-w-[85%] leading-snug">
            {selectedCourse.title}
          </h3>

          <p id="selected-course-desc" className="text-xs text-slate-400 mt-3.5 leading-relaxed font-sans bg-slate-900/40 p-3 rounded-lg border border-slate-900">
            {selectedCourse.description}
          </p>

          <div className="mt-5 space-y-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Core Syllabus Units:</span>
            <div id="selected-course-topics" className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedCourse.topics.map((topic, tIdx) => (
                <div 
                  key={tIdx}
                  className="flex items-center gap-2 p-2 bg-slate-900/60 border border-slate-900/80 rounded-lg text-xs text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span className="font-mono tracking-wide">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Short footer callout */}
        <div className="mt-6 pt-4 border-t border-slate-900/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Lecturer: Dr. Morteza Amini</span>
          <span className="text-amber-500/80">Postgraduate Level</span>
        </div>

      </div>

    </div>
  );
}
