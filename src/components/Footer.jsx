import React from 'react';
import { ArrowUp } from 'lucide-react';
import { playWoodenClick } from '../utils/audio';

export default function Footer({ setActiveTab }) {
  const scrollToTop = () => {
    playWoodenClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t-8 border-white text-white py-12 px-4 sm:px-6 lg:px-8 mt-16 relative font-mono">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Col */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 border-2 border-white bg-white text-black flex items-center justify-center font-['Bangers'] text-xl font-black">
              ドン
            </div>
            <span className="font-['Bangers'] text-2xl text-white tracking-widest">
              ONE PIECE MANGA
            </span>
          </div>
          <p className="text-xs font-serif leading-relaxed text-neutral-400">
            Dedicated to Eiichiro Oda’s legendary manga published in Weekly Shonen Jump since 1997. Rendered in pure black-and-white ink screentone.
          </p>
        </div>

        {/* Quick Nav */}
        <div>
          <h4 className="font-['Bangers'] text-xl text-white tracking-wider mb-2">MANGA CHAPTERS</h4>
          <ul className="text-xs space-y-2 font-mono text-neutral-300">
            <li>
              <button onClick={() => { playWoodenClick(); setActiveTab('characters'); }} className="hover:underline text-left">
                ▸ Character Profiles & Panels
              </button>
            </li>
            <li>
              <button onClick={() => { playWoodenClick(); setActiveTab('fruits'); }} className="hover:underline text-left">
                ▸ Devil Fruit SBS Encyclopedia
              </button>
            </li>
            <li>
              <button onClick={() => { playWoodenClick(); setActiveTab('sagas'); }} className="hover:underline text-left">
                ▸ 11 Sagas Canon Chapter Log
              </button>
            </li>
            <li>
              <button onClick={() => { playWoodenClick(); setActiveTab('cinema'); }} className="hover:underline text-left">
                ▸ Manga Theatre & Soundboard
              </button>
            </li>
          </ul>
        </div>

        {/* Interactive Features */}
        <div>
          <h4 className="font-['Bangers'] text-xl text-white tracking-wider mb-2">MANGA FORGE</h4>
          <ul className="text-xs space-y-2 font-mono text-neutral-300">
            <li>
              <button onClick={() => { playWoodenClick(); setActiveTab('generator'); }} className="hover:underline text-left">
                ▸ Custom Manga Wanted Maker
              </button>
            </li>
            <li>
              <button onClick={() => { playWoodenClick(); setActiveTab('games'); }} className="hover:underline text-left">
                ▸ Devil Fruit Awakening Quiz
              </button>
            </li>
            <li>
              <button onClick={() => { playWoodenClick(); setActiveTab('games'); }} className="hover:underline text-left">
                ▸ 5B Berry Crew Draft
              </button>
            </li>
            <li>
              <button onClick={() => { playWoodenClick(); setActiveTab('live'); }} className="hover:underline text-left">
                ▸ Live Den Den Mushi Telemetry
              </button>
            </li>
          </ul>
        </div>

        {/* To Be Continued Stamp */}
        <div className="space-y-3">
          <div className="border-4 border-white p-4 bg-white text-black text-center shadow-[6px_6px_0px_#000000]">
            <div className="font-['Bangers'] text-3xl tracking-widest">
              TO BE CONTINUED...
            </div>
            <div className="font-['Shippori_Mincho_B1'] text-xs font-black tracking-widest mt-0.5">
              つづく • 次号へ続く
            </div>
          </div>
          
          <div className="pt-2 text-center">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black border-2 border-white text-white text-xs font-bold hover:bg-white hover:text-black transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>TOP OF CHAPTER</span>
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 font-mono">
        <div>
          ONE PIECE © EIICHIRO ODA / SHUEISHA. WEEKLY SHONEN JUMP.
        </div>
        <div className="mt-2 sm:mt-0 font-['Bangers'] text-base text-white tracking-widest">
          DON!! ドン!!
        </div>
      </div>
    </footer>
  );
}
