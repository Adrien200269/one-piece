import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Users, 
  Award, 
  RotateCcw, 
  Flame, 
  Check, 
  X, 
  ChevronRight,
  TrendingUp,
  Shield,
  Trophy
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
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz', 'crew', 'bountyGame'

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#27180f] border border-[#644122] text-yellow-400 text-xs font-serif uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
          <span>Pirate Tavern Games & Challenges</span>
        </div>
        <h2 className="font-['Pirata_One'] text-4xl sm:text-5xl text-amber-300 tracking-wider">
          GRAND LINE INTERACTIVE TAVERN
        </h2>
        <p className="text-sm sm:text-base text-[#bda78a] max-w-2xl mx-auto mt-2 font-serif">
          Discover your awakened Devil Fruit, recruit your dream crew within the 5B Berry salary cap, and test your bounty knowledge in the showdown!
        </p>
      </div>

      {/* Mini-Game Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-[#170e08] p-1.5 rounded-2xl border-2 border-[#54381e] flex flex-wrap gap-2">
          <button
            onClick={() => { playWoodenClick(); setActiveTab('quiz'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'quiz'
                ? 'bg-amber-600 text-stone-950 shadow-md font-bold'
                : 'text-[#c2af92] hover:bg-[#28180e] hover:text-amber-200'
            }`}
          >
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Devil Fruit Quiz</span>
          </button>

          <button
            onClick={() => { playWoodenClick(); setActiveTab('crew'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'crew'
                ? 'bg-amber-600 text-stone-950 shadow-md font-bold'
                : 'text-[#c2af92] hover:bg-[#28180e] hover:text-amber-200'
            }`}
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>5B Berry Crew Builder</span>
          </button>

          <button
            onClick={() => { playWoodenClick(); setActiveTab('bountyGame'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'bountyGame'
                ? 'bg-amber-600 text-stone-950 shadow-md font-bold'
                : 'text-[#c2af92] hover:bg-[#28180e] hover:text-amber-200'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>Bounty Higher / Lower</span>
          </button>
        </div>
      </div>

      {/* Mini-Game Views */}
      {activeTab === 'quiz' && <DevilFruitQuiz />}
      {activeTab === 'crew' && <DreamCrewBuilder />}
      {activeTab === 'bountyGame' && <BountyShowdownGame />}

    </section>
  );
}

