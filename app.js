/* Allons-y — Learn French. Vanilla JS, no build step. */
"use strict";

const STORAGE_KEY = "allonsy-v1";
const TZ = "America/Indianapolis";
const DAILY_GOAL_DEFAULT = 10;
const QUIZ_LENGTH = 10;

const THEMES = [
  { id: "greetings", name: "Greetings", blurb: "Hellos, thanks, and names", color: "#e8a56a" },
  { id: "numbers", name: "Numbers", blurb: "Counting and “how much?”", color: "#7eb8d4" },
  { id: "food", name: "Food", blurb: "Meals, staples, and ordering", color: "#d17a6a" },
  { id: "travel", name: "Travel", blurb: "Directions, tickets, and help", color: "#8cbf7a" },
  { id: "verbs", name: "Everyday verbs", blurb: "The verbs you’ll use most", color: "#c4a0e0" }
];

const CARDS = [
  // Greetings (20)
  { id: "g01", theme: "greetings", fr: "Bonjour", en: "Hello / Good morning", speak: "Bonjour" },
  { id: "g02", theme: "greetings", fr: "Bonsoir", en: "Good evening", speak: "Bonsoir" },
  { id: "g03", theme: "greetings", fr: "Salut", en: "Hi / Bye (informal)", speak: "Salut", note: "Casual. Fine with friends; less so with strangers or at work." },
  { id: "g04", theme: "greetings", fr: "Au revoir", en: "Goodbye", speak: "Au revoir" },
  { id: "g05", theme: "greetings", fr: "À bientôt", en: "See you soon", speak: "À bientôt" },
  { id: "g06", theme: "greetings", fr: "À demain", en: "See you tomorrow", speak: "À demain" },
  { id: "g07", theme: "greetings", fr: "Bonne journée !", en: "Have a nice day!", speak: "Bonne journée" },
  { id: "g08", theme: "greetings", fr: "Merci", en: "Thank you", speak: "Merci" },
  { id: "g09", theme: "greetings", fr: "Merci beaucoup", en: "Thank you very much", speak: "Merci beaucoup" },
  { id: "g10", theme: "greetings", fr: "S’il vous plaît", en: "Please (formal or plural)", speak: "S’il vous plaît" },
  { id: "g11", theme: "greetings", fr: "S’il te plaît", en: "Please (informal)", speak: "S’il te plaît" },
  { id: "g12", theme: "greetings", fr: "De rien", en: "You’re welcome", speak: "De rien" },
  { id: "g13", theme: "greetings", fr: "Excusez-moi", en: "Excuse me (formal)", speak: "Excusez-moi" },
  { id: "g14", theme: "greetings", fr: "Oui", en: "Yes", speak: "Oui" },
  { id: "g15", theme: "greetings", fr: "Non", en: "No", speak: "Non" },
  { id: "g16", theme: "greetings", fr: "Comment allez-vous ?", en: "How are you? (formal)", speak: "Comment allez-vous ?" },
  { id: "g17", theme: "greetings", fr: "Ça va ?", en: "How’s it going? (informal)", speak: "Ça va ?" },
  { id: "g18", theme: "greetings", fr: "Je m’appelle…", en: "My name is…", speak: "Je m’appelle" },
  { id: "g19", theme: "greetings", fr: "Enchanté / Enchantée", en: "Nice to meet you (said by a man / by a woman)", speak: "Enchanté", note: "The speaker’s gender chooses the ending: Enchanté or Enchantée." },
  { id: "g20", theme: "greetings", fr: "Comment vous appelez-vous ?", en: "What is your name? (formal)", speak: "Comment vous appelez-vous ?" },

  // Numbers (20)
  { id: "n01", theme: "numbers", fr: "Zéro", en: "Zero", speak: "Zéro" },
  { id: "n02", theme: "numbers", fr: "Un / une", en: "One (un before a masculine noun, une before a feminine noun)", speak: "Un", note: "Same words are also the a/an articles." },
  { id: "n03", theme: "numbers", fr: "Deux", en: "Two", speak: "Deux" },
  { id: "n04", theme: "numbers", fr: "Trois", en: "Three", speak: "Trois" },
  { id: "n05", theme: "numbers", fr: "Quatre", en: "Four", speak: "Quatre" },
  { id: "n06", theme: "numbers", fr: "Cinq", en: "Five", speak: "Cinq" },
  { id: "n07", theme: "numbers", fr: "Six", en: "Six", speak: "Six" },
  { id: "n08", theme: "numbers", fr: "Sept", en: "Seven", speak: "Sept" },
  { id: "n09", theme: "numbers", fr: "Huit", en: "Eight", speak: "Huit" },
  { id: "n10", theme: "numbers", fr: "Neuf", en: "Nine", speak: "Neuf" },
  { id: "n11", theme: "numbers", fr: "Dix", en: "Ten", speak: "Dix" },
  { id: "n12", theme: "numbers", fr: "Vingt", en: "Twenty", speak: "Vingt" },
  { id: "n13", theme: "numbers", fr: "Trente", en: "Thirty", speak: "Trente" },
  { id: "n14", theme: "numbers", fr: "Cinquante", en: "Fifty", speak: "Cinquante" },
  { id: "n15", theme: "numbers", fr: "Soixante-dix", en: "Seventy (literally “sixty-ten”)", speak: "Soixante-dix", note: "French counts 70 as 60 + 10." },
  { id: "n16", theme: "numbers", fr: "Quatre-vingts", en: "Eighty (literally “four twenties”)", speak: "Quatre-vingts", note: "The s is used when it means exactly 80." },
  { id: "n17", theme: "numbers", fr: "Quatre-vingt-dix", en: "Ninety (literally “four-twenty-ten”)", speak: "Quatre-vingt-dix", note: "No s on vingt in 90, 91, and so on." },
  { id: "n18", theme: "numbers", fr: "Cent", en: "One hundred", speak: "Cent" },
  { id: "n19", theme: "numbers", fr: "Mille", en: "One thousand", speak: "Mille" },
  { id: "n20", theme: "numbers", fr: "Combien ?", en: "How much? / How many?", speak: "Combien ?" },

  // Food (20)
  { id: "f01", theme: "food", fr: "Le pain", en: "Bread", speak: "Le pain", gender: "m" },
  { id: "f02", theme: "food", fr: "L’eau", en: "Water", speak: "L’eau", gender: "f", note: "Eau is feminine, so it is l’eau and une eau." },
  { id: "f03", theme: "food", fr: "Le café", en: "Coffee", speak: "Le café", gender: "m" },
  { id: "f04", theme: "food", fr: "Le vin", en: "Wine", speak: "Le vin", gender: "m" },
  { id: "f05", theme: "food", fr: "Le fromage", en: "Cheese", speak: "Le fromage", gender: "m" },
  { id: "f06", theme: "food", fr: "La viande", en: "Meat", speak: "La viande", gender: "f" },
  { id: "f07", theme: "food", fr: "Le poisson", en: "Fish", speak: "Le poisson", gender: "m" },
  { id: "f08", theme: "food", fr: "Le poulet", en: "Chicken", speak: "Le poulet", gender: "m" },
  { id: "f09", theme: "food", fr: "Un croissant", en: "A croissant", speak: "Un croissant", gender: "m" },
  { id: "f10", theme: "food", fr: "Une baguette", en: "A baguette", speak: "Une baguette", gender: "f" },
  { id: "f11", theme: "food", fr: "Une pomme", en: "An apple", speak: "Une pomme", gender: "f" },
  { id: "f12", theme: "food", fr: "Le lait", en: "Milk", speak: "Le lait", gender: "m" },
  { id: "f13", theme: "food", fr: "Le petit-déjeuner", en: "Breakfast", speak: "Le petit-déjeuner", gender: "m" },
  { id: "f14", theme: "food", fr: "Le déjeuner", en: "Lunch", speak: "Le déjeuner", gender: "m" },
  { id: "f15", theme: "food", fr: "Le dîner", en: "Dinner", speak: "Le dîner", gender: "m" },
  { id: "f16", theme: "food", fr: "J’ai faim.", en: "I am hungry.", speak: "J’ai faim", note: "French says “I have hunger,” with avoir." },
  { id: "f17", theme: "food", fr: "J’ai soif.", en: "I am thirsty.", speak: "J’ai soif", note: "Literally “I have thirst.”" },
  { id: "f18", theme: "food", fr: "L’addition, s’il vous plaît.", en: "The check, please.", speak: "L’addition, s’il vous plaît", gender: "f", note: "Addition (the restaurant bill) is feminine." },
  { id: "f19", theme: "food", fr: "C’est délicieux.", en: "It’s delicious.", speak: "C’est délicieux" },
  { id: "f20", theme: "food", fr: "Je voudrais…", en: "I would like…", speak: "Je voudrais", note: "The polite way to order or ask for something." },

  // Travel (20)
  { id: "t01", theme: "travel", fr: "L’hôtel", en: "The hotel", speak: "L’hôtel", gender: "m" },
  { id: "t02", theme: "travel", fr: "La gare", en: "The train station", speak: "La gare", gender: "f" },
  { id: "t03", theme: "travel", fr: "L’aéroport", en: "The airport", speak: "L’aéroport", gender: "m" },
  { id: "t04", theme: "travel", fr: "Le train", en: "The train", speak: "Le train", gender: "m" },
  { id: "t05", theme: "travel", fr: "L’avion", en: "The airplane", speak: "L’avion", gender: "m" },
  { id: "t06", theme: "travel", fr: "Un billet", en: "A ticket", speak: "Un billet", gender: "m" },
  { id: "t07", theme: "travel", fr: "Le passeport", en: "The passport", speak: "Le passeport", gender: "m" },
  { id: "t08", theme: "travel", fr: "Les toilettes", en: "The restroom", speak: "Les toilettes", gender: "fpl", note: "Feminine plural. The usual word for a public restroom in France." },
  { id: "t09", theme: "travel", fr: "Où est… ?", en: "Where is…?", speak: "Où est" },
  { id: "t10", theme: "travel", fr: "À gauche", en: "To the left", speak: "À gauche" },
  { id: "t11", theme: "travel", fr: "À droite", en: "To the right", speak: "À droite" },
  { id: "t12", theme: "travel", fr: "Tout droit", en: "Straight ahead", speak: "Tout droit", note: "Not “à droit.” Droit here means “straight.”" },
  { id: "t13", theme: "travel", fr: "Je cherche…", en: "I am looking for…", speak: "Je cherche" },
  { id: "t14", theme: "travel", fr: "Combien ça coûte ?", en: "How much does it cost?", speak: "Combien ça coûte ?" },
  { id: "t15", theme: "travel", fr: "Parlez-vous anglais ?", en: "Do you speak English?", speak: "Parlez-vous anglais ?" },
  { id: "t16", theme: "travel", fr: "Je ne comprends pas.", en: "I don’t understand.", speak: "Je ne comprends pas" },
  { id: "t17", theme: "travel", fr: "Aidez-moi, s’il vous plaît.", en: "Please help me.", speak: "Aidez-moi, s’il vous plaît" },
  { id: "t18", theme: "travel", fr: "Je suis perdu / perdue", en: "I am lost (said by a man / by a woman)", speak: "Je suis perdu", note: "A man says perdu; a woman says perdue." },
  { id: "t19", theme: "travel", fr: "Ouvert", en: "Open", speak: "Ouvert" },
  { id: "t20", theme: "travel", fr: "Fermé", en: "Closed", speak: "Fermé" },

  // Everyday verbs (20)
  { id: "v01", theme: "verbs", fr: "Être", en: "To be", speak: "Être" },
  { id: "v02", theme: "verbs", fr: "Avoir", en: "To have", speak: "Avoir" },
  { id: "v03", theme: "verbs", fr: "Aller", en: "To go", speak: "Aller" },
  { id: "v04", theme: "verbs", fr: "Faire", en: "To do / to make", speak: "Faire" },
  { id: "v05", theme: "verbs", fr: "Parler", en: "To speak", speak: "Parler" },
  { id: "v06", theme: "verbs", fr: "Manger", en: "To eat", speak: "Manger" },
  { id: "v07", theme: "verbs", fr: "Boire", en: "To drink", speak: "Boire" },
  { id: "v08", theme: "verbs", fr: "Vouloir", en: "To want", speak: "Vouloir" },
  { id: "v09", theme: "verbs", fr: "Pouvoir", en: "To be able to / can", speak: "Pouvoir" },
  { id: "v10", theme: "verbs", fr: "Savoir", en: "To know (a fact, or how to do something)", speak: "Savoir", note: "Use savoir for facts and skills; connaître for people and places." },
  { id: "v11", theme: "verbs", fr: "Connaître", en: "To know (a person or place)", speak: "Connaître" },
  { id: "v12", theme: "verbs", fr: "Venir", en: "To come", speak: "Venir" },
  { id: "v13", theme: "verbs", fr: "Voir", en: "To see", speak: "Voir" },
  { id: "v14", theme: "verbs", fr: "Prendre", en: "To take", speak: "Prendre" },
  { id: "v15", theme: "verbs", fr: "Donner", en: "To give", speak: "Donner" },
  { id: "v16", theme: "verbs", fr: "Aimer", en: "To like / to love", speak: "Aimer" },
  { id: "v17", theme: "verbs", fr: "Habiter", en: "To live (in a place)", speak: "Habiter", note: "Habiter is “to reside.” Vivre is “to be alive” or “to live life.”" },
  { id: "v18", theme: "verbs", fr: "Travailler", en: "To work", speak: "Travailler" },
  { id: "v19", theme: "verbs", fr: "Comprendre", en: "To understand", speak: "Comprendre" },
  { id: "v20", theme: "verbs", fr: "Chercher", en: "To look for", speak: "Chercher" }
];

