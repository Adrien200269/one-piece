import React, { useState } from 'react';
import { 
  Scroll, 
  CheckCircle, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Swords, 
  Filter, 
  AlertCircle,
  Trophy,
  Check
} from 'lucide-react';
import { SAGAS } from '../data/sagas';
import { playWoodenClick, playTreasureFanfare, playShipBell } from '../utils/audio';

export default function EpisodeGuide({ watchedSagas, setWatchedSagas }) {
  const [expandedSaga, setExpandedSaga] = useState('east-blue');
  const [filterMode, setFilterMode] = useState('all'); // 'all' or 'canon-only'

  const toggleWatched = (sagaId, e) => {
    e.stopPropagation();
    const isNowWatched = !watchedSagas.includes(sagaId);
    if (isNowWatched) {
      playTreasureFanfare();
    } else {
      playWoodenClick();
    }

    setWatchedSagas((prev) => {
      const next = isNowWatched ? [...prev, sagaId] : prev.filter((id) => id !== sagaId);
      localStorage.setItem('op_watched_sagas', JSON.stringify(next));
      return next;
    });
  };

  const toggleExpand = (sagaId) => {
    playWoodenClick();
    setExpandedSaga(expandedSaga === sagaId ? null : sagaId);
  };

  const totalSagas = SAGAS.length;
  const completedSagas = watchedSagas.length;
  const progressPercent = Math.round((completedSagas / totalSagas) * 100);

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#27190f] border border-[#644122] text-amber-400 text-xs font-serif uppercase tracking-widest mb-3">
          <Scroll className="w-3.5 h-3.5 text-amber-500" />
          <span>The Complete Grand Line Journey • 1999 to Present</span>
        </div>
        <h2 className="font-['Pirata_One'] text-4xl sm:text-5xl text-amber-300 tracking-wider">
          SAGA & EPISODE GUIDE • CANON TRACKER
        </h2>
        <p className="text-sm sm:text-base text-[#bda78a] max-w-2xl mx-auto mt-2 font-serif">
          Navigate all 11 grand sagas. Easily filter out filler episodes, review historic clash summaries, and record your personal voyage progress.
        </p>
      </div>

      {/* Progress & Voyage Log Pose Meter */}
      <div className="bg-gradient-to-r from-[#2a1b11] via-[#1f130b] to-[#2a1b11] p-6 rounded-2xl border-2 border-[#664525] shadow-xl mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-300">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#a99477]">
                Grand Line Log Pose Progress
              </div>
              <div className="font-['Pirata_One'] text-2xl sm:text-3xl text-amber-300">
                {completedSagas} of {totalSagas} Sagas Conquered ({progressPercent}%)
              </div>
            </div>
          </div>

          {/* Quick Mark All or Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                playWoodenClick();
                setFilterMode(filterMode === 'all' ? 'canon-only' : 'all');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                filterMode === 'canon-only'
                  ? 'bg-amber-600 text-stone-950 border-amber-400'
                  : 'bg-[#21140b] text-amber-300 border-[#50351d] hover:bg-[#342013]'
              }`}
            >
              {filterMode === 'canon-only' ? '✓ Showing Canon Only' : 'Show Canon Only'}
            </button>

            <button
              onClick={() => {
                const allIds = SAGAS.map(s => s.id);
                const next = completedSagas === totalSagas ? [] : allIds;
                if (next.length > 0) playTreasureFanfare();
                else playWoodenClick();
                setWatchedSagas(next);
                localStorage.setItem('op_watched_sagas', JSON.stringify(next));
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#321e11] hover:bg-[#482b19] text-amber-200 border border-[#5d3b1f]"
            >
              {completedSagas === totalSagas ? 'Reset Voyage' : 'Mark All Conquered'}
            </button>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="w-full h-3 bg-[#130b06] rounded-full overflow-hidden border border-[#4d3219] relative">
          <div 
            className="h-full bg-gradient-to-r from-amber-600 via-yellow-500 to-red-500 transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Sagas Accordion List */}
      <div className="space-y-4">
        {SAGAS.map((saga, index) => {
          const isExpanded = expandedSaga === saga.id;
          const isWatched = watchedSagas.includes(saga.id);

          return (
            <div
              key={saga.id}
              className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                isWatched 
                  ? 'bg-[#1e150e] border-[#5e4125]' 
                  : 'bg-[#170e08] border-[#442c17] hover:border-[#634224]'
              }`}
            >
              {/* Accordion Header */}
              <div
                onClick={() => toggleExpand(saga.id)}
                className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start gap-4">
                  {/* Mark Watched Toggle Button */}
                  <button
                    onClick={(e) => toggleWatched(saga.id, e)}
                    title={isWatched ? "Mark saga as unwatched" : "Mark saga as conquered"}
                    className={`mt-1 p-1 rounded-full transition-transform hover:scale-110 shrink-0 ${
                      isWatched ? 'text-emerald-400' : 'text-stone-500 hover:text-amber-400'
                    }`}
                  >
                    {isWatched ? (
                      <CheckCircle className="w-6 h-6 fill-emerald-950 text-emerald-400" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#2b1b11] text-amber-400 font-bold border border-[#523720]">
                        Saga #{index + 1}
                      </span>
                      <span className="text-xs text-[#a38d72] font-mono">
                        {saga.episodeRange}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800">
                        {saga.badge}
                      </span>
                    </div>

                    <h3 className="font-['Pirata_One'] text-2xl sm:text-3xl text-amber-200 flex items-center gap-2">
                      <span>{saga.title}</span>
                      <span className="text-sm font-sans font-normal text-[#867055]">({saga.japaneseTitle})</span>
                    </h3>
                  </div>
                </div>

                {/* Right summary badges */}
                <div className="flex items-center gap-4 self-end md:self-center">
                  <div className="text-right text-xs">
                    <span className="text-emerald-400 font-bold">{saga.canonCount} Canon</span>
                    <span className="text-[#7d674f] mx-1">•</span>
                    <span className="text-red-400 font-bold">{saga.fillerCount} Filler</span>
                  </div>

                  <div className="p-2 rounded-lg bg-[#271a10] border border-[#4c3119] text-amber-300">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Accordion Expanded Content */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-[#3b2413] bg-[#120a05] space-y-4">
                  
                  {/* Synopsis */}
                  <p className="text-sm text-[#cebc9f] font-serif leading-relaxed">
                    {saga.synopsis}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Arch Villain */}
                    <div className="p-3.5 rounded-xl bg-[#1d120a] border border-[#442c17]">
                      <div className="text-xs uppercase font-bold text-red-400 tracking-wider mb-1 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span>Primary Adversary</span>
                      </div>
                      <div className="text-sm font-bold text-amber-200 font-serif">
                        {saga.keyVillain}
                      </div>
                    </div>

                    {/* Legendary Battles */}
                    <div className="p-3.5 rounded-xl bg-[#1d120a] border border-[#442c17]">
                      <div className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-1 flex items-center gap-1.5">
                        <Swords className="w-4 h-4 text-amber-500" />
                        <span>Iconic Clashes</span>
                      </div>
                      <ul className="text-xs text-[#b8a489] font-serif space-y-1">
                        {saga.highlightFights.map((fight, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-amber-400"></span>
                            <span>{fight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Major Arcs Table */}
                  <div className="pt-2">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#988165] mb-2">
                      Story Arcs & Filler Status Breakdown:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {saga.majorArcs
                        .filter((arc) => (filterMode === 'canon-only' ? !arc.filler : true))
                        .map((arc, i) => (
                          <div
                            key={i}
                            className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                              arc.filler
                                ? 'bg-red-950/20 border-red-900/40 text-red-300'
                                : 'bg-[#1e130b] border-[#432a16] text-amber-100'
                            }`}
                          >
                            <span className="font-serif font-medium truncate pr-2">{arc.name}</span>
                            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ${
                              arc.filler 
                                ? 'bg-red-900/60 text-red-200' 
                                : 'bg-amber-900/40 text-amber-300'
                            }`}>
                              Ep {arc.episodes}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}
