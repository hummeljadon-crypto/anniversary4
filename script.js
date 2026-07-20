const CONFIG = {
  name: "baby girl",
  heroInitial: "J"
};

const $ = (selector) => document.querySelector(selector);

const scenes = {
  intro: $("#intro"),
  bathroom: $("#bathroom"),
  run: $("#run"),
  hero: $("#hero"),
  ending: $("#ending")
};

let current = scenes.intro;
let maryCount = 0;
let runCount = 0;
let busy = false;
let muted = false;

$("#name").textContent = CONFIG.name + " ❤️";
$(".body").textContent = CONFIG.heroInitial;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function show(scene) {
  current.classList.remove("active");
  await wait(450);
  current.hidden = true;
  scene.hidden = false;
  requestAnimationFrame(() => requestAnimationFrame(() => scene.classList.add("active")));
  current = scene;
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

/* ---------- Tiny generated sound engine ---------- */
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

  tone(frequency, endFrequency, duration, type = "sine", volume = 0.1) {
    if (!this.ctx || muted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), now + duration);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + duration + 0.03);
  }

  noise(duration = 0.3, volume = 0.15, highpass = 0) {
    if (!this.ctx || muted) return;
    const count = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, count, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < count; i++) data[i] = Math.random() * 2 - 1;

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    const gain = this.ctx.createGain();
    let last = source;

    if (highpass) {
      const filter = this.ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = highpass;
      source.connect(filter);
      last = filter;
    }

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    last.connect(gain);
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
    this.drone.forEach((osc) => osc.stop(now + 0.5));
    this.drone = null;
  }

  whisper(step) {
    const base = [130, 105, 82][step - 1] || 82;
    this.noise(0.5, 0.05 + step * 0.018, 700);
    this.tone(base, base * 0.78, 0.55, "sawtooth", 0.025 + step * 0.012);
  }

  shatter() {
    this.noise(0.6, 0.5, 1400);
    [900, 1220, 1600, 2050].forEach((frequency, i) => {
      setTimeout(() => this.tone(frequency, frequency * 0.25, 0.4, "triangle", 0.11), i * 24);
    });
  }

  footstep(index) {
    this.tone(index % 2 ? 68 : 78, 38, 0.14, "sine", 0.16);
    this.noise(0.08, 0.04, 100);
  }

  victory() {
    [261.6, 329.6, 392, 523.2].forEach((frequency, i) => {
      setTimeout(() => this.tone(frequency, frequency, 0.45, "sine", 0.085), i * 150);
    });
  }

  sparkle() {
    [660, 880, 1046].forEach((frequency, i) => {
      setTimeout(() => this.tone(frequency, frequency, 0.22, "sine", 0.065), i * 95);
    });
  }
}

const audio = new SoundEngine();

$("#soundToggle").onclick = async () => {
  muted = !muted;
  $("#soundToggle").textContent = muted ? "🔇" : "🔊";
  $("#soundToggle").setAttribute("aria-pressed", String(muted));
  $("#soundToggle").setAttribute("aria-label", muted ? "Turn sound on" : "Mute sound");
  await audio.start();
  audio.setMuted(muted);
};

$("#enterBtn").onclick = async () => {
  if (busy) return;
  busy = true;
  await audio.start();
  audio.tone(180, 78, 0.75, "sine", 0.12);
  await show(scenes.bathroom);

  $("#lamp").classList.add("flicker");
  $("#bathroomLight").classList.add("flicker");
  await wait(2700);

  $("#bathroomHint").textContent = "Bathroom rule #1";
  $("#bathroomText").textContent = "Say it 3 times.";
  audio.startDrone();
  busy = false;
};

$("#sayBtn").onclick = async () => {
  if (busy || maryCount >= 3) return;

  maryCount++;
  audio.whisper(maryCount);
  buzz(maryCount === 3 ? [80, 40, 120] : 35);

  $("#countText").textContent = [0, 1, 2]
    .map((i) => (i < maryCount ? "●" : "○"))
    .join(" ");

  $("#sayBtn").disabled = true;

  if (maryCount === 1) {
    $("#bathroomHint").textContent = "One";
    $("#bathroomText").textContent = "Again.";
    await wait(1100);
  }

  if (maryCount === 2) {
    $("#bathroomHint").textContent = "Two";
    $("#bathroomText").textContent = "Last one.";
    $("#mirror").classList.add("show-face");
    await wait(1450);
  }

  if (maryCount === 3) {
    busy = true;
    $("#bathroomHint").textContent = "Three";
    $("#bathroomText").textContent = "Oh.";
    await wait(900);

    $("#mirror").classList.add("broken");
    audio.shatter();
    flash();
    buzz([100, 40, 100, 40, 220]);
    document.body.classList.add("shake");

    await wait(850);
    document.body.classList.remove("shake");
    audio.stopDrone();
    await show(scenes.run);
    busy = false;
    return;
  }

  $("#sayBtn").disabled = false;
};

$("#runBtn").onclick = async () => {
  if (busy || runCount >= 7) return;

  runCount++;
  $("#runCount").textContent = `${runCount} / 7`;
  $("#chaseWorld").classList.add("running");
  $("#runBtn").classList.add("hit");
  setTimeout(() => $("#runBtn").classList.remove("hit"), 130);

  audio.footstep(runCount);
  buzz(22);

  const scale = 0.25 + runCount * 0.12;
  $("#ghost").style.transform = `translateX(-50%) scale(${scale})`;

  if (runCount === 3) {
    $("#runHint").textContent = "She is getting closer";
    $("#runTitle").textContent = "FASTER.";
  }

  if (runCount === 5) {
    $("#runHint").textContent = "Minor cardio emergency";
    $("#runTitle").textContent = "MOVE.";
  }

  if (runCount === 7) {
    busy = true;
    $("#runBtn").disabled = true;
    $("#runHint").textContent = "Wait…";
    $("#runTitle").textContent = "…";
    audio.tone(180, 60, 0.75, "sine", 0.11);
    await wait(1550);
    await show(scenes.hero);

    await wait(500);
    $("#boyfriend").classList.add("enter");
    audio.victory();
    buzz([40, 30, 70]);
    busy = false;
  }
};

$("#saveBtn").onclick = async () => {
  if (busy) return;
  busy = true;
  $("#saveBtn").disabled = true;

  $("#heroHint").textContent = "Ancient weapon ready";
  $("#heroText").textContent = "Stand back.";
  await wait(850);

  $("#slipper").classList.add("fly");
  audio.noise(0.35, 0.14, 450);
  audio.tone(240, 760, 0.6, "sawtooth", 0.07);
  buzz([60, 30, 90]);

  await wait(720);
  $(".hero-art").classList.add("hit");
  $("#impact").classList.add("show");
  $("#monster").classList.add("dead");
  audio.tone(220, 45, 0.7, "sawtooth", 0.13);
  buzz([100, 30, 130]);

  await wait(900);
  $("#heroHint").textContent = "Threat defeated";
  $("#heroText").textContent = "Easy.";
  await wait(1200);

  await show(scenes.ending);
  createFloatingHearts();
  await buildHeart();
  busy = false;
};

function createFloatingHearts() {
  const holder = $("#floatingHearts");
  for (let i = 0; i < 30; i++) {
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
  buzz([40, 60, 40, 100]);

  await wait(600);
  scenes.ending.classList.add("reveal-text");
}