const CARD_BY_ID = Object.fromEntries(CARDS.map((card) => [card.id, card]));

function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
}

function todayKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit"
  }).format(date);
}

function dayOffset(key, days) {
  const [y, m, d] = key.split("-").map(Number);
  const utc = Date.UTC(y, m - 1, d + days);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "UTC", year: "numeric", month: "2-digit", day: "2-digit"
  }).format(utc);
  return parts;
}

function defaultSave() {
  return {
    version: 1,
    cards: {},
    day: todayKey(),
    reviewsToday: 0,
    streak: 0,
    lastGoalDay: null,
    dailyGoal: DAILY_GOAL_DEFAULT,
    settings: { direction: "mixed" }
  };
}

function loadSave() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSave();
    const parsed = JSON.parse(raw);
    const base = defaultSave();
    return {
      ...base,
      ...parsed,
      cards: parsed.cards && typeof parsed.cards === "object" ? parsed.cards : {},
      settings: { ...base.settings, ...(parsed.settings || {}) }
    };
  } catch {
    return defaultSave();
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.save));
}

function rollDay() {
  const today = todayKey();
  const save = state.save;
  if (save.lastGoalDay && save.lastGoalDay !== today && dayOffset(save.lastGoalDay, 1) !== today) {
    save.streak = 0;
  }
  if (save.day !== today) {
    save.day = today;
    save.reviewsToday = 0;
  }
}

