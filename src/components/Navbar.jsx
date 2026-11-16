import React, { useState } from 'react';
import { 
  Compass, 
  Volume2, 
  VolumeX, 
  Anchor, 
  Flame, 
  Play, 
  Sparkles, 
  Award, 
  Menu, 
  X,
  Scroll,
  Radio
} from 'lucide-react';
import { playShipBell, playWoodenClick } from '../utils/audio';

export default function Navbar({ activeTab, setActiveTab, isMuted, setIsMuted, watchedCount, totalArcs }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hub', label: 'Voyage Hub', icon: Compass },
    { id: 'characters', label: 'Bounties & Lore', icon: Award },
    { id: 'fruits', label: 'Devil Fruits', icon: Flame },
    { id: 'sagas', label: 'Saga & Episode Guide', icon: Scroll },
    { id: 'cinema', label: 'Grand Line Cinema', icon: Play },
    { id: 'games', label: 'Pirate Minigames', icon: Sparkles },
    { id: 'generator', label: 'Wanted Maker', icon: Anchor },
    { id: 'live', label: 'Live Den Den Mushi', icon: Radio },
  ];

  const handleNavClick = (tabId) => {
    playWoodenClick();
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const handleSoundToggle = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    if (!nextState) {
      setTimeout(() => playShipBell(), 50);
    }
  };

  const voyagePercent = Math.min(100, Math.round((watchedCount / (totalArcs || 11)) * 100));

  return (
    <header className="sticky top-0 z-50 bg-[#120d09]/95 backdrop-blur-md border-b-2 border-[#543b23] shadow-2xl">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-[#3e1313] via-[#7d1d1d] to-[#3e1313] text-[#f7e3af] text-xs py-1 px-4 text-center font-serif tracking-widest uppercase flex items-center justify-center gap-2 border-b border-[#a87932]/40">
        <span className="hidden sm:inline">☠️ THE WORLD NOBLE DECREE:</span>
        <span className="font-semibold text-amber-300">ONE PIECE ANIME IS AIRING • THE GEAR 5 & EGGHEAD ERA HAS ARRIVED</span>
        <span className="hidden sm:inline">☠️</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('hub')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 rounded-full border-2 border-amber-400/80 shadow-[0_0_15px_rgba(217,119,6,0.4)] group-hover:scale-105 transition-transform duration-300">
              <Compass className="w-8 h-8 text-amber-200 spin-slow" />
              <div className="absolute inset-0 rounded-full border border-yellow-200/40 pointer-events-none"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Pirata_One'] text-2xl sm:text-3xl tracking-wider text-amber-400 text-shadow drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  GRAND LINE
                </span>
                <span className="text-xs uppercase px-1.5 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-700 font-bold tracking-wider">
                  One Piece
                </span>
              </div>
              <p className="text-[11px] text-[#c9b798] tracking-widest font-mono uppercase">
                Chronicles & Wanted Registry
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-b from-[#6b421a] to-[#45280b] text-amber-200 border border-amber-400/60 shadow-[0_0_12px_rgba(217,119,6,0.3)]'
                      : 'text-[#d8c7a8] hover:text-amber-300 hover:bg-[#281b11]/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-[#a78b66]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-3">
            
            {/* Voyage Completion Meter */}
            <div 
              onClick={() => handleNavClick('sagas')}
              className="hidden md:flex items-center gap-2 bg-[#21160d] border border-[#5d3f23] px-3 py-1.5 rounded-lg cursor-pointer hover:border-amber-500/60 transition-colors"
              title="Click to track your Grand Line Voyage progress"
            >
              <div className="text-right">
                <div className="text-[10px] uppercase text-[#a99577] font-semibold tracking-wider">Voyage Log</div>
                <div className="text-xs font-bold text-amber-300">{voyagePercent}% Complete</div>
              </div>
              <div className="w-10 h-2 bg-stone-800 rounded-full overflow-hidden border border-stone-700">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-500" 
                  style={{ width: `${voyagePercent}%` }}
                />
              </div>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              title={isMuted ? 'Sound FX Muted (Click to Unmute)' : 'Sound FX Active (Click to Mute)'}
              className={`p-2.5 rounded-lg border transition-all ${
                isMuted
                  ? 'bg-stone-900 border-stone-700 text-stone-500 hover:text-stone-300'
                  : 'bg-amber-950/60 border-amber-600/60 text-amber-300 hover:bg-amber-900/60 shadow-[0_0_10px_rgba(217,119,6,0.3)]'
              }`}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-[#271b12] border border-[#523820] text-amber-300 hover:bg-[#38271a]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-[#46301d] bg-[#1a120b] px-2 rounded-b-xl mb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center gap-3 transition-colors ${
                    isActive
                      ? 'bg-amber-900/50 text-amber-300 border border-amber-600/50 font-semibold'
                      : 'text-[#d8c7a8] hover:bg-[#281c12] hover:text-amber-200'
                  }`}
                >
                  <Icon className="w-5 h-5 text-amber-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
