import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Search, 
  Globe, 
  Sparkles, 
  ExternalLink, 
  Tv, 
  Star, 
  Loader2, 
  Database
} from 'lucide-react';
import { getOnePieceStats, searchCharacters, FALLBACK_ANIME_INFO } from '../services/jikanApi';
import { playWoodenClick } from '../utils/audio';

export default function LiveApiExplorer() {
  const [stats, setStats] = useState(FALLBACK_ANIME_INFO);
  const [loadingStats, setLoadingStats] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedChar, setSelectedChar] = useState(null);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  useEffect(() => {
    let mounted = true;
    getOnePieceStats().then((data) => {
      if (mounted) {
        setStats(data);
        setLoadingStats(false);
        setIsLiveConnected(data !== FALLBACK_ANIME_INFO);
      }
    });
    return () => { mounted = false; };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    playWoodenClick();
    setSearching(true);
    const results = await searchCharacters(searchQuery);
    setSearchResults(results);
    setSearching(false);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="border-b-4 border-white pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <div className="inline-block bg-white text-black text-xs font-mono font-black uppercase px-2 py-0.5 mb-2">
            通信電伝虫 • DEN DEN MUSHI INTELLIGENCE WIRE
          </div>
          <h2 className="font-['Bangers'] text-4xl sm:text-6xl text-white tracking-widest">
            LIVE MANGA TELEMETRY & CAST SCAN
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-serif max-w-2xl mt-1">
            Query live real-time manga and anime statistics, global MAL ratings, and minor characters across 25+ years of One Piece history.
          </p>
        </div>
        <div className="font-['Bangers'] text-2xl text-white tracking-wider border-2 border-white px-3 py-1 bg-black">
          PRRR-PRRR!! プルプル
        </div>
      </div>

      {/* Connection Banner */}
      <div className="flex items-center justify-between p-3.5 bg-black border-2 border-white mb-8 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-white border border-black animate-pulse"></span>
          <span className="font-bold text-white uppercase">
            {isLiveConnected ? 'DEN DEN MUSHI LINKED TO GLOBAL API WIRE' : 'OFFLINE MANGA ARCHIVE CACHE ACTIVE'}
          </span>
        </div>
        <span className="text-neutral-400 hidden sm:inline">MAL DATABASE ID #21</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="border-3 border-white p-4 bg-black text-center shadow-[4px_4px_0px_#ffffff]">
          <div className="font-['Bangers'] text-3xl text-white">{stats.score || '8.73'}</div>
          <div className="text-[10px] text-neutral-400 font-mono font-bold uppercase mt-0.5">MAL GLOBAL SCORE</div>
        </div>

        <div className="border-3 border-white p-4 bg-black text-center shadow-[4px_4px_0px_#ffffff]">
          <div className="font-['Bangers'] text-3xl text-white">{stats.episodes || '1,120+'}</div>
          <div className="text-[10px] text-neutral-400 font-mono font-bold uppercase mt-0.5">BROADCAST CHAPTERS</div>
        </div>

        <div className="border-3 border-white p-4 bg-black text-center shadow-[4px_4px_0px_#ffffff]">
          <div className="font-['Bangers'] text-3xl text-white">#{stats.rank || '55'}</div>
          <div className="text-[10px] text-neutral-400 font-mono font-bold uppercase mt-0.5">ALL-TIME RANKING</div>
        </div>

        <div className="border-3 border-white p-4 bg-black text-center shadow-[4px_4px_0px_#ffffff]">
          <div className="font-['Bangers'] text-2xl text-white truncate">{stats.status || 'Ongoing'}</div>
          <div className="text-[10px] text-neutral-400 font-mono font-bold uppercase mt-0.5">SERIALIZATION</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="manga-box p-6 mb-10 bg-black">
        <h3 className="font-['Bangers'] text-2xl text-white tracking-widest mb-2 flex items-center gap-2">
          <Search className="w-5 h-5" />
          <span>QUERY ANY MANGA CHARACTER (E.G. YAMATO, KOBY, ODEN, REBECCA)</span>
        </h3>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search any One Piece character name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border-2 border-white text-white font-mono text-sm focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={searching}
            className="px-6 py-2.5 bg-white text-black font-['Bangers'] text-lg tracking-wider border-2 border-black hover:bg-neutral-200 transition-colors"
          >
            {searching ? 'QUERYING...' : 'DISPATCH!'}
          </button>
        </form>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-6 pt-6 border-t-2 border-white">
            <div className="text-xs font-mono text-neutral-400 uppercase font-bold mb-3">
              RECEIVED {searchResults.length} MANGA TELEGRAPH HITS:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {searchResults.map((item) => (
                <div
                  key={item.mal_id}
                  onClick={() => setSelectedChar(item)}
                  className="manga-box-paper p-3 flex items-center gap-3 cursor-pointer select-none"
                >
                  {item.images?.jpg?.image_url && (
                    <img
                      src={item.images.jpg.image_url}
                      alt={item.name}
                      className="w-14 h-14 border border-black object-cover manga-ink-img shrink-0"
                    />
                  )}
                  <div className="truncate">
                    <h4 className="font-['Bangers'] text-lg text-black leading-tight truncate">
                      {item.name}
                    </h4>
                    <div className="text-[10px] font-mono text-neutral-600 truncate">
                      {item.name_kanji || 'Manga Cast'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Selected Dossier */}
      {selectedChar && (
        <div className="manga-box p-6 relative bg-black">
          <button
            onClick={() => setSelectedChar(null)}
            className="absolute top-4 right-4 px-2 py-1 bg-white text-black font-mono font-bold text-xs"
          >
            ✕ CLOSE
          </button>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {selectedChar.images?.jpg?.image_url && (
              <img
                src={selectedChar.images.jpg.image_url}
                alt={selectedChar.name}
                className="w-32 h-44 border-3 border-white object-cover manga-ink-img shrink-0"
              />
            )}
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-neutral-400">
                MAL MANGA PROFILE #{selectedChar.mal_id}
              </span>
              <h3 className="font-['Bangers'] text-3xl sm:text-4xl text-white tracking-widest">
                {selectedChar.name}
              </h3>
              <div className="font-mono text-xs text-neutral-300">
                {selectedChar.name_kanji} • {selectedChar.nicknames?.join(', ') || 'One Piece Canon Cast'}
              </div>
              <p className="text-xs text-neutral-300 font-serif leading-relaxed line-clamp-6">
                {selectedChar.about || 'Official character from Eiichiro Oda’s One Piece manga.'}
              </p>
              {selectedChar.url && (
                <a
                  href={selectedChar.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-white font-mono font-bold underline pt-1"
                >
                  <span>Open Full MAL Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
