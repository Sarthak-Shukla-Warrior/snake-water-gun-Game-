// Snake Water Gun - bilingual (English / Hindi) kid-friendly web version
// Rules (same as the original Python game): Snake > Water, Water > Gun, Gun > Snake

/* ================= PURE GAME LOGIC (no DOM) ================= */
const MOVES = ["s", "w", "g"];
const EMOJI = { s: "🐍", w: "💧", g: "🔫" };
const BEATS = { s: "w", w: "g", g: "s" }; // key beats value

// returns "win" | "lose" | "draw" from the player's point of view
function decide(player, cpu) {
  if (player === cpu) return "draw";
  return BEATS[player] === cpu ? "win" : "lose";
}
const counterOf = (move) => MOVES.find((m) => BEATS[m] === move); // the move that beats `move`

// level: easy | normal | pro.  counts = how often the player picked each move so far
// playerMove = what the player just picked (only the easy level uses it, to let kids win more often)
function pickComputer(level, counts, playerMove, rnd = Math.random) {
  const random = () => MOVES[Math.floor(rnd() * 3)];
  if (level === "easy") {
    // about 1 time in 3 the computer "lets" the player win; otherwise it plays randomly
    return playerMove && rnd() < 0.35 ? BEATS[playerMove] : random();
  }
  if (level === "pro") {
    const total = counts.s + counts.w + counts.g;
    if (total >= 2 && rnd() < 0.55) {
      const fav = MOVES.reduce((a, b) => (counts[b] > counts[a] ? b : a), "s");
      return counterOf(fav); // beat the player's favourite move
    }
  }
  return random();
}
/* END PURE LOGIC */

