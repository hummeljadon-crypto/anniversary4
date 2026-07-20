/* =========================================================
   PERSONALIZE THIS
========================================================= */
const CONFIG = {
  girlfriendName: "baby girl",
  heroName: "Jadon",
  endingLine: "Happy 4 months"
};

/* =========================================================
   SETUP
========================================================= */
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const scenes = {
  phone: $("#phoneScene"),
  door: $("#doorScene"),
  bathroom: $("#bathroomScene"),
  choice: $("#choiceScene"),
  ritual: $("#ritualScene"),
  tapChase: $("#tapChaseScene"),
  swipe: $("#swipeScene"),
  hide: $("#hideScene"),
  signal: $("#signalScene"),
  batman: $("#batmanScene"),
  boss: $("#bossScene"),
  falseEnd: $("#falseEndScene"),
  finalAttack: $("#finalAttackScene"),
  ending: $("#endingScene")
};

let currentScene = scenes.phone;
let busy = false;
let muted = false;
let exploreCount = 0;
let maryCount = 0;
let tapCount = 0;
let swipeDodges = 0;
let swipeLane = 1;
let bossHealth = 100;
let attackLock = false;
let holdStart = 0;
let holdTimer = null;
let toastTimer = null;

$("#girlfriendName").textContent = CONFIG.girlfriendName + " ❤️";
$("#endingTitle").textContent = CONFIG.endingLine;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function showScene(nextScene, delay = 450) {
  if (currentScene === nextScene) return;
  currentScene.classList.remove("active");
  await wait(delay);
  currentScene.hidden = true;
  nextScene.hidden = false;
  requestAnimationFrame(() => requestAnimationFrame(() => nextScene.classList.add("active")));
  currentScene = nextScene;
}

function buzz(pattern) {
  if (!muted && "vibrate" in navigator) navigator.vibrate(pattern);
}

function flash() {
  const element = $("#flash");
  element.classList.remove("on");
  void element.offsetWidth;
  element.classList.add("on");
}

function shake() {
  document.body.classList.remove("shake");
  void document.body.offsetWidth;
  document.body.classList.add("shake");
  setTimeout(() => document.body.classList.remove("shake"), 760);
}

function showToast(message, duration = 1600) {
  clearTimeout(toastTimer);
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), duration);
}

/* =========================================================
   GENERATED SOUND
========================================================= */
class SoundEngine {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = AudioContext ? new AudioContext() : null;
    this.master = null;
    this.drone = null;
    this.droneGain = null;

