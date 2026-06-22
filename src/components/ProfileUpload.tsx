/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Camera, Upload, Check, RefreshCw, Sparkles } from 'lucide-react';

export default function ProfileUpload() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [filter, setFilter] = useState<'none' | 'mono' | 'warm'>('none');
  const [isDragging, setIsDragging] = useState(false);

  // Load image from localStorage on mount (for persistent personal feel)
  useEffect(() => {
    const savedImg = localStorage.getItem('dr_amini_profile_photo');
    if (savedImg) {
      setImageSrc(savedImg);
    }
    const savedFilter = localStorage.getItem('dr_amini_profile_filter');
    if (savedFilter && (savedFilter === 'none' || savedFilter === 'mono' || savedFilter === 'warm')) {
      setFilter(savedFilter);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          setImageSrc(e.target.result);
          localStorage.setItem('dr_amini_profile_photo', e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const changeFilter = (newFilter: 'none' | 'mono' | 'warm') => {
    setFilter(newFilter);
    localStorage.setItem('dr_amini_profile_filter', newFilter);
  };

  const resetPhoto = () => {
    if (window.confirm('Reset profile image back to default neural avatar?')) {
      setImageSrc(null);
      localStorage.removeItem('dr_amini_profile_photo');
      localStorage.removeItem('dr_amini_profile_filter');
      setFilter('none');
    }
  };

  // Class for filters
  const getFilterClass = () => {
    switch (filter) {
      case 'mono':
        return 'grayscale contrast-115 brightness-95';
      case 'warm':
        return 'sepia-[0.15] saturate-[1.15] contrast-105 brightness-100';
      default:
        return 'contrast-100 brightness-100';
    }
  };

  return (
    <div id="profile-upload-container" className="flex flex-col items-center">
      <div 
        id="profile-frame-dropzone"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border-2 transition-all duration-300 shadow-xl group ${
          isDragging 
            ? 'border-amber-400 scale-[1.02] shadow-[0_0_20px_rgba(245,158,11,0.25)]' 
            : 'border-slate-800 hover:border-slate-700 shadow-slate-950/40'
        }`}
      >
        {imageSrc ? (
          <>
            {/* User uploaded image */}
            <img 
              id="morteza-amini-custom-avatar"
              src={imageSrc} 
              alt="Dr. Morteza Amini" 
              className={`w-full h-full object-cover transition-all duration-300 ${getFilterClass()}`}
            />
            {/* Subtle glow grid overlay */}
            <div id="neural-glow-mesh-overlay" className="absolute inset-0 bg-radial-gradient from-transparent to-slate-950/30 pointer-events-none mix-blend-overlay" />
          </>
        ) : (
          /* Default exquisite abstract SVG portrait combining science/mind themes */
          <div id="default-portrait-canvas" className="w-full h-full bg-slate-900 flex flex-col items-center justify-center relative p-6">
            {/* Background Neural Grid */}
            <svg id="ambient-neural-svg" className="absolute inset-0 w-full h-full text-slate-800/40" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
                <radialGradient id="radial-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              <rect width="100%" height="100%" fill="url(#radial-glow)" />
              {/* Connected neural nodes lines */}
              <path d="M 40,60 L 100,50 L 160,70 L 220,55" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 80,180 L 140,150 L 200,190" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 140,150 L 100,240 L 40,220" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="100" cy="50" r="3" fill="#d97706" className="animate-pulse" />
              <circle cx="160" cy="70" r="2.5" fill="#3b82f6" />
              <circle cx="140" cy="150" r="4" fill="#3b82f6" className="animate-ping [animation-duration:3s]" />
              <circle cx="140" cy="150" r="3.5" fill="#d97706" />
              <circle cx="100" cy="240" r="3" fill="#10b981" />
            </svg>

            {/* Premium Scholar Vector Outline */}
            <div id="author-silhouette" className="relative z-10 w-40 h-40 flex items-center justify-center text-slate-400 bg-slate-950/50 rounded-full border border-slate-800/80 p-1">
              <svg className="w-32 h-32 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {/* Hair & head */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z" />
                {/* Suit suit/collar */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 15.25a7.5 7.5 0 00-10.5 0M9.5 21v-3.75a3 3 0 016 0V21M6.5 21h11" />
                {/* Mathematical network circles around head representing focus */}
                <circle cx="4" cy="9" r="1.5" fill="#d97706" />
                <line x1="4" y1="9" x2="7" y2="9" stroke="#d97706" strokeWidth="0.5" />
                <circle cx="20" cy="9" r="1.5" fill="#d97706" />
                <line x1="20" y1="9" x2="17" y2="9" stroke="#d97706" strokeWidth="0.5" />
              </svg>
            </div>
            
            {/* Core titles in empty space */}
            <span id="placeholder-help" className="mt-4 text-xs font-mono tracking-wider text-amber-500 uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 animate-spin [animation-duration:10s]" /> Neural Brain Mesh
            </span>
            <p id="placeholder-drag-label" className="text-[10px] text-slate-500 text-center px-4 mt-1 leading-normal">
              Drag &amp; drop Dr. Amini&apos;s picture here to load it instantly.
            </p>
          </div>
        )}

        {/* Hover drag overlay or standard trigger utility */}
        <div id="upload-hover-overlay" className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-4">
          <Upload className="w-8 h-8 text-amber-500 mb-2 animate-bounce" />
          <p className="text-xs font-mono font-medium text-slate-200 text-center">
            {imageSrc ? 'Replace Portrait' : 'Drop Dr. Amini\'s Picture'}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">or click to select photo</p>
          <input 
            id="hidden-avatar-selector"
            type="file" 
            accept="image/*"
            onChange={onFileSelect}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Control Tools for Photo */}
      <div id="profile-controls-panel" className="mt-4 flex flex-col items-center w-full max-w-sm">
        {imageSrc ? (
          <div id="image-editing-controls" className="space-y-3 w-full text-center">
            {/* Filter buttons */}
            <div className="flex justify-center gap-1.5 p-1 bg-slate-950/70 border border-slate-800/80 rounded-lg">
              <button
                id="filter-original"
                onClick={() => changeFilter('none')}
                className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all ${
                  filter === 'none' 
                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30' 
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                Original
              </button>
              <button
                id="filter-monochrome"
                onClick={() => changeFilter('mono')}
                className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all ${
                  filter === 'mono' 
                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30' 
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                Academic Portrait (B&amp;W)
              </button>
              <button
                id="filter-warm"
                onClick={() => changeFilter('warm')}
                className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all ${
                  filter === 'warm' 
                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30' 
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                Warm Studio Glow
              </button>
            </div>

            {/* Reset button */}
            <button
              id="reset-original-avatar-btn"
              onClick={resetPhoto}
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-xs font-mono transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset to Default Avatar
            </button>
          </div>
        ) : (
          <p id="interactivity-hint" className="text-[10px] sm:text-xs text-slate-400 font-mono text-center flex items-center gap-1">
            <Camera className="w-3.5 h-3.5 text-amber-500/80" /> Interactive Profile Card
          </p>
        )}
      </div>
    </div>
  );
}