/* ================= TEXT (English + Hindi) ================= */
const I18N = {
  en: {
    title: "Snake Water Gun", subtitle: "The classic childhood game!",
    welcomeMascot: "Hoot hoot! I am Chiku the owl. Let's play together!",
    yourName: "Your name", namePh: "Type your name", pickHero: "Pick your hero", level: "Level",
    lvlEasy: "Little Champ", lvlEasyD: "Computer goes easy", lvlNormal: "Normal", lvlNormalD: "Fair game", lvlPro: "Pro", lvlProD: "Computer is smart",
    matchLen: "Match length", endless: "Endless", bo3: "Best of 3", bo5: "Best of 5", bo7: "Best of 7",
    startBtn: "Start Game!", howBtn: "How to play?", keysHint: "Keyboard keys",
    defaultName: "Champ",
    tipTheme: "Change colours", tipSound: "Sound on/off", tipVoice: "Read aloud on/off", tipHelp: "How to play", tipQuit: "Back to menu",
    hintBtn: "💡 Hint", draws: "Draws", computer: "Computer",
    goalEndless: "Endless mode - play as long as you like!", goalFirst: "First to {n} wins the match!",
    m_s: "Snake", m_w: "Water", m_g: "Gun",
    chooseWeapon: "Choose your weapon!", thinking: "Snake... Water... Gun!",
    remember: "Remember the rules", arrowMeans: 'The arrow means "beats"',
    why_s: "Snake drinks Water", why_w: "Water washes away Gun", why_g: "Gun scares Snake away",
    whyDraw: "Both chose {move}!",
    youWin: "Great job {name}! You win!", cpuWins: "Computer wins this one!", drawMsg: "It's a draw!",
    recent: "Recent rounds", rWin: "Win", rLose: "Loss", rDraw: "Draw",
    mWin: "Yay! You are awesome!", mLose: "Don't worry! Try again, you can do it!", mDraw: "Same choice! Play again!",
    mStart: "Pick Snake, Water or Gun. I'm watching!", mStreak: "{n} wins in a row! You're on fire!",
    hintFirst: "Remember: Snake beats Water, Water beats Gun, Gun beats Snake!",
    hintLast: "Last time the computer chose {move}. Which one beats it?",
    endWin: "{name}, you are the champion!", endLose: "Computer won, but you played well!",
    endScore: "Final score: {a} - {b} (draws: {d})",
    bestStreak: "Best win streak", starsEarned: "Stars earned", yourBadges: "Your badges",
    again: "Play Again", menu: "Main Menu",
    b_firstWin: "First Win", b_streak3: "3 in a Row", b_champion: "Champion", b_perfect: "Perfect Match", b_pro: "Pro Beater",
    badgeUnlocked: "🏅 New badge: {b}!",
    howTitle: "How to play", howIntro: "Pick one. The computer picks one too. Who wins?",
    howSame: "Same choice? It is a draw!", howWin: "Win rounds to win the match. Collect ⭐ stars and 🏅 badges!", howHint: "Stuck? Press the 💡 Hint button.",
    gotIt: "Got it!", footer: "Made with ❤️ using HTML, CSS & JavaScript",
  },
  hi: {
    title: "साँप पानी बंदूक", subtitle: "बचपन का मज़ेदार खेल!",
    welcomeMascot: "हूँ हूँ! मैं चीकू उल्लू हूँ। चलो साथ खेलते हैं!",
    yourName: "तुम्हारा नाम", namePh: "अपना नाम लिखो", pickHero: "अपना हीरो चुनो", level: "लेवल",
    lvlEasy: "छोटा चैंपियन", lvlEasyD: "कंप्यूटर आसान खेलेगा", lvlNormal: "सामान्य", lvlNormalD: "बराबर का खेल", lvlPro: "प्रो", lvlProD: "कंप्यूटर होशियार है",
    matchLen: "मैच कितना लंबा?", endless: "अनंत", bo3: "3 में से बेस्ट", bo5: "5 में से बेस्ट", bo7: "7 में से बेस्ट",
    startBtn: "खेल शुरू करो!", howBtn: "कैसे खेलें?", keysHint: "कीबोर्ड की",
    defaultName: "चैंपियन",
    tipTheme: "रंग बदलो", tipSound: "आवाज़ चालू/बंद", tipVoice: "बोलकर सुनाना चालू/बंद", tipHelp: "कैसे खेलें", tipQuit: "मेनू पर वापस",
    hintBtn: "💡 हिंट", draws: "बराबर", computer: "कंप्यूटर",
    goalEndless: "अनंत मोड - जितना चाहो खेलो!", goalFirst: "जो पहले {n} बार जीते, वह मैच जीता!",
    m_s: "साँप", m_w: "पानी", m_g: "बंदूक",
    chooseWeapon: "अपना हथियार चुनो!", thinking: "साँप... पानी... बंदूक!",
    remember: "नियम याद रखो", arrowMeans: "तीर का मतलब है \"हराता है\"",
    why_s: "साँप पानी पी जाता है", why_w: "पानी बंदूक को बहा देता है", why_g: "बंदूक साँप को डराकर भगा देती है",
    whyDraw: "दोनों ने {move} चुना!",
    youWin: "शाबाश {name}! तुम जीत गए!", cpuWins: "इस बार कंप्यूटर जीता!", drawMsg: "बराबरी हो गई!",
    recent: "पिछले राउंड", rWin: "जीत", rLose: "हार", rDraw: "बराबर",
    mWin: "वाह! तुम तो कमाल हो!", mLose: "कोई बात नहीं! फिर से कोशिश करो, तुम कर सकते हो!", mDraw: "एक जैसा चुना! फिर से खेलो!",
    mStart: "साँप, पानी या बंदूक चुनो। मैं देख रहा हूँ!", mStreak: "लगातार {n} जीत! तुम तो आग हो!",
    hintFirst: "याद रखो: साँप पानी को, पानी बंदूक को, और बंदूक साँप को हराती है!",
    hintLast: "पिछली बार कंप्यूटर ने {move} चुना था। उसे कौन हराता है?",
    endWin: "{name}, तुम चैंपियन हो!", endLose: "कंप्यूटर जीता, पर तुमने अच्छा खेला!",
    endScore: "फाइनल स्कोर: {a} - {b} (बराबर: {d})",
    bestStreak: "सबसे लंबी जीत की लड़ी", starsEarned: "मिले सितारे", yourBadges: "तुम्हारे बैज",
    again: "फिर से खेलो", menu: "मुख्य मेनू",
    b_firstWin: "पहली जीत", b_streak3: "लगातार 3 जीत", b_champion: "चैंपियन", b_perfect: "बिना हारे जीत", b_pro: "प्रो को हराया",
    badgeUnlocked: "🏅 नया बैज: {b}!",
    howTitle: "कैसे खेलें", howIntro: "एक चुनो। कंप्यूटर भी एक चुनेगा। कौन जीतेगा?",
    howSame: "दोनों का एक जैसा? तो बराबरी!", howWin: "राउंड जीतकर मैच जीतो। ⭐ सितारे और 🏅 बैज इकट्ठे करो!", howHint: "अटक गए? 💡 हिंट दबाओ।",
    gotIt: "समझ गया!", footer: "❤️ से बनाया गया - HTML, CSS और JavaScript में",
  },
};

