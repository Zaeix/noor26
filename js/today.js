/* ===== CHANGE ONLY THIS DATE ⭐ */
const ramzanStartDate = new Date("Feb 1, 2026");

/* ===== DAILY CONTENT ===== */

const dailyContent = [
  {
    ayatAr:"إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    ayat:"Har mushkil ke sath aasani hai.",
    ayatRef:"Surah Ash-Sharh (94:6)",

    hadeesAr:"الصِّيَامُ جُنَّةٌ",
    hadees:"Roza ek dhal hai.",
    hadeesRef:"Sahih Bukhari",

    duaAr:"رَبِّ زِدْنِي عِلْمًا",
    dua:"Mere Rab, mujhe ilm mein izafa ata farma."
  },
  {
    ayatAr:"وَاللَّهُ خَيْرُ الرَّازِقِينَ",
    ayat:"Allah sabse behtar rizq dene wala hai.",
    ayatRef:"Surah Al-Jumu’ah (62:11)",

    hadeesAr:"خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ",
    hadees:"Behtareen woh jo apne ghar walon ke liye behtareen ho.",
    hadeesRef:"Tirmidhi",

    duaAr:"اللّهُمَّ اهْدِنِي",
    dua:"Ya Allah mujhe hidayat ata farma."
  }
];

/* ===== DATE CALC ===== */

const today = new Date();
const diff = today - ramzanStartDate;
const dayNo = Math.floor(diff / (1000*60*60*24)) + 1;

ramzanDate.innerText = `${dayNo} Ramzan 1447`;

const d = today.toLocaleDateString("en-US",{ weekday:"short" });
const dt = today.getDate();
const m = today.toLocaleDateString("en-US",{ month:"short" });

engDate.innerText = `${d} • ${dt} ${m}`;

/* DAILY ROTATION ⭐ */

const index = (dayNo - 1) % dailyContent.length;
const c = dailyContent[index];

ayatArabic.innerText = c.ayatAr;
ayatText.innerText   = c.ayat;
ayatRef.innerText    = c.ayatRef;

hadeesArabic.innerText = c.hadeesAr;
hadeesText.innerText   = c.hadees;
hadeesRef.innerText    = c.hadeesRef;

duaArabic.innerText = c.duaAr;
duaText.innerText   = c.dua;

/* ===== SOUND SYSTEM ===== */

let audioCtx;
let clickBuffer;

async function loadSound(){
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const res = await fetch("assets/click.mp3");
  const buf = await res.arrayBuffer();
  clickBuffer = await audioCtx.decodeAudioData(buf);
}

function playSound(){
  if(!audioCtx || !clickBuffer) return;
  const src = audioCtx.createBufferSource();
  src.buffer = clickBuffer;
  src.connect(audioCtx.destination);
  src.start();
}

document.addEventListener("pointerdown", loadSound, { once:true });

document.addEventListener("click", e=>{
  if(e.target.closest(".play-sound")) playSound();
});

/* MENU */

function toggleMenu(){
  playSound();
  dropdownMenu.classList.toggle("show");
  document.querySelector(".hamburger").classList.toggle("active");
  document.body.classList.toggle("menu-open");
}
