import React, { useState, useEffect } from 'react';
import { 
  ChevronRight,
  BookOpen,
  Sparkles,
  Search,
  Volume2,
  Bookmark,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { playHakiPulse, playWoodenClick, playCannonBlast } from '../utils/audio';

const MANGA_QUOTES = [
  { text: "IF YOU DON’T TAKE RISKS, YOU CAN’T CREATE A FUTURE!", author: "MONKEY D. LUFFY", chapter: "CH. 1044: WARRIOR OF LIBERATION" },
  { text: "THE ONE PIECE... IS REAL!!", author: "EDWARD NEWGATE (WHITEBEARD)", chapter: "CH. 576: THE GREAT PIRATE EDWARD NEWGATE" },
  { text: "MY TREASURE? SEARCH THE WHOLE WORLD FOR WHERE I LEFT IT!", author: "GOL D. ROGER", chapter: "CH. 1: ROMANCE DAWN" },
  { text: "SCARS ON THE BACK ARE A SWORDSMAN'S GREATEST SHAME.", author: "RORONOA ZORO", chapter: "CH. 51: RORONOA ZORO FALLS INTO THE SEA" },
  { text: "I WANT TO LIVE! TAKE ME TO THE SEAS WITH YOU!!", author: "NICO ROBIN", chapter: "CH. 398: DECLARATION OF WAR" },
  { text: "PEOPLE'S DREAMS... WILL NEVER DIE! ZEHAHAHAHA!", author: "MARSHALL D. TEACH", chapter: "CH. 225: THE DREAMS OF PIRATES" },
];

export default function HeroBanner({ setActiveTab }) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % MANGA_QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleAction = (tab, soundFn) => {
    if (soundFn) soundFn();
    else playWoodenClick();
    setActiveTab(tab);
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b-8 border-white bg-black manga-screentone">
      
      {/* Dynamic Action Speedlines Backdrop */}
      <div className="absolute inset-0 manga-speedlines opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Manga Volume & Issue Tag */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-white pb-3 mb-8">
          <div className="flex items-center gap-2">
            <span className="bg-white text-black font-['Bangers'] text-lg px-2.5 py-0.5 tracking-wider">
              第1120話 (CH. 1120)
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-300">
              WEEKLY SHONEN JUMP • DOUBLE SPREAD SPLASH
            </span>
          </div>
          <div className="font-['Shippori_Mincho_B1'] text-xs font-black text-white tracking-widest">
            尾田栄一郎 • 週刊少年ジャンプ連載
          </div>
        </div>

        {/* Double-Page Spread Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Manga Column: Dialogue, Splash Title, CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Top Comic Dialogue Balloon */}
            <div className="manga-speech-bubble p-5 border-4 border-black max-w-xl shadow-[6px_6px_0px_#ffffff]">
              <div className="text-[10px] font-mono font-black uppercase text-neutral-600 tracking-wider flex items-center justify-between">
                <span>{MANGA_QUOTES[quoteIndex].author}</span>
                <span>{MANGA_QUOTES[quoteIndex].chapter}</span>
              </div>
              <p className="font-['Bangers'] text-2xl sm:text-3xl text-black tracking-wide leading-tight mt-1">
                “{MANGA_QUOTES[quoteIndex].text}”
              </p>
            </div>

            {/* Giant Manga Chapter Headline */}
            <div className="space-y-3 pt-2">
              <div className="inline-block border-2 border-white px-2.5 py-0.5 bg-neutral-900 text-xs font-mono font-bold tracking-widest text-white">
                THE SUN GOD RISES • DRUMS OF LIBERATION
              </div>
              
              <h1 className="font-['Bangers'] text-5xl sm:text-7xl xl:text-8xl leading-none text-white tracking-widest drop-shadow-[5px_5px_0px_#222222]">
                GRAND LINE CHRONICLES!!
              </h1>

              <p className="text-sm sm:text-base text-neutral-300 font-serif leading-relaxed max-w-2xl border-l-4 border-white pl-4">
                Enter Eiichiro Oda's masterwork in its purest form: raw monochrome ink, dramatic speech balloons, cross-hatched Wanted posters, and the legendary 1,120+ chapter journey across the four seas.
              </p>
            </div>

            {/* Manga Action Buttons (Sharp Comic Box Shadows) */}
            <div className="flex flex-wrap gap-3 pt-4">
              <button
                onClick={() => handleAction('characters', playHakiPulse)}
                className="px-6 py-3.5 bg-white text-black font-['Bangers'] text-xl tracking-wider border-3 border-black shadow-[5px_5px_0px_#ffffff] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#ffffff] active:translate-x-0 active:translate-y-0 transition-all flex items-center gap-2"
              >
                <Bookmark className="w-5 h-5 text-black" />
                <span>CHARACTER DOSSIERS</span>
                <ChevronRight className="w-5 h-5 text-black" />
              </button>

              <button
                onClick={() => handleAction('generator', playCannonBlast)}
                className="px-5 py-3.5 bg-black text-white font-['Bangers'] text-lg tracking-wider border-3 border-white shadow-[5px_5px_0px_#ffffff] hover:bg-neutral-900 active:translate-x-0 active:translate-y-0 transition-all flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                <span>FORGE WANTED POSTER</span>
              </button>

              <button
                onClick={() => handleAction('cinema', playWoodenClick)}
                className="px-4 py-3.5 bg-neutral-900 text-neutral-300 font-['Bangers'] text-lg tracking-wider border-2 border-neutral-600 hover:border-white hover:text-white transition-all flex items-center gap-2"
              >
                <span>THEATRE & SFX</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Manga Column: Featured Gear 5 Manga Panel */}
          <div className="lg:col-span-5">
            <div className="manga-box h-full p-4 relative flex flex-col justify-between overflow-hidden bg-black">
              
              {/* Manga Panel Top Meta */}
              <div className="flex items-center justify-between border-b-2 border-white pb-2 mb-3">
                <span className="font-['Bangers'] text-sm tracking-widest text-white">
                  PANEL 01: SUN GOD NIKA
                </span>
                <span className="font-mono text-xs font-black bg-white text-black px-2 py-0.5">
                  DON!! ドン!!
                </span>
              </div>

              {/* Main Manga Panel Graphic */}
              <div className="relative border-4 border-white bg-black overflow-hidden aspect-[4/3] flex items-center justify-center">
                <img
                  src="/manga/oda_panels/gear5.png"
                  alt="Monkey D. Luffy Manga Panel"
                  className="w-full h-full object-cover object-top manga-ink-img scale-105"
                />
                
                {/* Onomatopoeia SFX Text Overlay */}
                <div className="absolute top-3 right-3 font-['Bangers'] text-4xl sm:text-5xl text-white manga-sfx select-none tracking-widest rotate-6">
                  ドン!!
                </div>
                
                <div className="absolute bottom-2 left-2 bg-black/90 border border-white px-2.5 py-1 text-white font-mono text-xs">
                  “DODON-TOT-TO!”
                </div>
              </div>

              {/* Character Details in Comic Format */}
              <div className="mt-4 pt-3 border-t-2 border-white space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-['Bangers'] text-3xl text-white tracking-widest">
                    MONKEY D. LUFFY
                  </h3>
                  <span className="font-mono text-xs font-black border border-white px-2 py-0.5">
                    EMPEROR
                  </span>
                </div>

                <div className="bg-white text-black p-2.5 border-2 border-black font-mono font-black flex items-center justify-between text-xs sm:text-sm">
                  <span>DEAD OR ALIVE</span>
                  <span className="font-['Bangers'] text-lg sm:text-xl tracking-wider">
                    ฿ 3,000,000,000 -
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
                  <div className="border border-neutral-700 p-1.5 bg-neutral-950">
                    <div className="text-[9px] text-neutral-400">CLASS</div>
                    <div className="font-bold text-white">MYTHICAL</div>
                  </div>
                  <div className="border border-neutral-700 p-1.5 bg-neutral-950">
                    <div className="text-[9px] text-neutral-400">HAKI</div>
                    <div className="font-bold text-white">CONQUEROR</div>
                  </div>
                  <div className="border border-neutral-700 p-1.5 bg-neutral-950">
                    <div className="text-[9px] text-neutral-400">ORIGIN</div>
                    <div className="font-bold text-white">EAST BLUE</div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Manga Stats Bar (Comic Layout) */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="border-3 border-white p-4 bg-black text-center shadow-[4px_4px_0px_#ffffff]">
            <div className="font-['Bangers'] text-4xl text-white tracking-wider">1,120+</div>
            <div className="font-mono text-xs uppercase font-bold text-neutral-400">MANGA CHAPTERS</div>
          </div>
          <div className="border-3 border-white p-4 bg-black text-center shadow-[4px_4px_0px_#ffffff]">
            <div className="font-['Bangers'] text-4xl text-white tracking-wider">฿ 8.816B</div>
            <div className="font-mono text-xs uppercase font-bold text-neutral-400">STRAW HAT CREW BOUNTY</div>
          </div>
          <div className="border-3 border-white p-4 bg-black text-center shadow-[4px_4px_0px_#ffffff]">
            <div className="font-['Bangers'] text-4xl text-white tracking-wider">11 SAGAS</div>
            <div className="font-mono text-xs uppercase font-bold text-neutral-400">EPIC STORY VOLUMES</div>
          </div>
          <div className="border-3 border-white p-4 bg-black text-center shadow-[4px_4px_0px_#ffffff]">
            <div className="font-['Bangers'] text-4xl text-white tracking-wider">1997 – NOW</div>
            <div className="font-mono text-xs uppercase font-bold text-neutral-400">EIICHIRO ODA'S ART</div>
          </div>
        </div>

      </div>
    </div>
  );
}