/* ================= DOM + GAME FLOW ================= */
const HEROES = ["🦁", "🐼", "🦊", "🐸", "🦄", "🐯", "🐵", "🐰"];
const BADGES = {
  firstWin: "🥇", streak3: "🔥", champion: "🏆", perfect: "💎", pro: "😎",
};
const BADGE_KEY = { firstWin: "b_firstWin", streak3: "b_streak3", champion: "b_champion", perfect: "b_perfect", pro: "b_pro" };

const $ = (id) => document.getElementById(id);
const screens = { start: $("start-screen"), game: $("game-screen"), end: $("end-screen") };

const store = {
  get(k, d) { try { const v = localStorage.getItem("swg-" + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("swg-" + k, JSON.stringify(v)); } catch (e) {} },
};

let lang = store.get("lang", (navigator.language || "en").toLowerCase().startsWith("hi") ? "hi" : "en");
let soundOn = store.get("sound", true);
let voiceOn = store.get("voice", false);
let hero = store.get("hero", HEROES[0]);
let level = store.get("level", "normal");
let theme = store.get("theme", "galaxy");
let totalStars = store.get("stars", 0);
let earned = store.get("badges", []);
let locked = false;
let currentScreen = "start";
let state = freshState();
let view = { result: null, mascot: { key: "mStart" } };

function freshState() {
  return { name: "", target: 0, you: 0, cpu: 0, draw: 0, streak: 0, best: 0, stars: 0,
           counts: { s: 0, w: 0, g: 0 }, lastCpu: null, history: [], level: "normal", over: false };
}

const t = (key, vars = {}) => {
  const raw = (I18N[lang] && I18N[lang][key]) ?? I18N.en[key] ?? key;
  return raw.replace(/\{(\w+)\}/g, (m, v) => (vars[v] !== undefined ? vars[v] : m));
};

/* ---------- language ---------- */
function applyLang() {
  document.documentElement.lang = lang;
  document.title = lang === "hi" ? "साँप पानी बंदूक | Snake Water Gun" : "Snake Water Gun | साँप पानी बंदूक";
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => (el.placeholder = t(el.dataset.i18nPh)));
  document.querySelectorAll("[data-i18n-title]").forEach((el) => (el.title = t(el.dataset.i18nTitle)));
  document.querySelectorAll(".lang-switch button").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
  if (currentScreen === "game") {
    $("you-name").textContent = state.name;
    renderGoal();
    renderMoveNames();
    renderResult();
    renderHistory();
  }
  if (currentScreen === "end") renderBadges();
  renderMascot();
}

function setLang(l) { lang = l; store.set("lang", l); applyLang(); if ("speechSynthesis" in window) speechSynthesis.cancel(); }

