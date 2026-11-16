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
import { Award, Flame, Scroll, Play, Sparkles, Anchor, ChevronRight } from 'lucide-react';
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

  // Scroll to top whenever tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0906] text-[#eae0d5] font-sans antialiased selection:bg-amber-500 selection:text-black">
      
      {/* Nautical Header & Navigation */}
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
            <HubQuickPortals setActiveTab={setActiveTab} />
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

      {/* Pirate Creed & Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}

// Quick Portals Showcase displayed on the Voyage Hub
function HubQuickPortals({ setActiveTab }) {
  const portals = [
    {
      id: 'characters',
      title: 'Bounties & Lore Wiki',
      desc: 'Over 20+ prominent pirate and marine dossiers with bounties, haki masteries, and signature moves.',
      icon: Award,
      badge: '30+ Profiles',
      color: 'from-amber-700 to-amber-900',
      action: 'Browse Wanted Posters'
    },
    {
      id: 'fruits',
      title: 'Devil Fruit Encyclopedia',
      desc: 'Explore Mythical Zoan Sun God Nika, Op-Op surgery domains, and catastrophic Logias.',
      icon: Flame,
      badge: 'Awakenings',
      color: 'from-orange-700 to-red-900',
      action: 'Examine Cursed Powers'
    },
    {
      id: 'sagas',
      title: '11 Sagas & Canon Tracker',
      desc: 'Episode guide from Romance Dawn to Egghead Island with filler filters and progress tracking.',
      icon: Scroll,
      badge: '1,120+ Episodes',
      color: 'from-yellow-700 to-amber-900',
      action: 'Track Voyage Progress'
    },
    {
      id: 'cinema',
      title: 'Grand Line Cinema & OST',
      desc: 'Official high-definition Toei trailers, Gear 5 climax videos, and pirate sound synthesizers.',
      icon: Play,
      badge: 'Climax Trailers',
      color: 'from-red-700 to-rose-950',
      action: 'Enter Theatre'
    },
    {
      id: 'generator',
      title: 'Custom Wanted Maker',
      desc: 'Forge your personal Marine Wanted Poster with custom photo upload and high-res PNG download.',
      icon: Anchor,
      badge: 'Export Ready',
      color: 'from-amber-600 to-yellow-800',
      action: 'Create Your Bounty'
    },
    {
      id: 'games',
      title: 'Devil Fruit Quiz & Crew Builder',
      desc: 'Discover your awakened power, draft your 5B armada, and duel in bounty higher/lower.',
      icon: Sparkles,
      badge: '3 Interactive Games',
      color: 'from-purple-800 to-stone-900',
      action: 'Play Tavern Games'
    }
  ];

  const handlePortal = (tabId) => {
    playHakiPulse();
    setActiveTab(tabId);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-[#442b17] pb-4">
        <div>
          <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest">
            THE ARCHIVES OF THE SEVEN SEAS
          </span>
          <h2 className="font-['Pirata_One'] text-3xl sm:text-4xl text-amber-200 mt-1">
            EXPLORE THE VOYAGE DIRECTORY
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#a48e75] font-serif max-w-md">
          Select a sector to dive directly into detailed One Piece encyclopedias, interactive mini-games, and media vaults.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portals.map((portal) => {
          const Icon = portal.icon;
          return (
            <div
              key={portal.id}
              onClick={() => handlePortal(portal.id)}
              className="group p-6 rounded-2xl bg-[#191009] border-2 border-[#4d3219] hover:border-amber-400 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${portal.color} flex items-center justify-center text-amber-200 shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#2a1a0f] text-amber-400 font-bold border border-[#5a391c]">
                    {portal.badge}
                  </span>
                </div>

                <h3 className="font-['Pirata_One'] text-2xl text-amber-200 group-hover:text-amber-300 transition-colors">
                  {portal.title}
                </h3>
                <p className="text-xs text-[#b59f83] font-serif leading-relaxed mt-2">
                  {portal.desc}
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-[#342011] flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
                <span>{portal.action}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
