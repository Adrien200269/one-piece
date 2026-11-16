import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  ChevronDown, 
  ChevronUp, 
  Trophy, 
  Swords, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { SAGAS } from '../data/sagas';
import { playWoodenClick, playTreasureFanfare } from '../utils/audio';

export default function EpisodeGuide({ watchedSagas, setWatchedSagas }) {
  const [expandedSaga, setExpandedSaga] = useState('east-blue');
  const [filterMode, setFilterMode] = useState('all');

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
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Manga Chapter Guide Header */}
      <div className="border-b-4 border-white pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <div className="inline-block bg-white text-black text-xs font-mono font-black uppercase px-2 py-0.5 mb-2">
            単行本巻数一覧 • OFFICIAL MANGA SAGA LOG
          </div>
          <h2 className="font-['Bangers'] text-4xl sm:text-6xl text-white tracking-widest">
            SAGA & CHAPTER CANON GUIDE
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-serif max-w-2xl mt-1">
            Track your journey through all 11 epic sagas. Filter filler story arcs from the true canonical manga panels written and inked by Eiichiro Oda.
          </p>
        </div>
        <div className="font-['Bangers'] text-2xl text-white tracking-wider border-2 border-white px-3 py-1 bg-black">
          VOL. 1 – 108+
        </div>
      </div>

      {/* Manga Reading Progress Dashboard */}
      <div className="bg-black border-3 border-white p-6 shadow-[6px_6px_0px_#ffffff] mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border-3 border-white bg-white text-black flex items-center justify-center font-['Bangers'] text-2xl font-black">
              巻
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                MANGA SAGA ARCHIVE COMPLETION
              </div>
              <div className="font-['Bangers'] text-3xl sm:text-4xl text-white tracking-wider">
                {completedSagas} OF {totalSagas} SAGAS READ ({progressPercent}%)
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                playWoodenClick();
                setFilterMode(filterMode === 'all' ? 'canon-only' : 'all');
              }}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border-2 transition-all ${
                filterMode === 'canon-only'
                  ? 'bg-white text-black border-white shadow-[3px_3px_0px_#ffffff]'
                  : 'bg-black text-white border-neutral-600 hover:border-white'
              }`}
            >
              {filterMode === 'canon-only' ? '✓ CANON PANELS ONLY' : 'SHOW CANON ONLY'}
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
              className="px-3 py-1.5 text-xs font-mono font-bold uppercase bg-neutral-900 border-2 border-neutral-600 hover:border-white text-white"
            >
              {completedSagas === totalSagas ? 'RESET LOG' : 'MARK ALL READ'}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-neutral-900 border-2 border-white">
          <div 
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Sagas List */}
      <div className="space-y-4">
        {SAGAS.map((saga, index) => {
          const isExpanded = expandedSaga === saga.id;
          const isWatched = watchedSagas.includes(saga.id);

          return (
            <div
              key={saga.id}
              className={`border-3 transition-all ${
                isWatched 
                  ? 'bg-neutral-950 border-neutral-500 text-neutral-300' 
                  : 'bg-black border-white text-white shadow-[4px_4px_0px_#ffffff]'
              }`}
            >
              {/* Header */}
              <div
                onClick={() => toggleExpand(saga.id)}
                className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={(e) => toggleWatched(saga.id, e)}
                    className="mt-1 p-1 border-2 border-white text-white hover:bg-white hover:text-black transition-colors shrink-0"
                    title={isWatched ? "Mark saga as unread" : "Mark saga as read"}
                  >
                    {isWatched ? <CheckSquare className="w-5 h-5 fill-white text-black" /> : <Square className="w-5 h-5" />}
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-white text-black font-black uppercase">
                        SAGA #{index + 1}
                      </span>
                      <span className="text-xs font-mono text-neutral-400">
                        {saga.episodeRange}
                      </span>
                      <span className="text-[10px] font-mono border border-neutral-600 px-1.5 py-0.5">
                        {saga.badge}
                      </span>
                    </div>

                    <h3 className="font-['Bangers'] text-2xl sm:text-3xl tracking-wider">
                      {saga.title} <span className="font-['Shippori_Mincho_B1'] text-sm opacity-70">({saga.japaneseTitle})</span>
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end md:self-center font-mono text-xs">
                  <div>
                    <span className="font-black text-white">{saga.canonCount} CANON</span>
                    <span className="mx-1.5 text-neutral-600">/</span>
                    <span className="text-neutral-400">{saga.fillerCount} FILLER</span>
                  </div>
                  <div className="p-1 border border-white">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Manga Breakdown */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-3 border-t-2 border-white bg-black space-y-4">
                  <p className="text-sm text-neutral-300 font-serif leading-relaxed">
                    {saga.synopsis}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-white p-3.5 bg-neutral-950">
                      <div className="font-['Bangers'] text-sm tracking-wider text-white mb-1 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" />
                        <span>PRIMARY SAGA ANTAGONIST</span>
                      </div>
                      <div className="font-serif font-bold text-sm text-neutral-200">
                        {saga.keyVillain}
                      </div>
                    </div>

                    <div className="border-2 border-white p-3.5 bg-neutral-950">
                      <div className="font-['Bangers'] text-sm tracking-wider text-white mb-1 flex items-center gap-1.5">
                        <Swords className="w-4 h-4" />
                        <span>LEGENDARY MANGA CLASHES</span>
                      </div>
                      <ul className="text-xs space-y-1 font-mono text-neutral-300">
                        {saga.highlightFights.map((fight, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-white"></span>
                            <span>{fight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Arcs List */}
                  <div>
                    <div className="font-mono text-xs font-bold uppercase text-neutral-400 mb-2">
                      MANGA STORY ARCS IN THIS SAGA:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {saga.majorArcs
                        .filter((arc) => (filterMode === 'canon-only' ? !arc.filler : true))
                        .map((arc, i) => (
                          <div
                            key={i}
                            className={`p-2.5 border text-xs flex items-center justify-between font-mono ${
                              arc.filler
                                ? 'border-neutral-700 bg-neutral-950 text-neutral-500'
                                : 'border-white bg-black text-white'
                            }`}
                          >
                            <span className="truncate pr-2 font-bold">{arc.name}</span>
                            <span className="text-[10px] border border-white px-1 py-0.2 shrink-0">
                              {arc.filler ? 'FILLER' : `EP ${arc.episodes}`}
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
