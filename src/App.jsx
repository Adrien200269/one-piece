import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CharacterWiki from './components/CharacterWiki';
import DevilFruitEncyclopedia from './components/DevilFruitEncyclopedia';
import EpisodeGuide from './components/EpisodeGuide';
import StreamingHub from './components/StreamingHub';
import MiniGames from './components/MiniGames';
import WantedPosterGenerator from './components/WantedPosterGenerator';
import LiveApiExplorer from './components/LiveApiExplorer';
import Footer from './components/Footer';
import { SAGAS } from './data/sagas';
import { Bookmark, Flame, FileText, Film, Sparkles, Search, ChevronRight } from 'lucide-react';
import { playHakiPulse } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState('hub');
  const [isMuted, setIsMuted] = useState(false);
  const [watchedSagas, setWatchedSagas] = useState(() => {
    try {
      const saved = localStorage.getItem('op_watched_sagas');
      return saved ? JSON.parse(saved) : ['east-blue', 'alabasta'];
    } catch {
      return ['east-blue', 'alabasta'];
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-['Space_Grotesk'] antialiased selection:bg-white selection:text-black">
      
      {/* Manga Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        watchedCount={watchedSagas.length}
        totalArcs={SAGAS.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'hub' && (
          <>
            <HeroBanner setActiveTab={setActiveTab} />
            <MangaPortalsSection setActiveTab={setActiveTab} />
          </>
        )}

        {activeTab === 'characters' && <CharacterWiki />}
        {activeTab === 'fruits' && <DevilFruitEncyclopedia />}
        {activeTab === 'sagas' && (
          <EpisodeGuide
            watchedSagas={watchedSagas}
            setWatchedSagas={setWatchedSagas}
          />
        )}
        {activeTab === 'cinema' && <StreamingHub />}
        {activeTab === 'games' && <MiniGames />}
        {activeTab === 'generator' && <WantedPosterGenerator />}
        {activeTab === 'live' && <LiveApiExplorer />}
      </main>

      {/* Manga End-of-Chapter Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}

// Manga Chapter Portals displayed on the Splash Spread
function MangaPortalsSection({ setActiveTab }) {
  const portals = [
    {
      id: 'characters',
      title: 'CHARACTER ARCHIVE',
      sub: '登場人物',
      desc: '20+ canonical pirate & Marine dossiers illustrated in pen-and-ink with Haki awakenings and combat assessments.',
      icon: Bookmark,
      badge: 'CH. 1 – 1120+',
      action: 'VIEW MANGA PANELS'
    },
    {
      id: 'fruits',
      title: 'DEVIL FRUIT SBS',
      sub: '悪魔の実図鑑',
      desc: 'Oda SBS corner detailing Paramecia, Logia, and Mythical Zoan God awakenings with ink diagrams.',
      icon: Flame,
      badge: 'AWAKENINGS',
      action: 'EXAMINE CURSED FRUITS'
    },
    {
      id: 'sagas',
      title: '11 SAGAS CANON GUIDE',
      sub: '航海記録',
      desc: 'Full manga chapter & saga breakdown with filler flags and an interactive volume reading tracker.',
      icon: FileText,
      badge: 'VOL. 1 – 108+',
      action: 'INSPECT CHAPTER LOG'
    },
    {
      id: 'cinema',
      title: 'MANGA THEATRE & SFX',
      sub: '映像化・効果音',
      desc: 'Official high-definition Toei trailers framed in comic panels with live Web Audio SFX synthesizers.',
      icon: Film,
      badge: 'DON!! ドン!!',
      action: 'ENTER THEATRE'
    },
    {
      id: 'generator',
      title: 'MANGA WANTED FORGE',
      sub: '手配書作成',
      desc: 'Forge your personal black-and-white woodcut Wanted Poster with custom photo upload and high-res PNG export.',
      icon: Search,
      badge: '300 DPI EXPORT',
      action: 'FORGE YOUR BOUNTY'
    },
    {
      id: 'games',
      title: 'MANGA TAVERN GAMES',
      sub: '酒場遊戯',
      desc: 'Devil Fruit awakening personality quiz, 5B Berry armada draft, and bounty duel showdowns.',
      icon: Sparkles,
      badge: 'GOGOGO!! ゴゴゴ',
      action: 'PLAY CHALLENGES'
    }
  ];

  const handlePortal = (tabId) => {
    playHakiPulse();
    setActiveTab(tabId);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b-4 border-white pb-4">
        <div>
          <span className="text-xs font-mono uppercase text-neutral-400 font-black tracking-widest">
            週刊少年ジャンプ目録 • CHAPTER DIRECTORY
          </span>
          <h2 className="font-['Bangers'] text-4xl sm:text-5xl text-white tracking-widest mt-1">
            EXPLORE MANGA ARCHIVES
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-300 font-serif max-w-md">
          Select any sector to jump directly into deep One Piece lore, interactive tools, and manga chapter records.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portals.map((portal) => {
          const Icon = portal.icon;
          return (
            <div
              key={portal.id}
              onClick={() => handlePortal(portal.id)}
              className="manga-box-paper p-6 flex flex-col justify-between cursor-pointer group select-none relative"
            >
              <div>
                <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
                  <div className="w-10 h-10 border-2 border-black bg-black text-white flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 border border-black bg-black text-white font-black">
                    {portal.badge}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="font-['Bangers'] text-2xl text-black tracking-wider group-hover:underline">
                    {portal.title}
                  </h3>
                  <span className="font-['Shippori_Mincho_B1'] text-xs font-bold text-neutral-600">
                    {portal.sub}
                  </span>
                </div>

                <p className="text-xs text-neutral-800 font-serif leading-relaxed mt-2">
                  {portal.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t-2 border-black flex items-center justify-between text-xs font-mono font-bold text-black group-hover:bg-black group-hover:text-white px-2 py-1 transition-colors">
                <span>{portal.action}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
