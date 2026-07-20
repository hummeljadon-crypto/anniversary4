const CONFIG = {
  name: "baby girl"
};

const $ = s => document.querySelector(s);

const scenes = {
  intro: $("#intro"),
  bathroom: $("#bathroom"),
  run: $("#run"),
  hero: $("#hero"),
  ending: $("#ending")
};

let current = scenes.intro;
let count = 0;
let busy = false;

$("#name").textContent = CONFIG.name + " ❤️";

const wait = ms => new Promise(r => setTimeout(r, ms));

async function show(scene) {
  current.classList.remove("active");
  await wait(250);
  current.hidden = true;
  scene.hidden = false;
  requestAnimationFrame(() => scene.classList.add("active"));
  current = scene;
}

function flash() {
  const f = $("#flash");
  f.classList.remove("on");
  void f.offsetWidth;
  f.classList.add("on");
}

function buzz(pattern) {
  if ("vibrate" in navigator) navigator.vibrate(pattern);
}

$("#enterBtn").onclick = () => show(scenes.bathroom);

$("#sayBtn").onclick = async () => {
  if (busy) return;
  count++;
  $("#countText").textContent = [0,1,2].map(i => i < count ? "●" : "○").join(" ");

  if (count === 1) $("#bathroomText").textContent = "Again.";
  if (count === 2) {
    $("#bathroomText").textContent = "Last one.";
    $("#mirror").classList.add("show-face");
  }

  if (count === 3) {
    busy = true;
    $("#bathroomText").textContent = "Oh.";
    buzz([80,40,120]);
    await wait(350);
    $("#mirror").classList.add("broken");
    flash();
    await wait(500);
    await show(scenes.run);
    busy = false;
  }
};

$("#runBtn").onclick = async () => {
  if (busy) return;
  busy = true;
  buzz([40,30,40,30,80]);
  await wait(1500);
  await show(scenes.hero);
  busy = false;
};

$("#saveBtn").onclick = async () => {
  if (busy) return;
  busy = true;
  $("#slipper").classList.add("fly");
  buzz([60,30,90]);
  await wait(650);
  $("#monster").classList.add("dead");
  await wait(650);
  await show(scenes.ending);
  createHearts();
  busy = false;
};

function createHearts() {
  const holder = $("#floatingHearts");
  for (let i = 0; i < 28; i++) {
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