/* ---------- speech + sound ---------- */
function speak(text) {
  if (!voiceOn || !("speechSynthesis" in window)) return;
  try {
    speechSynthesis.cancel();
    const clean = text.replace(/[^\p{L}\p{M}\p{N}\s!?.,']/gu, " ").replace(/\s+/g, " ").trim();
    if (!clean) return;
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = lang === "hi" ? "hi-IN" : "en-US";
    u.rate = 0.95; u.pitch = 1.15;
    const v = speechSynthesis.getVoices().find((x) => x.lang.toLowerCase().startsWith(lang));
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  } catch (e) {}
}

let audioCtx;
function beep(freq, dur = 0.12, type = "sine", delay = 0) {
  if (!soundOn) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain(), at = audioCtx.currentTime + delay;
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(0.18, at + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    o.connect(g).connect(audioCtx.destination);
    o.start(at); o.stop(at + dur + 0.02);
  } catch (e) {}
}
const sfx = {
  click: () => beep(440, 0.08, "triangle"),
  win: () => [523, 659, 784, 1047].forEach((f, i) => beep(f, 0.15, "triangle", i * 0.1)),
  lose: () => [330, 262, 196].forEach((f, i) => beep(f, 0.18, "sawtooth", i * 0.12)),
  draw: () => beep(392, 0.2, "square"),
  badge: () => [784, 988, 1175].forEach((f, i) => beep(f, 0.12, "sine", i * 0.08)),
};

/* ---------- rendering helpers ---------- */
function showScreen(name) {
  currentScreen = name;
  Object.values(screens).forEach((s) => s.classList.remove("active"));
  screens[name].classList.add("active");
}
function setMascot(key, vars) { view.mascot = { key, vars }; renderMascot(); }
function renderMascot() {
  const el = $("mascot-bubble");
  if (el) el.textContent = t(view.mascot.key, view.mascot.vars || {});
}
function renderGoal() {
  $("goal").textContent = state.target ? t("goalFirst", { n: state.target }) : t("goalEndless");
}
function renderMoveNames() {
  const last = state.history[0];
  $("you-move").textContent = last ? t("m_" + last.you) : "";
  $("cpu-move").textContent = last ? t("m_" + last.cpu) : "";
}
function renderResult() {
  const r = $("result"), w = $("why");
  const x = view.result;
  if (!x) { r.textContent = t("chooseWeapon"); r.className = "result"; w.textContent = ""; return; }
  if (x.pending) { r.textContent = t("thinking"); r.className = "result"; w.textContent = ""; return; }
  if (x.outcome === "draw") {
    r.textContent = "🤝 " + t("drawMsg"); r.className = "result draw";
    w.textContent = t("whyDraw", { move: EMOJI[x.you] + " " + t("m_" + x.you) });
  } else {
    const winner = x.outcome === "win" ? x.you : x.cpu;
    r.textContent = x.outcome === "win" ? "🎉 " + t("youWin", { name: state.name }) : "💻 " + t("cpuWins");
    r.className = "result " + x.outcome;
    w.textContent = `${EMOJI[winner]} ${t("why_" + winner)}  ${EMOJI[BEATS[winner]]}`;
  }
}
function renderHistory() {
  const ul = $("history");
  ul.innerHTML = "";
  state.history.slice(0, 20).forEach((h) => {
    const li = document.createElement("li");
    li.className = h.outcome;
    const label = h.outcome === "win" ? t("rWin") : h.outcome === "lose" ? t("rLose") : t("rDraw");
    li.innerHTML = `<span>${EMOJI[h.you]} ${t("m_" + h.you)} vs ${EMOJI[h.cpu]} ${t("m_" + h.cpu)}</span><b>${label}</b>`;
    ul.appendChild(li);
  });
}
function updateScores(bump) {
  $("score-you").textContent = state.you;
  $("score-cpu").textContent = state.cpu;
  $("score-draw").textContent = state.draw;
  $("stars-total").textContent = totalStars;
  if (bump) {
    const el = document.querySelector(".score." + bump);
    el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
  }
}
function resetArena() {
  ["you-hand", "cpu-hand"].forEach((id) => { const el = $(id); el.textContent = "❔"; el.className = "fighter"; });
  $("you-move").textContent = ""; $("cpu-move").textContent = "";
}
let toastTimer;
function toast(msg) {
  const el = $("toast");
  el.textContent = msg; el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (el.hidden = true), 2800);
}

/* ---------- badges ---------- */
function giveBadge(id) {
  if (earned.includes(id)) return;
  earned.push(id); store.set("badges", earned);
  sfx.badge();
  toast(t("badgeUnlocked", { b: BADGES[id] + " " + t(BADGE_KEY[id]) }));
}
function renderBadges() {
  const box = $("badges");
  box.innerHTML = "";
  Object.keys(BADGES).forEach((id) => {
    const d = document.createElement("div");
    d.className = "badge" + (earned.includes(id) ? "" : " locked");
    d.textContent = BADGES[id] + " " + t(BADGE_KEY[id]);
    box.appendChild(d);
  });
}

/* ---------- game flow ---------- */
function newGame() {
  const rounds = parseInt($("rounds").value, 10);
  const name = state.name;
  state = freshState();
  state.name = name;
  state.level = level;
  state.target = rounds ? Math.ceil(rounds / 2) : 0;
  $("player-label").textContent = name;
  $("player-avatar").textContent = hero;
  $("you-name").textContent = name;
  view.result = null;
  resetArena();
  renderGoal(); renderHistory(); updateScores();
  setMascot("mStart");
  renderResult();
  enableChoices(true);
  locked = false;
  showScreen("game");
  speak(t("chooseWeapon"));
}

function enableChoices(on) { document.querySelectorAll(".choice").forEach((b) => (b.disabled = !on)); }

function play(choice) {
  if (locked || currentScreen !== "game") return;
  locked = true; enableChoices(false);
  sfx.click();

  const cpu = pickComputer(state.level, state.counts, choice);
  state.counts[choice]++;
  const youEl = $("you-hand"), cpuEl = $("cpu-hand");
  resetArena();
  view.result = { pending: true }; renderResult();
  youEl.classList.add("shake"); cpuEl.classList.add("shake");

  setTimeout(() => {
    youEl.classList.remove("shake"); cpuEl.classList.remove("shake");
    youEl.textContent = EMOJI[choice]; cpuEl.textContent = EMOJI[cpu];
    const outcome = decide(choice, cpu);
    state.lastCpu = cpu;
    state.history.unshift({ you: choice, cpu, outcome });
    view.result = { you: choice, cpu, outcome };

    let bump = "draw";
    if (outcome === "draw") {
      state.draw++; state.streak = 0;
      youEl.classList.add("draw"); cpuEl.classList.add("draw");
      sfx.draw(); setMascot("mDraw");
    } else if (outcome === "win") {
      state.you++; state.streak++; state.best = Math.max(state.best, state.streak);
      state.stars++; totalStars++; store.set("stars", totalStars);
      youEl.classList.add("win"); cpuEl.classList.add("lose");
      sfx.win(); bump = "you";
      if (state.streak >= 3) setMascot("mStreak", { n: state.streak }); else setMascot("mWin");
      giveBadge("firstWin");
      if (state.streak >= 3) giveBadge("streak3");
    } else {
      state.cpu++; state.streak = 0;
      youEl.classList.add("lose"); cpuEl.classList.add("win");
      sfx.lose(); bump = "cpu"; setMascot("mLose");
    }

    renderMoveNames(); renderResult(); renderHistory(); updateScores(bump);
    speak($("result").textContent + ". " + $("why").textContent);

    const done = state.target && (state.you >= state.target || state.cpu >= state.target);
    if (done) setTimeout(endGame, 1800);
    else setTimeout(() => { locked = false; enableChoices(true); }, 700);
  }, 650);
}

function endGame() {
  const won = state.you > state.cpu;
  let bonus = 0;
  if (won) {
    bonus = 3; totalStars += bonus; state.stars += bonus; store.set("stars", totalStars);
    giveBadge("champion");
    if (state.cpu === 0) giveBadge("perfect");
    if (state.level === "pro") giveBadge("pro");
  }
  $("end-emoji").textContent = won ? "🏆" : "🤗";
  $("end-title").textContent = won ? t("endWin", { name: state.name }) : t("endLose");
  $("end-text").textContent = t("endScore", { a: state.you, b: state.cpu, d: state.draw });
  $("best-streak").textContent = state.best;
  $("stars-earned").textContent = state.stars;
  renderBadges();
  showScreen("end");
  if (won) { sfx.win(); confetti(); } else sfx.lose();
  speak($("end-title").textContent);
  locked = false;
}

/* ---------- start screen setup ---------- */
function buildHeroes() {
  const box = $("heroes");
  box.innerHTML = "";
  HEROES.forEach((h) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "hero" + (h === hero ? " active" : ""); b.textContent = h;
    b.addEventListener("click", () => {
      hero = h; store.set("hero", h); sfx.click();
      box.querySelectorAll(".hero").forEach((x) => x.classList.toggle("active", x === b));
    });
    box.appendChild(b);
  });
}
function syncLevelChips() {
  document.querySelectorAll("#levels .chip").forEach((c) => c.classList.toggle("active", c.dataset.level === level));
}
function syncToggles() {
  $("sound-btn").textContent = soundOn ? "🔊" : "🔇"; $("sound-btn").classList.toggle("off", !soundOn);
  $("voice-btn").classList.toggle("off", !voiceOn);
  document.body.dataset.theme = theme;
}

