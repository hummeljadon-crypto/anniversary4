const CONFIG = {
  girlfriendName: "Cutie pie, Dannianlys",
  heroName: "Jadon",
  endingLine: "Happy 4 months",

$("#letterGreeting").textContent = "Dear Dannianlys,";
  
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
Always yours,

Jadon
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
let breathStart = 0;
let breathTimer = null;
let questionIndex = 0;
let health = 100;
let toastTimer = null;

$("#girlfriendName").textContent = CONFIG.girlfriendName + " ❤️";
$("#endingTitle").textContent = CONFIG.endingLine;
$("#letterGreeting").textContent = `To my ${CONFIG.girlfriendName},`;
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
    if (this.ctx) this.master.gain.setTargetAtTime(value ? 0 : 0.38, this.ctx.currentTime, 0.03);
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
    const count = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, count, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < count; i++) data[i] = Math.random() * 2 - 1;

    const source = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    source.buffer = buffer;
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

$("#soundToggle").onclick = async () => {
  muted = !muted;
  $("#soundToggle").textContent = muted ? "🔇" : "🔊";
  await audio.start();
  audio.setMuted(muted);
  toast(muted ? "Silent knight mode." : "Sound on. Brave.");
};

/* phone */
window.addEventListener("load", async () => {
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
  audio.tone(185,74,.7,"sine",.11);
  await showScene(scenes.door);
  busy = false;
};

/* door */
$("#openDoorBtn").onclick = async () => {
  if (busy) return;
  busy = true;
  $("#openDoorBtn").disabled = true;
  $("#bathroomDoor").classList.add("open");
  audio.noise(.65,.055,90);
  audio.tone(94,48,.9,"triangle",.08);
  await wait(1500);
  await showScene(scenes.bathroom);
  toast("The door locked behind you.");
  audio.startDrone();
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
  $("#bathroomTitle").textContent = "Light works. Mostly.";
  audio.tone(75,75,.11,"square",.05);
  await maybeFinishExplore();
};

$("#sinkSpot").onclick = async () => {
  if (!markDone($("#sinkSpot"))) return;
  $("#bathroomTitle").textContent = "Just water.";
  toast("Probably.");
  audio.noise(.4,.04,300);
  await maybeFinishExplore();
};

$("#mirrorSpot").onclick = async () => {
  if (!markDone($("#mirrorSpot"))) return;
  $("#fog").classList.add("wiped");
  $("#bathroomTitle").textContent = "There you are.";
  audio.noise(.45,.04,500);
  await wait(550);
  $("#mirrorGhost").classList.add("flash");
  audio.tone(240,55,.35,"sawtooth",.05);
  buzz([40,30,70]);
  await maybeFinishExplore();
};

async function maybeFinishExplore() {
  if (exploreCount < 3 || busy) return;
  busy = true;
  await wait(1200);
  $("#bathroomHint").textContent = "Bad idea unlocked";
  $("#bathroomTitle").textContent = "One more thing.";
  await wait(1000);
  await showScene(scenes.choice);
  busy = false;
}

/* moving nope */
function moveNope() {
  const button = $("#noBtn");
  const parent = button.parentElement;
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
  audio.tone(160,73,.65,"sine",.1);
  await showScene(scenes.ritual);
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
  audio.whisper(maryCount);
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
    audio.tone(155, 62, .7, "sawtooth", .045);

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

    $("#ritualFace").classList.add("reveal");
    audio.tone(185, 43, 1.15, "sawtooth", .11);
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
    audio.stopDrone();
    await showScene(scenes.chase);
    busy = false;
    return;
  }

  $("#sayBtn").disabled = false;
  busy = false;
};

/* chase to actual exit */
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

  audio.footstep(runCount);
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
    busy = true;
    $("#runBtn").disabled = true;
    $("#chaseHint").textContent = "Inside. Now.";
    $("#chaseTitle").textContent = "HIDE.";
    await wait(1050);
    await showScene(scenes.breath);
    busy = false;
  }
};