const state = {
  screen: "home",
  save: loadSave(),
  study: null,
  quiz: null,
  toast: null
};

rollDay();
persist();

function themeById(id) {
  return THEMES.find((theme) => theme.id === id);
}

function cardsFor(themeId) {
  return themeId ? CARDS.filter((card) => card.theme === themeId) : CARDS.slice();
}

function schedFor(id) {
  return state.save.cards[id] || { ef: 2.5, reps: 0, interval: 0, due: 0 };
}

function isLearned(id) {
  return (state.save.cards[id] || {}).reps > 0;
}

function isDue(id, now = Date.now()) {
  const sched = state.save.cards[id];
  if (!sched || !sched.due) return true;
  return sched.due <= now;
}

function countsFor(themeId) {
  const list = cardsFor(themeId);
  const now = Date.now();
  return {
    total: list.length,
    learned: list.filter((card) => isLearned(card.id)).length,
    due: list.filter((card) => isDue(card.id, now)).length
  };
}

function applyReview(id, quality) {
  const prev = schedFor(id);
  let ef = prev.ef || 2.5;
  let reps = prev.reps || 0;
  let interval = prev.interval || 0;
  ef = Math.max(1.3, +(ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))).toFixed(2));
  const now = Date.now();
  let due;
  if (quality < 3) {
    reps = 0;
    interval = 0;
    due = now + 60 * 1000;
  } else {
    if (reps === 0) interval = 1;
    else if (reps === 1) interval = quality === 5 ? 4 : 3;
    else interval = Math.max(1, Math.round(interval * ef * (quality === 5 ? 1.15 : 1)));
    reps += 1;
    due = now + interval * 24 * 60 * 60 * 1000;
  }
  state.save.cards[id] = { ef, reps, interval, due };
  rollDay();
  state.save.reviewsToday += 1;
  if (state.save.reviewsToday >= state.save.dailyGoal && state.save.lastGoalDay !== state.save.day) {
    state.save.streak += 1;
    state.save.lastGoalDay = state.save.day;
  }
  persist();
  return state.save.cards[id];
}