    if (this.ctx) {
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.38;
      this.master.connect(this.ctx.destination);
    }
  }

  async start() {
    if (this.ctx && this.ctx.state === "suspended") await this.ctx.resume();
  }

  setMuted(value) {
    if (!this.ctx) return;
    this.master.gain.setTargetAtTime(value ? 0 : 0.38, this.ctx.currentTime, 0.03);
  }

  tone(frequency, endFrequency = frequency, duration = 0.2, type = "sine", volume = 0.1) {
    if (!this.ctx || muted) return;

    const now = this.ctx.currentTime;
    const oscillator = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), now + duration);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(gain);
    gain.connect(this.master);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.03);
  }

  noise(duration = 0.3, volume = 0.15, highpass = 0) {
    if (!this.ctx || muted) return;

    const sampleCount = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, sampleCount, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < sampleCount; i++) data[i] = Math.random() * 2 - 1;

    const source = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    source.buffer = buffer;
    let lastNode = source;

    if (highpass) {
      const filter = this.ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = highpass;
      source.connect(filter);
      lastNode = filter;
    }

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    lastNode.connect(gain);
    gain.connect(this.master);
    source.start(now);
  }

  startDrone() {
    if (!this.ctx || muted || this.drone) return;

    const now = this.ctx.currentTime;
    const a = this.ctx.createOscillator();
    const b = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    a.type = "sine";
    b.type = "triangle";
    a.frequency.value = 43;
    b.frequency.value = 66;
    filter.type = "lowpass";
    filter.frequency.value = 170;
    gain.gain.value = 0.0001;
    gain.gain.exponentialRampToValueAtTime(0.065, now + 1.7);

    a.connect(filter);
    b.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);

    a.start();
    b.start();
    this.drone = [a, b];
    this.droneGain = gain;
  }

  stopDrone() {
    if (!this.ctx || !this.drone) return;

    const now = this.ctx.currentTime;
    this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
    this.drone.forEach((oscillator) => oscillator.stop(now + 0.5));
    this.drone = null;
    this.droneGain = null;
  }

  whisper(step) {
    const base = [130, 105, 82][step - 1] || 82;
    this.noise(0.5, 0.05 + step * 0.018, 700);
    this.tone(base, base * 0.78, 0.55, "sawtooth", 0.025 + step * 0.012);
  }

  shatter() {
    this.noise(0.6, 0.5, 1400);
    [900, 1220, 1600, 2050].forEach((frequency, index) => {
      setTimeout(() => this.tone(frequency, frequency * 0.25, 0.4, "triangle", 0.11), index * 24);
    });
  }

  footstep(index) {
    this.tone(index % 2 ? 68 : 78, 38, 0.14, "sine", 0.16);
    this.noise(0.08, 0.04, 100);
  }

  hit() {
    this.noise(0.18, 0.18, 180);
    this.tone(120, 42, 0.3, "triangle", 0.16);
  }

  victory() {
    [261.6, 329.6, 392, 523.2].forEach((frequency, index) => {
      setTimeout(() => this.tone(frequency, frequency, 0.45, "sine", 0.085), index * 150);
    });
  }

  sparkle() {
    [660, 880, 1046].forEach((frequency, index) => {
      setTimeout(() => this.tone(frequency, frequency, 0.22, "sine", 0.065), index * 95);
    });
  }

  batTheme() {
    [110, 146.8, 196, 220].forEach((frequency, index) => {
      setTimeout(() => this.tone(frequency, frequency * 0.98, 0.7, "sawtooth", 0.045), index * 230);
    });
  }
}

const audio = new SoundEngine();

$("#soundToggle").addEventListener("click", async () => {
  muted = !muted;
  $("#soundToggle").textContent = muted ? "🔇" : "🔊";
  $("#soundToggle").setAttribute("aria-pressed", String(muted));
  $("#soundToggle").setAttribute("aria-label", muted ? "Turn sound on" : "Mute sound");

  await audio.start();
  audio.setMuted(muted);

  if (muted) showToast("Silent knight mode.");
  else showToast("Sound on. Brave.");
});

/* =========================================================
   1. PHONE
========================================================= */
window.addEventListener("load", async () => {
  await wait(1200);
  $("#secondNote").classList.add("show");
  buzz([30, 50, 30]);
  await wait(950);
  $("#continuePhone").classList.add("show");
});

$("#continuePhone").addEventListener("click", async () => {
  if (busy) return;
  busy = true;
  await audio.start();
  audio.tone(185, 74, 0.7, "sine", 0.11);
  await showScene(scenes.door);
  busy = false;
});

/* =========================================================
   2. DOOR
========================================================= */
$("#openDoorBtn").addEventListener("click", async () => {
  if (busy) return;
  busy = true;
  $("#openDoorBtn").disabled = true;
  $("#door").classList.add("open");
  audio.noise(0.65, 0.055, 90);
  audio.tone(94, 48, 0.9, "triangle", 0.08);
  buzz(45);

  await wait(1500);
  await showScene(scenes.bathroom);
  showToast("The door locked behind you.");
  audio.startDrone();
  busy = false;
});

/* =========================================================
   3. BATHROOM EXPLORATION
========================================================= */
function markExplored(button) {
  if (button.dataset.done === "true") return false;
  button.dataset.done = "true";
  button.classList.add("done");
  button.disabled = true;
  exploreCount++;
  $("#exploreProgress").textContent = [0,1,2].map((i) => i < exploreCount ? "●" : "○").join(" ");
  return true;
}

