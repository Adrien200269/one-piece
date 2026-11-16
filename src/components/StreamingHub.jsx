import React, { useState } from 'react';
import { 
  Play, 
  Film, 
  Volume2, 
  Sparkles, 
  Tv, 
  X, 
  Radio,
  Flame,
  Zap,
  Disc
} from 'lucide-react';
import { 
  playWoodenClick, 
  playHakiPulse, 
  playCannonBlast, 
  playShipBell, 
  playTreasureFanfare 
} from '../utils/audio';

const MANGA_TRAILERS = [
  {
    id: 'egghead',
    title: 'Egghead Island Arc • Climax Teaser',
    chapterRef: 'Ch. 1060 – 1120+ (Future Science Island)',
    youtubeId: '0v5z5j9KzI4',
    duration: '2:15',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    description: 'Dr. Vegapunk’s Island of the Future faces total annihilation as the World Government unleashes the Buster Call and the Five Elders descend.'
  },
  {
    id: 'gear5',
    title: 'Gear 5 Sun God Nika • Climax Awakening',
    chapterRef: 'Ch. 1044: Warrior of Liberation',
    youtubeId: 'MCb13lbKpsk',
    duration: '3:40',
    thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    description: 'The Drums of Liberation echo across Onigashima! Joy Boy has returned in the climax battle against Emperor Kaido.'
  },
  {
    id: 'film-red',
    title: 'One Piece Film: Red • Official Manga Feature',
    chapterRef: 'Ch. 1055 Tie-In / Red Hair Shanks',
    youtubeId: '89JWRYEIG-s',
    duration: '1:58',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    description: 'The world’s greatest diva Uta performs on the music island of Elegia, harboring a secret that connects her to Shanks.'
  },
  {
    id: 'marineford',
    title: 'The Summit War at Marineford',
    chapterRef: 'Ch. 550 – 580: The Paramount War',
    youtubeId: 'eLEbSgUfB8k',
    duration: '2:45',
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    description: 'The era-shattering clash between the Whitebeard Pirates and Marine Headquarters to save Fire Fist Ace.'
  }
];

