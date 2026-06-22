/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Filter, BookOpen, ExternalLink, Quote, Copy, Check, Calendar } from 'lucide-react';
import { PUBLICATIONS, Publication } from '../data';

export default function PublicationsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedBibtex, setExpandedBibtex] = useState<string | null>(null);

  // Derive unique tags for filtering based on lists
  const allTags = ['All', 'Alzheimer\'s', 'EEG Signals', 'Biosensors', 'Machine Learning'];

  const filterPublications = () => {
    return PUBLICATIONS.filter((pub) => {
      // Filter by search text
      const matchesSearch = 
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.journal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.snippet.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by tag
      if (selectedTag === 'All') return matchesSearch;
      
      const matchesTag = pub.tags.some(t => {
        if (selectedTag === "Alzheimer's") return t.includes("Alzheimer");
        if (selectedTag === "EEG Signals") return t.includes("EEG");
        if (selectedTag === "Biosensors") return t.includes("Biosensor");
        if (selectedTag === "Machine Learning") return t.includes("Machine Learning") || t.includes("CNN");
        return t.toLowerCase() === selectedTag.toLowerCase();
      });

      return matchesSearch && matchesTag;
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleBibtex = (id: string) => {
    if (expandedBibtex === id) {
      setExpandedBibtex(null);
    } else {
      setExpandedBibtex(id);
    }
  };

  const filteredPubs = filterPublications();

  return (
    <div id="publications-container" className="space-y-6">
      
      {/* Search and Filters Block */}
      <div id="pub-search-filter-controls" className="bg-slate-950 border border-slate-900 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-lg">
        
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            id="pub-search-input"
            type="text"
            placeholder="Search titles, authors, journals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
          />
        </div>

        {/* Categories togglers */}
        <div id="pub-category-chips" className="flex flex-wrap gap-1.5 justify-center md:justify-end w-full md:w-auto">
          {allTags.map((tag) => (
            <button
              key={tag}
              id={`filter-button-${tag.toLowerCase().replace(/[^a-z]/g, '')}`}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 text-[10px] sm:text-xs font-mono rounded-md border transition-all ${
                selectedTag === tag
                  ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200 bg-transparent border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Publications Listing Grid */}
      <div id="publications-grid" className="space-y-4">
        {filteredPubs.length > 0 ? (
          filteredPubs.map((pub) => {
            const isBibtexOpen = expandedBibtex === pub.id;
            const isCopied = copiedId === pub.id;
            
            return (
              <div
                key={pub.id}
                id={pub.id}
                className="group relative bg-slate-950 border border-slate-900/80 hover:border-slate-800 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Horizontal progress bar highlighting year */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-transparent group-hover:via-amber-500/40 transition-all duration-500" />
                
                {/* Top header row */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-slate-500 font-mono text-[10px] mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      <BookOpen className="w-3 h-3 text-amber-500/80" />
                      {pub.journal}
                    </span>
                    {pub.volumeAndPages && (
                      <span className="text-slate-600 hidden sm:inline">{pub.volumeAndPages}</span>
                    )}
                  </div>
                  
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-900 text-amber-500">
                    <Calendar className="w-3 h-3" />
                    {pub.year}
                  </span>
                </div>

                {/* Main publication Title */}
                <h4 className="text-sm sm:text-base font-serif font-semibold text-slate-100 tracking-wide hover:text-amber-500 transition-colors leading-relaxed">
                  <a href={pub.doi} target="_blank" rel="noopener noreferrer" className="inline-flex items-baseline gap-1.5 group-hover:underline">
                    {pub.title}
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-500 align-middle shrink-0 ml-1" />
                  </a>
                </h4>

                {/* Authors list */}
                <p className="mt-2 text-xs font-serif text-slate-400 italic">
                  {pub.authors}
                </p>

                {/* Brief description snippet */}
                <p className="mt-3 text-xs text-slate-400 leading-relaxed bg-slate-900/30 p-2.5 rounded-lg border border-slate-900/60 font-sans">
                  {pub.snippet}
                </p>

                {/* Taxonomy tags and action buttons row */}
                <div className="mt-4 pt-3 border-t border-slate-900/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 gap-y-2">
                  <div className="flex flex-wrap gap-1">
                    {pub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-slate-900/70 border border-slate-800 text-[9px] font-mono tracking-tight text-slate-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      onClick={() => toggleBibtex(pub.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono rounded border transition-colors ${
                        isBibtexOpen
                          ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                          : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border-slate-800'
                      }`}
                    >
                      <Quote className="w-3 h-3" />
                      {isBibtexOpen ? 'Hide BibTeX' : 'Cite (BibTeX)'}
                    </button>
                    
                    <a
                      href={pub.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono rounded bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      DOI Link
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Toggleable BibTeX citation panel */}
                {isBibtexOpen && (
                  <div className="mt-4 p-3 bg-slate-900 border border-slate-800/80 rounded-lg relative animate-fade-in">
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <button
                        onClick={() => copyToClipboard(pub.bibtex, pub.id)}
                        className="p-1.5 rounded bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800/60 hover:border-slate-700 transition-colors"
                        title="Copy BibTeX code"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block mb-2">BibTeX Citation Code:</span>
                    <pre className="text-[10px] leading-relaxed font-mono p-2 pr-10 bg-slate-950 rounded-md overflow-x-auto text-slate-300 border border-slate-900 max-h-40">
                      {pub.bibtex}
                    </pre>
                  </div>
                )}

              </div>
            );
          })
        ) : (
          <div className="text-center py-10 bg-slate-950 border border-slate-900 rounded-xl">
            <span className="text-slate-600 block text-3xl mb-1">🔍</span>
            <p className="text-xs font-mono text-slate-500">
              No publications matching &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedTag}&rdquo; found.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
