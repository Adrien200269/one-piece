import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Award, 
  Flame, 
  Zap, 
  Shield, 
  Heart, 
  X, 
  ChevronDown, 
  ExternalLink,
  Skull,
  Crosshair
} from 'lucide-react';
import { CHARACTERS, FACTIONS } from '../data/characters';
import { playWoodenClick, playHakiPulse, playCannonBlast } from '../utils/audio';

export default function CharacterWiki() {
  const [selectedFaction, setSelectedFaction] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('bounty-desc');
  const [hakiFilter, setHakiFilter] = useState('all');
  const [activeCharacter, setActiveCharacter] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('op_favorite_characters') || '[]');
    } catch {
      return [];
    }
  });

  const toggleFavorite = (charId, e) => {
    e.stopPropagation();
    playWoodenClick();
    setFavorites((prev) => {
      const next = prev.includes(charId) 
        ? prev.filter((id) => id !== charId) 
        : [...prev, charId];
      localStorage.setItem('op_favorite_characters', JSON.stringify(next));
      return next;
    });
  };

  const filteredCharacters = useMemo(() => {
    return CHARACTERS.filter((char) => {
      // Faction filter
      const matchesFaction = 
        selectedFaction === 'All' ? true :
        selectedFaction === 'Straw Hat Pirates' ? char.crew === 'Straw Hat Pirates' :
        selectedFaction === 'Emperors of the Sea' ? (char.role.includes('Emperor') || char.role.includes('Yonko')) :
        selectedFaction === 'Cross Guild' ? char.crew === 'Cross Guild' || char.crew.includes('Cross Guild') :
        selectedFaction === 'Marine Headquarters' ? char.crew.includes('Marine') :
        selectedFaction === 'Legends & Roger Pirates' ? (char.crew.includes('Roger') || char.crew.includes('Whitebeard') || char.epithet.includes('King')) :
        true;

      // Search filter
      const term = searchTerm.toLowerCase();
      const matchesSearch = 
        char.name.toLowerCase().includes(term) ||
        char.epithet.toLowerCase().includes(term) ||
        char.crew.toLowerCase().includes(term) ||
        char.signatureMoves.some((m) => m.toLowerCase().includes(term)) ||
        (char.devilFruit && char.devilFruit.name.toLowerCase().includes(term));

      // Haki filter
      const matchesHaki = 
        hakiFilter === 'all' ? true :
        hakiFilter === 'conquerors' ? char.haki.some((h) => h.toLowerCase().includes('conqueror')) :
        hakiFilter === 'devilFruit' ? char.devilFruit !== null :
        hakiFilter === 'favorites' ? favorites.includes(char.id) :
        true;

      return matchesFaction && matchesSearch && matchesHaki;
    }).sort((a, b) => {
      if (sortBy === 'bounty-desc') return b.bounty - a.bounty;
      if (sortBy === 'bounty-asc') return a.bounty - b.bounty;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [selectedFaction, searchTerm, sortBy, hakiFilter, favorites]);

  const openModal = (char) => {
    playHakiPulse();
    setActiveCharacter(char);
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a1b10] border border-[#6d4926] text-amber-300 text-xs font-serif uppercase tracking-widest mb-3">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>World Government Marine Registry</span>
        </div>
        <h2 className="font-['Pirata_One'] text-4xl sm:text-5xl text-amber-300 tracking-wider">
          BOUNTY ARCHIVES & CHARACTER DOSSIERS
        </h2>
        <p className="text-sm sm:text-base text-[#bda78a] max-w-2xl mx-auto mt-2 font-serif">
          Examine notorious pirate bounties issued by the Marines, devil fruit awakenings, and legendary Conqueror’s Haki wielders across the Grand Line.
        </p>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="bg-[#18110b] p-4 sm:p-5 rounded-2xl border-2 border-[#57391e] shadow-xl mb-8 space-y-4">
        
        {/* Top Row: Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b755a]" />
            <input
              type="text"
              placeholder="Search by pirate name, epithet, crew, move, or devil fruit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#23170e] border border-[#5d3f23] text-amber-100 placeholder-[#79644e] focus:outline-none focus:border-amber-500 text-sm"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => { playWoodenClick(); setSortBy(e.target.value); }}
              className="px-3 py-2.5 rounded-xl bg-[#23170e] border border-[#5d3f23] text-amber-200 text-sm focus:outline-none focus:border-amber-500"
            >
              <option value="bounty-desc">Bounty: High → Low</option>
              <option value="bounty-asc">Bounty: Low → High</option>
              <option value="name">Name (A–Z)</option>
            </select>

            <select
              value={hakiFilter}
              onChange={(e) => { playWoodenClick(); setHakiFilter(e.target.value); }}
              className="px-3 py-2.5 rounded-xl bg-[#23170e] border border-[#5d3f23] text-amber-200 text-sm focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Abilities</option>
              <option value="conquerors">Conqueror's Haki</option>
              <option value="devilFruit">Devil Fruit Users</option>
              <option value="favorites">★ Bookmarked</option>
            </select>
          </div>
        </div>

        {/* Faction Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#3b2716]">
          {FACTIONS.map((faction) => {
            const isSelected = selectedFaction === faction;
            return (
              <button
                key={faction}
                onClick={() => { playWoodenClick(); setSelectedFaction(faction); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-amber-600 text-stone-950 shadow-md font-bold'
                    : 'bg-[#251810] text-[#c0ac8f] hover:bg-[#392416] hover:text-amber-200 border border-[#482f1a]'
                }`}
              >
                {faction}
              </button>
            );
          })}
        </div>

      </div>

      {/* Grid of Wanted Posters / Dossier Cards */}
      {filteredCharacters.length === 0 ? (
        <div className="text-center py-16 bg-[#1a110a] rounded-2xl border border-[#4f341d] p-8">
          <Skull className="w-12 h-12 text-[#8d6741] mx-auto mb-3" />
          <h3 className="font-['Pirata_One'] text-2xl text-amber-300">No Pirates Found in Marine Records</h3>
          <p className="text-sm text-[#9c8469] mt-1">Try adjusting your search terms or filter settings.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCharacters.map((char) => {
            const isFav = favorites.includes(char.id);
            const hasConquerors = char.haki.some((h) => h.toLowerCase().includes('conqueror'));

            return (
              <div
                key={char.id}
                onClick={() => openModal(char)}
                className="wanted-paper rounded-xl p-4 flex flex-col justify-between cursor-pointer group hover:-translate-y-1.5 transition-all duration-300 relative text-[#2b180d] select-none"
              >
                {/* Header Wanted Text */}
                <div className="text-center border-b-2 border-[#5a391c] pb-1.5">
                  <div className="text-[11px] font-mono tracking-widest text-[#6c4826] font-bold">
                    MARINE REWARD NOTICE
                  </div>
                  <div className="font-['Pirata_One'] text-3xl tracking-widest text-[#412108] leading-none mt-0.5">
                    WANTED
                  </div>
                </div>

                {/* Favorite Bookmark Button */}
                <button
                  onClick={(e) => toggleFavorite(char.id, e)}
                  title={isFav ? "Remove Bookmark" : "Bookmark Pirate"}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-[#f4ecd8] border border-[#7d562f] shadow hover:scale-110 transition-transform"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-red-600 text-red-600' : 'text-[#7d562f]'}`} />
                </button>

                {/* Character Visual / Portrait Area */}
                <div className="my-3 relative rounded-lg border-2 border-[#5a391c] bg-[#e1ceaa] overflow-hidden aspect-[4/3] flex items-center justify-center group-hover:shadow-inner">
                  {char.avatar ? (
                    <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {char.avatar}
                    </div>
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
                  {/* Status / Badge overlay */}
                  {hasConquerors && (
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-red-900/90 text-yellow-300 text-[10px] font-bold uppercase tracking-wider border border-red-700">
                      Conqueror
                    </div>
                  )}

                  {char.devilFruit?.awakened && (
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-amber-900/90 text-amber-200 text-[10px] font-bold uppercase tracking-wider border border-amber-600">
                      Awakened
                    </div>
                  )}

                  <div className="absolute bottom-1.5 left-2 right-2 text-white text-[11px] truncate font-serif font-bold text-shadow drop-shadow">
                    {char.epithet}
                  </div>
                </div>

                {/* Name */}
                <div className="text-center my-1">
                  <div className="font-['Pirata_One'] text-2xl tracking-wider text-[#241306] leading-tight">
                    {char.name}
                  </div>
                  <div className="text-[11px] font-bold text-[#6a4c2f] truncate font-serif">
                    {char.crew}
                  </div>
                </div>

                {/* Dead or Alive Banner */}
                <div className="text-center text-[10px] font-mono font-bold tracking-widest text-[#7c2828] uppercase my-1">
                  DEAD OR ALIVE
                </div>

                {/* Bounty Value */}
                <div className="bg-[#dfcc9e] border border-[#6b4a29] rounded p-2 text-center mt-1">
                  <div className="text-[9px] text-[#5c3e21] uppercase font-bold tracking-wider">REWARD</div>
                  <div className="font-mono font-black text-lg sm:text-xl text-[#3b1c06] tracking-wider flex items-center justify-center gap-1">
                    <span className="text-sm font-bold">฿</span>
                    <span>{char.bountyFormatted}</span>
                  </div>
                </div>

                {/* View Details Prompt */}
                <div className="mt-2 pt-2 border-t border-[#bfa77b] text-center text-[11px] font-serif font-bold text-[#62401f] group-hover:text-red-900 flex items-center justify-center gap-1">
                  <span>Inspect Dossier</span>
                  <ExternalLink className="w-3 h-3" />
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Character Detail Modal */}
      {activeCharacter && (
        <div 
          onClick={() => setActiveCharacter(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-b from-[#24170f] via-[#1b110a] to-[#120a06] text-amber-100 rounded-2xl border-4 border-[#6d4a25] shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative my-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveCharacter(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#342013] border border-[#6e4926] text-amber-300 hover:text-white hover:bg-red-900/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 border-b border-[#4d3319] pb-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-700/30 border-2 border-amber-500/60 flex items-center justify-center text-4xl shadow-inner shrink-0">
                {activeCharacter.avatar || '☠️'}
              </div>
              <div className="flex-1 pr-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-mono font-bold text-amber-400">
                    {activeCharacter.japaneseName}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-700 font-bold">
                    {activeCharacter.status}
                  </span>
                </div>
                <h3 className="font-['Pirata_One'] text-3xl sm:text-4xl text-amber-300 tracking-wider">
                  {activeCharacter.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#bca586] font-serif">
                  {activeCharacter.epithet} • {activeCharacter.role} ({activeCharacter.crew})
                </p>
              </div>
            </div>

            {/* Bounty Plate in Modal */}
            <div className="my-5 p-3.5 rounded-xl bg-[#140b06] border-2 border-[#5f3e20] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#8e785e] font-mono tracking-widest uppercase font-bold">
                  OFFICIAL WORLD GOVERNMENT REWARD
                </span>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-400">
                  ฿ {activeCharacter.bountyFormatted} -
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#8e785e] font-mono uppercase">Origin</span>
                <div className="text-xs sm:text-sm font-bold text-amber-200">{activeCharacter.origin}</div>
              </div>
            </div>

            {/* Devil Fruit & Haki Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              
              {/* Devil Fruit Card */}
              <div className="p-3.5 rounded-xl bg-[#1d120a] border border-[#482d16]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>Devil Fruit Power</span>
                </div>
                {activeCharacter.devilFruit ? (
                  <div>
                    <div className="font-bold text-sm text-amber-200">{activeCharacter.devilFruit.name}</div>
                    <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">
                      Type: {activeCharacter.devilFruit.type}
                    </div>
                    {activeCharacter.devilFruit.awakened && (
                      <span className="inline-block mt-1 text-[10px] bg-red-950 text-red-300 border border-red-700 px-1.5 py-0.5 rounded font-bold">
                        ★ AWAKENED
                      </span>
                    )}
                    <p className="text-xs text-[#b9a58b] mt-1.5 font-serif leading-relaxed">
                      {activeCharacter.devilFruit.description}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-[#8c7760] italic font-serif">
                    No Devil Fruit ability. Pure Haki & physical mastery.
                  </p>
                )}
              </div>

              {/* Haki Masteries */}
              <div className="p-3.5 rounded-xl bg-[#1d120a] border border-[#482d16]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>Haki Disciplines</span>
                </div>
                {activeCharacter.haki.length > 0 ? (
                  <div className="space-y-1">
                    {activeCharacter.haki.map((hakiName, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span>{hakiName}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#8c7760] italic font-serif">
                    No confirmed Haki awakenings recorded by Marines.
                  </p>
                )}
              </div>

            </div>

            {/* Combat Power Radar Bars */}
            <div className="mb-5 p-3.5 rounded-xl bg-[#1a1008] border border-[#482f18]">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                Marine Combat Assessment Ratings
              </div>
              <div className="space-y-2">
                {Object.entries(activeCharacter.stats).map(([stat, val]) => (
                  <div key={stat} className="flex items-center gap-3 text-xs">
                    <span className="w-16 uppercase text-[10px] text-[#9b856b] font-bold font-mono">
                      {stat}
                    </span>
                    <div className="flex-1 h-2 bg-[#2c1a0e] rounded-full overflow-hidden border border-[#472d17]">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 rounded-full"
                        style={{ width: `${val}%` }}
                      />
                    </div>
                    <span className="w-8 text-right font-mono font-bold text-amber-300">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Moves */}
            <div className="mb-4">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                Notorious Signature Moves
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeCharacter.signatureMoves.map((move, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-[#2d1b0f] border border-[#5a391c] text-xs text-amber-200 font-serif">
                    {move}
                  </span>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="p-3 rounded-lg bg-[#24150b] border-l-4 border-amber-500 italic text-xs sm:text-sm text-[#e0cfb8] font-serif">
              “{activeCharacter.famousQuote}”
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
