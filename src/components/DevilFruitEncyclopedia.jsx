import React, { useState, useMemo } from 'react';
import { Flame, Sparkles, AlertTriangle, Search, Info, Shield, Zap } from 'lucide-react';
import { DEVIL_FRUITS } from '../data/devilFruits';
import { playWoodenClick, playHakiPulse } from '../utils/audio';

export default function DevilFruitEncyclopedia() {
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFruitModal, setActiveFruitModal] = useState(null);

  const fruitTypes = ['All', 'Paramecia', 'Logia', 'Mythical Zoan', 'Awakened Only'];

  const filteredFruits = useMemo(() => {
    return DEVIL_FRUITS.filter((fruit) => {
      // Category filter
      let matchesType = true;
      if (selectedType === 'Paramecia') matchesType = fruit.type.includes('Paramecia');
      else if (selectedType === 'Logia') matchesType = fruit.type.includes('Logia');
      else if (selectedType === 'Mythical Zoan') matchesType = fruit.type.includes('Zoan');
      else if (selectedType === 'Awakened Only') matchesType = fruit.awakening?.status.includes('Awakened');

      // Search filter
      const term = searchQuery.toLowerCase();
      const matchesSearch = 
        fruit.name.toLowerCase().includes(term) ||
        fruit.originalName.toLowerCase().includes(term) ||
        fruit.currentUser.toLowerCase().includes(term) ||
        fruit.powers.toLowerCase().includes(term);

      return matchesType && matchesSearch;
    });
  }, [selectedType, searchQuery]);

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a170f] border border-[#6b3e1f] text-orange-400 text-xs font-serif uppercase tracking-widest mb-3">
          <Flame className="w-3.5 h-3.5 text-orange-500" />
          <span>Curse of the Sea • Encyclopedia of Fruits</span>
        </div>
        <h2 className="font-['Pirata_One'] text-4xl sm:text-5xl text-amber-300 tracking-wider">
          DEVIL FRUIT ENCYCLOPEDIA & AWAKENINGS
        </h2>
        <p className="text-sm sm:text-base text-[#bda78a] max-w-2xl mx-auto mt-2 font-serif">
          Investigate the mysterious treasures of the sea that grant superhuman transformations at the cost of being rejected by the ocean forever.
        </p>
      </div>

      {/* Overview Cards: The 3 Main Classes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-gradient-to-br from-[#26160d] to-[#170c06] border border-[#583719] shadow-md">
          <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
            <span className="text-xl">🌀</span>
            <span className="font-['Pirata_One'] text-2xl tracking-wide">PARAMECIA</span>
          </div>
          <p className="text-xs text-[#b6a388] font-serif leading-relaxed">
            Grants superhuman abilities to alter one’s body or produce substances. Examples: Gura Gura no Mi (Tremors), Ope Ope no Mi (ROOM surgery), Hana Hana no Mi (Sprouting limbs).
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-[#26160d] to-[#170c06] border border-[#583719] shadow-md">
          <div className="flex items-center gap-2 text-orange-400 font-bold mb-1">
            <span className="text-xl">🔥</span>
            <span className="font-['Pirata_One'] text-2xl tracking-wide">LOGIA</span>
          </div>
          <p className="text-xs text-[#b6a388] font-serif leading-relaxed">
            The rarest standard class. Transforms the user into a force of nature itself (Fire, Light, Magma, Darkness), granting intangible elemental forms and devastating destructive radius.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-[#26160d] to-[#170c06] border border-[#583719] shadow-md">
          <div className="flex items-center gap-2 text-yellow-400 font-bold mb-1">
            <span className="text-xl">🐉</span>
            <span className="font-['Pirata_One'] text-2xl tracking-wide">ZOAN & MYTHICAL</span>
          </div>
          <p className="text-xs text-[#b6a388] font-serif leading-relaxed">
            Transforms the user into animals or mythological deities. Mythical Zoans like Nika and Seiryu grant god-level powers, ridiculous regeneration, and environmental alterations.
          </p>
        </div>
      </div>

      {/* Search and Category Tabs */}
      <div className="bg-[#170f09] p-4 rounded-2xl border border-[#4d3219] mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* Type Filter Buttons */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {fruitTypes.map((type) => {
            const isSelected = selectedType === type;
            return (
              <button
                key={type}
                onClick={() => { playWoodenClick(); setSelectedType(type); }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-stone-950 font-bold shadow'
                    : 'bg-[#25170e] text-[#bfab90] hover:bg-[#342013] border border-[#482d16]'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a745c]" />
          <input
            type="text"
            placeholder="Search fruit name, powers, user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#22150d] border border-[#50341b] text-xs text-amber-100 placeholder-[#79644e] focus:outline-none focus:border-amber-500"
          />
        </div>

      </div>

      {/* Devil Fruits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFruits.map((fruit) => {
          const isAwakened = fruit.awakening?.status.includes('Awakened');

          return (
            <div
              key={fruit.id}
              onClick={() => { playHakiPulse(); setActiveFruitModal(fruit); }}
              className="bg-[#1b110a] rounded-2xl border-2 border-[#57391e] p-5 hover:border-amber-500 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between shadow-lg relative overflow-hidden group"
            >
              {/* Subtle fruit icon watermark in background */}
              <div className="absolute -right-4 -bottom-4 text-7xl opacity-10 group-hover:opacity-20 transition-opacity select-none">
                {fruit.icon}
              </div>

              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl p-1.5 rounded-xl bg-[#2a1b11] border border-[#4d3219] shrink-0">
                      {fruit.icon}
                    </span>
                    <div>
                      <h3 className="font-['Pirata_One'] text-2xl text-amber-300 tracking-wide leading-tight group-hover:text-amber-200">
                        {fruit.name}
                      </h3>
                      <div className="text-[11px] text-[#937b60] font-mono">
                        {fruit.originalName} ({fruit.japaneseName})
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 my-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#331e11] text-amber-300 border border-[#613d1f]">
                    {fruit.type}
                  </span>
                  {isAwakened && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-700">
                      ★ Awakened
                    </span>
                  )}
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-950/70 text-purple-300 border border-purple-800">
                    {fruit.rarity}
                  </span>
                </div>

                {/* Current User */}
                <div className="bg-[#130b06] p-2.5 rounded-lg border border-[#3b2512] mb-3">
                  <div className="text-[10px] text-[#867055] uppercase font-bold tracking-wider">Current Known Wielder</div>
                  <div className="text-xs sm:text-sm font-bold text-amber-200 font-serif">{fruit.currentUser}</div>
                </div>

                {/* Powers Preview */}
                <p className="text-xs text-[#b9a589] font-serif leading-relaxed line-clamp-3">
                  {fruit.powers}
                </p>
              </div>

              {/* Bottom footer button */}
              <div className="mt-4 pt-3 border-t border-[#3b2512] flex items-center justify-between text-xs text-amber-400 font-bold">
                <span>View Full Fruit Analysis</span>
                <span className="text-amber-500 group-hover:translate-x-1 transition-transform">→</span>
              </div>

            </div>
          );
        })}
      </div>

      {/* Modal for Fruit Details */}
      {activeFruitModal && (
        <div 
          onClick={() => setActiveFruitModal(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-b from-[#24160d] to-[#120a06] text-amber-100 rounded-2xl border-4 border-[#6c4826] shadow-2xl max-w-xl w-full p-6 sm:p-8 relative my-8"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[#4d3219] pb-4 mb-4">
              <span className="text-5xl">{activeFruitModal.icon}</span>
              <div>
                <span className="text-xs uppercase font-mono text-amber-400">{activeFruitModal.type}</span>
                <h3 className="font-['Pirata_One'] text-3xl sm:text-4xl text-amber-300">
                  {activeFruitModal.name}
                </h3>
                <div className="text-xs text-[#a99479] font-serif">
                  {activeFruitModal.originalName} • {activeFruitModal.japaneseName}
                </div>
              </div>
            </div>

            {/* Users */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-[#190e07] border border-[#412713]">
                <div className="text-[10px] text-[#91795f] uppercase font-bold">Current User</div>
                <div className="text-sm font-bold text-amber-300 mt-0.5">{activeFruitModal.currentUser}</div>
              </div>
              <div className="p-3 rounded-lg bg-[#190e07] border border-[#412713]">
                <div className="text-[10px] text-[#91795f] uppercase font-bold">Former / Historic User</div>
                <div className="text-sm font-bold text-stone-300 mt-0.5">{activeFruitModal.formerUser}</div>
              </div>
            </div>

            {/* Powers */}
            <div className="mb-4 p-3.5 rounded-xl bg-[#1d120a] border border-[#4d3219]">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Superhuman Abilities</span>
              </div>
              <p className="text-xs sm:text-sm text-[#cebc9f] font-serif leading-relaxed">
                {activeFruitModal.powers}
              </p>
            </div>

            {/* Awakening Details */}
            {activeFruitModal.awakening && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-950/40 border border-red-700/60">
                <div className="text-xs font-bold text-red-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-red-400" />
                  <span>Awakening Status: {activeFruitModal.awakening.status}</span>
                </div>
                <p className="text-xs sm:text-sm text-red-200/90 font-serif leading-relaxed">
                  {activeFruitModal.awakening.description}
                </p>
              </div>
            )}

            {/* Danger and Weakness */}
            <div className="p-3 rounded-lg bg-[#150c06] border border-[#382210] flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-amber-300">Weakness & Danger Tier: </span>
                <span className="text-[#a59178] font-serif">{activeFruitModal.weakness} Danger Rating: {activeFruitModal.dangerLevel}.</span>
              </div>
            </div>

            <button
              onClick={() => setActiveFruitModal(null)}
              className="w-full mt-5 py-2.5 rounded-xl bg-[#3c2514] hover:bg-[#52331b] text-amber-200 font-bold text-sm border border-[#6b4221] transition-colors"
            >
              Close Fruit Archive
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
