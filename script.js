const CONFIG = {
  girlfriendName: "baby girl",
  heroName: "Jadon",
  endingLine: "Happy 4 months",
  letterDate: "21.07.2026",

  letterText: `
I want you to know that I am here for you, and I will always be here.

Challenges and problems will come, but they will also pass. Through all of them, it will always be you and me against the problem, not against each other. We are a team, and no matter what life throws at us, we will stick together, overcome it, and grow through it.

It will not always be easy, but that is part of the point. Love is more than just a feeling. It is a commitment and a choice you continue to make, not because it feels like work, but because there is truly no one else you would rather choose.

There is no one else I would rather spend my time with than you. Whether we are sharing exciting moments, working towards our goals, or simply sitting together doing nothing with no words needed, I want it all with you.

I will support you in everything you want to achieve, just as I know you will support me. My wins are yours, and your wins are mine. We are building something together.

You have brought so much light into my life, not only because of how beautiful you are and that gorgeous face of yours...

Oh my.

I just need a second.

Damn, my heart.

Help.

Ahhh...

Anyway, besides all of that, it is the person you are that makes you truly beautiful.

I admire your creativity, your compassion for others, and the way you show care. Those qualities make me see the wonderful mother I know you will one day be. I have always thought carefully about the kind of person I would want to build a family with, and when I look at you, I can already see it.

I see the family we will create and the teamwork within it. On the days when you do not have the energy, I will step in. On the days when I struggle, you will be there for me. Together, we will create a beautiful home. A home where we always have each other’s backs and remain beside one another through both the good and the bad.

The wait may sometimes feel long, but truthfully, I am not afraid.

Distance and time are problems that can eventually be solved. But finding a love like this, finding you in a world this big, against all the odds and through all the tiny moments that somehow led us to each other, is something incredibly rare.

Sometimes we need to sit back and be grateful for what we have found.

I know the direction my future is going. I know what I am building towards and what we are building towards. Something solid, real, and worth more than anything else I could achieve.

I cannot wait for the day we finally live under the same roof. At the same time, I will wait for however long it takes, because I do not want any other ending unless it is with you.

I would choose you in every timeline, no matter how we met or how long it took us to get there. Fortunately, in this timeline, that future is becoming more and more real.

Until then, I will be here, by your side through it all.
`,

  letterSignoff: `
Siempre tuyo, mi vida,

Jadon

P.D. Sí, soy Batman.
`
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const scenes = {
  phone: $("#phoneScene"),
  door: $("#doorScene"),
  bathroom: $("#bathroomScene"),
  choice: $("#choiceScene"),
  ritual: $("#ritualScene"),
  chase: $("#chaseScene"),
  breath: $("#breathScene"),
  signal: $("#signalScene"),
  batman: $("#batmanScene"),
  quiz: $("#quizScene"),
  finisher: $("#finisherScene"),
  ending: $("#endingScene"),
  letter: $("#letterScene")
};

let currentScene = scenes.phone;
let busy = false;
let muted = false;
let exploreCount = 0;
let maryCount = 0;
let runCount = 0;
let chaseDeadlineTimer = null;
let chaseScareActive = false;
let breathStart = 0;
let breathTimer = null;
let questionIndex = 0;
let health = 100;
let toastTimer = null;

$("#girlfriendName").textContent = CONFIG.girlfriendName + " ❤️";
$("#endingTitle").textContent = CONFIG.endingLine;
$("#letterDate").textContent = CONFIG.letterDate;
$("#letterGreeting").textContent = "Dear Dannianlys,";
$("#letterBody").textContent = CONFIG.letterText;
$("#letterSignoff").textContent = CONFIG.letterSignoff;
$("#batmanLine").textContent = `${CONFIG.heroName}. Her boyfriend.`;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function showScene(nextScene, delay = 420) {
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

function toast(message, duration = 1500) {
  clearTimeout(toastTimer);
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  toastTimer = setTimeout(() => element.classList.remove("show"), duration);
}

/* generated sound */
class SoundEngine {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = AudioContext ? new AudioContext() : null;
    this.master = null;
    this.ambienceGain = null;
    this.ambienceNodes = [];
    this.ambienceTimers = [];
    this.ambienceName = "";
    this.drone = null;
    this.droneGain = null;
    this.sampleBuffers = {};
    this.samplePromise = null;
    this.breathSource = null;
    this.breathGain = null;
    this.samplePaths = {
      phone: "assets/audio/phone_alert.wav",
      door: "assets/audio/door_creak.wav",
      light: "assets/audio/light_switch.wav",
      mirror: "assets/audio/mirror_wipe.wav",
      glass: "assets/audio/glass_shatter.wav",
      caught: "assets/audio/caught_scare.wav",
      breathing: "assets/audio/breathing_loop.wav",
      gasp: "assets/audio/gasp.wav",
      cape: "assets/audio/cape_drop.wav",
      landing: "assets/audio/batman_landing.wav",
      banana1: "assets/audio/banana_single.wav",
      banana2: "assets/audio/banana_barrage.wav",
      banana3: "assets/audio/banana_boomerang.wav",
      evil: "assets/audio/evil_transform.wav",
      slipperWindup: "assets/audio/slipper_windup.wav",
      slipperThrow: "assets/audio/slipper_throw.wav",
      slipperImpact: "assets/audio/slipper_impact.wav",
      kiss: "assets/audio/kiss.wav",
      wax: "assets/audio/wax_seal.wav",
      paper: "assets/audio/paper_open.wav"
    };

    if (this.ctx) {
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.32;
      this.master.connect(this.ctx.destination);
    }
  }

  async start() {
    if (this.ctx && this.ctx.state === "suspended") await this.ctx.resume();
    await this.loadSamples();
  }

  async loadSamples() {
    if (!this.ctx) return;
    if (this.samplePromise) return this.samplePromise;
    this.samplePromise = Promise.all(Object.entries(this.samplePaths).map(async ([name, path]) => {
      try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Could not load ${path}`);
        const arrayBuffer = await response.arrayBuffer();
        this.sampleBuffers[name] = await this.ctx.decodeAudioData(arrayBuffer);
      } catch (error) {
        console.warn("Audio sample unavailable:", name, error);
      }
    }));
    return this.samplePromise;
  }

  playSample(name, volume = 0.7, rate = 1, pan = 0, delay = 0) {
    if (!this.ctx || muted || !this.sampleBuffers[name]) return null;
    const source = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    source.buffer = this.sampleBuffers[name];
    source.playbackRate.value = rate;
    gain.gain.value = volume;
    source.connect(gain);
    this.route(gain, this.master, pan);
    source.start(this.ctx.currentTime + delay);
    return source;
  }

  startBreathing() {
    if (!this.ctx || muted || !this.sampleBuffers.breathing) return;
    this.stopBreathing(0.02);
    const source = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    source.buffer = this.sampleBuffers.breathing;
    source.loop = true;
    source.playbackRate.value = 0.88;
    gain.gain.value = 0.23;
    source.connect(gain);
    gain.connect(this.master);
    source.start();
    this.breathSource = source;
    this.breathGain = gain;
  }

  updateBreathing(progress) {
    if (!this.ctx || !this.breathSource || !this.breathGain) return;
    const now = this.ctx.currentTime;
    this.breathGain.gain.setTargetAtTime(0.23 + progress * 0.43, now, 0.12);
    this.breathSource.playbackRate.setTargetAtTime(0.88 + progress * 0.42, now, 0.12);
  }

  stopBreathing(fade = 0.12) {
    if (!this.ctx || !this.breathSource || !this.breathGain) return;
    const source = this.breathSource;
    const gain = this.breathGain;
    const now = this.ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(Math.max(0.0001, gain.gain.value), now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + fade);
    try { source.stop(now + fade + 0.03); } catch (_) {}
    this.breathSource = null;
    this.breathGain = null;
  }

  setMuted(value) {
    if (this.ctx) this.master.gain.setTargetAtTime(value ? 0 : 0.32, this.ctx.currentTime, 0.04);
  }

  route(node, output = this.master, pan = 0) {
    if (!this.ctx) return;
    if (this.ctx.createStereoPanner && pan) {
      const panner = this.ctx.createStereoPanner();
      panner.pan.value = Math.max(-1, Math.min(1, pan));
      node.connect(panner);
      panner.connect(output);
      return panner;
    }
    node.connect(output);
    return null;
  }

  tone(frequency, endFrequency = frequency, duration = 0.2, type = "sine", volume = 0.1, pan = 0, delay = 0) {
    if (!this.ctx || muted) return;
    const start = this.ctx.currentTime + delay;
    const oscillator = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(Math.max(1, frequency), start);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), start + duration);

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume), start + Math.min(0.025, duration * 0.25));
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    oscillator.connect(gain);
    this.route(gain, this.master, pan);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.04);
  }

  noise(duration = 0.3, volume = 0.15, frequency = 0, filterType = "highpass", pan = 0, delay = 0) {
    if (!this.ctx || muted) return;
    const count = Math.max(1, Math.floor(this.ctx.sampleRate * duration));
    const buffer = this.ctx.createBuffer(1, count, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let previous = 0;

    for (let i = 0; i < count; i++) {
      const white = Math.random() * 2 - 1;
      previous = previous * 0.55 + white * 0.45;
      data[i] = previous;
    }

    const source = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    source.buffer = buffer;
    let last = source;

    if (frequency) {
      const filter = this.ctx.createBiquadFilter();
      filter.type = filterType;
      filter.frequency.value = frequency;
      if (filterType === "bandpass") filter.Q.value = 0.8;
      source.connect(filter);
      last = filter;
    }

    const start = this.ctx.currentTime + delay;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume), start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    last.connect(gain);
    this.route(gain, this.master, pan);
    source.start(start);
    source.stop(start + duration + 0.03);
  }

  createLoopNoise(output, volume, filterType, frequency) {
    if (!this.ctx) return null;
    const length = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let previous = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      previous = previous * 0.78 + white * 0.22;
      data[i] = previous;
    }

    const source = this.ctx.createBufferSource();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    source.buffer = buffer;
    source.loop = true;
    filter.type = filterType;
    filter.frequency.value = frequency;
    if (filterType === "bandpass") filter.Q.value = 0.65;
    gain.gain.value = volume;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(output);
    source.start();
    return source;
  }

  createLoopTone(output, frequency, volume, type = "sine", detune = 0) {
    if (!this.ctx) return null;
    const oscillator = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    oscillator.detune.value = detune;
    gain.gain.value = volume;
    oscillator.connect(gain);
    gain.connect(output);
    oscillator.start();
    return oscillator;
  }

  stopAmbience(fade = 0.45) {
    this.ambienceTimers.forEach((timer) => clearTimeout(timer));
    this.ambienceTimers = [];
    if (!this.ctx || !this.ambienceGain) {
      this.ambienceName = "";
      return;
    }

    const now = this.ctx.currentTime;
    const gain = this.ambienceGain;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(Math.max(0.0001, gain.gain.value), now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + fade);

    this.ambienceNodes.forEach((node) => {
      try { node.stop(now + fade + 0.08); } catch (_) {}
    });
    this.ambienceNodes = [];
    this.ambienceGain = null;
    this.ambienceName = "";
  }

  setAmbience(name) {
    if (!this.ctx || muted || this.ambienceName === name) return;
    this.stopAmbience(0.28);
    if (!name) return;

    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(1, now + 0.9);
    gain.connect(this.master);
    this.ambienceGain = gain;
    this.ambienceName = name;

    const add = (node) => { if (node) this.ambienceNodes.push(node); };
    const schedule = (fn, minimum, maximum) => {
      const loop = () => {
        if (this.ambienceName !== name) return;
        fn();
        const timer = setTimeout(loop, minimum + Math.random() * (maximum - minimum));
        this.ambienceTimers.push(timer);
      };
      const timer = setTimeout(loop, minimum * 0.7);
      this.ambienceTimers.push(timer);
    };

    if (name === "hall") {
      add(this.createLoopNoise(gain, 0.008, "lowpass", 720));
      add(this.createLoopTone(gain, 47, 0.006, "sine"));
    }

    if (name === "bathroom") {
      add(this.createLoopTone(gain, 59.5, 0.012, "sine"));
      add(this.createLoopTone(gain, 119, 0.004, "triangle", 5));
      add(this.createLoopNoise(gain, 0.009, "bandpass", 1050));
      schedule(() => this.waterDrip(), 3300, 6100);
    }

    if (name === "ritual") {
      add(this.createLoopTone(gain, 40.5, 0.018, "sine"));
      add(this.createLoopTone(gain, 61, 0.008, "triangle", -8));
      add(this.createLoopNoise(gain, 0.011, "bandpass", 520));
      schedule(() => this.glassStress(), 4200, 7000);
    }

    if (name === "chase") {
      add(this.createLoopNoise(gain, 0.019, "bandpass", 960));
      add(this.createLoopTone(gain, 44, 0.009, "sawtooth"));
      add(this.createLoopTone(gain, 67, 0.004, "triangle", 7));
    }

    if (name === "closet") {
      add(this.createLoopNoise(gain, 0.006, "lowpass", 410));
      add(this.createLoopTone(gain, 36, 0.008, "sine"));
      add(this.createLoopTone(gain, 53, 0.0035, "triangle", -5));
    }

    if (name === "rooftop") {
      add(this.createLoopNoise(gain, 0.013, "highpass", 480));
      add(this.createLoopTone(gain, 49, 0.004, "sine"));
    }

    if (name === "battle") {
      add(this.createLoopTone(gain, 52, 0.007, "sine"));
      add(this.createLoopNoise(gain, 0.005, "lowpass", 520));
    }

    if (name === "romance") {
      add(this.createLoopTone(gain, 130.81, 0.0037, "sine"));
      add(this.createLoopTone(gain, 196, 0.0025, "triangle", 4));
      add(this.createLoopNoise(gain, 0.0018, "lowpass", 360));
    }

    if (name === "letter") {
      add(this.createLoopTone(gain, 110, 0.0017, "sine"));
      add(this.createLoopNoise(gain, 0.001, "lowpass", 250));
    }
  }

  startDrone() { this.setAmbience("closet"); }
  stopDrone() { this.stopAmbience(0.4); }

  phoneAlert() { this.playSample("phone", 0.48); }

  doorCreak() { this.playSample("door", 0.62); }

  lightSwitch() { this.playSample("light", 0.48); }

  waterDrip() {
    if (muted) return;
    const pan = (Math.random() - 0.5) * 0.7;
    this.tone(880 + Math.random() * 240, 390, 0.16, "sine", 0.018, pan);
    this.tone(190, 120, 0.22, "sine", 0.009, pan, 0.04);
  }

  mirrorWipe() { this.playSample("mirror", 0.5); }

  ghostFlash() {
    this.noise(0.16, 0.07, 1200, "highpass");
    this.tone(230, 47, 0.38, "sawtooth", 0.052);
  }

  ritualName(step) {
    const bases = [142, 108, 77];
    const base = bases[step - 1] || 77;
    this.noise(0.55 + step * 0.08, 0.028 + step * 0.012, 620, "bandpass", step === 1 ? -0.25 : step === 2 ? 0.25 : 0);
    this.tone(base, base * 0.58, 0.72 + step * 0.14, "sawtooth", 0.018 + step * 0.011);
    if (step === 2) this.tone(920, 180, 0.7, "triangle", 0.018, 0.2, 0.18);
    if (step === 3) {
      this.tone(48, 32, 1.35, "sine", 0.095);
      this.noise(0.9, 0.07, 1100, "highpass", 0, 0.2);
    }
  }

  whisper(step) { this.ritualName(step); }

  ghostReveal() {
    this.noise(0.85, 0.055, 540, "bandpass");
    this.tone(186, 41, 1.18, "sawtooth", 0.085);
    this.tone(46, 28, 1.3, "sine", 0.09, 0, 0.08);
  }

  glassStress() {
    if (muted) return;
    const base = 980 + Math.random() * 520;
    this.tone(base, base * 0.62, 0.22, "triangle", 0.009, (Math.random() - 0.5) * 0.8);
  }

  shatter() { this.playSample("glass", 0.75); }

  chaseStep(index) {
    const pan = index % 2 ? -0.28 : 0.28;
    this.tone(index % 2 ? 72 : 82, 37, 0.13, "sine", 0.12, pan);
    this.noise(0.07, 0.026, 180, "lowpass", pan);
    if (index % 4 === 0) this.chaseBreath(index / 14);
  }

  footstep(index) { this.chaseStep(index); }

  chaseBreath(progress = 0.4) {
    const volume = 0.018 + progress * 0.025;
    this.noise(0.42, volume, 640, "bandpass", -0.1);
    this.noise(0.3, volume * 0.8, 720, "bandpass", 0.1, 0.34);
  }

  caughtScare() {
    this.stopAmbience(0.05);
    this.stopBreathing(0.03);
    this.playSample("gasp", 0.7);
    this.playSample("caught", 0.82, 1, 0, 0.08);
  }

  heartbeat(strength = 1) {
    this.tone(57, 39, 0.15, "sine", 0.085 * strength);
    this.tone(72, 46, 0.11, "sine", 0.065 * strength, 0, 0.17);
  }

  closetStep(progress = 0.3) {
    const volume = 0.035 + progress * 0.035;
    const pan = progress > 0.65 ? 0.08 : -0.28 + progress * 0.35;
    this.tone(54, 31, 0.22, "sine", volume, pan);
    this.noise(0.13, volume * 0.45, 180, "lowpass", pan);
    if (progress > 0.55) this.hairRustle(progress);
  }

  hairRustle(progress = 0.5) {
    this.noise(0.5, 0.008 + progress * 0.012, 900, "bandpass", 0.15);
  }

  batSignalReveal() {
    this.tone(73.42, 73.42, 1.8, "sine", 0.04);
    this.tone(110, 109, 1.8, "triangle", 0.025, 0, 0.08);
    this.tone(146.83, 145, 1.4, "sawtooth", 0.016, 0, 0.16);
  }

  batTheme() { this.batSignalReveal(); }

  capeDrop() { this.playSample("cape", 0.58); }

  landing() { this.playSample("landing", 0.76); }

  quizAttack(index) {
    const names = ["banana1", "banana2", "banana3"];
    const volumes = [0.62, 0.66, 0.72];
    this.playSample(names[index] || "banana1", volumes[index] || 0.62);
  }

  wrongAnswer() {}

  hit() { this.quizAttack(2); }

  evilTransform() { this.playSample("evil", 0.76); }

  slipperWindup() { this.playSample("slipperWindup", 0.65); }

  slipperWhoosh() { this.playSample("slipperThrow", 0.72); }

  slipperImpact() {
    this.stopAmbience(0.04);
    this.playSample("slipperImpact", 0.88);
  }

  aftermath() {
    this.softNote(196, 1.4, 0.018, 0, "triangle");
    this.softNote(261.63, 1.6, 0.014, 0.12, "sine");
  }

  victory() { this.aftermath(); }
  sparkle() { this.softNote(659.25, 0.8, 0.012, 0, "sine"); }

  letterSeal() {
    this.noise(0.18, 0.02, 750, "bandpass");
    this.tone(390, 240, 0.26, "triangle", 0.035);
  }

  softNote(frequency, duration = 1.6, volume = 0.026, delay = 0, type = "sine") {
    if (!this.ctx || muted) return;
    const start = this.ctx.currentTime + delay;
    const oscillator = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.18);
    gain.gain.setValueAtTime(volume, start + duration * 0.62);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    oscillator.connect(gain);
    gain.connect(this.master);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.05);
  }

  romanceTheme() {
    const chords = [
      [261.63, 329.63, 392],
      [220, 261.63, 329.63],
      [174.61, 220, 261.63],
      [196, 246.94, 293.66]
    ];
    chords.forEach((chord, chordIndex) => {
      const delay = chordIndex * 3.7;
      chord.forEach((frequency, noteIndex) => {
        this.softNote(frequency, 4.0, noteIndex === 0 ? 0.015 : 0.009, delay, noteIndex % 2 ? "triangle" : "sine");
      });
    });
    [392, 440, 493.88, 523.25, 493.88].forEach((frequency, index) => {
      this.softNote(frequency, 1.45, 0.012, 0.9 + index * 2.35, "sine");
    });
  }

  heartBloom() {
    [261.63, 329.63, 392, 493.88].forEach((frequency, index) => {
      this.softNote(frequency, 2.3, 0.013, index * 0.08, index % 2 ? "triangle" : "sine");
    });
  }

  memoryNote(index) {
    const notes = [329.63, 392, 440, 493.88];
    const frequency = notes[index] || notes[0];
    this.softNote(frequency, 1.6, 0.017, 0, "sine");
    this.softNote(frequency / 2, 1.9, 0.007, 0.04, "triangle");
  }

  kissSound() {
    this.playSample("kiss", 0.72);
    this.softNote(329.63, 2.0, 0.007, 0.18, "sine");
    this.softNote(392, 2.1, 0.006, 0.24, "triangle");
  }

  letterTransition() {
    this.softNote(220, 2.8, 0.01, 0, "triangle");
    this.softNote(329.63, 3.0, 0.009, 0.22, "sine");
  }

  paperOpen() {
    this.playSample("wax", 0.62);
    this.playSample("paper", 0.68, 1, 0, 0.2);
  }
}

const audio = new SoundEngine();

$("#soundToggle").onclick = async () => {
  muted = !muted;
  $("#soundToggle").textContent = muted ? "🔇" : "🔊";
  await audio.start();
  audio.setMuted(muted);
  toast(muted ? "Silent knight mode." : "Sound on. Brave.");
};

/* phone */
window.addEventListener("load", async () => {
  audio.loadSamples();
  await wait(1100);
  $("#secondNote").classList.add("show");
  buzz([30,50,30]);
  await wait(900);
  $("#phoneBtn").classList.add("show");
});

$("#phoneBtn").onclick = async () => {
  if (busy) return;
  busy = true;
  await audio.start();
  audio.phoneAlert();
  audio.setAmbience("hall");
  await showScene(scenes.door);
  busy = false;
};

/* door */
$("#openDoorBtn").onclick = async () => {
  if (busy) return;
  busy = true;
  $("#openDoorBtn").disabled = true;
  $("#bathroomDoor").classList.add("open");
  audio.doorCreak();
  await wait(1500);
  await showScene(scenes.bathroom);
  toast("The door locked behind you.");
  audio.setAmbience("bathroom");
  busy = false;
};

/* explore */
function markDone(button) {
  if (button.dataset.done) return false;
  button.dataset.done = "1";
  button.classList.add("done");
  button.disabled = true;
  exploreCount++;
  $("#exploreDots").textContent = [0,1,2].map((i) => i < exploreCount ? "●" : "○").join(" ");
  return true;
}

$("#lightSpot").onclick = async () => {
  if (!markDone($("#lightSpot"))) return;
  $("#blackout").classList.add("lit");
  $("#lamp").classList.add("flicker");
  $("#lightGuide").classList.add("hide");
  $("#bathroomTitle").textContent = "Light works. Mostly.";
  audio.lightSwitch();
  await maybeFinishExplore();
};

$("#sinkSpot").onclick = async () => {
  if (!markDone($("#sinkSpot"))) return;
  $("#bathroomTitle").textContent = "Just water.";
  toast("Probably.");
  audio.waterDrip();
  await maybeFinishExplore();
};

$("#mirrorSpot").onclick = async () => {
  if (!markDone($("#mirrorSpot"))) return;
  $("#fog").classList.add("wiped");
  $("#bathroomTitle").textContent = "There you are.";
  audio.mirrorWipe();
  await wait(550);
  $("#mirrorGhost").classList.add("flash");
  audio.ghostFlash();
  buzz([40,30,70]);
  await maybeFinishExplore();
};

async function maybeFinishExplore() {
  if (exploreCount < 3 || busy) return;
  busy = true;
  await wait(1200);
  $("#bathroomHint").textContent = "Oh no...";
  $("#bathroomTitle").textContent = "Intrusive thoughts... can’t help it.";
  await wait(1450);
  await showScene(scenes.choice);
  busy = false;
}

/* moving nope */
function moveNope() {
  const button = $("#noBtn");
  const parent = button.parentElement;
  button.classList.add("moving");
  const maxX = Math.max(0, parent.clientWidth - button.offsetWidth);
  const maxY = Math.max(0, parent.clientHeight - button.offsetHeight);
  button.style.left = `${Math.random() * maxX}px`;
  button.style.top = `${Math.random() * maxY}px`;
  button.style.right = "auto";
  button.style.bottom = "auto";
  toast("Nice try.");
}

["pointerenter","pointerdown","touchstart"].forEach((name) => {
  $("#noBtn").addEventListener(name, (event) => {
    event.preventDefault();
    moveNope();
  }, { passive:false });
});

$("#yesBtn").onclick = async () => {
  if (busy) return;
  busy = true;
  audio.stopAmbience(.35);
  await showScene(scenes.ritual);
  audio.setAmbience("ritual");
  busy = false;
};

/* ritual */
$("#sayBtn").onclick = async () => {
  if (busy || maryCount >= 3) return;

  maryCount++;
  busy = true;
  $("#sayBtn").disabled = true;
  $("#ritualHint").textContent = `${maryCount} of 3`;
  $("#maryDots").textContent = [0,1,2].map((i) => i < maryCount ? "●" : "○").join(" ");
  audio.ritualName(maryCount);
  buzz(maryCount === 3 ? [80,40,120] : 35);

  if (maryCount === 1) {
    $("#ritualTitle").textContent = "Again.";
    $("#ritualRoom").classList.add("dim");
    $("#ritualLamp").classList.add("flicker");

    await wait(650);
    $("#ritualReflection").classList.add("first-wrong");
    await wait(1200);
  }

  if (maryCount === 2) {
    $("#ritualTitle").textContent = "Last one.";

    // The warning writes itself slowly instead of appearing all at once.
    $("#ritualFog").classList.add("word");
    await wait(1250);

    // Her reflection moves without her.
    $("#ritualReflection").classList.remove("first-wrong");
    $("#ritualReflection").classList.add("wrong");
    audio.glassStress();

    await wait(750);

    // Only a distant silhouette is visible at this stage—not the face.
    $("#ritualGhost").classList.add("show");
    await wait(950);
  }

  if (maryCount === 3) {
    $("#ritualTitle").textContent = "Don’t turn around.";

    // Clear just enough fog for the face to emerge from the depth.
    $("#ritualFog").classList.add("clearing");
    await wait(650);

    audio.stopAmbience(.18);
    await wait(220);
    $("#ritualFace").classList.add("reveal");
    audio.ghostReveal();
    buzz([60, 50, 100]);

    // Let her actually see it before the mirror breaks.
    await wait(1650);

    $("#ritualTitle").textContent = "RUN.";
    $("#ritualMirror").classList.add("broken");
    audio.shatter();
    flash();
    shake();
    buzz([100,40,100,40,240]);

    await wait(1050);
    audio.stopAmbience(.12);
    await showScene(scenes.chase);
    audio.setAmbience("chase");
    resetChase();
    busy = false;
    return;
  }

  $("#sayBtn").disabled = false;
  busy = false;
};

/* chase to actual exit */
function startChaseDeadline() {
  clearTimeout(chaseDeadlineTimer);
  chaseDeadlineTimer = setTimeout(triggerChaseJumpscare, 9000);
}

function resetChase() {
  clearTimeout(chaseDeadlineTimer);
  chaseScareActive = false;
  runCount = 0;

  $("#runMeter").style.width = "0%";
  $("#exitDoor").style.transform = "translateX(-50%) scale(.38)";
  $("#chaseGhost").classList.remove("chase-caught");
  $("#chaseGhost").removeAttribute("style");
  $("#chaseHint").textContent = "Run to the exit";
  $("#chaseTitle").textContent = "RUN.";
  $("#runBtn").disabled = false;
  audio.setAmbience("chase");
  startChaseDeadline();
}

async function triggerChaseJumpscare() {
  if (currentScene !== scenes.chase || runCount >= 14 || chaseScareActive) return;

  chaseScareActive = true;
  busy = true;
  clearTimeout(chaseDeadlineTimer);
  $("#runBtn").disabled = true;
  $("#chaseHint").textContent = "She caught up";
  $("#chaseTitle").textContent = "TOO SLOW.";
  $("#chaseGhost").classList.add("chase-caught");

  audio.caughtScare();
  flash();
  shake();
  buzz([110,35,150]);

  await wait(850);
  resetChase();
  toast("Again. Faster.", 1150);
  busy = false;
}

$("#runBtn").onclick = async () => {
  if (busy || runCount >= 14) return;

  runCount++;
  const progress = runCount / 14;
  $("#runMeter").style.width = `${progress * 100}%`;
  $("#exitDoor").style.transform = `translateX(-50%) scale(${0.38 + progress * 1.35})`;

  const maryScale = 0.5 + progress * 0.72;
  const maryLift = progress * 92;
  $("#chaseGhost").style.opacity = `${0.45 + progress * 0.5}`;
  $("#chaseGhost").style.filter = `blur(${Math.max(0, 2 - progress * 2)}px)`;
  $("#chaseGhost").style.transform =
    `translateX(-50%) translateY(${-maryLift}px) scale(${maryScale})`;

  audio.chaseStep(runCount);
  buzz(18);

  if (runCount === 5) {
    $("#chaseHint").textContent = "Exit is getting closer";
    $("#chaseTitle").textContent = "FASTER.";
  }

  if (runCount === 10) {
    $("#chaseHint").textContent = "She’s behind you";
    $("#chaseTitle").textContent = "MOVE.";
  }

  if (runCount === 14) {
    clearTimeout(chaseDeadlineTimer);
    busy = true;
    $("#runBtn").disabled = true;
    $("#chaseHint").textContent = "Inside. Now.";
    $("#chaseTitle").textContent = "HIDE.";
    await wait(1050);
    audio.stopAmbience(.3);
    await showScene(scenes.breath);
    audio.setAmbience("closet");
    busy = false;
  }
};

/* hold breath */
function startBreath(event) {
  event.preventDefault();
  if (busy || breathStart) return;

  breathStart = performance.now();
  startBreath.lastBeatWindow = -1;
  startBreath.lastStepWindow = -1;
  $("#distantMary").classList.add("approach");
  audio.setAmbience("closet");
  audio.startBreathing();

  breathTimer = setInterval(async () => {
    const elapsed = performance.now() - breathStart;
    const progress = Math.min(100, elapsed / 9800 * 100);
    $("#breathFill").style.width = `${progress}%`;
    audio.updateBreathing(progress / 100);

    if (progress > 22) $("#breathHint").textContent = "Don’t move";
    if (progress > 52) $("#breathHint").textContent = "She is coming closer";
    if (progress > 78) $("#breathHint").textContent = "Do not breathe";

    const beatWindow = Math.floor(elapsed / (progress > 78 ? 760 : progress > 52 ? 1040 : 1380));
    if (beatWindow !== startBreath.lastBeatWindow) {
      startBreath.lastBeatWindow = beatWindow;
      audio.heartbeat(progress > 78 ? 1.25 : progress > 52 ? 1.02 : .78);
    }

    const stepWindow = Math.floor(elapsed / (progress > 78 ? 1050 : progress > 52 ? 1450 : 2050));
    if (stepWindow !== startBreath.lastStepWindow) {
      startBreath.lastStepWindow = stepWindow;
      audio.closetStep(progress / 100);
    }

    if (progress >= 100) {
      clearInterval(breathTimer);
      breathTimer = null;
      breathStart = 0;
      await completeBreath();
    }
  }, 50);
}

function releaseBreath() {
  if (!breathStart || busy) return;

  clearInterval(breathTimer);
  breathTimer = null;
  breathStart = 0;
  $("#breathFill").style.width = "0%";
  audio.stopBreathing(0.03);

  $("#distantMary").classList.remove("approach", "pass-away");
  void $("#distantMary").offsetWidth;
  $("#distantMary").classList.add("caught");
  $("#breathTitle").textContent = "She heard you.";
  $("#breathHint").textContent = "Don’t let go";
  audio.caughtScare();
  flash();
  buzz([50,30,90]);

  setTimeout(() => {
    $("#distantMary").classList.remove("caught");
    $("#breathTitle").textContent = "Hold your breath.";
    $("#breathHint").textContent = "Start again";
    audio.setAmbience("closet");
  }, 850);
}

["pointerdown","touchstart"].forEach((name) => {
  $("#breathBtn").addEventListener(name, startBreath, { passive:false });
});
["pointerup","pointercancel","pointerleave","touchend","touchcancel"].forEach((name) => {
  $("#breathBtn").addEventListener(name, releaseBreath);
});

async function completeBreath() {
  if (busy) return;
  busy = true;
  $("#breathBtn").disabled = true;
  $("#breathTitle").textContent = "...";
  $("#breathHint").textContent = "Stay still";
  audio.stopBreathing(0.18);
  audio.stopAmbience(.15);

  await wait(350);
  audio.hairRustle(.9);
  await wait(200);
  $("#distantMary").classList.remove("approach");
  $("#distantMary").classList.add("pass-away");
  await wait(1250);

  $("#breathTitle").textContent = "She passed.";
  $("#breathHint").textContent = "Wait…";
  await wait(900);
  await showScene(scenes.signal);
  audio.setAmbience("rooftop");
  await playSignal();
  busy = false;
}

/* signal */
async function playSignal() {
  audio.batSignalReveal();
  await wait(700);
  $("#batSignal").classList.add("show");
  audio.softNote(73.42, 1.1, .014, 0, "sine");
  await wait(2450);
  await showScene(scenes.batman);
  await wait(450);
  $("#batman").classList.add("drop");
  audio.capeDrop();
  await wait(820);
  $("#landingDust").classList.add("show");
  audio.landing();
  shake();
  buzz([90,30,130]);
}

let batmanStep = 0;
$("#batmanBtn").onclick = async () => {
  if (busy) return;
  batmanStep++;

  if (batmanStep === 1) {
    $("#batmanLine").textContent = "And also Batman.";
    $("#batmanBtn").textContent = "Obviously";
    return;
  }

  busy = true;
  audio.setAmbience("battle");
  await showScene(scenes.quiz);
  renderQuestion();
  busy = false;
};

/* question battle */
const questions = [
  {
    text: "Who’s the most beautiful girl in the world?",
    subtitle: "Not even a contest.",
    answers: [
      { label: "YOU", correct: true },
      { label: "I SAID YOU", correct: true }
    ],
    feedback: "Exactly. Not even a contest."
  },
  {
    text: "Who loves the other one more?",
    answers: [
      { label: "Me", correct: true },
      { label: "You", correct: false, wrongMessage: "Nice try, cutie." }
    ],
    feedback: "Correct. As it should be."
  },
  {
    text: "Am I Batman?",
    answers: [
      { label: "Yes", correct: true },
      { label: "Obviously yes", correct: true }
    ],
    feedback: "Good. Reality restored."
  }
];

function renderQuestion() {
  const question = questions[questionIndex];
  $("#questionNumber").textContent = `Question ${questionIndex + 1} of 3`;
  $("#questionText").textContent = question.subtitle
    ? `${question.text} ${question.subtitle}`
    : question.text;
  $("#answerFeedback").textContent = "";

  const grid = $("#answerGrid");
  grid.innerHTML = "";

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.type = "button";
    button.textContent = answer.label;
    button.onclick = () => chooseAnswer(answer, question);
    grid.appendChild(button);
  });
}

async function chooseAnswer(answer, question) {
  if (busy) return;

  if (!answer.correct) {
    $("#answerFeedback").textContent = answer.wrongMessage || "Wrong universe. Try again.";
    buzz(35);
    return;
  }

  busy = true;
  $$(".answer-btn").forEach((button) => button.disabled = true);
  $("#answerFeedback").textContent = question.feedback;

  const attackNumber = questionIndex + 1;
  const bananaAttack = $("#bananaAttack");
  const mary = $("#battleMary");
  const impactWords = ["SPLAT", "BANANA BARRAGE", "BOOMERANG"];
  const hitDelays = [500, 560, 780];
  const totalDelays = [780, 1080, 1180];

  bananaAttack.className = "banana-attack";
  $("#impactWord").classList.remove("show");
  $("#battleBatman").classList.remove("attack-pose");
  mary.classList.remove("hit-one", "hit-two", "hit-three");
  void bananaAttack.offsetWidth;

  $("#battleBatman").classList.add("attack-pose");
  bananaAttack.classList.add(`attack-${["one", "two", "three"][questionIndex]}`);
  audio.quizAttack(questionIndex);

  await wait(hitDelays[questionIndex]);
  mary.classList.add(`hit-${["one", "two", "three"][questionIndex]}`);
  $("#impactWord").textContent = impactWords[questionIndex];
  $("#impactWord").classList.add("show");
  buzz(questionIndex === 1 ? [28,18,28,18,55] : [40,20,70]);

  health = Math.max(8, health - 30);
  $("#healthFill").style.width = `${health}%`;

  await wait(totalDelays[questionIndex] - hitDelays[questionIndex]);
  $("#battleBatman").classList.remove("attack-pose");
  mary.classList.remove("hit-one", "hit-two", "hit-three");
  bananaAttack.className = "banana-attack";
  questionIndex++;

  if (questionIndex >= questions.length) {
    $("#questionNumber").textContent = "Final answer";
    $("#questionText").textContent = "She’s still standing.";
    $("#answerGrid").innerHTML = "";
    $("#answerFeedback").textContent = "Time for the ancient weapon.";
    await wait(1200);
    await showScene(scenes.finisher);
    await prepareFinisher();
    busy = false;
    return;
  }

  renderQuestion();
  busy = false;
}


async function prepareFinisher() {
  const mary = $("#finisherMary");
  const button = $("#finishBtn");

  button.disabled = true;
  button.classList.add("locked");
  $("#finisherEyebrow").textContent = "Wait...";
  $("#finisherTitle").textContent = "She’s changing.";

  await wait(650);
  mary.classList.add("evil-form");
  audio.evilTransform();
  flash();
  buzz([45,35,65,35,100]);

  await wait(1550);
  $("#finisherEyebrow").textContent = "Now";
  $("#finisherTitle").textContent = "Use the ancient weapon.";
  button.textContent = "Use the slipper";
  button.disabled = false;
  button.classList.remove("locked");
  audio.softNote(261.63, .8, .012, 0, "triangle");
}

/* cinematic slipper finisher */
$("#finishBtn").onclick = async () => {
  if (busy) return;
  busy = true;
  $("#finishBtn").disabled = true;

  const scene = scenes.finisher;
  const arena = $("#finisherArena");
  const batman = $("#finisherBatman");
  const mary = $("#finisherMary");

  scene.classList.add("cinematic");
  $("#finisherCopy").classList.add("fade");
  $("#slowMotionText").classList.add("show");

  audio.stopAmbience(.2);
  audio.softNote(73.42, .9, .012, 0, "sine");
  await wait(520);

  // Shot 1: Batman winds up the slipper.
  arena.classList.add("closeup");
  batman.classList.add("windup");
  $("#finisherTitle").textContent = "...";
  audio.slipperWindup();
  buzz([35,70,35]);

  await wait(1050);

  // Shot 2: slow-motion release. Her evil form is already complete.
  batman.classList.remove("windup");
  batman.classList.add("release");
  $("#finalSlipper").classList.add("launch");
  $("#slipperTrail").classList.add("show");
  audio.slipperWhoosh();

  await wait(980);

  // Shot 3: freeze-frame impact.
  arena.classList.remove("closeup");
  arena.classList.add("freeze");
  mary.classList.add("impact-hit");
  $("#impactBurst").classList.add("show");
  $("#finisherImpact").classList.add("show");

  audio.slipperImpact();
  flash();
  shake();
  buzz([120,40,160]);

  await wait(950);

  // Shot 4: aftermath.
  arena.classList.remove("freeze");
  mary.classList.remove("impact-hit", "evil-form");
  mary.classList.add("dead");
  scene.classList.add("aftermath");
  $("#finisherCopy").classList.remove("fade");
  $("#finisherEyebrow").textContent = "Justice served";
  $("#finisherTitle").textContent = "BONK.";
  $("#finishBtn").hidden = true;

  audio.aftermath();
  await wait(1750);

  await showScene(scenes.ending);
  createFloatingHearts();
  await playEnding();
  busy = false;
};

/* ending */
function createFloatingHearts() {
  const holder = $("#floatingHearts");
  if (holder.childElementCount) return;

  for (let i = 0; i < 34; i++) {
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
  await wait(650);
  scenes.ending.classList.add("ready");
  audio.setAmbience("romance");
  audio.romanceTheme();
}

const monthMemories = [
  {
    label: "Month one",
    text: "Somehow, out of everyone in the world, I found you."
  },
  {
    label: "Month two",
    text: "You became the person I wanted to tell everything to."
  },
  {
    label: "Month three",
    text: "Even the boring moments started feeling special."
  },
  {
    label: "Month four",
    text: "And now I cannot imagine building my future without you."
  }
];

let heartHoldStarted = 0;
let heartHoldFrame = null;
let heartHoldDone = false;
let heartBeatTimer = null;
const openedMonths = new Set();
const heartHoldDuration = 2600;
const heartRingLength = 383.27;

function setHeartProgress(progress) {
  const clamped = Math.max(0, Math.min(1, progress));
  $("#heartProgressCircle").style.strokeDashoffset = `${heartRingLength * (1 - clamped)}`;
}

function startHeartHold(event) {
  if (heartHoldDone || busy) return;
  event.preventDefault();

  heartHoldStarted = performance.now();
  $("#holdHeartBtn").classList.add("holding");
  $("#heartHint").textContent = "Keep holding...";
  audio.softNote(196, 1.15, .018, 0, "sine");

  clearInterval(heartBeatTimer);
  heartBeatTimer = setInterval(() => {
    if (!heartHoldStarted) return;
    const progress = Math.min(1, (performance.now() - heartHoldStarted) / heartHoldDuration);
    buzz(progress > .72 ? 22 : 14);
  }, 860);

  const update = async (now) => {
    if (!heartHoldStarted || heartHoldDone) return;
    const progress = Math.min(1, (now - heartHoldStarted) / heartHoldDuration);
    setHeartProgress(progress);

    if (progress >= 1) {
      await completeHeartHold();
      return;
    }
    heartHoldFrame = requestAnimationFrame(update);
  };

  heartHoldFrame = requestAnimationFrame(update);
}

function cancelHeartHold() {
  if (!heartHoldStarted || heartHoldDone) return;

  heartHoldStarted = 0;
  cancelAnimationFrame(heartHoldFrame);
  clearInterval(heartBeatTimer);
  heartBeatTimer = null;
  $("#holdHeartBtn").classList.remove("holding");
  $("#heartHint").textContent = "Press and hold my heart";
  setHeartProgress(0);
}

async function completeHeartHold() {
  heartHoldDone = true;
  heartHoldStarted = 0;
  cancelAnimationFrame(heartHoldFrame);
  clearInterval(heartBeatTimer);
  heartBeatTimer = null;

  const heartButton = $("#holdHeartBtn");
  heartButton.classList.remove("holding");
  heartButton.classList.add("completed");
  heartButton.disabled = true;
  $("#heartHint").textContent = "You found four little chapters";
  $("#monthCounter").textContent = "Tap each heart";
  $("#monthCounter").classList.add("show");

  audio.heartBloom();
  buzz([25,45,70]);
  await wait(420);
  $("#heartStage").classList.add("months-ready");
}

$("#holdHeartBtn").addEventListener("pointerdown", startHeartHold);
["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
  $("#holdHeartBtn").addEventListener(eventName, cancelHeartHold);
});

$$('.month-heart').forEach((button) => {
  button.onclick = async () => {
    if (!heartHoldDone || openedMonths.has(button.dataset.month) || busy) return;

    const index = Number(button.dataset.month);
    const memory = monthMemories[index];
    openedMonths.add(button.dataset.month);
    button.classList.add("opened");

    $("#monthLabel").textContent = memory.label;
    $("#monthText").textContent = memory.text;
    $("#monthMessage").classList.add("show");
    $("#monthCounter").textContent = `${openedMonths.size} of 4 hearts opened`;

    audio.memoryNote(index);
    buzz([18,28]);

    if (openedMonths.size === 4) {
      busy = true;
      await wait(1450);
      await mergeMonthHearts();
      busy = false;
    }
  };
});

async function mergeMonthHearts() {
  $("#monthCounter").textContent = "Four became one";
  $("#monthMessage").classList.remove("show");
  $("#heartHint").classList.add("fade");

  const monthButtons = $$('.month-heart');
  monthButtons.forEach((button) => {
    button.classList.remove("opened");
    button.classList.add("merging");
    button.disabled = true;
  });

  audio.heartBloom();
  buzz([30,45,75]);
  await wait(900);

  monthButtons.forEach((button) => {
    button.hidden = true;
  });

  $("#holdHeartBtn").querySelector('.hold-heart-symbol').textContent = "💜";
  $("#holdHeartBtn").classList.add("completed");
  $("#heartProgressCircle").style.opacity = "0";
  await wait(520);

  $("#heartIntro").style.display = "none";
  $("#heartStage").style.height = "190px";
  $("#heartStage").style.marginTop = "0";
  $("#heartStage").style.marginBottom = "0";
  $("#monthCounter").style.display = "none";
  $("#heartHint").style.display = "none";
  $("#heartFinale").classList.add("show");
}

$("#kissBtn").onclick = async () => {
  $("#missionText").classList.add("show");
  $("#kissBtn").textContent = "Kiss received ✓";
  $("#kissBtn").disabled = true;
  audio.kissSound();
  buzz([28,45]);

  await wait(850);
  $("#letterRevealBtn").classList.add("show");
};

$("#letterRevealBtn").onclick = async () => {
  if (busy) return;
  busy = true;

  $("#kissTransition").classList.add("show");
  audio.letterTransition();
  buzz([24,38]);

  await wait(1750);
  audio.setAmbience("letter");
  await showScene(scenes.letter, 260);
  await wait(650);
  $("#kissTransition").classList.remove("show");
  busy = false;
};

$("#openLetterBtn").onclick = async () => {
  if (busy || $("#envelope").classList.contains("open")) return;
  busy = true;

  $("#envelope").classList.add("open");
  $("#batBurst").classList.remove("fly");
  void $("#batBurst").offsetWidth;
  $("#batBurst").classList.add("fly");
  $("#tapStampHint").classList.add("hide");
  audio.paperOpen();
  buzz([22,34]);

  await wait(1450);
  $("#envelope").classList.add("finished");
  scenes.letter.classList.add("reading");
  $("#letterCard").classList.add("show");
  audio.stopAmbience(1.2);
  busy = false;
};

window.addEventListener("pagehide", () => {
  if ("vibrate" in navigator) navigator.vibrate(0);
  audio.stopBreathing(.03);
  audio.stopAmbience(.15);
});