function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickDirection() {
  const mode = state.save.settings.direction || "mixed";
  if (mode === "mixed") return Math.random() < 0.5 ? "fr-en" : "en-fr";
  return mode;
}

function startStudy(themeId) {
  const now = Date.now();
  const pool = cardsFor(themeId);
  const due = shuffle(pool.filter((card) => isDue(card.id, now)));
  const queue = due.map((card) => ({ id: card.id, dir: pickDirection() }));
  state.study = {
    themeId,
    queue,
    index: 0,
    flipped: false,
    done: queue.length === 0,
    reviewed: 0,
    empty: queue.length === 0
  };
  state.screen = "study";
  render();
}

function practiceAll(themeId) {
  const queue = shuffle(cardsFor(themeId)).map((card) => ({ id: card.id, dir: pickDirection() }));
  state.study = {
    themeId,
    queue,
    index: 0,
    flipped: false,
    done: false,
    reviewed: 0,
    empty: false
  };
  state.screen = "study";
  render();
}

function currentStudyItem() {
  const study = state.study;
  if (!study || study.done || study.empty) return null;
  return study.queue[study.index] || null;
}

function flipCard() {
  if (!state.study || state.study.done || state.study.empty) return;
  state.study.flipped = true;
  render();
}

function rateCard(quality) {
  const item = currentStudyItem();
  if (!item || !state.study.flipped) return;
  applyReview(item.id, quality);
  const study = state.study;
  study.reviewed += 1;
  if (quality < 3) {
    study.queue.push({ id: item.id, dir: pickDirection() });
  }
  study.index += 1;
  study.flipped = false;
  if (study.index >= study.queue.length) study.done = true;
  render();
}

