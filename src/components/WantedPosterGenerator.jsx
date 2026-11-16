import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, 
  Upload, 
  Copy, 
  Check, 
  RefreshCw,
  Search,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCannonBlast, playTreasureFanfare, playWoodenClick } from '../utils/audio';

const MANGA_PORTRAIT_PRESETS = [
  { label: 'Luffy (Straw Hat)', url: '/manga/oda_panels/luffy.png' },
  { label: 'Zoro (King of Hell)', url: '/manga/oda_panels/zoro.png' },
  { label: 'Shanks (Red Hair)', url: '/manga/oda_panels/shanks.png' },
  { label: 'Whitebeard (Quake)', url: '/manga/oda_panels/whitebeard.png' },
  { label: 'Law (Surgeon of Death)', url: '/manga/oda_panels/law.png' },
  { label: 'Ace (Fire Fist)', url: '/manga/oda_panels/ace.png' },
  { label: 'Kaido (Dragon Emperor)', url: '/manga/oda_panels/kaido.png' },
  { label: 'Sanji (Black Leg)', url: '/manga/oda_panels/sanji.png' },
];

export default function WantedPosterGenerator() {
  const [pirateName, setPirateName] = useState('MONKEY D. LUFFY');
  const [epithet, setEpithet] = useState('STRAW HAT');
  const [bounty, setBounty] = useState('3,000,000,000');
  const [condition, setCondition] = useState('DEAD OR ALIVE');
  const [selectedImgUrl, setSelectedImgUrl] = useState(MANGA_PORTRAIT_PRESETS[0].url);
  const [customImage, setCustomImage] = useState(null);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target.result);
        playWoodenClick();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuickBounty = (amt) => {
    playWoodenClick();
    setBounty(amt);
  };

  // Draw Manga Woodblock Wanted Poster on Canvas
  const drawPoster = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 600;
    const height = 850;

    canvas.width = width;
    canvas.height = height;

    // 1. Crisp White Manga Paper Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Subtle manga screentone dot overlay
    ctx.fillStyle = '#f0f0f0';
    for (let x = 0; x < width; x += 10) {
      for (let y = 0; y < height; y += 10) {
        ctx.fillRect(x, y, 1.5, 1.5);
      }
    }

    // Heavy Black Ink Outer Border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 14;
    ctx.strokeRect(7, 7, width - 14, height - 14);

    // Inner thin border
    ctx.lineWidth = 3;
    ctx.strokeRect(22, 22, width - 44, height - 44);

    // 2. WANTED Title (Heavy Black Comic Type)
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000000';
    ctx.font = '900 86px "Bangers", Georgia, serif';
    ctx.fillText('WANTED', width / 2, 115);

    // 3. Manga Portrait Area
    const photoX = 65;
    const photoY = 145;
    const photoW = 470;
    const photoH = 370;

    ctx.fillStyle = '#000000';
    ctx.fillRect(photoX, photoY, photoW, photoH);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 6;
    ctx.strokeRect(photoX, photoY, photoW, photoH);

    // Load and draw portrait image with high-contrast grayscale filter
    const activeSrc = customImage || selectedImgUrl;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.rect(photoX, photoY, photoW, photoH);
      ctx.clip();

      // Grayscale filter
      ctx.filter = 'grayscale(100%) contrast(150%) brightness(95%)';
      ctx.drawImage(img, photoX, photoY, photoW, photoH);
      ctx.restore();

      // Continue drawing bottom text
      drawBottomElements(ctx, width, height);
    };
    img.onerror = () => {
      // Fallback ink box
      ctx.fillStyle = '#222222';
      ctx.fillRect(photoX, photoY, photoW, photoH);
      drawBottomElements(ctx, width, height);
    };
    img.src = activeSrc;
  };

  const drawBottomElements = (ctx, width, height) => {
    // 4. Directive (DEAD OR ALIVE)
    ctx.fillStyle = '#000000';
    ctx.font = '900 38px "Bangers", sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '6px';
    ctx.fillText(condition, width / 2, 570);

    // 5. Pirate Name
    ctx.font = '900 52px "Bangers", Georgia, serif';
    ctx.fillText(pirateName.toUpperCase(), width / 2, 635);

    // Epithet
    if (epithet) {
      ctx.fillStyle = '#333333';
      ctx.font = 'bold 20px "Space Grotesk", sans-serif';
      ctx.fillText(`“${epithet.toUpperCase()}”`, width / 2, 670);
    }

    // 6. Bounty Amount
    ctx.textAlign = 'left';
    ctx.fillStyle = '#000000';
    ctx.font = '900 42px "Bangers", Georgia, serif';
    ctx.fillText('฿', 80, 745);

    ctx.textAlign = 'center';
    ctx.font = '900 48px monospace';
    ctx.fillText(`${bounty}-`, width / 2 + 15, 745);

    // 7. Marine Insignia & Japanese Kanji Seal
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(55, 780);
    ctx.lineTo(width - 55, 780);
    ctx.stroke();

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 15px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('MARINE HEADQUARTERS • MANGA ARCHIVE GAZETTE', width / 2, 805);
    ctx.fillText('KONO SAKUHIN WA FICTION DETHUNODE JITSUZAISURU JINBUTSU', width / 2, 825);
  };

  useEffect(() => {
    drawPoster();
  }, [pirateName, epithet, bounty, condition, selectedImgUrl, customImage]);

  const downloadPoster = () => {
    playCannonBlast();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `WANTED_${pirateName.replace(/\s+/g, '_')}_MANGA.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const copyProclamation = () => {
    playTreasureFanfare();
    const text = `☠️ MANGA BOUNTY NOTICE ☠️\nWANTED: ${pirateName.toUpperCase()} (${epithet})\nDIRECTIVE: ${condition}\nREWARD: ฿ ${bounty} BERRIES\nIssued by Marine Headquarters. ドン!!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="border-b-4 border-white pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <div className="inline-block bg-white text-black text-xs font-mono font-black uppercase px-2 py-0.5 mb-2">
            手配書作成所 • MANGA WOODCUT FORGE
          </div>
          <h2 className="font-['Bangers'] text-4xl sm:text-6xl text-white tracking-widest">
            CUSTOM MANGA WANTED FORGE
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-serif max-w-2xl mt-1">
            Issue your own official black-and-white ink Wanted Notice with custom bounties, epithets, manga panel illustrations, and high-res PNG export.
          </p>
        </div>
        <div className="font-['Bangers'] text-2xl text-white tracking-wider border-2 border-white px-3 py-1 bg-black">
          DON!! ドン!!
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-6 bg-black border-4 border-white p-6 shadow-[8px_8px_0px_#ffffff] space-y-5">
          
          <h3 className="font-['Bangers'] text-2xl text-white border-b-2 border-white pb-2">
            MANGA BOUNTY SPECIFICATIONS
          </h3>

          {/* Name */}
          <div>
            <label className="block text-xs uppercase font-mono font-black text-neutral-300 mb-1">
              Pirate Name
            </label>
            <input
              type="text"
              value={pirateName}
              onChange={(e) => setPirateName(e.target.value)}
              maxLength={26}
              className="w-full px-3.5 py-2.5 bg-neutral-950 border-2 border-white text-white font-['Bangers'] text-lg tracking-wider focus:outline-none"
              placeholder="e.g. MONKEY D. LUFFY"
            />
          </div>

          {/* Epithet */}
          <div>
            <label className="block text-xs uppercase font-mono font-black text-neutral-300 mb-1">
              Pirate Epithet / Title
            </label>
            <input
              type="text"
              value={epithet}
              onChange={(e) => setEpithet(e.target.value)}
              maxLength={30}
              className="w-full px-3.5 py-2.5 bg-neutral-950 border-2 border-white text-white font-mono text-sm focus:outline-none"
              placeholder="e.g. STRAW HAT / KING OF HELL"
            />
          </div>

          {/* Bounty */}
          <div>
            <label className="block text-xs uppercase font-mono font-black text-neutral-300 mb-1">
              Reward Value (Berries ฿)
            </label>
            <input
              type="text"
              value={bounty}
              onChange={(e) => setBounty(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-950 border-2 border-white text-white font-mono font-black text-base focus:outline-none"
              placeholder="3,000,000,000"
            />

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[10px] text-neutral-400 font-mono uppercase self-center mr-1">Presets:</span>
              {['30,000,000', '100,000,000', '500,000,000', '1,500,000,000', '3,000,000,000', '5,564,800,000'].map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleQuickBounty(amt)}
                  className="px-2 py-0.5 border border-neutral-600 bg-neutral-950 hover:border-white text-[10px] font-mono text-white"
                >
                  ฿{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Directive */}
          <div>
            <label className="block text-xs uppercase font-mono font-black text-neutral-300 mb-1">
              Marine Directive
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['DEAD OR ALIVE', 'ONLY ALIVE', 'DEAD ONLY'].map((cond) => (
                <button
                  key={cond}
                  onClick={() => { playWoodenClick(); setCondition(cond); }}
                  className={`py-2 text-xs font-mono font-black border-2 transition-colors ${
                    condition === cond
                      ? 'bg-white text-black border-white'
                      : 'bg-black text-neutral-300 border-neutral-700 hover:border-white'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          {/* Real Manga Image Presets & Upload */}
          <div>
            <label className="block text-xs uppercase font-mono font-black text-neutral-300 mb-1">
              Manga Panel Artwork (No Emojis)
            </label>

            {/* Custom upload */}
            <div className="mb-3">
              <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-white bg-neutral-950 hover:bg-neutral-900 cursor-pointer text-xs font-mono font-bold text-white transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload Custom Photo (Auto-Converted to Manga Ink)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {customImage && (
                <div className="flex items-center justify-between text-xs font-mono text-white mt-1 px-1">
                  <span>✓ Custom Photo Loaded</span>
                  <button 
                    onClick={() => setCustomImage(null)} 
                    className="underline text-neutral-400 hover:text-white"
                  >
                    Reset to Presets
                  </button>
                </div>
              )}
            </div>

            {/* Manga Artwork Presets */}
            {!customImage && (
              <div>
                <div className="text-[11px] font-mono text-neutral-400 mb-1.5">
                  Or select a canon manga panel character:
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {MANGA_PORTRAIT_PRESETS.map((p) => {
                    const isSelected = selectedImgUrl === p.url;
                    return (
                      <button
                        key={p.label}
                        onClick={() => { playWoodenClick(); setSelectedImgUrl(p.url); }}
                        className={`aspect-video border-2 overflow-hidden relative group transition-all ${
                          isSelected
                            ? 'border-white ring-2 ring-white scale-95'
                            : 'border-neutral-700 hover:border-neutral-400'
                        }`}
                      >
                        <img
                          src={p.url}
                          alt={p.label}
                          className="w-full h-full object-cover manga-ink-img"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center p-1 text-[8px] font-mono font-bold text-white text-center leading-tight">
                          {p.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t-2 border-white flex flex-col sm:flex-row gap-3">
            <button
              onClick={downloadPoster}
              className="flex-1 py-3 px-4 bg-white text-black font-['Bangers'] text-xl tracking-wider border-3 border-black shadow-[4px_4px_0px_#ffffff] hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span>DOWNLOAD POSTER PNG</span>
            </button>

            <button
              onClick={copyProclamation}
              className="py-3 px-4 bg-black text-white font-mono text-xs font-bold border-2 border-white hover:bg-neutral-900 flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'COPIED!' : 'COPY PROCLAMATION'}</span>
            </button>
          </div>

        </div>

        {/* Live Canvas Preview Column */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="p-3 bg-black border-4 border-white shadow-[10px_10px_0px_#ffffff]">
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto border-2 border-black"
              style={{ width: '420px' }}
            />
          </div>
          <p className="text-xs text-neutral-400 mt-3 font-mono">
            High-Resolution 600×850 Manga Canvas • 300 DPI Pen-and-Ink Export
          </p>
        </div>

      </div>

    </section>
  );
}
