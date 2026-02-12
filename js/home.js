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

function navigate(url){
  playClickSound();
  setTimeout(()=>location.href=url,220);
}

function goToday(){navigate("today.html");}
function goCalendar(){navigate("calendar.html");}
function goDuas(){navigate("duas.html");}
function goMessage(){navigate("message.html");}

function toggleMenu(){
  playClickSound();
  document.getElementById("dropdownMenu").classList.toggle("show");
  document.querySelector(".hamburger").classList.toggle("active");
  document.body.classList.toggle("menu-open");
}


/* ===== AUTO CHANGING ISLAMIC QUOTES ===== */

/* ===== AUTO CHANGING ISLAMIC QUOTES (FIXED) ===== */

const quotes = [
  { text:"Indeed, in the remembrance of Allah do hearts find rest.", ref:"Surah Ar-Ra'd 13:28" },
  { text:"Allah does not burden a soul beyond that it can bear.", ref:"Surah Al-Baqarah 2:286" },
  { text:"The best among you are those who have the best manners and character.", ref:"Prophet Muhammad ﷺ (Bukhari)" },
  { text:"Every son of Adam sins, and the best of sinners are those who repent.", ref:"Hadith – Tirmidhi" },
  { text:"So remember Me; I will remember you.", ref:"Surah Al-Baqarah 2:152" }
];

let quoteIndex = 0;
let quoteTimer;

const quoteEl = document.getElementById("autoQuote");
const refEl   = document.getElementById("autoRef");

function animateQuote(){
  // 🔥 RESET animation properly
  quoteEl.classList.remove("fade-in");
  refEl.classList.remove("fade-in");

  quoteEl.classList.add("fade-out");
  refEl.classList.add("fade-out");

  setTimeout(()=>{
    quoteEl.innerText = quotes[quoteIndex].text;
    refEl.innerText   = quotes[quoteIndex].ref;

    quoteEl.classList.remove("fade-out");
    refEl.classList.remove("fade-out");

    // 🔥 force reflow (VERY IMPORTANT)
    void quoteEl.offsetWidth;

    quoteEl.classList.add("fade-in");
    refEl.classList.add("fade-in");
  }, 500);
}

function nextQuote(){
  quoteIndex = (quoteIndex + 1) % quotes.length;
  animateQuote();
  resetTimer();
}

function prevQuote(){
  quoteIndex = (quoteIndex - 1 + quotes.length) % quotes.length;
  animateQuote();
  resetTimer();
}

function resetTimer(){
  clearInterval(quoteTimer);
  quoteTimer = setInterval(nextQuote, 10000);
}

/* INIT AFTER PAGE LOAD */
window.addEventListener("load", () => {
  animateQuote();
  quoteTimer = setInterval(nextQuote, 10000);
});