function startQuiz(themeId) {
  const pool = cardsFor(themeId);
  const selected = shuffle(pool).slice(0, Math.min(QUIZ_LENGTH, pool.length));
  const questions = selected.map((card) => {
    const dir = Math.random() < 0.5 ? "fr-en" : "en-fr";
    const sameTheme = pool.filter((other) => other.id !== card.id);
    const fallback = CARDS.filter((other) => other.id !== card.id);
    const distractorSource = sameTheme.length >= 3 ? sameTheme : fallback;
    const distractors = shuffle(distractorSource).slice(0, 3);
    const answer = dir === "fr-en" ? card.en : card.fr;
    const choices = shuffle([card, ...distractors]).map((entry) => ({
      id: entry.id,
      text: dir === "fr-en" ? entry.en : entry.fr
    }));
    return { id: card.id, dir, choices, answerId: card.id, answer };
  });
  state.quiz = {
    themeId,
    questions,
    index: 0,
    picked: null,
    score: 0,
    done: false
  };
  state.screen = "quiz";
  render();
}

function pickChoice(id) {
  const quiz = state.quiz;
  if (!quiz || quiz.done || quiz.picked) return;
  const question = quiz.questions[quiz.index];
  quiz.picked = id;
  if (id === question.answerId) quiz.score += 1;
  render();
}

function nextQuestion() {
  const quiz = state.quiz;
  if (!quiz || !quiz.picked) return;
  quiz.index += 1;
  quiz.picked = null;
  if (quiz.index >= quiz.questions.length) quiz.done = true;
  render();
}

let frenchVoice = null;
let voicesReady = false;

function refreshVoices() {
  if (!window.speechSynthesis) return;
  const voices = speechSynthesis.getVoices() || [];
  frenchVoice =
    voices.find((voice) => /^fr(-|_)FR/i.test(voice.lang)) ||
    voices.find((voice) => /^fr/i.test(voice.lang)) ||
    voices.find((voice) => /french/i.test(voice.name)) ||
    null;
  voicesReady = voices.length > 0;
}

if (window.speechSynthesis) {
  refreshVoices();
  speechSynthesis.addEventListener("voiceschanged", refreshVoices);
}

function speakFrench(text) {
  if (!window.speechSynthesis) {
    showToast("This browser can’t speak aloud.");
    return false;
  }
  refreshVoices();
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  utterance.rate = 0.9;
  if (frenchVoice) utterance.voice = frenchVoice;
  speechSynthesis.speak(utterance);
  if (voicesReady && !frenchVoice) {
    showToast("No French voice is installed, so this may sound English.");
  }
  return true;
}

let toastTimer = null;
function showToast(message) {
  state.toast = message;
  render();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    state.toast = null;
    const node = document.getElementById("toast");
    if (node) node.remove();
  }, 2400);
}

function genderLabel(card) {
  if (card.gender === "m") return { text: "Masculine", cls: "m" };
  if (card.gender === "f") return { text: "Feminine", cls: "f" };
  if (card.gender === "fpl") return { text: "Feminine plural", cls: "f" };
  return null;
}

function go(screen) {
  if (window.speechSynthesis) speechSynthesis.cancel();
  state.screen = screen;
  if (screen === "home") {
    state.study = null;
    state.quiz = null;
  }
  render();
}

function exportSave() {
  const payload = {
    ...state.save,
    exportedAt: new Date().toISOString(),
    app: "allonsy"
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "allonsy-save.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
  showToast("Save file downloaded.");
}

function importSave(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result));
      if (!data || typeof data !== "object") throw new Error("bad");
      const next = defaultSave();
      state.save = {
        ...next,
        ...data,
        version: 1,
        cards: data.cards && typeof data.cards === "object" ? data.cards : {},
        settings: { ...next.settings, ...(data.settings || {}) }
      };
      rollDay();
      persist();
      showToast("Progress imported.");
      go("progress");
    } catch {
      showToast("That file couldn’t be read.");
    }
  };
  reader.readAsText(file);
}

