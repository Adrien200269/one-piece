import React, { useState } from 'react';
import { 
  Play, 
  Film, 
  Volume2, 
  Sparkles, 
  Maximize2, 
  Tv, 
  Flame, 
  X, 
  ChevronRight,
  Disc,
  Radio
} from 'lucide-react';
import { 
  playWoodenClick, 
  playHakiPulse, 
  playCannonBlast, 
  playShipBell, 
  playTreasureFanfare 
} from '../utils/audio';

const TRAILERS = [
  {
    id: 'egghead',
    title: 'Egghead Island Arc • Official Climax Trailer',
    saga: 'Final Saga (Egghead Island)',
    youtubeId: '0v5z5j9KzI4', // One Piece Egghead trailer
    duration: '2:15',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    description: 'Dr. Vegapunk’s Island of the Future faces total annihilation as the World Government unleashes the Buster Call and the Five Elders descend.'
  },
  {
    id: 'gear5',
    title: 'Luffy Gear 5 Sun God Nika Debut • Peak Anime',
    saga: 'Wano Country Saga (Episode 1071-1072)',
    youtubeId: 'MCb13lbKpsk', // Gear 5 teaser
    duration: '3:40',
    thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    description: 'The Drums of Liberation echo across Onigashima! Joy Boy has returned in the climax battle against Emperor Kaido.'
  },
  {
    id: 'film-red',
    title: 'One Piece Film: Red • Official International Trailer',
    saga: 'Movie Special / Uta & Red-Haired Shanks',
    youtubeId: '89JWRYEIG-s',
    duration: '1:58',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    description: 'The world’s greatest diva Uta performs on the music island of Elegia, harboring a secret that connects her to Shanks.'
  },
  {
    id: 'marineford',
    title: 'Summit War at Marineford • The Legacy of Whitebeard',
    saga: 'Summit War Saga (Classic Arc)',
    youtubeId: 'eLEbSgUfB8k',
    duration: '2:45',
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    description: 'The era-shattering battle between the Whitebeard Pirates and Marine Headquarters to save Fire Fist Ace.'
  }
];

const RECENT_EPISODES = [
  { ep: 1120, title: "The World in Turmoil! The World Government's Dark Truth", airDate: "Recent Airing", rating: "9.9/10" },
  { ep: 1119, title: "Meeting with Vegapunk! Future Technology Unveiled", airDate: "Recent Airing", rating: "9.7/10" },
  { ep: 1118, title: "The Holy Land Shaken! Sabo's Revelation", airDate: "Recent Airing", rating: "9.8/10" },
  { ep: 1117, title: "Kuzan vs. Garp! Teacher and Student Clash at Hachinosu", airDate: "Recent Airing", rating: "9.9/10" },
  { ep: 1116, title: "Cross Guild Mobilizes! The World Turns Upside Down", airDate: "Recent Airing", rating: "9.6/10" }
];

