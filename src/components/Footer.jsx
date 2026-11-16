import React from 'react';
import { Compass, Anchor, Skull, Heart, ArrowUp } from 'lucide-react';
import { playShipBell, playWoodenClick } from '../utils/audio';

export default function Footer({ setActiveTab }) {
  const scrollToTop = () => {
    playWoodenClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0e0906] border-t-4 border-[#4f351d] text-[#a99478] py-12 px-4 sm:px-6 lg:px-8 mt-16 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Col */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-700 to-yellow-500 flex items-center justify-center text-stone-950 font-bold border border-yellow-200">
              <Compass className="w-6 h-6 spin-slow" />
            </div>
            <span className="font-['Pirata_One'] text-2xl text-amber-300">
              GRAND LINE CHRONICLES
            </span>
          </div>
          <p className="text-xs font-serif leading-relaxed text-[#8f7a63]">
            The definitive fan sanctuary celebrating 25+ years of Eiichiro Oda’s masterwork. Crafted with love for Straw Hat pirates across all four blues.
          </p>
        </div>

        {/* Quick Nav */}
        <div>
          <h4 className="font-['Pirata_One'] text-xl text-amber-300 mb-2">Voyage Sections</h4>
          <ul className="text-xs space-y-1.5 font-serif">
            <li>
              <button onClick={() => { playWoodenClick(); setActiveTab('characters'); }} className="hover:text-amber-300">
                ☠️ Marine Bounty Archives
              </button>
            </li>
            <li>
              <button onClick={() => { playWoodenClick(); setActiveTab('fruits'); }} className="hover:text-amber-300">
                🍇 Devil Fruit Encyclopedia
              </button>
            </li>
            <li>
              <button onClick={() => { playWoodenClick(); setActiveTab('sagas'); }} className="hover:text-amber-300">
                🗺️ 11 Sagas & Canon Guide
              </button>
            </li>
            <li>
              <button onClick={() => { playWoodenClick(); setActiveTab('cinema'); }} className="hover:text-amber-300">
                🎬 Grand Line Cinema & OST
              </button>
            </li>
          </ul>
        </div>

        {/* Interactive Features */}
        <div>
          <h4 className="font-['Pirata_One'] text-xl text-amber-300 mb-2">Interactive Tools</h4>
          <ul className="text-xs space-y-1.5 font-serif">
            <li>
              <button onClick={() => { playWoodenClick(); setActiveTab('generator'); }} className="hover:text-amber-300">
                📜 Custom Wanted Poster Maker
              </button>
            </li>
            <li>
              <button onClick={() => { playWoodenClick(); setActiveTab('games'); }} className="hover:text-amber-300">
                🔮 Devil Fruit Personality Quiz
              </button>
            </li>
            <li>
              <button onClick={() => { playWoodenClick(); setActiveTab('games'); }} className="hover:text-amber-300">
                ⚔️ 5-Billion Berry Crew Builder
              </button>
            </li>
            <li>
              <button onClick={() => { playWoodenClick(); setActiveTab('live'); }} className="hover:text-amber-300">
                📡 Live MyAnimeList Intelligence
              </button>
            </li>
          </ul>
        </div>

        {/* Tribute & Back to Top */}
        <div className="space-y-3">
          <h4 className="font-['Pirata_One'] text-xl text-amber-300">The Pirate's Creed</h4>
          <p className="text-xs italic font-serif text-[#cebc9f]">
            “Inherited Will, The Swell of the Epochs, and People’s Dreams... As long as people seek freedom, these will never be stopped.”
          </p>
          <div className="pt-2">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#22160d] border border-[#52371e] text-amber-300 text-xs font-bold hover:bg-[#322013] transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top Mast</span>
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#312012] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#715e4a] font-mono">
        <div>
          ONE PIECE © Eiichiro Oda / Shueisha, Toei Animation. Created for fans worldwide.
        </div>
        <div className="mt-2 sm:mt-0 flex items-center gap-1">
          <span>Set Sail on the Grand Line</span>
          <span className="text-amber-400">⚓</span>
        </div>
      </div>
    </footer>
  );
}