function renderHome() {
  rollDay();
  const goal = state.save.dailyGoal;
  const today = Math.min(state.save.reviewsToday, goal);
  const pct = Math.min(100, Math.round((state.save.reviewsToday / goal) * 100));
  const dueAll = countsFor(null).due;
  return `
    <header class="brand">
      <div class="eyebrow">French for beginners</div>
      <h1>Allons-y</h1>
      <p>Flashcards, listening, and a quiz for English speakers — right on your phone.</p>
    </header>
    <div class="stats-row">
      <div class="stat-card">
        <div class="label">Streak</div>
        <div class="value">${state.save.streak} day${state.save.streak === 1 ? "" : "s"}</div>
        <div class="sub">Meet the daily goal</div>
      </div>
      <div class="stat-card">
        <div class="label">Today’s goal</div>
        <div class="value">${state.save.reviewsToday} / ${goal}</div>
        <div class="sub">${dueAll} card${dueAll === 1 ? "" : "s"} waiting</div>
        <div class="goal-track"><span style="width:${pct}%"></span></div>
      </div>
    </div>
    <div class="actions">
      <button class="btn btn-primary" data-act="study" data-theme="">Study cards</button>
      <button class="btn btn-secondary" data-act="quiz" data-theme="">Take a quiz</button>
      <button class="btn btn-ghost" data-act="progress">Progress &amp; backup</button>
    </div>
    <div class="section-label">Study a theme</div>
    <div class="theme-grid">
      ${THEMES.map((theme) => {
        const counts = countsFor(theme.id);
        return `<button class="theme-row" data-act="study" data-theme="${theme.id}">
          <span class="theme-dot" style="background:${theme.color}"></span>
          <span><strong>${esc(theme.name)}</strong><br><span class="sub" style="color:var(--muted);font-weight:400;font-size:0.82rem">${esc(theme.blurb)}</span></span>
          <span class="count">${counts.due} due · ${counts.total}</span>
        </button>`;
      }).join("")}
    </div>
    <p class="hint">Add this page to your home screen to use it like an app. Progress stays on this phone unless you export it.</p>
  `;
}

function renderStudy() {
  const study = state.study;
  const theme = themeById(study.themeId);
  const title = theme ? theme.name : "All cards";
  if (study.empty) {
    return `
      <div class="topbar">
        <button class="back-btn" data-act="home" aria-label="Back">←</button>
        <h2>${esc(title)}</h2>
      </div>
      <div class="empty-panel">
        <h2>You’re ahead</h2>
        <p>Nothing in this deck is due right now. You can still practice every card, and your ratings will reschedule them.</p>
        <button class="btn btn-primary" data-act="practice" data-theme="${esc(study.themeId || "")}">Practice anyway</button>
      </div>
    `;
  }
  if (study.done) {
    return `
      <div class="topbar">
        <button class="back-btn" data-act="home" aria-label="Back">←</button>
        <h2>${esc(title)}</h2>
      </div>
      <div class="done-panel">
        <h2>Nice work</h2>
        <p>You reviewed ${study.reviewed} card${study.reviewed === 1 ? "" : "s"}. Today’s total is ${state.save.reviewsToday} / ${state.save.dailyGoal}.</p>
        <div class="actions">
          <button class="btn btn-primary" data-act="study" data-theme="${esc(study.themeId || "")}">Study again</button>
          <button class="btn btn-secondary" data-act="quiz" data-theme="${esc(study.themeId || "")}">Quiz this deck</button>
          <button class="btn btn-ghost" data-act="home">Home</button>
        </div>
      </div>
    `;
  }
  const item = currentStudyItem();
  const card = CARD_BY_ID[item.id];
  const gender = genderLabel(card);
  const remaining = study.queue.length - study.index;
  const front = item.dir === "fr-en" ? card.fr : card.en;
  const back = item.dir === "fr-en" ? card.en : card.fr;
  const frontLang = item.dir === "fr-en" ? "fr" : "en";
  const backLang = item.dir === "fr-en" ? "en" : "fr";
  const longFront = front.length > 28;
  const longBack = back.length > 28;
  const prompt = item.dir === "fr-en" ? "What does this mean?" : "How do you say this in French?";
  return `
    <div class="topbar">
      <button class="back-btn" data-act="home" aria-label="Back">←</button>
      <h2>${esc(title)}</h2>
    </div>
    <div class="study-meta">
      <span>${study.index + 1} of ${study.queue.length} · ${remaining} left</span>
      <select class="dir-select" data-act="direction" aria-label="Card direction">
        <option value="mixed"${state.save.settings.direction === "mixed" ? " selected" : ""}>Mixed</option>
        <option value="fr-en"${state.save.settings.direction === "fr-en" ? " selected" : ""}>French → English</option>
        <option value="en-fr"${state.save.settings.direction === "en-fr" ? " selected" : ""}>English → French</option>
      </select>
    </div>
    <div class="card-stage">
      <div class="flashcard${study.flipped ? " flipped" : ""}" data-act="flip" role="button" tabindex="0" aria-label="Flashcard, tap to flip">
        <div class="face-front">
          ${gender && item.dir === "fr-en" ? `<span class="badge ${gender.cls}">${gender.text}</span>` : `<span class="badge">${prompt}</span>`}
          <div class="card-text${longFront ? " small" : ""}" lang="${frontLang}">${esc(front)}</div>
        </div>
        <div class="face-back">
          ${gender ? `<span class="badge ${gender.cls}">${gender.text}</span>` : ""}
          <div class="card-text${longBack ? " small" : ""}" lang="${backLang}">${esc(back)}</div>
          ${card.note ? `<p class="card-note">${esc(card.note)}</p>` : ""}
        </div>
        ${study.flipped ? "" : `<div class="flip-hint">Tap the card to flip</div>`}
      </div>
    </div>
    <div class="hear-wrap">
      <button class="hear-btn" data-act="speak" data-text="${esc(card.speak)}">Listen in French</button>
    </div>
    <div class="rate-row">
      <button class="rate-btn again" data-act="rate" data-q="1"${study.flipped ? "" : " disabled"}>Again<span>soon</span></button>
      <button class="rate-btn good" data-act="rate" data-q="4"${study.flipped ? "" : " disabled"}>Good<span>in a few days</span></button>
      <button class="rate-btn easy" data-act="rate" data-q="5"${study.flipped ? "" : " disabled"}>Easy<span>later on</span></button>
    </div>
  `;
}