$("#lightHotspot").addEventListener("click", async () => {
  if (!markExplored($("#lightHotspot"))) return;
  $("#bathroomBlackout").classList.add("lit");
  $("#lamp").classList.add("flicker");
  audio.tone(75, 75, 0.11, "square", 0.05);
  $("#bathroomHint").textContent = "One";
  $("#bathroomTitle").textContent = "Light works. Mostly.";
  await maybeFinishExplore();
});

$("#sinkHotspot").addEventListener("click", async () => {
  if (!markExplored($("#sinkHotspot"))) return;
  audio.noise(0.45, 0.05, 300);
  $("#bathroomHint").textContent = "Two";
  $("#bathroomTitle").textContent = "Just water.";
  showToast("Probably not blood.");
  await maybeFinishExplore();
});

$("#mirrorHotspot").addEventListener("click", async () => {
  if (!markExplored($("#mirrorHotspot"))) return;
  $("#mirrorFog").classList.add("wiped");
  audio.noise(0.5, 0.045, 500);
  $("#bathroomHint").textContent = "Three";
  $("#bathroomTitle").textContent = "There you are.";

  await wait(650);
  $("#mirrorGhost").classList.add("flash");
  audio.tone(240, 55, 0.35, "sawtooth", 0.05);
  buzz([40, 30, 70]);
  await maybeFinishExplore();
});

async function maybeFinishExplore() {
  if (exploreCount < 3 || busy) return;
  busy = true;
  await wait(1200);
  $("#bathroomHint").textContent = "Bad idea unlocked";
  $("#bathroomTitle").textContent = "One more thing.";
  await wait(1200);
  await showScene(scenes.choice);
  busy = false;
}

/* =========================================================
   4. MOVING NOPE BUTTON
========================================================= */
function moveNoButton() {
  const button = $("#noBtn");
  const parent = button.parentElement;
  const maxX = Math.max(0, parent.clientWidth - button.offsetWidth);
  const maxY = Math.max(0, parent.clientHeight - button.offsetHeight);

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
  button.style.right = "auto";
  button.style.bottom = "auto";
  showToast("Nice try.");
}

["pointerenter", "pointerdown", "touchstart"].forEach((eventName) => {
  $("#noBtn").addEventListener(eventName, (event) => {
    event.preventDefault();
    moveNoButton();
  }, { passive: false });
});

$("#yesBtn").addEventListener("click", async () => {
  if (busy) return;
  busy = true;
  audio.tone(160, 73, 0.65, "sine", 0.1);
  await showScene(scenes.ritual);
  busy = false;
});

/* =========================================================
   5. RITUAL
========================================================= */
$("#sayMaryBtn").addEventListener("click", async () => {
  if (busy || maryCount >= 3) return;

  maryCount++;
  busy = true;
  $("#sayMaryBtn").disabled = true;
  $("#ritualHint").textContent = `${maryCount} of 3`;
  $("#maryProgress").textContent = [0,1,2].map((i) => i < maryCount ? "●" : "○").join(" ");
  audio.whisper(maryCount);
  buzz(maryCount === 3 ? [80, 40, 120] : 35);

  if (maryCount === 1) {
    $("#ritualTitle").textContent = "Again.";
    $(".ritual-room").classList.add("dim");
    $("#ritualLamp").classList.add("flicker");
    await wait(1500);
  }

  if (maryCount === 2) {
    $("#ritualTitle").textContent = "Last one.";
    $("#ritualFog").classList.add("show-word");
    await wait(900);
    $("#ritualReflection").classList.add("wrong");
    await wait(950);
  }

  if (maryCount === 3) {
    $("#ritualTitle").textContent = "Oh.";
    $("#ritualGhost").classList.add("show");
    await wait(1100);
    $("#ritualMirror").classList.add("broken");
    audio.shatter();
    flash();
    shake();
    buzz([100,40,100,40,240]);

    await wait(1000);
    audio.stopDrone();
    await showScene(scenes.tapChase);
    $("#tapChaseWorld").classList.add("running");
    busy = false;
    return;
  }

  $("#sayMaryBtn").disabled = false;
  busy = false;
});

