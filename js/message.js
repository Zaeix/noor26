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

function toggleMenu(){
  playClickSound();
  document.getElementById("dropdownMenu").classList.toggle("show");
  document.querySelector(".hamburger").classList.toggle("active");
  document.body.classList.toggle("menu-open");
}