function renderQuiz() {
  const quiz = state.quiz;
  const theme = themeById(quiz.themeId);
  const title = theme ? `${theme.name} quiz` : "Quiz";
  if (quiz.done) {
    const total = quiz.questions.length;
    const score = quiz.score;
    const line = score === total
      ? "Perfect score. Nice listening and reading."
      : score >= Math.ceil(total * 0.7)
        ? "Solid work. Retry the ones you missed in a study session."
        : "Keep going. A short study session will help these stick.";
    return `
      <div class="topbar">
        <button class="back-btn" data-act="home" aria-label="Back">←</button>
        <h2>${esc(title)}</h2>
      </div>
      <div class="quiz-result">
        <h2>${score} / ${total}</h2>
        <p>${line}</p>
        <div class="actions">
          <button class="btn btn-primary" data-act="quiz" data-theme="${esc(quiz.themeId || "")}">Try again</button>
          <button class="btn btn-secondary" data-act="study" data-theme="${esc(quiz.themeId || "")}">Study this deck</button>
          <button class="btn btn-ghost" data-act="home">Home</button>
        </div>
      </div>
    `;
  }
  const question = quiz.questions[quiz.index];
  const card = CARD_BY_ID[question.id];
  const prompt = question.dir === "fr-en" ? card.fr : card.en;
  const kicker = question.dir === "fr-en" ? "What does this mean?" : "How do you say this in French?";
  const pct = Math.round((quiz.index / quiz.questions.length) * 100);
  const picked = quiz.picked;
  const feedback = !picked
    ? ""
    : picked === question.answerId
      ? "Correct."
      : `It’s “${question.answer}.”`;
  return `
    <div class="topbar">
      <button class="back-btn" data-act="home" aria-label="Back">←</button>
      <h2>${esc(title)}</h2>
    </div>
    <div class="quiz-progress">Question ${quiz.index + 1} of ${quiz.questions.length}</div>
    <div class="quiz-bar"><span style="width:${pct}%"></span></div>
    <div class="prompt-card">
      <div class="prompt-kicker">${kicker}</div>
      <div class="card-text${prompt.length > 28 ? " small" : ""}" lang="${question.dir === "fr-en" ? "fr" : "en"}">${esc(prompt)}</div>
      <button class="hear-btn" data-act="speak" data-text="${esc(card.speak)}" style="margin-top:14px">Listen in French</button>
    </div>
    <div class="choices">
      ${question.choices.map((choice) => {
        let cls = "choice";
        if (picked) {
          if (choice.id === question.answerId) cls += " correct";
          else if (choice.id === picked) cls += " wrong";
        }
        return `<button class="${cls}" data-act="choose" data-id="${esc(choice.id)}"${picked ? " disabled" : ""}>${esc(choice.text)}</button>`;
      }).join("")}
    </div>
    <div class="feedback">${picked ? esc(feedback) : ""}</div>
    ${picked ? `<button class="btn btn-primary" data-act="next-q" style="width:100%;margin-top:8px">Next</button>` : ""}
  `;
}

