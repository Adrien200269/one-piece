import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  ExternalLink,
  Bookmark,
  Zap,
  Flame,
  Award,
  Filter
} from 'lucide-react';
import { CHARACTERS, FACTIONS } from '../data/characters';
import { playWoodenClick, playHakiPulse } from '../utils/audio';

export default function CharacterWiki() {
  const [selectedFaction, setSelectedFaction] = useState('All Panels');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('bounty-desc');
  const [abilityFilter, setAbilityFilter] = useState('all');
  const [activeCharacter, setActiveCharacter] = useState(null);
  const [bookmarked, setBookmarked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('op_manga_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  const toggleBookmark = (charId, e) => {
    e.stopPropagation();
    playWoodenClick();
    setBookmarked((prev) => {
      const next = prev.includes(charId) 
        ? prev.filter((id) => id !== charId) 
        : [...prev, charId];
      localStorage.setItem('op_manga_bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const filteredCharacters = useMemo(() => {
    return CHARACTERS.filter((char) => {
      const matchesFaction = 
        selectedFaction === 'All Panels' ? true :
        selectedFaction === 'Straw Hat Pirates' ? char.crew === 'Straw Hat Pirates' :
        selectedFaction === 'Emperors of the Sea' ? (char.role.includes('Emperor') || char.role.includes('Yonko')) :
        selectedFaction === 'Cross Guild' ? (char.crew.includes('Cross Guild')) :
        selectedFaction === 'Marine Headquarters' ? char.crew.includes('Marine') :
        selectedFaction === 'Legends & Roger Pirates' ? (char.crew.includes('Roger') || char.crew.includes('Whitebeard') || char.epithet.includes('King')) :
        true;

      const term = searchTerm.toLowerCase();
      const matchesSearch = 
        char.name.toLowerCase().includes(term) ||
        char.epithet.toLowerCase().includes(term) ||
        char.crew.toLowerCase().includes(term) ||
        char.signatureMoves.some((m) => m.toLowerCase().includes(term));

      const matchesAbility = 
        abilityFilter === 'all' ? true :
        abilityFilter === 'conquerors' ? char.haki.some((h) => h.toLowerCase().includes('conqueror')) :
        abilityFilter === 'devilFruit' ? char.devilFruit !== null :
        abilityFilter === 'bookmarks' ? bookmarked.includes(char.id) :
        true;

      return matchesFaction && matchesSearch && matchesAbility;
    }).sort((a, b) => {
      if (sortBy === 'bounty-desc') return b.bounty - a.bounty;
      if (sortBy === 'bounty-asc') return a.bounty - b.bounty;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [selectedFaction, searchTerm, sortBy, abilityFilter, bookmarked]);

  const openModal = (char) => {
    playHakiPulse();
    setActiveCharacter(char);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Manga Section Header */}
      <div className="border-b-4 border-white pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <div className="inline-block bg-white text-black text-xs font-mono font-black uppercase px-2 py-0.5 mb-2">
            登場人物名鑑 • OFFICIAL MANGA CAST ARCHIVE
          </div>
          <h2 className="font-['Bangers'] text-4xl sm:text-6xl text-white tracking-widest">
            CHARACTER PROFILES & MANGA PANELS
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-serif max-w-2xl mt-1">
            Pure black & white ink character dossiers straight from the manga pages. Examine canonical bounties, Conqueror’s Haki awakenings, and legendary battle sound effects.
          </p>
        </div>
        <div className="font-['Bangers'] text-3xl text-white tracking-widest border-2 border-white px-3 py-1 bg-black shadow-[4px_4px_0px_#ffffff]">
          DON!! ドン!!
        </div>
      </div>

      {/* Comic Control Bar: Search & Filters */}
      <div className="bg-black border-3 border-white p-4 sm:p-5 shadow-[6px_6px_0px_#ffffff] mb-8 space-y-4">
        
        {/* Top Search & Sort Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by pirate name, epithet, crew, move..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border-2 border-neutral-600 text-white placeholder-neutral-500 font-mono text-sm focus:outline-none focus:border-white"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => { playWoodenClick(); setSortBy(e.target.value); }}
              className="px-3 py-2.5 bg-black border-2 border-white text-white font-mono text-xs font-bold focus:outline-none"
            >
              <option value="bounty-desc">Bounty: High → Low</option>
              <option value="bounty-asc">Bounty: Low → High</option>
              <option value="name">Name (A–Z)</option>
            </select>

            <select
              value={abilityFilter}
              onChange={(e) => { playWoodenClick(); setAbilityFilter(e.target.value); }}
              className="px-3 py-2.5 bg-black border-2 border-white text-white font-mono text-xs font-bold focus:outline-none"
            >
              <option value="all">All Abilities</option>
              <option value="conquerors">Conqueror's Haki</option>
              <option value="devilFruit">Devil Fruit</option>
              <option value="bookmarks">★ Bookmarked</option>
            </select>
          </div>
        </div>

        {/* Faction Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-800">
          {FACTIONS.map((faction) => {
            const isSelected = selectedFaction === faction;
            return (
              <button
                key={faction}
                onClick={() => { playWoodenClick(); setSelectedFaction(faction); }}
                className={`px-3 py-1.5 text-xs font-bold font-mono uppercase tracking-wider border-2 transition-all ${
                  isSelected
                    ? 'bg-white text-black border-white shadow-[3px_3px_0px_#ffffff]'
                    : 'bg-black text-neutral-400 border-neutral-700 hover:border-white hover:text-white'
                }`}
              >
                {faction}
              </button>
            );
          })}
        </div>

      </div>

      {/* Grid of Manga Character Panels */}
      {filteredCharacters.length === 0 ? (
        <div className="text-center py-16 border-3 border-white p-8 bg-black">
          <div className="font-['Bangers'] text-4xl text-white">NO CHARACTERS FOUND IN ARCHIVE!</div>
          <p className="text-xs text-neutral-400 font-mono mt-1">Try refining your search keyword or faction filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCharacters.map((char) => {
            const isFav = bookmarked.includes(char.id);
            const hasConquerors = char.haki.some((h) => h.toLowerCase().includes('conqueror'));

            return (
              <div
                key={char.id}
                onClick={() => openModal(char)}
                className="manga-box-paper p-4 flex flex-col justify-between cursor-pointer group select-none relative"
              >
                {/* Comic Card Header */}
                <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-2 font-mono text-[10px] font-black">
                  <span>{char.chapterDebut}</span>
                  <button
                    onClick={(e) => toggleBookmark(char.id, e)}
                    className="p-1 border border-black hover:bg-black hover:text-white transition-colors"
                    title={isFav ? "Remove bookmark" : "Bookmark character"}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-black' : ''}`} />
                  </button>
                </div>

                {/* Manga Artwork Image Frame */}
                <div className="relative border-3 border-black bg-black aspect-[4/3] overflow-hidden flex items-center justify-center my-1">
                  <img
                    src={char.mangaImage}
                    alt={char.name}
                    className="w-full h-full object-cover manga-ink-img group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Manga SFX Sound Effect Watermark */}
                  <div className="absolute bottom-1 right-2 font-['Bangers'] text-xl text-white manga-sfx select-none tracking-widest opacity-90">
                    {char.mangaSfx.split(' ')[0]}
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
                    {hasConquerors && (
                      <span className="bg-black text-white text-[9px] font-black font-mono px-1.5 py-0.5 border border-white">
                        覇王色 (CONQUEROR)
                      </span>
                    )}
                    {char.devilFruit?.awakened && (
                      <span className="bg-white text-black text-[9px] font-black font-mono px-1.5 py-0.5 border border-black">
                        覚醒 (AWAKENED)
                      </span>
                    )}
                  </div>
                </div>

                {/* Character Name & Epithet */}
                <div className="my-2 border-b-2 border-black pb-2">
                  <h3 className="font-['Bangers'] text-2xl tracking-wider text-black leading-tight group-hover:underline">
                    {char.name}
                  </h3>
                  <div className="flex items-center justify-between font-mono text-[11px] font-bold text-neutral-800 mt-0.5">
                    <span className="truncate pr-1">{char.epithet}</span>
                    <span className="font-['Shippori_Mincho_B1'] text-[10px] shrink-0 opacity-70">{char.japaneseName}</span>
                  </div>
                </div>

                {/* Bounty Plate */}
                <div className="bg-black text-white p-2.5 border-2 border-black flex items-center justify-between font-mono text-xs font-black">
                  <span className="text-[10px] text-neutral-400">REWARD</span>
                  <span className="font-['Bangers'] text-base tracking-wider text-white">
                    ฿ {char.bountyFormatted}
                  </span>
                </div>

                {/* Footer Manga Prompt */}
                <div className="mt-2 text-center font-mono text-[10px] font-bold text-neutral-600 group-hover:text-black flex items-center justify-center gap-1">
                  <span>INSPECT MANGA ARCHIVE</span>
                  <ExternalLink className="w-3 h-3" />
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Character Dossier Manga Modal */}
      {activeCharacter && (
        <div 
          onClick={() => setActiveCharacter(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-black text-white border-4 border-white p-6 sm:p-8 max-w-2xl w-full shadow-[10px_10px_0px_#ffffff] relative my-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveCharacter(null)}
              className="absolute top-4 right-4 p-2 bg-white text-black font-mono font-bold hover:bg-neutral-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b-4 border-white pb-4 mb-4">
              <div className="w-20 h-20 border-3 border-white bg-black overflow-hidden shrink-0">
                <img
                  src={activeCharacter.mangaImage}
                  alt={activeCharacter.name}
                  className="w-full h-full object-cover manga-ink-img"
                />
              </div>
              <div className="flex-1 pr-8">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-400">
                  <span>{activeCharacter.japaneseName}</span>
                  <span>•</span>
                  <span>{activeCharacter.chapterDebut}</span>
                </div>
                <h3 className="font-['Bangers'] text-3xl sm:text-4xl tracking-widest text-white">
                  {activeCharacter.name}
                </h3>
                <div className="font-mono text-xs text-neutral-300">
                  “{activeCharacter.epithet}” • {activeCharacter.role}
                </div>
              </div>
            </div>

            {/* Bounty & Sound Effect Banner */}
            <div className="bg-white text-black p-3.5 border-3 border-black mb-4 flex items-center justify-between font-mono font-black">
              <div>
                <div className="text-[10px] text-neutral-700 tracking-wider">OFFICIAL BOUNTY</div>
                <div className="font-['Bangers'] text-2xl sm:text-3xl tracking-wider">
                  ฿ {activeCharacter.bountyFormatted} -
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-neutral-700">MANGA SFX</div>
                <div className="font-['Bangers'] text-xl tracking-wider text-black">
                  {activeCharacter.mangaSfx}
                </div>
              </div>
            </div>

            {/* Devil Fruit & Haki */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="border-2 border-white p-3 bg-neutral-950">
                <div className="font-['Bangers'] text-sm tracking-wider text-white mb-1">
                  DEVIL FRUIT POWER
                </div>
                {activeCharacter.devilFruit ? (
                  <div>
                    <div className="font-bold text-xs text-white">{activeCharacter.devilFruit.name}</div>
                    <div className="font-mono text-[10px] text-neutral-400 mt-0.5">
                      Class: {activeCharacter.devilFruit.type}
                    </div>
                    <p className="text-xs text-neutral-300 font-serif mt-1">
                      {activeCharacter.devilFruit.description}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-neutral-400 italic">No Devil Fruit. Pure Haki & physical mastery.</p>
                )}
              </div>

              <div className="border-2 border-white p-3 bg-neutral-950">
                <div className="font-['Bangers'] text-sm tracking-wider text-white mb-1">
                  HAKI PROFICIENCIES
                </div>
                {activeCharacter.haki.length > 0 ? (
                  <ul className="text-xs space-y-1 font-mono text-neutral-200">
                    {activeCharacter.haki.map((h, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-white"></span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-neutral-400 italic">No confirmed Haki awakenings.</p>
                )}
              </div>
            </div>

            {/* Combat Power Bars (Manga Monochrome Meters) */}
            <div className="border-2 border-white p-3.5 mb-4 bg-neutral-950">
              <div className="font-['Bangers'] text-sm tracking-wider text-white mb-2">
                COMBAT ASSESSMENT RATINGS
              </div>
              <div className="space-y-1.5">
                {Object.entries(activeCharacter.stats).map(([stat, val]) => (
                  <div key={stat} className="flex items-center gap-2 font-mono text-xs">
                    <span className="w-16 uppercase text-[10px] text-neutral-400 font-bold">{stat}</span>
                    <div className="flex-1 h-2 bg-neutral-800 border border-white">
                      <div className="h-full bg-white" style={{ width: `${val}%` }} />
                    </div>
                    <span className="w-6 text-right font-black">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Manga Speech Quote */}
            <div className="manga-speech-bubble p-4 border-3 border-black text-black">
              <div className="text-[10px] font-mono font-bold text-neutral-600 mb-0.5">ICONIC MANGA DIALOGUE:</div>
              <p className="font-['Bangers'] text-lg sm:text-xl tracking-wide leading-tight">
                “{activeCharacter.famousQuote}”
              </p>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
