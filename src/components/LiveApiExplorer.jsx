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
  AlertCircle,
  Database
} from 'lucide-react';
import { getOnePieceStats, searchCharacters, FALLBACK_ANIME_INFO } from '../services/jikanApi';
import { playWoodenClick, playShipBell } from '../utils/audio';

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
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e150f] border border-[#5d3b1e] text-cyan-400 text-xs font-serif uppercase tracking-widest mb-3">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Den Den Mushi Live Wire • Public MAL / Jikan API</span>
        </div>
        <h2 className="font-['Pirata_One'] text-4xl sm:text-5xl text-amber-300 tracking-wider">
          LIVE MARINEFORD INTELLIGENCE FEED
        </h2>
        <p className="text-sm sm:text-base text-[#bda78a] max-w-2xl mx-auto mt-2 font-serif">
          Query live real-time anime telemetry, ratings, and character profiles directly from the global MyAnimeList API network.
        </p>
      </div>

      {/* Live Status Indicator Banner */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#160f09] border border-[#482d16] mb-8 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isLiveConnected ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`}></span>
          <span className="text-amber-200">
            {isLiveConnected ? 'CONNECTED TO JIKAN V4 GLOBAL API' : 'OFFLINE HYBRID CACHE ACTIVE (Local Datasets Engaged)'}
          </span>
        </div>
        <span className="text-[#88745d] hidden sm:inline">MAL ANIME ID #21 • ONE PIECE</span>
      </div>

      {/* Global Anime Telemetry Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="p-4 rounded-xl bg-[#1b110a] border border-[#50341c] text-center">
          <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
          <div className="text-2xl font-mono font-bold text-amber-300">{stats.score || '8.73'}</div>
          <div className="text-[10px] text-[#9a856c] uppercase font-mono mt-0.5">MyAnimeList Score</div>
        </div>

        <div className="p-4 rounded-xl bg-[#1b110a] border border-[#50341c] text-center">
          <Tv className="w-5 h-5 text-amber-400 mx-auto mb-1" />
          <div className="text-2xl font-mono font-bold text-amber-300">{stats.episodes || '1,120+'}</div>
          <div className="text-[10px] text-[#9a856c] uppercase font-mono mt-0.5">Episodes Broadcast</div>
        </div>

        <div className="p-4 rounded-xl bg-[#1b110a] border border-[#50341c] text-center">
          <Globe className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
          <div className="text-2xl font-mono font-bold text-amber-300">#{stats.rank || '55'}</div>
          <div className="text-[10px] text-[#9a856c] uppercase font-mono mt-0.5">Global MAL Ranking</div>
        </div>

        <div className="p-4 rounded-xl bg-[#1b110a] border border-[#50341c] text-center">
          <Database className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
          <div className="text-2xl font-mono font-bold text-amber-300">{stats.status || 'Currently Airing'}</div>
          <div className="text-[10px] text-[#9a856c] uppercase font-mono mt-0.5">Broadcast Status</div>
        </div>
      </div>

      {/* Live Character Search Engine */}
      <div className="bg-[#191009] p-6 rounded-2xl border-2 border-[#54381e] shadow-xl mb-10">
        <h3 className="font-['Pirata_One'] text-2xl sm:text-3xl text-amber-300 mb-2 flex items-center gap-2">
          <Search className="w-5 h-5 text-amber-400" />
          <span>Live One Piece Character Registry Search</span>
        </h3>
        <p className="text-xs text-[#a79176] font-serif mb-4">
          Search for minor or major characters across the entire 25+ year One Piece universe (e.g. Yamato, Koby, Rayleigh, Bon Clay, Vegapunk, Rebecca, Enel).
        </p>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7258]" />
            <input
              type="text"
              placeholder="Search any One Piece character name (e.g. Yamato, Koby, Oden)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#23150d] border border-[#52351c] text-amber-100 placeholder-[#7c6650] text-sm focus:outline-none focus:border-amber-400"
            />
          </div>
          <button
            type="submit"
            disabled={searching}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 font-bold font-serif text-sm flex items-center gap-2 hover:brightness-110 disabled:opacity-50 transition-all shadow"
          >
            {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{searching ? 'Querying...' : 'Scan Intel'}</span>
          </button>
        </form>

        {/* Search Results Grid */}
        {searchResults.length > 0 && (
          <div className="mt-6 pt-6 border-t border-[#3c2514]">
            <div className="text-xs font-mono text-[#a28e75] uppercase font-bold mb-3">
              Received {searchResults.length} Live Marineford Hits:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {searchResults.map((item) => (
                <div
                  key={item.mal_id}
                  onClick={() => setSelectedChar(item)}
                  className="p-3.5 rounded-xl bg-[#24160d] border border-[#482e18] hover:border-amber-400 cursor-pointer transition-all flex items-center gap-3 group"
                >
                  {item.images?.jpg?.image_url ? (
                    <img
                      src={item.images.jpg.image_url}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover border border-[#59391e] shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-[#150c06] flex items-center justify-center text-xl shrink-0">
                      ☠️
                    </div>
                  )}

                  <div className="truncate">
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-amber-200 truncate group-hover:text-amber-100">
                      {item.name}
                    </h4>
                    <div className="text-[10px] text-[#937d65] font-mono truncate">
                      {item.name_kanji || 'One Piece Cast'}
                    </div>
                    <div className="text-[10px] text-amber-400 mt-1 flex items-center gap-1">
                      <span>Favorites: {item.favorites?.toLocaleString() || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Selected Live Character Dossier */}
      {selectedChar && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#23150c] to-[#170e08] border-2 border-amber-500/80 shadow-2xl relative">
          <button
            onClick={() => setSelectedChar(null)}
            className="absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded bg-[#352012] text-amber-300 hover:bg-red-950 hover:text-red-200"
          >
            ✕ Close
          </button>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {selectedChar.images?.jpg?.image_url && (
              <img
                src={selectedChar.images.jpg.image_url}
                alt={selectedChar.name}
                className="w-32 h-44 rounded-xl object-cover border-2 border-[#694522] shadow-lg shrink-0"
              />
            )}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-amber-400 font-bold">
                MyAnimeList Live Character Profile #{selectedChar.mal_id}
              </span>
              <h3 className="font-['Pirata_One'] text-3xl sm:text-4xl text-amber-200">
                {selectedChar.name}
              </h3>
              <div className="text-xs font-mono text-[#a48e75]">
                {selectedChar.name_kanji} • {selectedChar.nicknames?.join(', ') || 'Official Straw Hat World Member'}
              </div>
              <p className="text-xs text-[#cebc9f] font-serif leading-relaxed line-clamp-6">
                {selectedChar.about || 'Official character from Eiichiro Oda’s One Piece manga and anime adaptation.'}
              </p>
              {selectedChar.url && (
                <a
                  href={selectedChar.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold pt-1"
                >
                  <span>Open Full MAL Character Dossier</span>
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