/* =========================================================
   6. TAP CHASE
========================================================= */
$("#runTapBtn").addEventListener("click", async () => {
  if (busy || tapCount >= 12) return;

  tapCount++;
  const progress = Math.min(100, tapCount / 12 * 100);
  $("#runMeter").style.width = `${progress}%`;
  $("#tapGhost").style.transform = `translateX(-50%) scale(${0.25 + tapCount * 0.085})`;

  audio.footstep(tapCount);
  buzz(18);

  if (tapCount === 4) {
    $("#tapChaseHint").textContent = "She is gaining";
    $("#tapChaseTitle").textContent = "FASTER.";
  }

  if (tapCount === 8) {
    $("#tapChaseHint").textContent = "Cardio was not optional";
    $("#tapChaseTitle").textContent = "MOVE.";
  }

  if (tapCount === 12) {
    busy = true;
    $("#runTapBtn").disabled = true;
    $("#tapChaseHint").textContent = "Door ahead";
    $("#tapChaseTitle").textContent = "SWIPE.";
    await wait(1100);
    await showScene(scenes.swipe);
    busy = false;
  }
});

/* =========================================================
   7. SWIPE DODGE
========================================================= */
let swipeStartX = null;
let swipeStartY = null;

function setLane(lane) {
  swipeLane = Math.max(0, Math.min(2, lane));
  $("#playerDot").style.left = `${[16.5, 50, 83.5][swipeLane]}%`;
}

function handleSwipeStart(x, y) {
  swipeStartX = x;
  swipeStartY = y;
}

function handleSwipeEnd(x, y) {
  if (swipeStartX === null || busy) return;

  const dx = x - swipeStartX;
  const dy = y - swipeStartY;
  swipeStartX = null;
  swipeStartY = null;

  if (Math.abs(dx) < 30 || Math.abs(dx) < Math.abs(dy)) {
    showToast("Swipe sideways.");
    return;
  }

  setLane(swipeLane + (dx > 0 ? 1 : -1));
  swipeDodges++;
  $("#swipeProgress").textContent = `${Math.min(swipeDodges,3)} / 3`;
  audio.footstep(swipeDodges);
  buzz(22);

  if (swipeDodges >= 3) finishSwipeStage();
}

$("#swipeScene").addEventListener("touchstart", (event) => {
  const touch = event.changedTouches[0];
  handleSwipeStart(touch.clientX, touch.clientY);
}, { passive: true });

$("#swipeScene").addEventListener("touchend", (event) => {
  const touch = event.changedTouches[0];
  handleSwipeEnd(touch.clientX, touch.clientY);
}, { passive: true });

$("#swipeScene").addEventListener("pointerdown", (event) => {
  handleSwipeStart(event.clientX, event.clientY);
});

$("#swipeScene").addEventListener("pointerup", (event) => {
  handleSwipeEnd(event.clientX, event.clientY);
});

async function finishSwipeStage() {
  if (busy) return;
  busy = true;
  $("#swipeHint").textContent = "You made it.";
  $("#swipeTitle").textContent = "HIDE.";
  await wait(950);
  await showScene(scenes.hide);
  busy = false;
}

/* =========================================================
   8. HOLD TO HIDE
========================================================= */
function beginHold(event) {
  event.preventDefault();
  if (busy || holdStart) return;

  holdStart = performance.now();
  $("#holdFill").style.width = "0%";
  $("#passingGhost").classList.add("pass");
  audio.startDrone();

  holdTimer = setInterval(async () => {
    const elapsed = performance.now() - holdStart;
    const progress = Math.min(100, elapsed / 4800 * 100);
    $("#holdFill").style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(holdTimer);
      holdTimer = null;
      holdStart = 0;
      await completeHide();
    }
  }, 50);
}

function cancelHold() {
  if (!holdStart || busy) return;
  clearInterval(holdTimer);
  holdTimer = null;
  holdStart = 0;
  $("#holdFill").style.width = "0%";
  $("#passingGhost").classList.remove("pass");
  void $("#passingGhost").offsetWidth;
  showToast("Keep holding.");
}

["pointerdown", "touchstart"].forEach((eventName) => {
  $("#holdBtn").addEventListener(eventName, beginHold, { passive: false });
});