/* hold breath */
function startBreath(event) {
  event.preventDefault();
  if (busy || breathStart) return;

  breathStart = performance.now();
  $("#distantMary").classList.add("approach");
  audio.startDrone();

  breathTimer = setInterval(async () => {
    const elapsed = performance.now() - breathStart;
    const progress = Math.min(100, elapsed / 9200 * 100);
    $("#breathFill").style.width = `${progress}%`;

    if (progress > 28) $("#breathHint").textContent = "Don’t move";
    if (progress > 58) $("#breathHint").textContent = "She sees the door";
    if (progress > 82) $("#breathHint").textContent = "Don’t breathe";

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

  $("#distantMary").classList.remove("approach", "pass-away");
  void $("#distantMary").offsetWidth;
  $("#distantMary").classList.add("caught");
  $("#breathTitle").textContent = "She heard you.";
  $("#breathHint").textContent = "Don’t let go";
  audio.tone(220,52,.4,"sawtooth",.1);
  audio.noise(.28,.16,700);
  flash();
  buzz([50,30,90]);

  setTimeout(() => {
    $("#distantMary").classList.remove("caught");
    $("#breathTitle").textContent = "Hold your breath.";
    $("#breathHint").textContent = "Start again";
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
  audio.stopDrone();

  await wait(550);
  $("#distantMary").classList.remove("approach");
  $("#distantMary").classList.add("pass-away");
  await wait(1250);

  $("#breathTitle").textContent = "She passed.";
  $("#breathHint").textContent = "Wait…";
  await wait(900);
  await showScene(scenes.signal);
  await playSignal();
  busy = false;
}

/* signal */
async function playSignal() {
  audio.batTheme();
  await wait(550);
  $("#batSignal").classList.add("show");
  await wait(2200);
  await showScene(scenes.batman);
  await wait(450);
  $("#batman").classList.add("drop");
  audio.tone(95,42,.95,"sawtooth",.08);
  await wait(820);
  $("#landingDust").classList.add("show");
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
    audio.tone(110,75,.25,"square",.06);
    buzz(35);
    return;
  }

  busy = true;
  $$(".answer-btn").forEach((button) => button.disabled = true);
  $("#answerFeedback").textContent = question.feedback;

  $("#projectile").classList.remove("fly");
  $("#impactWord").classList.remove("show");
  void $("#projectile").offsetWidth;
  $("#projectile").classList.add("fly");
  $("#impactWord").classList.add("show");

  audio.hit();
  buzz([40,20,70]);

  health = Math.max(8, health - 30);
  $("#healthFill").style.width = `${health}%`;

  await wait(850);
  questionIndex++;

  if (questionIndex >= questions.length) {
    $("#questionNumber").textContent = "Final answer";
    $("#questionText").textContent = "She’s still standing.";
    $("#answerGrid").innerHTML = "";
    $("#answerFeedback").textContent = "Time for the ancient weapon.";
    await wait(1200);
    await showScene(scenes.finisher);
    busy = false;
    return;
  }

  renderQuestion();
  busy = false;
}

/* slipper finisher */
$("#finishBtn").onclick = async () => {
  if (busy) return;
  busy = true;
  $("#finishBtn").disabled = true;
  $("#finalSlipper").classList.add("fly");
  audio.tone(240,760,.62,"sawtooth",.08);
  buzz([60,30,90]);

  await wait(650);
  $("#finisherImpact").classList.add("show");
  $("#finisherMary").classList.add("dead");
  audio.hit();
  flash();
  shake();
  buzz([100,40,140]);

  await wait(1200);
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
  $("#purpleSignal").classList.add("show");
  audio.victory();
  await wait(1300);
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

  await wait(450);
  holder.style.display = "none";
  $("#bigHeart").classList.add("beat");
  audio.victory();
  buzz([40,60,40,100]);

  await wait(600);
  scenes.ending.classList.add("reveal");
}

$("#kissBtn").onclick = async () => {
  $("#missionText").classList.add("show");
  $("#kissBtn").textContent = "Kiss received ✓";
  $("#kissBtn").disabled = true;
  audio.sparkle();
  buzz([35,40,70]);

  await wait(850);
  $("#letterRevealBtn").classList.add("show");
};

$("#letterRevealBtn").onclick = async () => {
  if (busy) return;
  busy = true;
  audio.tone(330,220,.45,"triangle",.06);
  await showScene(scenes.letter);
  busy = false;
};

$("#openLetterBtn").onclick = async () => {
  if (busy || $("#envelope").classList.contains("open")) return;
  busy = true;

  $("#envelope").classList.add("open");
  $("#tapStampHint").classList.add("hide");
  audio.noise(.55,.045,450);
  audio.sparkle();
  buzz([30,40,55]);

  await wait(1250);
  $("#envelope").classList.add("finished");
  scenes.letter.classList.add("reading");
  $("#letterCard").classList.add("show");
  busy = false;
};

window.addEventListener("pagehide", () => {
  if ("vibrate" in navigator) navigator.vibrate(0);
  audio.stopDrone();
});