/* ---------- events ---------- */
document.querySelectorAll(".lang-switch button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

document.querySelectorAll("#levels .chip").forEach((c) =>
  c.addEventListener("click", () => { level = c.dataset.level; store.set("level", level); syncLevelChips(); sfx.click(); })
);

$("start-btn").addEventListener("click", () => {
  state.name = $("name-input").value.trim() || t("defaultName");
  store.set("name", $("name-input").value.trim());
  newGame();
});
$("name-input").addEventListener("keydown", (e) => { if (e.key === "Enter") $("start-btn").click(); });

document.querySelectorAll(".choice").forEach((b) => b.addEventListener("click", () => play(b.dataset.choice)));
document.addEventListener("keydown", (e) => {
  if (currentScreen !== "game" || !$("tutorial").hidden) return;
  const k = e.key.toLowerCase();
  const map = { s: "s", w: "w", g: "g", 1: "s", 2: "w", 3: "g" };
  if (map[k]) play(map[k]);
});

$("hint-btn").addEventListener("click", () => {
  if (state.lastCpu) setMascot("hintLast", { move: EMOJI[state.lastCpu] + " " + t("m_" + state.lastCpu) });
  else setMascot("hintFirst");
  speak($("mascot-bubble").textContent);
});
$("quit-btn").addEventListener("click", () => { locked = false; showScreen("start"); setMascot("mStart"); });
$("again-btn").addEventListener("click", newGame);
$("menu-btn").addEventListener("click", () => showScreen("start"));

$("sound-btn").addEventListener("click", () => { soundOn = !soundOn; store.set("sound", soundOn); syncToggles(); });
$("voice-btn").addEventListener("click", () => {
  voiceOn = !voiceOn; store.set("voice", voiceOn); syncToggles();
  if (voiceOn) speak(t("welcomeMascot")); else if ("speechSynthesis" in window) speechSynthesis.cancel();
});
$("theme-btn").addEventListener("click", () => {
  const list = ["galaxy", "jungle", "ocean"];
  theme = list[(list.indexOf(theme) + 1) % list.length];
  store.set("theme", theme); syncToggles(); sfx.click();
});

function openTutorial() { $("tutorial").hidden = false; }
function closeTutorial() { $("tutorial").hidden = true; store.set("seen", true); }
$("help-btn").addEventListener("click", openTutorial);
$("howto-btn").addEventListener("click", openTutorial);
$("tutorial-close").addEventListener("click", closeTutorial);
$("tutorial").addEventListener("click", (e) => { if (e.target === $("tutorial")) closeTutorial(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("tutorial").hidden) closeTutorial(); });

/* ---------- confetti ---------- */
function confetti() {
  const c = $("confetti"), ctx = c.getContext("2d");
  c.width = innerWidth; c.height = innerHeight;
  const colors = ["#7c5cff", "#22d3ee", "#34d399", "#fbbf24", "#f472b6", "#fb7185"];
  const parts = Array.from({ length: 160 }, () => ({
    x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.5,
    r: 4 + Math.random() * 6, vy: 2 + Math.random() * 4, vx: -1.5 + Math.random() * 3,
    color: colors[Math.floor(Math.random() * colors.length)], rot: Math.random() * 6,
  }));
  let frames = 0;
  (function tick() {
    ctx.clearRect(0, 0, c.width, c.height);
    parts.forEach((p) => {
      p.x += p.vx; p.y += p.vy; p.rot += 0.1;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.color; ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); ctx.restore();
    });
    if (++frames < 240) requestAnimationFrame(tick); else ctx.clearRect(0, 0, c.width, c.height);
  })();
}

/* ---------- init ---------- */
$("name-input").value = store.get("name", "");
buildHeroes(); syncLevelChips(); syncToggles(); applyLang();
if (!store.get("seen", false)) setTimeout(openTutorial, 600);