["pointerup", "pointercancel", "pointerleave", "touchend", "touchcancel"].forEach((eventName) => {
  $("#holdBtn").addEventListener(eventName, cancelHold);
});

async function completeHide() {
  if (busy) return;
  busy = true;
  audio.stopDrone();
  $("#holdBtn").disabled = true;
  $("#hideTitle").textContent = "Quiet…";
  await wait(900);

  $("#jumpFace").classList.add("show");
  audio.noise(0.38, 0.28, 800);
  audio.tone(410, 52, 0.4, "sawtooth", 0.14);
  flash();
  shake();
  buzz([120,40,180]);

  await wait(850);
  $("#hideTitle").textContent = "WAIT.";
  await wait(900);
  await showScene(scenes.signal);
  busy = false;
  await playSignalScene();
}

/* =========================================================
   9. BAT SIGNAL
========================================================= */
async function playSignalScene() {
  audio.batTheme();
  await wait(600);
  $("#batSignal").classList.add("show");
  await wait(2200);
  await showScene(scenes.batman);
  await wait(500);
  await playBatmanEntrance();
}

/* =========================================================
   10. BATMAN ENTRANCE
========================================================= */
async function playBatmanEntrance() {
  $("#batman").classList.add("drop");
  audio.tone(95, 42, 0.95, "sawtooth", 0.08);
  await wait(820);
  scenes.batman.classList.add("land-shake");
  $("#landingDust").classList.add("show");
  buzz([90,30,130]);
  await wait(850);
  scenes.batman.classList.remove("land-shake");
}

let batmanLineStep = 0;
$("#batmanContinue").addEventListener("click", async () => {
  if (busy) return;

  batmanLineStep++;

  if (batmanLineStep === 1) {
    $("#batmanTitle").textContent = "And also Batman.";
    $("#batmanContinue").textContent = "Obviously";
    audio.tone(145, 145, 0.22, "triangle", 0.06);
    return;
  }

  busy = true;
  await showScene(scenes.boss);
  busy = false;
});

/* =========================================================
   11. BOSS FIGHT
========================================================= */
const attackDamage = {
  batarang: 20,
  cape: 15,
  support: 35
};

const attackText = {
  batarang: "Clean hit.",
  cape: "Disrespectful.",
  support: "Unexpectedly devastating."
};

$$(".attack").forEach((button) => {
  button.addEventListener("click", async () => {
    if (attackLock || bossHealth <= 0) return;

    attackLock = true;
    const attack = button.dataset.attack;
    const damage = attackDamage[attack];

    $("#bossTitle").textContent = attackText[attack];
    $("#bossMary").classList.add("hit");
    $("#bossImpact").textContent = attack === "support" ? "FEELINGS" : attack === "cape" ? "SLAP" : "WHAM";
    $("#bossImpact").classList.remove("show");
    void $("#bossImpact").offsetWidth;
    $("#bossImpact").classList.add("show");

    audio.hit();
    buzz([40,20,70]);

    bossHealth = Math.max(0, bossHealth - damage);
    $("#healthFill").style.width = `${bossHealth}%`;

    await wait(420);
    $("#bossMary").classList.remove("hit");

    if (bossHealth <= 0) {
      $$(".attack").forEach((attackButton) => attackButton.disabled = true);
      $("#bossTitle").textContent = "Defeated.";
      audio.victory();
      await wait(1100);
      await showScene(scenes.falseEnd);
      await playFalseEnding();
      attackLock = false;
      return;
    }

    await wait(220);
    $("#bossTitle").textContent = "Choose an attack.";
    attackLock = false;
  });
});

/* =========================================================
   12. FALSE END
========================================================= */
async function playFalseEnding() {
  await wait(1800);
  $("#returnCrack").classList.add("show");
  audio.shatter();
  flash();
  shake();
  await wait(800);

  $("#returnMary").classList.add("show");
  audio.tone(140, 52, 0.65, "sawtooth", 0.12);
  buzz([90,40,120]);
  await wait(900);

  $("#annoyedBatman").classList.add("show");
  $("#seriouslyText").classList.add("show");
  await wait(1500);

  await showScene(scenes.finalAttack);
}

