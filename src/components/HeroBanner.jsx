import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Flame, 
  Award, 
  Play, 
  Sparkles, 
  ShieldAlert, 
  Skull, 
  ChevronRight,
  Anchor,
  Zap
} from 'lucide-react';
import { playHakiPulse, playWoodenClick, playCannonBlast } from '../utils/audio';

const QUOTES = [
  { text: "If you don’t take risks, you can’t create a future!", author: "Monkey D. Luffy", role: "Future King of the Pirates" },
  { text: "THE ONE PIECE IS REAL!", author: "Edward Newgate (Whitebeard)", role: "Strongest Man in the World" },
  { text: "My treasure? Why, it’s where I left it. You’ll have to search the whole world!", author: "Gol D. Roger", role: "Pirate King" },
  { text: "When I decided to follow my dream, I had already discarded my life.", author: "Roronoa Zoro", role: "King of Hell" },
  { text: "I want to live! Take me with you to the sea!", author: "Nico Robin", role: "Devil Child" },
  { text: "People’s dreams... will never die! Zehahahaha!", author: "Marshall D. Teach", role: "Blackbeard" },
];

export default function HeroBanner({ setActiveTab }) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleAction = (tab, soundFn) => {
    if (soundFn) soundFn();
    else playWoodenClick();
    setActiveTab(tab);
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b-4 border-[#4d3319] bg-gradient-to-b from-[#140d08] via-[#1b120b] to-[#0c0906]">
      {/* Background Ambience & Grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Glowing Haki Auroras */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#342013] border border-[#78512b] text-amber-300 text-xs sm:text-sm font-medium mb-6 shadow-md">
          <Skull className="w-4 h-4 text-amber-400" />
          <span>The Great Pirate Era • 1,120+ Episodes & Beyond</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
        </div>

        {/* Main Grid Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading, Quote, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-['Pirata_One'] text-4xl sm:text-6xl xl:text-7xl leading-none text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              VOYAGE BEYOND THE GRAND LINE
            </h1>
            
            <p className="text-base sm:text-xl text-[#d2be9f] font-serif leading-relaxed max-w-2xl">
              Immerse yourself in Eiichiro Oda’s legendary anime saga. Discover wanted bounties, awaken mythical devil fruits, trace every saga from East Blue to Egghead, and forge your personal pirate legacy.
            </p>

            {/* Rotating Pirate Quote Card */}
            <div className="parchment-bg rounded-xl p-4 sm:p-5 border-2 border-[#83592e] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#9e1a1a]"></div>
              <div className="pl-3">
                <p className="italic text-base sm:text-lg text-[#2a1b0d] font-serif font-bold">
                  “{QUOTES[currentQuoteIndex].text}”
                </p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#c5ad82]">
                  <span className="text-xs sm:text-sm font-bold text-[#801b1b] uppercase font-mono">
                    — {QUOTES[currentQuoteIndex].author}
                  </span>
                  <span className="text-[11px] text-[#634f3a] uppercase font-semibold">
                    {QUOTES[currentQuoteIndex].role}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => handleAction('characters', playHakiPulse)}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-stone-950 font-bold font-serif text-sm sm:text-base hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(217,119,6,0.4)] flex items-center gap-2"
              >
                <Award className="w-5 h-5 text-stone-900" />
                <span>Wanted Posters & Bounties</span>
                <ChevronRight className="w-4 h-4 text-stone-900" />
              </button>

              <button
                onClick={() => handleAction('generator', playCannonBlast)}
                className="px-5 py-3 rounded-xl bg-[#2a1a0f] hover:bg-[#3d2716] text-amber-200 border-2 border-[#80552b] font-serif text-sm sm:text-base font-semibold active:scale-95 transition-all flex items-center gap-2 shadow-lg"
              >
                <Anchor className="w-5 h-5 text-amber-400" />
                <span>Make Custom Wanted Poster</span>
              </button>

              <button
                onClick={() => handleAction('cinema', playWoodenClick)}
                className="px-4 py-3 rounded-xl bg-red-950/70 hover:bg-red-900/80 text-red-200 border border-red-700/80 font-serif text-sm sm:text-base font-semibold transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4 text-red-400 fill-red-400" />
                <span>Arc Cinema & OST</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Showcase Card (Luffy Gear 5 / Sun God Nika Spotlight) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-6 bg-gradient-to-b from-[#2a1b12] to-[#170e08] border-2 border-[#6f4b27] shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden">
              
              {/* Corner Emblems */}
              <div className="absolute top-2 left-2 text-[#4d351e] font-serif text-xs">◆ GRAND LINE REGISTRY ◆</div>
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-amber-500/20 text-amber-300 text-[11px] px-2 py-0.5 rounded border border-amber-500/30">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>EMPEROR STATUS</span>
              </div>

              {/* Character Spotlight Preview */}
              <div className="mt-4 text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 p-1.5 shadow-[0_0_35px_rgba(234,179,8,0.4)] relative">
                  <div className="w-full h-full rounded-full bg-[#1e130b] flex items-center justify-center text-6xl">
                    👒
                  </div>
                  <div className="absolute bottom-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white">
                    GEAR 5
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-xs uppercase tracking-widest text-[#ad9574] font-mono">
                    Straw Hat Pirates Captain
                  </span>
                  <h3 className="font-['Pirata_One'] text-3xl text-amber-300 tracking-wider">
                    Monkey D. Luffy
                  </h3>
                  <p className="text-xs text-amber-100/70 italic mt-1 font-serif">
                    “Drums of Liberation • Sun God Nika Awakened”
                  </p>
                </div>

                {/* Bounty Display Plate */}
                <div className="mt-4 p-3 rounded-xl bg-[#130b06] border border-[#523820] flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-[10px] text-[#8e7a61] uppercase font-bold tracking-wider">DEAD OR ALIVE</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400 tracking-wider flex items-center gap-1">
                      <span>฿</span>
                      <span>3,000,000,000</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAction('characters', playHakiPulse)}
                    className="text-xs bg-amber-600/80 hover:bg-amber-500 text-stone-950 font-bold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    View File
                  </button>
                </div>

                {/* Quick Attributes */}
                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <div className="p-2 rounded-lg bg-[#20140c] border border-[#432d18]">
                    <div className="text-[10px] text-[#978368] uppercase">Fruit</div>
                    <div className="text-xs font-bold text-amber-200 mt-0.5">Mythical Zoan</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#20140c] border border-[#432d18]">
                    <div className="text-[10px] text-[#978368] uppercase">Conqueror's</div>
                    <div className="text-xs font-bold text-red-400 mt-0.5">Advanced Ryuo</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#20140c] border border-[#432d18]">
                    <div className="text-[10px] text-[#978368] uppercase">Bounty Rank</div>
                    <div className="text-xs font-bold text-amber-400 mt-0.5">#5 Active</div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Global Statistics Bar */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#181009]/90 border border-[#543b23] shadow-lg">
          <div className="text-center p-3 border-r border-[#382717] last:border-r-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">1,120+</div>
            <div className="text-xs text-[#a99577] uppercase tracking-wider font-semibold mt-1">Episodes Airing</div>
          </div>
          <div className="text-center p-3 border-r border-[#382717] last:border-r-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">฿ 8.816B</div>
            <div className="text-xs text-[#a99577] uppercase tracking-wider font-semibold mt-1">Straw Hat Total Bounty</div>
          </div>
          <div className="text-center p-3 border-r border-[#382717] last:border-r-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">11 Sagas</div>
            <div className="text-xs text-[#a99577] uppercase tracking-wider font-semibold mt-1">Epic Story Sagas</div>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">25+ Yrs</div>
            <div className="text-xs text-[#a99577] uppercase tracking-wider font-semibold mt-1">Eiichiro Oda Legacy</div>
          </div>
        </div>

      </div>
    </div>
  );
}
