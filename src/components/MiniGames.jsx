import React, { useState } from 'react';
import { 
  RotateCcw, 
  Users, 
  TrendingUp, 
  Sparkles, 
  Trophy,
  Check,
  X,
  Flame,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FRUIT_QUIZ_QUESTIONS, QUIZ_RESULTS } from '../data/quizQuestions';
import { CHARACTERS } from '../data/characters';
import { 
  playWoodenClick, 
  playTreasureFanfare, 
  playHakiPulse, 
  playCannonBlast 
} from '../utils/audio';

export default function MiniGames() {
  const [activeTab, setActiveTab] = useState('quiz');

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Manga Tavern Header */}
      <div className="border-b-4 border-white pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <div className="inline-block bg-white text-black text-xs font-mono font-black uppercase px-2 py-0.5 mb-2">
            酒場遊戯 • MANGA TAVERN CHALLENGES
          </div>
          <h2 className="font-['Bangers'] text-4xl sm:text-6xl text-white tracking-widest">
            INTERACTIVE MANGA CHALLENGES
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-serif max-w-2xl mt-1">
            Awaken your canonical Devil Fruit destiny, draft your 5B Berry armada with real manga illustrations, and duel in bounty showdowns.
          </p>
        </div>
        <div className="font-['Bangers'] text-2xl text-white tracking-wider border-2 border-white px-3 py-1 bg-black">
          GOGOGO!! ゴゴゴ
        </div>
      </div>

      {/* Comic Tabs Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-black p-1.5 border-3 border-white shadow-[6px_6px_0px_#ffffff] flex flex-wrap gap-2">
          <button
            onClick={() => { playWoodenClick(); setActiveTab('quiz'); }}
            className={`px-5 py-2.5 text-xs sm:text-sm font-['Bangers'] tracking-wider border-2 transition-all ${
              activeTab === 'quiz'
                ? 'bg-white text-black border-white'
                : 'text-neutral-400 border-transparent hover:text-white hover:border-neutral-600'
            }`}
          >
            FRUIT AWAKENING QUIZ
          </button>

          <button
            onClick={() => { playWoodenClick(); setActiveTab('crew'); }}
            className={`px-5 py-2.5 text-xs sm:text-sm font-['Bangers'] tracking-wider border-2 transition-all ${
              activeTab === 'crew'
                ? 'bg-white text-black border-white'
                : 'text-neutral-400 border-transparent hover:text-white hover:border-neutral-600'
            }`}
          >
            5B BERRY CREW DRAFT
          </button>

          <button
            onClick={() => { playWoodenClick(); setActiveTab('bountyGame'); }}
            className={`px-5 py-2.5 text-xs sm:text-sm font-['Bangers'] tracking-wider border-2 transition-all ${
              activeTab === 'bountyGame'
                ? 'bg-white text-black border-white'
                : 'text-neutral-400 border-transparent hover:text-white hover:border-neutral-600'
            }`}
          >
            BOUNTY HIGHER / LOWER
          </button>
        </div>
      </div>

      {/* Mini-Games Views */}
      {activeTab === 'quiz' && <DevilFruitQuiz />}
      {activeTab === 'crew' && <DreamCrewBuilder />}
      {activeTab === 'bountyGame' && <BountyShowdownGame />}

    </section>
  );
}