function renderProgress() {
  rollDay();
  const all = countsFor(null);
  return `
    <div class="topbar">
      <button class="back-btn" data-act="home" aria-label="Back">←</button>
      <h2>Progress</h2>
    </div>
    <div class="stats-row">
      <div class="stat-card">
        <div class="label">Streak</div>
        <div class="value">${state.save.streak} day${state.save.streak === 1 ? "" : "s"}</div>
        <div class="sub">America/Indianapolis time</div>
      </div>
      <div class="stat-card">
        <div class="label">Learned</div>
        <div class="value">${all.learned} / ${all.total}</div>
        <div class="sub">${all.due} due now</div>
      </div>
    </div>
    <div class="section-label">Decks</div>
    <div class="progress-list">
      ${THEMES.map((theme) => {
        const counts = countsFor(theme.id);
        const pct = Math.round((counts.learned / counts.total) * 100);
        return `<div class="deck-bar">
          <div class="row"><strong>${esc(theme.name)}</strong><span>${counts.learned}/${counts.total}</span></div>
          <div class="bar"><span style="width:${pct}%;background:${theme.color}"></span></div>
        </div>`;
      }).join("")}
    </div>
    <div class="section-label">Daily goal</div>
    <div class="actions">
      <select class="dir-select" data-act="goal" style="width:100%;min-height:48px;padding:12px">
        ${[5, 10, 15, 20].map((n) => `<option value="${n}"${state.save.dailyGoal === n ? " selected" : ""}>${n} cards a day</option>`).join("")}
      </select>
    </div>
    <div class="section-label">Backup</div>
    <div class="io-row">
      <button class="btn btn-secondary" data-act="export">Export</button>
      <button class="btn btn-secondary" data-act="import">Import</button>
    </div>
    <input id="import-file" type="file" accept="application/json,.json" hidden>
    <p class="footer-note">Export a JSON backup to keep or move to another phone. Import replaces progress on this device. No accounts. Not published until you say yes.</p>
  `;
}

function render() {
  const root = document.getElementById("app");
  if (!root) return;
  let html = "";
  if (state.screen === "home") html = renderHome();
  else if (state.screen === "study") html = renderStudy();
  else if (state.screen === "quiz") html = renderQuiz();
  else html = renderProgress();
  if (state.toast) html += `<div class="toast" id="toast">${esc(state.toast)}</div>`;
  root.innerHTML = html;
  bind();
}

function bind() {
  const root = document.getElementById("app");
  root.querySelectorAll("[data-act]").forEach((el) => {
    const act = el.getAttribute("data-act");
    if (el.tagName === "SELECT") {
      el.addEventListener("change", () => {
        if (act === "direction") {
          state.save.settings.direction = el.value;
          persist();
          if (state.study && !state.study.done && currentStudyItem()) {
            currentStudyItem().dir = el.value === "mixed" ? pickDirection() : el.value;
            state.study.flipped = false;
            render();
          }
        } else if (act === "goal") {
          state.save.dailyGoal = Number(el.value) || DAILY_GOAL_DEFAULT;
          persist();
          render();
        }
      });
      return;
    }
    el.addEventListener("click", (event) => {
      event.stopPropagation();
      const theme = el.getAttribute("data-theme");
      if (act === "home") go("home");
      else if (act === "progress") go("progress");
      else if (act === "study") startStudy(theme || null);
      else if (act === "practice") practiceAll(theme || null);
      else if (act === "quiz") startQuiz(theme || null);
      else if (act === "flip") flipCard();
      else if (act === "rate") rateCard(Number(el.getAttribute("data-q")));
      else if (act === "speak") speakFrench(el.getAttribute("data-text") || "");
      else if (act === "choose") pickChoice(el.getAttribute("data-id"));
      else if (act === "next-q") nextQuestion();
      else if (act === "export") exportSave();
      else if (act === "import") document.getElementById("import-file").click();
    });
  });
  const card = root.querySelector(".flashcard");
  if (card) {
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        flipCard();
      }
    });
  }
  const file = document.getElementById("import-file");
  if (file) {
    file.addEventListener("change", () => {
      if (file.files && file.files[0]) importSave(file.files[0]);
    });
  }
}

if ("serviceWorker" in navigator && !/autotest=1/.test(location.search)) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

window.__allonsy = {
  CARDS,
  THEMES,
  state,
  startStudy,
  startQuiz,
  flipCard,
  rateCard,
  pickChoice,
  nextQuestion,
  speakFrench,
  todayKey,
  go,
  render,
  countsFor
};

render();
