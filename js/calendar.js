/* ===== CLICK SOUND SYSTEM ===== */

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

/* ===== NAV TOGGLE ===== */

function toggleMenu(){
  playClickSound();
  document.getElementById("dropdownMenu").classList.toggle("show");
  document.querySelector(".hamburger").classList.toggle("active");
  document.body.classList.toggle("menu-open");
}

/* ===== CALENDAR DATA ===== */

const calendarData = [

  { ramzan:"1 Ramzan",  eng:"Feb 19, 2026", day:"Thursday",  sehri:"4:53 AM", iftar:"5:50 PM" },
  { ramzan:"2 Ramzan",  eng:"Feb 20, 2026", day:"Friday",    sehri:"4:52 AM", iftar:"5:50 PM" },
  { ramzan:"3 Ramzan",  eng:"Feb 21, 2026", day:"Saturday",  sehri:"4:52 AM", iftar:"5:51 PM" },
  { ramzan:"4 Ramzan",  eng:"Feb 22, 2026", day:"Sunday",    sehri:"4:51 AM", iftar:"5:51 PM" },
  { ramzan:"5 Ramzan",  eng:"Feb 23, 2026", day:"Monday",    sehri:"4:50 AM", iftar:"5:52 PM" },

  { ramzan:"6 Ramzan",  eng:"Feb 24, 2026", day:"Tuesday",   sehri:"4:50 AM", iftar:"5:52 PM" },
  { ramzan:"7 Ramzan",  eng:"Feb 25, 2026", day:"Wednesday", sehri:"4:49 AM", iftar:"5:53 PM" },
  { ramzan:"8 Ramzan",  eng:"Feb 26, 2026", day:"Thursday",  sehri:"4:48 AM", iftar:"5:53 PM" },
  { ramzan:"9 Ramzan",  eng:"Feb 27, 2026", day:"Friday",    sehri:"4:47 AM", iftar:"5:54 PM" },
  { ramzan:"10 Ramzan", eng:"Feb 28, 2026", day:"Saturday",  sehri:"4:47 AM", iftar:"5:54 PM" },

  { ramzan:"11 Ramzan", eng:"Mar 1, 2026",  day:"Sunday",    sehri:"4:46 AM", iftar:"5:55 PM" },
  { ramzan:"12 Ramzan", eng:"Mar 2, 2026",  day:"Monday",    sehri:"4:45 AM", iftar:"5:55 PM" },
  { ramzan:"13 Ramzan", eng:"Mar 3, 2026",  day:"Tuesday",   sehri:"4:44 AM", iftar:"5:56 PM" },
  { ramzan:"14 Ramzan", eng:"Mar 4, 2026",  day:"Wednesday", sehri:"4:43 AM", iftar:"5:56 PM" },
  { ramzan:"15 Ramzan", eng:"Mar 5, 2026",  day:"Thursday",  sehri:"4:42 AM", iftar:"5:57 PM" },

  { ramzan:"16 Ramzan", eng:"Mar 6, 2026",  day:"Friday",    sehri:"4:42 AM", iftar:"5:57 PM" },
  { ramzan:"17 Ramzan", eng:"Mar 7, 2026",  day:"Saturday",  sehri:"4:41 AM", iftar:"5:57 PM" },
  { ramzan:"18 Ramzan", eng:"Mar 8, 2026",  day:"Sunday",    sehri:"4:40 AM", iftar:"5:58 PM" },
  { ramzan:"19 Ramzan", eng:"Mar 9, 2026",  day:"Monday",    sehri:"4:39 AM", iftar:"5:58 PM" },
  { ramzan:"20 Ramzan", eng:"Mar 10, 2026", day:"Tuesday",   sehri:"4:38 AM", iftar:"5:59 PM" },

  { ramzan:"21 Ramzan", eng:"Mar 11, 2026", day:"Wednesday", sehri:"4:37 AM", iftar:"5:59 PM" },
  { ramzan:"22 Ramzan", eng:"Mar 12, 2026", day:"Thursday",  sehri:"4:36 AM", iftar:"6:00 PM" },
  { ramzan:"23 Ramzan", eng:"Mar 13, 2026", day:"Friday",    sehri:"4:35 AM", iftar:"6:00 PM" },
  { ramzan:"24 Ramzan", eng:"Mar 14, 2026", day:"Saturday",  sehri:"4:34 AM", iftar:"6:00 PM" },
  { ramzan:"25 Ramzan", eng:"Mar 15, 2026", day:"Sunday",    sehri:"4:33 AM", iftar:"6:01 PM" },

  { ramzan:"26 Ramzan", eng:"Mar 16, 2026", day:"Monday",    sehri:"4:32 AM", iftar:"6:01 PM" },
  { ramzan:"27 Ramzan", eng:"Mar 17, 2026", day:"Tuesday",   sehri:"4:31 AM", iftar:"6:02 PM" },
  { ramzan:"28 Ramzan", eng:"Mar 18, 2026", day:"Wednesday", sehri:"4:30 AM", iftar:"6:02 PM" },
  { ramzan:"29 Ramzan", eng:"Mar 19, 2026", day:"Thursday",  sehri:"4:29 AM", iftar:"6:03 PM" },
  { ramzan:"30 Ramzan", eng:"Mar 20, 2026", day:"Friday",    sehri:"4:28 AM", iftar:"6:03 PM" }

];




/* ===== RENDER + AUTO SCROLL ⭐ */

const today = new Date().toDateString();
const grid = document.getElementById("calendarGrid");

let todayElement = null;

calendarData.forEach((d,i)=>{

  const isToday =
    new Date(d.eng).toDateString() === today;

  const card = document.createElement("div");
  card.className = "day-card play-sound" + (isToday ? " today-card" : "");

card.innerHTML = `

  <div class="ramzan-date">${d.ramzan}</div>

  <div class="day-name">${d.day}</div>

  <div class="eng-date">${d.eng}</div>

  <div class="times">
    <div>🌅 Sehri: <strong>${d.sehri}</strong></div>
    <div>🌇 Iftar: <strong>${d.iftar}</strong></div>
  </div>

`;


  grid.appendChild(card);

  if(isToday) todayElement = card;
});

/* ⭐ AUTO SCROLL TO TODAY */
if(todayElement){
  setTimeout(()=>{
    todayElement.scrollIntoView({
      behavior:"smooth",
      block:"center"
    });
  }, 300);
}
