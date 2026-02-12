/* ===== SOUND SYSTEM ===== */

let audioCtx;
let clickBuffer = null;
let audioUnlocked = false;

async function loadClickSound(){
  if(!audioCtx) return;
  const res = await fetch("assets/click.mp3");
  const buf = await res.arrayBuffer();
  clickBuffer = await audioCtx.decodeAudioData(buf);
}

function playClickSound(){
  if(!audioCtx || !clickBuffer) return;
  const src = audioCtx.createBufferSource();
  src.buffer = clickBuffer;
  src.connect(audioCtx.destination);
  src.start();
}

function unlockAudio(){
  if(audioUnlocked) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  audioCtx.resume().then(()=>{
    audioUnlocked = true;
    loadClickSound();
  });
}

document.addEventListener("pointerdown", unlockAudio, { once:true });

document.addEventListener("click", e=>{
  if(e.target.closest(".play-sound")){
    playClickSound();
  }
});

/* ===== TOGGLE MENU ===== */

function toggleMenu(){
  playClickSound();
  document.getElementById("dropdownMenu").classList.toggle("show");
  document.querySelector(".hamburger").classList.toggle("active");
  document.body.classList.toggle("menu-open");
}

/* ===== SMOOTH ENTRY EFFECT ===== */

document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelectorAll(".dua-card").forEach((d,i)=>{
    d.style.opacity = 0;
    d.style.transform = "translateY(12px)";

    setTimeout(()=>{
      d.style.transition = ".5s ease";
      d.style.opacity = 1;
      d.style.transform = "translateY(0)";
    }, i * 120);
  });
});

/* ===== BACK BUTTON ===== */

function goBack(){
  playClickSound();
  setTimeout(()=>history.back(),180);
}
