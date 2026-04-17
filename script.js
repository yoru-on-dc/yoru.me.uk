const bootLines = [
  "booting yoruOS...",
  "loading caffeine module...",
  "initializing chaos engine...",
  "mounting /brain (read-only)...",
  "injecting instability...",
  "starting UI..."
];

const bootText = document.getElementById("bootText");
const main = document.getElementById("main");

let i = 0;

function boot() {
  if (i < bootLines.length) {
    bootText.innerHTML += bootLines[i] + "\n";
    i++;
    setTimeout(boot, 600);
  } else {
    setTimeout(() => {
      document.getElementById("boot").style.display = "none";
      main.classList.remove("hidden");
      startSite();
    }, 800);
  }
}

boot();

/* TYPE EFFECT */

function typeText() {
  const text = "chaotic overcaffeinated mess...";
  let i = 0;
  const el = document.getElementById("type");

  function type() {
    if (i < text.length) {
      el.innerHTML += text[i++];
      setTimeout(type, 40);
    }
  }

  type();
}

/* GLITCH JUMPS */

function glitchJump() {
  if (Math.random() > 0.92) {
    document.body.style.transform = `translate(${rand()}px, ${rand()}px)`;
    setTimeout(() => {
      document.body.style.transform = "none";
    }, 100);
  }
}

function rand() {
  return Math.floor(Math.random() * 6 - 3);
}

/* FAKE ERROR POPUPS */

function spawnError() {
  const div = document.createElement("div");
  div.className = "error";
  div.style.top = Math.random() * window.innerHeight + "px";
  div.style.left = Math.random() * window.innerWidth + "px";
  div.innerText = "ERROR: brain.exe stopped responding";

  div.onclick = () => div.remove();

  document.body.appendChild(div);

  setTimeout(() => div.remove(), 4000);
}

/* START SYSTEM */

function startSite() {
  typeText();

  setInterval(glitchJump, 200);
  setInterval(() => {
    if (Math.random() > 0.7) spawnError();
  }, 800);
}