// ---------------------------------------------------------------------------
// 1. Devil Fruit Personality Quiz
// ---------------------------------------------------------------------------
function DevilFruitQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({ nika: 0, ope: 0, gura: 0, mera: 0, pika: 0, bara: 0 });
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
      // Calculate top winner
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
    setScores({ nika: 0, ope: 0, gura: 0, mera: 0, pika: 0, bara: 0 });
    setResult(null);
  };

  if (result) {
    return (
      <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#24170e] to-[#120a06] border-4 border-[#6e4925] shadow-2xl text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950 border border-red-700 text-yellow-300 text-xs font-bold font-mono uppercase">
          ★ FRUIT AWAKENING DESTINY CONFIRMED ★
        </div>

        <div className="w-28 h-28 mx-auto rounded-full bg-amber-500/20 border-4 border-amber-400 flex items-center justify-center text-6xl shadow-[0_0_40px_rgba(234,179,8,0.4)]">
          {result.avatar}
        </div>

        <div>
          <span className="text-xs font-mono text-amber-400 uppercase font-bold">{result.japanese}</span>
          <h3 className="font-['Pirata_One'] text-4xl sm:text-5xl text-amber-300 mt-1">
            {result.fruitName}
          </h3>
          <div className="text-base font-serif font-bold text-red-400 mt-1">
            Title: {result.title}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#170e08] border border-[#482f18] text-xs sm:text-sm text-[#cebc9f] font-serif leading-relaxed">
          {result.description}
        </div>

        <div className="p-3 rounded-xl bg-[#28180d] border border-[#50331a] flex items-center justify-between text-xs font-serif">
          <span className="text-[#a48e75] uppercase font-bold">Innate Haki Aura:</span>
          <span className="font-bold text-amber-300">{result.aura}</span>
        </div>

        <button
          onClick={restartQuiz}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 font-bold font-serif text-sm shadow hover:brightness-110 flex items-center justify-center gap-2 mx-auto"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retake Awakening Trial</span>
        </button>
      </div>
    );
  }

  const q = FRUIT_QUIZ_QUESTIONS[currentStep];

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#1a110a] border-2 border-[#57391e] shadow-2xl">
      {/* Progress */}
      <div className="flex items-center justify-between text-xs font-mono text-[#a28e75] mb-4">
        <span>TRIAL QUESTION {currentStep + 1} OF {FRUIT_QUIZ_QUESTIONS.length}</span>
        <span>{Math.round(((currentStep + 1) / FRUIT_QUIZ_QUESTIONS.length) * 100)}% COMPLETE</span>
      </div>

      <div className="w-full h-2 bg-[#25170e] rounded-full overflow-hidden border border-[#442c17] mb-6">
        <div 
          className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 transition-all duration-300"
          style={{ width: `${((currentStep + 1) / FRUIT_QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-200 mb-6 leading-relaxed">
        {q.question}
      </h3>

      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            className="w-full text-left p-4 rounded-xl bg-[#23160e] hover:bg-[#342013] border border-[#4f341c] hover:border-amber-400/80 text-xs sm:text-sm text-[#e4d4ba] font-serif transition-all duration-200 hover:translate-x-1 flex items-start gap-3 group"
          >
            <span className="w-6 h-6 rounded-full bg-[#170e08] border border-[#523720] text-amber-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 group-hover:border-amber-400">
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
// 2. 5-Billion Berry Dream Crew Builder
// ---------------------------------------------------------------------------
function DreamCrewBuilder() {
  const SALARY_CAP = 5000000000; // 5 Billion Berries
  const [crew, setCrew] = useState([]);

  const totalSpent = crew.reduce((sum, c) => sum + c.bounty, 0);
  const remainingBudget = SALARY_CAP - totalSpent;

  const addCrewMember = (char) => {
    if (crew.some((c) => c.id === char.id)) return;
    if (crew.length >= 5) {
      alert("Crew limit reached! Maximum 5 members allowed in your Armada.");
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
      alert("Recruit at least 3 members to launch your pirate armada!");
      return;
    }
    playCannonBlast();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const totalPower = crew.reduce((sum, c) => sum + (c.stats?.power || 70), 0);
  const avgHaki = crew.length > 0 ? Math.round(crew.reduce((sum, c) => sum + (c.stats?.haki || 50), 0) / crew.length) : 0;

  return (
    <div className="space-y-8">
      {/* Budget & Stats Dashboard */}
      <div className="p-6 rounded-3xl bg-[#1b110a] border-2 border-[#5e3e20] shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          
          <div className="p-3 rounded-xl bg-[#24160d] border border-[#482d16]">
            <span className="text-[10px] text-[#937e65] uppercase font-mono font-bold">Crew Slots</span>
            <div className="text-2xl font-bold font-mono text-amber-300 mt-0.5">
              {crew.length} / 5 Recruits
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#24160d] border border-[#482d16]">
            <span className="text-[10px] text-[#937e65] uppercase font-mono font-bold">Remaining Berry Cap</span>
            <div className={`text-xl font-bold font-mono mt-0.5 ${remainingBudget < 500000000 ? 'text-red-400' : 'text-emerald-400'}`}>
              ฿ {remainingBudget.toLocaleString()}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#24160d] border border-[#482d16]">
            <span className="text-[10px] text-[#937e65] uppercase font-mono font-bold">Armada Attack Rating</span>
            <div className="text-xl font-bold font-mono text-amber-300 mt-0.5">
              {totalPower} PTS
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={finalizeCrew}
              disabled={crew.length < 3}
              className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 font-bold font-serif text-xs sm:text-sm hover:brightness-110 disabled:opacity-40 transition-all shadow"
            >
              Set Sail! 🏴‍☠️
            </button>
            <button
              onClick={clearCrew}
              className="p-3 rounded-xl bg-[#28180e] hover:bg-[#382214] text-stone-400 hover:text-white border border-[#4c311a]"
              title="Reset Crew"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Selected Crew Roster Slots */}
        <div className="mt-6 pt-6 border-t border-[#3c2514]">
          <div className="text-xs uppercase font-mono font-bold text-[#9e896f] mb-3">
            Current Fleet Roster ({crew.length} Pirates):
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[0, 1, 2, 3, 4].map((slotIndex) => {
              const member = crew[slotIndex];
              return (
                <div
                  key={slotIndex}
                  className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-3 relative text-center ${
                    member
                      ? 'bg-[#29180e] border-amber-500 shadow-md'
                      : 'bg-[#150c06] border-dashed border-[#442b17]'
                  }`}
                >
                  {member ? (
                    <>
                      <button
                        onClick={() => removeCrewMember(member.id)}
                        className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-red-900 text-white text-[10px] flex items-center justify-center hover:bg-red-700"
                        title="Dismiss Member"
                      >
                        ✕
                      </button>
                      <div className="text-3xl mb-1">{member.avatar}</div>
                      <div className="font-serif font-bold text-xs text-amber-200 truncate w-full">
                        {member.name}
                      </div>
                      <div className="text-[10px] font-mono text-amber-400 mt-0.5">
                        ฿{member.bountyFormatted}
                      </div>
                    </>
                  ) : (
                    <div className="text-[#6d563e] text-xs font-mono">
                      <span>Slot #{slotIndex + 1}</span>
                      <div className="text-[10px] mt-1 text-[#54402c]">Empty</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Available Pirates to Recruit */}
      <div>
        <h4 className="font-['Pirata_One'] text-3xl text-amber-300 mb-4">
          Pirates Available for Recruitment:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CHARACTERS.map((char) => {
            const isRecruited = crew.some((c) => c.id === char.id);
            const canAfford = char.bounty <= remainingBudget;

            return (
              <div
                key={char.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                  isRecruited
                    ? 'bg-amber-950/40 border-amber-500 opacity-60'
                    : 'bg-[#1a110a] border-[#442c17] hover:border-[#6b4725]'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="text-2xl shrink-0">{char.avatar}</div>
                  <div className="truncate">
                    <div className="font-serif font-bold text-xs text-amber-200 truncate">{char.name}</div>
                    <div className="text-[10px] font-mono text-amber-400">฿{char.bountyFormatted}</div>
                  </div>
                </div>

                <button
                  onClick={() => addCrewMember(char)}
                  disabled={isRecruited || !canAfford || crew.length >= 5}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors ${
                    isRecruited
                      ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                      : !canAfford
                      ? 'bg-red-950 text-red-400 border border-red-900 cursor-not-allowed'
                      : 'bg-amber-600 hover:bg-amber-500 text-stone-950'
                  }`}
                >
                  {isRecruited ? 'Recruited' : !canAfford ? 'Too Pricey' : 'Recruit'}
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
// 3. Higher / Lower Bounty Showdown
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
      
      {/* Score bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#1b110a] border border-[#52371e]">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-mono text-[#a59178] uppercase font-bold">Current Bounty Streak:</span>
          <span className="text-lg font-mono font-bold text-amber-300">{streak}</span>
        </div>
        <div>
          <span className="text-xs font-mono text-[#a59178] uppercase font-bold mr-2">High Score:</span>
          <span className="text-lg font-mono font-bold text-yellow-400">{bestStreak}</span>
        </div>
      </div>

      {/* Showdown Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        
        {/* Pirate A (Known Bounty) */}
        <div className="wanted-paper rounded-2xl p-6 text-center text-[#2a1708] flex flex-col justify-between aspect-[3/4]">
          <div>
            <div className="font-['Pirata_One'] text-3xl">WANTED</div>
            <div className="text-6xl my-4">{pirateA.avatar}</div>
            <div className="font-['Pirata_One'] text-3xl leading-tight">{pirateA.name}</div>
            <div className="text-xs font-serif font-bold text-[#6a4c2f] mt-1">{pirateA.crew}</div>
          </div>

          <div className="bg-[#dfcc9e] border-2 border-[#694827] rounded-xl p-3 mt-4">
            <div className="text-[10px] uppercase font-mono font-bold text-[#5c3e21]">KNOWN REWARD</div>
            <div className="font-mono text-2xl font-black text-[#2e1503]">
              ฿ {pirateA.bountyFormatted}
            </div>
          </div>
        </div>

        {/* VS Emblem in middle for desktop */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-red-700 border-2 border-yellow-400 text-yellow-300 font-bold font-mono items-center justify-center shadow-2xl">
          VS
        </div>

        {/* Pirate B (Guess Bounty) */}
        <div className="wanted-paper rounded-2xl p-6 text-center text-[#2a1708] flex flex-col justify-between aspect-[3/4]">
          <div>
            <div className="font-['Pirata_One'] text-3xl">WANTED</div>
            <div className="text-6xl my-4">{pirateB.avatar}</div>
            <div className="font-['Pirata_One'] text-3xl leading-tight">{pirateB.name}</div>
            <div className="text-xs font-serif font-bold text-[#6a4c2f] mt-1">{pirateB.crew}</div>
          </div>

          <div>
            <div className="bg-[#dfcc9e] border-2 border-[#694827] rounded-xl p-3 mb-3">
              <div className="text-[10px] uppercase font-mono font-bold text-[#5c3e21]">
                {revealB ? 'ACTUAL REWARD' : 'MYSTERY BOUNTY'}
              </div>
              <div className="font-mono text-2xl font-black text-[#2e1503]">
                {revealB ? `฿ ${pirateB.bountyFormatted}` : '฿ ???,???,???'}
              </div>
            </div>

            {/* Action buttons */}
            {!gameOver && !revealB ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleGuess(true)}
                  className="py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow"
                >
                  ▲ HIGHER
                </button>
                <button
                  onClick={() => handleGuess(false)}
                  className="py-3 rounded-xl bg-red-800 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow"
                >
                  ▼ LOWER
                </button>
              </div>
            ) : null}
          </div>
        </div>

      </div>

      {/* Game Over Modal / Card */}
      {gameOver && (
        <div className="p-6 rounded-2xl bg-red-950/70 border-2 border-red-600 text-center space-y-3">
          <div className="font-['Pirata_One'] text-3xl text-red-200">
            INCORRECT BOUNTY ASSESSMENT!
          </div>
          <p className="text-xs sm:text-sm text-red-300 font-serif">
            {pirateB.name} has a bounty of ฿{pirateB.bountyFormatted}, while {pirateA.name} is ฿{pirateA.bountyFormatted}.
          </p>
          <div className="text-sm font-bold text-amber-300">
            Final Streak: {streak} correct predictions!
          </div>
          <button
            onClick={restartGame}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 font-bold font-serif text-sm shadow hover:brightness-110"
          >
            Play Again
          </button>
        </div>
      )}

    </div>
  );
}
