export const FRUIT_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "You arrive at a desolate, starving island guarded by corrupt World Government agents. What is your immediate instinct?",
    options: [
      { text: "Kick the door down, beat up the corrupt boss, and raid the banquet for everyone to feast!", fruit: 'nika', score: { nika: 3, mera: 1 } },
      { text: "Set up a silent perimeter, calculate enemy patrol routes, and extract the captives with surgery-level precision.", fruit: 'ope', score: { ope: 3 } },
      { text: "Unleash a thunderous ground tremor to collapse their headquarters and announce my arrival.", fruit: 'gura', score: { gura: 3, mera: 1 } },
      { text: "Run around screaming, accidentally trigger an underground bomb, and somehow end up celebrated as a messiah.", fruit: 'bara', score: { bara: 3 } }
    ]
  },
  {
    id: 2,
    question: "What is your philosophy on life and sailing the seas?",
    options: [
      { text: "True freedom! I don’t want to conquer anything; being Pirate King means having the most freedom in the world!", fruit: 'nika', score: { nika: 3 } },
      { text: "Knowledge, revenge, and keeping the promises I made to those who gave their lives for me.", fruit: 'ope', score: { ope: 3 } },
      { text: "Protecting my family and crew at all costs. An insult to my sons is an insult to my grave.", fruit: 'gura', score: { gura: 3 } },
      { text: "Living with no regrets, burning bright with every second I have on this ocean.", fruit: 'mera', score: { mera: 3 } },
      { text: "Basking in shiny jewels, accumulating treasure, and failing upward to ultimate royalty!", fruit: 'bara', score: { bara: 3 } }
    ]
  },
  {
    id: 3,
    question: "When facing an Admiral or Emperor in battle, what is your signature approach?",
    options: [
      { text: "Laugh hysterically, turn the floor into rubber, jump rope with them, and hit them with a fist the size of an island!", fruit: 'nika', score: { nika: 3 } },
      { text: "Cast ROOM, swap their sword with a pebble, and pierce their internal organs with gamma radiation.", fruit: 'ope', score: { ope: 3 } },
      { text: "Shatter the air in front of me with bare knuckles and crack the sea in two.", fruit: 'gura', score: { gura: 3 } },
      { text: "Detach my torso, fly away in panic, and accidentally throw a mega bomb right into their face.", fruit: 'bara', score: { bara: 3 } }
    ]
  },
  {
    id: 4,
    question: "What is your prized possession on your pirate ship?",
    options: [
      { text: "A giant bone-in roasted meat chunk that refills my stamina instantly!", fruit: 'nika', score: { nika: 2 } },
      { text: "A Kikoku nodachi sword and medical journals on human anatomy and ancient curses.", fruit: 'ope', score: { ope: 2 } },
      { text: "A giant sake barrel shared among my beloved pirate sons and daughters.", fruit: 'gura', score: { gura: 2 } },
      { text: "A giant chest brimming with gold doubloons, emeralds, and diamond-encrusted rings!", fruit: 'bara', score: { bara: 2 } }
    ]
  },
  {
    id: 5,
    question: "How do you want the Marines to describe your pirate threat in their newspapers?",
    options: [
      { text: "The Warrior of Liberation who brings laughter and shatters ancient chains!", fruit: 'nika', score: { nika: 3 } },
      { text: "The Surgeon of Death whose tactical intellect outwits entire fleet formations.", fruit: 'ope', score: { ope: 3 } },
      { text: "The Cataclysmic Juggernaut whose rage can submerge continents.", fruit: 'gura', score: { gura: 3 } },
      { text: "The Emperor who commands legions through unfathomable charisma and mysterious luck!", fruit: 'bara', score: { bara: 3 } }
    ]
  }
];

export const QUIZ_RESULTS = {
  nika: {
    fruitName: 'Hito Hito no Mi, Model: Nika',
    japanese: 'ヒトヒトの実 モデル“ニカ”',
    title: 'The Warrior of Liberation (解放の戦士)',
    description: 'You possess the will of Joy Boy! You fight with ridiculous joy, rubbery cartoon physics, and boundless freedom. As long as you hear the Drums of Liberation, nobody in the world can chain you down!',
    sfx: 'ドンドットット!! (DODON-TOT-TO!)',
    mangaArt: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    kanji: '太陽神'
  },
  ope: {
    fruitName: 'Ope Ope no Mi (Op-Op Fruit)',
    japanese: 'オペオペの実',
    title: 'The Mastermind Surgeon (死の外科医)',
    description: 'You are calculating, intensely loyal, and an unmatched strategist. Within your ROOM, you are absolute sovereign: slicing space, teleporting allies, and piercing hearts with surgical mastery.',
    sfx: 'シャンブルズ!! (SHAMBLES!)',
    mangaArt: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    kanji: '執刀'
  },
  gura: {
    fruitName: 'Gura Gura no Mi (Tremor-Tremor Fruit)',
    japanese: 'グラグラの実',
    title: 'The Earth-Shattering Patriarch (大海賊)',
    description: 'Family and honor come above everything. You wield the power to shake oceans and break atmospheric boundaries. Anyone who threatens your crew faces an island-splitting shockwave.',
    sfx: 'グララララ!! (GURARARA!)',
    mangaArt: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    kanji: '震動'
  },
  mera: {
    fruitName: 'Mera Mera no Mi (Flame-Flame Fruit)',
    japanese: 'メラメラの実',
    title: 'The Blazing Flame Fist (火拳)',
    description: 'Fierce, passionate, and burning with loyalty. Your fire warms the cold nights of the Grand Line and incinerates fleets that dare oppress your brothers.',
    sfx: 'ヒケンッ!! (FIRE FIST!)',
    mangaArt: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    kanji: '火拳'
  },
  bara: {
    fruitName: 'Bara Bara no Mi (Chop-Chop Fruit)',
    japanese: 'バラバラの実',
    title: 'The Emperor of Fortune (千両道化)',
    description: 'Slash-proof, charismatic, and destined for greatness despite yourself! Through sheer comedic destiny and flamboyant survival, you’ve ascended to Emperor of the Sea!',
    sfx: 'ハデにドーン!! (FLASHY DON!)',
    mangaArt: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    kanji: '道化'
  }
};