/* =========================================================
   13. FINAL ATTACK
========================================================= */
$("#finalAttackBtn").addEventListener("click", async () => {
  if (busy) return;
  busy = true;
  $("#finalAttackBtn").disabled = true;

  $(".holy-bat").classList.add("throw");
  audio.tone(220, 780, 0.65, "sawtooth", 0.08);
  buzz([50,30,90]);

  await wait(650);
  $("#finalBurst").classList.add("show");
  $("#finalMary").classList.add("dead");
  audio.noise(0.55, 0.32, 700);
  audio.tone(210, 38, 0.8, "sawtooth", 0.15);
  flash();
  shake();
  buzz([100,40,140]);

  await wait(1250);
  await showScene(scenes.ending);
  createFloatingHearts();
  await playEnding();
  busy = false;
});

/* =========================================================
   14. ENDING
========================================================= */
function createFloatingHearts() {
  const holder = $("#floatingHearts");
  if (holder.childElementCount) return;

  for (let i = 0; i < 32; i++) {
    const heart = document.createElement("span");
    heart.className = "float-heart";
    heart.textContent = "♥";
    heart.style.setProperty("--x", `${Math.random() * 100}%`);
    heart.style.setProperty("--size", `${14 + Math.random() * 28}px`);
    heart.style.setProperty("--dur", `${5 + Math.random() * 4}s`);
    heart.style.setProperty("--delay", `${Math.random() * -7}s`);
    holder.appendChild(heart);
  }
}

async function playEnding() {
  $("#heartSignal").classList.add("show");
  audio.victory();
  await wait(1400);
  await buildHeart();
}

async function buildHeart() {
  const holder = $("#heartBuild");
  const points = [];

  for (let y = -1.05; y <= 1.05; y += 0.19) {
    for (let x = -1.25; x <= 1.25; x += 0.19) {
      const equation = Math.pow(x * x + y * y - 1, 3) - x * x * Math.pow(y, 3);
      if (equation <= 0) points.push({ x, y });
    }
  }

  points.sort(() => Math.random() - 0.5);

  points.forEach((point) => {
    const dot = document.createElement("span");
    dot.className = "heart-pixel";
    dot.style.left = `${50 + point.x * 34}%`;
    dot.style.top = `${50 - point.y * 39}%`;
    holder.appendChild(dot);
  });

  const dots = [...holder.children];

  for (let i = 0; i < dots.length; i += 8) {
    dots.slice(i, i + 8).forEach((dot) => dot.classList.add("show"));
    audio.sparkle();
    await wait(90);
  }

  await wait(500);
  holder.style.display = "none";
  $("#bigHeart").classList.add("beat");
  audio.victory();
  buzz([40,60,40,100]);

  await wait(650);
  scenes.ending.classList.add("reveal-text");
}

$("#kissBtn").addEventListener("click", () => {
  $("#missionText").classList.add("show");
  $("#kissBtn").textContent = "Kiss received ✓";
  $("#kissBtn").disabled = true;
  audio.sparkle();
  buzz([35,40,70]);
  burstHearts();
});

function burstHearts() {
  const rect = $("#kissBtn").getBoundingClientRect();

  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");
    heart.textContent = "♥";
    heart.style.position = "fixed";
    heart.style.zIndex = "600";
    heart.style.left = `${rect.left + rect.width / 2}px`;
    heart.style.top = `${rect.top + rect.height / 2}px`;
    heart.style.color = i % 2 ? "#ff4f88" : "#d9326c";
    heart.style.fontSize = `${12 + Math.random() * 14}px`;
    heart.style.pointerEvents = "none";
    heart.style.transition = `transform ${700 + Math.random() * 500}ms cubic-bezier(.1,.7,.2,1), opacity 900ms ease`;
    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 60 + Math.random() * 130;
      heart.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${Math.random() * 260}deg)`;
      heart.style.opacity = "0";
    });

    setTimeout(() => heart.remove(), 1300);
  }
}

window.addEventListener("pagehide", () => {
  if ("vibrate" in navigator) navigator.vibrate(0);
  audio.stopDrone();
});
