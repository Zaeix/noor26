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
  { ramzan:"1 Ramzan", eng:"Feb 1, 2026", day:"Sunday", sehri:"5:21 AM", iftar:"5:41 PM" },
  { ramzan:"2 Ramzan", eng:"Feb 2, 2026", day:"Monday", sehri:"5:20 AM", iftar:"5:42 PM" },
  { ramzan:"3 Ramzan", eng:"Feb 3, 2026", day:"Tuesday", sehri:"5:19 AM", iftar:"5:42 PM" },
  { ramzan:"4 Ramzan", eng:"Feb 4, 2026", day:"Wednesday", sehri:"5:18 AM", iftar:"5:43 PM" },
  { ramzan:"5 Ramzan", eng:"Feb 5, 2026", day:"Thursday", sehri:"5:17 AM", iftar:"5:44 PM" },

  { ramzan:"6 Ramzan", eng:"Feb 6, 2026", day:"Friday", sehri:"5:16 AM", iftar:"5:44 PM" },
  { ramzan:"7 Ramzan", eng:"Feb 7, 2026", day:"Saturday", sehri:"5:15 AM", iftar:"5:45 PM" },
  { ramzan:"8 Ramzan", eng:"Feb 8, 2026", day:"Sunday", sehri:"5:14 AM", iftar:"5:46 PM" },
  { ramzan:"9 Ramzan", eng:"Feb 9, 2026", day:"Monday", sehri:"5:13 AM", iftar:"5:46 PM" },
  { ramzan:"10 Ramzan", eng:"Feb 10, 2026", day:"Tuesday", sehri:"5:12 AM", iftar:"5:47 PM" },

  { ramzan:"11 Ramzan", eng:"Feb 11, 2026", day:"Wednesday", sehri:"5:11 AM", iftar:"5:48 PM" },
  { ramzan:"12 Ramzan", eng:"Feb 12, 2026", day:"Thursday", sehri:"5:10 AM", iftar:"5:48 PM" },
  { ramzan:"13 Ramzan", eng:"Feb 13, 2026", day:"Friday", sehri:"5:09 AM", iftar:"5:49 PM" },
  { ramzan:"14 Ramzan", eng:"Feb 14, 2026", day:"Saturday", sehri:"5:08 AM", iftar:"5:50 PM" },
  { ramzan:"15 Ramzan", eng:"Feb 15, 2026", day:"Sunday", sehri:"5:07 AM", iftar:"5:50 PM" },

  { ramzan:"16 Ramzan", eng:"Feb 16, 2026", day:"Monday", sehri:"5:06 AM", iftar:"5:51 PM" },
  { ramzan:"17 Ramzan", eng:"Feb 17, 2026", day:"Tuesday", sehri:"5:05 AM", iftar:"5:52 PM" },
  { ramzan:"18 Ramzan", eng:"Feb 18, 2026", day:"Wednesday", sehri:"5:04 AM", iftar:"5:52 PM" },
  { ramzan:"19 Ramzan", eng:"Feb 19, 2026", day:"Thursday", sehri:"5:03 AM", iftar:"5:53 PM" },
  { ramzan:"20 Ramzan", eng:"Feb 20, 2026", day:"Friday", sehri:"5:02 AM", iftar:"5:54 PM" },

  { ramzan:"21 Ramzan", eng:"Feb 21, 2026", day:"Saturday", sehri:"5:01 AM", iftar:"5:54 PM" },
  { ramzan:"22 Ramzan", eng:"Feb 22, 2026", day:"Sunday", sehri:"5:00 AM", iftar:"5:55 PM" },
  { ramzan:"23 Ramzan", eng:"Feb 23, 2026", day:"Monday", sehri:"4:59 AM", iftar:"5:56 PM" },
  { ramzan:"24 Ramzan", eng:"Feb 24, 2026", day:"Tuesday", sehri:"4:58 AM", iftar:"5:56 PM" },
  { ramzan:"25 Ramzan", eng:"Feb 25, 2026", day:"Wednesday", sehri:"4:57 AM", iftar:"5:57 PM" },
  
  { ramzan:"26 Ramzan", eng:"Feb 26, 2026", day:"Thursday", sehri:"4:56 AM", iftar:"5:58 PM" },
  { ramzan:"27 Ramzan", eng:"Feb 27, 2026", day:"Friday", sehri:"4:55 AM", iftar:"5:58 PM" },
  { ramzan:"28 Ramzan", eng:"Feb 28, 2026", day:"Saturday", sehri:"4:54 AM", iftar:"5:59 PM" },
  { ramzan:"29 Ramzan", eng:"Mar 1, 2026", day:"Sunday", sehri:"4:53 AM", iftar:"6:00 PM" },
  { ramzan:"30 Ramzan", eng:"Mar 2, 2026", day:"Monday", sehri:"4:52 AM", iftar:"6:00 PM" }
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
