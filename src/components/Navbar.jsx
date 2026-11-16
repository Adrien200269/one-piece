import React, { useState } from 'react';
import { 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Menu, 
  X,
  FileText,
  Flame,
  Film,
  Sparkles,
  Search,
  Radio,
  Bookmark
} from 'lucide-react';
import { playShipBell, playWoodenClick } from '../utils/audio';

export default function Navbar({ activeTab, setActiveTab, isMuted, setIsMuted, watchedCount, totalArcs }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hub', label: 'Splash Spread', sub: '巻頭カラー', icon: BookOpen },
    { id: 'characters', label: 'Characters', sub: '登場人物', icon: Bookmark },
    { id: 'fruits', label: 'Devil Fruits', sub: '悪魔の実', icon: Flame },
    { id: 'sagas', label: 'Chapter Log', sub: '航海記録', icon: FileText },
    { id: 'cinema', label: 'Manga Theatre', sub: '劇場版', icon: Film },
    { id: 'games', label: 'Tavern Games', sub: '挑戦', icon: Sparkles },
    { id: 'generator', label: 'Wanted Forge', sub: '手配書', icon: Search },
    { id: 'live', label: 'Intel Wire', sub: '電伝虫', icon: Radio },
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
    <header className="sticky top-0 z-50 bg-black text-white border-b-4 border-white shadow-[0_4px_0_rgba(255,255,255,0.2)]">
      {/* Top Manga Header Bar */}
      <div className="bg-white text-black text-xs py-1 px-4 text-center font-black tracking-widest uppercase flex items-center justify-between border-b-2 border-black font-['Space_Grotesk']">
        <span className="hidden md:inline font-mono tracking-wider">週刊少年ジャンプ (WEEKLY SHONEN JUMP ARCHIVE)</span>
        <div className="flex items-center gap-2 mx-auto md:mx-0 font-['Bangers'] tracking-widest text-sm">
          <span>CHAPTER 1120+</span>
          <span>•</span>
          <span>THE GRAND LINE CHRONICLES</span>
          <span>•</span>
          <span className="bg-black text-white px-2 py-0.2 rounded-sm text-xs font-mono font-bold">EIICHIRO ODA</span>
        </div>
        <span className="hidden md:inline font-mono text-xs font-bold">ドン!! (DON!!)</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Manga Title Brand */}
          <div 
            onClick={() => handleNavClick('hub')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 bg-white text-black border-3 border-black flex items-center justify-center font-['Bangers'] text-2xl tracking-tighter shadow-[3px_3px_0px_#ffffff] group-hover:bg-black group-hover:text-white group-hover:border-white transition-colors">
              ドン
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Bangers'] text-2xl sm:text-3xl tracking-widest text-white">
                  ONE PIECE
                </span>
                <span className="text-[10px] uppercase px-1.5 py-0.5 bg-white text-black font-black tracking-widest border border-white">
                  MANGA EDITION
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 font-mono tracking-wider uppercase">
                ワンピース • OFFICIAL MANGA PANELS
              </p>
            </div>
          </div>

          {/* Desktop Manga Panel Tabs */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-xs font-bold transition-all flex flex-col items-center border-2 ${
                    isActive
                      ? 'bg-white text-black border-white shadow-[4px_4px_0px_#ffffff] -translate-y-0.5'
                      : 'bg-black text-neutral-300 border-neutral-700 hover:border-white hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="font-['Space_Grotesk'] uppercase tracking-wider">{item.label}</span>
                  </div>
                  <span className="text-[9px] font-['Shippori_Mincho_B1'] opacity-70 tracking-tighter mt-0.5">
                    {item.sub}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-3">
            
            {/* Manga Tankōbon Volume Tracker */}
            <div 
              onClick={() => handleNavClick('sagas')}
              className="hidden md:flex items-center gap-2 bg-neutral-900 border-2 border-white px-3 py-1.5 cursor-pointer hover:bg-neutral-800 transition-colors shadow-[3px_3px_0px_#ffffff]"
              title="Click to track your Grand Line Manga Chapter progress"
            >
              <div className="text-right">
                <div className="text-[9px] uppercase text-neutral-400 font-mono font-bold tracking-wider">Volume Read</div>
                <div className="text-xs font-black font-mono text-white">{voyagePercent}% COMPLETED</div>
              </div>
              <div className="w-8 h-2 bg-neutral-800 border border-white">
                <div 
                  className="h-full bg-white transition-all duration-300" 
                  style={{ width: `${voyagePercent}%` }}
                />
              </div>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              title={isMuted ? 'Manga SFX Muted' : 'Manga SFX Active (DON!!)'}
              className={`p-2.5 border-2 transition-all font-bold ${
                isMuted
                  ? 'bg-neutral-900 border-neutral-700 text-neutral-500 hover:text-neutral-300'
                  : 'bg-white text-black border-white shadow-[3px_3px_0px_#ffffff]'
              }`}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 bg-white text-black border-2 border-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t-2 border-white bg-black px-2 mb-3 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 border-2 text-sm font-bold flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-white text-black border-white'
                      : 'bg-neutral-900 text-white border-neutral-700 hover:border-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span className="font-['Space_Grotesk'] tracking-wider">{item.label}</span>
                  </div>
                  <span className="text-xs font-['Shippori_Mincho_B1'] opacity-70">
                    {item.sub}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
