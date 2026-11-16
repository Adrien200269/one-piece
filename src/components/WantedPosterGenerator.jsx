import React, { useState, useRef, useEffect } from 'react';
import { 
  Anchor, 
  Download, 
  Upload, 
  Sparkles, 
  Copy, 
  RefreshCw, 
  Check, 
  ShieldAlert,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCannonBlast, playTreasureFanfare, playWoodenClick } from '../utils/audio';

const AVATAR_PRESETS = [
  { label: 'Straw Hat', emoji: '👒' },
  { label: 'Jolly Roger', emoji: '☠️' },
  { label: 'Swordsman', emoji: '⚔️' },
  { label: 'Fire Fist', emoji: '🔥' },
  { label: 'Surgeon', emoji: '⚕️' },
  { label: 'Dragon', emoji: '🐉' },
  { label: 'King', emoji: '👑' },
  { label: 'Cat Burglar', emoji: '🍊' },
  { label: 'Sniper', emoji: '🎯' },
];

export default function WantedPosterGenerator() {
  const [pirateName, setPirateName] = useState('MONKEY D. LUFFY');
  const [epithet, setEpithet] = useState('STRAW HAT');
  const [bounty, setBounty] = useState('3,000,000,000');
  const [condition, setCondition] = useState('DEAD OR ALIVE');
  const [selectedEmoji, setSelectedEmoji] = useState('👒');
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

  // Render poster on HTML5 canvas for crisp export
  const drawPoster = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 600;
    const height = 850;

    canvas.width = width;
    canvas.height = height;

    // 1. Aged Parchment Background
    ctx.fillStyle = '#f2e5c6';
    ctx.fillRect(0, 0, width, height);

    // Weathered paper gradients & stains
    const paperGrad = ctx.createRadialGradient(width/2, height/2, 100, width/2, height/2, 450);
    paperGrad.addColorStop(0, 'rgba(255, 250, 240, 0.2)');
    paperGrad.addColorStop(0.7, 'rgba(209, 185, 145, 0.4)');
    paperGrad.addColorStop(1, 'rgba(148, 116, 75, 0.7)');
    ctx.fillStyle = paperGrad;
    ctx.fillRect(0, 0, width, height);

    // Outer and Inner borders
    ctx.strokeStyle = '#4a2f15';
    ctx.lineWidth = 14;
    ctx.strokeRect(7, 7, width - 14, height - 14);

    ctx.strokeStyle = '#7c582f';
    ctx.lineWidth = 3;
    ctx.strokeRect(22, 22, width - 44, height - 44);

    // 2. WANTED Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#2f1a09';
    ctx.font = '900 84px "Pirata One", Georgia, serif';
    ctx.fillText('WANTED', width / 2, 115);

    // 3. Photo Box Frame
    const photoX = 65;
    const photoY = 150;
    const photoW = 470;
    const photoH = 360;

    ctx.fillStyle = '#e8d8b5';
    ctx.fillRect(photoX, photoY, photoW, photoH);
    ctx.strokeStyle = '#5a3d1d';
    ctx.lineWidth = 6;
    ctx.strokeRect(photoX, photoY, photoW, photoH);

    // Draw Portrait (Custom image or emoji)
    if (customImage) {
      const img = new Image();
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(photoX, photoY, photoW, photoH);
        ctx.clip();
        ctx.drawImage(img, photoX, photoY, photoW, photoH);
        ctx.restore();
        drawFooterAndText(ctx, width, height);
      };
      img.src = customImage;
      return;
    } else {
      ctx.font = '160px serif';
      ctx.textAlign = 'center';
      ctx.fillText(selectedEmoji, width / 2, photoY + 240);
    }

    drawFooterAndText(ctx, width, height);
  };

  const drawFooterAndText = (ctx, width, height) => {
    // 4. Condition: DEAD OR ALIVE
    ctx.fillStyle = '#8f2323';
    ctx.font = '900 36px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '6px';
    ctx.fillText(condition, width / 2, 565);

    // 5. Pirate Name
    ctx.fillStyle = '#2b1708';
    ctx.font = '900 52px "Pirata One", Georgia, serif';
    ctx.fillText(pirateName.toUpperCase(), width / 2, 630);

    // Epithet subtitle
    if (epithet) {
      ctx.fillStyle = '#674728';
      ctx.font = 'bold 20px "Outfit", sans-serif';
      ctx.fillText(`“${epithet.toUpperCase()}”`, width / 2, 665);
    }

    // 6. Bounty Line
    ctx.textAlign = 'left';
    ctx.fillStyle = '#221104';
    ctx.font = 'bold 36px "Pirata One", Georgia, serif';
    ctx.fillText('฿', 80, 740);

    ctx.textAlign = 'center';
    ctx.font = '900 48px monospace';
    ctx.fillText(`${bounty}-`, width / 2 + 15, 740);

    // 7. Marine Insignia Footer
    ctx.strokeStyle = '#856338';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, 775);
    ctx.lineTo(width - 60, 775);
    ctx.stroke();

    ctx.fillStyle = '#523719';
    ctx.font = 'bold 15px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('MARINE HEADQUARTERS • WORLD GOVERNMENT REGISTRY', width / 2, 805);
    ctx.fillText('KONO SAKUHIN WA FICTION DETHUNODE JITSUZAISURU JINBUTSU', width / 2, 825);
  };

  useEffect(() => {
    drawPoster();
  }, [pirateName, epithet, bounty, condition, selectedEmoji, customImage]);

  const downloadPoster = () => {
    playCannonBlast();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `WANTED_${pirateName.replace(/\s+/g, '_')}_BOUNTY.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const copyProclamation = () => {
    playTreasureFanfare();
    const text = `☠️ WORLD GOVERNMENT BOUNTY PROCLAMATION ☠️\nWANTED: ${pirateName.toUpperCase()} (${epithet})\nSTATUS: ${condition}\nBOUNTY: ฿ ${bounty} BERRIES\nIssued by Marine Headquarters. Capture on sight!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a1a0f] border border-[#6d4624] text-amber-400 text-xs font-serif uppercase tracking-widest mb-3">
          <Anchor className="w-3.5 h-3.5 text-amber-500" />
          <span>Official Marine Wanted Poster Forge</span>
        </div>
        <h2 className="font-['Pirata_One'] text-4xl sm:text-5xl text-amber-300 tracking-wider">
          CUSTOM PIRATE WANTED GENERATOR
        </h2>
        <p className="text-sm sm:text-base text-[#bda78a] max-w-2xl mx-auto mt-2 font-serif">
          Issue an official World Government reward notice for yourself or your friends with customizable bounties, epithets, and high-res PNG export.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-6 bg-[#1a110a] rounded-2xl border-2 border-[#57391e] p-6 shadow-xl space-y-5">
          
          <h3 className="font-['Pirata_One'] text-2xl text-amber-300 border-b border-[#4d3219] pb-2 flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <span>Pirate Bounty Information</span>
          </h3>

          {/* Pirate Name */}
          <div>
            <label className="block text-xs uppercase font-mono font-bold text-[#b49e83] mb-1.5">
              Pirate Name
            </label>
            <input
              type="text"
              value={pirateName}
              onChange={(e) => setPirateName(e.target.value)}
              maxLength={26}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#24170e] border border-[#5a391c] text-amber-100 font-serif font-bold text-sm focus:outline-none focus:border-amber-400"
              placeholder="e.g. MONKEY D. LUFFY"
            />
          </div>

          {/* Epithet */}
          <div>
            <label className="block text-xs uppercase font-mono font-bold text-[#b49e83] mb-1.5">
              Pirate Epithet / Title
            </label>
            <input
              type="text"
              value={epithet}
              onChange={(e) => setEpithet(e.target.value)}
              maxLength={30}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#24170e] border border-[#5a391c] text-amber-100 font-serif text-sm focus:outline-none focus:border-amber-400"
              placeholder="e.g. STRAW HAT / KING OF HELL"
            />
          </div>

          {/* Bounty Value */}
          <div>
            <label className="block text-xs uppercase font-mono font-bold text-[#b49e83] mb-1.5">
              Reward Amount (Berries ฿)
            </label>
            <input
              type="text"
              value={bounty}
              onChange={(e) => setBounty(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#24170e] border border-[#5a391c] text-amber-300 font-mono font-black text-base focus:outline-none focus:border-amber-400"
              placeholder="3,000,000,000"
            />

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[10px] text-[#8e7a63] uppercase self-center mr-1">Presets:</span>
              {['30,000,000', '100,000,000', '500,000,000', '1,500,000,000', '3,000,000,000', '5,564,800,000'].map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleQuickBounty(amt)}
                  className="px-2 py-1 rounded bg-[#2b1b11] hover:bg-[#3d2719] text-[10px] font-mono text-amber-300 border border-[#4e331b]"
                >
                  ฿{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Condition Select */}
          <div>
            <label className="block text-xs uppercase font-mono font-bold text-[#b49e83] mb-1.5">
              Target Directive
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['DEAD OR ALIVE', 'ONLY ALIVE', 'DEAD ONLY'].map((cond) => (
                <button
                  key={cond}
                  onClick={() => { playWoodenClick(); setCondition(cond); }}
                  className={`py-2 rounded-lg text-xs font-bold border transition-colors ${
                    condition === cond
                      ? 'bg-red-900 text-yellow-300 border-red-600 shadow'
                      : 'bg-[#24160d] text-[#bca589] border-[#4f341c] hover:bg-[#331e12]'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          {/* Portrait Selection */}
          <div>
            <label className="block text-xs uppercase font-mono font-bold text-[#b49e83] mb-1.5">
              Pirate Portrait
            </label>

            {/* Upload Own Picture */}
            <div className="mb-3">
              <label className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-[#614122] hover:border-amber-400 bg-[#22160d] cursor-pointer text-xs font-bold text-amber-200 transition-colors">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Upload Custom Photo / Drawing</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {customImage && (
                <div className="flex items-center justify-between text-xs text-emerald-400 mt-1.5 px-1">
                  <span>✓ Custom Image Active</span>
                  <button 
                    onClick={() => setCustomImage(null)} 
                    className="text-stone-400 hover:text-red-400 text-[11px]"
                  >
                    Reset to Emoji
                  </button>
                </div>
              )}
            </div>

            {/* Emoji Presets */}
            {!customImage && (
              <div>
                <div className="text-[11px] text-[#8e7a63] mb-1">Or choose an iconic symbol:</div>
                <div className="grid grid-cols-5 sm:grid-cols-9 gap-1.5">
                  {AVATAR_PRESETS.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => { playWoodenClick(); setSelectedEmoji(p.emoji); }}
                      className={`p-2 rounded-lg text-xl border flex items-center justify-center transition-colors ${
                        selectedEmoji === p.emoji
                          ? 'bg-amber-600 border-amber-300'
                          : 'bg-[#22160d] border-[#482f18] hover:bg-[#362113]'
                      }`}
                      title={p.label}
                    >
                      {p.emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Export Buttons */}
          <div className="pt-3 border-t border-[#462d16] flex flex-col sm:flex-row gap-3">
            <button
              onClick={downloadPoster}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-stone-950 font-bold font-serif text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(217,119,6,0.4)] flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-stone-950" />
              <span>Download Wanted Poster PNG</span>
            </button>

            <button
              onClick={copyProclamation}
              className="py-3 px-4 rounded-xl bg-[#2b1a0f] hover:bg-[#3d2516] text-amber-200 border border-[#644222] font-semibold text-sm flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
              <span>{copied ? 'Copied Notice!' : 'Copy Proclamation'}</span>
            </button>
          </div>

        </div>

        {/* Live Canvas Preview Column */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="p-3 rounded-2xl bg-[#130b06] border-2 border-[#52371e] shadow-2xl">
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto rounded-lg shadow-2xl"
              style={{ width: '420px' }}
            />
          </div>
          <p className="text-xs text-[#8c7860] mt-3 font-mono">
            High-Resolution 600×850 Canvas • Ready for Print & Sharing
          </p>
        </div>

      </div>

    </section>
  );
}