// ---------------------------------------------------------------------------
// 1. Devil Fruit Personality Quiz (Pure Black & White Manga Style)
// ---------------------------------------------------------------------------
function DevilFruitQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({ nika: 0, ope: 0, gura: 0, mera: 0, bara: 0 });
  const [result, setResult] = useState(null);

  const handleAnswer = (option) => {
    playWoodenClick();
    const newScores = { ...scores };
    if (option.score) {
      Object.entries(option.score).forEach(([fruit, pts]) => {
        newScores[fruit] = (newScores[fruit] || 0) + pts;
      });
    }
    setScores(newScores);

    if (currentStep + 1 < FRUIT_QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      let topFruit = 'nika';
      let maxScore = -1;
      Object.entries(newScores).forEach(([fruit, score]) => {
        if (score > maxScore) {
          maxScore = score;
          topFruit = fruit;
        }
      });

      playTreasureFanfare();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      setResult(QUIZ_RESULTS[topFruit]);
    }
  };

  const restartQuiz = () => {
    playWoodenClick();
    setCurrentStep(0);
    setScores({ nika: 0, ope: 0, gura: 0, mera: 0, bara: 0 });
    setResult(null);
  };

  if (result) {
    return (
      <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-black border-4 border-white shadow-[10px_10px_0px_#ffffff] text-center space-y-5">
        <div className="inline-block bg-white text-black font-mono text-xs font-black uppercase px-3 py-1">
          ★ AWAKENING DESTINY CONFIRMED • DON!! ★
        </div>

        {/* Real Manga Artwork Image */}
        <div className="w-48 h-32 mx-auto border-3 border-white bg-black overflow-hidden relative">
          <img
            src={result.mangaArt}
            alt={result.fruitName}
            className="w-full h-full object-cover manga-ink-img"
          />
          <div className="absolute top-1 right-2 font-['Bangers'] text-2xl text-white manga-sfx">
            {result.kanji}
          </div>
        </div>

        <div>
          <span className="text-xs font-mono text-neutral-400 uppercase">{result.japanese}</span>
          <h3 className="font-['Bangers'] text-4xl sm:text-5xl text-white mt-1 tracking-widest">
            {result.fruitName}
          </h3>
          <div className="font-mono text-sm font-bold text-white mt-1">
            TITLE: {result.title}
          </div>
        </div>

        <div className="p-4 border-2 border-white bg-neutral-950 text-xs sm:text-sm text-neutral-200 font-serif leading-relaxed">
          {result.description}
        </div>

        <div className="p-3 bg-white text-black font-mono text-xs flex items-center justify-between font-black">
          <span>MANGA ONOMATOPOEIA SFX:</span>
          <span className="font-['Bangers'] text-lg">{result.sfx}</span>
        </div>

        <button
          onClick={restartQuiz}
          className="px-6 py-3 bg-white text-black font-['Bangers'] text-xl tracking-wider border-2 border-black hover:bg-neutral-200 flex items-center justify-center gap-2 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          <span>RETAKE MANGA TRIAL</span>
        </button>
      </div>
    );
  }

  const q = FRUIT_QUIZ_QUESTIONS[currentStep];

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-black border-4 border-white shadow-[8px_8px_0px_#ffffff]">
      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4">
        <span>TRIAL QUESTION {currentStep + 1} OF {FRUIT_QUIZ_QUESTIONS.length}</span>
        <span>{Math.round(((currentStep + 1) / FRUIT_QUIZ_QUESTIONS.length) * 100)}% COMPLETE</span>
      </div>

      <div className="w-full h-2 bg-neutral-900 border border-white mb-6">
        <div 
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${((currentStep + 1) / FRUIT_QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-6 leading-relaxed">
        {q.question}
      </h3>

      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            className="w-full text-left p-4 bg-neutral-950 hover:bg-white hover:text-black border-2 border-neutral-700 hover:border-white text-xs sm:text-sm text-neutral-200 font-serif transition-all flex items-start gap-3 group"
          >
            <span className="w-6 h-6 border border-white bg-black text-white font-mono text-xs flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white">
              {String.fromCharCode(65 + i)}
            </span>
            <span className="flex-1 leading-relaxed">{opt.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. 5-Billion Berry Dream Crew Builder (Manga Portraits)
// ---------------------------------------------------------------------------
function DreamCrewBuilder() {
  const SALARY_CAP = 5000000000;
  const [crew, setCrew] = useState([]);

  const totalSpent = crew.reduce((sum, c) => sum + c.bounty, 0);
  const remainingBudget = SALARY_CAP - totalSpent;

  const addCrewMember = (char) => {
    if (crew.some((c) => c.id === char.id)) return;
    if (crew.length >= 5) {
      alert("Crew full! Maximum 5 members allowed in your Manga Armada.");
      return;
    }
    if (char.bounty > remainingBudget) {
      alert(`Cannot afford ${char.name}! Required: ฿${char.bountyFormatted}, Remaining: ฿${remainingBudget.toLocaleString()}`);
      return;
    }
    playWoodenClick();
    setCrew([...crew, char]);
  };

  const removeCrewMember = (charId) => {
    playWoodenClick();
    setCrew(crew.filter((c) => c.id !== charId));
  };

  const clearCrew = () => {
    playWoodenClick();
    setCrew([]);
  };

  const finalizeCrew = () => {
    if (crew.length < 3) {
      alert("Recruit at least 3 pirates to launch your armada!");
      return;
    }
    playCannonBlast();
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  };

  const totalPower = crew.reduce((sum, c) => sum + (c.stats?.power || 70), 0);

  return (
    <div className="space-y-8">
      {/* Dashboard */}
      <div className="p-6 bg-black border-4 border-white shadow-[8px_8px_0px_#ffffff]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          
          <div className="p-3 border-2 border-white bg-neutral-950 font-mono">
            <span className="text-[10px] text-neutral-400 uppercase font-bold">Crew Roster</span>
            <div className="text-2xl font-black text-white mt-0.5">
              {crew.length} / 5 MEMBERS
            </div>
          </div>

          <div className="p-3 border-2 border-white bg-neutral-950 font-mono">
            <span className="text-[10px] text-neutral-400 uppercase font-bold">Remaining Berries</span>
            <div className="text-xl font-black text-white mt-0.5 truncate">
              ฿ {remainingBudget.toLocaleString()}
            </div>
          </div>

          <div className="p-3 border-2 border-white bg-neutral-950 font-mono">
            <span className="text-[10px] text-neutral-400 uppercase font-bold">Armada Attack</span>
            <div className="text-xl font-black text-white mt-0.5">
              {totalPower} PTS
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={finalizeCrew}
              disabled={crew.length < 3}
              className="flex-1 py-3 px-3 bg-white text-black font-['Bangers'] text-lg tracking-wider border-2 border-black hover:bg-neutral-200 disabled:opacity-40 transition-all shadow"
            >
              LAUNCH ARMADA!
            </button>
            <button
              onClick={clearCrew}
              className="p-3 border-2 border-white bg-neutral-950 hover:bg-neutral-800 text-white"
              title="Reset Crew"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* 5 Roster Slots */}
        <div className="mt-6 pt-6 border-t-2 border-white">
          <div className="text-xs font-mono font-black uppercase text-neutral-400 mb-3">
            YOUR RECRUITED PIRATES ({crew.length} OF 5):
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[0, 1, 2, 3, 4].map((slotIndex) => {
              const member = crew[slotIndex];
              return (
                <div
                  key={slotIndex}
                  className={`aspect-square border-3 flex flex-col items-center justify-between p-2 relative overflow-hidden ${
                    member
                      ? 'border-white bg-neutral-950 shadow-[4px_4px_0px_#ffffff]'
                      : 'border-dashed border-neutral-700 bg-neutral-950'
                  }`}
                >
                  {member ? (
                    <>
                      <button
                        onClick={() => removeCrewMember(member.id)}
                        className="absolute top-1 right-1 w-5 h-5 bg-white text-black font-mono font-black text-[10px] flex items-center justify-center hover:bg-neutral-300 z-10"
                        title="Dismiss"
                      >
                        ✕
                      </button>
                      <div className="w-full h-16 border border-white overflow-hidden bg-black">
                        <img
                          src={member.mangaImage}
                          alt={member.name}
                          className="w-full h-full object-cover manga-ink-img"
                        />
                      </div>
                      <div className="font-['Bangers'] text-xs text-white truncate w-full text-center mt-1">
                        {member.name}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400 font-bold">
                        ฿{member.bountyFormatted}
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-neutral-600 font-mono text-xs">
                      <span>SLOT #{slotIndex + 1}</span>
                      <span className="text-[10px] mt-0.5">EMPTY</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Available Pirates Grid */}
      <div>
        <h4 className="font-['Bangers'] text-3xl text-white tracking-widest mb-4">
          AVAILABLE PIRATES FOR MANGA DRAFT:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CHARACTERS.map((char) => {
            const isRecruited = crew.some((c) => c.id === char.id);
            const canAfford = char.bounty <= remainingBudget;

            return (
              <div
                key={char.id}
                className={`p-3 border-2 flex items-center justify-between gap-3 ${
                  isRecruited
                    ? 'border-neutral-700 bg-neutral-950 opacity-40'
                    : 'border-white bg-black hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="w-10 h-10 border border-white shrink-0 overflow-hidden bg-black">
                    <img
                      src={char.mangaImage}
                      alt={char.name}
                      className="w-full h-full object-cover manga-ink-img"
                    />
                  </div>
                  <div className="truncate font-mono">
                    <div className="font-bold text-xs text-white truncate">{char.name}</div>
                    <div className="text-[10px] text-neutral-400 font-bold">฿{char.bountyFormatted}</div>
                  </div>
                </div>

                <button
                  onClick={() => addCrewMember(char)}
                  disabled={isRecruited || !canAfford || crew.length >= 5}
                  className={`px-3 py-1.5 text-xs font-mono font-black uppercase shrink-0 transition-colors ${
                    isRecruited
                      ? 'bg-neutral-800 text-neutral-500'
                      : !canAfford
                      ? 'border border-neutral-700 text-neutral-500'
                      : 'bg-white text-black hover:bg-neutral-200'
                  }`}
                >
                  {isRecruited ? 'DRAFTED' : !canAfford ? 'OVER CAP' : 'DRAFT'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. Bounty Higher / Lower Showdown
// ---------------------------------------------------------------------------
function BountyShowdownGame() {
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(() => {
    try {
      return parseInt(localStorage.getItem('op_best_streak') || '0', 10);
    } catch {
      return 0;
    }
  });

  const [pirateA, setPirateA] = useState(CHARACTERS[0]);
  const [pirateB, setPirateB] = useState(CHARACTERS[1]);
  const [gameOver, setGameOver] = useState(false);
  const [revealB, setRevealB] = useState(false);

  const pickNewRound = (keepPirate) => {
    const pool = CHARACTERS.filter((c) => c.id !== keepPirate.id);
    const randomNext = pool[Math.floor(Math.random() * pool.length)];
    setPirateA(keepPirate);
    setPirateB(randomNext);
    setRevealB(false);
  };

  const handleGuess = (guessHigher) => {
    setRevealB(true);
    const isHigher = pirateB.bounty >= pirateA.bounty;
    const isCorrect = guessHigher ? isHigher : !isHigher;

    if (isCorrect) {
      playTreasureFanfare();
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > bestStreak) {
        setBestStreak(nextStreak);
        localStorage.setItem('op_best_streak', nextStreak.toString());
      }
      setTimeout(() => {
        pickNewRound(pirateB);
      }, 1500);
    } else {
      playCannonBlast();
      setGameOver(true);
    }
  };

  const restartGame = () => {
    playWoodenClick();
    setStreak(0);
    setGameOver(false);
    const randA = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    const pool = CHARACTERS.filter((c) => c.id !== randA.id);
    const randB = pool[Math.floor(Math.random() * pool.length)];
    setPirateA(randA);
    setPirateB(randB);
    setRevealB(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Score Header */}
      <div className="flex items-center justify-between p-4 bg-black border-3 border-white shadow-[4px_4px_0px_#ffffff] font-mono">
        <div>
          <span className="text-xs uppercase text-neutral-400">CURRENT STREAK: </span>
          <span className="text-lg font-black text-white">{streak}</span>
        </div>
        <div>
          <span className="text-xs uppercase text-neutral-400">BEST STREAK: </span>
          <span className="text-lg font-black text-white">{bestStreak}</span>
        </div>
      </div>

      {/* Duel Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        
        {/* Pirate A */}
        <div className="manga-box-paper p-5 text-center flex flex-col justify-between aspect-[3/4]">
          <div>
            <div className="font-['Bangers'] text-2xl border-b-2 border-black pb-1">WANTED NOTICE</div>
            <div className="aspect-[4/3] border-2 border-black my-3 overflow-hidden bg-black">
              <img
                src={pirateA.mangaImage}
                alt={pirateA.name}
                className="w-full h-full object-cover manga-ink-img"
              />
            </div>
            <div className="font-['Bangers'] text-2xl leading-tight">{pirateA.name}</div>
            <div className="font-mono text-xs text-neutral-700">{pirateA.crew}</div>
          </div>

          <div className="bg-black text-white p-3 font-mono border-2 border-black mt-2">
            <div className="text-[9px] text-neutral-400">KNOWN BOUNTY</div>
            <div className="font-['Bangers'] text-2xl">฿ {pirateA.bountyFormatted}</div>
          </div>
        </div>

        {/* VS Stamp */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white text-black border-3 border-black font-['Bangers'] text-xl items-center justify-center shadow-[4px_4px_0px_#000000]">
          VS
        </div>

        {/* Pirate B */}
        <div className="manga-box-paper p-5 text-center flex flex-col justify-between aspect-[3/4]">
          <div>
            <div className="font-['Bangers'] text-2xl border-b-2 border-black pb-1">WANTED NOTICE</div>
            <div className="aspect-[4/3] border-2 border-black my-3 overflow-hidden bg-black">
              <img
                src={pirateB.mangaImage}
                alt={pirateB.name}
                className="w-full h-full object-cover manga-ink-img"
              />
            </div>
            <div className="font-['Bangers'] text-2xl leading-tight">{pirateB.name}</div>
            <div className="font-mono text-xs text-neutral-700">{pirateB.crew}</div>
          </div>

          <div>
            <div className="bg-black text-white p-3 font-mono border-2 border-black mb-3">
              <div className="text-[9px] text-neutral-400">{revealB ? 'ACTUAL REWARD' : 'MYSTERY REWARD'}</div>
              <div className="font-['Bangers'] text-2xl">
                {revealB ? `฿ ${pirateB.bountyFormatted}` : '฿ ???,???,???'}
              </div>
            </div>

            {!gameOver && !revealB ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleGuess(true)}
                  className="py-3 bg-white text-black font-['Bangers'] text-base border-2 border-black hover:bg-neutral-200"
                >
                  ▲ HIGHER
                </button>
                <button
                  onClick={() => handleGuess(false)}
                  className="py-3 bg-black text-white font-['Bangers'] text-base border-2 border-black hover:bg-neutral-900"
                >
                  ▼ LOWER
                </button>
              </div>
            ) : null}
          </div>
        </div>

      </div>

      {/* Game Over Notice */}
      {gameOver && (
        <div className="p-6 bg-white text-black border-4 border-black text-center space-y-3 font-mono">
          <div className="font-['Bangers'] text-4xl text-black">
            INCORRECT BOUNTY ASSESSMENT!! ドン!!
          </div>
          <p className="text-xs text-neutral-700 font-serif">
            {pirateB.name} is ฿{pirateB.bountyFormatted}, while {pirateA.name} is ฿{pirateA.bountyFormatted}.
          </p>
          <div className="text-base font-black">
            Final Streak: {streak} correct calls!
          </div>
          <button
            onClick={restartGame}
            className="px-6 py-2.5 bg-black text-white font-['Bangers'] text-lg tracking-wider border-2 border-black hover:bg-neutral-800"
          >
            PLAY AGAIN
          </button>
        </div>
      )}

    </div>
  );
}