export default function StreamingHub() {
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [activeSound, setActiveSound] = useState('');

  const playEffect = (name, fn) => {
    setActiveSound(name);
    fn();
    setTimeout(() => setActiveSound(''), 600);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Manga Cinema Header */}
      <div className="border-b-4 border-white pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <div className="inline-block bg-white text-black text-xs font-mono font-black uppercase px-2 py-0.5 mb-2">
            映像化資料館 • ADAPTATIONAL CINEMA VAULT
          </div>
          <h2 className="font-['Bangers'] text-4xl sm:text-6xl text-white tracking-widest">
            MANGA CINEMA & SOUNDBOARD
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-serif max-w-2xl mt-1">
            Experience high-definition anime trailers and live-synthesized manga sound effects directly in black-and-white comic cells.
          </p>
        </div>
        <div className="font-['Bangers'] text-2xl text-white tracking-wider border-2 border-white px-3 py-1 bg-black">
          DON!! ドン!!
        </div>
      </div>

      {/* Featured Big Stage Player */}
      <div className="manga-box p-6 mb-10 bg-black">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Visual Display */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video border-4 border-white overflow-hidden bg-neutral-950 group">
              <img
                src={MANGA_TRAILERS[0].thumbnail}
                alt="Featured Manga Trailer"
                className="w-full h-full object-cover manga-ink-img scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  onClick={() => {
                    playHakiPulse();
                    setSelectedTrailer(MANGA_TRAILERS[0]);
                  }}
                  className="w-20 h-20 bg-white text-black border-4 border-black flex items-center justify-center font-['Bangers'] text-3xl shadow-[5px_5px_0px_#ffffff] group-hover:scale-110 transition-transform"
                >
                  <Play className="w-8 h-8 fill-black ml-1 text-black" />
                </button>
              </div>
              <div className="absolute bottom-2 left-2 bg-black/90 border border-white px-3 py-1 text-white font-['Bangers'] text-sm tracking-wider">
                FEATURED SPREAD: {MANGA_TRAILERS[0].title}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-block bg-white text-black font-mono font-black text-xs px-2 py-0.5">
              THE CLIMAX OF EGGHEAD
            </div>
            
            <h3 className="font-['Bangers'] text-3xl sm:text-4xl text-white tracking-widest">
              {MANGA_TRAILERS[0].title}
            </h3>

            <p className="text-xs text-neutral-300 font-serif leading-relaxed">
              {MANGA_TRAILERS[0].description}
            </p>

            <div className="p-3 border-2 border-white bg-neutral-950 font-mono text-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-400">CHAPTER SOURCE</span>
                <div className="font-bold text-white mt-0.5">{MANGA_TRAILERS[0].chapterRef}</div>
              </div>
              <button
                onClick={() => {
                  playHakiPulse();
                  setSelectedTrailer(MANGA_TRAILERS[1]);
                }}
                className="px-4 py-2 bg-white text-black font-['Bangers'] text-sm tracking-wider border-2 border-black hover:bg-neutral-200"
              >
                PLAY GEAR 5
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Manga Climax Trailers Grid */}
      <div className="mb-12">
        <h3 className="font-['Bangers'] text-3xl text-white tracking-widest mb-4">
          MANGA CINEMATIC PREVIEWS
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MANGA_TRAILERS.map((trailer) => (
            <div
              key={trailer.id}
              onClick={() => {
                playHakiPulse();
                setSelectedTrailer(trailer);
              }}
              className="manga-box-paper p-3 flex flex-col justify-between cursor-pointer group select-none"
            >
              <div className="relative aspect-video border-2 border-black overflow-hidden bg-black mb-2">
                <img
                  src={trailer.thumbnail}
                  alt={trailer.title}
                  className="w-full h-full object-cover manga-ink-img group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white text-black border-2 border-black flex items-center justify-center">
                    <Play className="w-5 h-5 fill-black ml-0.5 text-black" />
                  </div>
                </div>
              </div>

              <div>
                <span className="font-mono text-[9px] font-black uppercase text-neutral-600">
                  {trailer.chapterRef}
                </span>
                <h4 className="font-['Bangers'] text-lg text-black tracking-wide leading-snug group-hover:underline mt-0.5">
                  {trailer.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manga SFX Soundboard */}
      <div className="bg-black border-4 border-white p-6 shadow-[8px_8px_0px_#ffffff]">
        <div className="flex items-center justify-between border-b-2 border-white pb-2 mb-4">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-white" />
            <h3 className="font-['Bangers'] text-2xl sm:text-3xl tracking-widest text-white">
              MANGA SOUND EFFECT (SFX) SYNTHESIZER
            </h3>
          </div>
          <span className="font-mono text-xs font-bold text-neutral-400">WEB AUDIO API INK ENGINE</span>
        </div>

        <p className="text-xs text-neutral-300 font-serif mb-6">
          Trigger authentic manga battle sound cues synthesized entirely within your browser.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => playEffect('Haki', playHakiPulse)}
            className={`p-4 border-3 text-center transition-all ${
              activeSound === 'Haki'
                ? 'bg-white text-black border-black scale-95'
                : 'bg-black text-white border-white hover:bg-neutral-900 shadow-[4px_4px_0px_#ffffff]'
            }`}
          >
            <div className="font-['Bangers'] text-3xl mb-1">ドンドットット!!</div>
            <div className="font-mono text-xs font-black">DRUMS OF LIBERATION</div>
            <div className="text-[10px] text-neutral-400 mt-1">Conqueror's Haki Pulse</div>
          </button>

          <button
            onClick={() => playEffect('Cannon', playCannonBlast)}
            className={`p-4 border-3 text-center transition-all ${
              activeSound === 'Cannon'
                ? 'bg-white text-black border-black scale-95'
                : 'bg-black text-white border-white hover:bg-neutral-900 shadow-[4px_4px_0px_#ffffff]'
            }`}
          >
            <div className="font-['Bangers'] text-3xl mb-1">ドガァァン!!</div>
            <div className="font-mono text-xs font-black">BUSTER CALL BLAST</div>
            <div className="text-[10px] text-neutral-400 mt-1">Cannonade Impact</div>
          </button>

          <button
            onClick={() => playEffect('Bell', playShipBell)}
            className={`p-4 border-3 text-center transition-all ${
              activeSound === 'Bell'
                ? 'bg-white text-black border-black scale-95'
                : 'bg-black text-white border-white hover:bg-neutral-900 shadow-[4px_4px_0px_#ffffff]'
            }`}
          >
            <div className="font-['Bangers'] text-3xl mb-1">カァァン!!</div>
            <div className="font-mono text-xs font-black">GOLDEN BELL OF SHANDORA</div>
            <div className="text-[10px] text-neutral-400 mt-1">Ship Mast Chime</div>
          </button>

          <button
            onClick={() => playEffect('Treasure', playTreasureFanfare)}
            className={`p-4 border-3 text-center transition-all ${
              activeSound === 'Treasure'
                ? 'bg-white text-black border-black scale-95'
                : 'bg-black text-white border-white hover:bg-neutral-900 shadow-[4px_4px_0px_#ffffff]'
            }`}
          >
            <div className="font-['Bangers'] text-3xl mb-1">バァァン!!</div>
            <div className="font-mono text-xs font-black">ONE PIECE UNVEILED</div>
            <div className="text-[10px] text-neutral-400 mt-1">Victory Fanfare</div>
          </button>
        </div>
      </div>

      {/* Trailer Modal */}
      {selectedTrailer && (
        <div 
          onClick={() => setSelectedTrailer(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-black border-4 border-white max-w-4xl w-full p-4 sm:p-6 shadow-[10px_10px_0px_#ffffff] relative"
          >
            <button
              onClick={() => setSelectedTrailer(null)}
              className="absolute -top-4 -right-4 p-2 bg-white text-black font-mono font-bold border-2 border-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video w-full border-2 border-white bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${selectedTrailer.youtubeId}?autoplay=1&rel=0`}
                title={selectedTrailer.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t-2 border-white pt-3">
              <div>
                <span className="font-mono text-xs font-bold text-neutral-400">{selectedTrailer.chapterRef}</span>
                <h4 className="font-['Bangers'] text-2xl text-white">{selectedTrailer.title}</h4>
              </div>
              <button
                onClick={() => setSelectedTrailer(null)}
                className="px-4 py-2 bg-white text-black font-['Bangers'] text-sm tracking-wider"
              >
                CLOSE THEATRE
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
