import React, { useState, useMemo } from 'react';
import { Search, AlertTriangle, Sparkles, X, ChevronRight } from 'lucide-react';
import { DEVIL_FRUITS } from '../data/devilFruits';
import { playWoodenClick, playHakiPulse } from '../utils/audio';

export default function DevilFruitEncyclopedia() {
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFruitModal, setActiveFruitModal] = useState(null);

  const fruitTypes = ['All', 'Paramecia', 'Logia', 'Mythical Zoan', 'Awakened Only'];

  const filteredFruits = useMemo(() => {
    return DEVIL_FRUITS.filter((fruit) => {
      let matchesType = true;
      if (selectedType === 'Paramecia') matchesType = fruit.type.includes('Paramecia');
      else if (selectedType === 'Logia') matchesType = fruit.type.includes('Logia');
      else if (selectedType === 'Mythical Zoan') matchesType = fruit.type.includes('Zoan');
      else if (selectedType === 'Awakened Only') matchesType = fruit.awakening?.status.includes('Awakened');

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
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Manga SBS Header */}
      <div className="border-b-4 border-white pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <div className="inline-block bg-white text-black text-xs font-mono font-black uppercase px-2 py-0.5 mb-2">
            質問を募集するのだ • SBS DEVIL FRUIT CORNER
          </div>
          <h2 className="font-['Bangers'] text-4xl sm:text-6xl text-white tracking-widest">
            DEVIL FRUIT ENCYCLOPEDIA (悪魔の実図鑑)
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-serif max-w-2xl mt-1">
            Manga analysis of the sea's cursed treasures. Examine physical transmutaions, elemental intangibility, and god-tier Awakenings illustrated in monochrome ink.
          </p>
        </div>
        <div className="font-['Shippori_Mincho_B1'] text-2xl text-white font-black border-2 border-white px-3 py-1 bg-black">
          悪魔の実
        </div>
      </div>

      {/* 3 Classes Explanatory Panels (Manga Strip Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="manga-box p-4">
          <div className="flex items-center justify-between border-b-2 border-white pb-1 mb-2">
            <span className="font-['Bangers'] text-xl tracking-wider text-white">超人系 (PARAMECIA)</span>
            <span className="font-mono text-xs font-bold border border-white px-1.5 py-0.2">BODY ALTER</span>
          </div>
          <p className="text-xs text-neutral-300 font-serif leading-relaxed">
            Grants superhuman abilities to modify bodily physiology or emit exotic substances (Tremor shockwaves, surgical ROOMs, Hana Hana limbs).
          </p>
        </div>

        <div className="manga-box p-4">
          <div className="flex items-center justify-between border-b-2 border-white pb-1 mb-2">
            <span className="font-['Bangers'] text-xl tracking-wider text-white">自然系 (LOGIA)</span>
            <span className="font-mono text-xs font-bold border border-white px-1.5 py-0.2">ELEMENTAL</span>
          </div>
          <p className="text-xs text-neutral-300 font-serif leading-relaxed">
            Transforms the user into a force of nature itself (Fire, Magma, Light, Darkness), granting complete elemental intangibility to ordinary non-Haki blows.
          </p>
        </div>

        <div className="manga-box p-4">
          <div className="flex items-center justify-between border-b-2 border-white pb-1 mb-2">
            <span className="font-['Bangers'] text-xl tracking-wider text-white">動物系 (ZOAN / GOD)</span>
            <span className="font-mono text-xs font-bold border border-white px-1.5 py-0.2">MYTHICAL</span>
          </div>
          <p className="text-xs text-neutral-300 font-serif leading-relaxed">
            Transforms into beasts or mythological deities. Mythical forms like Sun God Nika or Azure Dragon grant cartoon god physics, regeneration, and weather manipulation.
          </p>
        </div>
      </div>

      {/* Comic Search & Filter Toolbar */}
      <div className="bg-black border-3 border-white p-4 shadow-[6px_6px_0px_#ffffff] mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* Class Filter Buttons */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {fruitTypes.map((type) => {
            const isSelected = selectedType === type;
            return (
              <button
                key={type}
                onClick={() => { playWoodenClick(); setSelectedType(type); }}
                className={`px-3.5 py-1.5 text-xs font-bold font-mono uppercase tracking-wider border-2 transition-all ${
                  isSelected
                    ? 'bg-white text-black border-white shadow-[3px_3px_0px_#ffffff]'
                    : 'bg-black text-neutral-400 border-neutral-700 hover:border-white hover:text-white'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search fruit name, user, power..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-neutral-950 border-2 border-neutral-600 font-mono text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
          />
        </div>

      </div>

      {/* Devil Fruit Manga Panels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFruits.map((fruit) => {
          const isAwakened = fruit.awakening?.status.includes('Awakened');

          return (
            <div
              key={fruit.id}
              onClick={() => { playHakiPulse(); setActiveFruitModal(fruit); }}
              className="manga-box-paper p-5 flex flex-col justify-between cursor-pointer group select-none relative"
            >
              <div>
                {/* Panel Top Title */}
                <div className="flex items-start justify-between gap-2 border-b-2 border-black pb-2 mb-3">
                  <div>
                    <h3 className="font-['Bangers'] text-2xl text-black tracking-wide leading-tight group-hover:underline">
                      {fruit.name}
                    </h3>
                    <div className="text-[10px] font-mono text-neutral-700">
                      {fruit.originalName} ({fruit.japaneseName})
                    </div>
                  </div>
                  <div className="w-8 h-8 border-2 border-black bg-black text-white font-['Shippori_Mincho_B1'] font-bold flex items-center justify-center shrink-0 text-sm">
                    {fruit.kanjiTag}
                  </div>
                </div>

                {/* Manga Artwork Frame */}
                <div className="relative border-2 border-black bg-black aspect-[16/9] overflow-hidden mb-3">
                  <img
                    src={fruit.mangaArt}
                    alt={fruit.name}
                    className="w-full h-full object-cover manga-ink-img group-hover:scale-105 transition-transform"
                  />
                  {isAwakened && (
                    <div className="absolute top-1.5 left-1.5 bg-black text-white text-[9px] font-mono font-bold px-1.5 py-0.5 border border-white">
                      ★ AWAKENED
                    </div>
                  )}
                  <div className="absolute bottom-1 right-2 bg-white text-black text-[9px] font-mono font-bold px-1.5 py-0.5 border border-black">
                    {fruit.type}
                  </div>
                </div>

                {/* Current Known User Plate */}
                <div className="bg-black text-white p-2 border border-black mb-3 font-mono text-xs flex items-center justify-between">
                  <span className="text-[10px] text-neutral-400">WIELDER</span>
                  <span className="font-bold">{fruit.currentUser}</span>
                </div>

                <p className="text-xs text-neutral-800 font-serif leading-relaxed line-clamp-3">
                  {fruit.powers}
                </p>
              </div>

              {/* Bottom Card Action */}
              <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between font-mono text-xs font-bold text-black group-hover:bg-black group-hover:text-white px-2 py-1 transition-colors">
                <span>READ SBS DOSSIER</span>
                <ChevronRight className="w-4 h-4" />
              </div>

            </div>
          );
        })}
      </div>

      {/* Modal */}
      {activeFruitModal && (
        <div 
          onClick={() => setActiveFruitModal(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-black text-white border-4 border-white p-6 sm:p-8 max-w-xl w-full shadow-[10px_10px_0px_#ffffff] relative my-8"
          >
            <button
              onClick={() => setActiveFruitModal(null)}
              className="absolute top-4 right-4 p-2 bg-white text-black font-mono font-bold hover:bg-neutral-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="border-b-4 border-white pb-4 mb-4 pr-8">
              <span className="bg-white text-black text-[10px] font-mono font-bold px-2 py-0.5">
                CLASS: {activeFruitModal.type.toUpperCase()}
              </span>
              <h3 className="font-['Bangers'] text-3xl sm:text-4xl tracking-widest text-white mt-1">
                {activeFruitModal.name}
              </h3>
              <div className="font-mono text-xs text-neutral-400">
                {activeFruitModal.originalName} • {activeFruitModal.japaneseName}
              </div>
            </div>

            {/* Image */}
            <div className="border-2 border-white aspect-[16/9] overflow-hidden mb-4 bg-neutral-950">
              <img
                src={activeFruitModal.mangaArt}
                alt={activeFruitModal.name}
                className="w-full h-full object-cover manga-ink-img"
              />
            </div>

            {/* Users */}
            <div className="grid grid-cols-2 gap-3 mb-4 font-mono text-xs">
              <div className="border-2 border-white p-2.5 bg-neutral-950">
                <div className="text-[10px] text-neutral-400">CURRENT WIELDER</div>
                <div className="font-bold text-white text-sm mt-0.5">{activeFruitModal.currentUser}</div>
              </div>
              <div className="border-2 border-white p-2.5 bg-neutral-950">
                <div className="text-[10px] text-neutral-400">HISTORIC WIELDER</div>
                <div className="font-bold text-neutral-300 text-sm mt-0.5">{activeFruitModal.formerUser}</div>
              </div>
            </div>

            {/* Powers */}
            <div className="border-2 border-white p-3.5 mb-4 bg-neutral-950">
              <div className="font-['Bangers'] text-sm tracking-wider text-white mb-1">
                ABILITIES & MANGA MANIFESTATION
              </div>
              <p className="text-xs sm:text-sm text-neutral-200 font-serif leading-relaxed">
                {activeFruitModal.powers}
              </p>
            </div>

            {/* Awakening */}
            {activeFruitModal.awakening && (
              <div className="bg-white text-black p-3.5 border-3 border-black mb-4">
                <div className="font-['Bangers'] text-sm tracking-wider text-black">
                  AWAKENING STATUS: {activeFruitModal.awakening.status}
                </div>
                <p className="text-xs text-neutral-900 font-serif leading-relaxed mt-1">
                  {activeFruitModal.awakening.description}
                </p>
              </div>
            )}

            {/* Weakness */}
            <div className="border border-neutral-700 p-2.5 flex items-start gap-2 font-mono text-xs text-neutral-400">
              <AlertTriangle className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Vulnerability: </span>
                <span>{activeFruitModal.weakness} Danger Level: {activeFruitModal.dangerLevel}.</span>
              </div>
            </div>

            <button
              onClick={() => setActiveFruitModal(null)}
              className="w-full mt-4 py-2.5 bg-white text-black font-['Bangers'] text-lg tracking-wider hover:bg-neutral-200 border-2 border-black"
            >
              CLOSE SBS ARCHIVE
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