export default function StreamingHub() {
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [activeEp, setActiveEp] = useState(RECENT_EPISODES[0]);
  const [activeSound, setActiveSound] = useState('');

  const playEffect = (name, fn) => {
    setActiveSound(name);
    fn();
    setTimeout(() => setActiveSound(''), 800);
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#27170e] border border-[#6b4221] text-red-400 text-xs font-serif uppercase tracking-widest mb-3">
          <Film className="w-3.5 h-3.5 text-red-500" />
          <span>Toei Animation & Crunchyroll Anime Cinema</span>
        </div>
        <h2 className="font-['Pirata_One'] text-4xl sm:text-5xl text-amber-300 tracking-wider">
          GRAND LINE STREAMING THEATRE
        </h2>
        <p className="text-sm sm:text-base text-[#bda78a] max-w-2xl mx-auto mt-2 font-serif">
          Experience breathtaking official anime trailers, climactic Gear 5 battles, episode preview logs, and authentic pirate soundscapes.
        </p>
      </div>

      {/* Featured Big Stage Player */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#21150c] to-[#110a06] border-2 border-[#664323] p-6 sm:p-8 shadow-2xl mb-10 overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Visual Display */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-[#54381e] bg-stone-900 group shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              {/* Background Backdrop */}
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${TRAILERS[0].thumbnail})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              </div>

              {/* Play Trigger */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => {
                    playHakiPulse();
                    setSelectedTrailer(TRAILERS[0]);
                  }}
                  className="w-20 h-20 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-[0_0_35px_rgba(220,38,38,0.7)] group-hover:scale-110 transition-all duration-300"
                >
                  <Play className="w-8 h-8 fill-white ml-1" />
                </button>
              </div>

              {/* Bottom Badges */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-600 text-stone-950 uppercase">
                    FEATURED ARC
                  </span>
                  <div className="text-base sm:text-lg font-bold font-serif text-amber-200 mt-1">
                    {TRAILERS[0].title}
                  </div>
                </div>
                <span className="text-xs font-mono bg-black/60 px-2.5 py-1 rounded border border-white/20">
                  {TRAILERS[0].duration}
                </span>
              </div>
            </div>
          </div>

          {/* Player Metadata & Episode Queue */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
              <Tv className="w-4 h-4 text-amber-400" />
              <span>Simulated Anime Episode Player</span>
            </div>

            <h3 className="font-['Pirata_One'] text-3xl text-amber-200">
              Episode {activeEp.ep}: {activeEp.title}
            </h3>

            <p className="text-xs text-[#bca587] font-serif leading-relaxed">
              Broadcast nationwide on Fuji TV & streaming globally on Crunchyroll. Subbed & Dubbed with ultra high-definition 4K master sound.
            </p>

            <div className="p-3.5 rounded-xl bg-[#170e08] border border-[#482e18] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#867055]">User Reception</span>
                <div className="text-lg font-bold font-mono text-amber-400">{activeEp.rating} MAL</div>
              </div>
              <button
                onClick={() => {
                  playHakiPulse();
                  setSelectedTrailer(TRAILERS[1]);
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-700 to-red-600 hover:brightness-110 text-white font-bold text-xs flex items-center gap-2 shadow"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Play Episode Teaser</span>
              </button>
            </div>

            {/* Quick Episode Selector list */}
            <div className="space-y-1.5 pt-2">
              <div className="text-[11px] font-mono text-[#8a745c] uppercase font-bold">
                Latest Broadcast Episodes:
              </div>
              {RECENT_EPISODES.map((ep) => (
                <div
                  key={ep.ep}
                  onClick={() => {
                    playWoodenClick();
                    setActiveEp(ep);
                  }}
                  className={`p-2 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                    activeEp.ep === ep.ep
                      ? 'bg-amber-950/40 border-amber-500/60 text-amber-200 font-bold'
                      : 'bg-[#1a1009] border-[#3e2714] text-[#a9957a] hover:bg-[#28180e]'
                  }`}
                >
                  <span className="truncate pr-2 font-serif">Ep {ep.ep}: {ep.title}</span>
                  <span className="text-[10px] text-amber-400 font-mono shrink-0">{ep.rating}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Trailers Gallery */}
      <div className="mb-12">
        <h3 className="font-['Pirata_One'] text-3xl text-amber-300 mb-4 flex items-center gap-2">
          <Film className="w-6 h-6 text-amber-400" />
          <span>Cinematic Climax Trailers & Movie Previews</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRAILERS.map((trailer) => (
            <div
              key={trailer.id}
              onClick={() => {
                playHakiPulse();
                setSelectedTrailer(trailer);
              }}
              className="bg-[#1a110a] rounded-xl border border-[#4d3219] overflow-hidden hover:border-amber-400 transition-all duration-200 hover:-translate-y-1 cursor-pointer group shadow-lg flex flex-col justify-between"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={trailer.thumbnail}
                  alt={trailer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 text-[10px] font-mono bg-black/70 px-1.5 py-0.5 rounded text-white">
                  {trailer.duration}
                </span>
              </div>

              <div className="p-3.5">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold">
                  {trailer.saga}
                </span>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-amber-200 leading-snug line-clamp-2 mt-1">
                  {trailer.title}
                </h4>
                <p className="text-[11px] text-[#9b856b] font-serif line-clamp-2 mt-1.5">
                  {trailer.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pirate Sound FX Synthesizer Board */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#21150c] via-[#2c1a0f] to-[#21150c] border-2 border-[#664323] shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <Radio className="w-5 h-5 text-amber-400" />
          <h3 className="font-['Pirata_One'] text-2xl sm:text-3xl text-amber-300">
            GRAND LINE SOUNDBOARD & HAKI FX
          </h3>
        </div>
        <p className="text-xs text-[#b8a487] font-serif mb-4">
          Synthesized live using the Web Audio API. Trigger iconic anime audio cues and Conqueror’s Haki resonance directly in your browser.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => playEffect('Haki', playHakiPulse)}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
              activeSound === 'Haki'
                ? 'bg-amber-500 text-stone-950 font-bold scale-95'
                : 'bg-[#180e07] border-[#4c3118] text-amber-200 hover:bg-[#341d0f]'
            }`}
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-serif font-bold">Conqueror's Haki Pulse</span>
            <span className="text-[10px] text-amber-400/70 font-mono">Drums of Liberation</span>
          </button>

          <button
            onClick={() => playEffect('Cannon', playCannonBlast)}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
              activeSound === 'Cannon'
                ? 'bg-red-600 text-white font-bold scale-95'
                : 'bg-[#180e07] border-[#4c3118] text-amber-200 hover:bg-[#341d0f]'
            }`}
          >
            <Flame className="w-5 h-5 text-red-500" />
            <span className="text-xs font-serif font-bold">Marine Cannonade</span>
            <span className="text-[10px] text-red-400/70 font-mono">Buster Call Boom</span>
          </button>

          <button
            onClick={() => playEffect('Bell', playShipBell)}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
              activeSound === 'Bell'
                ? 'bg-yellow-500 text-stone-950 font-bold scale-95'
                : 'bg-[#180e07] border-[#4c3118] text-amber-200 hover:bg-[#341d0f]'
            }`}
          >
            <Disc className="w-5 h-5 text-yellow-400" />
            <span className="text-xs font-serif font-bold">Golden Bell of Shandora</span>
            <span className="text-[10px] text-yellow-400/70 font-mono">Nautical Ship Bell</span>
          </button>

          <button
            onClick={() => playEffect('Treasure', playTreasureFanfare)}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
              activeSound === 'Treasure'
                ? 'bg-emerald-500 text-stone-950 font-bold scale-95'
                : 'bg-[#180e07] border-[#4c3118] text-amber-200 hover:bg-[#341d0f]'
            }`}
          >
            <Volume2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-serif font-bold">Treasure Fanfare</span>
            <span className="text-[10px] text-emerald-400/70 font-mono">One Piece Discovered</span>
          </button>
        </div>
      </div>

      {/* Embedded YouTube Trailer Modal */}
      {selectedTrailer && (
        <div 
          onClick={() => setSelectedTrailer(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1a1009] rounded-2xl border-4 border-[#6d4623] max-w-4xl w-full p-4 sm:p-6 relative shadow-2xl"
          >
            <button
              onClick={() => setSelectedTrailer(null)}
              className="absolute -top-3 -right-3 p-2 rounded-full bg-red-700 text-white hover:bg-red-600 transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-[#482e18]">
              <iframe
                src={`https://www.youtube.com/embed/${selectedTrailer.youtubeId}?autoplay=1&rel=0`}
                title={selectedTrailer.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase font-bold">{selectedTrailer.saga}</span>
                <h4 className="font-['Pirata_One'] text-2xl text-amber-200">{selectedTrailer.title}</h4>
              </div>
              <button
                onClick={() => setSelectedTrailer(null)}
                className="px-4 py-2 rounded-lg bg-[#3a2313] text-amber-200 text-xs font-bold hover:bg-[#4d301c]"
              >
                Close Cinema
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
